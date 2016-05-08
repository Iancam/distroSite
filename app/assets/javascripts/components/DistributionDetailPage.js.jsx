var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var Editable = require("./Editable")
var AlertDismissable = require("./AlertDismissable")
var Table = ReactBootstrap.Table;

var DistributionDetail = React.createClass({
  getInitialState: function () {
    return {
      distribution: {},
      alert: {
        style: "",
        message: "",
      },
      displayAlert: false,
    }
  },
  loadDistributionFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({distribution: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleAlertShow: () => {

  },
  onComponentDidMount: function() {
    this.loadDistributionFromServer()
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
          id={this.state.distribution.id}
          district_state={this.state.distribution.district_state}
          district_name={this.state.distribution.district_name}
          creation_date={this.state.distribution.creation_date}
          final_quote_id={this.state.distribution.final_quote_id}
          po_number={this.state.distribution.po_number}
          id={this.state.distribution.id}
          authenticity_token={this.props.authenticity_token}/>
        <div className="endUsers">
          <h2>End Users</h2>
          
        </div>
      </div>
      )
  }
})

var DistributionHeader = React.createClass({
  confirmDistrictStateEdit: (val) => {
    this.setState({district_name: "Choose a District"})

  },
  confirmFieldEdit:(field, val) => {
    oldValue = this.state[field]
    this.setState({[field]:value})
    update = {
      field:field,
      value:value,
      id:this.props.distribution.id}
    $.ajax({
      type: "Post",
      url: "/distributions/update",
      dataType: "json",
      data: update,
      success: function (data) {
        // this.props.handleNewDistribution(data)
        this.props.onAlert({
          message:"Distribution successfully edited",
          style:"success"
        });
        console.log("success")
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString())
        this.state[field] = oldValue
        this.props.onAlert({
          message:"Distribution failed to edit",
          style:"warning"
        });
      }.bind(this)
    })
  },
  

  render: function() {
    return ( 
      <div className="DistributionHeader">
        <Table striped bordered condensed hover>
          <tbody>
            <tr>
              <th>State</th>
              <Editable
                type="select"
                canConfirm={(val)=>{val != ''}}
                onConfirmEdit={this.confirmDistrictStateEdit}
                value={this.state.distribution.state}>
              </Editable>
            </tr>
            <tr>
              <th>District Name</th>
              <Editable
                type="select"
                canConfirm={(val)=>{val != ''}}
                onConfirmEdit={this.confirmFieldEdit}
                value={this.state.distribution.district_name}>
              </Editable>
            </tr>
            <tr>
              <th>Creation Date</th>
              <Editable
                type="select"
                canConfirm={(val)=>{val != ''}}
                onConfirmEdit={this.confirmFieldEdit.bind(null,"creation_date")}
                value={this.state.distribution.creation_date}>
              </Editable>
            </tr>
            <tr>
              <th>Final Quote</th>
              <Editable
                type="select"
                canConfirm={(val)=>{val != ''}}
                onConfirmEdit={this.confirmFieldEdit.final_quote_id.bind(null,"final_quote_id")}
                value={this.state.distribution}>
              </Editable>
            </tr>
            <tr>
              <th>PO Number</th>
              <Editable
                type="select"
                canConfirm={(val)=>{val != ''}}
                onConfirmEdit={this.confirmFieldEdit.po_number.bind(null,"po_number")}
                value={this.state.distribution}>
              </Editable>
            </tr>
          </tbody>
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
module.exports = DistributionDetail