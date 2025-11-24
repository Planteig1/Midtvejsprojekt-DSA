// Initialize plane, booker and passengers
let plane = new Plane(12, 20)
plane.InitializeGrid()

let booker = new Booker(plane)
let passengerFactory = new PassengerFactory();

let runSimulationButton = document.getElementById("startSimulation")

// FIX: read values only when button clicked
runSimulationButton.addEventListener("click", () => {

    let iterations = parseInt(document.getElementById("iterations").value);
    let passengerCount = parseInt(document.getElementById("passengerCount").value);
    let seatPriceInput = parseInt(document.getElementById("seatPriceInput").value);
    let budgetChangeInput = parseInt(document.getElementById("budgetChangeInput").value);
    let startingMoneyInput = parseInt(document.getElementById("startingMoneyInput").value);

    // Call your simulation function with the updated values
    runSimulation(
        iterations,
        passengerFactory,
        booker,
        plane
    );
});


// Run simulations

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runSimulation(iterations, passengerFactory, booker,plane) {
    for (let i = 0; i < iterations; i++) {

        //Create passengers
        let passengerList = passengerFactory.createPassengers(100)

        //Run the booker
        booker.bookSeats(passengerList, plane.getAvailableSeats())

        //Reset the seats and update prices
        plane.seatResetter()

        renderSeatsHTML();

        await wait(2000)
    }
}









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

/* THE FOLLOWING CODE IS AI GENERATED USING CHATGPT*/
// ====== SEAT GRID RENDERING ======


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

function renderSeatsHTML() {
    const container = document.getElementById("plane-container");
    container.innerHTML = "";

    for (let row = 0; row < plane.rows; row++) {
        for (let col = 0; col < plane.cols; col++) {

            const cell = plane.grid[row][col];
            if (!(cell instanceof Seat)) continue;

            const seat = document.createElement("div");
            seat.classList.add("seat");

            // Color based on price
            seat.style.backgroundColor = getPriceColor(cell.price);

            // Position inside plane
            const GRID_OFFSET_X = 360;   // move grid more to the right
            const GRID_OFFSET_Y = 40;   // vertical offset stays same

            const SEAT_SIZE = 23;        // bigger seats
            const SEAT_SPACING = 6;      // bigger padding

            seat.style.width = SEAT_SIZE  + "px";
            seat.style.height = SEAT_SIZE + 4 + "px";

            seat.style.left = (GRID_OFFSET_X + col * (SEAT_SIZE + SEAT_SPACING)) + "px";
            seat.style.top = (GRID_OFFSET_Y + row * (SEAT_SIZE + SEAT_SPACING)) + "px";

            container.appendChild(seat);
        }
    }
}



/* THIS IS THE END OF THE AI GENERATED CODE*/






