//MAPEAMENTOS
const homePage = document.querySelector('.home')
const others = document.querySelector('.others')
const yourOrder = document.querySelector('.your-order')
const meals = document.querySelector('.meals')
const title = document.querySelector('.title')
const subtitle = document.querySelector('.subtitle')
const orderTitle = document.querySelector('.order-title')
const orderSubtitle = document.querySelector('.order-subtitle')
const selectBox = document.querySelector('.select-box')



//MOSTRA PRATOS
function showItems(array) {
    let menuItems = ''

    array.forEach(item => {
        let labels = ''
        item.vegetarian ? labels += '<li class="vegetarian">VEGETARIANO</li>' : labels += '<li class="traditional">TRADICIONAL</li>'
        item.top5 ? labels += '<li class="top5">TOP 5</li>' : labels

        menuItems +=
            `
            <li class="meal-box" onmouseover="showAddButton(this)" onmouseleave="hideAddButton(this)">
                <img class="meal-img" src="${item.img}">
                <div class="meal-info">
                    <ul class="meal-category">
                        ${labels}
                    </ul>
                    <h4 class="meal-name">${item.name}</h4>
                    <p class="ingredients"><span>Ingredientes: </span>${item.ingredients}</p>
                    <div class="price-qtd-box">
                        <span class="price">${item.price.toLocaleString("pt-Br", { style: "currency", currency: "BRL" })}</span>
                        <div class="qtd-box"> 
                            <button class="qtd-btn" onclick="decrementCard(this)"><i class="fa-solid fa-minus"></i></button>
                            <span class="qtd">1</span>
                            <button class="qtd-btn" onclick="incrementCard(this)"><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                    <div class="add-btn-box">
                        <button class="add-btn" onclick="addToOrderList('${item.img}', '${item.name}', ${item.price}, this), showQttLabel(), showAddMsg(this)">Adicionar ao Pedido</button>
                        
                        <button class="add-btn-touchScreen" onclick="addToOrderList('${item.img}', '${item.name}', ${item.price}, this), showQttLabel(), showAddMsg(this)">Adicionar ao Pedido</button>
                    </div>
                </div>
            </li>
            `
    })

    meals.innerHTML = menuItems
}


//MOSTRA PROMOÇÕES
function showSales(array) {
    let menuItems = ''

    array.forEach(item => {
        let labels = ''
        item.vegetarian ? labels += '<li class="vegetarian">VEGETARIANO</li>' : labels += '<li class="traditional">TRADICIONAL</li>'
        item.top5 ? labels += '<li class="top5">TOP 5</li>' : labels

        menuItems +=
            `
            <li class="meal-box" onmouseover="showAddButton(this)" onmouseleave="hideAddButton(this)">
                <img class="meal-img" src="${item.img}">
                <div class="meal-info">
                    <ul class="meal-category">
                        ${labels}
                    </ul>
                    <h4 class="meal-name">${item.name}</h4>
                    <p class="ingredients"><span>Ingredientes: </span>${item.ingredients}</p>
                    <div class="price-qtd-box">
                        <span class="price">${item.price.toLocaleString("pt-Br", { style: "currency", currency: "BRL" })}</span>
                        <span class="descount">${item.descount}</span>
                        <div class="qtd-box"> 
                        <button class="qtd-btn" onclick="decrementCard(this)"><i class="fa-solid fa-minus"></i></button>
                        <span class="qtd">1</span>
                        <button class="qtd-btn" onclick="incrementCard(this)"><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                    <div class="add-btn-box">
                        <button class="add-btn" onclick="addToOrderList('${item.img}', '${item.name}', ${item.price}, this), showQttLabel(), showAddMsg(this)">Adicionar ao Pedido</button>

                        <button class="add-btn-touchScreen" onclick="addToOrderList('${item.img}', '${item.name}', ${item.price}, this), showQttLabel(), showAddMsg(this)">Adicionar ao Pedido</button>
                    </div>
                </div>
            </li>
            `
    })

    meals.innerHTML = menuItems
}


//DECREMENTA QUANTIDADE NO CARD
const decrementCard = (button) => {
    const qttElement = button.parentElement.querySelector('.qtd')
    let qtt = parseInt(qttElement.textContent)
    if (qtt > 1) {
        qtt--
    }
    qttElement.textContent = qtt
}


//INCREMENTA QUANTIDADE NO CARD
const incrementCard = (button) => {
    const qttElement = button.parentElement.querySelector('.qtd')
    let qtt = parseInt(qttElement.textContent)
    qtt++
    qttElement.textContent = qtt
}


//CHAMA HOME PAGE
const callHomePage = () => {
    location.reload()
}


//CHAMA TELA CARDÁPIO
const callCardapio = () => {
    yourOrder.style.display = 'none'
    homePage.style.display = 'none'
    others.style.display = 'block'
    title.innerHTML = 'Cardápio'
    subtitle.innerHTML = '"Uma sinfonia de sabores italianos em cada prato!"'
    selectBox.style.display = 'none'
    subtitle.style.marginBottom = '4rem'

    showItems(menu)
    hideMobileNav()
}


//CHAMA TELA PROMOÇÕES
const callPromocoes = () => {
    yourOrder.style.display = 'none'
    homePage.style.display = 'none'
    others.style.display = 'block'
    title.innerHTML = 'Promoções'
    subtitle.innerHTML = '"Sabor e economia, uma combinação irresistível!"'
    selectBox.style.display = 'none'
    subtitle.style.marginBottom = '4rem'

    const descount = 15
    const newPrices = menu.filter(item => item.sale)
        .map(item => ({
            ...item,
            price: item.price - item.price * (descount / 100),
            descount: `${descount}% OFF`
        }))

    showSales(newPrices)
    hideMobileNav()
}


//CHAMA TELA CATEGORIAS
const callCategorias = () => {
    yourOrder.style.display = 'none'
    homePage.style.display = 'none'
    others.style.display = 'block'
    title.innerHTML = 'Categorias'
    subtitle.innerHTML = '"Um universo de sabores italianos à sua escolha!"'
    subtitle.style.marginBottom = '2rem'
    selectBox.style.display = 'block'
    selectBox.value = 'all'

    showItems(menu)
    hideMobileNav()
}


//PRATOS POR CATEGORIA
const applyFilter = option => {
    let list = ''

    switch (option) {
        case 'all':
            showItems(menu)
            break

        case 'traditional':
            list = menu.filter(item => !item.vegetarian)

            showItems(list)
            break

        case 'vegetarian':
            list = menu.filter(item => item.vegetarian)

            showItems(list)
            break

        case 'top5':
            list = menu.filter(item => item.top5)

            showItems(list)
            break
    }
}


//MOSTRA BOTÃO ADICIONAR
const showAddButton = button => {
    const addBtn = button.querySelector('.add-btn')

    addBtn.style.marginTop = '.85rem'
}


//ESCONDE BOTÃO ADICIONAR
const hideAddButton = button => {
    const addBtn = button.querySelector('.add-btn')

    addBtn.style.marginTop = '3.5rem'
}


//MOSTRA LABEL DE QUANTIDADES
const showQttLabel = () => {
    const qttLabel = document.querySelector('.qtt-label')
    const qttLabelMobile = document.querySelector('.qtt-label-mobile')
    

    if (orderList.length == 0) {
        qttLabel.style = 'display: none'
        qttLabelMobile.style = 'display: none'
    } else {
        qttLabel.style = 'display: flex'
        qttLabelMobile.style = 'display: flex'
        qttLabel.textContent = orderList.length
        qttLabelMobile.textContent = orderList.length
    }
}


//MOSTRA MENSAGEM DE ITEM ADICIONADO
const showAddMsg = button => {
    const addBtn = button.parentElement.querySelector('.add-btn')
    addBtn.textContent = 'Item Adicionado!'
    addBtn.style.backgroundColor = '#E30016'

    const addBtn2 = button.parentElement.querySelector('.add-btn-touchScreen')
    addBtn2.textContent = 'Item Adicionado!'
    addBtn2.style.backgroundColor = '#E30016'

    setTimeout(() => {
        addBtn.textContent = 'Adicionar ao Pedido'
        addBtn.style.backgroundColor = '#006828'
    }, 1500);

    setTimeout(() => {
        addBtn2.textContent = 'Adicionar ao Pedido'
        addBtn2.style.backgroundColor = '#006828'
    }, 1500);
}


//EVENTOS
selectBox.addEventListener('change', () => applyFilter(selectBox.value))





