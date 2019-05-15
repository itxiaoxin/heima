import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8899';

// 获取轮播图/推荐商品数据
export const getSwiperData = () => axios.get('/site/goods/gettopdata/goods');