var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var Alert = ReactBootstrap.Alert;

var AlertDismissable = React.createClass({
  render() {
    if (this.props.alertVisible) {
      return (
        <Alert bsStyle={this.props.style} onDismiss={this.handleAlertDismiss}>
          <p>{this.props.message}</p>
        </Alert>
      );
    } else {
      return null
    }

  },
});

module.exports = AlertDismissable