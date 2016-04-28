var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var Input = ReactBootstrap.Input;
var Button= ReactBootstrap.Button;

var AutoSuggest = React.createClass({
  getInitialState: function () {
    return {input: "", suggestions:this.getSuggestions("")}
  },

  handleChange: function(event){
    this.setState({ input: event.target.value})
    this.props.onChange(event.target.value)
    
  },

  handleClick: function (option) {
    this.setState({input:option})
    this.props.onChange(option)
  },

  getSuggestions: function(input) {
    if (input.length < 2 ) {
      return []
    }
    var options = this.props.options;
    var regex = RegExp(input, "i");
    var results = options.filter(function (option) {
      return option.match(regex) && option != input
    });
    return results;
  },

  onSuggestionsUpdateRequested: function({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  },

  render: function () {
    var suggestions = this.getSuggestions(this.state.input).map(function(suggestion, index){
      return (
        <li key={index}>
          <Button 
          bsStyle="default"
          onClick= {this.handleClick.bind(null,suggestion)}
          name={suggestion}>
          {suggestion}
          </Button>
        </li>
      )
    }.bind(this));

    return (
      <div className="typeahead">
        <Input 
          label={this.props.label}
          type="text"
          ref="field"
          onChange={this.handleChange} 
          value={this.state.input}
          required/>
        <ul className="list-unstyled">
          {suggestions}
        </ul>
    </div>
    )
  }
})
module.exports = AutoSuggest