const fs = require('fs');
const path = require('path');

const archivo = path.join(__dirname, 'libros.json');





// Mostrar los diferentes paneles según el menú seleccionado

document.getElementById("principalBtn").addEventListener("click", function() {
  document.getElementById("contenidoPrincipal").innerHTML = "<p>Vista Principal de la Biblioteca.</p>";
});

document.getElementById("prestamoBtn").addEventListener("click", function() {
  document.getElementById("contenidoPrincipal").innerHTML = "<p>Vista de Préstamo de libros.</p>";
});

document.getElementById("libroBtn").addEventListener("click", function() {
  document.getElementById("contenidoPrincipal").innerHTML = "<p>Vista de libros registrados.</p>";
});

document.getElementById("autorBtn").addEventListener("click", function() {
  document.getElementById("contenidoPrincipal").innerHTML = "<p>Vista de autores registrados.</p>";
});

document.getElementById("tipoBtn").addEventListener("click", function() {
  document.getElementById("contenidoPrincipal").innerHTML = "<p>Vista de tipos de libros.</p>";
});

document.getElementById("usuarioBtn").addEventListener("click", function() {
  document.getElementById("contenidoPrincipal").innerHTML = "<p>Vista de usuarios registrados.</p>";
});

document.getElementById("reportesBtn").addEventListener("click", function() {
  document.getElementById("contenidoPrincipal").innerHTML = "<p>Vista de reportes.</p>";
});





// ================== FUNCIONES PARA CADA VISTA ==================

function mostrarVistaLibros() {
  document.getElementById("contenidoPrincipal").innerHTML = `
    <h2>Lista de libros</h2>
    <table>
      <thead><tr><th>Título</th><th>Autor</th><th>Tipo</th></tr></thead>
      <tbody id="librosTabla"></tbody>
    </table>
  `;
  cargarLibros();
}

function mostrarVistaPrestamos() {
  document.getElementById("contenidoPrincipal").innerHTML = `
    <h2>Préstamos</h2>
    <table>
      <thead><tr><th>Usuario</th><th>Libro</th><th>Fecha</th></tr></thead>
      <tbody>
        <tr><td>Juan Pérez</td><td>El Quijote</td><td>2025-07-01</td></tr>
        <tr><td>María Gómez</td><td>Harry Potter</td><td>2025-07-02</td></tr>
      </tbody>
    </table>
  `;
}

function mostrarVistaAutores() {
  document.getElementById("contenidoPrincipal").innerHTML = `
    <h2>Autores</h2>
    <ul>
      <li>Gabriel García Márquez</li>
      <li>J. K. Rowling</li>
      <li>Carlos Fuentes</li>
    </ul>
  `;
}

function mostrarVistaUsuarios() {
  document.getElementById("contenidoPrincipal").innerHTML = `
    <h2>Usuarios</h2>
    <button onclick="mostrarFormularioUsuario()">+ Agregar nuevo usuario</button>
    <ul>
      <li>Juan Pérez</li>
      <li>María Gómez</li>
    </ul>
  `;
}

function mostrarFormularioUsuario() {
  document.getElementById("contenidoPrincipal").innerHTML = `
    <h2>Agregar Usuario</h2>
    <form onsubmit="guardarUsuario(event)">
      <input type="text" id="nombreUsuario" placeholder="Nombre completo" required>
      <button type="submit">Guardar</button>
    </form>
  `;
}

function guardarUsuario(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombreUsuario").value;
  alert("Usuario guardado: " + nombre);
  mostrarVistaUsuarios();
}

// ================== DATOS DE EJEMPLO ==================

const libros = [
  { titulo: "Cien años de soledad", autor: "Gabriel García Márquez", tipo: "Novela" },
  { titulo: "El Principito", autor: "Antoine de Saint-Exupéry", tipo: "Fábula" }
];

function cargarLibros() {
  const cuerpo = document.getElementById("librosTabla");
  cuerpo.innerHTML = "";
  libros.forEach(libro => {
    const fila = `<tr><td>${libro.titulo}</td><td>${libro.autor}</td><td>${libro.tipo}</td></tr>`;
    cuerpo.innerHTML += fila;
  });
}





// ================== ASOCIAR BOTONES A FUNCIONES ==================

document.getElementById("principalBtn").addEventListener("click", mostrarVistaLibros);
document.getElementById("prestamoBtn").addEventListener("click", mostrarVistaPrestamos);
document.getElementById("libroBtn").addEventListener("click", mostrarVistaLibros);
document.getElementById("autorBtn").addEventListener("click", mostrarVistaAutores);
document.getElementById("usuarioBtn").addEventListener("click", mostrarVistaUsuarios);



mostrarLibros();
