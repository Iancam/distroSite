var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var IReadyModal = require("./IReadyModal");
var ReadyModal = require("./ReadyModal");
var DistributionModal = require("./DistributionModal");
var Editable = require("./Editable")
var DistributionDetail = require("./DistributionDetail")
var AlertDismissable = require("./AlertDismissable")
var StateOptions = require("./StateOptions")
var _ = require("lodash")
var update = require('react-addons-update');

var Input = ReactBootstrap.Input;
var Button= ReactBootstrap.Button;
var Table = ReactBootstrap.Table;


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

  handleDistributionFieldEdit: function(index, field, edit) {

    oldValue = this.state.distributions[index].distribution[field]
    id       = this.state.distributions[index].distribution.id

    const newState = update(this.state, 
      {distributions: {[index]: {distribution: {[field]: {$set: edit}}},
    }})
    this.setState(newState)

    change = {
      field:field,
      value:edit,
      id:id,
    }
    $.ajax({
      type: "Post",
      url: "/distributions/update",
      dataType: "json",
      data: change,
      success: function (data) {
        this.handleNewAlert({
          message:"Distribution successfully edited",
          style:"success"
        });
        console.log("success")
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString())
        const newState = update(this.state, 
          {distributions: {[index]: {[field]: {$set: oldValue}},
        }})
        this.handleNewAlert({
          message:"Distribution failed to edit",
          style:"warning"
        });
      }.bind(this)
    })
  },
  
  handleReadyFieldEdit:function(distro_index, ready_index, field, edit) {
    const oldValue = this.state.distributions[distro_index].ready_users[ready_index][field]
    const id = this.state.distributions[distro_index].ready_users[ready_index].id

    const newState = update(this.state, 
      {distributions: {[distro_index]: {ready_users: {[ready_index]: {[field]: {$set: edit}}}}},
    })
    this.setState(newState)

    const change = {
      field:field,
      value:edit,
      id:id,
    }

    $.ajax({
      type: "Post",
      url: "/end_users/update_ready",
      dataType: "json",
      data: change,
      success: function (data) {
        if (field == "school_id") { 
          const newState = update(this.state, 
            {distributions: {[distro_index]: {ready_users: {[ready_index]: {$set: data["ready"]}}}}})
          this.setState(newState)
        }

        this.handleNewAlert({
          message:"Ready user successfully edited",
          style:"success"
        });
        console.log("success")
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString())
        const newState = update(this.state, {
          distributions: {[distro_index]: {ready_users: {[ready_index]: {[field]: {$set: oldValue}}}}
        }})
        this.setState(newState)
        this.handleNewAlert({
          message:"Ready user failed to edit",
          style:"warning"
        });
      }.bind(this)
    })
  },

  handleIReadyFieldEdit:function(distro_index, i_ready_index, field, edit) {
    // TODO: fill in edit details
    const oldValue = this.state.distributions[distro_index].i_ready_users[i_ready_index][field]
    const id       = this.state.distributions[distro_index].i_ready_users[i_ready_index].id
    const newState = update(this.state, 
      {distributions: {[distro_index]: {i_ready_users: {[i_ready_index]: {[field]: {$set: edit}}}},
    }})
    this.setState(newState, ()=>{
        if (field === "subject"){
          this.handleIReadyFieldEdit(distro_index, i_ready_index, "toolbox", 'none')
      }
    })
    const change = {
      field:field,
      value:edit,
      id:id,
    }
    $.ajax({
      type: "Post",
      url: "/end_users/update_iready",
      dataType: "json",
      data: change,
      success: function (data) {
        // this.props.handleNewDistribution(data)
        this.handleNewAlert({
          message:"IReady user successfully edited",
          style:"success"
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString())
        newState = update(this.state, {distributions: 
          {[distro_index]: {[i_ready_index]: {[field]: {$set: oldValue}}},
        }})
        this.handleNewAlert({
          message:"IReady user failed to edit",
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
   addDistribution: function(d) {
    d.show_detail = false
    newState = update(this.state, {distributions: {$push: [d]}})
    this.setState(newState)
  },
  addIReady: function(IReady, index){
    console.log(IReady, index)
    newState= update(this.state,
    {distributions: {[index]:{i_ready_users: {$push: [IReady]}}}})
    this.setState(newState)
  },
  addReady: function(Ready,index){
    newState= update(this.state,
    {distributions: {[index]:{ready_users: {$push: [Ready]}}}})
    this.setState(newState)
  },
  addReadies: function(readies, index){
    for (ready of readies){
      this.addReady(ready, index)
    }
  },
  handleDistributionSubmit: function(d) {
    this.handleNewAlert({style:"info",
                         message:"waiting for new distribution to save"})
    $.ajax({
      type: "Post",
      url: this.props.url,
      dataType: "json",
      data: d,
      success: function (data) {
        console.log("auto-refresh not implemented")
        this.handleNewAlert({style:"success",
                         message:"new distribution saved"})
        this.addDistribution(data)
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    })
  },
  handleReadySubmit: function(index, ready){
    url='/end_users/add_ready'
    $.ajax({
      type: "Post",
      url: url,
      dataType: "json",
      data: ready,
      success: function (data) {
        this.addReadies(data,index)
        this.handleNewAlert({
          message:"Ready Form successfully submitted",
          style:"success"
        });

      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString())
        this.handleNewAlert({
          message:"Ready Form failed to submit",
          style:"warning"
        });
      }.bind(this)
    })
  },
  handleIReadySubmit: function(index, IReady){
    console.log(IReady)
    url='/end_users/add_iready'
    $.ajax({
      type: "Post",
      url: url,
      dataType: "json",
      data: IReady,
      success: function (data) {
        this.addIReady(data,index)
        this.handleNewAlert({
          message:"IReady form successfully submitted",
          style:"success"
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString())
        this.handleNewAlert({
          message:"IReady form failed to submit",
          style:"warning"
        });
      }.bind(this)
    })
  },
  render: function() {
    return (
      <div className="Distributions">
        <h2>{(this.props.showAll)? "All Distributions": "Your Distributions"}</h2>
        <AlertDismissable 
          style={this.state.alert.style}
          message={this.state.alert.message}
          alertVisible={this.state.displayAlert}
          onAlertDismiss={this.handleAlertDismiss}
          onAlertShow={this.handleAlertShow}/>
        <DistributionTable 
          data={this.state.distributions}
          onAlert={this.handleNewAlert}
          onReadySubmit={this.handleReadySubmit}
          onIReadySubmit={this.handleIReadySubmit}
          onConfirmDistributionEdit={this.handleDistributionFieldEdit}
          onConfirmReadyEdit={this.handleReadyFieldEdit}
          onConfirmIReadyEdit={this.handleIReadyFieldEdit}
          onToggleDetail={this.handleToggleDetail}
          />
        <DistributionModal
          url={this.props.url}
          authenticity_token={this.props.authenticity_token}
          onDistributionSubmit={this.handleDistributionSubmit}/>
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
      distributionNodes.push(
        <Distribution
          key={i}
          index={i}
          onAlert={this.props.onAlert}
          distribution={distribution}
          schools={distro.schools}
          districtOptions={distro.district_options}
          show_detail={distro.show_detail}
          url={url}
          onReadySubmit={this.props.onReadySubmit.bind(null, i)}
          onIReadySubmit={this.props.onIReadySubmit.bind(null, i)}
          onToggleDetail={this.props.onToggleDetail}
          onConfirmEdit={this.props.onConfirmDistributionEdit}
          />
      );
      distributionNodes.push(
        <DistributionDetail
          index={i}
          key={i+.1}
          i_ready_users={distro.i_ready_users}
          ready_users={distro.ready_users}
          schools={distro.schools}
          show_detail={this.props.data[i].show_detail}
          onConfirmReadyEdit={this.props.onConfirmReadyEdit}
          onConfirmIReadyEdit={this.props.onConfirmIReadyEdit}
          />
      )
    }
    return (
      <Table striped bordered condensed hover>
        <thead>

          <tr>
            <th>District State </th> 
            <th>District Name  </th> 
            <th>Creation Date   </th> 
            <th>Final Quote ID    </th> 
            <th>PO Number   </th> 
            <th>Add Ready User </th> 
            <th>Add i-Ready User</th> 
            <th>Show Detail</th>
            <th>Download CSV</th>
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
              value={this.props.distribution.creation_date}
              onConfirmEdit={this.props.onConfirmEdit.bind(null,this.props.index,"creation_date")}
              >
        </Editable></td>
        <td><Editable
              type="number"
              value={this.props.distribution.final_quote_id}
              onConfirmEdit={this.props.onConfirmEdit.bind(null,this.props.index,"final_quote_id")}
              >
        </Editable></td>
        <td><Editable
              type="number"
              value={this.props.distribution.po_number}
              onConfirmEdit={this.props.onConfirmEdit.bind(null,this.props.index,"po_number")}
              >
        </Editable></td>
        <td> <ReadyModal
              authenticity_token={this.props.authenticity_token}
              distribution={this.props.distribution.id} 
              schools={this.props.schools}
              onSubmit={this.props.onReadySubmit}
              onAlert={this.props.onAlert}  
              /> 
        </td>
        <td> <IReadyModal
              authenticity_token={this.props.authenticity_token}
              distribution_id={this.props.distribution.id} 
              schools={this.props.schools}
              onSubmit={this.props.onIReadySubmit}
              onAlert={this.props.onAlert}              
              /> 
        </td>
        <td><Button onClick={ this.props.onToggleDetail.bind(null,this.props.index) }>
            {(this.props.show_detail)? "hide detail": "show detail"}
          </Button></td>
        <td><a href={"/distributions/"+this.props.distribution.id+".csv"}>Download CSV</a></td>
      </tr>
      

    )
  }
})



module.exports = Distributions