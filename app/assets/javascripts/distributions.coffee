# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
ReactDOM = require('react-dom');
React  = require('react');
DistributionModal = require('./components/distribution_form');
Distributions = require('./components/your_distributions')
ready = ->
  $ ->
    
    #MARK: index
    #MARK: React
    #MARK: disribution form
    ReactDOM.render(
      <Distributions 
      url="/distributions"
      authenticity_token={$('meta[name=csrf-token]').attr('content')}/>, 
        document.getElementById('distributionForm')
      )

    # $('#distribution_creation_date').datepicker();

    #MARK: distribution modal
    

    #add school information to end_user_modal
    $(".end_user").click ->
      #get the data from the link
      schools = $(this).data('schools')
      $('.school').empty()
      #use the data to render the schools selector
      for arr in schools
        id = arr[0] 
        name = arr[1] 
        $('.school').append("<option value='#{id}'>#{name}</option>")
      
      #use data to add hidden field with distribution id
      distribution_id = $(this).data('distribution')
      $(".distribution_id").val(distribution_id)

    #submit new ready user
    $("#submit_ready").click ->
      console.log "registered submit_ready"
      $("#new_ready").submit()
    #submit new Iready user
    $("#submit_iready").click ->
      console.log "registered submit_iready"
      $("#new_iready").submit()

    #MARK: distribution form 
  

  
$(document).ready(ready)
$(document).on('page:load', ready)

  


