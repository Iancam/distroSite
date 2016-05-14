const React = require('react')
const stateOptions = [["","N/A"],["AL","Alabama"],["AK","Alaska"],["AZ","Arizona"],["AR","Arkansas"],["CA","California"],["CO","Colorado"],["CT","Connecticut"],["DE","Delaware"],["FL","Florida"],["GA","Georgia"],["HI","Hawaii"],["ID","Idaho"],
                          ["IL","Illinois"],["IN","Indiana"],["IA","Iowa"],["KS","Kansas"],["KY","Kentucky"],["LA","Louisiana"],["ME","Maine"],["MD","Maryland"],["MA","Massachusetts"],["VA","Virginia"],["MI","Michigan"],["WA","Washington"],
                          ["MN","Minnesota"],["WV","West Virginia"],["MS","Mississippi"],["WI","Wisconsin"],["MO","Missouri"],["WY","Wyoming"],["MT","Montana"],["NE","Nebraska"],["NV","Nevada"],["NH","New Hampshire"],["NJ","New Jersey"],["NM","New Mexico"],
                          ["NY","New York"],["NC","North Carolina"],["ND","North Dakota"],["OH","Ohio"],["OK","Oklahoma"],["OR","Oregon"],["PA","Pennsylvania"],["RI","Rhode Island"],["SC","South Carolina"],["SD","South Dakota"],["TN","Tennessee"],["TX","Texas"],
                          ["UT","Utah"],["VT","Vermont"]].map(function(state, index){
                            return <option key={index} value={state[0]}>{state[1]}</option>
                            })
module.exports = stateOptions