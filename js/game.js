let canvas;
let world;
let keyboard = new Keyboard();
let game_music = document.createElement("audio");
let intervalIds = [];
let isEndbossReached = false;
let endbossStatusBar = false;

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
    // loadAudio(); 
}

function startGame() {
    zoomInEffect();
    canvas = document.getElementById('canvas');
    initLevel1();
    world = new World(canvas, keyboard);
    playGameMusic();
}

function showMenu(displayWrapper, child) {
    closeBurgerMenu();
    let wrapper = getDocumentID(displayWrapper);
    let menu = getDocumentID(child);
    menu.classList.remove('d-none');
    wrapper.classList.remove('d-none');
    menu.classList.add('growmenu');
}

function settings() {
    closeBurgerMenu();
};

function imprint() {
    closeBurgerMenu();
};

function closeMenu(menuID){
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

