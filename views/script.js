

  const socket = io();

  const messageInput = document.getElementById('messageInput');
  const sendButton = document.getElementById('sendButton');
  const messagesContainer = document.getElementById('messages');

  //  emit on send button
  sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
      socket.emit('chatMessage', message); 
      messageInput.value = '';
    }
  });

  // emit on press enter in input box
  messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && messageInput.value.trim() !== '') {
      event.preventDefault(); // Prevent the default "Enter" behavior (like line break)
      socket.emit('chatMessage', messageInput.value);
      messageInput.value = '';
    }
  });

  socket.on('chatMessage', (data) => {
    const messageElement = document.createElement('div');
    // const onlineUser=document.createElement('');
    messageElement.textContent = `${data.sender}: ${data.text}`;
    messagesContainer.appendChild(messageElement);
  });
