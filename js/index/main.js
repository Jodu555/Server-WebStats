const console = document.getElementById("consoleTextArea");
const consoleLock_btn = document.getElementById('console_lock');
const commandLine = document.getElementById('command_line');
const send_btn = document.getElementById('send_command');

var scrollLock = false;
var players = [];
var consoleLog = [];
var whitelistedPlayers = [];
var operatedPlayers = [];

checkIfLogged();

update()
async function update() {
    updateConsole();
    updateServerStats();
    
    updateServerLists();
    updatePlayers();
}

setInterval(() => {
    update();
}, 500);