
class AI {
    constructor(board){
        this.board = board;
        this.AIRows = getAIRows(board);//returns [[horizontal rows], [verticalrows], [diagonal rows - major then minor]]
        this.AIBoard = getAIBoard(this.board, this.AIRows);
        
        
        this.updateByOpponentMove = function(square){
            let AIBoard = this.AIBoard;
            let AIRows = this.AIRows;
            let currentRows = getRows(square, this.AIRows,  this.AIBoard); // [horizontal rows, vert, diag if any]

            AIBoard[square.x][square.y].taken = true;

            AIRows[0][square.x].opponentPresence++;
            AIRows[1][square.y].opponentPresence++;
            if (AIBoard[square.x][square.y].onMajorDiagonal){
                AIRows[2][0].opponentPresence++;
            }
            if (AIBoard[square.x][square.y].onMinorDiagonal){
                AIRows[2][1].opponentPresence++;
            }
            
            
        //////////////////////////////////////////////////////////////////////////////////////////////
            //set one from loss
            if (this.AIRows[0][square.x].opponentPresence == this.board.length - 1){
                for (let i = 0; i < this.board.length; i++){
                    this.AIBoard[square.x][i].oneFromLoss = true;
                }
            }

            if (this.AIRows[1][square.y].opponentPresence == this.board.length - 1){
                for (let i = 0; i < this.board.length; i++){
                    this.AIBoard[i][square.y].oneFromLoss = true;
                }
            }
            //maj diagonal
            if (this.AIBoard[square.x][square.y].onMajorDiagonal && this.AIRows[2][0].opponentPresence == this.board.length - 1){
                for (let i = 0; i < this.board.length; i++){
                    this.AIBoard[i][i].oneFromLoss = true;
                }
            }
            //min diagonal
            if (this.AIBoard[square.x][square.y].onMinorDiagonal && this.AIRows[2][1].opponentPresence == this.board.length - 1){
                for (let i = 0; i < this.board.length; i++){
                    this.AIBoard[i][this.board.length - 1 - i].oneFromLoss = true;
                }
            }
        /////////////////////////////////////////////////////////////////////////////////////////////////
            // block value

            if (currentRows[0].myPresence == 0 && currentRows[0].opponentPresence < 2){
                for(let i = 0; i < this.board.length; i++){
                    AIBoard[square.x][i].blockValue++;
                }
            }

            if (currentRows[1].myPresence == 0 && currentRows[1].opponentPresence < 2){
                for(let i = 0; i < this.board.length; i++){
                    AIBoard[i][square.y].blockValue++;
                }
            }

            if (currentRows[2] != undefined && currentRows[2].myPresence == 0  && currentRows[2].opponentPresence < 2){
                for(let i = 0; i < this.board.length; i++){
                    AIBoard[i][i].blockValue++;
                }
            }

            if (currentRows[3] != undefined && currentRows[3].myPresence == 0 && currentRows[3].opponentPresence < 2){
                for(let i = 0; i < this.board.length; i++){
                    AIBoard[i][this.board.length - 1 - i].blockValue++;
                }
            }

        ////////////////////////////////////////////////////////////////////////////////////////////
            //unblocked rows
            if (currentRows[0].opponentPresence == 1){
                for(let i = 0; i < this.board.length; i++){
                    AIBoard[square.x][i].unblockedRows--;
                }
            }

            if (currentRows[1].opponentPresence == 1){
                for(let i = 0; i < this.board.length; i++){
                    AIBoard[i][square.y].unblockedRows--;
                }
            }

            if (currentRows[2] != undefined && currentRows[2].opponentPresence == 1){
                for(let i = 0; i < this.board.length; i++){
                    AIBoard[i][i].unblockedRows--;
                }
            }

            if (currentRows[3] != undefined && currentRows[3].opponentPresence == 1){
                for(let i = 0; i < this.board.length; i++){
                    AIBoard[i][this.board.length - 1 - i].unblockedRows--;
                }
            }
           
        };

        this.updateByMyMove = function(square){
            let currentRows = getRows(square, this.AIRows,  this.AIBoard); // [horizontal rows, vert, diag if any]
            let AIBoard = this.AIBoard;
            let AIRows = this.AIRows;

            AIBoard[square.x][square.y].taken = true;

            AIRows[0][square.x].myPresence++;
            AIRows[1][square.y].myPresence++;
            if (AIBoard[square.x][square.y].onMajorDiagonal){
                AIRows[2][0].myPresence++;
            }
            if (AIBoard[square.x][square.y].onMinorDiagonal){
                AIRows[2][1].myPresence++;
            }
        ///////////////////////////////////////////////////////////////////////////////////////////////
            //update block value on blocked

            if (currentRows[0].opponentPresence >= 1){
                for(let i = 0; i < this.board.length; i++){
                    AIBoard[square.x][i].blockValue = 0;
                }
            }

            if (currentRows[1].opponentPresence >= 1){
                for(let i = 0; i < this.board.length; i++){
                    AIBoard[i][square.y].blockValue = 0;
                }
            }

            if (currentRows[2] != undefined && currentRows[2].opponentPresence >= 1){
                for(let i = 0; i < this.board.length; i++){
                    AIBoard[i][i].blockValue = 0;
                }
            }

            if (currentRows[3] != undefined && currentRows[3].opponentPresence >= 1){
                for(let i = 0; i < this.board.length; i++){
                    AIBoard[i][this.board.length - 1 - i].blockValue = 0;
                }
            }
        //////////////////////////////////////////////////////////////////////////////////////////////////////
            //one move from win

            if (AIRows[0][square.x].myPresence == this.board.length - 1){
                for (let i = 0; i < this.board.length; i++){
                    AIBoard[square.x][i].oneFromWin = true;
                }
            }

            if (AIRows[1][square.y].myPresence == this.board.length - 1){
                for (let i = 0; i < this.board.length; i++){
                    AIBoard[i][square.y].oneFromWin = true;
                }
            }
            //maj diagonal
            if (AIBoard[square.x][square.y].onMajorDiagonal && AIRows[2][0].myPresence == this.board.length - 1){
                for (let i = 0; i < this.board.length; i++){
                    AIBoard[i][i].oneFromWin = true;
                }
            }
            //min diagonal
            if (AIBoard[square.x][square.y].onMinorDiagonal && AIRows[2][1].myPresence == this.board.length - 1){
                for (let i = 0; i < this.board.length; i++){
                    AIBoard[i][this.board.length - 1 - i].oneFromWin = true;
                }
            }
        };


        function getAIBoard(board, rows) {
            
            let arr = [];
            let width = board.length;
            for (let i = 0; i < width; i++){
                let innerArr = [];
                let rowArr = [];
                for (let j = 0; j < width; j++){
                    innerArr[j] = new SquareValue();
                    innerArr[j].correspondingSquare = board[i][j];
                    if(i == j){
                        innerArr[j].onMajorDiagonal = true;
                    }
                    if (i + j == board.length - 1){
                        
                        innerArr[j].onMinorDiagonal = true;
                    }

                    

                    rowArr[0] = rows[0][i];
                    rowArr[1] = rows[1][j];
                    if (innerArr[j].onMajorDiagonal){
                        rowArr[2] = rows[2][0];
                        innerArr[j].unblockedRows++;

                    }
                    if (innerArr[j].onMinorDiagonal){
                        rowArr[3] = rows[2][1];
                        innerArr[j].unblockedRows++;
                    }

                    innerArr[j].rows = rowArr;
                    rowArr = [];

                    
                }
        
                arr[i] = innerArr;
            }
            /*set unblockedRows value for diagonals
            if (width % 2 == 0){
                arr[width/2][width/2].unblockedRows = 3;
                arr[width/2 - 1][width/2].unblockedRows = 3;
                arr[width/2][width/2 - 1].unblockedRows = 3;
                arr[width/2 - 1][width/2 - 1].unblockedRows = 3;
            }else{
                arr[Math.floor(width/2)][Math.floor(width/2)].unblockedRows = 4;
            }
            */
            return arr;

        }

        function getAIRows(board) {
            let horArr = [];
            let verArr = [];
            let diagArr = [new RowValue(), new RowValue()];

            for (let i = 0; i < board.length; i++){
                horArr[i] = new RowValue();
            }

            for (let i = 0; i < board.length; i++){
                verArr[i] = new RowValue();
            }

            return [horArr, verArr, diagArr];
        }
    }

}






class NormalAI extends AI {
    constructor(board){
        super(board);


        //fail chances
        this.oneFromWinCoef = 0.7;
        this.oneFromLossCoef = 0.03;
        this.blockValCoef = 0.20;
        this.unblockedCoef = 0.35;
        this.urgancyCoef = 0.5; //checks how many squares the opponent and itself have taken in a single row
        



        this.nextTurn = function(){//returns the next square
            let oneFromWinArr = [];
            let oneFromLossArr = [];

            let blockValArr = [];
            let currentBlockHigh = 0;

            let unblockedArr = [];
            let currrentUnblockedHigh = 0;
            
            let skipOneFromWin = randomRoll(this.oneFromWinCoef); 
            let skipOneFromLoss = randomRoll(this.oneFromLossCoef);
            let skipBlockVal = randomRoll(this.blockValCoef);
            let skipUnblocked = randomRoll(this.unblockedCoef);
            let skipUrgancy = randomRoll(this.urgancyCoef);

            //console.log(skipOneFromWin + " , " + skipOneFromLoss + " , " + skipBlockVal + " , " + skipUnblocked + " , " + skipUrgancy)

            for (let i = 0; i < this.board.length; i++){
                for (let j = 0; j < this.board.length; j++) {
                    if (this.AIBoard[i][j].taken){
                        continue;
                    }

                    if (!skipOneFromWin && this.AIBoard[i][j].oneFromWin){
                        oneFromWinArr.push(this.AIBoard[i][j])
                    }
                    if (!skipOneFromLoss && this.AIBoard[i][j].oneFromLoss){
                        oneFromLossArr.push(this.AIBoard[i][j])
                    }

                    if (skipBlockVal){
                        blockValArr.push(this.AIBoard[i][j])
                        if (skipUnblocked){
                            unblockedArr.push(this.AIBoard[i][j]);
                        }else {
                            if (currrentUnblockedHigh < this.AIBoard[i][j].unblockedRows){
                                currrentUnblockedHigh = this.AIBoard[i][j].unblockedRows;
                                unblockedArr = [this.AIBoard[i][j]];
                            }else if (currrentUnblockedHigh == this.AIBoard[i][j].unblockedRows){
                                unblockedArr.push(this.AIBoard[i][j]);
                            }
                        }
                    }else {

                        if (currentBlockHigh < this.AIBoard[i][j].blockValue){
                            currentBlockHigh = this.AIBoard[i][j].blockValue;
                            blockValArr = [this.AIBoard[i][j]];

                            currrentUnblockedHigh = this.AIBoard[i][j].unblockedRows;
                            unblockedArr = [this.AIBoard[i][j]];

                        }else if (currentBlockHigh == this.AIBoard[i][j].blockValue){
                            blockValArr.push(this.AIBoard[i][j]);
                            if (skipUnblocked){ 
                                unblockedArr.push(this.AIBoard[i][j]);
                            }else {
                                if (currrentUnblockedHigh < this.AIBoard[i][j].unblockedRows){
                                    currrentUnblockedHigh = this.AIBoard[i][j].unblockedRows;
                                    unblockedArr = [this.AIBoard[i][j]];
                                }else if (currrentUnblockedHigh == this.AIBoard[i][j].unblockedRows){
                                    unblockedArr.push(this.AIBoard[i][j]);
                                }
                            }

                        }
                    
                    }
                    
                }

                
            }

            if (oneFromWinArr.length > 0) {
                let temp = randomFromArray(oneFromWinArr).correspondingSquare;
                oneFromWinArr = [];
                this.updateByMyMove(temp);
                return temp //randomFromArray(oneFromWinArr).correspondingSquare;
            }

            if (oneFromLossArr.length > 0) {
                let temp = randomFromArray(oneFromLossArr).correspondingSquare;
                oneFromLossArr = [];
                this.updateByMyMove(temp);
                return temp //randomFromArray(oneFromLossArr).correspondingSquare;
            }

            let blockUrgancyHigh = 0;
            let takeUrgancyHigh = 0;
            let blockUrgancyArr = [];
            let takeUrgancyArr = [];

            
            for(let i = 0; i < unblockedArr.length; i++){
                let blockUrgancy = 0;
                let takeUrgancy = 0;

                for(let j = 0; j < 4; j++){
                    if(unblockedArr[i].rows[j] != undefined && unblockedArr[i].rows[j].myPresense == 0){
                        blockUrgancy += opponentPresense;
                    }

                    if(unblockedArr[i].rows[j] != undefined && unblockedArr[i].rows[j].opponentPresense == 0){
                        takeUrgancy += myPresense;
                    }
                }
                if (skipBlockVal || skipUrgancy){
                    blockUrgancyArr.push(unblockedArr[i]);
                }else {
                    if (blockUrgancy > blockUrgancyHigh){
                        blockUrgancyHigh = blockUrgancy;
                        blockUrgancyArr = [unblockedArr[i]];
                    }else if (blockUrgancy == blockUrgancyHigh){
                        blockUrgancyArr.push(unblockedArr[i]); 
                    }
                }

                if(skipUrgancy){
                    takeUrgancyArr.push(unblockedArr[i]);
                }else{
                    if (takeUrgancy > takeUrgancyHigh){
                        takeUrgancyHigh = takeUrgancy;
                        takeUrgancyArr = [unblockedArr[i]];
                    }else if (takeUrgancy == takeUrgancyHigh){
                        takeUrgancyArr.push(unblockedArr[i]); 
                    }
                }


            }

            if (blockUrgancyArr.length == 0 && takeUrgancyArr.length == 0 && unblockedArr.length == 0){
                console.log("error in ai logic");
            }

            if(blockUrgancyArr.length > 0){
                let temp = randomFromArray(blockUrgancyArr).correspondingSquare;
                this.updateByMyMove(temp);
                return temp //randomFromArray(blockUrgancyArr).correspondingSquare;
            }else if (takeUrgancyArr.length > 0){
                let temp = randomFromArray(takeUrgancyArr).correspondingSquare;
                this.updateByMyMove(temp);
                return temp// randomFromArray(takeUrgancyArr).correspondingSquare;
            }else{
                let temp = randomFromArray(unblockedArr).correspondingSquare;
                this.updateByMyMove(temp);
                return temp//randomFromArray(unblockedArr).correspondingSquare;
             
            }
        }
    }
    
}

class EasyAI extends NormalAI {
    constructor(board){
        super(board);
        this.oneFromWinCoef = 0.20
        this.oneFromLossCoef = 0.15;
        this.blockValCoef = 0.45;
        this.unblockedCoef = 0.60;
        this.urgancyCoef = 0.15;
        
    }
}

class HardAI extends AI {
    constructor(board){
        super(board);
        this.nextTurn = function(){//returns the next square
            let oneFromWinArr = [];
            let oneFromLossArr = [];

            let blockValArr = [];
            let currentBlockHigh = 0;

            let unblockedArr = [];
            let currrentUnblockedHigh = 0;

            for (let i = 0; i < this.board.length; i++){
                for (let j = 0; j < this.board.length; j++) {
                    if (this.AIBoard[i][j].taken){
                        continue;
                    }

                    if (this.AIBoard[i][j].oneFromWin){
                        oneFromWinArr.push(this.AIBoard[i][j])
                    }
                    if (this.AIBoard[i][j].oneFromLoss){
                        oneFromLossArr.push(this.AIBoard[i][j])
                    }


                    if (currentBlockHigh < this.AIBoard[i][j].blockValue){
                        currentBlockHigh = this.AIBoard[i][j].blockValue;
                        blockValArr = [this.AIBoard[i][j]];

                        currrentUnblockedHigh = this.AIBoard[i][j].unblockedRows;
                        unblockedArr = [this.AIBoard[i][j]];

                    }else if (currentBlockHigh == this.AIBoard[i][j].blockValue){
                        blockValArr.push(this.AIBoard[i][j]);

                        if (currrentUnblockedHigh < this.AIBoard[i][j].unblockedRows){
                            currrentUnblockedHigh = this.AIBoard[i][j].unblockedRows;
                            unblockedArr = [this.AIBoard[i][j]];
                        }else if (currrentUnblockedHigh == this.AIBoard[i][j].unblockedRows){
                            unblockedArr.push(this.AIBoard[i][j]);
                        }

                    }

                    
                }
            }

                
            

            if (oneFromWinArr.length > 0) {
                let temp = randomFromArray(oneFromWinArr).correspondingSquare;
                oneFromWinArr = [];
                this.updateByMyMove(temp);
                return temp //randomFromArray(oneFromWinArr).correspondingSquare;
            }

            if (oneFromLossArr.length > 0) {
                let temp = randomFromArray(oneFromLossArr).correspondingSquare;
                oneFromLossArr = [];
                this.updateByMyMove(temp);
                return temp //randomFromArray(oneFromLossArr).correspondingSquare;
            }

            let blockUrgancyHigh = 0;
            let takeUrgancyHigh = 0;
            let blockUrgancyArr = [];
            let takeUrgancyArr = [];


            for(let i = 0; i < unblockedArr.length; i++){
                let blockUrgancy = 0;
                let takeUrgancy = 0;

                for(let j = 0; j < 4; j++){
                    if(unblockedArr[i].rows[j] != undefined && unblockedArr[i].rows[j].myPresense == 0){
                        blockUrgancy += opponentPresense;
                    }

                    if(unblockedArr[i].rows[j] != undefined && unblockedArr[i].rows[j].opponentPresense == 0){
                        takeUrgancy += myPresense;
                    }
                }

                if (blockUrgancy > blockUrgancyHigh){
                    blockUrgancyHigh = blockUrgancy;
                    blockUrgancyArr = [unblockedArr[i]];
                }else if (blockUrgancy == blockUrgancyHigh){
                    blockUrgancyArr.push(unblockedArr[i]); 
                }

                if (takeUrgancy > takeUrgancyHigh){
                    takeUrgancyHigh = takeUrgancy;
                    takeUrgancyArr = [unblockedArr[i]];
                }else if (takeUrgancy == takeUrgancyHigh){
                    takeUrgancyArr.push(unblockedArr[i]); 
                }


            }

            if (blockUrgancyArr.length == 0 && takeUrgancyArr.length == 0 && unblockedArr.length == 0){
                console.log("error in ai logic");
            }

            if(blockUrgancyArr.length > 0){
                let temp = randomFromArray(blockUrgancyArr).correspondingSquare;
                this.updateByMyMove(temp);
                return temp //randomFromArray(blockUrgancyArr).correspondingSquare;
            }else if (takeUrgancyArr.length > 0){
                let temp = randomFromArray(takeUrgancyArr).correspondingSquare;
                this.updateByMyMove(temp);
                return temp// randomFromArray(takeUrgancyArr).correspondingSquare;
            }else{
                let temp = randomFromArray(unblockedArr).correspondingSquare;
                this.updateByMyMove(temp);
                return temp//randomFromArray(unblockedArr).correspondingSquare;
             
            }
        }
    }
}

function randomRoll(precent){
    if (Math.random() >= precent){
        return true;
    }
    return false;
}

function randomFromArray(arr){
    let rand = Math.round((Math.random() * (arr.length - 1)));
    return arr[rand];
}



class SquareValue {
    constructor(){
        this.rows; // should be treated as length 4, but can be shorter
        this.onMajorDiagonal;
        this.onMinorDiagonal;

        this.taken = false;
        this.oneFromWin = false;
        this.oneFromLoss = false;
        this.blockValue = 0; // how much of opponent's rows would taking this square block 
        this.unblockedRows = 2; //this sqare is on that many unblocked rows

    }
}

class RowValue {
    constructor(){
        this.opponentPresence = 0;
        this.myPresence = 0;
    }
}

function getRows(square, AIRows, AIBoard){
    let arr = [AIRows[0][square.x], AIRows[1][square.y]]
    if (AIBoard[square.x][square.y].onMajorDiagonal){
        arr[2] = AIRows[2][0];
    }

    if (AIBoard[square.x][square.y].onMinorDiagonal){
        arr[3] = AIRows[2][1];
    }
    return arr;
}




















