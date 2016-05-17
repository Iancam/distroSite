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
  const selection = "grade_"+grade+"_"+group+"_product"

  return(
    <Input
      onChange={onChange.bind(null, subject, grade, group)}
      type="select"
      value={gradeDistribution[selection]}
      label="Product Type"
    >
      {optionNodes}
    </Input>
  )
}

module.exports = ProductDropdown