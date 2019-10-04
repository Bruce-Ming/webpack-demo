import "@babel/polyfill";
import tp from './test.jpg'
import './index.scss';
import './index.css'

var img = new Image();
img.src = tp;
img.classList.add('box');
var root = document.getElementById('app');
root.append(img);
console.log("zhang啊哈哈!!!");
var btn = document.createElement('button')
btn.innerHTML = '新增';
document.body.appendChild(btn)
btn.onclick = function () {
    var div = document.createElement('div')
    div.innerHTML = "item";
    document.body.appendChild(div);
}

if (module.hot) {
    // module.hot.accept( '模块地址', () => {
    // 热更新逻辑,css已经自己实现,vue和react也已经实现,
    // })
}