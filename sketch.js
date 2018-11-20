var balls = [];

var colors = [
  "rgba(28,49,68,0.7)",
  "rgba(208,0,0,0.7)",
  "rgba(255, 186,8,0.7)",
  "rgba(162,174,187,0.7)",
  "rgba(63,136,197,0.7)",
  "rgba(203,72,183,0.7)",
  "rgba(46,45,77,0.7)",
  "rgba(51,115,87,0.7)",
  "rgba(109,159,113,0.7)",
  "rgba(228,227,211,0.7)"
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  setShakeThreshold(10);

  for (var i = 0; i < 10; i++) {
    randomColor = colors[Math.round(random(0, colors.length-1))];
    balls[i] = new Ball(random(0.5, 3),
                        random(50, width-50),
                        random(50, height-50),
                        randomColor);
    console.log(randomColor);
  }
}

function draw() {
  background(231,223,198);

  for (var i = 0; i < balls.length; i++) {

    var force = createVector(rotationY * 0.03 * balls[i].mass, rotationX * 0.03 * balls[i].mass);

    balls[i].applyForce(force);

    balls[i].update();
    balls[i].display();
    balls[i].checkEdges();
  }
}

function mousePressed() {
  addBall();
}

function deviceShaken() {
  for (var i = 0; i < balls.length; i++) {
    balls[i].velocity.x += random(-10,10);
    balls[i].velocity.y += random(-10,10);
  }
}

function addBall() {
  randomColor = colors[Math.round(random(0, colors.length-1))];
  balls.push(new Ball(random(0.5, 3), width/2, height/2, randomColor));
}

function Ball(m,x,y,color) {
  this.mass = m;
  this.position = createVector(x,y);
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);
  this.color = color;
}

Ball.prototype.applyForce = function(force) {
  var f = p5.Vector.div(force,this.mass);
  this.acceleration.add(f);
};

Ball.prototype.update = function() {
  // Velocity changes according to acceleration
  this.velocity.add(this.acceleration);
  // position changes by velocity
  this.position.add(this.velocity);
  // We must clear acceleration each frame
  this.acceleration.mult(0);
};

Ball.prototype.display = function() {
  noStroke();
  fill(this.color);
  ellipse(this.position.x,this.position.y,this.mass*16,this.mass*16);
};

// Bounce off bottom of window
Ball.prototype.checkEdges = function() {
  if (this.position.y > (height - this.mass*8)) {
    this.velocity.y *= -0.5;
    this.position.y = (height - this.mass*8);
  } else if (this.position.y < this.mass*8) {
    this.velocity.y *= -0.5;
    this.position.y = this.mass*8;
  }

  if (this.position.x > (width - this.mass*8)) {
    this.velocity.x *= -0.5;
    this.position.x = (width - this.mass*8);
  } else if (this.position.x < this.mass*8) {
    this.velocity.x *= -0.5;
    this.position.x = this.mass*8;
  }

};
