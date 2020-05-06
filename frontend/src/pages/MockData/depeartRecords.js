
import { makeItems } from './utils.js'

const item = {
    "id": 1,
    "name": "财团wd配送中心001",
}

export const res = {
    "msg": "执行成功!",
    "traceID": "dc0f232f-00d8-43cc-98fa-1cd90bd8f7d3",
    "code": "000",
    "data": {
        "records": [
            {
                "id": '1',
                "name": "财团wd配送中心001",
            },
            {
                "id": '2',
                "name": "财团wd配送中心002",
            },
            // ...makeItems(item, 5)
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