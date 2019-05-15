import React, { Component } from 'react';
import { Carousel,List } from 'antd-mobile';
import { getSwiperData} from '../api';
const Item = List.Item;
const Brief = Item.Brief;

export class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imglist: [],
      imgHeight: 375,
    }
  }
  componentDidMount() {
    // 调用函数发送请求获取轮播图数据
    getSwiperData()
      .then(res => {
        this.setState({
        imglist:res.data.message.sliderlist
      })
    })
  }
  render() {
    return (
      <div>
        {/* 轮播图 */}
        <Carousel
          autoplay={true}
          infinite
        >
          {this.state.imglist.map(val => (
            <div
              key={val.id}
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={val.img_url}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </div>
          ))}
        </Carousel>
      
        {/* 推荐商品 */}
        <List renderHeader={() => '推荐商品'}>
          {this.state.imglist.map(val => (
            <Item
            key={val.id}
             thumb={val.img_url}           
            >{val.title}
            </Item>
          ))}
       
       
      </List>
      </div>
    )
  }
}

export default Home
