const explorarBtn = document.querySelector('.explorar-btn') //BOTÃO EXPLORAR CARDÁPIO
 //ELEMENTO QUE MOSTRA O VALOR TOTAL DO PEDIDO
let orderTable = document.querySelector('.order-list')
let mainTHead = document.querySelector('.main-thead')
let mobileTHead = document.querySelector('.mobile-thead')
let tbody = document.querySelector('tbody')
let mainTFoot = document.querySelector('.main-tfoot')
let mobileTFoot = document.querySelector('.mobile-tfoot')



//NÚMERO PARA FORMATO MONETÁRIO
const currencyFormat = number => number.toLocaleString("pt-Br", { style: "currency", currency: "BRL" })


//ADICIONA ITEM AO PEDIDO
let id = 0
const addToOrderList = (img, name, price, button) => {
    let item = ''
    const qttElement = button.parentElement.parentElement.querySelector('.qtd')

    const qtt = qttElement.textContent
    const subtotal = qtt * price
    item = { id: ++id, img: img, name: name, price: price, qtt: qtt, subtotal: subtotal }
    
    orderList.push(item)
}

let orderList = [] //ARRAY QUE RECEBE LISTA DE PEDIDOS


//REMOVE ITEM DO PEDIDO
const removeFromOrderList = (button, id) => {

    const row = button.parentElement.parentElement //ENCONTRA A TR (LINHA) ONDE O BUTTON ESTÁ INSERIDO

    const position = orderList.findIndex(item => item.id == id)

    orderList.splice(position, 1)
    

    row.remove()
    callPedido()
    

    const mainTotalOfOrder = document.querySelector('.main-total-order')
    mainTotalOfOrder.textContent = currencyFormat(sumOrder())

    const mobileTotalOfOrder = document.querySelector('.mobile-total-order')
    mobileTotalOfOrder.textContent = currencyFormat(sumOrder())

    if (orderList.length == 0) {
        noOrder()
    }

    showQttLabel()
}


//DECREMENTA QUANTIDADE NO PEDIDO
const decrementOrder = (button, index) => {
    const qttElement = button.parentElement.querySelector('.qtd')
    let qtt = parseInt(qttElement.textContent)
    if (qtt > 1) {
        qtt--
    }

    qttElement.textContent = qtt

    updateArray(button, qtt, index)
}


//INCREMENTA QUANTIDADE NO PEDIDO
const incrementOrder = (button, index) => {
    const qttElement = button.parentElement.querySelector('.qtd')
    let qtt = parseInt(qttElement.textContent)
    qtt++

    qttElement.textContent = qtt

    updateArray(button, qtt, index)
}


//MOSTRA PEDIDO
function showOrder(array) {
    let list = ''

    array.forEach((item, index) => {

        list +=
            `
            <tr class="main-tr">
                <td>
                    <img class="order-meal-img" src=${item.img}>
                </td>
                <td class="order-meal-name">
                    ${item.name}
                </td>
                <td class="order-meal-price">
                    ${currencyFormat(item.price)}
                </td>
                <td class="order-meal-qtd">
                    <button class="qtd-btn" onclick="decrementOrder(this, ${index})"><i class="fa-solid fa-minus"></i></button>

                    <span class="qtd">${item.qtt}</span>

                    <button class="qtd-btn" onclick="incrementOrder(this, ${index})"><i class="fa-solid fa-plus"></i></button>
                </td>
                <td class="order-meal-subtotal">
                    ${currencyFormat(item.subtotal)}
                </td>
                <td>
                    <button class="remove-btn" onclick="removeFromOrderList(this, ${item.id})">    
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            </tr>

            <tr class="mobile-tr">
                <td>
                    <img class="order-meal-img" src=${item.img}>

                    <br>

                    ${item.name}
                </td>
                <td class="order-meal-price">
                    ${currencyFormat(item.price)}

                    <br>
                    <br>

                    <button class="qtd-btn" onclick="decrementOrder(this, ${index})"><i class="fa-solid fa-minus"></i></button>

                    <span class="qtd">${item.qtt}</span>

                    <button class="qtd-btn" onclick="incrementOrder(this, ${index})"><i class="fa-solid fa-plus"></i></button>
                </td>
                <td class="order-meal-subtotal">
                    ${currencyFormat(item.subtotal)}
                </td>
                <td>
                    <button class="remove-btn" onclick="removeFromOrderList(this, ${item.id})">    
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            </tr>       
            `
    })

    tbody.innerHTML = list
}

const updateArray = (button, qtt, index) => {
    const subtotal = button.parentElement.parentElement.querySelector('.order-meal-subtotal')
    const mainTotalOfOrder = document.querySelector('.main-total-order')
    const mobileOfOrder = document.querySelector('.mobile-total-order')

    orderList[index].qtt = qtt
    orderList[index].subtotal = orderList[index].qtt * orderList[index].price

    subtotal.textContent = currencyFormat(orderList[index].subtotal)
    mainTotalOfOrder.textContent = currencyFormat(sumOrder())
    mobileOfOrder.textContent = currencyFormat(sumOrder())
}

//CHAMA TELA PEDIDO
const callPedido = () => {
    homePage.style.display = 'none'
    others.style.display = 'none'
    yourOrder.style.display = 'block'

    if (orderList.length == 0) {
        noOrder()
    } else {
        explorarBtn.style = 'display: none'
        orderTitle.innerHTML = 'Seu pedido'
        orderSubtitle.style = 'display: block'
        orderSubtitle.innerHTML = '"Sua festa de sabores Mamma Mia!"'
        orderSubtitle.style.marginBottom = '4rem'

        orderTable.style = 'display: block'
        mainTHead.innerHTML =
            `
                        <th>Imagem</th>
                        <th>Prato</th>
                        <th>Valor</th>
                        <th>Qtd</th>
                        <th>Subtotal</th>
                        <th>Remover</th>
                        `

        mobileTHead.innerHTML =
            `
                        <th>Prato</th>
                        <th>Valor</th>
                        <th>Subtotal</th>
                        <th>Remover</th>
                        `

        showOrder(orderList)

        mainTFoot.innerHTML = 
                            `
                                <td colspan="4">TOTAL</td>
                                <td class="main-total-order" colspan="2">${currencyFormat(sumOrder())}</td>
                            `

        mobileTFoot.innerHTML = 
                            `
                                <td colspan="2">TOTAL</td>
                                <td class="mobile-total-order" colspan="2">${currencyFormat(sumOrder())}</td>
                            `
    }
    hideMobileNav()
}


//SOMA TOTAL DO PEDIDO
const sumOrder = () => {
    return orderList.reduce((acc, item) => acc + item.subtotal, 0)
}




//CHAMA TELA SEM PEDIDO
const noOrder = () => {
    orderTitle.innerHTML = 'Você ainda não fez nenhum pedido...'
    orderSubtitle.style = 'display: none'
    explorarBtn.style = 'display: block'
    explorarBtn.textContent = 'Explorar Cardápio'
    orderTable.style = 'display: none'
}
