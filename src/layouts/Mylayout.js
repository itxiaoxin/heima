import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';

class Mylayout extends Component {
  render() {
    return (
      <div style={{height:'100%'}}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
        >
          <TabBar.Item
            title="首页"
            key="home"
            icon={<i className='iconfont icon-shouye'></i>}
            selectedIcon={<i className='iconfont icon-shouye'></i>}
            selected={this.props.location.pathname==='/'}
            onPress={() => {this.props.history.push('/') }}
          >
          {this.props.children}
          </TabBar.Item>
          
          <TabBar.Item
            title="购物车"
            key="cart"
            badge={1}
            icon={<i className='iconfont icon-gouwuche'></i>}
            selectedIcon={<i className='iconfont icon-gouwuche'></i>}
            selected={this.props.location.pathname==='/cart'}
            onPress={() => { this.props.history.push('/cart')  }}
          >
            {this.props.children}
          </TabBar.Item>

          <TabBar.Item
            title="我的"
            key="mine"
            icon={<i className='iconfont icon-wode'></i>}
            selectedIcon={<i className='iconfont icon-wode'></i>}
            selected={this.props.location.pathname==='/mine'}
            onPress={() => {this.props.history.push('/mine') }}
          >
            {this.props.children}
          </TabBar.Item>
        </TabBar>
      </div>
    )
  }
}


export default Mylayout;