const API = "/api/questions";
  const API_SUBMIT = "/api/submit";

  const sendBtn = document.getElementById("sendBtn");
  const list = document.getElementById("list");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  const PAGE_SIZE = 13;                    // ajusta si tu backend pagina distinto
  const ANSWERS_KEY = "casm83_answers";    // { [qNo]: 0|1|2|3 }
  let currentPage = 1;

  // --- Helpers de almacenamiento ---
  const readAnswers = () => {
    try { return JSON.parse(localStorage.getItem(ANSWERS_KEY)) || {}; }
    catch { return {}; }
  };
  const writeAnswers = (obj) => {
    localStorage.setItem(ANSWERS_KEY, JSON.stringify(obj || {}));
  };
  const anyAnswered = () => Object.keys(readAnswers()).length > 0;

  // --- Habilita/Deshabilita el botón Enviar según haya alguna respuesta ---
  function refreshSendButton() {
    if (anyAnswered()) {
      sendBtn.removeAttribute("disabled");
      sendBtn.classList.add("enabled");
    } else {
      sendBtn.setAttribute("disabled", "true");
      sendBtn.classList.remove("enabled");
    }
  }

  // --- Render de página ---
  async function load() {
    try {
      const r = await fetch(`${API}?page=${currentPage}`);
      const data = await r.json();

      if (!Array.isArray(data) || data.length === 0) {
        list.innerHTML = `<div class="empty">No hay preguntas para esta página.</div>`;
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = true;
        refreshSendButton();
        return;
      }

      const saved = readAnswers();

      list.innerHTML = data.map(q => `
        <div class="q" data-qno="${q.question_no}">
          <h3>Ítem ${q.question_no}</h3>
          <div class="opt"><strong>A)</strong> ${q.text_a}</div>
          <div class="opt"><strong>B)</strong> ${q.text_b}</div>
          <div class="opt answers">
            ${[1,2,3,0].map(v => {
              const labels = {1:"Seleccionar A",2:"Seleccionar B",3:"Seleccionar Ambos",0:"Ninguno"};
              const checked = String(saved[q.question_no] ?? "") === String(v) ? "checked" : "";
              return `<label><input type="radio" name="question-${q.question_no}" value="${v}" ${checked}> ${labels[v]}</label>`;
            }).join("")}
          </div>
        </div>
      `).join("");

      // Guardar selección al marcar
      list.querySelectorAll('input[type="radio"]').forEach(input => {
        input.addEventListener("change", e => {
          const qNo = e.target.name.replace("question-","");
          const val = Number(e.target.value);
          const obj = readAnswers();
          obj[qNo] = val;
          writeAnswers(obj);
          refreshSendButton();
        });
      });

      // Navegación
      prevBtn.disabled = currentPage === 1;
      nextBtn.disabled = data.length < PAGE_SIZE;

      // Actualiza botón enviar
      refreshSendButton();

    } catch (e) {
      console.error(e);
      list.innerHTML = `<div class="empty">Error cargando las preguntas.</div>`;
      refreshSendButton();
    }
  }

  // --- Paginación ---
  nextBtn.addEventListener("click", () => { currentPage++; load(); });
  prevBtn.addEventListener("click", () => { currentPage = Math.max(1, currentPage - 1); load(); });

  // --- Enviar (sin autocompletar con 0s aquí; solo envía lo que haya seleccionado) ---
  sendBtn.addEventListener("click", async () => {
    const respondentId = localStorage.getItem("casm83_respondentId");
    if (!respondentId) {
      alert("❌ No se encontró el ID del participante.");
      return;
    }

    const saved = readAnswers(); // objeto { "1":3, "2":1, ... }

    const payload = {
      respondentId: Number(respondentId),
      // Si tu backend espera arreglo fijo, cambia esta parte por
      // la construcción 1..TOTAL_QUESTIONS. Aquí mandamos solo contestadas:
      answers: saved
    };

    try {
      const resp = await fetch(API_SUBMIT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Error al enviar.");

      alert("✅ Respuestas enviadas correctamente.");
      // Limpieza mínima
      localStorage.removeItem(ANSWERS_KEY);
      // (si quieres) localStorage.removeItem("casm83_respondentId");
      window.location.href = "/gracias.html";
    } catch (e) {
      console.error(e);
      alert("❌ Error al enviar las respuestas.");
    }
  });

  // --- Carga inicial ---
  // Arranca con el botón deshabilitado hasta que el usuario marque algo
  sendBtn.setAttribute("disabled", "true");
  load();