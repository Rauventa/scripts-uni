class Dot {
  constructor(x = 0, y = 0) {
    this._x = x;
    this._y = y;
  }

  get coords() {
    return { x: _x, y: _y };
  }

  set coords(data) {
    this._x = data.x;
    this._y = data.y;
  }

  getDistanceBetween(dot) {
    return Math.sqrt(Math.pow(Math.abs(this._x - dot.x), 2) + Math.pow(Math.abs(this._y - dot.y), 2));
  }
}

class Line {
  constructor(x1 = 0, y1 = 0, x2 = 100, y2 = 100) {
    this._dot1 = new Dot(x1, x1);
    this._dot2 = new Dot(x2, y2);
  }

  get length() {
    return Math.sqrt(
      Math.pow(Math.abs(this._dot1.coords.x - _dot2.coords.x), 2) +
        Math.pow(Math.abs(_dot1.coords.y - _dot2.coords.y), 2)
    );
  }

  get coords() {
    return { x1: this._dot1.x, x2: this._dot2.x, y1: this._dot1.y, y2: this._dot2.y };
  }

  set coords(data) {
    this._dot1.coords({ x: data.x1, y: data.y1 });
    this._dot2.coords({ x: data.x2, y: data.y2 });
  }
}

class Circle extends Dot {
  constructor(cx = 0, cy = 0, r = 0) {
    super(cx, cy);
    this._r = r;
  }

  get radius() {
    return _r;
  }

  set radius(val) {
    this._r = val;
  }
}

class Ellipse extends Circle {
  constructor(cx = 0, cy = 0, r = 0, r2 = 0) {
    super((cx = 0), (cy = 0), (r = 0));
    this._r2 = r2;
  }

  get secondRadius() {
    return _r2;
  }

  set secondRadius(val) {
    this._r2 = val;
  }
}

class Rectangle extends Line {
  constructor(x1, y1, x2, y2) {
    super(x1, y1, x2, y2);
  }

  get diagonalLength() {
    return this._dot1.getDistanceBetween(this._dot2);
  }

  static getCountOfAngles() {
    return 4;
  }
}

let answer = prompt(
  "Какую фигуру вы хотите задать? Варианты: точка, прямая, круг, эллипс, прямоугольник"
).toLowerCase();

switch (answer) {
  case "точка":
    let x = prompt("Введите х точки");
    let y = prompt("Введите y точки");
    try {
      let dot = new Dot(x, y);
      console.log(dot);
    } catch (err) {
      alert("Ошибка: неправильно введенные данные.");
    }
    break;

  case "прямая":
    let x1 = prompt("Введите х1");
    let y1 = prompt("Введите y1");
    let x2 = prompt("Введите х2");
    let y2 = prompt("Введите y2");
    let dot1 = new Dot(x1, y1);
    let dot2 = new Dot(x2, y2);
    if (dot1.getDistanceBetween(dot2) == 0) {
      alert("Это точка, а не прямая.");
    } else {
      try {
        let line = new Line(x1, y1, x2, y2);
        console.log(line);
      } catch (err) {
        alert("Ошибка: неправильно введенные данные.");
      }
    }
    break;

  case "круг":
    let cx = prompt("Введите х точки");
    let cy = prompt("Введите y точки");
    let radius = prompt("Введите радиус круга");
    if (radius == 0) {
      alert("Это точка, а не круг!");
    } else {
      if (radius < 0) {
        alert("Ошибка: радиус не может быть отрицательным.");
        return;
      }
      try {
        let circle = new Circle(cx, cy, radius);
        console.log(circle);
      } catch (err) {
        alert("Ошибка: неправильно введенные данные.");
      }
    }
    break;

  case "эллипс":
    let x3 = prompt("Введите х точки");
    let y3 = prompt("Введите y точки");
    let r = prompt("Введите малый радиус");
    let r2 = prompt("Введите большой радиус");
    if (r == 0 || r2 == 0) {
      alert("Радиус не может быть нулем.");
    } else {
      if (r < 0 || r2 < 0) {
        alert("Ошибка: радиус не может быть отрицательным.");
        return;
      }
      try {
        let ellipse = new Ellipse(x3, y3, r, r2);
        console.log(ellipse);
      } catch (err) {
        alert("Ошибка: неправильно введенные данные.");
      }
    }
    break;

  case "прямоугольник":
    let x4 = prompt("Введите координату х1 первого угла прямоугольника");
    let y4 = prompt("Введите координату у1 первого угла прямоугольника");
    let x5 = prompt("Введите координату x2 противолежащего угла прямоугольника");
    let y5 = prompt("Введите координату y2 противолежащего угла прямоугольника");
    if (x4 == x5 || y4 == y5) {
      alert("Так не получится.");
    } else {
      try {
        let rectangle = new Rectangle(x4, y4, x5, y5);
        console.log(rectangle);
      } catch (err) {
        alert("Ошибка: неправильно введенные данные.");
      }
    }
    break;

  default:
    alert("Такой фигуры нет");
    break;
}
