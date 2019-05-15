import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../src/styles/index.css';


// 引入fastclick,消除移动端的点击事件延迟
import FastClick from 'fastclick';
FastClick.attach(document.body);

ReactDOM.render(<App />, document.getElementById('root'));


