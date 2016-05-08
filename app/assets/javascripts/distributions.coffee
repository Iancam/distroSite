# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
ReactDOM = require('react-dom');
React  = require('react');
Distributions = require('./components/your_distributions')
DistributionDetail = require("./components/DistributionDetailPage")
ready = ->
  $ ->
    
    distributionEl = document.getElementById('distribution')
    distributionsEl = document.getElementById('distributions')
    if (distributionEl)
      console.log distributionEl
      ReactDOM.render(
        <DistributionDetail 
          url="/distributions"
          authenticity_token={$('meta[name=csrf-token]').attr('content')}/>,
        distributionEl
      )
    else if (distributionsEl)
      console.log distributionsEl
      ReactDOM.render(
        <Distributions 
          url="/distributions"
          authenticity_token={$('meta[name=csrf-token]').attr('content')}/>,
        distributionsEl
      )
      
    

  
$(document).ready(ready)
$(document).on('page:load', ready)

  


