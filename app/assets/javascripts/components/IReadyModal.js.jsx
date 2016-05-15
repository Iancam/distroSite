const React = require("react");
const ReactBootstrap = require("react-bootstrap");
const ToolboxOptionNodes = require("./ToolboxOptionNodes")
const Input = ReactBootstrap.Input;
const Button= ReactBootstrap.Button;
const Modal = ReactBootstrap.Modal;

const IReadyModal = React.createClass({
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
    this.props.onSubmit(IReady)
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
            <Modal.Title>i-Ready User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <IReadyForm 
              authenticity_token={this.props.authenticity_token} 
              onSubmit={this.handleIReadySubmit}
              schools={this.props.schools}
              distribution_id={this.props.distribution_id}
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
      school:"",
      contact_name:"",
      subject:"",
      toolbox: 'none',
      enrollment: this.props.schools[0][2]
    }
  },
  
  handleToolboxChange: function(e){
    this.setState({toolbox: e.target.value})
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
    var school=this.state.school
    var contact_name=this.state.contact_name
    var subject=this.state.subject
    var toolbox=this.state.toolbox
    var enrollment=this.state.enrollment
    iready = {
      distribution_id: this.props.distribution_id,
      school: school,
      contact_name: contact_name,
      subject: subject,
      toolbox: toolbox,
      enrollment: enrollment
    }
    this.props.onSubmit(iready)

  },
  render: function () {
    const schoolOptions = [<option key={0} value="">N/A</option>]
    schoolOptions.push(this.props.schools.map(function(school, index){
      return <option key={school} value={index}>{school[1]}</option>
    }))
    return ( 
      <form 
        acceptCharset="UTF-8" 
        method="post" 
        onSubmit={ this.handleSubmit }>
        <Input
          type="select" 
          onChange={this.handleSchoolChange}
          label="School Name"
          required>
          {schoolOptions}
        </Input>
        <Input
          type="text" 
          onChange={this.handleContactNameChange}
          label="Contact Name"/>
        <Input
          type="select" 
          onChange={this.handleSubjectChange}
          label="Subject"
          required>
          <option value="">N/A</option>
          <option value="math">Math</option>
          <option value="reading">Reading</option>
          <option value="math & reading"> Math & Reading</option>
        </Input>
        <Input
          type="select" 
          onChange={this.handleToolboxChange}
          label="Toolbox For i-Ready"
          required>
          {ToolboxOptionNodes(this.state.subject)}
        </Input>
        <Input
          type="number" 
          onChange={this.handleEnrollmentChange}
          value={this.state.enrollment}
          label="Enrollment"
          required/>

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