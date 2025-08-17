import p5 from "p5";
import sketch from "./sketches/moverSketch.ts";

const canvas = document.getElementById("sketch");

new p5(sketch, canvas!);
