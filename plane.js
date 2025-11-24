class Seat {
    constructor(x, y, seatClass, seatType) {
        this.x = x;
        this.y = y;

        this.seatClass = seatClass;
        this.seatType = seatType;

        this.price = 100;
        this.isBooked = false;
    }
}

class Aisle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Plane {
    constructor(cols, rows) {
        this.grid = [];
        this.cols = cols;
        this.rows = rows;
        this.occupiedSeats = [];
    }


    InitializeGrid() {
        for (let i = 0; i < this.rows; i += 1) {
            let seatClass = "Economy"
            let seatType = ""
            this.grid.push([]);
            for (let j = 0; j < this.cols; j += 1) {
                //Check for aisle
                if (j == 3 || j == 8) {
                    this.grid[i].push(new Aisle(j, i))
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
                    if (j == 2 || j == 4 || j == 7 || j == 9) {
                        seatType = "Aisle"
                    }
                    //Check for first class
                    if (i < 5) {
                        seatClass = "First-class"
                    }
                    this.grid[i].push(new Seat(j, i, seatClass, seatType))
                }

            }
        }
    }
    getSeat(x, y) {
        return this.grid[x][y]; // Handle if we try to look for something thats not a seat
    }
    bookSeat(y, x) {
        let curretSeat = this.grid[y][x]
        if (curretSeat.isBooked != true && curretSeat instanceof Seat) {
            curretSeat.isBooked = true;

        } else {
            console.log("Couldnt book seat");
        }
    }
    getAvailableSeats() {
        let availableSeats = [];
        for (const row of this.grid) {
            for (const seat of row) {
                if (seat.isBooked != true && seat instanceof Seat) {
                    availableSeats.push(seat)
                }
            }
        }
        return availableSeats
    }

    priceChanger(seat) {
        if (seat.isBooked == true) {
            seat.price = seat.price + 50;
            
            // console.log("Price of seat has been changed");

        } else if (seat.isBooked == false) {
            seat.price = seat.price - 50;
           //  console.log("Seat has not been booked");

        }

    }

    seatResetter() {
        for (const row of this.grid) {
            for (const seat of row) {
                if (seat.isBooked == true) {
                    plane.priceChanger(seat);
                    seat.isBooked = false;
                } else if (seat.isBooked == false) {
                    plane.priceChanger(seat);

                }
            }
        }

    }
}