/* test source map */
var React = require('react');
global.jQuery = require('jquery');
require('bootstrap');
require("!style!css!less!../../../../node_modules/bootstrap/less/bootstrap.less");

require("!style!css!sass!./sample-react.scss");

var lt8k = require('./lt-8k.png');
var gt8k = require('./gt-8k.png');

var MainDiv = React.createClass({
  render: function() {
    return <div className="sample-react-css">Hello, {this.props.name}!
        <img src={lt8k} />
        <img src={gt8k} />
        <button type="button" className="btn btn-danger">Action</button>
    </div>;
  }
});

module.exports = MainDiv;
