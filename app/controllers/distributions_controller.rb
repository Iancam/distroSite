class DistributionsController < ApplicationController
  def create
  	distribution = Distribution.new(params[:distribution])
  	district = params[:district]
  	if district
	  	if district[:name] and district[:state]
	  		District.where("name = ? AND state = ?", district[:name], district[:state])
			else
				redirect_to root_url
			end
		else
			redirect_to root_url
		end
  end

 
  def new
  	@distribution = Distribution.new
    @distribution.orders.build
    # @distribution.orders.i_ready_orders.build
    # @distribution.orders.ready_orders.build

  	@district = District.new
  end
end
