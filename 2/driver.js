
// game width cant be lower than 1

//game state for saving. 
class TicTacToe{
constructor (players/* an arr of Player. player0 is always o and player1 is x*/, width){
    
    this.gameEnded = false;
    this.players = players;
    //this.hasAI = hasAI(this.players[0], this.players[1], this.board); //also initializes ai
    this.board = newGameBoard(width, this.hasAI);
    
    this.currentPlayer = this.players[1];
    this.turnNum = 1;
    this.displayPlayerTurn = function(suqare){
        console.log("player: " + this.currentPlayer + " took: " + square);
    };
    this.startOfAITurn = function(){
    };
    this.endOfAITurn = function(){
    };
    

    this.updateAIBoard = function(square){

    }




    this.testAI = new AI(this.board);




    //returns an array referencing winning squares
    this.checkVictory = function (square){
        let victorySquares;
        let victory = true;
        //console.log(this.currentPlayer.symbol);
        //console.log(square);
        
        //check horizontally
        for (let i = 0; i < this.board.length; i++){
            if (this.board[square.x][i].symbol !== this.currentPlayer.symbol){
                victory = false;
            }
            
        }
        if (victory){
            victorySquares = [square.x, square.y, "horizontal"];
            return victorySquares;
        }
        victory = true;
        
        //check vertically
        for (let i = 0; i < this.board.length; i++){
            
            if (this.board[i][square.y].symbol !== this.currentPlayer.symbol){
                victory = false;
            }
            
            
        }
        if (victory){
            victorySquares =  [square.x, square.y, "vertical"];
            return victorySquares;
        }
        victory = true;
        //check diagonally
        if (square.x == square.y){
            for (let i = 0; i < width; i++){
                if(this.board[i][i].symbol !== this.currentPlayer.symbol){
                victory = false;
                }
                
                
            }
            if (victory) {
                victorySquares = [square.x, square.y, "majordiagonal"];
                return victorySquares;
            }
        }
        
        victory = true;
        //top right to Bottom left diagonal
        
        if (this.board.length - 1 == square.x + square.y){
            for (let i = 0; i < this.board.length; i++){
                if (this.board[i][Math.abs(i - (this.board.length - 1))].symbol !== this.currentPlayer.symbol){
                    victory = false;
                }
                
            }
            if (victory) {
                victorySquares = [square.x, square.y, "minordiagonal"];
                return victorySquares;
            }   

        
        }
        victorySquares = [square.x, square.y, ""]
        return victorySquares;
    }

    this.getWinningSquares = function(winningSqares){
        
        let arr = [];
        
        if (winningSqares.includes("horizontal")){
            for (let i = 0; i < this.board.length; i++){
                arr[i] = this.board[winningSqares[0]][i];
            }
        }else if (winningSqares.includes("vertical")){
            for (let i = 0; i < this.board.length; i++){
                arr[i] = this.board[i][winningSqares[1]]; 
            }
        }else if (winningSqares.includes("majordiagonal")){
            for (let i = 0; i < this.board.length; i++){
                arr[i] = this.board[i][i]; 
            }
        } else {
            for (let i = 0; i < this.board.length; i++){
                arr[i] = this.board[i][Math.abs(i - (this.board.length - 1))]; 
            }

        }
        return arr;
        
    }

    this.ticCounters = function(){
        this.turnNum++;
        this.currentPlayer = this.players[this.turnNum % 2];
    };

    this.nextTurn = function(square){
        
        
        square.symbol = this.currentPlayer.symbol;
        this.displayPlayerTurn(square);
        let winningSqares = this.checkVictory(square);

        
        if (!(winningSqares[2].localeCompare("") == 0)){
            this.gameEnded = true;
            this.victory(this.getWinningSquares(winningSqares), this.currentPlayer);
            return;
            
        }

        if (this.currentPlayer === players[0]){
            this.testAI.updateByMyMove(square);
        }


        this.ticCounters();

        if (this.turnNum > (Math.pow(this.board.length, 2))){
            this.gameEnded = true;
            this.draw();
            return;
        }

        if (this.currentPlayer === players[0]){
            this.testAI.updateByOpponentMove(square);
        }
        
        
        if (this.currentPlayer.ai !== undefined){
            this.startOfAITurn();
            this.currentPlayer.ai.updateByOpponentMove(square);
            this.nextTurn(this.currentPlayer.ai.nextTurn(square));
            this.endOfAITurn();
        }
        
        
    }

    this.victory = function(winnerSquares, player){
        console.log(/*"TicTacToe winning squares are:" + winnerSquares + " winner:" + player.symbol*/winnerSquares);
    };

    this.draw = function(){

    }


    function newGameBoard(width){
        let arr = [];
        
        for (let i = 0; i < width; i++){
            let innerArr = [];
            for (let j = 0; j < width; j++){
                innerArr[j] = new Square(i, j, "");
            }
    
            arr[i] = innerArr;
        }
        return arr;
        
    }

    
    }

}


class Square {
    constructor(x, y, symbol){
        this.x = x;
        this.y = y;
        this.symbol = symbol;
    }
}


//player object. no dif = human
function Player(symbol, difficulty){
    this.symbol = symbol;
    this.AIDifficulty = difficulty;
    this.ai;
    this.victorious = false;
    this.otherSymbol = function(){
        if (this.symbol == "X"){ return "Y";}
        else {return "O";}
    };

    this.initializeAI = function(board){
        
    
        if (this.AIDifficulty == "easy"){
            
            this.ai = new EasyAI(board, this.symbol);
            return true;
        }
    
        else if (this.AIDifficulty == "normal"){
            this.ai = new NormalAI(board, this.symbol);
            return true;
        }
    
        else if (this.AIDifficulty == "hard"){
            
            this.ai = new HardAI(board, this.symbol);
            return true;
        }
    
        else {return false;}
    }
}

function hasAI(player1, player2, board) {
    let p1 = player1.initializeAI(board);
    let p2 = player2.initializeAI(board);
    return (p1 || p2);
}
