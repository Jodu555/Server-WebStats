function addPlayer(name) {
    if (whitelistedPlayers.includes(name)) {
        var wl_tooltip = 'Spieler von der Whitelist entfernen';
        var wl_icon = 'user-minus';
        var wl_btn = 'danger';
    } else {
        var wl_tooltip = 'Spieler auf die Whitelist setzen';
        var wl_icon = 'user-plus';
        var wl_btn = 'success';
    }
    if (operatedPlayers.includes(name)) {
        var op_tooltip = 'Spieler vom Operator entfernen';
        var op_icon = 'user-minus';
        var op_btn = 'danger';
    } else {
        var op_tooltip = 'Spieler zum Operator ernennen';
        var op_icon = 'user-plus';
        var op_btn = 'success';
    }


    var content = `<h5 class="text-center">Interaktion: ${name}</h5>
    <br>
    <img class="rounded mx-auto d-block" src="https://mc-heads.net/avatar/${name}/100">
    <br>
    <div class="row justify-content-center">
        <button type="button" onclick="sendCommand('ban ${name}')" class="btn btn-danger" data-toggle="tooltip" data-placement="top"
            title="Spieler Bannen" >
            <i class="fas fa-ban"></i>
        </button>
        <div class="col-1"></div>
        <button type="button" onclick="sendCommand('kick ${name}')" class="btn btn-danger" data-toggle="tooltip" data-placement="top"
            title="Spieler Kicken">
            <i class="fas fa-ban"></i>
        </button>
        <div class="col-1"></div>
        <button type="button" onclick="sendCommand('kill ${name}')" class="btn btn-danger" data-toggle="tooltip" data-placement="top"
            title="Spieler Killen">
            <i class="fas fa-skull-crossbones"></i>
        </button>
    </div>
    <br>
    <div class="row justify-content-center">
        <button type="button" class="btn btn-${op_btn}" data-toggle="tooltip" data-placement="top"
            title="${op_tooltip}">
            <i class="fas fa-${op_icon}"></i>
        </button>
        <div class="col-1"></div>
        <button type="button" class="btn btn-${wl_btn}" data-toggle="tooltip" data-placement="top"
            title="${wl_tooltip}">
            <i class="fas fa-${wl_icon}"></i>
        </button>
    </div>`;

    document.getElementById('list-tab').innerHTML += `<a class="list-group-item list-group-item-action" id="list-${name}-list" data-toggle="list"
    href="#list-${name}" role="tab" aria-controls="${name}">${name}</a${name}>`;
    document.getElementById('nav-tabContent').innerHTML += `<div class="tab-pane fade show" id="list-${name}" role="tabpanel" aria-labelledby="list-${name}-list">
    ${content}</div>`;
}

function removePlayer(name) {
    document.getElementById('list-' + name + "-list").remove();
    document.getElementById('list-' + name).remove();
}

function rewritePlayers() {
    players.forEach(name => {
        try {
            removePlayer(name);
        } catch (error) { }
        
        addPlayer(name);
    });
}

function filter() {
    const filter = document.getElementById('filter');
    var regExp = new RegExp(filter.value, 'gi');

    if (filter.value == '' || filter.value == null) {
        rewritePlayers();
        return;
    }

    players.forEach(name => {
        if (name.match(regExp) == null) {
            try {
                removePlayer(name);
            } catch (error) { }
        }
    });


}