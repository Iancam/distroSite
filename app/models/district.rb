class District < ActiveRecord::Base
	self.primary_key = "pid"
	has_many :distributions
end
