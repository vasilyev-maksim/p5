import p5 from "p5";

abstract class Widget {
  protected readonly children?: Widget[];
  protected readonly p: p5;
  public origin: p5.Vector;
  public width: number;
  public height: number;
  public hoverColor?: p5.Color;
  public color?: p5.Color;
  public borderRadius: number;
  public onClick?: () => void;
  public text?: string;
  public fontSize?: number;

  public constructor(args: {
    children: Widget[];
    p: p5;
    origin?: p5.Vector;
    width?: number;
    height?: number;
    color?: p5.Color;
    hoverColor?: p5.Color;
    borderRadius?: number;
    onClick?: () => void;
    text?: string;
    fontSize?: number;
  }) {
    this.p = args.p;
    this.origin = args.origin ?? args.p.createVector(0, 0);
    this.height = args.height ?? 0;
    this.width = args.width ?? 0;
    this.color = args.color;
    this.children = args.children;
    this.borderRadius = args.borderRadius ?? 0;
    this.hoverColor = args.hoverColor;
    this.onClick = args.onClick;
    this.text = args.text;
    this.fontSize = args.fontSize;
  }

  protected get hovered() {
    return (
      this.p.mouseX >= this.origin.x &&
      this.p.mouseX <= this.origin.x + this.width &&
      this.p.mouseY >= this.origin.y &&
      this.p.mouseY <= this.origin.y + this.height
    );
  }

  public get br() {
    return p5.Vector.add(
      this.origin,
      this.p.createVector(this.width, this.height)
    );
  }

  public abstract render(): void;

  public handleClick() {
    if (this.hovered) {
      this.onClick?.();
      this.children?.forEach((x) => x.handleClick());
    }
  }
}

abstract class SingleChildWidget extends Widget {
  protected readonly child?: Widget;

  public constructor(args: {
    child?: Widget;
    p: p5;
    origin?: p5.Vector;
    width?: number;
    height?: number;
    color?: p5.Color;
    hoverColor?: p5.Color;
    borderRadius?: number;
    onClick?: () => void;
    text?: string;
    fontSize?: number;
  }) {
    super({ ...args, children: args.child ? [args.child] : [] });
    this.child = args.child;
  }
}

class Container extends SingleChildWidget {
  public render(): void {
    if (this.child) {
      this.child.origin = this.origin;
      this.child.width = this.width;
      this.child.height = this.height;
      this.child.render();
    }
  }
}

class Center extends SingleChildWidget {
  public render(): void {
    if (this.child) {
      this.child.origin = this.p.createVector(
        this.width / 2 - this.child.width / 2,
        this.height / 2 - this.child.height / 2
      );
      this.child.render();
    }
  }
}

class Rect extends SingleChildWidget {
  public render(): void {
    const r = this.borderRadius;
    this.p.push();
    const DEFAULT_COLOR = this.p.color("white");
    const color = this.hovered
      ? this.hoverColor ?? DEFAULT_COLOR
      : this.color ?? DEFAULT_COLOR;
    this.p.fill(color);
    this.p.rect(
      this.origin.x,
      this.origin.y,
      this.width,
      this.height,
      r,
      r,
      r,
      r
    );
    this.p.pop();
  }
}

class Stack extends Widget {
  public render(): void {
    this.children?.forEach((x) => {
      x.origin = this.origin;
      x.width = this.width;
      x.height = this.height;
      x.render();
    });
  }
}

class Text extends SingleChildWidget {
  public render(): void {
    this.p.push();
    const DEFAULT_COLOR = this.p.color("white");
    const color = this.color ?? DEFAULT_COLOR;
    this.p.fill(color);
    this.p.textSize(this.fontSize ?? 15);
    this.p.text(
      this.text ?? "",
      this.origin.x,
      this.origin.y,
      this.br.x,
      this.br.y
    );
    this.p.pop();
  }
}

const sketch = (p: p5) => {
  const WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    ROOT = new Container({
      origin: p.createVector(0, 0),
      width: WIDTH,
      height: HEIGHT,
      p,
      child: new Center({
        child: new Stack({
          height: 200,
          width: 600,
          p,
          children: [
            new Rect({
              color: p.color("rgba(10, 151, 198, 1)"),
              hoverColor: p.color("rgba(21, 184, 239, 1)"),
              p,
              borderRadius: 100,
              onClick: () => alert(1212),
            }),
            new Text({ text: "TEST", p, fontSize: 200 }),
          ],
        }),
        p,
      }),
    });

  p.setup = () => {
    p.createCanvas(WIDTH, HEIGHT);
    p.background("black");
  };

  p.mouseClicked = () => {
    ROOT.handleClick();
  };

  p.draw = () => {
    // p.fill("teal");

    ROOT.render();
    // const
    // p.rect(100, 100, 500, 200, 50, 50, 50, 50);
    // if ()
    // p.background(255);
  };
};

export default sketch;
