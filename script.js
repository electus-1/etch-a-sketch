let previouslyPainted;
let colorPicked;

const rainbowColors = [
    "#9400D3",
    "#4B0082",
    "#0000FF",
    "#00FF00",
    "#FFFF00",
    "#FF7F00",
    "#FF0000",
];

createSketchBoard(600, 16);
function createSketchBoard(sketchBoardSideLength, itemCountInARow) {
    let idCounter = 1;
    const sideLength = sketchBoardSideLength / itemCountInARow;
    const sketchBoard = document.querySelector(".sketch-board");
    let pixel;
    for (let i = 0; i < itemCountInARow; i++) {
        for (let j = 0; j < itemCountInARow; j++) {
            pixel = document.createElement("div");
            pixel.id = idCounter;
            idCounter++;
            pixel.classList.add("pixel");
            pixel.style.height = `${sideLength}px`;
            pixel.style.width = `${sideLength}px`;
            sketchBoard.appendChild(pixel);
        }
    }
    changeColorMode(sketchBoard, "normal");
}

function changeColorMode(sketchBoard, colorMode) {
    let pixels = sketchBoard.childNodes;
    pixels.forEach((pixel) => pixel.replaceWith(pixel.cloneNode(true)));
    pixels = sketchBoard.childNodes;
    switch (colorMode) {
        case "rainbow":
            pixels.forEach((pixel) =>
                pixel.addEventListener("mouseover", (e) =>
                    colorRandomly(e, pixel)
                )
            );
            break;
        case "normal":
            pixels.forEach((pixel) =>
                pixel.addEventListener("mouseover", (e) => {
                    color(e, pixel, "black");
                })
            );
            break;
        case "colorPicker":
            pixels.forEach((pixel) =>
                pixel.addEventListener("mouseover", (e) => {
                    color(e, pixel, colorPicked);
                })
            );
            break;
        case "eraser":
            pixels.forEach((pixel) =>
                pixel.addEventListener("mouseover", (e) => {
                    color(e, pixel, "white");
                })
            );
    }
}

function colorRandomly(e, pixel) {
    color(
        e,
        pixel,
        rainbowColors[Math.floor(Math.random() * rainbowColors.length)]
    );
}

function color(e, pixel, color) {
    e.stopPropagation();
    if (previouslyPainted === undefined || previouslyPainted.id != pixel.id) {
        pixel.style.backgroundColor = color;
        previouslyPainted = pixel;
    }
}
