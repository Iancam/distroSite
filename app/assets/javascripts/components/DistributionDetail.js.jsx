var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var Editable = require("./Editable")
var AlertDismissable = require("./AlertDismissable")
var Table = ReactBootstrap.Table;

var DistributionDetail = React.createClass({
  getInitialState: function () {
  
  },
  
  render: function() {
    return (
      <div className="Distributions">
        <h1>Distribution</h1>
        <AlertDismissable 
          style={this.state.alert.style}
          message={this.state.alert.message}
          alertVisible={this.state.displayAlert}
          onAlertDismiss={this.handleAlertDismiss}
          onAlertShow={this.handleAlertShow}/>
        <DistributionHeader
          url="/distributions/update"
          authenticity_token={this.props.authenticity_token}/>
        <div className="endUsers">
          <h2>End Users</h2>
          <IReadyUsers
            data={this.state.IReadyUsers}/>
          <ReadyUsers
            data={this.state.ReadyUsers}/>
        </div>
      </div>
      )
  }
})

var DistributionHeader = React.createClass({
  
  render: function() {
    return ( 
      <div className="DistributionHeader">
        <Table striped bordered condensed hover>
          <tr>
            <th>State</th>
            <Editable
            value={this.props.state}>
            </Editable>
          </tr>
          <tr>
            <th>District Name</th>
            <Editable
            value={this.props.district_name}>
            </Editable>
          </tr>
          <tr>
            <th>Creation Date</th>
            <Editable
            value={this.props.creation_date}>
            </Editable>
          </tr>
          <tr>
            <th>Final Quote</th>
            <Editable
            value={this.props.final_quote_id}>
            </Editable>
          </tr>
          <tr>
            <th>PO Number</th>
            <Editable
            value={this.props.po_number}>
            </Editable>
          </tr>
        </Table>

      </div>
      )
  }
})

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
            canConfirm={this.canConfirmSelect}
            value={this.state.school_name}
            onConfirmEdit={this.handleConfirmEdit}>
            {schoolOptions}
      </Editable></td>
        <td><Editable
            type="text"
            canConfirm={this.canConfirmSelect}
            value={this.state.contact}
            onConfirmEdit={this.handleDistrictStateConfirmEdit}>
            {stateOptions}
      </Editable></td>
        <td><Editable
            type="number"
            canConfirm={this.canConfirmSelect}
            value={this.state.enrollment}
            onConfirmEdit={this.handleDistrictStateConfirmEdit}>
            {stateOptions}
      </Editable></td>
      <td><Editable
            type="number"
            canConfirm={this.canConfirmSelect}
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
      <tr key={index}>
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
    })
  }
})
