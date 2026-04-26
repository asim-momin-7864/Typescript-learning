//* Shape Area Analyzer OOP's
// we are making Shape Area Analyzer using OOPs concepts (mini activity)

// Shape (parent class)

abstract class Shape {
  // property
  public name: string; // name of child class we make, we can use it any where

  constructor(name: string) {
    this.name = name;
  } // every shape name

  abstract getArea(): number;
}

// Different shapes (child classes)

//Circle
class Circle extends Shape {
  // Property (states)
  private radius: number;

  constructor(r: number) {
    // inheritate
    super("Circle");

    this.radius = r;
  }

  // method
  getArea(): number {
    let area: number = Math.PI * Math.pow(this.radius, 2);
    area = parseFloat(area.toFixed(2));
    return area;
  }
}

// Rectangle
class Rectangle extends Shape {
  // properties (state)
  private length: number;
  private width: number;

  constructor(l: number, w: number) {
    super("Rectangle");

    this.length = l; // we can use shortcut or same names also
    this.width = w;
  }

  // method
  getArea(): number {
    let area: number = this.length * this.width;
    return area;
  }
}

// Triangle
class Triangle extends Shape {
  // property
  private height: number;
  private base: number;

  constructor(h: number, b: number) {
    super("Triangle");

    this.height = h;
    this.base = b;
  }

  // method
  getArea(): number {
    let area: number = (this.height * this.base) / 2;
    return area;
  }
}


// Func: to calculate total ares of all shapes
function totalAreaOfAllShapes(shapesArray: Shape[]): void {
  // var
  let total: number = 0;

  shapesArray.forEach((shape) => {
    total += shape.getArea();

    console.log(`\nShape of ${shape.name} = ${shape.getArea()}`);
  });

  console.log(`\nTotal Area Of All Shapes = ${total}\n`);
}


//----------------------------

// lets create objects
let myCircle = new Circle(12);
let myRectangle = new Rectangle(10, 15);
let myTriangle = new Triangle(13, 10);

// array of shape objects
let shapesArray: Shape[] = [myCircle, myRectangle, myTriangle];

totalAreaOfAllShapes(shapesArray)