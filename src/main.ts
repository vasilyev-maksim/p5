import p5 from "p5";
import sketch from "./ringsSketch.ts";

const canvas = document.getElementById("sketch");

new p5(sketch, canvas!);
