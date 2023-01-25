let canvas;
let world;
const keyboard = new Keyboard();
let intervalIds = [];
let isEndbossReached = false;
let endbossStatusBar = false;
let gameMusicStatus = true;
let rememberVolumeGameMusic = 1;
let pauseGame = false;
let fullscreen = false;
let mobileDeviceIsUsed = false;

function init() {
    loadImages();
    checkMobileOrientation();
    checkDesktopOrientation();
}

function setStoppapleInterval(fn, time) {
    const id = setInterval(fn, time);
    intervalIds.push(id);
    return id;
}

function clearAllIntervals() {
    for (const id of intervalIds) {
        clearInterval(id)
    }
    intervalIds = [];
}

function startnewGame() {
    clearAllIntervals();
    canvas = document.getElementById('canvas');
    initLevel1();
    world = new World(canvas, keyboard);
    game_music.volume = rememberVolumeGameMusic;
    endbossStatusBar = false;
    closeEndgameImages();
    if (gameMusicStatus) {
        playGameMusic();
    }
}

function closeEndgameImages() {
    loose.classList.add('d-none');
    afterGame.classList.add('d-none');
    win.classList.add('d-none');
}

function startGame() {
    startGameScreen.classList.remove('d-none');
    zoomInEffect();
    canvas = document.getElementById('canvas');
    initLevel1();
    world = new World(canvas, keyboard);
    playGameMusic();
    checkFullScreenOption();
}

function pausePlayGame() {
    let id = getDocumentID('pauseGame');
    if (!pauseGame) {
        id.src = './img/11_icons/play-3-64.png';
    } else {
        id.src = './img/11_icons/pause-64.png';
    }
    pauseGame = !pauseGame;
}

function changeVolume(value) {
    let volumeRange = value;
    audio.forEach((e) => {
        e.volume = volumeRange / 100;
    });
    //safe the number for mute button
    rememberVolumeGameMusic = audio[0].volume;
    if (!gameMusicStatus) {
        game_music.volume = false;
    }
}

function muteGame() {
    const id = getDocumentID('muteGame');
    if (gameMusicStatus) {
        id.src = './img/11_icons/mute-2-64_white.png';
        game_music.pause();
        game_music.volume = !game_music.volume;
    } else {
        id.src = './img/11_icons/volume-up-4-64_white.png';
        game_music.play();
        game_music.volume = rememberVolumeGameMusic;
    }
    gameMusicStatus = !gameMusicStatus;
}

function changeMusic(status) {
    if (status == 'on') {
        imagesMusicOn();
        game_music.volume = rememberVolumeGameMusic;
    } else {
        imagesMusicOff();
        game_music.volume = !game_music.volume;
    }
    gameMusicStatus = !gameMusicStatus;
};

function showMenu(displayWrapper, child) {
    closeBurgerMenu();
    const wrapper = getDocumentID(displayWrapper);
    const menu = getDocumentID(child);
    menu.classList.remove('d-none');
    wrapper.classList.remove('d-none');
    menu.classList.add('growmenu');
}

function imagesMusicOn() {
    const play = getDocumentID('muteGame');
    play.src = './img/11_icons/volume-up-4-64_white.png';
    musicOff.classList.add('opacity');
    musicOff.src = './img/11_icons/mute-2-64_off.png'
    musicOn.src = './img/11_icons/volume-up-4-64.png';
    musicOn.classList.remove('opacity');
}

function imagesMusicOff() {
    const pause = getDocumentID('muteGame');
    pause.src = './img/11_icons/mute-2-64_white.png'
    musicOff.classList.remove('opacity');
    musicOff.src = './img/11_icons/mute-2-64.png'
    musicOn.src = './img/11_icons/volume-up-4-64_off.png';
    musicOn.classList.add('opacity');
}

function changeScreen(screen) {
    if (screen == 'small') {
        smallScreen()
    } else {
        fullScreen()
    }
};

function smallScreen() {
    const smallScr = getDocumentID('smallScreen');
    const fullScr = getDocumentID('fullScreen');
    smallScr.classList.add('screenOn');
    smallScr.classList.remove('opacity');
    fullScr.classList.remove('screenOn');
    fullScr.classList.add('opacity');
    fullscreen = false;
}

function fullScreen() {
    const fullScr = getDocumentID('fullScreen');
    const smallScr = getDocumentID('smallScreen');
    smallScr.classList.remove('screenOn');
    smallScr.classList.add('opacity');
    fullScr.classList.add('screenOn');
    fullScr.classList.remove('opacity');
    fullscreen = true;
}

function settings() {
    closeBurgerMenu();
};

function imprint() {
    closeBurgerMenu();
};

function closeMenu(menuID) {
    const closeDialog = getDocumentID(menuID);
    closeDialog.classList.add('d-none');
}

function closeBurgerMenu() {
    const menuSettings = getDocumentID('myInput');
    menuSettings.checked = false;
}

function zoomInEffect() {
    const image = getDocumentID('coverImage');
    const startScreen = getDocumentID('startScreen');
    const bar = getDocumentID('bar');
    image.classList.add('ease-in');
    bar.classList.add('d-none');
    setTimeout(() => {
        startScreen.classList.add('d-none');
    }, 2000);
}

window.addEventListener('load', () => {
    const closeControl = getDocumentID('controlWrapper');
    const closeSetting = getDocumentID('settingsWrapper');
    const closeImprint = getDocumentID('imprintWrapper');
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

function checkFullScreenOption() {
    let img = getDocumentID('fullscreenGame');
    let idFullscreen = getDocumentID('fullscreen');
    if (fullscreen) {
        openFullscreen(idFullscreen);
        img.src = './img/11_icons/fullscreen-exit-64.png';
    }
}

function fullscreenGame() {
    let img = getDocumentID('fullscreenGame');
    let idFullscreen = getDocumentID('fullscreen');
    if (!fullscreen) {
        openFullscreen(idFullscreen);
        img.src = './img/11_icons/fullscreen-exit-64.png';
    } else {
        closeFullscreen();
        img.src = './img/11_icons/fullscreen-enter-64.png';
    }
    fullscreen = !fullscreen;
}

function reloadPage() {
    location.reload();
    return false;
}

/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}

function playGameMusic() {
    game_music.play();
    game_music.loop = true;
}

function checkMobileOrientation() {
    setInterval(() => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        mobileDeviceIsUsed = isMobile;
        if (mobileDeviceIsUsed && window.matchMedia("(orientation: landscape)").matches) {
            landscapeSight();
        }
        if (mobileDeviceIsUsed && window.matchMedia("(orientation: portrait)").matches) {
            portraitSight();
        }
        if (mobileDeviceIsUsed) {
            onlyDesktop.style.display = 'none'; 
            onlyMobile.classList.remove('d-none');
            onlyMobile.style.display = 'flex'; 
        }
    }, 100)
}


function checkDesktopOrientation() {
    setInterval(() => {
        if (window.innerWidth < 1000 && !mobileDeviceIsUsed) {
            portraitSight();
        }
        if (window.innerWidth > 1000 && !mobileDeviceIsUsed) {
            landscapeSight();
        }
    }, 100);
}

function landscapeSight() {
    portraitMode.style.display = 'none';
    startScreen.style.display = 'block';
    startGameScreen.style.display = 'block';
    startGameScreen.style.display = 'block';
}

function portraitSight() {
    portraitMode.style.display = 'flex';
    startScreen.style.display = 'none';
    startGameScreen.style.display = 'none';
}

