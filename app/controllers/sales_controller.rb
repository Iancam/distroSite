class SalesController < ApplicationController
  def iready
  	# @districts = District.all
  	# @products = IreadyProduct.all
  	# @schools = School.all
  end

  def ready
  	# @shippingAddress = params[:address]
  	# @studentDistribution = #k-8 * 
  	# @teacherDistribution = # k-8 *
  	redirect_to 'sales/distribution'
  end

  def dashboard
    #TODO: get distributions owned by this rep
    #TODO: 
  end

  # create a distribution item
  def create

  	@distribution = Distribution.new(params[:distribution])
  	puts @distribution
  	# contact   = params[:contact]
  	# date      = params[:creation_date]
  	# quote_id  = params[:final_quote_id]
  	# po_number = params[:po_number]
  	# state     = params[:state]
  	# district  = params[:district]
  	# schl_name = params[:name]
  	# subject   = params[:subject]
  	if params[:ready]
  		redirect_to "sales/ready"
  	end
  end


end
