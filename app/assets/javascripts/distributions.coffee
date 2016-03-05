# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/




$ ->

  school_autocomplete = (data) ->
    a_data = 
      source: data
      minLength: 2
    $('#school_name').autocomplete(a_data)

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
      school_autocomplete(schoolNames)
    registerAddEl('_add_IReady_Order')
    registerAddEl('_add_Ready_Order')
    registerRemoveOnClick()

  registerAddEl = (id) ->
    $("##{id}").click (link) ->
      $("#groups").after( () ->
        template = $("##{id}").html()
        $(template).removeAttr('id')
        $(template).attr("class=#{id}")
        template)
      registerRemoveOnClick()

# addIreadyOrder = () ->
#   $('#_add_IReady_Order').click (link) ->
#     $("#groups").after( () ->
#       temp = $('#iready_order').html()
#       $(temp).removeAttr('id')
#       $(temp).attr("class=iready_order")
#       temp)
#     registerRemoveOnClick()

# addReadyOrder = () ->
#   $('#_add_Ready_Order').click (link) ->
#     $("#groups").after( () ->
#       temp = $('#ready_order').html()
#       $(temp).removeAttr('id')
#       $(temp).attr("class=ready_order")
#       temp)
#     registerRemoveOnClick()

  # substringMatcher = (strs) ->
  #   return (q, cb) ->
  #     matches = []
  #     substrRegex = new RegExp(q, 'i')
  #     $.each (i, str) ->
  #       if (substrRegex.test(str)) 
  #         matches.push str
  #     cb(matches)

  $('#state').change ->
      text = $.trim($('#state').val());
      $.ajax({
        type: "POST",
        url: "/distributions/districts"
        data: {state:{name: text}}
        dataType: "json"
        success: (data) ->
          # config = 
          #   hint: true,
          #   highlight: true,
          #   minLength: 2

          a_data =
            source: data
            minLength: 2

          $('#district_auto').autocomplete(a_data)
          return true
        error: (data) ->
          return true
        })

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


