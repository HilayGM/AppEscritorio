const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  obtenerLibros: () => ipcRenderer.invoke('obtener-libros'),
  obtenerUsuarios: () => ipcRenderer.invoke('obtener-usuarios'),
  obtenerAutores: () => ipcRenderer.invoke('obtener-autores'),
  obtenerPrestamos: () => ipcRenderer.invoke('obtener-prestamos')
});
