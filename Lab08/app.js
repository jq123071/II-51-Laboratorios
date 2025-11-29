import { supabase } from "./supabaseClient.js";

//=========================
// DOM
//=========================
const form = document.getElementById("curso-form");
const inputId = document.getElementById("idCurso");
const inputCodigo = document.getElementById("codigo");
const inputNombre = document.getElementById("nombre");
const inputCreditos = document.getElementById("creditos");
const btnSave = document.getElementById("btn-save");
const btnCancel = document.getElementById("btn-cancel");
const statusDiv = document.getElementById("status");
const tituloForm = document.getElementById("form-title");
let editando = false;
let listaCursos = document.getElementById("lista");

//=========================
// Eventos
//=========================
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const codigo = inputCodigo.value.trim();
  const nombre = inputNombre.value.trim();
  const creditos = parseInt(inputCreditos.value.trim());

  // Editar
  if (editando) {
    const id = inputId.value; // Obtener el ID del curso a editar
    await actualizarCurso(id, codigo, nombre, creditos); // Actualizar

    // Completar la actualización
    editando = false;
    tituloForm.textContent = "Registrar Curso";
    btnSave.textContent = "Guardar Curso";
    btnCancel.style.display = "none";
  }
  // Insertar
  else {
    await crearCurso(codigo, nombre, creditos);
  }

  form.reset();
});


btnCancel.addEventListener("click", () => {
  editando = false;
  tituloForm.textContent = "Registrar Curso";
  btnSave.textContent = "Guardar Curso";
  btnCancel.style.display = "none";
  form.reset();
});

listaCursos.addEventListener("click", async (e) => {
  const deleteBtn = e.target.closest(".btn-delete");
  const editBtn = e.target.closest(".btn-edit");

  if (deleteBtn) {
    const id = deleteBtn.getAttribute("data-id");
    await eliminarCurso(id);
  }

  if (editBtn) {
    const id = editBtn.getAttribute("data-id");

    // 1. Cargar el curso con el id
    const curso = await obtenerCurso(id);

    // 2. Mostrar en el formulario el curso cargado
    if (curso) {
      inputId.value = curso.id; 
      inputCodigo.value = curso.codigo;
      inputNombre.value = curso.nombre;
      inputCreditos.value = curso.creditos;
      editando = true;
      tituloForm.textContent = "Editar Curso";
      btnSave.textContent = "Actualizar Curso";
      btnCancel.style.display = "inline-block";
    }
  }
});

//====================================
// CRUD (CREATE, READ, UPDATE, DELETE)
//====================================

async function cargarCursos() {
  let { data: cursos, error } = await supabase.from("Cursos").select("*");
  if (error) {
    console.error("Error al cargar cursos:", error);
    return;
  }
  let listaCursos = document.getElementById("lista");
  listaCursos.innerHTML = "";
  cursos.forEach((curso) => {
    let li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerHTML = `${curso.codigo} - ${curso.nombre} [${curso.creditos} créditos]
        <button class="btn btn-danger btn-sm btn-delete float-end mx-1" data-id="${curso.id}"><i class="fa-solid fa-xmark"></i></button>
        <button class="btn btn-primary btn-sm btn-edit float-end" data-id="${curso.id}"><i class="fa-solid fa-pencil"></i></button>`;
    listaCursos.appendChild(li); 
  });
}

async function crearCurso(codigo, nombre, creditos) {
  const curso = { codigo, nombre, creditos };
  let { error } = await supabase.from("Cursos").insert([curso]);
  if (error) {
    console.error(error);
    return;
  }
  cargarCursos();
}

async function eliminarCurso(id) {
  let { error } = await supabase.from("Cursos").delete().eq("id", id);
  if (error) {
    console.error(error);
  }
  cargarCursos(); 
}

async function actualizarCurso(id, codigo, nombre, creditos) {
  const curso = { codigo, nombre, creditos };
  let { error } = await supabase.from("Cursos").update(curso).eq("id", id);
  if (error) {
    console.error(error);
    return;
  }
  cargarCursos();
}

async function obtenerCurso(idCurso) { 
  let { data: curso, error } = await supabase
    .from("Cursos")
    .select("*")
    .eq("id", idCurso)
    .single();
  if (error) {
    console.error("Error al obtener el curso:", error);
    return null;
  }
  return curso;
}

cargarCursos();