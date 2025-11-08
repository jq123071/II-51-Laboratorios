$(document).ready(function () {
  // Validar formulario
  $('#validarBtn').click(function () {
    const nombre = $('#nombre').val().trim();
    const apellido = $('#apellido').val().trim();
    if (nombre === '' || apellido === '') {
      $('#mensaje').text('Por favor, complete todos los campos.').addClass('text-danger').removeClass('text-success');
    } else {
      $('#mensaje').text(`Hola, ${nombre} ${apellido}. Formulario válido!`).addClass('text-success').removeClass('text-danger');
    }
  });

  // Agregar clase para cambiar color
  $('#agregarClase').click(function () {
    $('#bloqueTexto').addClass('text-primary fw-bold');
  });

  // Quitar clase agregada
  $('#quitarClase').click(function () {
    $('#bloqueTexto').removeClass('text-primary fw-bold');
  });

  // Mostrar u ocultar elemento
  $('#mostrarOcultar').click(function () {
    $('#elementoOculto').toggle();
  });

  // Contador con incrementar y disminuir
  let contador = 0;

  function actualizarContador() {
    $('#contador').text(contador);
  }

  $('#incrementar').click(function () {
    contador++;
    actualizarContador();
  });

  $('#disminuir').click(function () {
    if (contador > 0) {
      contador--;
      actualizarContador();
    }
  });
});

// Alternar modo oscuro / claro con icono de luna/sol
function alternarTema() {
  $('body').toggleClass('dark-mode');
  const icon = $('#tema');
  if ($('body').hasClass('dark-mode')) {
    icon.removeClass('fa-moon').addClass('fa-sun');
  } else {
    icon.removeClass('fa-sun').addClass('fa-moon');
  }
}
