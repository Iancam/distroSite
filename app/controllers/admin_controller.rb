class AdminController < ApplicationController
  def show_distributions
  	@distributions = Distribution.all

  end
end
