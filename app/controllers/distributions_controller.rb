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

  def add_order
    # save order
    order = Order.new()
    order.distribution_id = params["distribution"]["id"]
    order.contact_name = params[:contact]
    order.school_id    = params[:school]

    respond_to do |format|
      #return nothing for json
      if order.save()
        format.json { render :json => ["success"]}
      else
        format.json { render :json => ["failed to save"]}
      end
    end
  end

  def index
    if not current_user
      redirect_to log_in_path
    else
      user_id = current_user['id']
      @distributions = Distribution.where(user_id: user_id)
      @distribution = Distribution.new
      @schoolMap = {}
      @distributions.each do |d|
        schools = School.where(district_id: d.district_id)
        @schoolMap[d.district_id]= schools.collect { |e| [e.pid, e.name] }
      end
    end
  end
  
  def show
    id = params['id']
    @distribution = Distribution.find(id)
    respond_to do |format|
      format.csv {send_data @distribution.to_csv}
      format.html
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
