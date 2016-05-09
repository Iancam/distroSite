class EndUsersController < ApplicationController

	def add_ready
		saved = true
		['Math','Reading','Writing'].each do |subject|
			newReady = ReadyOrder.new()
			newReady.subject  = subject
			newReady.distribution_id = params["distribution_id"]
			newReady.contact_name = params['contact_name']
			newReady.school_id    = params['school']

			newReady["grade_k_teacher"] = params[subject]["grade_k_teacher"]
			newReady["grade_k_student"] = params[subject]["grade_k_student"]
			newReady["toolbox"] = params[subject]['toolbox']

			1.upto(8) { |n|
			 	newReady["grade_#{n}_teacher"] = params[subject]["grade_#{n}_teacher"]
				newReady["grade_#{n}_student"] = params[subject]["grade_#{n}_student"]
 	 		}
			if !newReady.save()
				saved = false
			end
		end
		respond_to do |format|
			if saved
				format.json {render json: ["end user saved successfully"]}
				# format.html {redirect_to "/distributions/index", notice: "saved end_user"}
			else 
				format.json {render json: ["end user failed to save successfully"]}
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
				format.json {render json: ["end user saved successfully"]}
				# format.html {redirect_to "/distributions/index", notice: "saved end_user"}
			else 
				format.json {render json: ["end user failed to save successfully"]}
				# format.html {redirect_to "/distributions/index", notice: "failed to save end user"}
			end
		end

	end

	def update_ready
		respond_to do |format|
	      ready =  ReadyOrder.find_by(id: params["id"])
	      puts ({params["field"] => params["value"]})
	      if ready.update(params["field"]=> params["value"])
	        format.json { render json: {status: "ok"}}
	      else
	        puts ready.errors.full_messages
	        format.json { render json: ready.errors.full_messages, status: :unprocessable_entity }
	      end
	    end
	end

	def update_iready
		respond_to do |format|
	      iready = IReadyOrder.find_by(id: params["id"])
	      puts ({params["field"] => params["value"]})
	      if iready.update(params["field"]=> params["value"])
	        format.json { render json: {status: "ok"}}
	      else
	        puts iready.errors.full_messages
	        format.html { render :edit }
	        format.json { render json: iready.errors.full_messages, status: :unprocessable_entity }
	      end
	    end
	end

	def add_order
		
	end
end
