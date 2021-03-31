var whitelistedPlayers = [];
var operatedPlayers = [];
var whitelist;

checkIfLogged();

load();

function render() {
    initParser('motd_input_line_1', 'motd_output_line_1');
    initParser('motd_input_line_2', 'motd_output_line_2');
}

document.getElementById('btn_add_wl_player').addEventListener('click', () => {
    var element = document.getElementById('add_wl_player');
    sendCommand('whitelist add ' + element.value);
});


document.getElementById('btn_add_op_player').addEventListener('click', () => {
    var element = document.getElementById('add_op_player');
    sendCommand('deop ' + element.value);
    load()
});

function toggleWhitelist() {
    if(whitelist) {
        sendCommand('whitelist off');
    } else {
        sendCommand('whitelist on');
    }
    load()
}

function save() {

    

    load();
}

setInterval(() => {
    loadLists();
}, 1000);

