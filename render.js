// ============ BOTONES DEL MENÚ ============

document.getElementById("principalBtn").addEventListener("click", mostrarVistaLibros);
document.getElementById("libroBtn").addEventListener("click", mostrarVistaLibros);
document.getElementById("prestamoBtn").addEventListener("click", mostrarVistaPrestamos);
document.getElementById("autorBtn").addEventListener("click", mostrarVistaAutores);
document.getElementById("usuarioBtn").addEventListener("click", mostrarVistaUsuarios);
document.getElementById("reportesBtn").addEventListener("click", mostrarVistaReportes);

// ============ VISTA DE LIBROS ============

async function mostrarVistaLibros() {
  const libros = await window.api.obtenerLibros();

  document.getElementById("contenidoPrincipal").innerHTML = `
    <h2>Libros Disponibles</h2>
    <div class="lista-tarjetas">
      ${libros.map(libro => `
        <div class="tarjeta">
          <p><strong>Título:</strong> ${libro.titulo}</p>
          <p><strong>Autor:</strong> ${libro.autor || 'Desconocido'}</p>
          <p><strong>Tipo:</strong> ${libro.tipo || 'Sin tipo'}</p>
        </div>
      `).join('')}
    </div>
  `;
}


// ============ VISTA DE PRÉSTAMOS ============

async function mostrarVistaPrestamos() {
  const prestamos = await window.api.obtenerPrestamos();

  document.getElementById("contenidoPrincipal").innerHTML = `
    <h2>Préstamos Activos</h2>
    <div class="lista-tarjetas">
      ${prestamos.map(p => `
        <div class="tarjeta">
          <p><strong>Usuario:</strong> ${p.usuario}</p>
          <p><strong>Libro:</strong> ${p.libro}</p>
          <p><strong>Fecha:</strong> ${p.fecha}</p>
        </div>
      `).join('')}
    </div>
  `;
}


// ============ VISTA DE AUTORES ============

async function mostrarVistaAutores() {
  const autores = await window.api.obtenerAutores();

  document.getElementById("contenidoPrincipal").innerHTML = `
    <h2>Autores</h2>
    <div class="lista-tarjetas">
      ${autores.map(a => `
        <div class="tarjeta">
          <p><strong>Nombre:</strong> ${a.nombre}</p>
        </div>
      `).join('')}
    </div>
  `;
}

// ============ VISTA DE USUARIOS ============

async function mostrarVistaUsuarios() {
  const usuarios = await window.api.obtenerUsuarios();

  document.getElementById("contenidoPrincipal").innerHTML = `
    <h2>Usuarios Registrados</h2>
    <button onclick="mostrarFormularioUsuario()">+ Agregar Usuario</button>
    <div class="lista-tarjetas">
      ${usuarios.map(user => `
        <div class="tarjeta">
          <p><strong>Nombre:</strong> ${user.nombre}</p>
          <p><strong>Email:</strong> ${user.email}</p>
        </div>
      `).join('')}
    </div>
  `;
}


// ============ FORMULARIO DE USUARIO ============

function mostrarFormularioUsuario() {
  document.getElementById("contenidoPrincipal").innerHTML = `
    <h2>Agregar Usuario</h2>
    <form onsubmit="guardarUsuario(event)">
      <input type="text" id="nombreUsuario" placeholder="Nombre completo" required>
      <input type="email" id="emailUsuario" placeholder="Correo electrónico" required>
      <button type="submit">Guardar</button>
    </form>
  `;
}

async function guardarUsuario(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombreUsuario").value;
  const email = document.getElementById("emailUsuario").value;

  try {
    await window.api.agregarUsuario(nombre, email); // Esta función debe estar en preload/main
    alert("Usuario guardado con éxito");
    mostrarVistaUsuarios();
  } catch (error) {
    alert("Error al guardar usuario: " + error);
  }
}

// ============ VISTA DE REPORTES ============

function mostrarVistaReportes() {
  document.getElementById("contenidoPrincipal").innerHTML = `
    <h2>Reportes</h2>
    <p>Aquí se mostrarán estadísticas generales de la biblioteca.</p>
  `;
}

// ============ INICIO ============

mostrarVistaLibros();
