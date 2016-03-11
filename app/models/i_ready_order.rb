class IReadyOrder < ActiveRecord::Base
	belongs_to :order

	def to_array
		self.attributes.values_at(*IReadyOrder.column_names)
	end
end
