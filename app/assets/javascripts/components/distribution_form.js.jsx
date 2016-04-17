var AutoSuggest = require('react-autosuggest');
var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var Input = ReactBootstrap.Input;
var Button= ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;


var DistributionModal = React.createClass({
	getInitialState: function() {
		return {showModal:false}
	},

	close: function() {
  	this.setState({ showModal: false });
	},

  open: function() {
    this.setState({ showModal: true });
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
	        	<DistributionForm action="/distributions/district_id"/>
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
		return {districts: []}
	},

	handleSubmit: function () {

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
				<div className="container-fluid col-sm-12 col-lg-12 col-md-12">
		      <DistrictInput/>
		      <AddressInput/>
		      <DistroInput/>
	      	<Button type="submit" value="Post">Submit</Button>
	      </div>
	    </form>

		)
	}
});

var DistrictInput = React.createClass({
	getInitialState: function () {
		return {districts: []}
	},

	handleStateNameChange: function (e) {
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
	render: function() {
		// 
		return (
			<div className="form-group ui-widget ui-front">
				<StateSelector onChange={this.handleStateNameChange} />
				<DistrictsAutoSuggest
				  districts={this.state.districts}/>
			</div>
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
				className="state-selector">
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

var AddressInput = React.createClass({
	render: function () {
		return (
			<div className="form-group" id="address">
				<h3>Distribution Address</h3> 
				<p>leave blank if not applicable</p> 
				<Input 
					label="Contact Name"
					type="text"
					name="distribution[contact_name]"
					id="distribution_contact_name"
					/>
				<Input 
					label="Street"
					type="text"
					name="distribution[street]"
					id="distribution_street"
					/>
				<div className="col-sm-4 col-lg-4 col-md-4">
					<Input 
						label='City'
						type="text"
						name="distribution[city]"
						id="distribution_city"
						
						/>
				</div>
				<div className="col-sm-4 col-lg-4 col-md-4">
					<StateSelector className="col-sm-4"/>
				</div>
				<div className="col-sm-3 col-lg-3 col-md-3">
					<Input 
						label='Zip Code' 
						type="text"
						name="distribution[zip]"
						id="distribution_zip"
						className="col-sm-4"
						/>
					</div>
					<br/>
			</div>
		)
	}
})

var DistroInput = React.createClass({
	render: function () {
		return(
		<div className="form_group col-sm-12" id="info">
			<h3>Distribution Info</h3> 
		  <Input 	
		  	type="text"
		  	label="Creation Date" 
		  	name="distribution[creation_date]"
		  	id="creation_date"
		  	required/>
			<Input 
				type="text"
				label="Final Quote Id" 
				name="distribution[final_quote_id]"
				id="final_quote_id"
				required/>
			<Input 
				type="text"
				label="Po Number" 
				name="distribution[po_number]"
				id="po_number"
				required/>
		</div>
		)
	}
})

module.exports = DistributionModal