document.getElementById('chat-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('message-input');
    const msg = input.value.trim();
    if (msg !== "") {
        const div = document.createElement('div');
        div.textContent = msg;
        document.getElementById('messages').appendChild(div);
        input.value = "";
    }
});