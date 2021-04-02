async function updatePlayers() {
    var newPlayers;
    await fetch(API_URL + 'players')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            newPlayers = data.players;
        }).catch((error) => {
            onAlert(false, 'Cant Connect to Server')
        });

    newPlayers.forEach(element => {
        if (!players.includes(element)) {
            addPlayer(element);
        }
    });
    players.forEach(element => {
        if (!newPlayers.includes(element)) {
            removePlayer(element);
        }
    });
    players = newPlayers;
}

async function updateConsole() {
    var newConsole = [];
    await fetch(API_URL + 'console')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            newConsole = data.console;
        }).catch((error) => {
            onAlert(false, 'Cant Connect to Server')
        });
    addConsole = [];
    newConsole.forEach(element => {
        if (!consoleLog.includes(element)) {
            addConsole.push(element);
        }
    });

    addConsole.forEach(element => {
        appendToConsole(element);
    });
    consoleLog = newConsole;
}


async function updateServerLists() {
    var lists;
    await fetch(API_URL + 'lists')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            lists = data;
        }).catch((error) => {
            onAlert(false, 'Cant Connect to Server')
        });
    whitelistedPlayers = lists.whitelist;
    operatedPlayers = lists.operators;
}

async function updateServerStats() {
    var stats;
    await fetch(API_URL + 'stats')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            stats = data.statistics;
        }).catch((error) => {
            onAlert(false, 'Cant Connect to Server')
        });

    loadServerData(stats.maxPlayers, stats.currentTPS, stats.cpu, stats.usedRam, stats.maxRam);
}

function loadServerData(maxPlayers, currentTps, cpuUsage, usedRam, maxRam) {
    //Online Players
    var percPlayers = Math.ceil(players.length / maxPlayers * 100);
    document.getElementById('playerCounter').innerText = players.length + ' / ' + maxPlayers;
    manageBar(document.getElementById('player_bar'), percPlayers);

    //TPS
    var percTps = Math.ceil(currentTps / 20 * 100);
    document.getElementById('tpsCounter').innerText = currentTps;
    manageBar(document.getElementById('tps_bar'), percTps);

    //CPU
    document.getElementById('cpuInfo').innerText = cpuUsage + "%";
    manageBar(document.getElementById('cpu_bar'), cpuUsage);

    //Ram
    document.getElementById('ramInfo').innerText = usedRam + 'MB / ' + maxRam + 'MB';
    var percRam = Math.ceil(usedRam / maxRam * 100);
    manageBar(document.getElementById('ram_bar'), percRam);
}

function manageBar(element, percentage) {
    element.style.width = percentage + '%';
    if (percentage > 19) {
        element.innerText = percentage + '%';
    } else {
        element.innerText = '';
    }
}