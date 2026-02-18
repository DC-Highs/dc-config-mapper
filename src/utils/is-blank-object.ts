export function isBlankObject<T extends Record<string, any>>(object: T) {
    return Object.keys(object).length === 0
}