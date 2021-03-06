const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener("mousemove", function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

addEventListener("resize", function () {
    canvas.width = innerHeight;
    canvas.height = innerHeight;

    init()
})

// Euclidean distance
function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// Circle
class Circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    update = function () {
        this.draw();
    };

    draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }
}

// Implementation
let circle1;
let circle2;

function init() {
    circle1 = new Circle(300, 300, 100, 'black');
    circle2 = new Circle(undefined, undefined, 30, 'red');
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
    circle1.update();

    circle2.x = mouse.x;
    circle2.y = mouse.y;
    circle2.update();

    if (getDistance(circle1.x, circle1.y, circle2.x, circle2.y) < circle1.radius + circle2.radius) {
        console.log("Collision!");
        circle1.color = 'red'
    } else
        circle1.color = 'black'

    console.log(getDistance(circle1.x, circle1.y, circle2.x, circle2.y));
}

init();
animate();