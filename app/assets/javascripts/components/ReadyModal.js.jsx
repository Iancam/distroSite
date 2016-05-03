var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var _     = require("lodash")
var Input = ReactBootstrap.Input;
var Button= ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var Tab   = ReactBootstrap.Tab
var Tabs  = ReactBootstrap.Tabs
var Col   = ReactBootstrap.Col 
var Row   = ReactBootstrap.Row



var ReadyModal = React.createClass({
  getInitialState: function() {
    return {showModal:false}
  },

  close: function() {
    this.setState({ showModal: false });
  },

  open: function() {
    this.setState({ showModal: true });
  },

  handleReadySubmit: function (Ready) {
    Ready.distribution = {id:this.props.distribution}
    console.log(Ready)
    $.ajax({
      type: "Post",
      url: this.props.url,
      dataType: "json",
      data: Ready,
      success: function (data) {
        // this.props.handleNewDistribution(data)
        this.props.onAlert({
          message:"Ready Form successfully submitted",
          style:"success"
        });

      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString())
        this.props.onAlert({
          message:"Ready Form failed to submit",
          style:"warning"
        });
      }.bind(this)
    })
    this.close()
  },
  render: function() {
    return (
      <div>
        <Button
          bsStyle="primary"
          onClick={this.open}>
            Add Ready User
        </Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Ready User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReadyForm  
              authenticity_token={this.props.authenticity_token} 
              onSubmit={this.handleReadySubmit}
              schools={this.props.schools}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>

    )
  }
})

var ReadyForm = React.createClass({
  getInitialState: function() {
    init = {
      tab_key:"Math",
      school:"",
      contact_name:"",
      Math:{
        hasBeenEdited:true,
        grade_k_teacher:0,
        grade_k_student:0,
        toolbox:0
      },
      Reading:{
        hasBeenEdited:false,
        grade_k_teacher:0,
        grade_k_student:0,
        toolbox:0
      },
      Writing:{
        hasBeenEdited:false,
        grade_k_teacher:0,
        grade_k_student:0,
        toolbox:0
      }
    }
    for (var i = 1; i < 9; i++) {
      init.Math["grade_"+i+"_teacher"] = 0
      init.Math["grade_"+i+"_student"] = 0
      init.Reading["grade_"+i+"_teacher"] = 0
      init.Reading["grade_"+i+"_student"] = 0
      init.Writing["grade_"+i+"_teacher"] = 0
      init.Writing["grade_"+i+"_student"] = 0
    }

    return init
  },
  
  handleSchoolChange: function(e){
    this.setState({school: e.target.value})
  },
  handleContactNameChange: function(e){
    this.setState({contact_name: e.target.value})
  },
  handleSubjectChange: function(e){
    this.setState({subject: e.target.value})
  },

  handleSubmit: function(e){
    e.preventDefault()
    order = {
          school:this.state.school,
          contact_name:this.state.contact_name,
          ready_orders:{
            Math:this.state.Math,
            Reading:this.state.Reading,
            Writing:this.state.Writing
          }
        }
    this.props.onSubmit(order)
  },

  handleTabSelect(key) {
    currentTab = this.state.tab_key
    currentGrades = _.assign({}, this.state[currentTab])
    hasBeenEdited = this.state[key].hasBeenEdited
    if (!hasBeenEdited) {
      this.setState({[key]:currentGrades})
    }

    this.setState({tab_key:key});
  },
  handleStudentChange(subject, grade, units){
    order = this.state[subject] 
    order["grade_"+grade+"_student"]=units
    this.setState({[subject]:order},function(){console.log(this.state)})
    
  },
  handleTeacherChange(subject, grade, units){
    order = this.state[subject] 
    order["grade_"+grade+"_teacher"]=units
    this.setState({[subject]:order})
  },
  handleToolboxChange(subject, units){
    order = this.state[subject]
    order["toolbox"] = units
    this.setState({[subject]:order})
  },
  render: function () {
    var schoolOptions = [<option key={0} value="">N/A</option>]
    schoolOptions.push(this.props.schools.map(function (school) {
      return (
        <option key={school[0]} value={school[0]}>{school[1]}</option>
      )
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
          label="Contact Name"
          required/>

        <Tabs activeKey={this.state.tab_key} onSelect={this.handleTabSelect} id="controlled-tab-example">
          <Tab eventKey="Math" title="Math">
            <GradeDistribution 
              gradeDistribution={this.state.Math}
              grades= {['k',1,2,3,4,5,6,7,8]}
              onStudentChange={this.handleStudentChange.bind(null,"Math")}
              onTeacherChange={this.handleTeacherChange.bind(null,"Math")}
              onToolboxChange={this.handleToolboxChange.bind(null,"Math")}/>
          </Tab>
          <Tab eventKey="Reading" title="Reading">
            <GradeDistribution 
              gradeDistribution={this.state.Reading}
              grades= {['k',1,2,3,4,5,6,7,8]}
              onStudentChange={this.handleStudentChange.bind(null,"Reading")}
              onTeacherChange={this.handleTeacherChange.bind(null,"Reading")}
              onToolboxChange={this.handleToolboxChange.bind(null,"Reading")}/>
          </Tab>
          <Tab eventKey="Writing" title="Writing">
            <GradeDistribution 
              gradeDistribution={this.state.Writing}
              grades= {[2,3,4,5]}

              onStudentChange={this.handleStudentChange.bind(null,"Writing")}
              onTeacherChange={this.handleTeacherChange.bind(null,"Writing")}
              onToolboxChange={this.handleToolboxChange.bind(null,"Writing")}/>
          </Tab>
        </Tabs>
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

GradeDistribution = React.createClass({
  handleStudentChange(number, e){
    this.props.onStudentChange(number, e.target.value)
  },
  handleTeacherChange(number, e){
    this.props.onTeacherChange(number, e.target.value)
  },
  handleToolboxChange(e){
    this.props.onToolboxChange(e.target.value)
  },
  render: function(){
    var students = this.props.grades.map( function(grade,index){
      return (
      <Input
        key={index}
        value={this.props.gradeDistribution["grade_"+grade+"_student"]}
        type="number"
        onChange={this.handleStudentChange.bind(null, grade)}
        label={"GR."+grade+" Student Units"} />
      )
    }.bind(this))

    var teachers = this.props.grades.map( function(grade,index){
      return (
      <Input
        key={index}
        value={this.props.gradeDistribution["grade_"+grade+"_teacher"]}
        type="number"
        onChange={this.handleStudentChange.bind(null, grade)}
        label={"GR."+grade+" Teacher Units"} />
      )
    }.bind(this))

      

    return( 
      <div className="GradeDistribution form-group">
        <Row>
          <Col sm={6} md={6} lg={6}>
            {students}
          </Col>
          <Col sm={6} md={6} lg={6}>
            {teachers}
            <Input
              key="Toolbox"
              value={this.props.gradeDistribution["toolbox"]}
              type="number"
              onChange={this.handleToolboxChange}
              label="Teacher Toolbox" />
          </Col>
        </Row>
      </div>
    )
  }
})

module.exports = ReadyModal