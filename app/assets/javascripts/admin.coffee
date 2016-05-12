# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
ReactDOM = require('react-dom');
React  = require('react');
Distributions = require('./components/Distributions')

ready = ->
  $ ->
	showAll = document.getElementById('show_all_distributions')
	if (showAll)
		console.log "in admin"
		console.log 
		ReactDOM.render(
	        <Distributions
	          showAll={true}
	          url="/admin/show_distributions"
	          authenticity_token={$('meta[name=csrf-token]').attr('content')}/>,
	        showAll
	      )
