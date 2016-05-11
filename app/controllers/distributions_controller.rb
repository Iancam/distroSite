class DistributionsController < ApplicationController

  def create
  	respond_to do |format|
      state = params["district_state"]
      name = params["district_name"]
      district_id = District.where(state: state, name:name).pluck(:pid)
      distribution = Distribution.new(params[:distribution])
      distribution.user_id = current_user["id"]
      distribution.district_id = district_id[0]
      if distribution.save
        format.html{redirect_to '/distributions/index', notice: 'successfully created distribution'}
  		  format.json{render json: getDistributionInfo(distribution)}
      else
        format.html{redirect_to '/distributions/index', notice: 'failed to create a distribution'}
        format.json{render :json => { :errors => distribution.errors.full_messages }, :status => 422}
  		end
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
    if not current_user
      redirect_to log_in_path
    else
      user_id = current_user['id']
      @distributions = Distribution.where(user_id: user_id).order(:district_id)
      @distribution = Distribution.new
      distribution_information = []
      @distributions.each do |d|
        distribution_information << getDistributionInfo(d)
      end

      respond_to do |format|
        format.html {render "index"}
        format.json {render json: distribution_information}
      end
    end
  end
  
  def show
    id = params['id']
    @distribution = Distribution.find(id)
    @distribution.i_ready_orders.build
    @distribution.ready_orders.build
    respond_to do |format|
      format.csv {send_data @distribution.to_csv}
      format.html
      format.json{render json: @distribution}
    end
  end

  def update
    respond_to do |format|
      if params["field"] == "district_id"
        value = params["value"]
        params["value"] = District.where(state: value["state"], name: value["name"]).pluck('pid')[0]
      end
      distribution = Distribution.find_by(id:params["id"])
      puts ({params["field"] => params["value"]})
      if distribution.update(params["field"]=> params["value"])
        format.json { render json: {status: "ok"}}
      else
        puts distribution.errors.full_messages
        format.html { render :edit }
        format.json { render json: distribution.errors.full_messages, status: :unprocessable_entity }
      end
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
  private 

  def getDistributionInfo(d)
    schools = School.where(district_id: d.district_id).collect { |e| [e.pid, e.name, e.enrollment] }
    d_with_district = d.attributes
    d_with_district["district"] = District.where(pid: d.district_id)[0]
    district_options = []
    if d_with_district["district"]
      state = d_with_district["district"]["state"]
      district_options = District.where(state: state).pluck('name').uniq
    end

    i_ready_users = IReadyOrder.where(distribution_id: d.id).to_a
    ready_users = ReadyOrder.where(distribution_id: d.id).to_a
    i_ready_users.map! do |e|
      school = School.find_by(pid: e.school_id)
      user = e.attributes
      user["school"] = school
      user
    end
    ready_users.map! do |e|
      school = School.find_by(pid: e.school_id)
      user = e.attributes
      user["school"] = school
      user
    end
    {
    distribution: d_with_district,
    schools: schools,
    district_options: district_options,
    i_ready_users: i_ready_users,
    ready_users: ready_users
    }
  end
end
