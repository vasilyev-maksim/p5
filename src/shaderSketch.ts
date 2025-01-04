import p5 from "p5";
import { createShader } from "./shader";
import { grid2D } from "./utils";

const sketch = (p: p5) => {
  let myShader: p5.Shader;

  p.setup = () => {
    console.log(innerWidth, innerHeight);

    // const canvas = p.createCanvas(innerWidth, innerHeight, p.WEBGL);
    // canvas.position(0, 0);
    myShader = createShader(p);
  };

  p.draw = () => {
    p.background(255);
    p.noStroke();
    p.translate(-innerWidth / 2, -innerHeight / 2);

    // Use our custom shader
    p.shader(myShader);

    // Pass the time from p5 to the shader
    myShader.setUniform("time", p.millis());

    // Draw a shape using the shader
    grid2D({
      minX: 0,
      maxX: innerWidth,
      minY: 0,
      maxY: innerHeight,
      xStepCount: 5,
      // yStepLength: 250,
      callback: ({ x, y }) => {
        p.fill("red");
        // stroke("#CCC");
        // strokeWeight(1);
        p.rect(x - 75, y - 75, 150);
      },
    });
  };
};

export default sketch;
