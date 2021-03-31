const usernameElement = document.getElementById('username');
const passwordElement = document.getElementById('password');
const login_btn = document.getElementById('btn_login');

function checkSubmit(e) {
    if (e && e.keyCode == 13) {
        performLogin();
    }
}

login_btn.addEventListener('click', performLogin);

function performLogin() {
    result = checkLogin(usernameElement.value, passwordElement.value);

    if (result == 'Yes') {
        setCookie('auth-token', 'TOKEN', 10);
        sendTo('index.html')
        return;
    }

    onAlert('danger', 'Failed to Login: ' + result);



    usernameElement.value = '';
    passwordElement.value = '';
}

function checkLogin(username, password) {
    if (username == password) {
        return 'Yes';
    }
    return 'Username dont matches Password';
}