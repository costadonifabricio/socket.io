let socket = io();
let messages = document.getElementById('messages');
let form = document.getElementById('form');
let inputMessage = document.getElementById('message');
let inputUsername = document.getElementById('username');
let messageHistory = JSON.parse(localStorage.getItem('messageHistory')) || [];

// Mostrar mensajes almacenados al cargar la página
messageHistory.forEach(function (msg) {
  let item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (inputMessage.value && inputUsername.value) {
    // Enviar mensaje y nombre de usuario al servidor a través del socket
    socket.emit('chat message', {
      username: inputUsername.value,
      message: inputMessage.value
    });

    inputMessage.value = '';
  }
});

// Escuchar mensajes del servidor
socket.on('chat message', function (data) {
  let item = document.createElement('li');
  item.textContent = `${data.username}: ${data.message}`;
  messages.appendChild(item);

  // Almacenar mensaje en el historial
  messageHistory.push(`${data.username}: ${data.message}`);
  localStorage.setItem('messageHistory', JSON.stringify(messageHistory));

  window.scrollTo(0, document.body.scrollHeight);
});






