class Order < ActiveRecord::Base
	attr_accessible :i_ready_orders_attributes, :ready_orders_attributes 
	has_many :i_ready_orders, :dependent => :destroy
	has_many :ready_orders, :dependent => :destroy
	belongs_to :distribution
	belongs_to :school
	accepts_nested_attributes_for :school, :i_ready_orders, :ready_orders
end
