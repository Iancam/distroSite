class Distribution < ActiveRecord::Base
	attr_accessible :street, :city, :state, 
					:contact_name, :creation_date, 
					:quote_id, :po_number, 
					:orders_attributes, 
					:districts_attributes
	
	has_many :orders
	belongs_to :district
	belongs_to :user
	accepts_nested_attributes_for :orders, :reject_if => lambda { |a| a[:content].blank? }, :allow_destroy => true

	def self.toCSV
		dist_csv_string = CSV.generate do |csv|
			column_names.each do |c|
				csv << ['','','',c, self.attributes.value_at(c)]
			end
		end		
	end

end
