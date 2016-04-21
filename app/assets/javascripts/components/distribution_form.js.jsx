var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var DatePicker = require("react-bootstrap-date-picker").default;
console.log(DatePicker)
var Input = ReactBootstrap.Input;
console.log(Input)
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
  submitForm: function () {
    this.refs.form.handleSubmit()
  },
  handleDistributionSubmit: function (distribution) {
    $.ajax({
      type: "Post",
      url: this.props.url,
      dataType: "json",
      data: distribution,
      success: function (data) {
        // we don't expect any data
      },
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString())
      }
    })
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
            creation_date:"",
            final_quote_id:"",
            po_number:""
          }
  },
  handleSubmit: function (e) {
    if (e) {e.preventDefault()}
    var district_state = this.state.district_state.trim()
    var district = this.state.district.trim()
    var contact = this.state.contact.trim()
    var street = this.state.street.trim()
    var city = this.state.city.trim()
    var state = this.state.address_state.trim()
    var zip = this.state.zip.trim()
    var creation_date = this.state.creation_date.trim()
    var final_quote_id = this.state.final_quote_id.trim()
    var po_number = this.state.po_number.trim()
    
    distribution = {
      district_state: district_state,
      district: district,
      contact: contact,
      street: street,
      city: city,
      state: state,
      zip: zip,
      creation_date: creation_date,
      final_quote_id: final_quote_id,
      po_number: po_number,
    }
    if (!district_state ||
        !district ||
        !contact ||
        !street ||
        !city ||
        !state ||
        !zip ||
        !creation_date ||
        !final_quote_id ||
        !po_number) { return; }
    this.props.onDistributionSubmit(distribution)
    this.setState(this.getInitialState())
  },
  handleDistrictStateChange: function (e) {
    this.setState({state:{name: e.target.value}})
    $.ajax({
      type: "POST",
      url: "/distributions/districts",
      data: {state:{name: e.target.value}},
      dataType: "json",
      success: function (data) {
        this.setState({districts: data});
        return true
       }.bind(this),
      error: function (data){
        return false
      }
    })
  },
  handleDistrictChange: function (e) {
    this.setState({district: e.target.value})
  },
  handleContactChange: function (e) {
    this.setState({Contact: e.target.value})
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
  handleCreationDateChange: function (e) {
    this.setState({creation_date:e.target.value})
  },
  handleFinalQuoteIdChange: function (e) {
    this.setState({final_quote_id:e.target.value})
  },
  handlePoNumberChange: function (e) {
    this.setState({po_number:e.target.value})
  },
  render: function() {
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
        <StateSelector onChange={this.handleDistrictStateChange} />
        <DistrictsAutoSuggest
          districts={this.state.districts}
          onChange={this.handleDistrictChange} />
      </div>
      {/* address input */}
      <div className="form-group" id="address">
      <h3>Distribution Address</h3> 
      <p>leave blank if not applicable</p> 
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
      <div className="form_group" id="info">
      <h3>Distribution Info</h3> 
      <DatePicker
        value={this.state.value}
        onChange={this.handleCreationDateChange} 
        required/>

        <Input 
          type="text"
          label="Final Quote Id" 
          name="distribution[final_quote_id]"
          id="final_quote_id"
          onChange={this.handleFinalQuoteIdChange}
          required/>
        <Input 
          type="text"
          label="Po Number" 
          name="distribution[po_number]"
          id="po_number"
          onChange={this.handlePoNumberChange}
          required/>
      </div>
      <Button className="form-group" type="submit" value="Post">Submit</Button>

      </form>

    )
  }
});


var DistrictsAutoSuggest = React.createClass({
  getInitialState: function () {
    return {input: "", suggestions:this.getSuggestions("")}
  },

  handleChange: function(event){
    this.setState({ input: event.target.value})
  },

  handleClick: function (district) {
    this.setState({input:district})
  },

  getSuggestions: function(input) {
    if (input.length < 2 ) {
      return []
    }
    var options = this.props.districts;
    var regex = RegExp(input, "i");
    var results = options.filter(function (district) {
      return district.match(regex) && district != input
    });
    console.log(results)
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
            onClick= {function(){this.handleClick(suggestion)}.bind(this)}
            name={suggestion}>

            {suggestion}
            </Button>
          </li>
        )
      }.bind(this));

    return (
      <div className="typeahead">
        <Input 
          label="District"
          type="text"
          ref="field"
          onChange={this.handleChange} 
          value={this.state.input}/>
        <ul className="list-unstyled">
          {suggestions}
        </ul>
    </div>
    )
  }
})

var StateSelector = React.createClass({
  
  render: function() {
    return (
      <Input 
        onChange={this.props.onChange}
        type="select"
        label="State" 
        name="state" 
        id="state" 
        groupClassName={this.props.groupClassName}>

        <option value="">N/A</option> 
        <option value="AK"> Alaska</option>
        <option value="AL"> Alabama</option>
        <option value="AR"> Arkansas</option>
        <option value="AZ"> Arizona</option>
        <option value="CA"> California</option>
        <option value="CO"> Colorado</option>
        <option value="CT"> Connecticut</option>
        <option value="DC"> District of Columbia</option>
        <option value="DE"> Delaware</option>
        <option value="FL"> Florida</option>
        <option value="GA"> Georgia</option>
        <option value="HI"> Hawaii</option>
        <option value="IA"> Iowa</option>
        <option value="ID"> Idaho</option>
        <option value="IL"> Illinois</option>
        <option value="IN"> Indiana</option>
        <option value="KS"> Kansas</option>
        <option value="KY"> Kentucky</option>
        <option value="LA"> Louisiana</option>
        <option value="MA"> Massachusetts</option>
        <option value="MD"> Maryland</option>
        <option value="ME"> Maine</option>
        <option value="MI"> Michigan</option>
        <option value="MN"> Minnesota</option>
        <option value="MO"> Missouri</option>
        <option value="MS"> Mississippi</option>
        <option value="MT"> Montana</option>
        <option value="NC"> North Carolina</option>
        <option value="ND"> North Dakota</option>
        <option value="NE"> Nebraska</option>
        <option value="NH"> New Hampshire</option>
        <option value="NJ"> New Jersey</option>
        <option value="NM"> New Mexico</option>
        <option value="NV"> Nevada</option>
        <option value="NY"> New York</option>
        <option value="OH"> Ohio</option>
        <option value="OK"> Oklahoma</option>
        <option value="OR"> Oregon</option>
        <option value="PA"> Pennsylvania</option>
        <option value="PR"> Puerto Rico</option>
        <option value="RI"> Rhode Island</option>
        <option value="SC"> South Carolina</option>
        <option value="SD"> South Dakota</option>
        <option value="TN"> Tennessee</option>
        <option value="TX"> Texas</option>
        <option value="UT"> Utah</option>
        <option value="VA"> Virginia</option>
        <option value="VT"> Vermont</option>
        <option value="WA"> Washington</option>
        <option value="WI"> Wisconsin</option>
        <option value="WV"> West Virginia</option>
        <option value="WY"> Wyoming</option>
      </Input>
    )
  }
});


module.exports = DistributionModal