var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var IReadyModal = require("./IReadyModal");
var ReadyModal = require("./ReadyModal");
var DistributionModal = require("./distribution_form");
var Editable = require("./Editable")
// var AutoSuggest = require("./AutoSuggest")
var Input = ReactBootstrap.Input;
var Button= ReactBootstrap.Button;
var Table = ReactBootstrap.Table;
var Alert = ReactBootstrap.Alert;

var Distributions = React.createClass({
  getInitialState: function () {
    return {distributions: [],
           alert: {message:"",
            style:""},
          alertVisible: false}
  },

  loadDistributionsFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({distributions: data});
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
          onAlert={this.handleNewAlert} />
        <DistributionModal
          url={this.props.url}
          authenticity_token={this.props.authenticity_token}/>
      </div>
      )
  }
})

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

var DistributionTable = React.createClass({
  render: function () {
    var distributionNodes = this.props.data.map(function(distro, index) {
      var district_name = "Error: No district"
      var district_state = "Error: No district"
      var url = "/distributions/" + distro.distribution.id
      if (distro.distribution.district != null) {
        district_state = distro.distribution.district.state
        district_name = distro.distribution.district.name
      }
      return (
        <Distribution
          key={index}
          onAlert={this.props.onAlert}
          district_state={district_state}
          district_name={district_name}
          creation_date={distro.distribution.creation_date}
          final_quote_id={distro.distribution.final_quote_id}
          po_number={distro.distribution.po_number}
          schools={distro.schools}
          districtOptions = {distro.district_options}
          distribution={distro.distribution.id}
          url={url}
          />
      );
    }.bind(this));
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
  getInitialState: function(){
    return {
      district_state:this.props.district_state,
      district_name:this.props.district_name,
      district_options:this.props.districtOptions,
      creation_date:this.props.creation_date,
      final_quote_id:this.props.final_quote_id,
      po_number:this.props.po_number
          }
  },

  handleAlert: function(Alert){
    this.props.onAlert(Alert);
  },
  handleConfirmEdit: function(field, value){
    oldValue = this.state[field]
    this.setState({[field]:value})
    update = {
      field:field,
      value:value,
      id:this.props.distribution}
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
  handleDistrictStateConfirmEdit: function(value){
    console.log(value)
    this.setState({district_state: value})
    this.setState({district_name: "Choose a District"})
    var url = "/distributions/districts";
    $.ajax({
      type: "Get",
      url: url,
      data: {state:{name: value}},
      dataType: "json",
      success: function (data) {
        this.setState({district_options: data});
        console.log(data)
        return true
       }.bind(this),
      error: function (xhr, status, err){
        console.log(url, status, err)
        return false
      }
    })
  },
  handleDistrictNameConfirmEdit: function(value) {
    const oldValue = this.state["district_name"]
    this.setState({district_name: value})
    const url ="/distributions/update"
    update = {
      field:"district_id",
      value:{
        state: this.state["district_state"],
        name: value},
      id:this.props.distribution}
    $.ajax({
      type: "Post",
      url: url,
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
        console.error(url, status, err.toString())
        this.state["district_name"] = oldValue
        this.props.onAlert({
          message:"Distribution failed to edit",
          style:"warning"
        });
      }.bind(this)
    })
  },
  canConfirmSelect:function(value){
    return (value === "")? false: true
  },
  canConfirmDate:function(value){
    return (value === "")? false: true
  },
  canConfirmNumber:function(value){
    return (value === "")? false: true
  },
  
  render: function () {
    const stateOptions = [["","N/A"],["AL","Alabama"],["AK","Alaska"],["AZ","Arizona"],["AR","Arkansas"],["CA","California"],["CO","Colorado"],["CT","Connecticut"],["DE","Delaware"],["FL","Florida"],["GA","Georgia"],["HI","Hawaii"],["ID","Idaho"],
                          ["IL","Illinois"],["IN","Indiana"],["IA","Iowa"],["KS","Kansas"],["KY","Kentucky"],["LA","Louisiana"],["ME","Maine"],["MD","Maryland"],["MA","Massachusetts"],["VA","Virginia"],["MI","Michigan"],["WA","Washington"],
                          ["MN","Minnesota"],["WV","West Virginia"],["MS","Mississippi"],["WI","Wisconsin"],["MO","Missouri"],["WY","Wyoming"],["MT","Montana"],["NE","Nebraska"],["NV","Nevada"],["NH","New Hampshire"],["NJ","New Jersey"],["NM","New Mexico"],
                          ["NY","New York"],["NC","North Carolina"],["ND","North Dakota"],["OH","Ohio"],["OK","Oklahoma"],["OR","Oregon"],["PA","Pennsylvania"],["RI","Rhode Island"],["SC","South Carolina"],["SD","South Dakota"],["TN","Tennessee"],["TX","Texas"],
                          ["UT","Utah"],["VT","Vermont"]].map(function(state, index){
                            return <option key={index} value={state[0]}>{state[1]}</option>
                            })
    let districtOptions = [<option key={0} value="">N/A</option>]

    if (this.state.district_options){
      districtOptions.push(this.state.district_options.map(function(district, index){
        return (<option key={index+1} value={district}>{district}</option>)
      }))
    }

    return (
    <tr>
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
            value={this.state.district_name}
            onConfirmEdit={this.handleDistrictNameConfirmEdit}>
            {districtOptions}
      </Editable></td>
      <td><Editable
            type="date"
            canConfirm={this.canConfirmDate}
            value={this.state.creation_date}
            onConfirmEdit={this.handleConfirmEdit.bind(null,"creation_date")}>

      </Editable></td>
      <td><Editable
            type="number"
            canConfirm={this.canConfirmNumber}
            value={this.state.final_quote_id}
            onConfirmEdit={this.handleConfirmEdit.bind(null,"final_quote_id")}>

      </Editable></td>
      <td><Editable
            type="number"
            canConfirm={this.canConfirmNumber}
            value={this.state.po_number}
            onConfirmEdit={this.handleConfirmEdit.bind(null,"po_number")}>

      </Editable></td>
      <td> <ReadyModal
            authenticity_token={this.props.authenticity_token}
            distribution={this.props.distribution} 
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
      <td><a href={this.props.url}>Show Detail</a></td>
    </tr>
    )
  }
})

module.exports = Distributions