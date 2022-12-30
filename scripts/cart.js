document.addEventListener('DOMContentLoaded', () => {
    'use strict'

    const getCartItems = () => {
        let cartItems = document.querySelector('.cart-items'),
            data = [],
            keys = Object.keys(localStorage);

        for (let key of keys) {
            data.push(JSON.parse(localStorage.getItem(key)));
        }

        let cartPicsBlock = document.querySelector('.cart-info-items');
        let cartMainPicBlock = document.querySelector('.cart-info-item');
        let newDefaultMainPic = document.createElement('img');
        let newDefaultPic = document.createElement('img');
        newDefaultMainPic.src = (data[0].image[0]).slice(-19);
        newDefaultPic.src = (data[0].image[0]).slice(-19);

        newDefaultPic.classList.add('active-item');
        cartMainPicBlock.append(newDefaultMainPic);
        cartPicsBlock.append(newDefaultPic);

        document.querySelector('.info-title').innerHTML = data[0].title;
        document.querySelector('.info-rating').innerHTML = `${data[0].rating}★★★★`;
        document.querySelector('.info-sex').innerHTML = `sex: ${data[0].sex}`;
        document.querySelector('.info-color').innerHTML = `color:${data[0].color}`;
        document.querySelector('.info-price').innerHTML = `price: $${data[0].price}`;

        for (let val in data) {

            let newProduct = document.createElement('div');
            newProduct.setAttribute('data-id', `${data[val].id}`);
            newProduct.setAttribute('data-title', `${data[val].title}`);
            newProduct.setAttribute('data-sex', `${data[val].sex}`);
            newProduct.setAttribute('data-color', `${data[val].color}`);
            newProduct.setAttribute('data-price', `${data[val].price}`);
            newProduct.setAttribute('data-rating', `${data[val].rating}`);

            newProduct.classList.add('product-item');
            newProduct.innerHTML = `<img src="${(data[val].image[0]).slice(-19)}" alt="">`;

            for (let pic = 1; pic < data[val].image.length; pic++) {
                let newPic = document.createElement('img');

                newPic.src = (data[val].image[pic]).slice(-19);
                newPic.style.display = 'none';

                if (pic < data[val].image.length) {
                    newProduct.append(newPic);
                }
            }
            cartItems.append(newProduct);
        }
    };

    const productZoom = () => {
        let cartInfoItem = document.querySelector('.cart-info-item'),
            img = cartInfoItem.querySelector('img');

        cartInfoItem.addEventListener('mousemove', (event) => {
            let target = event.target;
            target = target.closest('.cart-info-item');

            const x = event.clientX - target.offsetLeft;
            const y = event.clientY - target.offsetTop;

            img.style.transformOrigin = `${x - 370}px ${y - 100}px`;
            img.style.transform = 'scale(2)';
        })

        cartInfoItem.addEventListener('mouseout', () => {
            img.style.transformOrigin = 'center';
            img.style.transform = 'scale(1)';
        })
    };

    const picsChange = () => {
        let cartInfoItems = document.querySelector('.cart-info-items'),
            mainItem = document.querySelector('.cart-info-item').querySelector('img'),
            items = cartInfoItems.querySelectorAll('img');

        for (let i = 0; i < items.length; i++) {
            items[i].classList.add('huh');

            cartInfoItems.addEventListener('click', (event) => {
                items[i].classList.remove('active-item');
                let target = event.target;
                target = target.closest('.huh');

                if (target === items[i]) {
                    target.classList.add('active-item');
                    mainItem.src = target.src;
                }
            });
        }
        productZoom();
    };

    const buttons = () => {
        let buyBtn = document.querySelector('.buy-btn'),
            deleteBtn = document.querySelector('.delete-btn'),
            paymentBackground = document.querySelector('.payment-background'),
            payment = document.querySelector('.payment'),
            totalPrice = document.querySelector('.total-price'),
            usePromo = document.querySelector('.usepromo');

        buyBtn.addEventListener('click', () => {
            let num = 0;
            totalPrice.value = 0;
            payment.innerHTML = '';
            let data = [];
            paymentBackground.style.display = 'block';

            let keys = Object.keys(localStorage);
            for (let key of keys) {
                data.push(JSON.parse(localStorage.getItem(key)));
            }

            for (let i = 0; i < data.length; i++) {
                let item = document.createElement('li');
                item.innerHTML = `
                <span>${data[i].title}</span>
                <div class="input-container">
                <input class="input-item-price${i}" type="number" disabled="true" value="${data[i].price}">
                <button class="delVal${i}">-</button>
                <input class="input-item-amount${i}" type="number" disabled="true" value="1">
                <button class="addVal${i}">+</button>
                <input class="input-item-purchase${i}" type="number" disabled="true" value="${data[i].price}">
                </div>
                `
                payment.append(item);

                let addValue = document.querySelector(`.addVal${i}`),
                    delValue = document.querySelector(`.delVal${i}`),
                    inputItemPrice = document.querySelector(`.input-item-price${i}`),
                    inputItemAmount = document.querySelector(`.input-item-amount${i}`),
                    inputItemPurchase = document.querySelector(`.input-item-purchase${i}`);

                num += + inputItemPrice.value;
                totalPrice.value = `$${num}`;
                let count = num;

                addValue.addEventListener('click', () => {
                    inputItemAmount.value++;
                    inputItemPurchase.value = inputItemAmount.value * inputItemPrice.value;
                    num += +inputItemPrice.value;

                    let intervalId = setInterval(() => {
                        count += 3;
                        totalPrice.value = `$${count}`;
                    }, 10)
                    setTimeout(() => {
                        clearInterval(intervalId);
                        totalPrice.value = `$${num}`;
                        count = num;
                    }, 200);

                    if (inputItemAmount.value != 0) {
                        delValue.removeAttribute('disabled');
                        delValue.style.opacity = '1';
                    }
                });

                delValue.addEventListener('click', () => {
                    inputItemAmount.value--;
                    inputItemPurchase.value -= inputItemPrice.value;
                    num -= +inputItemPrice.value;

                    let intervalId = setInterval(() => {
                        count -= 3;
                        totalPrice.value = `$${count}`;
                    }, 10)
                    setTimeout(() => {
                        clearInterval(intervalId);
                        totalPrice.value = `$${num}`;
                        count = num;
                    }, 200);

                    if (inputItemAmount.value == 0) {
                        delValue.setAttribute('disabled', true);
                        delValue.style.opacity = '0.4';
                    }
                });

                usePromo.addEventListener('change', () => {

                    if (usePromo.value === 'GET20' || usePromo.value === 'get20') {
                        usePromo.disabled = true;
                        inputItemPrice.value = (inputItemPrice.value / 100) * 80;
                        inputItemPurchase.value = (inputItemPurchase.value / 100) * 80;
                        count = (count / 100) * 80;
                        totalPrice.value = count;
                        num = count;
                    }
                });
            }
        });

        paymentBackground.addEventListener('click', (event) => {
            let target = event.target;
            if (target === paymentBackground) {
                paymentBackground.style.display = 'none';
            }
        });

        deleteBtn.addEventListener('click', () => {
            let cartInfoitems = document.querySelector('.cart-info-items');
            let cartInfoItem = document.querySelector('.cart-info-item');
            let item = cartInfoItem.querySelector('img');
            let cartItems = document.querySelectorAll('.product-item');

            localStorage.removeItem(item.dataset.id);

            for (let i = 0; i < cartItems.length; i++) {
                let cartItemID = 'id' + cartItems[i].dataset.id;

                if (cartItemID === item.dataset.id) {
                    cartItems[i].remove();
                    cartInfoItem.innerHTML = '';
                    cartInfoitems.innerHTML = '';
                }
            }
        });
    };

    const selectItem = () => {
        let content = document.querySelector('.cart-items'),
            cartItem = content.querySelectorAll('.product-item'),
            cartMainPicBlock = document.querySelector('.cart-info-item'),
            cartPicsBlock = document.querySelector('.cart-info-items');

        for (let i = 0; i < cartItem.length; i++) {

            content.addEventListener('click', (event) => {
                let target = event.target;
                target = target.closest('.product-item');

                cartItem[i].classList.remove('active-item');
                if (target === cartItem[i]) {
                    target.classList.add('active-item');
                    cartMainPicBlock.innerHTML = '';
                    cartPicsBlock.innerHTML = '';

                    let cartImages = target.querySelectorAll('img'),
                        newMainPic = document.createElement('img');
                    newMainPic.setAttribute('data-id', `id${target.dataset.id}`);

                    newMainPic.src = cartImages[0].src
                    cartMainPicBlock.append(newMainPic);

                    for (let k = 0; k < cartImages.length; k++) {
                        let newPics = document.createElement('img');
                        newPics.src = cartImages[k].src;
                        cartPicsBlock.append(newPics);
                        if (k === 0) {
                            newPics.classList.add('active-item');
                        }
                    }

                    let star;
                    if (target.dataset.rating >= 4.8) {
                        star = '★★★★★';
                    }
                    if (target.dataset.rating <= 4.7 && target.dataset.rating >= 3.8) {
                        star = '★★★★☆';
                    }
                    if (target.dataset.rating <= 3.7 && target.dataset.rating >= 2.8) {
                        star = '★★★☆☆';
                    }

                    document.querySelector('.info-title').innerHTML = target.dataset.title;
                    document.querySelector('.info-rating').innerHTML = `${target.dataset.rating} ${star}`;
                    document.querySelector('.info-sex').innerHTML = `sex: ${target.dataset.sex}`;
                    document.querySelector('.info-color').innerHTML = `color: ${target.dataset.color}`;
                    document.querySelector('.info-price').innerHTML = `price: $${target.dataset.price}`;

                    picsChange();
                    productZoom();
                }
            });
        }
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

    promocode();
    getCartItems();
    selectItem();
    buttons();
    productZoom();
});