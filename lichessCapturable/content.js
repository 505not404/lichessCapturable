MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
const targetNode = document.getElementById("main-wrap"); 
const config = { attributes: true, childList: true, subtree: true };
let boardDimension = 8;   
let boardState = []; 
let capturableBoard = []; 


function removePreviousCapturable()
{
    document.querySelectorAll('.capturable-square').forEach(e => e.remove());
}

function initBoard()
{
    let boardState = []; 
    for (let i = 0; i < boardDimension; i++) {
        let boardRow = [];
        for (let j = 0; j < boardDimension; j++) {
            boardRow.push("*");
        }
        boardState.push(boardRow);
    }

    return boardState; 
}

function setBoardState(boardState)
{
    const container = document.querySelector("cg-container"); 
    let width = parseFloat(container.style.width, 10);
    let height = parseFloat(container.style.height, 10);
    const board = document.querySelector("cg-board"); 
    if(!board)return "no board detected";
    const boardPieces = document.querySelectorAll("cg-board piece"); 
    boardState = boardState; 

    for(let i = 0; i < boardPieces.length; i++)
    {
        var regex = /[+-]?\d+(\.\d+)?/g;
        let piecePosition = (boardPieces[i].style.transform); 
        let matches = piecePosition.match(regex);
        let xCoor = Math.round((matches[0] / (width / 8)));
        let yCoor = Math.round((matches[1] / (height / 8)));  
        let classList = boardPieces[i].classList; 
        let color = classList[0]; 
        let type = classList[1]; 
        if(type == "rook")boardState[xCoor][yCoor] = new Rook(xCoor, yCoor, color); 
        else if(type == "bishop")boardState[xCoor][yCoor] = new Bishop(xCoor, yCoor, color); 
        else if(type == "queen")boardState[xCoor][yCoor] = new Queen(xCoor, yCoor, color); 
        else if(type == "pawn")boardState[xCoor][yCoor] = new Pawn(xCoor, yCoor, color); 
        else if(type == "knight")boardState[xCoor][yCoor] = new Knight(xCoor, yCoor, color); 
    }
    return boardState; 
}

function markCapturableBoard()
{
    for(let i = 0; i < boardDimension; i++)
    {
        for(let j = 0; j < boardDimension; j++)
        {
            if(boardState[i][j] instanceof Piece)
            {
                boardState[i][j].markCapturable(); 
            }
        }
    }
}

function colorCaputrable()
{
    const container = document.querySelector("cg-container"); 
    let width = parseFloat(container.style.width, 10);
    let height = parseFloat(container.style.height, 10);
    const board = document.querySelector("cg-board"); 
    if(board)
    {
        for(let i = 0; i < 8; i++)
        {
            for(let j = 0; j < 8; j++)
            {
                if(capturableBoard[i][j] == '.')
                {
                    let translateX = i * width / 8; 
                    let translateY = j * height / 8; 
                    const mark = document.createElement("capturable-square"); 
                    mark.classList.add("capturable-square");
                    mark.style.cssText = `transform:translate(${translateX}px, ${translateY}px);
                    background-color: rgba(255, 84, 37, 0.3);`;
                    board.insertAdjacentElement("afterbegin", mark); 
                }
            }
        }
    }
}

const colorAll = () => 
{
    removePreviousCapturable(); 
    const container = document.querySelector("cg-container"); 
    let width = parseFloat(container.style.width, 10);
    let height = parseFloat(container.style.height, 10);
    const board = document.querySelector("cg-board"); 
    if(board)
    {
        for(let i = 0; i < 8; i++)
        {
            for(let j = 0; j < 8; j++)
            {
                let translateX = i * width / 8; 
                let translateY = j * height / 8; 
                const mark = document.createElement("capturable-square"); 
                mark.classList.add("capturable-square");
                mark.style.cssText = `transform:translate(${translateX}px, ${translateY}px);
                background-color: rgba(255, 84, 37, 0.3);`;
                board.insertAdjacentElement("afterbegin", mark); 
            }
        }
    }
}

function run()
{
    removePreviousCapturable(); 
    capturableBoard = initBoard(); 
    boardState = initBoard(); 
    boardState = setBoardState(boardState); 
    markCapturableBoard(); 
    colorCaputrable();
}

window.setInterval(run, 100);
// window.setTimeout(run, 100); 
