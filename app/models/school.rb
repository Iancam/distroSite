class School < ActiveRecord::Base
	has_many :i_ready_orders
	has_many :ready_orders
	self.primary_key = 'pid'

	def to_array
		self.attributes.values_at(*School.column_names)
	end
end
