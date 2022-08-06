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
chessboard.addEventListener('click', playerClick)
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
    document.getElementById('E1').innerHTML = 'King';
    document.getElementById('E1')._variable = king;
    document.getElementById('D1').innerHTML = 'Queen';
    document.getElementById('E8').innerHTML = 'King';
    document.getElementById('D8').innerHTML = 'Queen';

    //Set Pawns
    for (i=0; i<8 ; i++){
        if(document.getElementById(letterNumIdx[i]+'2')){
            document.getElementById(letterNumIdx[i]+'2').innerHTML = 'Pawn';
            document.getElementById(letterNumIdx[i]+'2').classList.add('White');
            document.getElementById(letterNumIdx[i]+'2')._variable = pawn;
        }
        if(document.getElementById(letterNumIdx[i]+'7')){
            document.getElementById(letterNumIdx[i]+'7').innerHTML = 'Pawn';
            document.getElementById(letterNumIdx[i]+'7').classList.add('Black');
            document.getElementById(letterNumIdx[i]+'7')._variable = pawn;
        }
    }

    //Set Knights and Bishops
    document.getElementById('C1').innerHTML = 'Bishop';
    document.getElementById('F1').innerHTML = 'Bishop';
    document.getElementById('B1').innerHTML = 'Knight';
    document.getElementById('G1').innerHTML = 'Knight';
    document.getElementById('C8').innerHTML = 'Bishop';
    document.getElementById('F8').innerHTML = 'Bishop';
    document.getElementById('B8').innerHTML = 'Knight';
    document.getElementById('G8').innerHTML = 'Knight';

    //Set Rooks
    document.getElementById('A1').innerHTML = 'Rook';
    document.getElementById('A8').innerHTML = 'Rook';
    document.getElementById('H1').innerHTML = 'Rook';
    document.getElementById('H8').innerHTML = 'Rook';

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
    let piece = e.target.innerHTML;
    let pClass = e.target.classList;
    let piecePos = e.target.id;

//Pawn
    if(piece === 'Pawn' && pClass.contains('White')){
        let currentPos = convertPosition(piecePos);
        newPos.push(currentPos[0]);
        newPos.push(parseInt(currentPos[1]) + 1);
        let newid = newPos.join(''); //New position as a string
        console.log(newid);
    }

    if(piece === 'Pawn' && pClass.contains('Black')){
        let currentPos = convertPosition(piecePos);
        newPos.push(currentPos[0]);
        newPos.push(parseInt(currentPos[1]) - 1);
        let newid = newPos.join(''); //New position as a string
        console.log(newid);
    }

//Knight
    if(piece == 'Knight'){
        possiblePos = [];
        let currentPos = convertPosition(piecePos);
        
        console.log(currentPos);
    }

}

function knightPositions(pos){
    let possiblePositions = [];
    let currentPos = convertPosition(pos);
    //Top Positions
    possiblePositions.push(currentPos[])
}

function convertPosition(id){
    return id.split("");
}

//Used to determine new position (Testing for knight movement)
function updatedConvert(pos, X, Y) { //X and Y represent increase or decrease in that plane
    let arr = pos.split("");
    let curRowIdx = letterNumIdx.indexOf(pos[0]); //Index of the letter
    let newX = parseInt(curRowIdx) + X;
    let newY = parseInt(arr[1]) + Y;
    let newCoor = [newX, newY];
    let newid = [letterNumIdx[newX], newY].join("");
    
    //Checks if new coordinates is out of range
    if (0 > newX || newX > 7 || 1 > newY || newY > 8) {
        return
      }
  
    //Logs and return new coordinate
    console.log(newid)
    return newid
  }

//Special Functions
//Pawn Promotes
//King-Rook Castle