// Botão de play
const play_button = document.querySelector("#play_button");

// Contexto do canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvas_width = canvas.width;
const canvas_height = canvas.height;

// Tamanho e posição inicial do paddle
const paddle_width = 70;
const paddle_height = 10;
let paddleX;
let leftPressed = false;
let rightPressed = false;

// Tamanho e posição inicial da bola
const ball_size = 10;
let x;
let y;
let dx;
let dy;

let score;
let level;

// Função para obter o high score do armazenamento local
function getHighScore() {
    return localStorage.getItem("highScore") || 0;
}

// Função para definir o high score no armazenamento local
function setHighScore(newHighScore) {
    localStorage.setItem("highScore", newHighScore);
}

// Função para desenhar a bola
function drawBall() {
    ctx.beginPath();
    ctx.rect(x, y, ball_size, ball_size);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

// Função para desenhar o paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas_height - 20, paddle_width, paddle_height);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

// Função para desenhar a pontuação
function drawScore() {
    ctx.font = "16px Monospace";
    ctx.fillStyle = "green";
    ctx.fillText(`Score: ${score}`, 8, 20);
}

// Função para desenhar o nível
function drawLevel() {
    ctx.font = "16px Monospace";
    ctx.fillStyle = "green";
    ctx.fillText(`Level: ${level}`, 8, 40);
}

// Função para desenhar o high score
function drawHighScore() {
    ctx.font = "16px Monospace";
    ctx.fillStyle = "green";
    ctx.fillText(`High Score: ${getHighScore()}`, 8, 60);
}

// Função para desenhar "Game Over"
function drawGameOver() {
    ctx.font = "24px Monospace";
    ctx.fillStyle = "green";
    ctx.fillText("GAME OVER", (canvas_width - 100) / 2, canvas_height / 2, 100);
}

// Manipulador de evento para tecla pressionada
function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
        leftPressed = false;
    }

    if (e.key === "Left" || e.key === "ArrowLeft") {
        rightPressed = false;
        leftPressed = true;
    }
}

// Manipulador de evento para tecla liberada
function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    }

    if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

// Manipulador de evento para movimento do mouse
function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddle_width / 2;
    }
}

// Adiciona ouvintes de eventos
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

// Função principal para desenhar o jogo
function draw() {
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    drawBall();
    drawPaddle();
    drawScore();
    drawLevel();
    drawHighScore();

    if (x + dx < 0 || x + dx > canvas_width - ball_size) {
        dx = -dx;
    }

    if (y + dy < 0) {
        dy = -dy;
    } else if (y + dy > canvas_height - 3 * ball_size) {
        if (x > paddleX - ball_size && x < paddleX + paddle_width + ball_size) {
            dy = -dy;
            score++;

            if (score % 5 === 0) {
                level += 1;
                dy += 0.5 * Math.sign(dy);
                dx += 0.5 * Math.sign(dx);
            }
        } else {
            drawGameOver();
            play_button.disabled = false;

            if (score > getHighScore()) {
                setHighScore(score);
            }

            return;
        }
    }

    if (rightPressed) {
        paddleX = Math.min(paddleX + 7, canvas_width - paddle_width);
    }
    if (leftPressed) {
        paddleX = Math.max(paddleX - 7, 0);
    }

    x += dx;
    y += dy;

    requestAnimationFrame(draw);
}

// Função para iniciar o jogo
function play() {
    play_button.innerText = "restart";
    play_button.disabled = true;
    x = Math.random() * canvas_width;
    y = Math.random() * canvas_height / 3;
    dx = 5;
    dy = 4;
    paddleX = (canvas_width - paddle_width) / 2;
    score = 0;
    level = 1;

    draw();
}

// Adiciona um ouvinte de evento ao botão de play
play_button.addEventListener("click", play);
