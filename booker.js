
class Booker {
    constructor(plane) {
        this.plane = plane;
    }

    // Kan eventuelt snakke om noget optimering her: //Add other painpoints/preferances
    bookSeats(passengerList, availableSeats) {
        passengerList.forEach(passenger => {

            //Check first if available seatType and price matches - Else check just for price. 
            //Check for price AND preferance AND class
            for (let i = 0; i < availableSeats.length; i++) {
                if (availableSeats[i].price <= passenger.painPoint && passenger.preference == availableSeats[i].seatType && availableSeats[i].seatClass == passenger.classPreference) {
                    this.plane.bookSeat(availableSeats[i].y, availableSeats[i].x)
                    availableSeats.splice(i, 1);
                    return;
                }
            }

            //Check for price AND type.
            for (let i = 0; i < availableSeats.length; i++) {
                if (availableSeats[i].price <= passenger.painPoint && availableSeats[i].seatType == passenger.preference) {
                    this.plane.bookSeat(availableSeats[i].y, availableSeats[i].x)
                    availableSeats.splice(i, 1);

                    return;
                }
            }

            // Check for type AND class.
            for (let i = 0; i < availableSeats.length; i++) {
                if (availableSeats[i].seatType <= passenger.preference && availableSeats[i].seatClass == passenger.classPreference) {
                    this.plane.bookSeat(availableSeats[i].y, availableSeats[i].x)
                    availableSeats.splice(i, 1);

                    return;
                }
            }

            // Check only for price.
            for (let i = 0; i < availableSeats.length; i++) {
                if (availableSeats[i].price <= passenger.painPoint) {
                    this.plane.bookSeat(availableSeats[i].y, availableSeats[i].x)
                    availableSeats.splice(i, 1);

                    return;
                }
            }
        });
        ;

    }
    // work in progress - jonathan (skal det her overhovedet bruges?)
    priceChanger() {
        let seatToChange = this.plane.grid[startX][startY]
        if (currentSeat.isBooked == true) {
            this.seat.price * 1.5;
        }
    }

}