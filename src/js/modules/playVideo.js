export default class VideoPlayer {
    constructor(triggers, overlay) {
        this.btn = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
    }

    bindTriggers() {
        //кнопки 
        this.btn.forEach(btn => {
            btn.addEventListener('click', () => {
                // если плеер уже создан, открывем модальное окно
                if (document.querySelector('iframe#frame')) {
                    this.overlay.style.display = 'flex';
                } else {
                    // создаем плеер c url в зависимости от кликнутой кнопки
                    const path = btn.getAttribute('data-url');
                    this.createPlayer(path);
                }
            });
        });
    }

    bindCloseBtn() {
        this.close.addEventListener('click', () => {
            this.overlay.style.display = 'none';
            this.player.stopVideo();
        });
    }

    createPlayer(url) {
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`
          });

          console.log(this.player);
          this.overlay.style.display = 'flex';
    }


    init() {
        // init YouTube Player API
        const tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        this.bindTriggers();
        this.bindCloseBtn();
    }
}