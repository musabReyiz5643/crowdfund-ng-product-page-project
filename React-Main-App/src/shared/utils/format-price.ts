export const formatPrice = (amount: number | undefined) => {

    if (!amount) return 0

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(amount)
}
