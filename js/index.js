const API_URL = 'http://localhost:3000/';

// const TOKEN_APPENDER = '&auth-token=' + getCookie('auth-token');
const TOKEN_APPENDER = '';

initThemes();

hideAlerts();

function hideAlerts() {
    document.getElementById('alert-suc').style.display = 'none';
    document.getElementById('alert-dan').style.display = 'none';
}

function onAlert(type, message) {
    var element;
    if (type == 'success' || type == true) {
        element = document.getElementById('alert-suc');
    } else {
        element = document.getElementById('alert-dan');
    }

    element.style.display = '';
    element.innerText = message;

    setTimeout(() => {
        element.style.display = 'none';
    }, 2000);
}

function checkIfLogged() {

    document.getElementById('logout').addEventListener('click', () => {
        deleteCookie('auth-token');
        sendTo('login.html');
    });

    if (!getCookie('auth-token')) {
        sendTo('login.html');
    }
}

function sendTo(url) {
    window.location.href = url;
}

function sendCommand(command) {
    alert(command);
}


function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}