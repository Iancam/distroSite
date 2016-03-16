class EndUsersController < ApplicationController

	def add_ready
		
	end

	def add_iready

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
		elsif params["ready_order"]
			ready = params['ready_order']
			order_type = ReadyOrder.new()
			order_type.subject  = ready['subject']
			order_type.order_id = order.id
			1.upto(8) { |n|
			 	order_type["grade_#{n}_teacher"] = ready["grade_#{n}_teacher"]
				order_type["grade_#{n}_student"] = ready["grade_#{n}_student"]
 	 }
			if order_type.save()
				order_type_save = true
			end
		end
		if order_save and order_type_save
			redirect_to "/distributions/index", notice: "saved end_user"
		else 
			redirect_to "/distributions/index", notice: "failed to save end user" 
		end
	end
end
