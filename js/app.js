class Store {
    constructor() {

        // track how many items are in thr cart and the subtotal of the items
        this.itemsInCart = {
            itemCount: 0,
            subtotal: 0
        }

        this.menu ={

            item1: {
                id: 1,
                dish: 'spaghetti and meatballs',
                imgUrl: 'spaghettiandmeatballs.jpeg',
                alt: 'spaghettil and meatballs',
                desc: 'spagehett with tomato sauce and meatballs',
                price: 9.99,
                qty: 0
            },
            item2: {
                id: 2,
                dish: 'cheeseburger',
                imgUrl: 'cheeseburger.jpeg',
                alt: 'cheeseburger',
                desc: 'delicious burger with your choice of cheese. Comes with lettuce, pickles, tomato, and onion. Also comes with fries on the side.',
                price: 14.99,
                qty: 0
            },
            item3: {
                id: 3,
                dish: 'chicken and waffles',
                imgUrl: 'chicken_and_waffles.jpeg',
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
                price: '10.99',
                qty: 0
            },
            item6: {
                id: 6,
                dish: 'shrimp tetrazzini',
                imgUrl: 'shrimptetrazzini.jpeg',
                alt: 'shrimp tetrazzini',
                desc: 'Fresh shrimp tetrazzini',
                price: '10.99',
                qty: 0
            },
            item7: {
                id: 7,
                dish: 'fried catfish',
                imgUrl: 'fried catfish.jpeg',
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
    }

    loadItems() {
        console.log('items loaded')
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
                <img src="${item.imgUrl}"alt="${item.alt}" class="img-fluid image item-image figure-img" />
                <figcaption class="figure-caption item-caption">${item.dish}
                        <span class="item-price" id="itemPrice">${item.price}</span>
                </figcaption>
                <p class="item-desc" id="itemDesc">${item.desc}</p>
                <button class="btn menu text-capitalize" id="menuBtn" data-id=${item.id}>add to cart</button>
            </figure>
            `
            itemDiv.appendChild(product)
        }
    }
}

const restaurant = new Store()

restaurant.init()