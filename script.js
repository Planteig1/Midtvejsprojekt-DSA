let plane = new Plane(12, 20)
plane.InitializeGrid()


let booker = new Booker(plane)
let passengerFactory = new PassengerFactory();

// Run simulations
async function runSimulation(iterations, passengerFactory, booker,plane) {
    for (let i = 0; i < iterations; i++) {

        //Create passengers
        let passengerList = passengerFactory.createPassengers(100)
            
        //Run the booker
        booker.bookSeats(passengerList, plane.getAvailableSeats())

        //Reset the seats and update prices
        plane.seatResetter()

        renderSeatGrid()

        await wait(2000)
        }
    }

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
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
function getPriceColor(price, min, max) {
    // Prevent division by zero if all prices are the same
    if (max === min) return `hsl(120, 100%, 50%)`; 

    // Normalize to 0-1
    let percentage = (price - min) / (max - min);
    
    // Clamp
    percentage = Math.max(0, Math.min(1, percentage));

    // Map 0->Green (120), 1->Red (0)
    const hue = (1 - percentage) * 120;
    
    return `hsl(${hue}, 100%, 40%)`; // 40% lightness makes text easier to read
}

function renderSeatGrid() {
    const seatGrid = document.getElementById("seat-grid");
    if (!seatGrid) return;

    seatGrid.innerHTML = "";

    // --- NEW: Calculate dynamic range for the color gradient ---
    // We flatten the grid to find the global Min and Max price of seats
    const allSeats = plane.grid.flat().filter(cell => cell instanceof Seat);

    const maxPrice = 1200;
    const minPrice = 100;
    // -----------------------------------------------------------

    for (let row = 0; row < plane.rows; row++) {
        for (let col = 0; col < plane.cols; col++) {
            const cellData = plane.grid[row][col];
            const cell = document.createElement("div");

            if (cellData instanceof Seat) {
                cell.classList.add("seat");

                // Standard CSS Classes
                if (cellData.seatClass === "First-class") {
                    cell.classList.add("first-class");
                } else {
                    cell.classList.add("economy");
                }

                // --- NEW: Apply Color Gradient ---
                // Only apply the color if the seat is NOT booked. 
                // If it is booked, we let the CSS .booked class handle the color (usually grey/red).
                if (cellData.isBooked) {
                    cell.classList.add("booked");
                    // Note: CSS for .booked should utilize !important or be loaded last 
                    // to ensure it overrides the gradient if you applied it here.
                } else {
                    // Apply the calculated HSL color directly to the element
                    cell.style.backgroundColor = getPriceColor(cellData.price, minPrice, maxPrice);
                }
                // ---------------------------------

                cell.dataset.row = row;
                cell.dataset.col = col;
                
                // Updated Tooltip to show range context
                cell.title = `${cellData.seatClass} – ${cellData.price.toFixed(2)} kr`;

                cell.addEventListener("click", () => {
                    plane.bookSeat(row, col);
                    
                    // NOTE: You need to make sure updateSeatCell also knows how 
                    // to re-calculate the color, or just call renderSeatGrid() again.
                    renderSeatGrid(); 
                    
                    const updatedSeat = plane.grid[row][col];
                    const displayedPriceElement = document.getElementById("displayedPrice");
                    if (displayedPriceElement) {
                        displayedPriceElement.textContent = updatedSeat.price;
                    }
                });
            } else if (cellData instanceof Aisle) {
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

/* THIS IS THE END OF THE AI GENERATED CODE*/


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const img = document.getElementById("plane");
ctx.fillStyle = "white";
// ctx.fillRect(0,0,900,900);
ctx.drawImage(img, 0, 0);


