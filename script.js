let isMouseDown;
let colorPicked;
// we start with normal color mode active because we need to use one when we are creating the sketchboard
let activeColorMode = "normal";
// we start by defining those values because we will use them when creating the sketchboard everytime something changes about the sketchboard
let sketchBoardWidth = 600;
let sketchBoardHeight = 600;
let pixelsInARow = 16;
let pixelsInAColumn = 16;

main();

function main() {
    createSketchBoard(600, 600, pixelsInARow, pixelsInAColumn);
    window.addEventListener("mousedown", () => (isMouseDown = true));
    window.addEventListener("mouseup", () => (isMouseDown = false));
    document.querySelectorAll('input[type="range"]').forEach((range) =>
        range.addEventListener("input", (e) => {
            changeBoard(range.getAttribute("data-id"), range.value);
        })
    );
}

function createSketchBoard(
    sketchBoardHorizontalSideLength,
    sketchBoardVerticalSideLength,
    itemCountInARow,
    itemCountInAColumn
) {
    const horizontalSideLength =
        sketchBoardHorizontalSideLength / itemCountInARow;
    const verticalSideLength =
        sketchBoardVerticalSideLength / itemCountInAColumn;
    const sketchBoard = document.querySelector(".sketch-board");
    // we need to clear the previous sketchboard to create a new one
    while (sketchBoard.firstChild) {
        sketchBoard.firstChild.remove();
    }
    let pixel;
    for (let i = 0; i < itemCountInARow; i++) {
        for (let j = 0; j < itemCountInARow; j++) {
            pixel = document.createElement("div");
            pixel.classList.add("pixel");
            pixel.style.height = `${verticalSideLength}px`;
            pixel.style.width = `${horizontalSideLength}px`;
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

function changeBoard(propertyToBeChanged, value) {
    switch (propertyToBeChanged) {
        case "width":
            createSketchBoard(
                value,
                sketchBoardHeight,
                pixelsInARow,
                pixelsInAColumn
            );
            break;
        case "height":
            createSketchBoard(
                sketchBoardWidth,
                value,
                pixelsInARow,
                pixelsInAColumn
            );
            break;
        case "row":
            createSketchBoard(
                sketchBoardWidth,
                sketchBoardHeight,
                value,
                pixelsInAColumn
            );
            break;
        case "column":
            createSketchBoard(
                sketchBoardWidth,
                sketchBoardHeight,
                pixelsInARow,
                value
            );
            break;
    }
}
