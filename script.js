// Initialize plane, booker and passengers
let plane = new Plane(12, 20)
plane.InitializeGrid()

let booker = new Booker(plane)
let passengerFactory = new PassengerFactory();
renderSeatsHTML();

let runSimulationButton = document.getElementById("startSimulation")

runSimulationButton.addEventListener("click", () => {

    let iterations = parseInt(document.getElementById("iterations").value);
    let passengerCount = parseInt(document.getElementById("passengerCount").value);
    let budgetChangeInput = parseInt(document.getElementById("budgetChangeInput").value);
    let startingMoneyInput = parseInt(document.getElementById("startingMoneyInput").value);

    
    runSimulation(
        iterations,
        passengerFactory,
        booker,
        plane,
        passengerCount,
        startingMoneyInput,
        budgetChangeInput
    );
    
});

// Run simulations
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runSimulation(iterations, passengerFactory, booker,plane,passengerCount,startingMoneyInput,budgetChangeInput) {
    for (let i = 0; i < iterations; i++) {
        console.log(i + 1)
        console.log(plane.getSeat(0,1).price)
        //Create passengers
        let passengerList = passengerFactory.createPassengers(passengerCount,startingMoneyInput,budgetChangeInput)

        //Run the booker
        booker.bookSeats(passengerList, plane.getAvailableSeats())

        //Reset the seats and update prices
        plane.seatResetter()

        renderSeatsHTML();
        displayProfit();

        await wait(1000)
    }
}

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

/* THIS IS THE START OF THE AI GENERATED CODE FOR VISUALISATION*/
function getPriceColor(seatPriceInput,) {
    let min = 0
    let max = 1000
    // Prevent division by zero if all prices are the same
    if (max === min) return `hsl(120, 100%, 50%)`;

    // Normalize to 0-1
    let percentage = (seatPriceInput - min) / (max - min);

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

// ===== PROFIT CALCULATOR =====
// Sum of all positive price increases on seats
function calculateTotalProfit() {
    let totalProfit = 0;

    for (const row of plane.grid) {
        for (const seat of row) {
            // Skip aisles, they are not Seat instances
            if (seat instanceof Seat) {
                const increase = seat.price - seat.basePrice;
                if (increase > 0) {
                    totalProfit += increase;
                }
            }
        }
    }

    return totalProfit;
}

// Update the profit text on the page
function displayProfit() {
    const profit = calculateTotalProfit();
    const profitElement = document.getElementById("profitDisplay");
    if (profitElement) {
        profitElement.textContent = profit;
    }
}

/* THIS IS THE END OF THE AI GENERATED CODE FOR VISUALISATION*/




