
function initThemes() {

    const themeElements = [
        document.getElementById('light'),
        document.getElementById('darkly'),
        document.getElementById('cyborg'),
    ];
    var light = true;
    var darkTheme;
    if (getCookie('colorMode') == null) {
        setCookie('colorMode', 'light', 10);
    } else {
        var value = getCookie('colorMode');
        if (value == 'cyborg' || value == 'darkly') {
            light = false;
            darkTheme = value;
        }
    }

    themeElements.forEach(element => {
        if (light && element.id == 'light') {
            element.classList.toggle('active');
            return;
        }
        if (!light && element.id == darkTheme) {
            element.classList.toggle('active');
            return;
        }
        element.classList.remove('active')

        element.addEventListener("click", function () {
            setCookie('colorMode', element.id, 10)
        });
    });

    var list = document.getElementsByTagName('link');
    for (let index = 0; index < list.length; index++) {
        const element = list[index];
        if (!element.href.includes('fontawesome'))
            element.remove();
    }

    if (light) {
        addStyle('https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css');
    } else {
        //Themes cyborg || darkly

        addStyle('https://bootswatch.com/4/' + darkTheme + '/bootstrap.min.css');
        setDark();
    }

}

function addStyle(url) {
    var head = document.head;
    var link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;

    head.appendChild(link);
}

function setDark() {
    try {
        document.getElementById('playerOnline').style.fontSize = '2.5rem';
        document.getElementById('interaction').style.fontSize = '2rem';
    } catch (error) { }


    var elements = document.getElementsByClassName("card-subtitle");
    for (var i = 0; i < elements.length; i++) {
        elements[i].setAttribute('style', 'color:#bfb2b2!important');
    }
    try {
        document.getElementsByClassName('nav-link active')[0].style.color = 'white';
    } catch (error) { }


    var list = document.getElementsByClassName('nav-link');
    for (let index = 0; index < list.length; index++) {
        const element = list[index];
        if (!element.classList.contains('active'))
            element.style.color = '#a7acb0';
    }

    var list = document.getElementsByClassName('footer-text');
    for (let index = 0; index < list.length; index++) {
        const element = list[index];
        element.style.color = '#adafae';
    }

    document.getElementById('nav').setAttribute('style', 'background-color:#222!important');
    document.getElementById('footer').setAttribute('style', 'background-color:#222!important');

    document.getElementById('nav_brand').style.color = '#abc5d9';
}