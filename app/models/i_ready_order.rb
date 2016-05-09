class IReadyOrder < ActiveRecord::Base
	belongs_to :school
	belongs_to :distribution
	validates :distribution_id, presence: true
	validates :school_id, presence: true

	accepts_nested_attributes_for :school

	def to_array
		self.attributes.values_at(*IReadyOrder.column_names)
	end
end
