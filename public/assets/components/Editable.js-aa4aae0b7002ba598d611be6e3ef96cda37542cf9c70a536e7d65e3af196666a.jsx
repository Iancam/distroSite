var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var Input = ReactBootstrap.Input;
var Button = ReactBootstrap.Button;
var Glyphicon = ReactBootstrap.Glyphicon;
var DatePicker = require("react-bootstrap-date-picker").default;

var Editable = React.createClass({
  getInitialState: function () {
    state = {}
    if (this.props.type === "boolean") {
      state.editValue = (this.props.value)? "true": "false"
    } else {
      state.editValue =  (this.props.value || "")
    }
    
    state.editValue = ""
    state.showEdit = false
    state.editing = this.props.editing
    return state
  },
  getDefaultProps: function() {
    return {
      canConfirm: (value) => (value === "")? false: true
    };
  },
  handleClick: function(){
    this.setState({editing:true})
  },
  handleCancel: function(){
    this.setState({editValue:""})
    this.setState({editing:false})
  },
  handleEditChangeEvent: function(e){
    this.setState({editValue:e.target.value})
  },
  handleEditChangeValue: function(value){
    this.setState({editValue:value})
  },
  handleConfirmEdit: function(){
    this.setState({value:this.state.editValue})
    this.props.onConfirmEdit(this.state.editValue)
    this.setState({editValue:""})
    // make the value visible and hide the edit
    this.setState({editing:false})
  },
  
  render: function(){ 
    var prefix = (<Button
                    bsSize="small"
                    disabled={!this.props.canConfirm(this.state.editValue)}
                    onClick={this.handleConfirmEdit}>
                    <Glyphicon glyph="ok" />
                  </Button>)

    var postfix= (<Button
                    key={2}
                    bsSize="small"
                    onClick={this.handleCancel}>
                    <Glyphicon glyph="remove"/>
                  </Button>)
    var input;
    if (this.props.type === "date"){
      input = [<DatePicker 
        key={1}
        className="editInput"
        bsSize="small"
        buttonBefore={prefix}
        buttonAfter={postfix}
        onChange={this.handleEditChangeValue}
        value={this.state.editValue}
        placeholder={this.props.value}/>,
        postfix
        ]
    } else if(this.props.type === "text" ||
              this.props.type === "number"){
      input = <Input
            className="editInput"
            bsSize="small"
            buttonBefore={prefix}
            buttonAfter={postfix}
            type={this.props.type} 
            value={this.state.editValue}

            onChange={this.handleEditChangeEvent}
            placeholder={this.props.value}
            />
    } else if(this.props.type === "select"){
      input = <Input 
                className="editInput"
                bsSize="small"
                name={this.props.name}
                buttonBefore={prefix}
                buttonAfter={postfix}
                type={this.props.type}
                value={this.state.editValue}
                onChange={this.handleEditChangeEvent}
                placeholder={this.props.value}
                >
                {this.props.children}
                </Input>
    } else if (this.props.type === "boolean") {
      input = <Input
                className="editInput"
                bsSize="small"
                name={this.props.name}
                buttonBefore={prefix}
                buttonAfter={postfix}
                type="checkbox"
                value={this.state.editValue}
                onChange={this.handleEditChangeEvent}
                placeholder={this.props.value}
                />
    }
    var valueStyle={}
    var editStyle={display: 'none'}
    if(this.state.editing){
      valueStyle={display: 'none'}
      editStyle={}
    }
    
    var displayValue = this.props.value || 'blank'
    if(this.props.value === 0){
      displayValue = 0
    }
    return (
      <div className={this.props.className}>
        <div style={editStyle}>
          {input}
        </div>
        <div
          onClick={this.handleClick} 
          style={valueStyle}>
          <span className="editableValue">{displayValue}</span>
        </div>
      </div>
     ) 
  }
})

module.exports = Editable 