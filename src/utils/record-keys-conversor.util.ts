

import pluralize from "pluralize"

export type RecordKeysConversorReplaceOptions = {
    oldString: string
    newString: string,
    object: Record<string, any>
}

export const recordKeysConversor = {
    toLowerCase(object: Record<string, any>): Record<string, any> {
        return Object.fromEntries(
            Object.entries(object).map(([key, value]) => [key.toLowerCase(), value])
        )
    },    
    toPlural(object: Record<string, any>): Record<string, any> {
        return Object.fromEntries(
            Object.entries(object).map(([key, value]) => [pluralize(key), value])
        )
    },
    replace({
        newString,
        oldString,
        object
    }: RecordKeysConversorReplaceOptions): Record<string, any> {
        return Object.fromEntries(
            Object.entries(object).map(([key, value]) => [key.replace(oldString, newString), value])
        )
    },
}