let isMouseDown;
let colorPicked;
// we start with normal color mode active because we need to use one when we are creating the sketchboard
let activeColorMode = "normal-mode";
// we start by defining those values because we will use them when creating the sketchboard everytime something changes about the sketchboard
let pixelCount = 16;
main();

function main() {
    createSketchBoard(640, pixelCount);
    window.addEventListener("mousedown", () => (isMouseDown = true));
    window.addEventListener("mouseup", () => (isMouseDown = false));
    listenToRange();
    listenToColorModeButtons();
}

function createSketchBoard(sideLength, itemCount) {
    const pixelSideLength = sideLength / itemCount;
    const sketchBoard = document.querySelector(".sketch-board");
    // we need to clear the previous sketchboard to create a new one
    while (sketchBoard.firstChild) {
        sketchBoard.firstChild.remove();
    }
    let pixel;
    for (let i = 0; i < itemCount; i++) {
        for (let j = 0; j < itemCount; j++) {
            pixel = document.createElement("div");
            pixel.classList.add("pixel");
            pixel.style.height = `${pixelSideLength}px`;
            pixel.style.width = `${pixelSideLength}px`;
            sketchBoard.appendChild(pixel);
        }
    }
    changeColorMode(sketchBoard, activeColorMode);
}

function changeColorMode(sketchBoard, colorMode) {
    activeColorMode = colorMode;
    let pixels = sketchBoard.childNodes;
    // cloning the nodes to clear the event listener attached to those nodes
    pixels.forEach((pixel) => pixel.replaceWith(pixel.cloneNode(true)));
    switch (colorMode) {
        case "rainbow-mode":
            ["mousedown", "mouseover"].forEach((event) => {
                pixels.forEach((pixel) =>
                    pixel.addEventListener(event, (e) =>
                        colorRandomly(e, pixel)
                    )
                );
            });
            break;
        case "normal-mode":
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
        case "eraser-mode":
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

function reCreateBoard() {
    createSketchBoard(640, pixelCount);
}

function listenToRange() {
    const range = document.querySelector("#pixel-count-picker");
    range.addEventListener("input", (e) => {
        pixelCount = +range.value;
        console.log(pixelCount);
        document.querySelector(
            "#shows-pixel-count"
        ).textContent = `${pixelCount} x ${pixelCount}`;
        reCreateBoard();
    });
}

function listenToColorModeButtons() {
    const sketchBoard = document.querySelector(".sketch-board");
    const colorPicker = document.querySelector("#color-picker");
    colorPicker.addEventListener("input", (e) => {
        colorPicked = colorPicker.value;
        changeColorMode(sketchBoard, "colorPicker");
    });
    document.querySelectorAll(".color-mode").forEach((button) =>
        button.addEventListener("click", (e) => {
            changeColorMode(sketchBoard, button.id);
        })
    );
    const clearButton = document.querySelector("#clear");
    clearButton.addEventListener("click", (e) => {
        reCreateBoard();
    });
}
