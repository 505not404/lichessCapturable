let direction = 
{
    south: {x: 0, y: 1},
    west: {x: -1, y: 0},
    north: {x: 0, y: -1}, 
    east: {x: 1, y: 0},
    southeast: {x: 1, y: 1}, 
    northeast: {x: 1, y: -1}, 
    northwest: {x: -1, y: -1}, 
    southwest: {x: -1, y: 1}
}

class Piece
{
    constructor(xCoor, yCoor, color)
    {
        if(this.constructor == Piece)
        {
            throw new Error("Class is of abstract type and can't be instantiated"); 
        }
        this.xCoor = xCoor; 
        this.yCoor = yCoor; 
        this.color = color; 
    }

    insideBoard(x, y, boardDimension)
    {
        return(x < boardDimension && y < boardDimension && x >= 0 && y >= 0); 
    }

    getColor()
    {
        return this.color; 
    }

    markCapturable(directionList)
    {
        for(let i = 0; i < directionList.length; i++)
        {
            let j = this.xCoor;
            let k = this.yCoor; 
            while(this.insideBoard(j + directionList[i].x, k + directionList[i].y, 8))
            {
                j += directionList[i].x; 
                k += directionList[i].y; 
                if(boardState[j][k] instanceof Piece)
                {
                    if(this.color != boardState[j][k].getColor())
                    {
                        capturableBoard[j][k] = "."; 
                    }
                    break; 
                }
            }
        }
    }
}


class Rook extends Piece
{
    directionList = [direction.east, direction.south, direction.west, direction.north]; 
    constructor(xCoor, yCoor, color)
    {
        super(xCoor, yCoor, color); 
    }
    markCapturable()
    {
        super.markCapturable(this.directionList); 
    }
}


class Bishop extends Piece
{
    directionList = [direction.southeast, direction.southwest, direction.northeast, direction.northwest]; 
    constructor(xCoor, yCoor, color)
    {
        super(xCoor, yCoor, color); 
    }
    markCapturable()
    {
        super.markCapturable(this.directionList); 
    }
}

class Queen extends Piece
{
    directionList = [direction.southeast, direction.southwest, direction.northeast, direction.northwest, 
        direction.east, direction.south, direction.west, direction.north
    ]; 
    constructor(xCoor, yCoor, color)
    {
        super(xCoor, yCoor, color); 
    }

    markCapturable()
    {
        super.markCapturable(this.directionList); 
    }
}

class Pawn extends Piece
{
    directionList = []; 
    constructor(xCoor, yCoor, color)
    {
        super(xCoor, yCoor, color); 
        this.setDirectionList(); 
    }

    getOrientation()
    {
        let cgWrap = document.getElementsByClassName("cg-wrap")[0]; 
        let lichessOrientation = (cgWrap.classList[2]);
        let orientation; 

        if(lichessOrientation == "orientation-black")orientation = "black";
        else orientation = "white"; 
        return orientation; 
    }

    setDirectionList()
    {
        if(this.getOrientation() == this.color)
        {
            this.directionList.push(direction.northeast); 
            this.directionList.push(direction.northwest);
        }
        else
        {
            this.directionList.push(direction.southeast); 
            this.directionList.push(direction.southwest); 
        }
    }

    markCapturable()
    { 
        for(let i = 0; i < this.directionList.length; i++)
        {
            let j = this.xCoor + this.directionList[i].x; 
            let k = this.yCoor + this.directionList[i].y; 
            // console.log(j); 
            // console.log(k); 
            if(this.insideBoard(j, k, 8))
            { 
                if(boardState[j][k] instanceof Piece)
                {
                    if(this.color != boardState[j][k].getColor())capturableBoard[j][k] = "."; 
                }
            }
        }
    }
}

class Knight extends Piece
{
    constructor(xCoor, yCoor, color)
    {
        super(xCoor, yCoor, color); 
    }

    markCapturable()
    { 
        console.log("knight works"); 
        let vertical = [direction.south, direction.north]; 
        let horizontal = [direction.east, direction.west]; 
        for(let i = 0; i < vertical.length; i++)
        {
            for(let j = 0; j < horizontal.length; j++)
            {
                let nowX1 = this.xCoor + horizontal[j].x * 2 + vertical[i].x; 
                let nowY1 = this.yCoor + horizontal[j].y + vertical[i].y; 
                if(this.insideBoard(nowX1, nowY1, 8))
                { 
                    if(boardState[nowX1][nowY1] instanceof Piece)
                    {
                        if(this.color != boardState[nowX1][nowY1].getColor())capturableBoard[nowX1][nowY1] = "."; 
                    }
                }

                let nowX2 = this.xCoor + horizontal[j].x + vertical[i].x; 
                let nowY2 = this.yCoor + horizontal[j].y + vertical[i].y * 2; 
                if(this.insideBoard(nowX2, nowY2, 8))
                { 
                    if(boardState[nowX2][nowY2] instanceof Piece)
                    {
                        if(this.color != boardState[nowX2][nowY2].getColor())capturableBoard[nowX2][nowY2] = "."; 
                    }
                }
            }
        }
    }
}