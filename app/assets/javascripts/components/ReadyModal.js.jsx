var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var _     = require("lodash")
var update = require("react-addons-update")
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
    this.props.onSubmit(Ready)    
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
              distribution={this.props.distribution}
              authenticity_token={this.props.authenticity_token} 
              onSubmit={this.handleReadySubmit}
              schools={this.props.schools}
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

var ReadyForm = React.createClass({
  getInitialState: function() {
    init = {
      tab_key:"Math",
      school:"",
      contact_name:"",
      Math:{
        hasBeenEdited:true,
        toolbox:0
      },
      Reading:{
        hasBeenEdited:false,
        toolbox:0
      },
      Writing:{
        hasBeenEdited:false,
        toolbox:0
      }
    }

    for (subject of ["Math", "Reading", "Writing"]){
      for (grade of ['k',1,2,3,4,5,6,7,8]){
        init[subject]['grade_'+grade+'_student'] = {number:0,product:'Instruction'} 
        init[subject]['grade_'+grade+'_teacher'] = {number:0,product:'Instruction'} 
      }
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
          distribution_id:this.props.distribution,
          school:this.state.school,
          contact_name:this.state.contact_name,
          Math:this.state.Math,
          Reading:this.state.Reading,
          Writing:this.state.Writing
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

  handleUnitsChange(subject, grade, group, units){
    selection = "grade_"+grade+"_"+group
    const newState = update(this.state,
      {[subject]: {[selection]: {"number": {$set: units.target.value}}}})
    this.setState(newState)
  },

  handleProductTypeChange(subject, grade, group, event){
    const selection = "grade_"+grade+"_"+group
    newState = update(this.state,
      {[subject]: {[selection]: {"product": {$set: event.target.value}}}})

    this.setState(newState)

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
              subject="Math" 
              gradeDistribution={this.state.Math}
              grades= {['k',1,2,3,4,5,6,7,8]}
              onUnitsChange={this.handleUnitsChange.bind(null, "Math")}
              onToolboxChange={this.handleToolboxChange.bind(null,"Math")}
              onProductTypeChange={this.handleProductTypeChange}/>
          </Tab>
          <Tab eventKey="Reading" title="Reading">
            <GradeDistribution
              subject="Reading" 
              gradeDistribution={this.state.Reading}
              grades= {['k',1,2,3,4,5,6,7,8]}
              onUnitsChange={this.handleUnitsChange.bind(null, "Reading")}
              onToolboxChange={this.handleToolboxChange.bind(null,"Reading")}
              onProductTypeChange={this.handleProductTypeChange}/>
          </Tab>
          <Tab eventKey="Writing" title="Writing">
            <GradeDistribution 
              subject="Writing"
              gradeDistribution={this.state.Writing}
              grades= {[2,3,4,5]}
              onUnitsChange={this.handleUnitsChange.bind(null, "Writing")}
              onToolboxChange={this.handleToolboxChange.bind(null,"Writing")}
              onProductTypeChange={this.handleProductTypeChange}/>
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
  handleToolboxChange(e){
    this.props.onToolboxChange(e.target.value)
  },
  handleStudentProductTypeChange(subject, grade, group, event){
    this.props.onProductTypeChange(subject, grade, group, event);
    this.props.onProductTypeChange(subject, grade, "teacher", event);
    ;
  },
  render: function(){
    //group is either teacher or student
    var students = this.props.grades.map( function(grade,index){
      return <GradeNode
                key={index}
                grade={grade}
                index={index}
                group="student"
                subject={this.props.subject}
                onUnitsChange={this.props.onUnitsChange}
                onProductTypeChange={this.handleStudentProductTypeChange}
                gradeDistribution={this.props.gradeDistribution}
                />
    }.bind(this))
    var teachers = this.props.grades.map(function(grade, index){
      return <GradeNode
                key={index}
                grade={grade}
                index={index}
                group="teacher"
                subject={this.props.subject}
                onUnitsChange={this.props.onUnitsChange}
                onProductTypeChange={this.props.onProductTypeChange}
                gradeDistribution={this.props.gradeDistribution}                
                />
    }.bind(this))
    return( 
      <div className="GradeDistribution form-group">
        <Row>
          <Col sm={6} md={6} lg={6}>
            <h3>Students</h3>
            {students}
          </Col>
          <Col sm={6} md={6} lg={6}>
            <h3>Teachers</h3>
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

const GradeNode = ({
  grade,
  index,
  group,
  subject,
  onUnitsChange,
  onProductTypeChange,
  gradeDistribution}) => {
  return (
    <Row key={index}>
      <Col sm={5} md={5} lg={5}>
        <Input
        value={gradeDistribution["grade_"+grade+"_"+group]["number"]}
        type="number"
        onChange={onUnitsChange.bind(null, grade, group)}
        label={"GR."+grade.toString().toUpperCase()+" Units"} />
      </Col>
      <Col sm={5} md={5} lg={5}>
        <ProductDropdown
          onChange={onProductTypeChange}
          gradeDistribution={gradeDistribution}
          subject={subject}
          grade={grade} 
          group={group}
       /></Col>
    </Row>
  )
}

const ProductDropdown = ({onChange, gradeDistribution, subject, grade, group}) => {
  const options = {
                Math: [
                        "Instruction",
                        "Assessment",
                        "Practice and Problem Solving",
                        "Instruction + Assessment",
                        "Instruction + Practice",
                        "Instruction + Practice + Assessment"
                        ],
                Reading: [
                        "Instruction",
                        "Assessment",
                        "Instruction + Assessment"
                        ],
                Writing: [
                        "Instruction"
                        ]
                }
  const optionNodes = options[subject].map((option, index) =>{
    return <option key={index} value={option}>{option}</option>
  }) 
  const selection = "grade_"+grade+"_"+group

  return(
    <Input
      onChange={onChange.bind(null, subject, grade, group)}
      type="select"
      value={gradeDistribution[selection]['product']}
      label="Product Type"
    >
      {optionNodes}
    </Input>
  )
}
  


module.exports = ReadyModal