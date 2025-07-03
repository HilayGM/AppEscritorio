const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const mysql = require('mysql2');

let win;
let conexion;

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile('index.html');

  // Conexión a MySQL (XAMPP)
  conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Cambia si le pusiste contraseña
    database: 'biblioteca'
  });

  conexion.connect(err => {
    if (err) return console.error('Error conectando a MySQL:', err.message);
    console.log('Conectado a MySQL');
  });
}

// Obtener libros
ipcMain.handle('obtener-libros', async () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT libros.titulo, autores.nombre AS autor, tipos.nombre AS tipo
      FROM libros
      LEFT JOIN autores ON libros.id_autor = autores.id
      LEFT JOIN tipos ON libros.id_tipo = tipos.id;
    `;
    conexion.query(sql, (err, results) => {
      if (err) reject(err.message);
      else resolve(results);
    });
  });
});

// Obtener usuarios
ipcMain.handle('obtener-usuarios', async () => {
  return new Promise((resolve, reject) => {
    conexion.query('SELECT * FROM usuarios', (err, results) => {
      if (err) reject(err.message);
      else resolve(results);
    });
  });
});

// Obtener autores
ipcMain.handle('obtener-autores', async () => {
  return new Promise((resolve, reject) => {
    conexion.query('SELECT * FROM autores', (err, results) => {
      if (err) reject(err.message);
      else resolve(results);
    });
  });
});

// Obtener préstamos
ipcMain.handle('obtener-prestamos', async () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT usuarios.nombre AS usuario, libros.titulo AS libro, prestamos.fecha_prestamo AS fecha
      FROM prestamos
      INNER JOIN usuarios ON prestamos.id_usuario = usuarios.id
      INNER JOIN libros ON prestamos.id_libro = libros.id
      WHERE prestamos.devuelto = 0;
    `;
    conexion.query(sql, (err, results) => {
      if (err) reject(err.message);
      else resolve(results);
    });
  });
});

app.whenReady().then(createWindow);
