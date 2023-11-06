let socket = io();
let messages = document.getElementById('messages');
let form = document.getElementById('form');
let input = document.getElementById('input');
let messageHistory = JSON.parse(localStorage.getItem('messageHistory')) || [];

// Mostrar mensajes almacenados al cargar la página
messageHistory.forEach(function (msg) {
  let item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    // Enviar mensaje al servidor a través del socket
    socket.emit('chat message', input.value);

    input.value = '';
  }
});

// Escuchar mensajes del servidor
socket.on('chat message', function (msg) {
  let item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);

  // Almacenar mensaje en el historial
  messageHistory.push(msg);
  localStorage.setItem('messageHistory', JSON.stringify(messageHistory));

  window.scrollTo(0, document.body.scrollHeight);
});



