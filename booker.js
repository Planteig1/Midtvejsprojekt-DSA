

const returnsTrue25Percent = () => {
    return Math.random() < 0.25;
};



class Booker {
    constructor(plane) {
        this.plane = plane;
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
    
}