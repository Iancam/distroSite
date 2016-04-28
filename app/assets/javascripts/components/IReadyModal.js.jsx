var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var Input = ReactBootstrap.Input;
var Button= ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;


var IReadyModal = React.createClass({
  getInitialState: function() {
    return {showModal:false, IReady: {}}
  },

  close: function() {
    this.setState({ showModal: false });
  },

  open: function() {
    this.setState({ showModal: true });
  },
  
  handleIReadySubmit: function (IReady) {
    $.ajax({
      url: this.props.url,
      type: "post",
      dataType: 'json',
      cache: false,
      data: IReady,
      success: function(data) {
        this.props.onAlert({
          message:"IReady Form successfully submitted",
          style:"success"
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        this.props.onAlert({
          message:"IReady Form failed to submit",
          style:"warning"
        });
      }.bind(this)
    });
    this.close()
  },
  render: function() {
    return (
      <div>
        <Button
          bsStyle="primary"
          onClick={this.open}>
            Add I-Ready User
        </Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>I-Ready User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <IReadyForm 
              authenticity_token={this.props.authenticity_token} 
              onSubmit={this.handleIReadySubmit}
              schools={this.props.schools}
              distribution={this.props.distribution}
              />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>

    )
  }
})

var IReadyForm = React.createClass({
  getInitialState: function() {
    
    return {
      school:this.props.schools[0][0],
      contact_name:"",
      subject:"",
      toolbox: false,
      enrollment: this.props.schools[0][2]
    }
  },
  handleToolboxYesChange: function(e){
    this.setState({toolbox: true})
  },
  handleToolboxNoChange: function(e){
    this.setState({toolbox:false})
  },
  handleSchoolChange: function(e){
    index = e.target.value
    schools = this.props.schools
    this.setState({school: schools[index][0]})
    enrollment = schools[index][2]
    this.setState({enrollment: enrollment})
  },
  handleContactNameChange: function(e){
    this.setState({contact_name: e.target.value})
  },
  handleSubjectChange: function(e){
    this.setState({subject: e.target.value})
  },
  handleEnrollmentChange: function(e){
    this.setState({enrollment: e.target.value})
  },
  handleSubmit: function(e){
    e.preventDefault()
    var distrbution= this.props.distrbution
    var school=this.state.school
    var contact_name=this.state.contact_name
    var subject=this.state.subject
    var toolbox=this.state.toolbox
    var enrollment=this.state.enrollment
    iready = {
      distribution: {id:this.props.distribution},
      school: school,
      contact_name: contact_name,
      i_ready_orders:{
        subject: subject,
        toolbox: toolbox,
        enrollment: enrollment
      }
    }
    this.props.onSubmit(iready)

  },
  render: function () {
    var schoolOptions = this.props.schools.map(function(school, index){
      return <option key={school} value={index}>{school[1]}</option>
    })
    return ( 
      <form 
        acceptCharset="UTF-8" 
        method="post" 
        onSubmit={ this.handleSubmit }>
        <Input
          type="select" 
          onChange={this.handleSchoolChange}
          label="School Name">
          {schoolOptions}
        </Input>
        <Input
          type="text" 
          onChange={this.handleContactNameChange}
          label="Contact Name"/>
        <Input
          type="select" 
          onChange={this.handleSubjectChange}
          label="Subject">
          <option value="math">Math</option>
          <option value="reading">Reading</option>
          <option value="math & reading"> Math & Reading</option>
        </Input>
        <h5>Toolbox For I-Ready</h5>
        <Input 
          label="Yes"
          type="checkbox" 
          onChange={this.handleToolboxYesChange}
          checked={this.state.toolbox}
          />
        <Input 
          label="No"
          type="checkbox" 
          onChange={this.handleToolboxNoChange}
          checked={!this.state.toolbox}
          />
        <Input
          type="number" 
          onChange={this.handleEnrollmentChange}
          value={this.state.enrollment}
          label="Enrollment"/>
        <Button 
          className="form-group" 
          type="submit" 
          value="Post">
          Submit
        </Button>
      </form>
    )
  }
})

module.exports = IReadyModal