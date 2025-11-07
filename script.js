class Seat {
     constructor(x, y, seatClass, seatType) {
        this.x = x;
        this.y = y;

        this.seatClass = seatClass;
        this.seatType = seatType;

        this.price = 100
    }}

class Aisle {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

class Plane {
    constructor(cols, rows) {
        this.grid = [];
        this.cols = cols;
        this.rows = rows;
    }


    InitializeGrid() {
        for (let i = 0; i < this.rows; i += 1) {
            let seatClass = "Economy"
            let seatType = ""
            this.grid.push([]);
            for (let j = 0; j < this.cols; j += 1) {
                //Check for aisle
                if (j == 3 || j == 8) {
                    this.grid[i].push(new Aisle(i,j))
                } else {
                //Check for seat type
                //Window seat
                if (j == 0 || j == 11) {
                    seatType = "Window"
                }
                ///Middle seat
                if (j == 1 || j == 5 || j == 6 || j == 10) {
                    seatType = "Middle"
                }
                // Aisle seat
                if (j == 2 || j == 4 || j == 7 || j == 9 ) {
                    seatType = "Aisle"
                }
                //Check for first class
                if (i < 5) {
                    seatClass = "First-class"
                }
                this.grid[i].push(new Seat(i,j,seatClass,seatType))
                }

            }
        }
    }
}
let plane = new Plane(12, 20)
plane.InitializeGrid()
console.log(plane.grid)


