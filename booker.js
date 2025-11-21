

const returnsTrue25Percent = () => {
    return Math.random() < 0.25;
};



class Booker {
    constructor(plane, seat) {
        this.plane = plane;
        this.seat = seat;
    }



    bookSeat() {
        let startX = 0;
        let startY = 0;
        let stack = [];
        let currentSeat = this.plane.grid[startX][startY]

        while (currentSeat != null) {
            //Check if already booked or an Aisle
            if (currentSeat.isBooked == true || currentSeat == Aisle) {
                
            }

        }
    }
    // work in progress - jonathan (skal det her overhovedet bruges?)
    priceChanger() {
        let seatToChange = this.plane.grid[startX][startY]
        if (currentSeat.isBooked == true) {
            this.seat.price * 1.5;
        }
    }
    
}

