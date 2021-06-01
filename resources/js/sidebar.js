const navbarToggler = document.querySelector("#botonSidebar")
const menuWrapper = document.querySelector(".menu-wrapper")

navbarToggler.addEventListener("click", () => {
    menuWrapper.classList.toggle("mostrar")
    console.log("hola")
})

// window.addEventListener("resize", () => {
//     if (window.innerWidth >= 699) {
//         menuWrapper.classList.remove("mostrar")
//     }
// })