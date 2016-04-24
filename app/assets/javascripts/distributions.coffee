# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
ReactDOM = require('react-dom');
React  = require('react');
DistributionModal = require('./components/distribution_form');

ready = ->
  $ ->
    
    #MARK: index
    #MARK: React
    #MARK: disribution form
    ReactDOM.render(
      <DistributionModal 
      url="/distributions"
      authenticity_token={$('meta[name=csrf-token]').attr('content')}/>, 
        document.getElementById('distributionForm')
      )

    $('#distribution_creation_date').datepicker();

    #MARK: distribution modal
    #get district data from server, use in district auto complete
    $('#state').change ->
      text = $.trim($('#state').val())
      $.ajax({
        type: "POST",
        url: "/distributions/districts"
        data: {state:{name: text}}
        dataType: "json"
        success: (data) ->
          a_data =
            source: data
            minLength: 2

          $('#district_auto').autocomplete(a_data)
          return true
        error: (data) ->
          return true
        })

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

    #add district_id to distribution form
    $("#district_auto").focusout( ->
      data = $('#district_form').serializeArray();
      $.ajax({
        type: "POST"
        url: "/distributions/district_id"
        data: data
        success: ->
          #add district id to distribution form
          $('#address').before("<input type='hidden' id='district_id' name='district[id]' value='#{data[0]}'/>")

        error: ->
          console.log "failure"
      }))

    # process the creation of a new distribution
    $("#submit_distribution").click ->
      $("#new_distribution").submit();
      

    #MARK: distribution form 
    registerRemoveOnClick = () ->
      $('#_remove').click ()->
        $(this).parent().remove()
    
    addOrder = (schoolNames) ->
      $('#_add_order').click (link) ->
        $("#orders").after( () ->
          console.log $("#orders")
          order_temp = $('#order').html()
          $(order_temp).removeAttr('id')
          $(order_temp).attr("class=order")
          order_temp)
        # school_autocomplete(schoolNames)
        # new select option with schoolNames
        for name in schoolNames
          $('#school').append("<option value='#{name}'>#{name}</option>")
        
        addIreadyOrder()
        addReadyOrder()
        registerRemoveOnClick()

    $(document).ajaxSuccess (event, jqXHR, ajaxOptions, data) ->
      if ajaxOptions.url.endsWith("district_id")
        console.log data
        #check if distribution already in place
        if not $('#district_form').next('#new_distribution').length
          distribution_form = $('#distribution').html() 
          $('#district_form').after(distribution_form)
          $('#address').before("<input type='hidden' id='district_id' name='district[id]' value='#{data[0]}'/>")
          addOrder(data[1])
        else
          $("#district_id").val(data[0])

    

    addIreadyOrder = () ->
      $('#_add_IReady_Order').click (link) ->
        #if group already there, add after group
        if $(".iready_order, .ready_order").length > 0
          console.log $(".iready_order, .ready_order")
          $(".iready_order, .ready_order").last().after( ()->
            temp = $('#iready_order').html()
            $(temp).removeAttr('id')
            $(temp).attr("class=iready_order")
            temp)
        else 
          $("#groups").after( () ->
            temp = $('#iready_order').html()
            $(temp).removeAttr('id')
            $(temp).attr("class=iready_order")
            temp)
        registerRemoveOnClick()

    addReadyOrder = () ->
      $('#_add_Ready_Order').click (link) ->
        $("#groups").after( () ->
          temp = $('#ready_order').html()
          $(temp).removeAttr('id')
          $(temp).attr("class=ready_order")
          temp)
        registerRemoveOnClick()
  
$(document).ready(ready)
$(document).on('page:load', ready)

  


