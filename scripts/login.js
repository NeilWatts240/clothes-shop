document.addEventListener('DOMContentLoaded', () => {
    'use strict'

    const slider = (slideLogin, sliderLogin, dotsLogin, dotActive, slideActive, dotClass, sliderBtn, arrowLeftID, arrowRightID) => {
        let slide = document.querySelectorAll(slideLogin),
            slider = document.querySelector(sliderLogin),
            dots = document.querySelector(dotsLogin);

        let dot = [],
            currentSlide = 0,
            interval;

        for (let i = 0; i < slide.length; i++) {

            let li = document.createElement('li');
            li.classList.add(dotClass);

            dot[i] = li;
            dot[0].classList.add(dotActive);
            dots.append(dot[i]);

        }

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {

            prevSlide(slide, currentSlide, slideActive);
            prevSlide(dot, currentSlide, dotActive);

            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            nextSlide(slide, currentSlide, slideActive);
            nextSlide(dot, currentSlide, dotActive);
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();
            let target = event.target;

            if (!target.matches(`${sliderBtn}, .${dotClass}`)) {
                return;
            }

            prevSlide(slide, currentSlide, slideActive);
            prevSlide(dot, currentSlide, dotActive);

            if (target.matches(arrowRightID)) {
                currentSlide++;
            } else if (target.matches(arrowLeftID)) {
                currentSlide--;
            } else if (target.matches(`.${dotClass}`)) {

                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, slideActive);
            nextSlide(dot, currentSlide, dotActive);
        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches(`${sliderBtn}`) ||
                event.target.matches(`.${dotClass}`)) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches(`${sliderBtn}`) ||
                event.target.matches(`.${dotClass}`)) {
                startSlide();
            }
        });

        startSlide(3000);

    };

    const formValidation = () => {
        const forms = document.querySelectorAll('form');

        forms.forEach((form) => {
            const inputs = form.querySelectorAll('input');
            inputs.forEach((input) => {

                input.addEventListener('input', () => {

                    if (input.classList.contains('input-username') ||
                        input.classList.contains('input-password') ||
                        input.classList.contains('input-email')) {

                        input.value = input.value.replace(/[^A-Za-z0-9@\s]/, '');
                    }
                });
            });
        });
    };

    const promocode = () => {
        let promocode = document.querySelector('.promocode').querySelector('p');

        setTimeout(() => {
            setInterval(() => {
                promocode.style.display = 'block';
            }, 9000);
        }, 10);
        setInterval(() => {
            promocode.style.display = 'none';
        }, 9000);
    };

    const registerLoginChange = () => {
        let loginChapter = document.querySelectorAll('.login-chapter');
        for (let i = 0; i < loginChapter.length; i++) {
            let signUp = loginChapter[i].querySelector('.signup');

            loginChapter[0].addEventListener('click', (event) => {
                let target = event.target;
                target = target.closest('.signup')
                if (target === signUp) {
                    loginChapter[0].classList.remove('login-active');
                    loginChapter[1].classList.add('login-active');
                }

            })

            loginChapter[1].addEventListener('click', (event) => {
                let target = event.target;
                target = target.closest('.signup')
                if (target === signUp) {
                    loginChapter[1].classList.remove('login-active');
                    loginChapter[0].classList.add('login-active');
                }
            })
        }
    };

    registerLoginChange();
    promocode();
    formValidation();
    slider('.slide', '.slider-content', '.slider-dots', 'dot-active', 'slide-active', 'dot', '.slider-btn', '#arrow-left', '#arrow-right');
})
