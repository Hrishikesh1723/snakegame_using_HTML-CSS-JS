//Game Constants and variables
let inputDir = {x: 0 , y: 0};
const foodSound = new Audio('eating.mp3');
const gameOver = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const gameSound = new Audio('background.mp3');
gameSound.volume = 0.5;
let speed = 5;
let score = 0;
let lasttime = 0;
let snakeArr = [
    {x:13 , y:15}
]
food = {x:5 , y:6}

//game functions
function main(currtime){
    window.requestAnimationFrame(main);
    if ((currtime-lasttime)/1000 < 1/speed){
        return;
    }
    lasttime = currtime
    gameEngine();
}

function isCollide(snake){
    //if snake collide itself
    for (let ind = 1; ind < snakeArr.length; ind++) {
        if(snake[ind].x === snake[0].x && snake[ind].y === snake[0].y){
            return true;
        }
    }
    // if snake collide wall 
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=20 || snake[0].y<=0 ){
        return true;
    }
}

function gameEngine(){
    //first half to update snake array
    //collision condition
    if(isCollide(snakeArr)){
        gameOver.play() 
        gameSound.pause()
        inputDir = {x: 0 , y: 0}
        alert("Game over! Press any key to play again.")
        snakeArr = [{x:13 , y:15}]
        gameSound.play()
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
    }

    //Eating the food and regenerating food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play()
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
        score += 1;
        if(score>hiscoreVal){
            hiscoreVal = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreVal))
            HiScoreBox.innerHTML = "Hi-Score: " + hiscoreVal;
        }
        scoreBox.innerHTML = "Score: " + score;
        let a  = 2;
        let b  = 17;
        food = {x: Math.round(a + (b - a)* Math.random()), y: Math.round(a + (b - a)* Math.random())};
    }

    //Moving snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]}
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //second half to Display snake and food

    //display Snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x; 
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    //display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//Main logic
gameSound.play()
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreVal = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreVal))
}
else{
    hiscoreVal = JSON.parse(hiscore);
    HiScoreBox.innerHTML = "Hi-Score: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = {x: 0, y: 1} // start game
    moveSound.play()
    switch(e.key){
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})