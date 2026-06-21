export interface IProduct {
    product: {
        title: string,
        price: string,
        description: string,
        button: {
            active: string,
            inActive: string
        },
    },
    stock: number,
    onHandle?: () => void
}