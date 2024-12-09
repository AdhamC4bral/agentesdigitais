// inicialização

const RESPONSIVE_WIDTH = 1024 // largura responsiva para colapso do cabeçalho

let headerWhiteBg = false // variável para controlar o fundo branco do cabeçalho
let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH // verifica se o cabeçalho deve estar colapsado com base na largura da janela
const collapseBtn = document.getElementById("collapse-btn") // botão de colapso do cabeçalho
const collapseHeaderItems = document.getElementById("collapsed-header-items") // itens do cabeçalho colapsado

function onHeaderClickOutside(e) {
    // função para lidar com cliques fora do cabeçalho colapsado
    if (!collapseHeaderItems.contains(e.target)) {
        toggleHeader() // alterna o estado do cabeçalho
    }
}

function toggleHeader() {
    // função para alternar o estado do cabeçalho entre colapsado e expandido
    if (isHeaderCollapsed) {
        // expande o cabeçalho
        collapseHeaderItems.classList.add("opacity-100")
        collapseHeaderItems.style.width = "60vw"
        collapseBtn.classList.remove("bi-list")
        collapseBtn.classList.add("bi-x", "max-lg:tw-fixed")
        isHeaderCollapsed = false

        setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 1)
    } else {
        // colapsa o cabeçalho
        collapseHeaderItems.classList.remove("opacity-100")
        collapseHeaderItems.style.width = "0vw"
        collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed")
        collapseBtn.classList.add("bi-list")
        isHeaderCollapsed = true
        window.removeEventListener("click", onHeaderClickOutside)
    }
}

function responsive() {
    // função para ajustar o cabeçalho com base no redimensionamento da janela
    if (window.innerWidth > RESPONSIVE_WIDTH) {
        collapseHeaderItems.style.width = "" // restaura o estilo de largura padrão
    } else {
        isHeaderCollapsed = true // define o cabeçalho como colapsado
    }
}

window.addEventListener("resize", responsive) // adiciona um ouvinte de evento para redimensionamento da janela

/**
 * Animações
 */

gsap.registerPlugin(ScrollTrigger) // registra o plugin ScrollTrigger do GSAP

gsap.to(".reveal-up", {
    opacity: 0,
    y: "100%", // animação para elementos que revelam de baixo para cima
})

gsap.to("#dashboard", {
    boxShadow: "0px 15px 25px -5px #7e22ceaa", // sombra para o elemento com id dashboard
    duration: 0.3,
    scrollTrigger: {
        trigger: "#hero-section",
        start: "60% 60%",
        end: "80% 80%",
        // markers: true
    }
})

// endireita a imagem inclinada
gsap.to("#dashboard", {
    scale: 1,
    translateY: 0,
    rotateX: "0deg",
    scrollTrigger: {
        trigger: "#hero-section",
        start: window.innerWidth > RESPONSIVE_WIDTH ? "top 95%" : "top 70%",
        end: "bottom bottom",
        scrub: 1,
        // markers: true,
    }
})

const faqAccordion = document.querySelectorAll('.faq-accordion') // seleciona todos os elementos do acordeão de FAQ

faqAccordion.forEach(function (btn) {
    btn.addEventListener('click', function () {
        this.classList.toggle('active') // alterna a classe ativa no botão

        let content = this.nextElementSibling // obtém o conteúdo seguinte ao botão
        if (content.style.maxHeight === '200px') {
            content.style.maxHeight = '0px'
            content.style.padding = '0px 18px'
        } else {
            content.style.maxHeight = '200px'
            content.style.padding = '20px 18px'
        }
    })
})

// ------------- animações de revelação de seção ---------------

const sections = gsap.utils.toArray("section") // converte todas as seções em um array

sections.forEach((sec) => {

    const revealUptimeline = gsap.timeline({paused: true, 
                                            scrollTrigger: {
                                                            trigger: sec,
                                                            start: "10% 80%", // topo do gatilho atinge o topo da visualização
                                                            end: "20% 90%",
                                                            // markers: true,
                                                        }})

    revealUptimeline.to(sec.querySelectorAll(".reveal-up"), {
        opacity: 1,
        duration: 0.8,
        y: "0%",
        stagger: 0.2,
    })
})