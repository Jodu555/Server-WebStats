async function load() {
    loadLists();
    loadPlayers();
    loadMotd();
}

async function loadPlayers() {
    var maxPlayers;
    await fetch(API_URL + 'stats')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            maxPlayers = data.statistics.maxPlayers;
            whitelist = data.statistics.whitelist;
        }).catch((error) => {
            onAlert(false, 'Cant Connect to Server')
        });
    document.getElementById('maxplayers').value = maxPlayers;

    var btn = document.getElementById('wl_btn');
    var icon = whitelist == true ? '<i class="fas fa-times"></i>' : '<i class="fas fa-check"></i>';
    var type = whitelist == true ? 'danger' : 'success';
    btn.className = '';
    btn.classList.add('btn');
    btn.classList.add('btn-' + type);

    window.console.log(type)

    btn.innerHTML = icon;
}

async function loadMotd() {
    var motdLine1;
    var motdLine2;

    await fetch(API_URL + 'motd')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            motdLine1 = data.line1;
            motdLine2 = data.line2;
        }).catch((error) => {
            onAlert(false, 'Cant Connect to Server')
        });

    document.getElementById('motd_input_line_1').value = motdLine1;
    document.getElementById('motd_input_line_2').value = motdLine2;
    render();
}

async function loadLists() {

    await fetch(API_URL + 'lists')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            lists = data;
        });
    var newWhitelistedPlayers = lists.whitelist;
    var newOperatedPlayers = lists.operators;


    newWhitelistedPlayers.forEach(element => {
        if (!whitelistedPlayers.includes(element))
            addListedPlayer(element, 'wl', 'whitelist remove ');
    });

    whitelistedPlayers.forEach(element => {
        if (!newWhitelistedPlayers.includes(element))
            removeListedPlayer(element, 'wl');
    });

    newOperatedPlayers.forEach(element => {
        if (!operatedPlayers.includes(element))
            addListedPlayer(element, 'op', 'deop ');
    });

    operatedPlayers.forEach(element => {
        if (!newOperatedPlayers.includes(element))
            removeListedPlayer(element, 'op');
    });

    whitelistedPlayers = newWhitelistedPlayers;
    operatedPlayers = newOperatedPlayers;
}

function addListedPlayer(name, id, command) {
    var child = document.createElement('li');
    child.classList.add('list-group-item');
    child.id = id + '-item-' + name;
    child.innerHTML = `
    ${name} 
    <button type="button" class="btn btn-danger float-right" onclick="sendCommand('${command}${name}')">
    <i class="fas fa-times"></i>
    </button>
    `;
    document.getElementById(id).appendChild(child);
}

function removeListedPlayer(name, id) {
    try {
        document.getElementById(id + '-item-' + name);
    } catch (error) {}
}