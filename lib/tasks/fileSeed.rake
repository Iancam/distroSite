require 'roo'
namespace :roo do
	desc "import xlsx data"
	task :import_all => :environment do
		data = Roo::Spreadsheet.open('db/distroData.xlsx')
		# puts data.info
		products = data.sheet(0)
		pr_header = [:subject, :tier, :reo_id, :isbn, :sch_price, :license_length, :grade_range, :product, :license_type, :prefix, :suffix]
		2.upto(products.last_row) { |line| IreadyProduct.create(**Hash[*pr_header.zip(products.row(line)).flatten])}

		districts = data.sheet(1)
		dist_header = [:state,:name, :pid]
		2.upto(districts.last_row) { |line| District.create(**Hash[*dist_header.zip(districts.row(line)).flatten])}

		schools = data.sheet(2)
		schl_header = [:state, :district_id, :pid,:name,:street,:city,:zip,:enrollment]
		2.upto(schools.last_row) { |line| School.create(**Hash[*schl_header.zip(schools.row(line)).flatten])}
	end
end
