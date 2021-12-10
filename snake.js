function init(){
    canvas = document.getElementById("mycanvas");
    pen = canvas.getContext("2d");
    W = H = canvas.width = canvas.height=600;
    cs = 30;
    food = getRandomFood();
    score = 0;
    game_over = false;

    food_img = new Image();
    food_img.src = "Images/apple.png";

    trophy_img = new Image();
    trophy_img.src = "Images/trophy.png";

    snake = {
        ini_len: 5,
        color: "blue",
        dir: "right",
        cells: [],
        createSnake: function(){
            for(var i = this.ini_len;i>0;i--){
                this.cells.push({x:i,y:0});
            }
        },
        drawSnake: function(){
            pen.fillStyle = this.color;
            for(var i=0;i<this.cells.length;i++){
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
            }
        },
        updateSnake: function(){
            var HeadX = this.cells[0].x;
            var HeadY = this.cells[0].y;
            if(HeadX == food.x && HeadY == food.y){
               food = getRandomFood();
               score++;
            }
            else{
                this.cells.pop();
            }
               
            var nextX, nextY;
            if(this.dir == "right"){
                
                 nextX = HeadX + 1;
                 nextY = HeadY;
                
            }
            else if(this.dir == "left") {
                
                nextX = HeadX - 1;
                nextY = HeadY;
                
            }
            else if(this.dir == "up"){
               
                nextX = HeadX;
                nextY = HeadY - 1;
                
            }
            else{
                
                nextX = HeadX;
                nextY = HeadY + 1;
               
            }
            this.cells.unshift({x:nextX,y:nextY});

            var lastX = Math.round(W/cs);
            var lastY = Math.round(H/cs);
            if(this.cells[0].x>lastX || this.cells[0].x<0 || this.cells[0].y>lastY || this.cells[0].y<0){
                game_over = true;
            }
        }
        
    };
snake.createSnake();
function keyPressed(e){
    if(e.key == "ArrowDown"){
        snake.dir = "down";
    }
    else if(e.key == "ArrowLeft"){
        snake.dir = "left";
    }
    else if (e.key == "ArrowRight"){
        snake.dir = "right";
    }
    else{
        snake.dir = "up";
    }
}
document.addEventListener('keydown',keyPressed);
}

function draw(){

    pen.clearRect(0,0,W,H);
    snake.drawSnake();

    pen.fillStyle = food.color;
    pen.drawImage(food_img,food.x*cs, food.y*cs, cs, cs);

    pen.drawImage(trophy_img,18,20,2*cs,2*cs);

    pen.fillStyle = "blue";
    pen.font = "20px Roberto";
    pen.fillText(score,44,50);

}

function update(){

    snake.updateSnake();
  

}

function getRandomFood(){
    var foodX= Math.round(Math.random()*(W-cs)/cs);
    var foodY= Math.round(Math.random()*(H-cs)/cs);
    var food = {
        x: foodX,
        y: foodY,
        color: "red",
    }
    return food;
}

function gameloop(){
draw();
update();
if(game_over==true){
    clearInterval(f);
    pen.font = "40px Roberto";
    pen.fillText("Game Over",W/2-80,H/2-20);
}
}

init();

var f = setInterval(gameloop, 100);