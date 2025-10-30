// public/scripts/Index.js

  const API = "/api/questions";
  const API_SUBMIT = "/api/submit";

  const sendBtn = document.getElementById("sendBtn");
  const list = document.getElementById("list");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  // 🔧 Config
  const TOTAL_QUESTIONS = 143;           // <-- ajusta si cambia
  const PAGE_SIZE = 13;                   // <-- si tu paginación es otra, cambia
  const ANSWERS_KEY = "casm83_answers";   // Mapa { [qNo]: value }
  let currentPage = 1;

  // Carga/guarda respuestas en localStorage como objeto { "1":1, "2":3, ... }
  function readAnswers() {
    try { return JSON.parse(localStorage.getItem(ANSWERS_KEY)) || {}; }
    catch { return {}; }
  }
  function writeAnswers(obj) {
    localStorage.setItem(ANSWERS_KEY, JSON.stringify(obj || {}));
  }

  // Render de página
  async function load() {
    try {
      const r = await fetch(`${API}?page=${currentPage}`);
      const data = await r.json();

      if (!Array.isArray(data) || data.length === 0) {
        list.innerHTML = `<div class="empty">No hay preguntas cargadas aún. Ejecuta el seed y recarga.</div>`;
        // Si no hay datos en esta página y no es la 1, retrocede 1
        if (currentPage > 1) { currentPage--; }
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = true;
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

      // Guardar al cambiar una selección
      list.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener("change", e => {
          const input = e.target;
          const qNo = input.name.replace("question-","");
          const val = Number(input.value);
          const obj = readAnswers();
          obj[qNo] = val;
          writeAnswers(obj);
        });
      });

      // Navegación
      prevBtn.disabled = currentPage === 1;
      nextBtn.disabled = data.length < PAGE_SIZE; // deshabilita si esta página vino "incompleta"
    } catch (e) {
      console.error(e);
      list.innerHTML = `<div class="empty">Error cargando las preguntas.</div>`;
    }
  }

  // Paginación
  nextBtn.addEventListener("click", () => { currentPage++; load(); });
  prevBtn.addEventListener("click", () => { currentPage = Math.max(1, currentPage - 1); load(); });

  // Envío real de respuestas (sin valores “de prueba”)
  sendBtn.addEventListener("click", async () => {
    const respondentId = localStorage.getItem("casm83_respondentId");
    if (!respondentId) {
      alert("❌ No se encontró el ID del participante.");
      return;
    }

    // Construir array 1..TOTAL_QUESTIONS con lo que haya; si falta algo, 0 (Ninguno)
    const saved = readAnswers();
    const answers = [];
    for (let i = 1; i <= TOTAL_QUESTIONS; i++) {
      const v = Number(saved[i] ?? 0);
      answers.push(v);
    }

    // (Opcional) Validación mínima: ¿al menos N contestadas?
    // const responded = Object.keys(saved).length;
    // if (responded < 1) { alert("Responde al menos 1 ítem."); return; }

    const payload = {
      respondentId: Number(respondentId),
      answers
    };

    try {
      const resp = await fetch(API_SUBMIT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await resp.json();

      if (resp.ok && (data.ok ?? true)) {
        alert("✅ Respuestas enviadas correctamente.");
        // Limpia lo necesario (ya no usamos consentimiento)
        localStorage.removeItem("casm83_sex");
        localStorage.removeItem("casm83_grade");
        localStorage.removeItem("casm83_respondentId");
        localStorage.removeItem(ANSWERS_KEY);
        window.location.href = "/gracias.html"; // o "/instrucciones.html" / "/resultado.html"
      } else {
        throw new Error(data.error || "Error al enviar las respuestas.");
      }
    } catch (e) {
      console.error(e);
      alert("❌ Error al enviar las respuestas.");
    }
  });

  // Primera carga
  load();

