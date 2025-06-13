// Declaração de variáveis globais
var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 15;
var intervalocriameteoro = 2000;
var niveljogo = window.location.search;
niveljogo = niveljogo.replace('?', '');

console.log(niveljogo);

// Configuração do intervalo de criação de meteoros com base no nível do jogo
if (niveljogo === 'normal') {
    intervalocriameteoro = 1500;
} else if (niveljogo === 'medio') {
    intervalocriameteoro = 1000;
} else if (niveljogo === 'Dificil') {
    intervalocriameteoro = 750;
}

// Função para ajustar o tamanho do palco do jogo conforme a tela
function ajustatamanhopalcojogo() {
    altura = window.innerHeight;
    largura = window.innerWidth;
    console.log(altura, largura);
}

ajustatamanhopalcojogo();

// Configuração do cronômetro para controlar o tempo de jogo
var cronometro = setInterval(function () {
    tempo -= 1;
    if (tempo < 0) {
        clearInterval(cronometro);
        clearInterval(criameteoro);
        window.location.href = "vitoria.html";
    } else {
        document.getElementById('cronometro').innerHTML = tempo;
    }
}, 1000);

// Função para gerar posição randomica e criar meteoros
function posicaoRandomica() {
    // Remover meteoro anterior e verificar vidas
    if (document.getElementById('meteoro')) {
        document.getElementById('meteoro').remove();
        if (vidas > 3) {
            window.location.href = 'gameOver.html';
        } else {
            document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png";
            vidas++;
        }
    }

    // Calcular posição randomica
    var posicaoX = parseInt(Math.random() * largura) - 90;
    var posicaoY = parseInt(Math.random() * altura) - 90;
    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

    console.log(posicaoX, posicaoY);

    // Criar elemento meteoro e configurar suas propriedades
    var meteoro = document.createElement('img');
    meteoro.src = 'imagens/meteoro.png';
    meteoro.className = tamanhoAleatorio() + " " + ladoAleatorio();
    meteoro.style.left = posicaoX + 'px';
    meteoro.style.top = posicaoY + 'px';
    meteoro.style.position = 'absolute';
    meteoro.id = 'meteoro';
    meteoro.onclick = function () {
        this.remove();
    };
    document.body.appendChild(meteoro);
}

// Função para retornar tamanho aleatório para o meteoro
function tamanhoAleatorio() {
    var tamanho = Math.floor(Math.random() * 3);
    switch (tamanho) {
        case 0:
            return 'meteoro1';
            break;
        case 1:
            return 'meteoro2';
            break;
        case 2:
            return 'meteoro3';
            break;
    }
}

// Função para retornar lado aleatório para o meteoro
function ladoAleatorio() {
    var lado = Math.floor(Math.random() * 2);
    switch (lado) {
        case 0:
            return 'lado1';
            break;
        case 1:
            return 'lado2';
            break;
    }
}
