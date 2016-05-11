var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var DatePicker = require("react-bootstrap-date-picker").default;
var AutoSuggest = require("./AutoSuggest")
var StateOptions = require("./StateOptions")
var Input = ReactBootstrap.Input;
var Button= ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;

var DistributionModal = React.createClass({
  getInitialState: function() {
    return {showModal:false, distributions: {}}
  },

  close: function() {
    this.setState({ showModal: false });
  },

  open: function() {
    this.setState({ showModal: true });
  },

  handleDistributionSubmit: function (distribution) {
    this.props.onDistributionSubmit(distribution)

    this.close()
  },
  render: function() {
    return (
      <div>
        <Button
          bsStyle="primary"
          onClick={this.open}>
            New Distribution
        </Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>New Distribution</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DistributionForm 
              ref="form" 
              authenticity_token={this.props.authenticity_token} 
              onDistributionSubmit={this.handleDistributionSubmit}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>

    )
  }
})

var DistributionForm = React.createClass({
  getInitialState: function(){
    return {districts: [],
            district_state: "",
            district: "",
            contact: "",
            street: "",
            city: "",
            address_state: "",
            zip: "",
            creation_date:(new Date()).toISOString(),
            final_quote_id:"",
            po_number:"",
            showAddress: false
          }
  },
  handleSubmit: function (e) {
    if (e) {e.preventDefault()}; 
    var params = {
      authenticity_token: this.props.authenticity_token,
      district_state: this.state.district_state.trim(),
      district_name: this.state.district.trim(),
      distribution: {
        contact_name: this.state.contact.trim(),
        street: this.state.street.trim(),
        city: this.state.city.trim(),
        state: this.state.address_state.trim(),
        zip: this.state.zip.trim(),
        creation_date: this.state.creation_date.trim(),
        final_quote_id: this.state.final_quote_id.trim(),
        po_number: this.state.po_number.trim()
      }
    }

    if (!params.authenticity_token || 
        !params.district_state ||
        !params.district_name ||      
        !params.distribution.creation_date
        ) { 
      console.log(params)
      return; 
    }

    
    
    this.props.onDistributionSubmit(params)
    this.setState(this.getInitialState())
  },

  handleDistrictStateChange: function (e) {
    this.setState({district_state: e.target.value})
    var url = "/distributions/districts";
    $.ajax({
      type: "get",
      url: url,
      data: {state:{name: e.target.value}},
      dataType: "json",
      success: function (data) {
        this.setState({districts: data});
        return true
       }.bind(this),
      error: function (xhr, status, err){
        console.log(url, status, err)
        return false
      }
    })
  },

  handleDistrictChange: function (district) {
    this.setState({district: district})
    
  },
  handleContactChange: function (e) {
    this.setState({contact: e.target.value})
  },

  handleStreetChange: function (e) {
    this.setState({street: e.target.value})
  },

  handleCityChange: function (e) {
    this.setState({city: e.target.value})
  },

  handleAddressStateChange: function (e) {
    this.setState({address_state: e.target.value})
  },

  handleZipChange: function (e) {
    this.setState({zip: e.target.value})
  },
  handleCreationDateChange: function (value) {
    this.setState({creation_date:value})
  },
  handleFinalQuoteIdChange: function (e) {
    this.setState({final_quote_id:e.target.value})
  },
  handlePoNumberChange: function (e) {
    this.setState({po_number:e.target.value})
  },
  handleAddressTypeChange: function (e) {
    if (e.target.value == "central location"){
      this.setState({showAddress:true})
    } else {
      this.setState({showAddress:false})
    }
    
  },
  render: function() {
    var addressStyle = this.state.showAddress? {} : {display: 'none'}

    return (
    <form  
      ref="form"
      className="distribution-form" 
      action={ this.props.action } 
      acceptCharset="UTF-8" 
      method="post" 
      onSubmit={ this.handleSubmit }>
      <input type="hidden" name="authenticity_token" value={this.props.authenticity_token} />
      {/* district input */}
      <div className="form-group" id="district_input">
        <StateSelector 
          onChange={this.handleDistrictStateChange} 
          required/>
        <AutoSuggest
          label="District"
          options={this.state.districts}
          onChange={this.handleDistrictChange} />
      </div>
      {/* address input */}
      <Input 
        onChange={this.handleAddressTypeChange}
        type="select"
        label="Address Type" 
        name="Address Type" 
        >
        <option value="individual schools">Individual Schools</option>
        <option value="central location">Central Location</option>
        
      </Input>
      <div className="form-group" id="address" style={addressStyle}>
        <h3>Distribution Address</h3> 
        <Input 
          label="Contact Name"
          type="text"
          name="distribution[contact_name]"
          id="distribution_contact_name"
          onChange={this.handleContactChange}
          />
        <Input 
          label="Street"
          type="text"
          name="distribution[street]"
          id="distribution_street"
          onChange={this.handleStreetChange}
          />
        <Input 
          label='City'
          type="text"
          name="distribution[city]"
          id="distribution_city"
          groupClassName="col-sm-4 col-lg-4 col-md-4"
          onChange={this.handleCityChange}
          />
        <StateSelector 
          groupClassName="col-sm-4"
          onChange={this.handleAddressStateChange}
          />
        <Input 
            label='Zip Code' 
            type="text"
            name="distribution[zip]"
            id="distribution_zip"
            groupClassName="col-sm-4 col-lg-4 col-md-4"
            onChange={this.handleZipChange}
            />
          <br/>
      </div>
      {/* distribution input */}
      <div className="form-group" id="info">
        <h3>Distribution Info</h3> 
        {/*TODO: make it so that date can't be earlier than today*/}
        <DatePicker
          label="Creation Date"
          value={this.state.creation_date}
          onChange={this.handleCreationDateChange} 
          required/>

        <Input 
          type="text"
          label="Final Quote ID" 
          name="distribution[final_quote_id]"
          id="final_quote_id"
          onChange={this.handleFinalQuoteIdChange}
          />
        <Input 
          type="text"
          label="PO Number" 
          name="distribution[po_number]"
          id="po_number"
          onChange={this.handlePoNumberChange}
          />
        </div>
      <Button className="form-group" type="submit" value="Post">Submit</Button>

    </form>

    )
  }
});

var StateSelector = React.createClass({
  render: function() {
    var req = ""
    if (this.props.required != null) {
      req = "required"
    }

    return (
      <Input 
        onChange={this.props.onChange}
        type="select"
        label="State" 
        name="state" 
        id="state" 
        groupClassName={this.props.groupClassName}
        >
        {StateOptions}
        
      </Input>
    )
  }
});


module.exports = DistributionModal