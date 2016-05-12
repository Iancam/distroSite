class IReadyOrder < ActiveRecord::Base
	belongs_to :school
	belongs_to :distribution
	validates :distribution_id, presence: true
	validates :school_id, presence: true

	accepts_nested_attributes_for :school
	
	def displayColumns
	[	
		"subject",
		"enrollment",
		"contact_name",
		"toolbox",
		"name",
		"enrollment",
		"street",
		"city",
		"state",
		"zip"
		
	]
	end

	def tier
		if self.enrollment < 200
			return ' <200'
		end
		if self.enrollment <= 350
			return '200-350'
		end
		if self.enrollment <= 500
			return '351-500'
		end
		if self.enrollment <= 800
			return '501-800'
		end
		if self.enrollment <= 1200
			return '801-1200'
		end
		if self.enrollment > 1200
			return '1201+'
		end
	end

	def SKU		
		IreadyProducts.find_by(subject: self.subject, tier: self.tier).pluck(:reo_id)
	end

	def to_array
		attributes = self.attributes
		attributes["total_enrollment"] = attributes["enrollment"]
		attributes.delete["enrollment"]
		school_attributes = School.find_by(pid: self.school_id).attributes()
		school_attributes["mdr_enrollment"] = school_attributes["enrollment"]

		attributes.merge(school_attributes)
		attributes['tier'] = self.tier
		attributes['SKU'] = self.SKU

		attributes.values_at(*displayColumns)
	end
end
