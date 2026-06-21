export interface DataType {
    header: {
        totalBacked: number,
        totalBackers: number,
        daysLeft: number
    },
    stands: {
        BambooStand: {
            stock: number
        },
        BlackEdition: {
            stock: number
        },
        MahoganyEdition: {
            stock: number
        }
    },
    mins: {
        BambooStand: number,
        BlackEdition: number,
        MahoganyEdition: number
    }
}