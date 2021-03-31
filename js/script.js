const canvas = document.querySelector('#game'),
      ctx = canvas.getContext('2d'),
      cell = 20;

let snake = {
        x: 10 * cell,
        y: 10 * cell,
        dx: 0,
        dy: 0,
        body: [
            {x: 10 * cell, y: 10 * cell},
        ]
    };

let food = {
    name: 'food',
    x: randomCoords() * cell,
    y: randomCoords() * cell,
    fillStyle: function() {ctx.fillStyle = 'green'},
    fillRect: function() {ctx.fillRect(food.x, food.y, cell, cell)},
    spawn: function() {
        ctx.clearRect(this.x, this.y, cell, cell);
        this.x = randomCoords() * cell;
        this.y = randomCoords() * cell;
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, cell, cell)
    }
}

let game = setInterval(drawGame, 1000 / 60);

function drawGame () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.body.forEach((elem) => {
         ctx.fillStyle = '#000';
         ctx.fillRect(elem.x, elem.y, cell, cell);
     });
    let checkForFood = collision(snake.body[0], food);
    food.fillStyle();
    food.fillRect();
    snakeMove(checkForFood);
    ctx.fillStyle = 'red';
    ctx.fillRect(10, 20, cell, cell);
}

function snakeMove(checkForFood) {
    snake.x += snake.dx;
    snake.y += snake.dy;
    snake.body.unshift({x: snake.x, y: snake.y});
    if(checkForFood) {return} else {snake.body.pop()}
   
}

function test(elem) {
    console.log(elem)
}

function collision(obj1, obj2) {
    let XColl=false;
        YColl=false;

    if ((obj1.x >= obj2.x) && (obj1.x <= obj2.x)) XColl = true;
    if ((obj1.y >= obj2.y) && (obj1.y <= obj2.y)) YColl = true;
    if (XColl&YColl && obj2.name == 'food') {
        food.spawn();
        return true
    }
    return false;
}

document.addEventListener('keydown', (event) => {
    if(event.code == 'ArrowLeft') {
        snake.dx = - cell;
        snake.dy = 0;
    } else if(event.code == 'ArrowRight') {
        snake.dx = cell;
        snake.dy = 0;
    } else if(event.code == 'ArrowUp') {
        snake.dy = - cell;
        snake.dx = 0;
    } else if(event.code == 'ArrowDown') {
        snake.dy = cell;
        snake.dx = 0;
    }
});

// TESTS



function randomCoords() {
    return Math.floor(Math.random() * (canvas.width - cell) / cell);
  }

var x = 24, y = 3;
console.log(randomCoords() * cell)