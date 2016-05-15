const React = require("react")
ToolboxOptionNodes = (subject) => {
  const subjectToolboxOptionMap={
                                  '':["None"],
                                  "math": ["None", "Math Toolbox"],
                                  "reading": ["None", "Reading Toolbox"],
                                  "math & reading": ["None", "Math Toolbox", "Reading Toolbox", "Math & Reading Toolbox"]};
  const toolboxOptionNodes = subjectToolboxOptionMap[subject.toLowerCase()].map((option, index)=>{
    return <option key={index} value={option}>{option}</option>
  })
  return toolboxOptionNodes
}

module.exports = ToolboxOptionNodes