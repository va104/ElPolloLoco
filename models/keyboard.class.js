class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    constructor() {
        this.checkDesktopEvents();
        this.checkMobileEvents();
    }

    checkDesktopEvents() {
        this.keyDownEvents();
        this.keyUpEvents();

    }

    checkMobileEvents() {
        setTimeout(() => {
            this.touchStartLeft();
            this.touchEndLeft();
            this.touchStartRight();
            this.touchEndRight();
            this.touchStartSpace();
            this.touchEndSpace();
            this.touchStartThrow();
            this.touchEndThrow();
        }, 1000);
    }

    touchStartLeft() {
        document.getElementById('mobileLandscLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        })
    }

    touchEndLeft() {
        document.getElementById('mobileLandscLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        })
    }

    touchStartRight() {
        document.getElementById('mobileLandscRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        })
    }

    touchEndRight() {
        document.getElementById('mobileLandscRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        })
    }

    touchStartSpace() {
        document.getElementById('mobileLandscSpace').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        })
    }

    touchEndSpace() {
        document.getElementById('mobileLandscSpace').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        })
    }

    touchStartThrow() {
        document.getElementById('mobileLandscThrow').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.D = true;
        })
    }

    touchEndThrow() {
        document.getElementById('mobileLandscThrow').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.D = false;
        })
    }

    keyDownEvents() {
        window.addEventListener('keydown', (event) => {
            if (event.keyCode == 39) {
                this.RIGHT = true;
            }

            if (event.keyCode == 37) {
                this.LEFT = true;
            }

            if (event.keyCode == 38) {
                this.UP = true;
            }

            if (event.keyCode == 32) {
                this.SPACE = true;
            }

            if (event.keyCode == 68) {
                this.D = true;
            }
        })
    }

    keyUpEvents() {
        window.addEventListener('keyup', (event) => {
            if (event.keyCode == 39) {
                this.RIGHT = false;
            }
        
            if (event.keyCode == 37) {
                this.LEFT = false;
            }
        
            if (event.keyCode == 38) {
                this.UP = false;
            }
        
            if (event.keyCode == 32) {
                this.SPACE = false;
            }
        
            if (event.keyCode == 68) {
                this.D = false;
            }
        })
    }
}