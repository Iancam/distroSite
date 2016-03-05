class DistributionsController < ApplicationController

  def create
  	@distribution = Distribution.new(params[:distribution])
    @state = @district.state
  	# district = District.where("name = ? AND state = ?", @name, @state)
    # distribution.district_id = district.pid
    if @distribution.save
      redirect_to new_distribution_url, notice: 'successfully created distribution'
		else
      redirect_to new_distribution_url, notice: 'failed to create a distribution'
		end

  end

  def district_id
    respond_to do |format|
      state = params[:state]
      district_name = params[:name]
      district_id = District.where(state: state, name: district_name).pluck(:pid)
      schools = School.where(district_id: district_id).pluck(:name)
      format.json {render json: [district_id, schools]}
      # format.html {}
    end
  end


  def districts
    respond_to do |format|
      state = params[:state]
      districts = District.where(state: state[:name]).pluck('name').uniq
      format.json {render json: districts}
      format.html {}
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
