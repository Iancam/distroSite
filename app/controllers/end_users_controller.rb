class EndUsersController < ApplicationController

  def add_ready
    saved = true
    newReadies = []
    ['Math','Reading','Writing'].each do |subject|
      newReady = ReadyOrder.new()
      newReady.subject  = subject
      newReady.distribution_id = params["distribution_id"]
      newReady.contact_name = params['contact_name']
      newReady.school_id    = params['school']
      newReady["toolbox"] = params[subject]['toolbox']

      ['k',1,2,3,4,5,6,7,8].each { |n|
        newReady["gr_#{n}_teacher_product"] = params[subject]["gr_#{n}_teacher_product"]
        newReady["gr_#{n}_student_product"] = params[subject]["gr_#{n}_student_product"]
        newReady["grade_#{n}_teacher"] = params[subject]["grade_#{n}_teacher"]
        newReady["grade_#{n}_student"] = params[subject]["grade_#{n}_student"]
      }
      if !newReady.save()
        saved = false
      end
      newReadies << newReady
    end
    respond_to do |format|
      if saved
        users = newReadies.map do |e|
          school = School.find_by(pid: e.school_id)
          user = e.attributes
          user["school"] = school
          user
        end
        format.json {render json: users}
        # format.html {redirect_to "/distributions/index", notice: "saved end_user"}
      else 
        format.json{render :json => { :errors => newReadies.map! { |e| e.errors.full_messages }}, :status => 422}

        # format.json {render json: ["end user failed to save successfully"]}
        # format.html {redirect_to "/distributions/index", notice: "failed to save end user"}
      end
    end
  end

  def add_iready
    newIReady = IReadyOrder.new()
    newIReady.subject = params['subject'] 
    newIReady.toolbox = params['toolbox']
    newIReady.enrollment= params['enrollment']
    newIReady.distribution_id = params["distribution_id"]
    newIReady.contact_name = params['contact_name']
    newIReady.school_id    = params['school']
    
    

    respond_to do |format|
      if newIReady.save()
        school = School.find_by(pid: newIReady.school_id)
        user = newIReady.attributes
        user["school"] = school
        user
        format.json {render json: user}
        # format.html {redirect_to "/distributions/index", notice: "saved end_user"}
      else 
        format.json{render :json => { :errors => newIReady.errors.full_messages }, :status => 422}
        # format.html {redirect_to "/distributions/index", notice: "failed to save end user"}
      end
    end

  end

  def update_ready
    respond_to do |format|
        ready =  ReadyOrder.find_by(id: params["id"])
        puts ({params["field"] => params["value"]})
        if ready.update(params["field"]=> params["value"])
          format.json { render json: {ready: ready.attributes_with_school}}
        else

          format.json { render json: ready.errors.full_messages, status: :unprocessable_entity }
        end
      end
  end

  def update_iready
    respond_to do |format|
        iready = IReadyOrder.find_by(id: params["id"])
        puts ({params["field"] => params["value"]})
        if iready.update(params["field"]=> params["value"])
          format.json { render json: {iready: iready.attributes_with_school}}
        else
          format.json { render json: iready.errors.full_messages, status: :unprocessable_entity }
        end
      end
  end

  def add_order
    
  end
end
