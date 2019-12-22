import { getRequest, postRequest } from './request'
export default {
    $$path: {
        aa: 'xxxxxxxxxx/xxxxxxxxxxx',
        bb: 'yyyyyyy/yyyyyyyyyyyyyy'
    },
    getAa(params) {
        return getRequest(this.$$path.aa, params)
    },
    setBb(params) {
        return postRequest(this.$$path.bb, params)
    }
}