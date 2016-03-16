require 'roo'
namespace :roo do
	desc "import xlsx data"
	task :import_districts => :environment do
		data = Roo::Spreadsheet.open('db/distroData.xlsx')
		districts = data.sheet(1)
		dist_header = [:state,:name, :pid]
		2.upto(districts.last_row) { |line| District.create(**Hash[*dist_header.zip(districts.row(line)).flatten])}
	end
end