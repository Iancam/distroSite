require 'roo'
namespace :roo do
	desc "import xlsx data"
	task :import_products => :environment do
		data = Roo::Spreadsheet.open('db/distroData.xlsx')
		# puts data.info
		products = data.sheet(0)
		pr_header = [:subject, :tier, :reo_id, :isbn, :sch_price, :license_length, :grade_range, :product, :license_type, :prefix, :suffix]
		2.upto(products.last_row) { |line| IreadyProduct.create(**Hash[*pr_header.zip(products.row(line)).flatten])}
	end
end