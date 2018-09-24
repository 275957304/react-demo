
import { get, post} from '../aios'


export const user = () => await get('/user/info')
export const list = (pageNo) => await post('/xxxx/list', { pageNo: pageNo })