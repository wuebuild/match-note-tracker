export const setValue = (value: any, options : any[]) => {
    if (!value) { return null }
    value = value.toString()
    return options.find( item => {
        return item.value == value
    }) || { label: value, value: value.toLowerCase() }
}