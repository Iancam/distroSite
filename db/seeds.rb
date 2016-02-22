# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# require "Roo"

# data = Roo::Spreadsheet.open('distroData.xlsx')

# # puts data.info



# products = data.sheet(0)
# pr_header = [:reo_id, :subject, :tier, :isbn, :sch_price, :license_length, :grade_range, :product, :license_type, :prefix, :suffix]
# 2.upto(products.last_row) { |line| Product.create ** Hash[*pr_header.zip(products.row(line)).flatten] }

# districts = data.sheet(1)
# dist_header = [:pid,:name, :state]
# 2.upto(districts.last_row) { |line| District.create ** Hash[*dist_header.zip(districts.row(line)).flatten] }

# schools = data.sheet(2)
# schl_header = [:pid,:name,:enrollment,:street,:city,:state,:zip,:district_id]
# 2.upto(schools.last_row) { |line| School.create ** Hash[*schl_header.zip(schools.row(line)).flatten] }


















