class Order < ActiveRecord::Base
	attr_accessible :i_ready_orders_attributes, :ready_orders_attributes 
	has_many :i_ready_orders, :dependent => :destroy
	has_many :ready_orders, :dependent => :destroy
	belongs_to :distribution
	belongs_to :school
	accepts_nested_attributes_for :school, :i_ready_orders, :ready_orders
	
	def assignSchool(name, district)
		pid = School.where(name: name, district: district).pluck('pid')
		self.school_id = pid
	end

	def to_hashmap
		iready_arr = self.i_ready_orders.collect { |e| e.to_arr }
		ready_arr  = self.ready_orders.collect { |e| e.to_arr }
		order      = self.attributes.values_at(*IReadyOrder.column_names)
		school 	   = self.school.attributes.values_at(*School.column_names)
		
		{order: order + school,
		       iready: iready_arr,
		       ready: ready_arr}


	end
end
