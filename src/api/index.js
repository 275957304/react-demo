
import { request } from './axios'

// 获取商品信息
export const getShopList = () =>request({method: 'post', url: 'shop.php?do=index'})
// 获取我的礼包
export const getMyList = () => request({method: 'post', url: 'shop.php?do=myPrize'})
// 购买商品
export const buyShop = (id) => request({method: 'post', url: 'shop.php?do=exchange', data: { id: id }})
