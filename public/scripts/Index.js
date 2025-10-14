const API = "/api/questions";
const API_SUBMIT = "/api/submit";  // Endpoint para enviar las respuestas

const sendBtn = document.getElementById("sendBtn");  // El botón de "Enviar respuestas"
const list = document.getElementById("list");  // El contenedor donde se mostrarán las preguntas
const nextBtn = document.getElementById("nextBtn");  // Botón para pasar a la siguiente página
const prevBtn = document.getElementById("prevBtn");  // Botón para pasar a la página anterior

let currentPage = 1;  // Página inicial


// Función para cargar las preguntas desde la API (paginadas)
async function load() {
  try {
    const r = await fetch(`${API}?page=${currentPage}`);
    const data = await r.json();

    // Verificar que los datos sean un arreglo y contengan preguntas
    if (!Array.isArray(data) || data.length === 0) {
      list.innerHTML = `<div class="empty">No hay preguntas cargadas aún. Ejecuta el seed y recarga.</div>`;
      return;
    }

    // Mostrar las preguntas en el DOM
    list.innerHTML = data.map(q => `
      <div class="q">
        <h3>Ítem ${q.question_no}</h3>
        <div class="opt"><strong>A)</strong> ${q.text_a}</div>
        <div class="opt"><strong>B)</strong> ${q.text_b}</div>
        <!-- Opciones de respuesta -->
        <div class="opt">
          <label><input type="radio" name="question-${q.question_no}" value="1"> Seleccionar A</label>
          <label><input type="radio" name="question-${q.question_no}" value="2"> Seleccionar B </label>
          <label><input type="radio" name="question-${q.question_no}" value="3"> Seleccionar Ambos</label>
          <label><input type="radio" name="question-${q.question_no}" value="0"> Ninguno</label>
        </div>
      </div>
    `).join("");

    // Habilitar/deshabilitar los botones de navegación
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage > 10;  // Si hay menos de 13 preguntas, no hay siguiente página
  } catch (e) {
    console.error(e);
    list.innerHTML = `<div class="empty">Error cargando las preguntas.</div>`;
  }
}

// Función para manejar el clic en "Siguiente"
nextBtn.addEventListener("click", () => {
  currentPage++;  // Incrementar la página actual
  load();  // Recargar preguntas para la siguiente página
});

// Función para manejar el clic en "Anterior"
prevBtn.addEventListener("click", () => {
  currentPage--;  // Decrementar la página actual
  load();  // Recargar preguntas para la página anterior
});

// Llamar a la función load() para cargar las preguntas de la página inicial
load();
// Función para manejar el envío de respuestas cuando se hace clic en el botón "Enviar respuestas"
sendBtn.addEventListener("click", async () => {
  const questions = document.querySelectorAll(".q");  // Seleccionar todas las preguntas
  const answers = [];  // Array para almacenar las respuestas

  // Recorrer cada pregunta para generar respuestas automáticas (por ejemplo, todas como "Ninguno" = 0)
  questions.forEach(q => {
    const qNo = q.querySelector("h3").textContent.replace("Ítem ", "");  // Obtener el número de la pregunta
    answers.push(0);  // Asignar 0 ("Ninguno") como respuesta predeterminada
  });

  // Obtener el respondentId desde localStorage (esto debería haber sido guardado previamente en instrucciones.html)
  const respondentId = localStorage.getItem("casm83_respondentId");

  if (!respondentId) {
    alert("❌ No se encontró el ID del participante.");
    return;
  }

  // Crear el payload con los datos para enviar
  const payload = {
    respondentId: Number(respondentId),  // Usar el respondentId
    answers  // Respuestas generadas automáticamente (todas "Ninguno")
  };

  try {
    const resp = await fetch(API_SUBMIT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)  // Enviar el payload como JSON
    });
    const data = await resp.json();
    if (data.ok) {
      alert("✅ Respuestas enviadas correctamente.");
      // Limpiar localStorage después de enviar las respuestas
      localStorage.removeItem("casm83_consent");
      localStorage.removeItem("casm83_sex");
      localStorage.removeItem("casm83_grade");
      localStorage.removeItem("casm83_respondentId");
      window.location.href = "/instrucciones.html";  // O página de gracias
    } else {
      alert("❌ Error al enviar las respuestas.");
    }
  } catch (e) {
    console.error(e);
    alert("❌ Error al enviar las respuestas.");
  }
});
