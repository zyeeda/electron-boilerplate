/* @flow */
require("!style!css!sass!./src/common/main.scss");
var React = require('react');
var MainDiv = require('./src/sample/react/sample-react.jsx');
var es6 = require('./src/sample/es6/sample-es6.js');
var flow = require('./src/sample/flow/sample-flow.jsx');
var MainDiv = require('./src/sample/react/sample-react.jsx');


React.render(
  <MainDiv name="World" />,  document.getElementById('container')
);
