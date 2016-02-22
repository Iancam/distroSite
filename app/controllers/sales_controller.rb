class SalesController < ApplicationController
  def iready
  	@districts = District.all
  	@products = IreadyProduct.all
  	@schools = School.all
  end

  def distribution
  end
  

end
