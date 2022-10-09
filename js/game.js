let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let isEndbossReached = false;
let endbossStatusBar = false;
let gameMusicStatus = true;

// function setStoppapleInterval(fn, time){
//     let id = setInterval(fn, time);
//     intervalIds.push(id);
// }

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++)
        window.clearInterval(i);
}

function init() {
    loadImages();
}

function startGame() {
    zoomInEffect();
    canvas = document.getElementById('canvas');
    initLevel1();
    world = new World(canvas, keyboard);
    playGameMusic();
}

function changeVolume(value){
    let volumeRange = value;
    audio.forEach(e => {
        e.volume = volumeRange / 100;
        console.log (game_music.volume)
    });
    if(!gameMusicStatus) {
        game_music.volume = false;   
    }
}

function changeMusic(status) {
    if (status == 'on') {
        imagesMusicOn();
        game_music.volume = true;
        gameMusicStatus = true;
    } else {
        imagesMusicOff();
        game_music.volume = false;
        gameMusicStatus = false;
    }
};

function showMenu(displayWrapper, child) {
    closeBurgerMenu();
    let wrapper = getDocumentID(displayWrapper);
    let menu = getDocumentID(child);
    menu.classList.remove('d-none');
    wrapper.classList.remove('d-none');
    menu.classList.add('growmenu');
}


function imagesMusicOn() {
    musicOff.classList.add('opacity');
    musicOff.src = './img/11_icons/mute-2-64_off.png'
    musicOn.src = './img/11_icons/volume-up-4-64.png';
    musicOn.classList.remove('opacity');
}

function imagesMusicOff() {
    musicOff.classList.remove('opacity');
    musicOff.src = './img/11_icons/mute-2-64.png'
    musicOn.src = './img/11_icons/volume-up-4-64_off.png';
    musicOn.classList.add('opacity');
}

function changeScreen(screen) {
    let smallScreen = getDocumentID('smallScreen');
    let fullScreen = getDocumentID('fullScreen');
    if (screen == 'small') {
        smallScreen.classList.add('screenOn');
        smallScreen.classList.remove('opacity');
        fullScreen.classList.remove('screenOn');
        fullScreen.classList.add('opacity');
    } else {
        smallScreen.classList.remove('screenOn');
        smallScreen.classList.add('opacity');
        fullScreen.classList.add('screenOn');
        fullScreen.classList.remove('opacity');
    }
};

function settings() {
    closeBurgerMenu();
};

function imprint() {
    closeBurgerMenu();
};

function closeMenu(menuID) {
    let closeDialog = getDocumentID(menuID);
    closeDialog.classList.add('d-none');
}

function closeBurgerMenu() {
    let menuSettings = getDocumentID('myInput');
    menuSettings.checked = false;
}

function zoomInEffect() {
    let image = getDocumentID('coverImage');
    let startScreen = getDocumentID('startScreen');
    let bar = getDocumentID('bar');
    image.classList.add('ease-in');
    bar.classList.add('d-none');
    setTimeout(() => {
        startScreen.classList.add('d-none');
    }, 2000);
}

window.addEventListener('load', () => {
    let closeControl = document.getElementById('controlWrapper');
    let closeSetting = document.getElementById('settingsWrapper');
    let closeImprint = document.getElementById('imprintWrapper');
    document.onclick = function (e) {
        if (e.target.id == 'controlWrapper') {
            closeControl.classList.add('d-none')
        }
        if (e.target.id == 'settingsWrapper') {
            closeSetting.classList.add('d-none')
        }
        if (e.target.id == 'imprintWrapper') {
            closeImprint.classList.add('d-none')
        }
    }
});

function getDocumentID(id) {
    return document.getElementById(id);
}

function chngimg() {
    var img = document.getElementById('imgplus').src; //= 'Images/Minus.gif';

    if (img) {
        document.getElementById('imgplus').src = 'Images/Minus.gif';
    } else if (!img) {
        document.getElementById('imgplus').src = 'Images/Plus.gif';
        alert(img);
    }

}

function playGameMusic() {
    game_music.src = './audio/music.mp3';
    game_music.autoplay = true;
    game_music.loop = true;
}

window.addEventListener('keydown', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 38) {
        keyboard.UP = true;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (event.keyCode == 68) {
        keyboard.D = true;
    }
})

window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 38) {
        keyboard.UP = false;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (event.keyCode == 68) {
        keyboard.D = false;
    }
})

