
export const useProgressValue = (goal: number, current: number) => {
    const result = (current / goal) * 100

    return result

}
