export const makeItems = (item, count) => {
    const newItems = []
    for(let i = 0; i < count; i++){
        newItems.push(Object.assign({...item}, {id: i}))
    }
    return newItems
}