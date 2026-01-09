export const numberToBoolean = (num: number) => {
    if ([0, 1].includes(num)) return num === 1
    throw new Error("Invalid number")
}