import Slider from './slider';

export default class MainSlider extends Slider {
    constructor(btns) {
        super(btns); //получаем доступ к свойствам
    }

    
    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        try {
            this.hanson.style.opacity = '0';

            if (n == 3){
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }
        }catch(e){}

        this.slides.forEach(slide => {
            slide.style.display = "none";
            // slide.classList.remove('animated');
            // slide.classList.remove('slideInUp');
        });

        this.slides[this.slideIndex - 1].style.display = "block";
        this.slides[this.slideIndex].classList.add('animated', 'slideInUp');
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    bindTriggers() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.plusSlides(1);
            });

            btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            })
        });

        document.querySelectorAll('.prevmodule').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(-1);
            });
        });

        document.querySelectorAll('.nextmodule').forEach(item => {
            item.addEventListener('click', (e) => {
                // отменяем всплытие лишних событий(если класс повторяется и код выполняется для других стрелок)
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(1);
            });
        });
    }

    render() {
        // т.к. контейнеры могуть быть разными, првоеряем есть ли на странице контейнер
        if (this.container) {
            try {
                this.hanson = document.querySelector('.hanson');
            } catch(e){}

            this.showSlides(this.slideIndex);
            this.bindTriggers();
        }
    }
}