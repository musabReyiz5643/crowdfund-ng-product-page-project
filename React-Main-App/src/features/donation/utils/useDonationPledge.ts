
export const useDonationPledgeStock = (stock: number) => {
    const isInStock = stock > 0
    return { isInStock }
}