class EndUsersController < ApplicationController

	def add_ready
		
	end

	def add_iready

	end

	def update_ready
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

	def update_iready
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

	def add_order
		order = Order.new()
		order.distribution_id = params["distribution"]["id"]
		order.contact_name = params['contact_name']
		order.school_id    = params['school']
		order_type= nil
		
		order_type_save = false
		order_save = false 
		if order.save
			order_save = true
			puts "order succeeded saving"
		else
			puts "order failed to save"
		end
		if params["i_ready_orders"]
			iready = params["i_ready_orders"]
			order_type = IReadyOrder.new()
			order_type.subject = iready['subject']
			order_type.order_id= order.id			
			order_type.toolbox = iready['toolbox']
			order_type.enrollment= iready['enrollment']
			if order_type.save()
				order_type_save = true
			end
		elsif params["ready_orders"]
			params['ready_orders'].each do |subject, grades|
				order_type = ReadyOrder.new()
				order_type.subject  = subject
				order_type.order_id = order.id
				
				order_type["grade_k_teacher"] = grades["grade_k_teacher"]
				order_type["grade_k_student"] = grades["grade_k_student"]
				order_type["toolbox"] = grades['toolbox']

				1.upto(8) { |n|
				 	order_type["grade_#{n}_teacher"] = grades["grade_#{n}_teacher"]
					order_type["grade_#{n}_student"] = grades["grade_#{n}_student"]
	 	 		}
				if order_type.save()
					order_type_save = true
				end
			end
		end
		respond_to do |format|
			if order_save and order_type_save
				format.json {render json: ["end user saved successfully"]}
				# format.html {redirect_to "/distributions/index", notice: "saved end_user"}

			else 
				format.json {render json: ["end user failed to save successfully"]}

				# format.html {redirect_to "/distributions/index", notice: "failed to save end user"}
			end
		end
	end
end
