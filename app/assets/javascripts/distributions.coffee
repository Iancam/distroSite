# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/


ready = ->
  $ ->



    # school_autocomplete = (data) ->
    #   a_data = 
    #     source: data
    #     minLength: 2
    #   $('#school_name').autocomplete(a_data)


    substringMatcher = (id, strs) ->
      return (q, cb) ->
        matches = []
        substrRegex = new RegExp(q, 'i')
        $.each strs, (i, str) ->
          if (substrRegex.test(str)) 
            matches.push str
        cb(id, matches)
    
    # updateList = (id, matches) ->
    #   if $(identifier).val().length > 2
    #     #add an autocomplete list
    #     $(id).after('<ul id="res"></ul>')

    #   # if list has been drawn, update results
    #   # if list not drawn, draw matches

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

    # $('#school').change ->
    #   text = $.trim($('#school').val())
    #   $.ajax({
    #     type: "POST",
    #     url: "/distributions/school_id"
    #     data: {state:{name: text}}
    #     dataType: "json"
    #     success: (data) ->
    #       a_data =
    #         source: data
    #         minLength: 2

    #       $('#district_auto').autocomplete(a_data)
    #       return true
    #     error: (data) ->
    #       return true
    #     })

    $(document).ajaxSuccess (event, jqXHR, ajaxOptions, data) ->
      if ajaxOptions.url.endsWith("district_id")
        console.log data
        #check if distribution already in place
        if not $('#district_form').next('#new_distribution').length
          distribution_form = $('#distribution').html() 
          $('#district_form').after(distribution_form)
          $('#address').before("<input type='hidden' id='district_id' name='district[id]' value='#{data[0]}'/>")
          $('#distribution_creation_date').datepicker();
          addOrder(data[1])
        else
          $("#district_id").val(data[0])

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

  


