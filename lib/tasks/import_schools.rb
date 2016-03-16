require 'roo'
namespace :roo do
	desc "import xlsx data"
	task :import_schools => :environment do
		data = Roo::Spreadsheet.open('db/distroData.xlsx')
		schools = data.sheet(2)
		schl_header = [:state, :district_id, :pid,:name,:street,:city,:zip,:enrollment]
		2.upto(schools.last_row) { |line| School.create(**Hash[*schl_header.zip(schools.row(line)).flatten])}
	end
end
