const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser'); //提取抽象语法树
const traverse = require('@babel/traverse').default; // 遍历语法书对象工具
const babel = require('@babel/core'); //提取抽象语法树

/**
 *分析模块,返回模块的依赖数组以及代码
 *
 * @param {*} filename
 * @returns filename,
        dependencies,
        code
 */
const moduleAnalyser = (filename) => {
    const content = fs.readFileSync(filename, 'utf-8');
    const ast = parser.parse(content, {
        sourceType: 'module'
    });
    const dependencies = {};
    traverse(ast, {
        ImportDeclaration({
            node
        }) {
            //console.log(node);
            const dirname = path.dirname(filename);
            const newFile =( './' + path.join(dirname, node.source.value)).replace('\\','/');
            dependencies[node.source.value] = newFile;

        }
    })
    const {
        code
    } = babel.transformFromAst(ast, null, {
        presets: ['@babel/preset-env']
    })
    return {
        filename,
        dependencies,
        code
    };

}
/**
 *做依赖分析,生成依赖图谱
 *
 * @param {*} entry
 */
const makeDependenciesGraph = (entry) => {
    const entryModule = moduleAnalyser(entry);
    // console.log(entryModule); 
    /**
     * 定义一个依赖的数组,初识值为入口文件,对这个数组进行循环,
     * 分析依赖的文件,分析完成装到依赖数组里,然后递归分析每个文件的依赖.返回依赖图谱
     * 
     *  */
    const graphArray = [entryModule];
    for (let i = 0; i < graphArray.length; i++) {

        const item = graphArray[i];
        const {
            dependencies
        } = item;
        //入口文件的依赖,根据依赖继续分析下一层拿到分析的数据装入依赖图谱
        //依赖是一个数组对象,所以循环下,根据数组再拿到每一个依赖对象的分析结果,
        if (dependencies) {
            for (let j in dependencies) {
                graphArray.push(
                    moduleAnalyser(dependencies[j])
                );
            }
        }

    }
    // console.log(graphArray);
    const graph = {};
    graphArray.forEach(item => {
        graph[item.filename] = {
            dependencies: item.dependencies,
            code: item.code
        }
    })
    // console.log(graph);
    return graph;

}

/**
 * 根据依赖图谱,最终生成的可执行的代码
 */

const generateCode = (entry) => {
    // console.log(makeDependenciesGraph(entry));
    const graph = JSON.stringify(makeDependenciesGraph(entry));
    // console.log(graph);
    return `
    (function(graph){
        function require(module){
            console.log(graph);
            function localRequire(relativePath){
                return require(graph[module].dependencies[relativePath]);
            }
            var exports={};
            (function(require,exports,code){
                eval(code);
            })(localRequire,exports,graph[module].code);
            return exports;
        }
        require('${entry}');
    })(${graph})
    `;

}
const code = generateCode('./src/index.js');
console.log(code);