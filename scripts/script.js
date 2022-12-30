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

    const getProducts = (res) => {
        let inputCategory = document.querySelectorAll('.input-category'),
            color = document.querySelectorAll('.input-color'),
            data = res;
        showProducts(data);

        for (let r = 0; r < res.length; r++) {
            for (let i = 0; i < inputCategory.length; i++) {
                inputCategory[i].addEventListener('input', () => {
                    if (inputCategory[i].checked === true) {
                        if (inputCategory[i].id === res[r].category) {
                            data.push(res[r])
                            showProducts(data);
                        }
                    }

                    if (inputCategory[i].checked === false) {
                        if (inputCategory[i].id === res[r].category) {
                            let filtered = data.filter((item, index) => {
                                if (item.category !== inputCategory[i].id) {
                                    return item;
                                }
                            });
                            data = filtered;
                            showProducts(data);
                        }
                    }
                });
            }

            for (let i = 0; i < color.length; i++) {
                color[i].addEventListener('input', () => {
                    if (color[i].checked === true) {
                        if (color[i].id === res[r].color) {
                            data.push(res[r])
                            showProducts(data);
                        }
                    }
                    if (color[i].checked === false) {
                        if (color[i].id === res[r].color) {
                            let filtered = data.filter((item, index) => {
                                if (item.color !== color[i].id) {
                                    return item;
                                }
                            });
                            data = filtered;
                            showProducts(data);
                        }
                    }
                });
            }
        }
    };

    const search = (res) => {
        let headerSearchInput = document.querySelector('.header-search-input');
        let data = res;
        showProducts();

        headerSearchInput.addEventListener('input', () => {
            data = [];
            for (let r = 0; r < res.length; r++) {
                let keys = res[r];
                for (let key in keys) {
                    if (keys[key] == headerSearchInput.value) {
                        data.push(res[r]);
                        showProducts(data);
                    }
                }
            }
        })
    };

    const showProducts = (data) => {
        let productsContent = document.querySelector('.products-content');
        productsContent.innerHTML = '';

        for (let val in data) {
            let newProduct = document.createElement('div');
            newProduct.classList.add('product-item');

            newProduct.innerHTML = `
            <img src="./${data[val].image[0]}" alt="">
            <button class="product-btn view-product-btn">view info</button>
            `
            for (let pic = 1; pic < data[val].image.length; pic++) {
                let newPic = document.createElement('img');
                newPic.src = data[val].image[pic];
                newPic.style.display = 'none';

                if (pic < data[val].image.length) {
                    newProduct.append(newPic);
                }
            }

            newProduct.setAttribute('data-id', `${data[val].id}`);
            newProduct.setAttribute('data-title', `${data[val].title}`);
            newProduct.setAttribute('data-sex', `${data[val].sex}`);
            newProduct.setAttribute('data-color', `${data[val].color}`);
            newProduct.setAttribute('data-price', `${data[val].price}`);
            newProduct.setAttribute('data-rating', `${data[val].rating}`);

            productsContent.append(newProduct);
        }
        productsSettings();
    };

    const productsSettings = () => {
        let productsContent = document.querySelector('.products-content'),
            prodElems = productsContent.querySelectorAll('.product-item'),
            sliderProd = document.querySelector('.slider-content'),
            addToCartBtn = document.querySelector('.add-to-cart-btn');

        for (let i = 0; i < prodElems.length; i++) {

            let btn = prodElems[i].querySelectorAll('button'),
                itemBack = document.querySelector('.product-item-back');

            productsContent.addEventListener('click', (event) => {
                let target = event.target;
                target = target.closest('.product-item');

                if (target === prodElems[i]) {
                    itemBack.style.display = 'block';

                    sliderProd.innerHTML = '';
                    sliderProd.innerHTML = `
                        <a href="#" class="slider-btn prev" id="arrow-left"></a>
                        <a href="#" class="slider-btn next" id="arrow-right"></a>
                        <ul class="slider-dots"></ul>`;

                    productView(target);

                    addToCartBtn.addEventListener('click', () => {
                        let img = target.querySelectorAll('img'),
                            itemData = {
                                id: target.dataset.id,
                                title: target.dataset.title,
                                sex: target.dataset.sex,
                                color: target.dataset.color,
                                price: target.dataset.price,
                                rating: target.dataset.rating,
                                image: []
                            };

                        for (let i = 0; i < img.length; i++) {

                            let correctPic = (img[i].src).slice(-19);
                            itemData.image[i] = correctPic;
                        }

                        localStorage.setItem(`id${target.dataset.id}`, JSON.stringify(itemData));
                    });
                }
            });

            itemBack.addEventListener('click', (event) => {
                let target = event.target;

                if (target === itemBack) {
                    itemBack.style.display = 'none';
                }
            });

            productsContent.addEventListener('mouseover', (event) => {
                let target = event.target;
                target = target.closest('.product-item');

                if (target === prodElems[i]) {
                    btn[0].style.display = 'inline';
                }
            });

            productsContent.addEventListener('mouseout', (event) => {
                let target = event.target;
                target = target.closest('.product-item');

                if (target === prodElems[i]) {
                    btn[0].style.display = 'none';
                }
            });
        }
    };

    const productZoom = () => {
        let sliderContent = document.querySelector('.slider-content');

        sliderContent.addEventListener('mousemove', (event) => {
            let target = event.target;
            target = target.closest('.slider-content');
            let activeSlide = sliderContent.querySelector('.slide-active'),
                img = activeSlide.querySelector('img');

            const x = event.clientX - target.offsetLeft;
            const y = event.clientY - target.offsetTop;

            img.style.transformOrigin = `${x - 570}px ${y - 60}px`;
            img.style.transform = 'scale(2)';
        })

        sliderContent.addEventListener('mouseout', () => {
            let activeSlide = sliderContent.querySelector('.slide-active'),
                img = activeSlide.querySelector('img');

            img.style.transformOrigin = 'center';
            img.style.transform = 'scale(1)';
        })
    };

    const productView = (elem) => {
        let sliderContent = document.querySelector('.slider-content'),
            prodImages = elem.querySelectorAll('img'),
            li = [];

        for (let i = 0; i < prodImages.length; i++) {

            let newProdLi = document.createElement('li');
            li[i] = newProdLi;
            sliderContent.append(newProdLi);
            li[0].classList.add('slide-active');
            li[i].classList.add('slide');

            let newProdImg = document.createElement('img');
            newProdImg.src = prodImages[i].src;

            newProdLi.append(newProdImg);
        }

        let star;
        if (elem.dataset.rating >= 4.8) {
            star = '★★★★★';
        }
        if (elem.dataset.rating <= 4.7 && elem.dataset.rating >= 3.8) {
            star = '★★★★☆';
        }
        if (elem.dataset.rating <= 3.7 && elem.dataset.rating >= 2.8) {
            star = '★★★☆☆';
        }

        document.querySelector('.name-item').innerHTML = elem.dataset.title;
        document.querySelector('.rating-item').innerHTML = `${elem.dataset.rating} ${star}`;
        document.querySelector('.sex-item').innerHTML = `sex: ${elem.dataset.sex}`;
        document.querySelector('.color-item').innerHTML = `color: ${elem.dataset.color}`;
        document.querySelector('.price-item').innerHTML = `price: $${elem.dataset.price}`;

        slider('.slide', '.slider-content', '.slider-dots', 'dot-active', 'slide-active', 'dot', '.slider-btn', '#arrow-left', '#arrow-right');
        productZoom();
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

    fetch('goodsinfo.json')
        .then(response => {
            if (response.ok) {
                response.json().then(res => {
                    search(res);
                    getProducts(res);
                });
            }
        })
        .catch(error => {
            console.log(error);
        });

    promocode();
})

