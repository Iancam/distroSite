var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var Editable = require("./Editable")
var _ = require("lodash")
var update = require('react-addons-update');
var Table = ReactBootstrap.Table;
var Button = ReactBootstrap.Button;


var DistributionDetail = React.createClass({
  render: function () {
    if (this.props.show_detail) {
      return (
        <tr><td colSpan="8">
          <ReadyUsers 
          distribution_index={this.props.index}
          data={this.props.ready_users}
          schools={this.props.schools}
          onConfirmEdit={this.props.onConfirmReadyEdit}/>
          <IReadyUsers 
          distribution_index={this.props.index}
          data={this.props.i_ready_users}
          schools={this.props.schools}
          onConfirmEdit={this.props.onConfirmIReadyEdit}/>
        </td></tr>
      )
    } else {
      return <tr style={{display:"none"}}></tr>
    }    
  }
})

var ReadyUsers = React.createClass({
  getInitialState: function () {
    var show_teacher_units = (new Array(this.props.data.length)).map(()=>false);
    var show_student_units = (new Array(this.props.data.length)).map(()=>false);

    return {
            show_teacher_units: show_teacher_units,
            show_student_units: show_student_units,
           }
  },
  toggleShowStudentUnits:function(index) {
    var newVal = !this.state.show_student_units[index];
    newState = update(this.state, {show_student_units: {[index]: {$set: newVal}}})
    this.setState(newState)
  },
  toggleShowTeacherUnits:function(index) {
    console.log(index)
    var newVal = !this.state.show_teacher_units[index];
    newState = update(this.state, {show_teacher_units: {[index]: {$set: newVal}}})
    this.setState(newState)
  },

  render: function () {
    var ReadyUsers = []
    for (var i = 0; i < this.props.data.length; i++) {
      console.log(this.props.data)
      var ready = this.props.data[i]
      ReadyUsers.push(
              <ReadyUser
                key={i}
                index= {i}
                show_student_units={this.state.show_student_units[i]}
                show_teacher_units={this.state.show_teacher_units[i]}
                distribution_index={this.props.distribution_index}
                schools={this.props.schools} 
                data={ready}
                onConfirmEdit={this.props.onConfirmEdit}
                toggleShowStudentUnits={this.toggleShowStudentUnits.bind(null, i)}
                toggleShowTeacherUnits={this.toggleShowTeacherUnits.bind(null, i)}
              />)
      ReadyUsers.push(<Units
        show_detail={this.state.show_student_units[i]}
        type="student"
        key={i+.1}
        index={i}
        distribution_index={this.props.distribution_index}
        data={ready}
        onConfirmEdit={this.props.onConfirmEdit}
      />)
      ReadyUsers.push(<Units
        show_detail={this.state.show_teacher_units[i]}
        type='teacher' 
        key={i+.2}
        index={i}
        distribution_index={this.props.distribution_index}
        data={ready}
        onConfirmEdit={this.props.onConfirmEdit}
      />)
    } 
    // s
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>School</th>
            <th>Contact</th>
            <th>Subject</th>
            <th>Student Units</th>
            <th>Teacher Units</th>
          </tr>
        </thead>
        <tbody>
          {ReadyUsers}
        </tbody>
      </Table>

      )
  }
})

var IReadyUsers = React.createClass({
  render: function () {
    
    var IReadyUsers = this.props.data.map((user, index)=>{
      return (<IReadyUser
                key={index}
                index={index}
                distribution_index={this.props.distribution_index}
                schools={this.props.schools} 
                data={user}
                onConfirmEdit={this.props.onConfirmEdit}
              />)
    })

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>School</th>
            <th>Contact</th>
            <th>Subject</th>
            <th>Enrollment</th>
            <th>Enrollment tier</th>
            <th>iready item number/sku</th>
            <th>toolbox item #</th>
          </tr>
        </thead>
        <tbody>
          {IReadyUsers}
        </tbody>
      </Table>
      )
  }
})

function schoolOptionsFrom(schools){
  var schoolOptions = [<option key={0} value="">N/A</option>]
  schoolOptions.push(schools.map(function (school) {
    return (
      <option key={school[0]} value={school[0]}>{school[1]}</option>
    )
  }))
  return schoolOptions
}

var ReadyUser = React.createClass({
  render: function () {
    schoolOptions = schoolOptionsFrom(this.props.schools)
    var subjectOptions = ["","math","reading","writing"].map((subject, index)=>{
      return <option key={index} value={subject}>{subject}</option>
    })
    console.log (this.props.schools)
    return(
        //school
        <tr>
          <td><Editable
            type="select"
            value={this.props.data.school.name}
            onConfirmEdit={this.props.onConfirmEdit.bind(null,
                                                        this.props.distribution_index,
                                                        this.props.index,
                                                        "school_id")}
            >
            {schoolOptions}
          </Editable></td>


          {/*// Contact Name*/}
          <td><Editable
            type="text"
            value={this.props.data.contact_name}
            onConfirmEdit={this.props.onConfirmEdit.bind(null,
                                                          this.props.distribution_index,
                                                          this.props.index,
                                                          "contact_name")}
            /></td>
          {/*// subject*/}
          <td><Editable
            type="select"
            value={this.props.data.subject}
            onConfirmEdit={this.props.onConfirmEdit.bind(null,
                                                          this.props.distribution_index,
                                                          this.props.index,
                                                          "subject")}
           >
           {subjectOptions}
          </Editable></td>
          <td><Button
                onClick={this.props.toggleShowStudentUnits}>
            {(this.props.show_student_units)? "Hide Student Units": "Show Student Units"}
          </Button></td>
          <td><Button
                onClick={this.props.toggleShowTeacherUnits}>
            {(this.props.show_teacher_units)? "Hide Teacher Units": "Show Teacher Units"}
          </Button></td>
        </tr>
        )
  }
})

var IReadyUser = React.createClass({
  render: function () {
    var schoolOptions = schoolOptionsFrom(this.props.schools)
    var subjectOptions = ["","math","reading"].map((subject, index)=>{
      return <option key={index} value={subject}>{subject}</option>
    })

    return( 
        //school
        <tr>
          <td><Editable
            type="select"
            value={this.props.data.school.name}
            onConfirmEdit={this.props.onConfirmEdit.bind(null,
                                                    this.props.distribution_index,
                                                    this.props.index,
                                                    "school_id")}
            >
            {schoolOptions}
          </Editable>
          </td>

          {/*Contact Name*/}
          <td><Editable
            type="text"
            value={this.props.data.contact_name}
            onConfirmEdit={this.props.onConfirmEdit.bind(null,
                                                    this.props.distribution_index,
                                                    this.props.index,
                                                    "contact_name")} 
          /></td>
          {/*subject*/}
          <td><Editable
            type="select"
            value={this.props.data.subject}
            onConfirmEdit={this.props.onConfirmEdit.bind(null,
                                                    this.props.distribution_index,
                                                    this.props.index,
                                                    "subject")} 
          >
          {subjectOptions}
          </Editable></td>

          {/* "toolbox"*/}
          <td><Editable
            type="select"
            value={this.props.data.toolbox}
            onConfirmEdit={this.props.onConfirmEdit.bind(null,
                                                    this.props.distribution_index,
                                                    this.props.index,
                                                    "toolbox")} 
          /></td>

          {/* "enrollment"*/}
          <td><Editable
            type="number"
            value={this.props.data.enrollment}
            onConfirmEdit={this.props.onConfirmEdit.bind(null,
                                                    this.props.distribution_index,
                                                    this.props.index,
                                                    "enrollment")} 
          /></td>

        </tr>
        )
  }
})

var Units = React.createClass({
  render: function(){
    var grades = ['k',1,2,3,4,5,6,7,8]
          var type = this.props.type

    gradeNodes = grades.map(function(grade, index){

      var gradeName = "grade_"+grade+"_"+this.props.type
      return (
        <td
        key={index}>
          <Editable 
            value={this.props.data[gradeName]}
            type="number"
            onConfirmEdit={this.props.onConfirmEdit.bind(null,
                                                        this.props.distribution_index,
                                                        this.props.index,
                                                        gradeName)}
          />
        </td>
      )
    }.bind(this))
    var headerNodes = grades.map(function(grade, index){
      return (<th key={index}>{"GR. "+grade.toString().toUpperCase()}</th>)
    })
    if (this.props.show_detail) {
      return(
        <tr >
          <td colSpan="8">
          <h4>{type.charAt(0).toUpperCase() + type.slice(1)}</h4>
          <Table>
            <thead>
              <tr>
                {headerNodes}
              </tr>
            </thead>
            <tbody>
              <tr>
                {gradeNodes}
              </tr>
            </tbody>
          </Table>
          </td>
          
        </tr>
      )
    } else {
      return null
    }
    
  }
})



module.exports = DistributionDetail