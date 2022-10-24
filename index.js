var cart = []
const productDiv = document.getElementById('product')
const badge = document.getElementById('itemIncart')
const cartDiv = document.getElementsByClassName('cart-div')[0]
const cartDivUI = document.getElementById('cart-div')
const checkOut = document.getElementById('checkout')
var cartTotal = document.getElementById('cartTotal')
const products = [
    {id:1, name: 'Senator Material', price: 10000, img: './images/clothe1.jpg', amount: 1},
    {id:2, name: 'Cashmere Material Black', price: 8000, img: './images/clothe2.jpeg', amount: 1},
    {id:3, name: 'Cashmere Material Brown', price: 8000, img: './images/clothe3.jpg', amount: 1},
    {id:4, name: 'Italian Fabrics Blue', price: 10000, img: './images/clothe4.jpg', amount: 1},
    {id:5, name: 'Italian Fabrics Ash', price: 10000, img: './images/clothe5.jpg', amount: 1},
    {id:6, name: 'Senator Guinea', price: 20000, img: './images/clothe6.png', amount: 1},
    {id:7, name: 'Senator Material', price: 30000, img: './images/clothe7.jpg', amount: 1},
    {id:8, name: 'Guinea purple', price: 20000, img: './images/clothe8.webp', amount: 1},
    {id:9, name: 'Guinea Sky blue', price: 10000, img: './images/clothe9.jpg', amount: 1},
    {id:10, name: 'Fabric Material Red', price: 13000, img: './images/clothe10.jpg', amount: 1},
    {id:11, name: 'Fabric Material', price: 15000, img: './images/clothe11.jpg', amount: 1},
    {id:12, name: 'Lace Red', price: 10000, img: './images/clothe12.jpg', amount: 1}
]

products.map(({name, price, img, id}) => (
    productDiv.innerHTML += `
        <div class="col-8 col-md-3 col-lg-2 text-center mb-4 mx-auto">
            <img src=${img} class='img-fluid w-100 h-50 cart-img' alt="">
            <p>${name}</p>
            <div class="d-flex flex-row gap-2">
                <button class="btn btn-success addToCart" id=${id}>Add to cart</button>
                <p class="ms-auto">&#8358;${price}</p>
            </div>
        </div>
    `
))

const calculateTotal = () => {
    var cartTotals = 0
    cart.forEach(({price, amount}) => {
         cartTotals += price * amount  
    })
    cartTotal.innerHTML = `&#8358;${cartTotals}`
}
const addToCart = (id) => {
    let add = products.filter((product) => product.id == id ? product : null)
    cart.push(...add)
    localStorage.setItem('cart', JSON.stringify(cart))
    badge.innerHTML = cart.length
}

const setCart = () => {
    let isEmpty = localStorage.getItem('cart') == null
    if(isEmpty){
        return
    }
    m = JSON.parse(localStorage.getItem('cart'))
    cart.push(...m)
    badge.innerHTML = cart.length
    calculateTotal()
}
setCart()

var allbtns = [...document.querySelectorAll('.addToCart')]
allbtns.forEach(btn => {
    let id = btn.id
    let inCart = cart.find(item => item.id == id)
    
    if(inCart){
        btn.innerText = 'In Cart'
        btn.disabled = true
    }
    btn.addEventListener('click', e => {
        e.target.innerHTML = 'In Cart'
        e.target.disabled = true
        addToCart(e.target.id)
        calculateTotal()
        if(cartDiv.classList.toggle('active')){
            cartDiv.classList.remove('active')
        }
    })
})

const displayCart = () => {
    // console.log(cart == 0);
    
    if(cart == 0){
        alert('Buy something Eje')
        return
    }
    cartDiv.classList.toggle('active')
    cartDivUI.innerHTML = ''
    cart.map(({name, price, img, amount, id}) => (
        cartDivUI.innerHTML +=
        `
        <div class="col-7 col-md-5 text-center d-flex flex-row px-1 py-2 gap-2" id=${id}>
            <img src=${img} class='img-fluid w-50 h-100' alt="">
            <div class="d-flex flex-column col-8 col-md-12 text-start">
                <p class="w-100 mb-0">${name}</p>
                <p class='mb-0'>&#8358;${price}</p>
                <div class="mb-1 d-flex gap-2">
                    <button class="btn btn-success decrease h6" id=${id}>-</button>
                    <p class="quantity" id=${id}>${amount}</p>
                    <button class="btn btn-success increase h6" id=${id}>+</button>
                </div>
                <button class="btn btn-danger col-7 col-md-11 remove">remove</button>
            </div>
        </div>
        `
    ))
    let n = [...document.querySelectorAll('.remove')]
    let quantities = [...document.querySelectorAll('.quantity')]

    n.forEach(n => {
        n.addEventListener('click', e => {
            var cartId = e.target.parentNode.parentNode.id
            
            var m = cart.filter(cart => cart.id != cartId)
            cart = m
            localStorage.setItem('cart', JSON.stringify(cart))
            calculateTotal()
            allbtns.forEach(btn => {
                if(btn.id == cartId){
                    btn.disabled = false
                    btn.innerHTML = 'Add to cart'
                }
            })
            e.target.parentNode.parentNode.remove()
            badge.innerHTML = cart.length
        })
    })
    let inc = [...document.querySelectorAll('.increase')]
    let dec = [...document.querySelectorAll('.decrease')]
    inc.forEach(inc => {
        inc.addEventListener('click', e => {
            let incId = e.target.id
            let tempItem = cart.find(item => item.id == incId)
            tempItem.amount = tempItem.amount + 1
            localStorage.setItem('cart', JSON.stringify(cart))
            calculateTotal()
            
            quantities.forEach(qty => {
                if(qty.id == incId){
                    qty.innerHTML = tempItem.amount
                }
            })
        })
    })

    dec.forEach(dec => {
        dec.addEventListener('click', e => {
            let decId = e.target.id
            let tempItem = cart.find(item => item.id == decId)
            tempItem.amount = tempItem.amount - 1
            if(tempItem.amount <= 0){
                allbtns.forEach(btn => {
                    if(btn.id == decId){
                        btn.disabled = false
                        btn.innerHTML = 'Add to cart'
                    }
                })
                cart = cart.filter(item => item.id != tempItem.id)
                e.target.parentNode.parentNode.parentNode.remove()
                badge.innerHTML = cart.length
            }
            
            localStorage.setItem('cart', JSON.stringify(cart))
            calculateTotal()
            quantities.forEach(qty => {
                if(qty.id == decId){
                    qty.innerHTML = tempItem.amount
                }
            })
        })
    })
    
}
checkOut.addEventListener('click', (e) => {
    if(cart.length > 0){
        let checking = window.confirm('Are you sure that is all you want to buy')
        if(checking){
            cartDiv.classList.remove('active')
            allbtns.filter(btn => {
                if((btn.innerHTML == 'In Cart')){
                    btn.disabled = false
                    btn.innerHTML = 'Add to cart'
                }

            })
            cart = []
            calculateTotal()
            badge.innerHTML = cart.length
            localStorage.setItem('cart', JSON.stringify(cart))
            alert('Thanks for your patronage eje')
        }   
    }
})