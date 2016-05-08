var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var Editable = require("./Editable")



var IReadyUsers = React.createClass({
  render: function() {
    var rows = this.props.data.map(function(IReady,index){
      <IReadyRow
        key={index}
        data={IReady}/>
    })
  }
})

var IReadyRow = React.createClass({
  
  render: function() {
    <tr >
      <td><Editable
            type="select"
            canConfirm={(value)=>value != ''}
            value={this.state.school_name}
            onConfirmEdit={this.handleConfirmEdit}>
            {schoolOptions}
      </Editable></td>
        <td><Editable
            type="text"
            canConfirm={(value)=>value != ''}
            value={this.state.contact}
            onConfirmEdit={this.handleDistrictStateConfirmEdit}>
            {stateOptions}
      </Editable></td>
        <td><Editable
            type="number"
            canConfirm={(value)=>value != ''}
            value={this.state.enrollment}
            onConfirmEdit={this.handleDistrictStateConfirmEdit}>
            {stateOptions}
      </Editable></td>
      <td><Editable
            type="number"
            canConfirm={(value)=>value != ''}
            value={this.state.enrollment}
            onConfirmEdit={this.handleDistrictStateConfirmEdit}>
            {stateOptions}
      </Editable></td>
      </tr>
  }
})

var ReadyUsers = React.createClass({
  render: function() {
    var rows = this.props.data.map(function(Ready,index){
      
    })
  }
})

var ReadyRow = React.createClass({
  render: function() {
    <tr key={this.props.index}>
        <td><Editable
            type="select"
            canConfirm={this.canConfirmSelect}
            value={this.state.district_state}
            onConfirmEdit={this.handleDistrictStateConfirmEdit}>
            {stateOptions}
      </Editable></td>
        <td><Editable
            type="select"
            canConfirm={this.canConfirmSelect}
            value={this.state.district_state}
            onConfirmEdit={this.handleDistrictStateConfirmEdit}>
            {stateOptions}
      </Editable></td>
        <td><Editable
            type="select"
            canConfirm={this.canConfirmSelect}
            value={this.state.district_state}
            onConfirmEdit={this.handleDistrictStateConfirmEdit}>
            {stateOptions}
      </Editable></td>
    </tr>
  }
})