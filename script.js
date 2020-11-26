
// Initial Setup
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

var background = document.querySelector('.home__background');
var placards = document.getElementsByClassName('about__placard')
var placardSigns = document.getElementsByClassName('placard__sign');
var placardRods = document.getElementsByClassName('placard__line')


var color = colorGenerator()
var gravity = 1;
var friction = 0.99;

//Event Listeners
addEventListener("mousemove", function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

addEventListener("resize", function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

function colorChange() {
    background.classList.add('bgcolorChange')
}
function colorBack() {
    background.classList.remove('bgcolorChange')
}
addEventListener('click', function() {
    init();
    colorChange();
    setInterval(colorBack, 500);
})

addEventListener('scroll', function() {
    canvas.width = innerWidth*2;
    for (var i = 0; i < placards.length; i++) {
        placards[i].classList.add('swing');
    }
    setInterval(function() {
        for (var i = 0; i < placards.length; i++) {
            placards[i].classList.remove('swing');
        }
    }, 2000);
    console.log(placards.classList);
})

//Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function colorGenerator() {
    var red = String(Math.floor(Math.random() * 180)+50);
    var yellow = String(Math.floor(Math.random() * 180)+50);
    var blue = String(Math.floor(Math.random() * 180)+50);
    console.log(red)
    return 'rgb('+red+','+yellow+','+blue+')';
}

//Objects
class Ball {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 
            Math.PI*2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };

    update() {
        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }

        if (this.x + this.radius + this.dx > canvas.width
            || this.x - this.radius <= 0) {
            this.dx = -this.dx
        } 
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };

}

//Implementation
var ball;
function init() {
    ball = new Ball(canvas.width/2, 0, 3, 0.3, 350, color);
}


//Animation Loop
function animate() {
    requestAnimationFrame(animate);
  
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ball.update();
}

init();
animate();


// Color
var colorObjects = document.querySelectorAll('.color__change');
var bgcolorObjects = document.querySelectorAll('.bgcolor__change');

function randomColor() {
    for (var i=0;i<colorObjects.length;i++) {
        colorObjects[i].style.color = color;
    }
    for (var i=0;i<bgcolorObjects.length;i++) {
        bgcolorObjects[i].style.background = color;
    }
}

randomColor();



// Navbar Toggler Handling
var toggler = document.querySelector('.nav__toggler');
var navList = document.querySelector('.nav__list');
var togglerInners = document.querySelectorAll('.nav__toggler__inner');
toggler.addEventListener('click', function() {
    if (toggler.classList.contains('nav__toggler__clicked')) {
        toggler.classList.remove('nav__toggler__clicked');
        navList.classList.remove('nav__list__clicked');
        togglerInners[0].classList.remove('toggler__x');
        togglerInners[1].classList.remove('toggler__x');
    } else {
        toggler.classList.add('nav__toggler__clicked');
        navList.classList.add('nav__list__clicked');
        togglerInners[0].classList.add('toggler__x');
        togglerInners[1].classList.add('toggler__x');
    }
})


