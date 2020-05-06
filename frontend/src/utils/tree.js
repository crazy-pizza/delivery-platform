export function formatTreeWthTitleAndKey(records, options = {
    key: 'orgID',
    title: 'orgName',
    children: 'childs',
    isLeaf: 'hasChildOrg',
}) {
    return records.map((record) => {
        Object.keys(options).forEach(treeProperty => {
            const replaceProperty = options[treeProperty]
            if (treeProperty === 'isLeaf') {
                (Number(record[replaceProperty]) > 0) ? (record[treeProperty] = false) : (record[treeProperty] = true)
            } else {
                record[treeProperty] = record[replaceProperty]
            }
            if(record.children){
                formatTreeWthTitleAndKey(record.children, options)
            }
        })
        return record
    })
}