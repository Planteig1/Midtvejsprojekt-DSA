
class Booker {
    constructor(plane, seat) {
        this.plane = plane;
        this.seat = seat;
    }

    // Kan eventuelt snakke om noget optimering her: //Add other painpoints/preferances
    bookSeats(passengerList, availableSeats) {
        passengerList.forEach(passenger => {
            for (let i = 0; i < availableSeats.length; i++) {
                if (availableSeats[i].price <= passenger.painPoint) {
                    this.plane.bookSeat(availableSeats[i].y,availableSeats[i].x)
                    availableSeats.splice(i,1);
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