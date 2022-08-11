console.log("Connected!");
//////Global Variables/////
//Letter to number Index
let chessboard = document.getElementById("board");
let letterNumIdx = ["A", "B", "C", "D", "E", "F", "G", "H"];
let playerTurn = true; //true : White, false : Black
let checkStatus = false;
let activeCell = false;
let activePieceText = "";
let activePiecePos = "";
let activePieceClass = "";
let whiteMoves = [];
let blackMoves = [];
//Used in moving the pieces
let piecePositions = "";
let legalMoves = "";
let blackKing = "E8";
let whiteKing = "E1";

//Calling Functions
createBoard();
setBoard();

//Create 8x8 board
function createBoard() {
  for (let i = 8; i > 0; i--) {
    for (let j = 0; j < 8; j++) {
      // let color = checkerBoard(i,j);
      let newCell = document.createElement("div");
      newCell.id = letterNumIdx[j] + i;
      newCell.classList.add("cell");
      newCell.dataset.name = "";
      // newCell.style.backgroundColor = color;
      chessboard.append(newCell);
    }
  }
}

function checkerBoard(i,j){
  let sum = i+j;
  return sum % 2 === 0 ? 'Grey':'';
}


//////Event Listeners////
// chessboard.addEventListener('click',pieceMovement); ~~ To be deleted afterwards
chessboard.addEventListener("click", movePiece);

//////Functions/////

//Determines Player Turns (White or Black)
function updateColor(playerTurn) {return playerTurn ? 'White' : 'Black'}

//Set starting positions
function setBoard() {
  //Set Kings and Queen
  // document.getElementById("E1").innerText = "King";
  // document.getElementById("D1").innerText = "Queen";
  // document.getElementById("E8").innerText = "King";
  // document.getElementById("D8").innerText = "Queen";
  document.getElementById("E1").dataset.name = "King";
  document.getElementById("D1").dataset.name = "Queen";
  document.getElementById("E8").dataset.name = "King";
  document.getElementById("D8").dataset.name = "Queen";

  //Set Pawns
  for (i = 0; i < 8; i++) {
    if (document.getElementById(letterNumIdx[i] + "2")) {
      // document.getElementById(letterNumIdx[i] + "2").innerText = "Pawn";
      document.getElementById(letterNumIdx[i] + "2").dataset.name = "Pawn";
      document.getElementById(letterNumIdx[i] + "2").classList.add("White");
    }
    if (document.getElementById(letterNumIdx[i] + "7")) {
      // document.getElementById(letterNumIdx[i] + "7").innerText = "Pawn";
      document.getElementById(letterNumIdx[i] + "7").dataset.name = "Pawn";
      document.getElementById(letterNumIdx[i] + "7").classList.add("Black");
    }
  }

  //Set Knights and Bishops
  // document.getElementById("C1").innerText = "Bishop";
  // document.getElementById("F1").innerText = "Bishop";
  // document.getElementById("B1").innerText = "Knight";
  // document.getElementById("G1").innerText = "Knight";
  // document.getElementById("C8").innerText = "Bishop";
  // document.getElementById("F8").innerText = "Bishop";
  // document.getElementById("B8").innerText = "Knight";
  // document.getElementById("G8").innerText = "Knight";
  //Set Knights and Bishops (Dataset)
  document.getElementById("C1").dataset.name = "Bishop";
  document.getElementById("F1").dataset.name = "Bishop";
  document.getElementById("B1").dataset.name = "Knight";
  document.getElementById("G1").dataset.name = "Knight";
  document.getElementById("C8").dataset.name = "Bishop";
  document.getElementById("F8").dataset.name = "Bishop";
  document.getElementById("B8").dataset.name = "Knight";
  document.getElementById("G8").dataset.name = 'Knight';
  //

  //Set Rooks
  // document.getElementById("A1").innerText = "Rook";
  // document.getElementById("A8").innerText = "Rook";
  // document.getElementById("H1").innerText = "Rook";
  // document.getElementById("H8").innerText = "Rook";
  //Set Rooks (Dataset)
  document.getElementById("H8").dataset.name = "Rook";  
  document.getElementById("A1").dataset.name = "Rook";
  document.getElementById("A8").dataset.name = "Rook";
  document.getElementById("H1").dataset.name = "Rook";

  //Set white and black class
  for (let row = 0; row < 9; row++) {
    if (document.getElementById(letterNumIdx[row] + "1")) {
      document.getElementById(letterNumIdx[row] + "1").classList.add("White");
    }
    if (document.getElementById(letterNumIdx[row] + "8")) {
      document.getElementById(letterNumIdx[row] + "8").classList.add("Black");
    }
  }
}

function pieceMovement(piece, pClass, piecePos) {
  let newPos = [];
  let compareValue = '';

  //Pawn
  if (piece === "Pawn" && pClass.contains("White")) {
    let newid = [];
    let currentPos = convertPosition(piecePos);
    newPos.push(currentPos[0]);
    newPos.push(parseInt(currentPos[1]) + 1);
    compareValue = newPos.join("");

    //Checks if there is a piece in front of the pawn - if true ~ can't move
    if (document.getElementById(compareValue).dataset.name === "") {
      newid.push(newPos.join("")); //New position as a string
    }

    //Diagonal Pawn Takes
    let upRight = returnDia(piecePos, "White", "right").join("");
    let upLeft = returnDia(piecePos, "White", "left").join("");

  if(upRight.length > 1){
    if (document.getElementById(upRight).dataset.name != "" && document.getElementById(upRight).classList.contains("Black")) {
      newid.push(upRight);
    }
  }
  if(upLeft.length > 1){
    if (document.getElementById(upLeft).dataset.name != "" && document.getElementById(upLeft).classList.contains("Black")) {
      newid.push(upLeft);
    }
  }
    //First pawn move - 2 squares
    testPos = [];
    testPos.push(currentPos[0]);
    testPos.push(parseInt(currentPos[1]) + 2);

    if (parseInt(currentPos[1]) === 2 && document.getElementById(testPos.join("")).dataset.name === '' && document.getElementById(compareValue).dataset.name === '') {
      newPos = [];
      newPos.push(currentPos[0]);
      newPos.push(parseInt(currentPos[1]) + 2);
      newid.push(newPos.join(""));
    }
    let pawnPositions = newid.filter(function (el){
      return el.length > 1;
    })
    return pawnPositions;
  }

  if (piece === "Pawn" && pClass.contains("Black")) {
    let newid = [];
    let currentPos = convertPosition(piecePos);
    newPos.push(currentPos[0]);
    newPos.push(parseInt(currentPos[1]) - 1);
    compareValue = newPos.join("");

    //Checks if there is a piece in front of the pawn - if true ~ can't move
    if (document.getElementById(newPos.join("")).dataset.name === "") {
      newid.push(newPos.join("")); //New position as a string
    }
    //Diagonal Pawn Takes
    let downRight = returnDia(piecePos, "Black", "right").join("");
    let downLeft = returnDia(piecePos, "Black", "left").join("");
  if(downRight.length > 1){
    if (document.getElementById(downRight).dataset.name != "" && document.getElementById(downRight).classList.contains("White")) {
      newid.push(downRight);
    }
  }
  if(downLeft.length > 1){
    if (document.getElementById(downLeft).dataset.name != "" && document.getElementById(downLeft).classList.contains("White")) {
      newid.push(downLeft);
    }
  }
  testPos = [];
  testPos.push(currentPos[0]);
  testPos.push(parseInt(currentPos[1]) - 2);
  //Pawn 2 square movement
    if (parseInt(currentPos[1]) === 7 && document.getElementById(testPos.join("")).dataset.name === "" && document.getElementById(compareValue).dataset.name === "") {
      newPos = [];
      newPos.push(currentPos[0]);
      newPos.push(parseInt(currentPos[1]) - 2);
      newid.push(newPos.join(""));
    }
    return newid;
  }

  //Knight
  if (piece == "Knight") {
    possiblePos = [];
    //Top
    possiblePos.push(knightMovement(piecePos, 1, 2));
    possiblePos.push(knightMovement(piecePos, -1, 2));
    //Bottom
    possiblePos.push(knightMovement(piecePos, 1, -2));
    possiblePos.push(knightMovement(piecePos, -1, -2));
    // Right
    possiblePos.push(knightMovement(piecePos, 2, 1));
    possiblePos.push(knightMovement(piecePos, 2, -1));
    //Left
    possiblePos.push(knightMovement(piecePos, -2, 1));
    possiblePos.push(knightMovement(piecePos, -2, -1));

    knightPos = possiblePos.filter(function (el) {
      return el !== undefined;
    });

    checkForPieces(knightPos);
    return knightPos;
  }
  //Bishop
  if (piece == "Bishop") {
    let bishopPositions = bishopMovement(piecePos);
    return bishopPositions;
  }
  //Rook
  if (piece == "Rook") {
    let rookPositions = rookMovement(piecePos);
    return rookPositions;
  }
  //Queen
  if (piece == "Queen") {
    let move1 = bishopMovement(piecePos);
    let move2 = rookMovement(piecePos);
    let queenPositions = move1.concat(move2);
    return queenPositions;
  }
  //King
  if (piece == "King") {
    let kingPositions = kingMovement(piecePos);
    return kingPositions;
  }
}

////Piece Movement Functions - Determine available positions:////

//Pawn diagonal take piece movement
function returnDia(pos, color, dir) {
  let takePositions = [];
  let arr = pos.split("");
  let curX = letterNumIdx.indexOf(arr[0]);
  let curY = parseInt(arr[1]);
  let up = curY + 1;
  let down = curY - 1;
  let right = curX + 1;
  let left = curX - 1;

  if (right > 7) {
    right = undefined;
  }
  if (left < 0) {
    left = undefined;
  }
  if (up > 8) {
    up = undefined;
  }
  if (down < 1) {
    down = undefined;
  }

  if (color === "White" && dir === "left") {
    var diagonalLeft = [letterNumIdx[left], up].join("");
    takePositions.push(diagonalLeft);
  }
  if (color === "White" && dir === "right") {
    var diagonalRight = [letterNumIdx[right], up].join("");
    takePositions.push(diagonalRight);
  }
  if (color === "Black" && dir === "left") {
    var diagonalLeft = [letterNumIdx[left], down].join(""); 
    takePositions.push(diagonalLeft);
  }
  if (color === "Black" && dir === "right") {
    var diagonalRight = [letterNumIdx[right], down].join("");
    takePositions.push(diagonalRight);
  }
  let cleanUp = takePositions.filter(function(el){return el.length > 1})
  return cleanUp;
}

//Knight Movement
function knightMovement(pos, X, Y) {
  //X and Y represent increase or decrease in that plane
  let arr = pos.split("");
  let curX = letterNumIdx.indexOf(arr[0]); //Index of the letter
  let newX = parseInt(curX) + X;
  let newY = parseInt(arr[1]) + Y;
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

  let pClass = pieceColor(pos);

  //Top Right Side
  for (let row = curX; row < 8; row++) {
    //Check for Range Limit
    if (row >= 7 || refY >= 8) {
      break;
    }
    let newRow = row + 1;
    let newCol = refY + 1;
    let newid = [letterNumIdx[newRow], newCol].join("");

    if (!document.getElementById(newid).classList.contains(pClass) && document.getElementById(newid).dataset.name != "") {
      bishopPositions.push(newid);
      break;
    } else if (document.getElementById(newid).dataset.name != "") {
      break;
    }

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

    if (!document.getElementById(newid).classList.contains(pClass) && document.getElementById(newid).dataset.name != "") {
      bishopPositions.push(newid);
      break;
    } else if (document.getElementById(newid).dataset.name != "") {
      break;
    }
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

    if (!document.getElementById(newid).classList.contains(pClass) && document.getElementById(newid).dataset.name != "") {
      bishopPositions.push(newid);
      break;
    } else if (document.getElementById(newid).dataset.name != "") {
      break;
    }

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

    if (!document.getElementById(newid).classList.contains(pClass) && document.getElementById(newid).dataset.name != "") {
      bishopPositions.push(newid);
      break;
    } else if (document.getElementById(newid).dataset.name != "") {
      break;
    }

    refY--;
    bishopPositions.push(newid);
  }
  return bishopPositions;
}

//Rock Movement
function rookMovement(pos) {
  let rookPositions = [];
  let pClass = pieceColor(pos);
  let arr = pos.split("");
  let curX = letterNumIdx.indexOf(arr[0]);
  let curY = parseInt(arr[1]);

  //Top
  for (let y = curY + 1; y < 9; y++) {
    let newid = [arr[0], y].join("");
    if (
      !document.getElementById(newid).classList.contains(pClass) &&
      document.getElementById(newid).dataset.name != ""
    ) {
      rookPositions.push(newid);
      break;
    } else if (document.getElementById(newid).dataset.name != "") {
      break;
    }
    rookPositions.push(newid);
  }
  //Bottom
  for (let y = curY - 1; y > 0; y--) {
    let newid = [arr[0], y].join("");
    if (
      !document.getElementById(newid).classList.contains(pClass) &&
      document.getElementById(newid).dataset.name != ""
    ) {
      rookPositions.push(newid);
      break;
    } else if (document.getElementById(newid).dataset.name != "") {
      break;
    }
    rookPositions.push(newid);
  }
  //Right
  for (let x = curX + 1; x < 8; x++) {
    let newid = [letterNumIdx[x], curY].join("");
    if (
      !document.getElementById(newid).classList.contains(pClass) &&
      document.getElementById(newid).dataset.name != ""
    ) {
      rookPositions.push(newid);
      break;
    } else if (document.getElementById(newid).dataset.name != "") {
      break;
    }
    rookPositions.push(newid);
  }
  //Left
  for (let x = curX - 1; x >= 0; x--) {
    let newid = [letterNumIdx[x], curY].join("");
    if (
      !document.getElementById(newid).classList.contains(pClass) &&
      document.getElementById(newid).dataset.name != ""
    ) {
      rookPositions.push(newid);
      break;
    } else if (document.getElementById(newid).dataset.name != "") {
      break;
    }
    rookPositions.push(newid);
  }
  // console.log(rookPositions) //Logs all possible positions in a single array
  return rookPositions;
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

  if (right > 7) {
    right = undefined;
  }
  if (left < 0) {
    left = undefined;
  }
  if (up > 8) {
    up = undefined;
  }
  if (down < 1) {
    down = undefined;
  }

  let moveUp = [letterNumIdx[curX], up].join("");
  let moveDown = [letterNumIdx[curX], down].join("");
  let moveRight = [letterNumIdx[right], curY].join("");
  let moveLeft = [letterNumIdx[left], curY].join("");
  let upRight = [letterNumIdx[right], up].join("");
  let upLeft = [letterNumIdx[left], up].join("");
  let downRight = [letterNumIdx[right], down].join("");
  let downLeft = [letterNumIdx[left], down].join("");

  initialPos.push(
    moveUp,
    moveDown,
    moveRight,
    moveLeft,
    upRight,
    upLeft,
    downRight,
    downLeft
  );

  //Filters for legal cells available
  let kingPositions = initialPos.filter(function (el) {
    return el.length > 1;
  });

  return kingPositions;
}

//Move pieces by selecting and clicking on legal cells
function movePiece(e) {
  let playerColor = updateColor(playerTurn);
  let piece = e.target.dataset.name;
  let pClass = e.target.classList;
  let piecePos = e.target.id;

  console.log(e.target);
  console.dir(e.target);

  //Case 1 - First click on a piece
  //Updates trigger variable
  if (activeCell === false && piece != "" && pClass.contains(playerColor)) {
    //Checks what the active cell color is - white or black
    if (pClass.contains("White")) {
      activePieceClass = "White";
    } else if (pClass.contains("Black")) {
      activePieceClass = "Black";
    }
    //Sets bool that there is activePiece
    activeCell = true;
    e.target.classList.add("active");
    activePieceText = piece;
    activePiecePos = piecePos;
    piecePositions = pieceMovement(piece, pClass, piecePos);
    legalMoves = checkForPieces(piecePositions, activePieceClass);
    hightlightCells(legalMoves);
  } else if (activeCell === true && !pClass.contains(activePieceClass)) {
    if (legalMoves.includes(piecePos)) {
      //If king is moved - saved details
      if(activePieceClass === 'White' && activePieceText === 'King'){
        whiteKing = piecePos;
      } else if(activePieceClass === 'Black' && activePieceText === 'King'){
        blackKing = piecePos;
      }

      //Case 2 - Clicked onto another spot or opposite piece
      // e.target.innerText = activePieceText;
      e.target.dataset.name = activePieceText;
      pClass.remove("White", "Black");
      pClass.add(activePieceClass);

      //Clear Cached Previous Piece Position and Values
      activeCell = false;
      // document.getElementById(activePiecePos).innerText = "";
      document.getElementById(activePiecePos).dataset.name = ""; //Deleting old dataset name
      document.getElementById(activePiecePos).style.backgroundImage = "";
      document.getElementById(activePiecePos).classList.remove("active", "Black", "White");
      clearHighlights(legalMoves);
      activePieceText = "";
      activePiecePos = "";
      activePieceClass = "";
      piecePositions = "";
      legalMoves = "";
      addImage();
      playerTurn = !playerTurn;
      playerColor = updateColor(playerTurn);
      document.querySelector('h2').innerText = playerColor+" Player's Turn"; //Update player turn 
    }
  } else if (activeCell === true && pClass.contains(activePieceClass)) {
    activeCell = false;
    activePieceClass = "";
    clearHighlights(legalMoves);
  } 
  if(playerColor=='White'){
    inCheck(whiteKing,'White');
  }
  if(playerColor == 'Black'){
    inCheck(blackKing,'Black');
  }
}

//King is in Check
function inCheck(pos, color){
  let lastKingPos;
  color === 'White'? lastKingPos = whiteKing:lastKingPos = blackKing;

  let linearPos = rookMovement(pos); //Rook and Queen Checks
  let diagonalPos = bishopMovement(pos); //Bishop and Queen Checks
  let knightPos, pawnPos = [];
  let numAtt = 0;

  //Pawn checks
  if(color === 'White'){
    pawnPos.push(returnDia(pos, 'White', 'right'));
    pawnPos.push(returnDia(pos, 'White', 'left'));
  }
  if(color === 'Black'){
    pawnPos.push(returnDia(pos, 'Black', 'right'));
    pawnPos.push(returnDia(pos, 'Black', 'left'));
  }
  //Removes empty pawnPos - when king is on edge of the board
  for(let i = 1; i>=0; i--){
    if(pawnPos[i].length < 1){
      pawnPos.splice(i,1);
    }
  }

  //Possible Knight Checks
  if (true) {
    possiblePos = [];
    //Top
    possiblePos.push(knightMovement(pos, 1, 2));
    possiblePos.push(knightMovement(pos, -1, 2));
    //Bottom
    possiblePos.push(knightMovement(pos, 1, -2));
    possiblePos.push(knightMovement(pos, -1, -2));
     //Right
    possiblePos.push(knightMovement(pos, 2, 1));
    possiblePos.push(knightMovement(pos, 2, -1));
     //Left
    possiblePos.push(knightMovement(pos, -2, 1));
    possiblePos.push(knightMovement(pos, -2, -1));

    knightPos = possiblePos.filter(function (el) {
      return el !== undefined;
    });
  }

  checkStatus = false;

  linearPos.forEach(function(el){
    if(!document.getElementById(el).classList.contains(color) && (document.getElementById(el).dataset.name === 'Rook' || document.getElementById(el).dataset.name === 'Queen')){
      console.log('Check1')
      console.log(el)
      checkStatus = true;
      numAtt++;
      // return;
      }
  })

  diagonalPos.forEach(function(el){
    if(document.getElementById(el).dataset.name === 'Bishop' || document.getElementById(el).dataset.name === 'Queen'){
      console.log('Check2')
      checkStatus = true;
      numAtt++;
      // return;
      }
  })

  knightPos.forEach(function(el){
    if(document.getElementById(el).dataset.name === 'Knight' && !document.getElementById(el).classList.contains(color)){
      console.log('Check3')
      checkStatus = true;
      numAtt++;
      // return;
      }
  })

  pawnPos.forEach(function(el){
    if (document.getElementById(el).dataset.name === 'Pawn' && !document.getElementById(el).classList.contains(color)){
      console.log('Check4')
      checkStatus = true;
      numAtt++;
      // return;
    }
  })
  
  console.log('Number of attackers : '+numAtt);
  inCheckHighlight(pos)
}

function checkmate(){
  let color = updateColor(playerTurn);
  let wMoves = availablePositions('White');
  let bMoves = availablePositions('Black');
  console.log(x)
  if(checkStatus === true){
    console.log('Checkmate!')
  }

}

function availablePositions(color){
  let arr = [];
  let board = document.querySelectorAll('.cell');
  for(let pos of board){
    if(pos.classList.contains(color)){
      arr.push(pos.id);
    }
  }
  return arr;
}

//////Misc Functions//////
let oldPos = "";
function inCheckHighlight(pos){

  if(checkStatus === true){
    document.getElementById(pos).style.backgroundColor = 'red';
    return oldPos = pos;
  } else if (checkStatus === false){
    document.getElementById(pos).style.backgroundColor = '';
    if(oldPos != ""){
    document.getElementById(oldPos).style.backgroundColor = '';
    }
  }

}

function convertPosition(id) {
  return id.split("");
}

//Use to add images of the pieces into elements
function addImage() {
  document.querySelectorAll(".cell").forEach((el) => {
    if(el.classList.contains("White")){
      if (el.dataset.name == "Pawn") {
        el.style.backgroundImage = "url('img/Wpawn.png')";
      }
      if (el.dataset.name == "Knight") {
        el.style.backgroundImage = "url('img/Wknight.png')";
      }
      if (el.dataset.name == "Bishop") {
        el.style.backgroundImage = "url('img/Wbishop.png')";
      }
      if (el.dataset.name == "Rook") {
        el.style.backgroundImage = "url('img/Wrook.png')";
      }
      if (el.dataset.name == "Queen") {
        el.style.backgroundImage = "url('img/Wqueen.png')";
      }
      if (el.dataset.name == "King") {
        el.style.backgroundImage = "url('img/Wking.png')";
      }
    }
    if(el.classList.contains("Black")){
      if (el.dataset.name == "Pawn") {
        el.style.backgroundImage = "url('img/Bpawn.png')";
      }
      if (el.dataset.name == "Knight") {
        el.style.backgroundImage = "url('img/Bknight.png')";
      }
      if (el.dataset.name == "Bishop") {
        el.style.backgroundImage = "url('img/Bbishop.png')";
      }
      if (el.dataset.name == "Rook") {
        el.style.backgroundImage = "url('img/Brook.png')";
      }
      if (el.dataset.name == "Queen") {
        el.style.backgroundImage = "url('img/Bqueen.png')";
      }
      if (el.dataset.name == "King") {
        el.style.backgroundImage = "url('img/Bking.png')";
      }
    }
  });
}
addImage();

function hightlightCells(arr) {
  arr.forEach((pos) => {
    document.getElementById(pos).style.backgroundColor = "Green";
  });
}

function clearHighlights(arr) {
  arr.forEach((pos) => {
    document.getElementById(pos).style.backgroundColor = "";
  });
}

//Returns the color of the piece (White or black)
function pieceColor(pos) {
  let pieceColor = "";
  if (document.getElementById(pos).classList.contains("White")) {
    pieceColor = "White";
  } else if (document.getElementById(pos).classList.contains("Black")) {
    pieceColor = "Black";
  }
  return pieceColor;
}

//Checks if there are any pieces within the given array
function checkForPieces(arr, pClass) {
  let newPos = [];
  // document.getElementById(pos).innerText === "" || 
  arr.forEach(function (pos) {
    if (document.getElementById(pos).dataset.name === "" || !document.getElementById(pos).classList.contains(pClass)) {
      newPos.push(pos);
    }
  });
  console.log("These are the new positions: " + newPos);
  return newPos;
}

//Undo previous move (limited to 1 move)
/////Currently Not in Use//////
function undo(lastActiveId, lastActiveName, lastActiveClass, lastTargetId, lastTargetName, lastTargetClass){

  //Piece Moved
  // document.getElementById(lastActiveId).innerText = lastActiveName;
  document.getElementById(lastActiveId).dataset.name = lastActiveName;
  document.getElementById(lastActiveId).className = lastActiveClass;
  //Location of piece moved/taken
  // document.getElementById(lastTargetId).innerText = lastTargetName;
  document.getElementById(lastTargetId).dataset.name = lastTargetName;
  document.getElementById(lastTargetId).className = lastTargetClass;

}

////Special Functions////
//Starting Pawn - Double Square
//Pawn Promotes
//King-Rook Castle
