// Desplazamiento suave para navegación
document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', function(e) {
      e.preventDefault();
      const destino = document.querySelector(this.getAttribute('href'));
      if (destino) {
        destino.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Validación básica de formularios
  function validarFormulario(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
  
    form.addEventListener('submit', function(e) {
      const nombre = form.querySelector('[name="nombre"]');
      const email = form.querySelector('[name="email"]');
      const mensaje = form.querySelector('[name="mensaje"]');
  
      let errores = [];
  
      if (nombre && nombre.value.trim() === '') {
        errores.push('El nombre es obligatorio.');
      }
  
      if (email && !/\S+@\S+\.\S+/.test(email.value)) {
        errores.push('Correo electrónico inválido.');
      }
  
      if (mensaje && mensaje.value.trim() === '') {
        errores.push('El mensaje no puede estar vacío.');
      }
  
      if (errores.length > 0) {
        e.preventDefault();
        alert(errores.join('\n'));
      }
    });
  }
  
  // Llama esta función en la página correspondiente
  // validarFormulario('form-contacto');
  // validarFormulario('form-compra');