let socket = io();

label = $('#lblNuevoTicket');

socket.on('connect', () => {
    console.log('Conectado al servidor');
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});

$('button').on('click', () => {
    socket.emit('siguienteTicket', null, (siguienteTicket) => {
        label.text(siguienteTicket);
    });
});