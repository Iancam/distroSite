# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
ReactDOM = require('react-dom');
React  = require('react');
Distributions = require('./components/Distributions')
ready = ->
  $ ->
    console.log "in distribution"
    showUserDistributions = document.getElementById('distributions')
    
    if (showUserDistributions)
      ReactDOM.render(
        <Distributions
          url="/distributions"
          authenticity_token={$('meta[name=csrf-token]').attr('content')}/>,
        showUserDistributions
      )
      
    

  
$(document).ready(ready)
$(document).on('page:load', ready)

  


