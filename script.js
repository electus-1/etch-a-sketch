let isMouseDown;
let colorPicked;

main();

function main() {
    createSketchBoard(600, 16);
    window.addEventListener("mousedown", () => (isMouseDown = true));
    window.addEventListener("mouseup", () => (isMouseDown = false));
}

function createSketchBoard(sketchBoardSideLength, itemCountInARow) {
    const sideLength = sketchBoardSideLength / itemCountInARow;
    const sketchBoard = document.querySelector(".sketch-board");
    let pixel;
    for (let i = 0; i < itemCountInARow; i++) {
        for (let j = 0; j < itemCountInARow; j++) {
            pixel = document.createElement("div");
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
            ["mousedown", "mouseover"].forEach((event) => {
                pixels.forEach((pixel) =>
                    pixel.addEventListener(event, (e) =>
                        colorRandomly(e, pixel)
                    )
                );
            });
            break;
        case "normal":
            ["mousedown", "mouseover"].forEach((event) => {
                pixels.forEach((pixel) =>
                    pixel.addEventListener(event, (e) =>
                        color(e, pixel, "black")
                    )
                );
            });
            break;
        case "colorPicker":
            ["mousedown", "mouseover"].forEach((event) => {
                pixels.forEach((pixel) =>
                    pixel.addEventListener(event, (e) =>
                        color(e, pixel, colorPicked)
                    )
                );
            });
            break;
        case "eraser":
            ["mousedown", "mouseover"].forEach((event) => {
                pixels.forEach((pixel) =>
                    pixel.addEventListener(event, (e) =>
                        color(e, pixel, "white")
                    )
                );
            });
            break;
    }
}

function colorRandomly(e, pixel) {
    const rainbowColors = [
        "#9400D3",
        "#4B0082",
        "#0000FF",
        "#00FF00",
        "#FFFF00",
        "#FF7F00",
        "#FF0000",
    ];
    color(
        e,
        pixel,
        rainbowColors[Math.floor(Math.random() * rainbowColors.length)]
    );
}

function color(e, pixel, color) {
    if (isMouseDown) {
        pixel.style.backgroundColor = color;
    }
}
