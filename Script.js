const ramos = [
  { nombre: "Inglés I [LCE0016]", id: "ing1", desbloquea: ["ing2"] },
  { nombre: "Fund. Físicos matemáticos [FIS117]", id: "fis117", desbloquea: ["biofis"] },
  { nombre: "Introducción a la kinesiología [KIN102]", id: "kin102" },
  { nombre: "Fun. de biología celular e Hi. [CBI1102]", id: "cbi1102" },
  { nombre: "Morfología y función I [MYF101]", id: "myf101", desbloquea: ["myf201"] },
  { nombre: "Inglés II [LCE0026]", id: "ing2" },
  { nombre: "Comunicación científica en salud [KIN208]", id: "kin208", desbloquea: ["kbe"] },
  { nombre: "Morfología y función II [MYF201]", id: "myf201", desbloquea: ["bmh"] },
  { nombre: "Biofísica [FIS401]", id: "biofis", desbloquea: ["bmh"] },
  { nombre: "Act. física y salud [KIN204]", id: "kin204", desbloquea: ["fvp1"] },
  { nombre: "Fund. de química y bio. salud [CQU203]", id: "cqu203", desbloquea: ["fisiopato"] },
  // Agrega aquí el resto de los ramos siguiendo el mismo formato:
  // { nombre: "...", id: "...", desbloquea: ["id1", "id2"] },
];

const estado = {}; // guarda si cada ramo está aprobado
const malla = document.getElementById("malla");

// Crear ramos
ramos.forEach(r => {
  estado[r.id] = false;

  const div = document.createElement("div");
  div.className = "ramo bloqueado";
  div.textContent = r.nombre;
  div.dataset.id = r.id;
  malla.appendChild(div);
});

// Desbloquear ramos sin prerequisitos
ramos.forEach(r => {
  const tienePrerequisitos = ramos.some(other => (other.desbloquea || []).includes(r.id));
  if (!tienePrerequisitos) desbloquearRamo(r.id);
});

function desbloquearRamo(id) {
  const el = document.querySelector(`[data-id="${id}"]`);
  if (el) el.classList.remove("bloqueado");
}

function aprobarRamo(id) {
  estado[id] = true;
  const el = document.querySelector(`[data-id="${id}"]`);
  el.classList.add("aprobado");

  const r = ramos.find(x => x.id === id);
  if (r?.desbloquea) {
    r.desbloquea.forEach(d => desbloquearRamo(d));
  }
}

// Evento click
document.querySelectorAll(".ramo").forEach(el => {
  el.addEventListener("click", () => {
    const id = el.dataset.id;
    if (!estado[id]) {
      aprobarRamo(id);
    }
  });
});
