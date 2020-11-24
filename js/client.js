const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const message_input = document.getElementById('messageinp');
const container = document.querySelector(".container");
var audio = new Audio('./Notify.mp3');
const x =(message, position)=>{
   const messageElement = document.createElement('div');
   messageElement.innerText=message;
   messageElement.classList.add('message');
   messageElement.classList.add(position);
   container.append(messageElement);
   if(position=='leftmsg'){
      audio.play();
   }
}

const name = prompt('enter name to join');
socket.emit('new-user-joined',name);
socket.on('user joined',name =>{
   x(`${name} joined the chat`,'rightmsg');
});
form.addEventListener('submit',(a)=>{
   a.preventDefault();
   const messg=message_input.value;
   x(`You: ${messg}`,'rightmsg');
   socket.emit('send',messg);
   message_input.nodeValue='';
});
socket.on('leave', data =>{
   x(`${data} left the chat`,'leftmsg');
})
socket.on('receive',data =>{
   x(`${data.name}: ${data.mg}`,'leftmsg');
});