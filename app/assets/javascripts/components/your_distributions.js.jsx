var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var IReadyModal = require("./IReadyModal");
var ReadyModal = require("./ReadyModal");
var DistributionModal = require("./distribution_form");
var Editable = require("./Editable")
var AlertDismissable = require("./AlertDismissable")
var StateOptions = require("./StateOptions")
var _ = require("lodash")
var update = require('react-addons-update');
var Input = ReactBootstrap.Input;
var Button= ReactBootstrap.Button;
var Table = ReactBootstrap.Table;
var Collapse = ReactBootstrap.Collapse;

var Distributions = React.createClass({
  getInitialState: function () {
    return {distributions: [],
           alert: {message:"",
            style:""},
          alertVisible: false}
  },
  addDistribution: function(d) {
    d.show_detail = false
    newState = update(this.state, {distributions: {$push: [d]}})
    this.setState(newState)
  },

  loadDistributionsFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        for (var i = 0; i < data.length; i++) {
          this.addDistribution(data[i])
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function() {
    this.loadDistributionsFromServer();
    // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  handleAlertDismiss() {
    this.setState({alertVisible: false});
  },

  handleAlertShow() {
    this.setState({alertVisible: true});
  },

  handleNewAlert: function(alert){
    console.log(alert)
    this.setState({alert: alert, alertVisible: true})
  },

  handleFieldEdit: function(index, field, edit) {

    oldValue = this.state.distributions[index].distribution[field]
    id       = this.state.distributions[index].distribution.id
    
    newState = update(this.state, 
      {distributions: {[index]: {distribution: {[field]: {$set: edit}}},
    }})
    this.setState(newState)
    console.log(newState, this.state)
    update = {
      field:field,
      value:edit,
      id:id,
    }
    $.ajax({
      type: "Post",
      url: "/distributions/update",
      dataType: "json",
      data: update,
      success: function (data) {
        // this.props.handleNewDistribution(data)
        this.handleNewAlert({
          message:"Distribution successfully edited",
          style:"success"
        });
        console.log("success")
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString())
        newState = update(this.state, {distributions: 
          {[index]: {[field]: {$set: oldValue}},
        }})
        this.handleNewAlert({
          message:"Distribution failed to edit",
          style:"warning"
        });
      }.bind(this)
    })
  },

  handleToggleDetail: function(index) {
    console.log("handleToggleDetail fired", this.state, index)
    target = this.state.distributions[index].show_detail
    newState = update(this.state, 
      {distributions: {[index]: {show_detail: {$set: !target}},
    }})
    console.log(newState.distributions[index])
    this.setState(newState)
  },

  render: function() {
    return (
      <div className="Distributions">
        <h2>Your Distributions</h2>
        <AlertDismissable 
          style={this.state.alert.style}
          message={this.state.alert.message}
          alertVisible={this.state.displayAlert}
          onAlertDismiss={this.handleAlertDismiss}
          onAlertShow={this.handleAlertShow}/>
        <DistributionTable 
          data={this.state.distributions}
          onAlert={this.handleNewAlert}
          onConfirmEdit={this.handleFieldEdit}
          onToggleDetail={this.handleToggleDetail}
          />
        <DistributionModal
          url={this.props.url}
          authenticity_token={this.props.authenticity_token}/>
      </div>
      )
  }
})

var DistributionTable = React.createClass({
  render: function () {
    var distributionNodes = []
    var district_name = "Error: No district"
    var district_state = "Error: No district"
    for (var i = 0; i < this.props.data.length; i++) {
      var distro = this.props.data[i]
      var url = "/distributions/" + distro.distribution.id
      if (distro.distribution.district != null) {
        district_state = distro.distribution.district.state
        district_name = distro.distribution.district.name
      }
      distribution = distro.distribution
      distribution.district_name = district_name
      distribution.district_state = district_state
      console.log(distro)
      distributionNodes.push(
        <Distribution
          key={i}
          index={i}
          onAlert={this.props.onAlert}
          distribution = {distribution}
          districtOptions = {distro.district_options}
          show_detail = {distro.show_detail}
          url={url}
          onToggleDetail={this.props.onToggleDetail}
          onConfirmEdit={this.props.onConfirmEdit}
          />
      );
      distributionNodes.push(
        <DistributionDetail
          index={i}
          key={i+.1}
          i_ready_users={this.distro.iready}
          ready_users={this.distro.ready}
          schools={distro.schools}
          show_detail={this.props.data[i].show_detail}/>
      )
    }

    return (
      <Table striped bordered condensed hover>
        <thead>

          <tr>
            <th>District State </th> 
            <th>District Name  </th> 
            <th>Creation Date   </th> 
            <th>Final Quote Id    </th> 
            <th>PO Number   </th> 
            <th>Add I-Ready User</th> 
            <th>Add Ready User </th> 
            <th>Show Detail</th> 
          </tr>
        </thead>
        <tbody>
          {distributionNodes}
        </tbody>
      </Table>
        
    )
  }
});

var Distribution = React.createClass({
  handleAlert: function(Alert){
    this.props.onAlert(Alert);
  },

  canConfirm:function(value){
    return (value === "")? false: true
  },
  
  render: function () {
    const stateOptions = StateOptions;
    let districtOptions = [<option key={0} value="">N/A</option>]

    if (this.props.district_options){
      districtOptions.push(this.props.district_options.map(function(district, index){
        return (
          <option
            key={index+1}
            value={district}>
            {district}
          </option>)
      }))
    }

    return (
      <tr>
        <td>{this.props.distribution.district_state}</td>
        <td>{this.props.distribution.district_name} </td>
        <td><Editable
              type="date"
              canConfirm={this.canConfirm}
              value={this.props.distribution.creation_date}
              onConfirmEdit={this.props.onConfirmEdit.bind(null,this.props.index,"creation_date")}
              >
        </Editable></td>
        <td><Editable
              type="number"
              canConfirm={this.canConfirm}
              value={this.props.distribution.final_quote_id}
              onConfirmEdit={this.props.onConfirmEdit.bind(null,this.props.index,"final_quote_id")}
              >
        </Editable></td>
        <td><Editable
              type="number"
              canConfirm={this.canConfirm}
              value={this.props.distribution.po_number}
              onConfirmEdit={this.props.onConfirmEdit.bind(null,this.props.index,"po_number")}
              >
        </Editable></td>
        <td> <ReadyModal
              authenticity_token={this.props.authenticity_token}
              distribution={this.props.distribution.id} 
              schools={this.props.schools}
              onSubmit={this.handleReadySubmit}
              onAlert={this.handleAlert}  
              url='/end_users/add_order'/> 
        </td>
        <td> <IReadyModal
              authenticity_token={this.props.authenticity_token}
              distribution={this.props.distribution} 
              schools={this.props.schools}
              onSubmit={this.handleIReadySubmit}
              onAlert={this.handleAlert}              
              url='/end_users/add_order'/> 
        </td>
        <td><Button onClick={ this.props.onToggleDetail.bind(null,this.props.index) }>
            {(this.props.show_detail)? "hide detail": "show detail"}
          </Button></td>
      </tr>
      

    )
  }
})

var DistributionDetail = React.createClass({
  render: function () {
    console.log(this)
    if (this.props.show_detail) {
      return (
        <tr><td colSpan="8">

          <ReadyUsers 
          data={this.props.ready_users}/>
          <IReadyUsers 
          data={this.props.i_ready_users}/>
        </td></tr>
      )
    } else {
      return null
    }

    
  }
})

module.exports = Distributions