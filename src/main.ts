import p5 from "p5";

const canvas = document.getElementById("sketch")!;

const sketchFiles = (import.meta as any).glob("./sketches/*", { eager: true });
const validSketchNames = Object.keys(sketchFiles).map((path) =>
  path.split("/").pop()?.replace(/\.ts/, "")
);
const params = new URLSearchParams(window.location.search);
const sketchName = params.get("sketch") || "default";

if (validSketchNames.includes(sketchName)) {
  import(`./sketches/${sketchName}.ts`).then(({ default: sketch }) => {
    new p5(sketch, canvas!);
  });
} else {
  validSketchNames.forEach((x) => {
    const a = document.createElement("a");
    a.href = "/p5?sketch=" + x;
    a.textContent = x ?? "--";
    // a.target = "_blank"; // opens in new tab
    a.style.display = "block"; // put each on its own line
    canvas.appendChild(a);
  });
}
