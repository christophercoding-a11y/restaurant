class Store {
    constructor() {

        // track how many items are in the cart and the subtotal of the items
        this.itemsInCart = {
            itemCount: 0,
            price: 0,
            subtotal: 0,
            subTimesQty: 0,
            tax: 0,
            deliveryFee: 6,
            total: 0
        }

        this.menu = {

            item1: {
                id: 1,
                dish: 'spaghetti and meatballs',
                imgUrl: 'spagehettiandmeatballs.jpeg',
                alt: 'spaghettil and meatballs',
                desc: 'spagehett with tomato sauce and meatballs',
                price: 9.99,
                qty: 0
            },
            item2: {
                id: 2,
                dish: 'cheeseburger',
                imgUrl: 'cheeseburgerwithfries.jpeg',
                alt: 'cheeseburger',
                desc: 'delicious burger with fries with your choice of cheese. Comes with lettuce, pickles, tomato, and onion. Also comes with fries on the side.',
                price: 14.99,
                qty: 0
            },
            item3: {
                id: 3,
                dish: 'chicken and waffles',
                imgUrl: 'chickenandwaffles.jpeg',
                alt: 'chicken and waffles',
                desc: 'fried chicken beast with waffles on the side',
                price: 7.99,
                qty: 0
            },
            item4: {
                id: 4,
                dish: 'Pizza',
                imgUrl: 'pizza.jpeg',
                alt: 'pizza',
                desc: 'Delicious pizza with any topping of your choice.',
                price: 8.99,
                qty: 0
            },
            item5: {
                id: 5,
                dish:  'chicken tetrazzini',
                imgUrl: 'chickentetrazzini.jpeg',
                alt: 'chicken tetrazzini',
                desc: 'Fresh chicken tetrazzini',
                price: 10.99,
                qty: 0
            },
            item6: {
                id: 6,
                dish: 'shrimp alfredo',
                imgUrl: 'shrimpalfredo.jpeg',
                alt: 'shrimp alfredo',
                desc: 'Fresh shrimp tetrazzini',
                price: 10.99,
                qty: 0
            },
            item7: {
                id: 7,
                dish: 'fried catfish',
                imgUrl: 'friedcatfish.jpeg',
                alt: 'fried catfish',
                desc: 'deep fried catfish',
                price: 7.99,
                qty: 0
            },
            item8: {
                id: 8,
                dish: 'meatloaf',
                imgUrl: 'meatloaf.jpeg',
                alt: 'meatloaf',
                desc: 'delicious meatloaf',
                price: 6.99,
                qty: 0,
            }
        }
    }

    init() {
        // console.log('initialized')
        this.loadItems()
        this.addtoCart()
        this.checkout()
        this.homeSwitch()
        this.confirmOrder()
        
    }

    loadItems() {
        // console.log('items loaded')
        const itemDiv = document.getElementById('itemDiv')

        /**
         * for in loop
         * 
         * for in loop loops through properties of an object
         */
        for (const key in this.menu) {
            const item = this.menu[key]

            const product = document.createElement('div')
            product.className = 'col'
            product.setAttribute('id', `item-${item.id}`)
            
            product.innerHTML = `
            <figure class="figure item-figure">
                <img src="images/${item.imgUrl}"alt="${item.alt}" class="img-fluid image item-image figure-img" />
                <figcaption class="figure-caption item-caption">${item.dish}
                        <span class="item-price" id="itemPrice">${item.price}</span>
                </figcaption>
                <p class="item-desc" id="itemDesc">${item.desc}</p>
                <button class="btn menu-btn text-capitalize" id="menuBtn" data-id=${item.id}>add to cart</button>
            </figure>
            `
            itemDiv.appendChild(product)
        }
    }

    addtoCart() {
        const menuButtons = document.querySelectorAll('.menu-btn')
        const cartItems = document.getElementById('cartItems')
        const cartSubtotal = document.getElementById('cartSubtotal')
        const subtotalValue = document.getElementById('subtotalValue')
        const taxValue = document.getElementById('taxValue')
        const deliveryValue = document.getElementById('deliveryValue')
        const checkoutItemCount = document.getElementById('checkoutItemCount')
        let taxRate = .07
        const totalValue = document.getElementById('totalValue')

        // loop through this.menu
        for (const key in this.menu) {
            const item = this.menu[key]

            // loop through buttons
            menuButtons.forEach(button => {
                button.addEventListener('click', ()=> {
                    if (button.dataset['id'] == item.id) {
                        this.itemsInCart.itemCount++
                        this.itemsInCart.price+= item.price
                        this.itemsInCart.subtotal = this.itemsInCart.price

                        item.qty++

                        this.itemsInCart.subTimesQty = (item.price * item.qty).toFixed(2)
                        this.itemsInCart.tax = this.itemsInCart.subtotal * taxRate
                        this.itemsInCart.total = (this.itemsInCart.subtotal + this.itemsInCart.tax + this.itemsInCart.deliveryFee).toFixed(2)
                    }

                    // send to DOM
                    cartItems.innerText = this.itemsInCart.itemCount
                    cartSubtotal.innerText = this.itemsInCart.price.toFixed(2)
                    subtotalValue.innerText = this.itemsInCart.subtotal.toFixed(2)
                    deliveryValue.innerText = this.itemsInCart.deliveryFee.toFixed(2)
                    taxValue.innerText = this.itemsInCart.tax.toFixed(2)
                    totalValue.innerText = this.itemsInCart.total

                    // if (this.itemsInCart.itemCount == 1) {
                    //     checkoutItemCount.innerText = `${this.itemsInCart.itemCount} item`
                    // } else {
                    //     checkoutItemCount.innerText = `${this.itemsInCart.itemCount} items`
                    // }

                    checkoutItemCount.innerText = this.itemsInCart.itemCount == 1 ? `${this.itemsInCart.itemCount} item` : `${this.itemsInCart.itemCount} items`


                })
            })
        }

    }

    checkout() {
        const cartBtn = document.getElementById('cartBtn')
        const checkoutPage = document.getElementById('checkoutPage')
        const menuSection = document.getElementById('menuSection')
        const tableBody = document.getElementById('tbody')

        let subTimesQty = 0

        cartBtn.addEventListener('click', ()=> {
            // console.log('click')
            if (menuSection.classList.contains('d-none')) return

            checkoutPage.classList.remove('d-none')
            menuSection.classList.add('d-none')

            for (const key in this.menu) {
                const item = this.menu[key]

                if (item.qty > 0) {
                    subTimesQty = (item.qty * item.price).toFixed(2)

                    const tableRow = document.createElement('tr')
                    tableRow.className = 'item-checkout'

                    tableBody.innerHTML+= `
                        <td id="itemImg">
                            <img src="images/${item.imgUrl}" alt="${item.alt}" class="img-fluid item-img" />
                        </td>
                        <td class="unit-price">${item.price.toFixed(2)}</td>
                        <td class="item-quantity">${item.qty}</td>
                        <td class="item-subtotal">${subTimesQty}</td>
                    `

                    tableBody.appendChild(tableRow)
                }
            }
        })
    }

    homeSwitch() {
        const homeSwitch = document.querySelector('.home-switch')
        const checkoutPage = document.getElementById('checkoutPage')
        const menuSection = document.getElementById('menuSection')

        homeSwitch.style.cursor = 'pointer'

        homeSwitch.addEventListener('click', ()=> {
            // console.log('clicked')
            menuSection.classList.remove('d-none')
            checkoutPage.classList.add('d-none')

            const tableBody = document.getElementById('tbody')
            tableBody.innerHTML = ''
        })
    }

    confirmOrder() {
        const confirmBtn = document.getElementById('confirmBtn')
        const tableBody = document.getElementById('tbody')
        const cartItems = document.getElementById('cartItems')
        const cartSubtotal = document.getElementById('cartSubtotal')
        const subtotalValue = document.getElementById('subtotalValue')
        const taxValue = document.getElementById('taxValue')
        const totalValue = document.getElementById('totalValue')

        confirmBtn.addEventListener('click', ()=> {
            // this.itemsInCart.itemCount = 0
            // this.itemsInCart.subtotal = 0
            for (const key in this.itemsInCart) {
                if (key != 'deliveryFee') {
                    this.itemsInCart[key] = 0
                }
            }


            tableBody.innerHTML = '<h2>Your order is confirmed</h2>'

            cartItems.innerText = this.itemsInCart.itemCount
            cartSubtotal.innerText = this.itemsInCart.subtotal.toFixed(2)
            // subtotalValue.innerText = 0
            // taxValue.innerText = 0
            // totalValue.innerText = 0

            for (const key in this.menu) {
                const item = this.menu[key]

                item.qty = 0
            }
        })
    }
}

const restaurant = new Store()

restaurant.init()