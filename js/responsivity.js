const menuBtn = document.querySelector('#menu-btn')
const closeBtn = document.querySelector('#close-btn')
const navMobile = document.querySelector('.nav-mobile')

showMobileNav = () => {
    navMobile.style.transform = 'translateX(0%)'
    menuBtn.style.display = 'none'
    closeBtn.style.display = 'block'
}

hideMobileNav = () => {
    navMobile.style.transform = 'translateX(100%)'
    closeBtn.style.display = 'none'
    menuBtn.style.display = 'block'
}
