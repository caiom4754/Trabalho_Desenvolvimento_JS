// Seleciona os elementos com as classes 'crash-run' e 'tnt'
const crash = document.querySelector('.crash-run');
const tnt = document.querySelector('.tnt');

// Função que simula um pulo adicionando e removendo a classe 'pulo' após um intervalo de tempo
const pulo = () => {
    crash.classList.add('pulo');
    setTimeout(() => {
        crash.classList.remove('pulo');
    }, 600);
};

// Loop que verifica a posição dos elementos e realiza ações com base nessas posições
const loop = setInterval(() => {
    const tntposition = tnt.offsetLeft;
    const crashposition = parseFloat(window.getComputedStyle(crash).bottom);

    // Condição para verificar a colisão entre os elementos
    if (tntposition <= 120 && tntposition >= 0 && crashposition < 120) {
        // Modifica algumas propriedades visuais do elemento 'tnt' e 'crash'
        tnt.style.animation = 'none';
        tnt.style.left = `${tntposition}px`;
        crash.style.animation = 'none';
        crash.style.bottom = `${crashposition}px`;
        crash.src = 'img/crash-angel.png';
        crash.style.width = '175px';
        crash.style.marginRight = '50px';
        crash.style.zIndex = '1'; // Define um z-index maior para o crash-angel

        // Encerra o loop
        clearInterval(loop);
    }
}, 10);

// Adiciona um evento de tecla pressionada para chamar a função 'pulo'
document.addEventListener('keydown', pulo);
