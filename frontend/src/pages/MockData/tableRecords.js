

const item = {
    "id": 460,
    "productionLineNo": "CX000002",
    "productionLineName": "pl002",
    "allotId": 26500485,
    "allotName": "wd大车间01",
    "productionLineStatus": 1,
    "productionLineDescription": "",
    "distributionId": 26500481,
    "distributionName": "wd配送中心04",
    "groupId": 953,
    "action": 1,
    "actionBy": "文丹丹",
    "actionTime": 20200116170411,
    "createBy": "文丹丹",
    "createTime": 20200116170411,
    "responsiblePersonId": 0,
    "responsiblePersonName": null
}
const makeItems = (count) => {
    const newItems = []
    for(let i = 0; i < count; i++){
        newItems.push(Object.assign({...item}, {id: i}))
    }
    return newItems
}
export const res = {
    "msg": "执行成功!",
    "traceID": "dc0f232f-00d8-43cc-98fa-1cd90bd8f7d3",
    "code": "000",
    "data": {
        "records": [
            {
                "id": 460,
                "productionLineNo": "CX000002",
                "productionLineName": "pl002",
                "allotId": 26500485,
                "allotName": "wd大车间01",
                "productionLineStatus": 1,
                "productionLineDescription": "",
                "distributionId": 26500481,
                "distributionName": "wd配送中心04",
                "groupId": 953,
                "action": 1,
                "actionBy": "文丹丹",
                "actionTime": 20200116170411,
                "createBy": "文丹丹",
                "createTime": 20200116170411,
                "responsiblePersonId": 0,
                "responsiblePersonName": null
            },
            {
                "id": 459,
                "productionLineNo": "CX000001",
                "productionLineName": "pl001",
                "allotId": 26500485,
                "allotName": "wd大车间01",
                "productionLineStatus": 1,
                "productionLineDescription": "",
                "distributionId": 26500481,
                "distributionName": "wd配送中心04",
                "groupId": 953,
                "action": 1,
                "actionBy": "文丹丹",
                "actionTime": 20200116170401,
                "createBy": "文丹丹",
                "createTime": 20200116170401,
                "responsiblePersonId": 0,
                "responsiblePersonName": null
            },
            ...makeItems(5)
        ],
        "pageInfo": {
            "total": 2,
            "pages": 1,
            "pageSize": 20,
            "pageNum": 1
        }
    },
    "success": true
}