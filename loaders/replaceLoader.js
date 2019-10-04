const loaderUils =require('loader-utils'); // options 分析工具

module.exports = function (source) {
    console.log(this.query);
    const options= loaderUils.getOptions(this);
    console.log('name:'+options.name);
    return source.replace('zhang','ming');
    // 插件就是一个函数,拿到源码,做一些操作,再返回源码,但是函数不能用箭头函数
    // 因为有时候会用this对象,有指向问题.获取传参this.query
    //loader api 也分同步异步
}