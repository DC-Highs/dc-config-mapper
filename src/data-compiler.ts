import { isObject } from "lodash"
import pluralize from "pluralize"

export type DataCompilerOptions = {
    acceptedPrefixes?: string[]
    idsSuffix?: string
    idSuffix?: string
}

export type CompileOptions = {
    data: Record<string, any>
    context: Record<string, any>
}

export type CompileArrayOptions = {
    data: Record<string, any>[]
    context: Record<string, any>
}

type ProcessIdsSuffixOptions = {
    data: Record<string, any>
    key: string
    prefix: string
    context: Record<string, any>
}
type ProcessIdSuffixOptions = {
    data: Record<string, any>
    key: string
    prefix: string
    context: Record<string, any>
}

export class DataCompiler {
    private readonly acceptedPrefixes: string[]
    private readonly idsSuffix: string
    private readonly idSuffix: string

    public constructor({
        acceptedPrefixes,
        idsSuffix,
        idSuffix
    }: DataCompilerOptions = {}) {
        this.acceptedPrefixes = acceptedPrefixes ?? []
        this.idsSuffix = idsSuffix ?? "_ids"
        this.idSuffix = idSuffix ?? "_id"
    }

    private findMatchingPrefix(key: string): string {
        for (const acceptedPrefix of this.acceptedPrefixes) {
            if (key.startsWith(acceptedPrefix)) {
                return acceptedPrefix
            }
        }

        return ""
    }

    private processIdsSuffix({
        context,
        data,
        key,
        prefix
    }: ProcessIdsSuffixOptions) {
        const baseKey = key.slice(prefix.length).slice(0, -this.idsSuffix.length)
        const pluralizedKey = pluralize(baseKey)
    
        if (context[pluralizedKey]) {
            const relatedItems = context[pluralizedKey]
                .filter((item: any) => data[key].includes(item.id))
                .map((item: any) => isObject(item) ? this.compile({ data: item, context: context }) : item)
    
            data[`${prefix}${pluralizedKey}`] = relatedItems

            delete data[key]
        }
    }

    private processIdSuffix({
        context,
        data,
        key,
        prefix
    }: ProcessIdSuffixOptions) {
        const baseKey = key.slice(prefix.length).slice(0, -this.idSuffix.length)
        const pluralizedKey = pluralize(baseKey)
    
        if (context[pluralizedKey]) {
            const foundItem = context[pluralizedKey].find((item: any) => item.id === data[key])
    
            data[`${prefix}${baseKey}`] = foundItem ? this.compile({ data: foundItem, context: context }) : null
            delete data[key]
        }
    }

    private isArrayOfObjects(value: any): boolean {
        return Array.isArray(value) && value.every(item => isObject(item))
    }
    
    public compileMany({ data, context }: CompileArrayOptions) {
        return data.map(item => isObject(item) ? this.compile({ data: item, context: context }) : item)
    }    

    public compile({ data, context }: CompileOptions) {
        const dataCopy = {...data}

        try {
            for (const [key, value] of Object.entries(dataCopy)) {
                if (this.isArrayOfObjects(value)) {
                    data[key] = this.compileMany({ data: value, context: context })
                } else if (isObject(value)) {
                    data[key] = this.compile({ data: value, context: context })
                }

                const matchedPrefix = this.findMatchingPrefix(key)

                if (key.endsWith(this.idsSuffix)) {
                    this.processIdsSuffix({
                        data: data,
                        key: key,
                        prefix: matchedPrefix,
                        context: context
                    })
                } else if (key.endsWith(this.idSuffix)) {
                    this.processIdSuffix({
                        data: data,
                        key: key,
                        prefix: matchedPrefix,
                        context: context
                    })
                }
            }

            return data
        } catch (error) {
            console.error("Error while compiling data:", error)
            console.log("Data:", data)
            console.log("Data Copy:", dataCopy)
            process.exit(1)
        }
    }
}