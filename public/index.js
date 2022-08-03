const socket = io.connect('http://localhost:3000');

const message = document.getElementById('message');
const handle = document.getElementById('handle');
const sendBtn = document.getElementById('send');

const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

// Send button clicked
sendBtn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
    message.value = '';
})
// Key press event
message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});


// ============[ Event Handling ]=================
socket.on('chat', function(data)
{
    console.log(data);
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});