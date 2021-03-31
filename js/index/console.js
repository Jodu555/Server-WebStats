function appendToConsole(line) {
    var isScrolledDown = console.scrollHeight - console.scrollTop - 40 == $('#consoleTextArea').height();
    var log = document.createTextNode(line);
    var br = document.createElement('br');
    console.appendChild(log);
    console.appendChild(br);
    if (!isScrolledDown && !scrollLock) {
        var textarea = console;
        textarea.scrollTop = textarea.scrollHeight;
    }
}

consoleLock_btn.addEventListener("click", function () {
    scrollLock = !scrollLock;
    consoleLock_btn.classList.toggle('btn-outline-danger');
    consoleLock_btn.classList.toggle('btn-outline-success');

    if (consoleLock_btn.classList.contains('btn-outline-danger')) {
        consoleLock_btn.innerHTML = '<i class="fas fa-lock"></i>';
    } else {
        consoleLock_btn.innerHTML = '<i class="fas fa-lock-open"></i>';
    }
});

send_btn.addEventListener('click', function () {
    commandLine.value = "";
});