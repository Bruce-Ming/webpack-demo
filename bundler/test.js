(function (graph) {
    function require(module) {
        console.log(graph);

        function localRequire(relativePath) {
            return require(graph[module].dependencies[relativePath]);
        }
        var exports = {};
        (function (require, exports, code) {
            eval(code);
        })(localRequire, exports, graph[module].code);
        return exports;
    }
    require('./src/index.js');
})({
    "./src/index.js": {
        "dependencies": {
            "./message.js": "./src/message.js"
        },
        "code": "\"use strict\";\n\nvar _message = _interopRequireDefault(require(\"./message.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log(_message[\"default\"]);"
    },
    "./src/message.js": {
        "dependencies": {
            "./hello.js": "./src/hello.js"
        },
        "code": "\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _hello = _interopRequireDefault(require(\"./hello.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nvar message = \"say \".concat(_hello[\"default\"], \" word\");\nvar _default = message;\nexports[\"default\"] = _default;"
    },
    "./src/hello.js": {
        "dependencies": {},
        "code": "\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\nvar hello = 'hello';\nvar _default = hello;\nexports[\"default\"] = _default;"
    }
})