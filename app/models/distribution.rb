class Distribution < ActiveRecord::Base
	attr_accessible :street, :city, :state, 
					:contact_name, :creation_date, 
					:final_quote_id, :po_number, 
					:i_ready_orders_attributes,
					:ready_orders_attributes, :zip,
					:districts_attributes,
					:district_id
	validates :district_id, presence: true
	has_many :i_ready_orders
	has_many :ready_orders

	belongs_to :district
	belongs_to :user
	accepts_nested_attributes_for :i_ready_orders, :reject_if => lambda { |a| a[:content].blank? }, :allow_destroy => true
	accepts_nested_attributes_for :ready_orders, :reject_if => lambda { |a| a[:content].blank? }, :allow_destroy => true


	def to_csv
		dist_csv_string = CSV.generate do |csv|
			#do the distribution header
			Distribution.column_names.each do |c|
				csv << ['',c, self.attributes[c]]
			end

			csv << ['',"length", self.orders.length]

			if self.orders
				# column names for orders, school and ReadyOrders
				csv << [""]+ Order.column_names + School.column_names+ ReadyOrder.column_names 				
				self.orders.each do |order|
					order = order.to_hashmap
					order[:ready].each do |ready|
						csv << order[:order] + ready
					end
				end
				csv << [""]
				csv << [""]
			# header row including order, school and iready column names
				csv << [""]+ Order.column_names + School.column_names+ IReadyOrder.column_names
				self.orders.each do |order|
					order = order.to_hashmap
					order[:iready].each do |iready|
						csv << order[:order] + iready
					end
				end
			end
		end
		return dist_csv_string		
	end
end

