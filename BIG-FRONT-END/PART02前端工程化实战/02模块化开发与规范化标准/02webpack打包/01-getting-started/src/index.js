import createHeading from "./heading.js";
import "./main.css";
import juan from "./juan.jpeg";
const heading = createHeading();
document.body.append(heading);

const img = new Image();
img.src = juan;
document.body.append(img);
