console.log('Connected!')
//Global Variables
//Letter to number Index
let chessboard = document.getElementById('board');
let letterNumIdx = ['A','B','C','D','E','F','G','H'];
let whiteMoves = [];
let blackMoves = [];

let king = {
    name: 'King',
    pValue: 10,
    step: 1,
    dir: 'All'
}

let pawn = {
    name: 'Pawn',
    pValue: 1,
    step: 1,
    dir: 'forward'
}
let currentRow = [];
let currentCol = [];

createBoard();
setBoard();


//Create 8x8 board
function createBoard(){
    for(let i=8 ; i>0 ; i--){
        for(let j=0 ; j<8 ; j++){
            let newCell = document.createElement('div');
            newCell.id = letterNumIdx[j]+i;
            newCell.classList.add('cell');
            chessboard.append(newCell);
        }
    }
}


//Event Listeners
chessboard.addEventListener('click', playerClick) //Used for testing purposes ---To be deleted afterwards
chessboard.addEventListener('click',pieceMovement)



//Functions

function playerClick(e){
    let currentPosition = e.target.id;
    console.log(e.target)
    console.dir(e.target)
    console.log('Player Clicked on '+currentPosition);
}

//Set starting positions
function setBoard(){
    
    //Set Kings and Queen
    document.getElementById('E1').innerText = 'King';
    document.getElementById('E1')._variable = king;
    document.getElementById('D1').innerText = 'Queen';
    document.getElementById('E8').innerText = 'King';
    document.getElementById('D8').innerText = 'Queen';

    //Set Pawns
    for (i=0; i<8 ; i++){
        if(document.getElementById(letterNumIdx[i]+'2')){
            document.getElementById(letterNumIdx[i]+'2').innerText = 'Pawn';
            document.getElementById(letterNumIdx[i]+'2').classList.add('White');
            document.getElementById(letterNumIdx[i]+'2')._variable = pawn;
        }
        if(document.getElementById(letterNumIdx[i]+'7')){
            document.getElementById(letterNumIdx[i]+'7').innerText = 'Pawn';
            document.getElementById(letterNumIdx[i]+'7').classList.add('Black');
            document.getElementById(letterNumIdx[i]+'7')._variable = pawn;
        }
    }

    //Set Knights and Bishops
    document.getElementById('C1').innerText = 'Bishop';
    document.getElementById('F1').innerText = 'Bishop';
    document.getElementById('B1').innerText = 'Knight';
    document.getElementById('G1').innerText = 'Knight';
    document.getElementById('C8').innerText = 'Bishop';
    document.getElementById('F8').innerText = 'Bishop';
    document.getElementById('B8').innerText = 'Knight';
    document.getElementById('G8').innerText = 'Knight';

    //Set Rooks
    document.getElementById('A1').innerText = 'Rook';
    document.getElementById('A8').innerText = 'Rook';
    document.getElementById('H1').innerText = 'Rook';
    document.getElementById('H8').innerText = 'Rook';

    //Set white and black class
    for(let row = 1; row<9 ; row++){
        if(document.getElementById(letterNumIdx[row]+ '1')){
            document.getElementById(letterNumIdx[row]+ '1').classList.add('White');
        }
        if(document.getElementById(letterNumIdx[row]+'8')){
            document.getElementById(letterNumIdx[row]+'8').classList.add('Black');
        }
    }
}

function pieceMovement(e){

    let newPos = [];
    let piece = e.target.innerText;
    let pClass = e.target.classList;
    let piecePos = e.target.id;

//Pawn
    if(piece === 'Pawn' && pClass.contains('White')){
        let currentPos = convertPosition(piecePos);
        newPos.push(currentPos[0]);
        newPos.push(parseInt(currentPos[1]) + 1);
        let newid = newPos.join(''); //New position as a string
        console.log('The pawn can move to '+newid);
    }

    if(piece === 'Pawn' && pClass.contains('Black')){
        let currentPos = convertPosition(piecePos);
        newPos.push(currentPos[0]);
        newPos.push(parseInt(currentPos[1]) - 1);
        let newid = newPos.join(''); //New position as a string
        console.log('The pawn can move to '+newid);
    }

//Knight
    if(piece == 'Knight'){
        possiblePos = [];
        //Top
        possiblePos.push(knightMovement(piecePos,1,2));
        possiblePos.push(knightMovement(piecePos,-1,2));
        //Bottom
        possiblePos.push(knightMovement(piecePos,1,-2));
        possiblePos.push(knightMovement(piecePos,-1,-2));
        // Right
        possiblePos.push(knightMovement(piecePos,2,1));
        possiblePos.push(knightMovement(piecePos,2,-1));
        //Left
        possiblePos.push(knightMovement(piecePos,-2,1));
        possiblePos.push(knightMovement(piecePos,-2,-1));

        knightPos = possiblePos.filter(function(el){return el!== undefined});

        console.log('The knight can move to: '+knightPos);
    }
//Bishop
    if(piece == 'Bishop'){
        bishopMovement(piecePos);
    }
//Rook
    if(piece == 'Rook'){
        rookMovement(piecePos);
    }
//Queen
    if(piece == 'Queen'){
        let move1 = bishopMovement(piecePos);
        let move2 = rookMovement(piecePos);
        let queenPositions = move1.concat(move2);
        console.log(queenPositions);
    }
//King
    if(piece == 'King'){
        kingMovement(piecePos);
    }

}


//Piece Movement Functions - Determine available positions:
//Knight Movement
function knightMovement(pos, X, Y) { //X and Y represent increase or decrease in that plane
    let arr = pos.split("");
    let curX = letterNumIdx.indexOf(arr[0]); //Index of the letter
    let newX = parseInt(curX) + X;
    let newY = parseInt(arr[1]) + Y;
    let newCoor = [newX, newY];
    let newid = [letterNumIdx[newX], newY].join("");

    //Checks if new coordinates is out of range
    if (0 > newX || newX > 7 || 1 > newY || newY > 8) {
        return;
      }
  
    //Return new coordinate
    return newid;
  }

//Bishop Movement 
function bishopMovement(pos) {
    let bishopPositions = [];
    let arr = pos.split("");
    let curX = letterNumIdx.indexOf(arr[0]); //Index of the letter
    let curY = arr[1];
    let refY = parseInt(curY);
    //Top Right Side
    for (let row = curX; row < 8; row++) {
      //Check for Range Limit
      if (row >= 7 || refY >= 8) {
        break;
      }
      let newRow = row + 1;
      let newCol = refY + 1;
      let newid = [letterNumIdx[newRow], newCol].join("");
      refY++;
      bishopPositions.push(newid);
    }
  
    refY = parseInt(curY);
    //Top Left Side
    for (let x = curX; x >= 0; x--) {
      //Check for Range Limit
      if (x <= 0 || refY >= 8) {
        break;
      }
      let newRow = parseInt(x) - 1;
      let newCol = refY + 1;
      let newid = [letterNumIdx[newRow], newCol].join("");
      refY++;
      bishopPositions.push(newid);
    }
  
    //Bottom Right Side
    refY = parseInt(curY);
    for (let x = curX; x < 8; x++) {
      //Check for Range Limit
      if (x >= 7 || refY <= 1) {
        break;
      }
      let newRow = parseInt(x) + 1;
      let newCol = refY - 1;
      let newid = [letterNumIdx[newRow], newCol].join("");
      refY--;
      bishopPositions.push(newid);
    }
  
    //Bottom Left Side
    refY = parseInt(curY);
    for (let x = curX; x >= 0; x--) {
      //Check for Range Limit
      if (x <= 0 || refY <= 1) {
        break;
      }
      let newRow = parseInt(x) - 1;
      let newCol = refY - 1;
      let newid = [letterNumIdx[newRow], newCol].join("");
      refY--;
      bishopPositions.push(newid);
    }
    console.log(bishopPositions);
    return bishopPositions;
  }

//Rock Movement
function rookMovement(pos) {
    let rookPositions = [];
    let arr = pos.split("");
    let curX = letterNumIdx.indexOf(arr[0]);
    let curY = parseInt(arr[1]);
  
    //Top
    for (let y = curY + 1; y < 9; y++) {
      let newid = [arr[0], y].join("");
      rookPositions.push(newid);
    }
    //Bottom
    for (let y = curY - 1; y > 0; y--) {
      let newid = [arr[0], y].join("");
      rookPositions.push(newid);
    }
    //Right
    for (let x = curX + 1; x < 8; x++) {
      let newid = [letterNumIdx[x], curY].join("");
      rookPositions.push(newid);
    }
    //Left
    for (let x = curX - 1; x >= 0; x--) {
      let newid = [letterNumIdx[x], curY].join("");
      rookPositions.push(newid);
    }
    console.log(rookPositions) //Logs all possible positions in a single array
    return rookPositions
  }

//King Movement
function kingMovement(pos) {
    let initialPos = [];
    let arr = pos.split("");
    let curX = letterNumIdx.indexOf(arr[0]); //Index of the letter
    let curY = parseInt(arr[1]);
  
    let right = curX + 1;
    let left = curX - 1;
    let up = curY + 1;
    let down = curY - 1;
  
    if(right>7){
      right = undefined;
    }
    if(left<0){
      left = undefined;
    }
    if(up>8){
      up = undefined;
    }
    if(down<1){
      down = undefined;
    }
    
    let moveUp = [letterNumIdx[curX], up].join("");
    let moveDown = [letterNumIdx[curX], down].join("");
    let moveRight = [letterNumIdx[right],curY].join("");
    let moveLeft = [letterNumIdx[left],curY].join("");
    let upRight = [letterNumIdx[right], up].join("");
    let upLeft = [letterNumIdx[left], up].join("");
    let downRight = [letterNumIdx[right], down].join("");
    let downLeft = [letterNumIdx[left], down].join("");
  
    initialPos.push(moveUp,moveDown,moveRight, moveLeft, upRight,upLeft,downRight,downLeft);
  
    //Filters for legal cells available
    let kingPositions = initialPos.filter(function(el){
      return el.length > 1;
    })
    
    console.log(kingPositions);
  }

  
function convertPosition(id){
    return id.split("");
}

//Special Functions
//Starting Pawn - Double Square
//Pawn Promotes
//King-Rook Castle