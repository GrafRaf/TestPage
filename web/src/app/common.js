require("babel/polyfill");
//require('stylus!css!../css/index.stylus');
//require("file!../templates/index.jade");

var template = require("jade!../templates/index.jade");
Document.write(template);