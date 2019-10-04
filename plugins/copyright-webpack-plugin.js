class CoyprightWebpackPlugin{
    constructor(){
       console.log( "这是一个插件");
    }
    // webpack编译器实例compiler(存放配置内容)
    apply(compiler){

        compiler.hooks.compile.tap('CoyprightWebpackPlugin',(compilation)=>{
            console.log('---同步钩子---');
        });
        //  tapAsync 接收两个参数,一个插件名称,一个回调函数, compilation(这次打包的相关内容)cb回调函数
        compiler.hooks.emit.tapAsync('CoyprightWebpackPlugin',(compilation,cb)=>{
           debugger;
            console.log('---异步钩子---');
            console.log(compilation.assets);
            compilation.assets['copyright.txt']={
                source: function(){
                    return 'copyright by m';
                },
                size: function(){
                    return 20;
                }
            }
            cb();
        })
    }
}
module.exports =CoyprightWebpackPlugin;