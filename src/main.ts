import p5 from "p5";

const canvas = document.getElementById("sketch")!;

const sketchFiles = (import.meta as any).glob("./sketches/*", { eager: true });
const validSketchNames = Object.keys(sketchFiles).map((path) =>
  path.split("/").pop()?.replace(/\.ts/, "")
);
const sketchName = window.location.href.split("/").pop() ?? "";

if (validSketchNames.includes(sketchName)) {
  const { default: sketch } = await import(`./sketches/${sketchName}.ts`);
  new p5(sketch, canvas!);
} else {
  validSketchNames.forEach((x) => {
    const a = document.createElement("a");
    a.href = "/p5/" + x;
    a.textContent = x ?? "--";
    // a.target = "_blank"; // opens in new tab
    a.style.display = "block"; // put each on its own line
    canvas.appendChild(a);
  });
}
