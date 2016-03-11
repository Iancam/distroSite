class ReadyOrder < ActiveRecord::Base
	belongs_to :order

	def to_array
		self.attributes.values_at(*ReadyOrder.column_names)
	end
end
