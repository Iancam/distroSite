# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/


$ ->
  $('#_remove').click ()-> 
    console.log "remove clicked"
    false

  $('#_add_order').click (link) ->
    $("#orders").after( () ->
      order_temp = $('#order').html()
      $(order_temp).removeAttr('id')
      $(order_temp).attr("class=order")
      order_temp)
    
    $('#_remove').click ()-> 
      console.log "remove clicked"
      $(this).parent().remove()

    $('#_add_IReady_Order').click (link) ->
      $("#groups").after( () ->
        temp = $('#iready_order').html()
        $(temp).removeAttr('id')
        $(temp).attr("class=iready_order")
        temp)

      $('#_remove').click ()->
        console.log "remove clicked"
        $(this).parent().remove()

    $('#_add_Ready_Order').click (link) ->
      $("#groups").after( () ->
        temp = $('#ready_order').html()
        $(temp).removeAttr('id')
        $(temp).attr("class=ready_order")
        temp)

      $('#_remove').click ()->
        console.log "remove clicked"
        $(this).parent().remove()