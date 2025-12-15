
class Booker {
    constructor(plane) {
        this.plane = plane;
    }

    // Kan eventuelt snakke om noget optimering her: //Add other painpoints/preferances
    bookSeats(passengerList, availableSeats) {
        passengerList.forEach(passenger => {

            // Save current best seat.
            let currentBestSeat;
            let bestSeatIndex;


            //Check first if available seatType and price matches - Else check just for price. 
            //Check for price AND preferance AND class
            for (let i = 0; i < availableSeats.length; i++) {
                //Check price
                if (availableSeats[i].price <= passenger.painPoint) {
                    currentBestSeat = availableSeats[i]
                    bestSeatIndex = i
                    //Check price and preference
                    if (passenger.preference == availableSeats[i].seatType) {
                        currentBestSeat = availableSeats[i]
                        bestSeatIndex = i
                        //Check proice, preference and classPreference
                         if (availableSeats[i].seatClass == passenger.classPreference) {
                            currentBestSeat = availableSeats[i]
                            bestSeatIndex = i

                            //No need to keep looking.
                            break;
                    }
                }
            }
        }
        // Only book if we found a seat
        if (currentBestSeat && bestSeatIndex) {
            this.plane.bookSeat(currentBestSeat.y, currentBestSeat.x)
            availableSeats.splice(bestSeatIndex, 1);
        }
    });
}
    // work in progress - jonathan (skal det her overhovedet bruges?)
    priceChanger() {
        let seatToChange = this.plane.grid[startX][startY]
        if (currentSeat.isBooked == true) {
            this.seat.price * 1.5;
        }
    }

}