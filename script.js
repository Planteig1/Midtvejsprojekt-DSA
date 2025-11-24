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


let plane = new Plane(12, 20)
plane.InitializeGrid()


let booker = new Booker(plane)
let passengerFactory = new PassengerFactory();

// Run simulations

     function runSimulation(iterations, passengerFactory, booker,plane) {

        for (let i = 0; i < iterations; i++) {

            console.log(`iteration: ${i}`)
            //Create passengers
            let passengerList = passengerFactory.createPassengers(200)
            
            //Run the booker
            booker.bookSeats(passengerList, plane.getAvailableSeats())

            //Reset the seats and update prices
            plane.seatResetter()

            console.log(plane.getSeat(0,0).price)
        }
    }
    
runSimulation(30, passengerFactory, booker, plane)






// plane.priceChanger(plane.getSeat(0, 1)); --- Works, commented out for testing
console.log(plane.getSeat(0, 1));

// function for displaying on html
function displaySeatPrice() {
    let seatToChange = plane.getSeat(0, 1); // Hardcoded for example
    plane.bookSeat(seatToChange); // Ensure the seat is booked for priceChanger to work
    plane.priceChanger(seatToChange);

    const displayedPriceElement = document.getElementById("displayedPrice");
    if (displayedPriceElement) {
        displayedPriceElement.textContent = seatToChange.price;
    }
}
/*




// work in progress - pseudo code to get a general understanding of what is supposed to happen
// code works - now we need to make it so it scales when we instantiate many passengers 
function passengerSeatChecker(x, y) {
    const thisX = x;
    const thisY = y;
    const seat = plane.getSeat(x, y);
    const responses = [];

    for (let i = 0; i < passengerList.length; i++) {
        const passenger = passengerList[i];
        const passengerCount = i + 1;

        if (seat.price > passenger.painPoint || seat.seatType != passenger.preference || seat.isBooked == true) {
            responses.push(`The seat, seat (${thisX}, ${thisY}), could not be booked for passenger ${passengerCount}`);

        } else if (seat.price <= passenger.painPoint && seat.seatType == passenger.preference && seat.isBooked == false) {
            plane.bookSeat(plane.getSeat(x, y));
            responses.push(`The seat, seat (${thisX}, ${thisY}), is now booked to passenger ${passengerCount}`);

        }

    }
    console.log(responses);


}
    */
// passengerSeatChecker(1, 0)

// ====== SEAT GRID RENDERING ======

/* THE FOLLOWING CODE IS AI GENERATED USING CHATGPT*/
function renderSeatGrid() {
    const seatGrid = document.getElementById("seat-grid");
    if (!seatGrid) return;

    // Clear any existing content
    seatGrid.innerHTML = "";

    for (let row = 0; row < plane.rows; row++) {
        for (let col = 0; col < plane.cols; col++) {
            const cellData = plane.grid[row][col];
            const cell = document.createElement("div");

            if (cellData instanceof Seat) {
                cell.classList.add("seat");

                // Class-based colouring
                if (cellData.seatClass === "First-class") {
                    cell.classList.add("first-class");
                } else {
                    cell.classList.add("economy");
                }

                // Booked state
                if (cellData.isBooked) {
                    cell.classList.add("booked");
                }

                // For later reference
                cell.dataset.row = row;
                cell.dataset.col = col;

                // Tooltip
                cell.title = `${cellData.seatClass} ${cellData.seatType} – ${cellData.price} kr`;

                // Click to toggle booking & update price
                cell.addEventListener("click", () => {
                    // Your bookSeat takes (y, x) = (row, col)
                    plane.bookSeat(row, col);

                    const updatedSeat = plane.grid[row][col];
                    updateSeatCell(cell, updatedSeat);

                    // Also update the price display on the page
                    const displayedPriceElement = document.getElementById("displayedPrice");
                    if (displayedPriceElement) {
                        displayedPriceElement.textContent = updatedSeat.price;
                    }
                });
            } else if (cellData instanceof Aisle) {
                // Aisle cell
                cell.classList.add("aisle");
            }

            seatGrid.appendChild(cell);
        }
    }
}

function updateSeatCell(cell, seat) {
    if (!(seat instanceof Seat)) return;

    if (seat.isBooked) {
        cell.classList.add("booked");
    } else {
        cell.classList.remove("booked");
    }

    cell.title = `${seat.seatClass} ${seat.seatType} – ${seat.price} kr`;
}

// Call this once after the plane has been initialized and passengers booked
renderSeatGrid();
/* THIS IS THE END OF THE AI GENERATED CODE*/


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const img = document.getElementById("plane");
ctx.fillStyle = "white";
// ctx.fillRect(0,0,900,900);
ctx.drawImage(img, 0, 0);


