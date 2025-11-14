class PriceCalculator {
    constructor() {
        this.stack = []
        
    }

    PriceCalculator(grid, occupiedSeats) {
        occupiedSeats.forEach(occupiedSeat => {
            occupiedSeat.price *= 1.2;
            // Insert the seat back into the grid, at it's x and y coordinates
            grid.splice([occupiedSeat.x][occupiedSeat.y],0,occupiedSeat)
            occupiedSeats.remove(occupiedSeat)
        });

    }
}
