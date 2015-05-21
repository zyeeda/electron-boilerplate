/* @flow */
require("!style!css!sass!./src/common/main.scss");
var React = require('react');
var MainDiv = require('./src/sample/react/sample-react.js');

React.render(
  <MainDiv name="World" />,  document.getElementById('container')
);
