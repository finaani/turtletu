// bubble start
let numBalls = 5;
let spring = 0.05;
let gravity = 0.03;
let friction = -0.9;
let balls = [];

// bubble calling end

var x = 0; // 
var speed = 3; // need to assign variables // speed movement



function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < numBalls; i++) { // bubble for loop
    balls[i] = new Ball(
      random(width),
      random(height),
      random(30, 70),
      i,
      balls
    );
  }
  noStroke();
  fill(255, 204);

} //bubble for loop end



function draw() {
  background(251, 252, 222);


  balls.forEach(ball => { //bubble draw
    ball.collide();
    ball.move();
    ball.display();
  }); // bubble draw end


  angleMode(DEGREES);
  //head
  //ellipse(303,300,40,35);
  fill(109, 255, 138);
  noStroke();
  rect(x, 290, 25, 23); //268 = x
  //eye
  fill(0);
  ellipse(x + 1, 300, 6, 6); //287 is x
  //body
  fill(19, 196, 54);
  arc(x + -46, 305, 90, 90, 180, 360, CHORD); // x + -48 is 230
  fill(16, 234, 60);
  arc(x + -48, 306, 92, 44, 0, 180, CHORD); // x + -48 is 230
  //tails
  fill(random(255), random(255), random(255))
  triangle(144, 210, 150, 250, x - 10, 300); // x -10  is 200
  triangle(170, 182, 174, 225, x - 10, 300); // x -10  is 240





  if (x > 300 || x < 0) { // conditional statement used here as bouncing rect. you can use width instead of writing the number but here i wanted to make it bounce of screen.
    // x = -3  //this was a part of an error but what it does is it goes back to the starting point every time. check it out.
    speed = speed * -1;
  }

  x = x + speed; // you can see your variables being used.



}

// bubbles


class Ball {
  constructor(xin, yin, din, idin, oin) {
    this.x = xin;
    this.y = yin;
    this.vx = 0;
    this.vy = 0;
    this.diameter = din;
    this.id = idin;
    this.others = oin;
  }

  collide() {
    for (let i = this.id + 1; i < numBalls; i++) {
      // console.log(others[i]);
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].diameter / 2 + this.diameter / 2;
      //   console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
  }

  move() {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;
    }
  }

  display() {
    fill(156, 237, 247)
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }


}
//end bubble movement