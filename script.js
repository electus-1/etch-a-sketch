createSketchBoard(600, 16);

function createSketchBoard(sketchBoardSideLength, itemCountInARow) {
    let sideLength = sketchBoardSideLength / itemCountInARow;
    let sketchBoard = document.createElement("div");
    sketchBoard.classList.add("sketch-board");
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
    document.querySelector("body").appendChild(sketchBoard);
}
