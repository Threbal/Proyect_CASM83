// public/scripts/index.js
const API = "/api/questions";
const API_SUBMIT = "/api/submit";

const sendBtn = document.getElementById("sendBtn");
const list = document.getElementById("list");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const STORAGE_KEY = "casm83_answers";           // { [question_no]: value }
const PAGE_SIZE = 13;
const TOTAL_ITEMS = 143;                         // CASM-83 R-2014
const TOTAL_PAGES = Math.ceil(TOTAL_ITEMS / PAGE_SIZE);

let currentPage = Number(localStorage.getItem("casm83_currentPage") || 1);


// --- GUARD: exigir registro previo ---


// ---------- helpers de almacenamiento ----------
function getAnswerMap() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
  catch { return {}; }
}
function setAnswer(qNo, val) {
  const map = getAnswerMap();
  map[qNo] = Number(val);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}
function getAnswer(qNo) {
  const map = getAnswerMap();
  return map[qNo];
}
function countAnswered() {
  return Object.keys(getAnswerMap()).length;
}
function allAnswered() {
  return countAnswered() >= TOTAL_ITEMS;
}
function updateSendButtonState() {
  sendBtn.disabled = !allAnswered();
}



// ---------- render de página ----------
async function load() {
  try {
    const r = await fetch(`${API}?page=${currentPage}`);
    const data = await r.json();

    if (!Array.isArray(data) || data.length === 0) {
      list.innerHTML = `<div class="empty">No hay preguntas cargadas aún. Ejecuta el seed y recarga.</div>`;
      return;
    }

    // Render
    list.innerHTML = data.map(q => {
      const saved = getAnswer(q.question_no);
      return `
        <div class="q" data-q="${q.question_no}">
          <h3>Ítem ${q.question_no}</h3>
          <div class="opt"><strong>A)</strong> ${q.text_a}</div>
          <div class="opt"><strong>B)</strong> ${q.text_b}</div>
          <div class="opt radios">
            <label><input type="radio" name="question-${q.question_no}" value="1" ${saved===1?"checked":""}> A</label>
            <label><input type="radio" name="question-${q.question_no}" value="2" ${saved===2?"checked":""}> B</label>
            <label><input type="radio" name="question-${q.question_no}" value="3" ${saved===3?"checked":""}> Ambos</label>
            <label><input type="radio" name="question-${q.question_no}" value="0" ${saved===0?"checked":""}> Ninguno</label>
          </div>
        </div>
      `;
    }).join("");

    // Guardar al cambiar cualquier radio
    list.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener("change", (e) => {
        const input = e.target;
        const wrapper = input.closest(".q");
        const qNo = Number(wrapper.dataset.q);
        setAnswer(qNo, input.value);
        updateSendButtonState();
      });
    });

    // Estado de navegación
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= TOTAL_PAGES;

    // Guardar página actual
    localStorage.setItem("casm83_currentPage", String(currentPage));

    // Actualizar botón enviar según progreso global
    updateSendButtonState();

  } catch (e) {
    console.error(e);
    list.innerHTML = `<div class="empty">Error cargando las preguntas.</div>`;
  }
}

// ---------- navegación ----------
function saveCurrentSelectionsBeforeNav() {
  // No hace falta: ya guardamos onChange de cada radio.
  // Esta función queda por si quieres validar algo adicional antes de navegar.
}

nextBtn.addEventListener("click", () => {
  saveCurrentSelectionsBeforeNav();
  if (currentPage < TOTAL_PAGES) {
    currentPage++;
    load();
  }
});

prevBtn.addEventListener("click", () => {
  saveCurrentSelectionsBeforeNav();
  if (currentPage > 1) {
    currentPage--;
    load();
  }
});

// ---------- envío ----------
sendBtn.addEventListener("click", async () => {
  const respondentId = Number(localStorage.getItem("casm83_respondentId"));
  if (!respondentId) {
    alert("❌ No se encontró el ID del participante. Regrese a instrucciones.");
    return;
  }

  // Validar que todas estén respondidas
  const map = getAnswerMap();
  const missing = [];
  for (let q = 1; q <= TOTAL_ITEMS; q++) {
    if (map[q] === undefined) missing.push(q);
  }
  if (missing.length) {
    const first = missing[0];
    const targetPage = Math.ceil(first / PAGE_SIZE);
    alert(`❗ Faltan ${missing.length} ítems por responder. Te llevo al ítem ${first}.`);
    currentPage = targetPage;
    await load();
    // scroll hacia el ítem faltante en la página
    const el = document.querySelector(`.q[data-q="${first}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  // Construir arreglo en orden 1..143
  const answers = Array.from({ length: TOTAL_ITEMS }, (_, i) => Number(map[i + 1]));

  try {
    sendBtn.disabled = true;
    const resp = await fetch(API_SUBMIT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ respondentId, answers })
    });
    const data = await resp.json();

    if (data.ok) {
      alert("✅ Respuestas enviadas correctamente.");
    // limpia TODO lo relacionado al alumno y su progreso
    localStorage.removeItem("casm83_consent");
    localStorage.removeItem("casm83_sex");
    localStorage.removeItem("casm83_grade");
    localStorage.removeItem("casm83_respondentId");
    localStorage.removeItem("casm83_answers");
    localStorage.removeItem("casm83_currentPage");

    // regresar a instrucciones y evitar “volver” del navegador
    location.replace("/instrucciones.html");

    } else {
      alert("❌ Error al enviar las respuestas.");
      sendBtn.disabled = false;
    }
  } catch (e) {
    console.error(e);
    alert("❌ Error de red al enviar las respuestas.");
    sendBtn.disabled = false;
  }
});

// ---------- init ----------
load();
