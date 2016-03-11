class DistributionsController < ApplicationController

  def create
  	@distribution = Distribution.new(params[:distribution])
    @distribution.user_id = current_user["id"]
    @distribution.district_id = params['district']['id']
    if @distribution.save
      redirect_to '/distributions/index', notice: 'successfully created distribution'
		else
      redirect_to '/distributions/index', notice: 'failed to create a distribution'
		end

  end

  def school_id
    respond_to do |format|
      district_id = params[:district]
      school_name =   params[:school]
      school_id = School.where(district_id: district_id, name: school_name).pluck(:pid)
      format.json {render json: school_id}
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

  def index
    user_id = current_user['id']
    @distributions = Distribution.where(user_id: user_id)
    
  end
  
  def show
    id = params['id']
    distribution = Distribution.find(id)
    respond_to do |format|
      format.csv {send_data distribution.to_csv}
      # format.html{send_data distribution.to_csv}
      # format.json{send_data distribution.to_csv}
    end
  end

  def edit
    
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
