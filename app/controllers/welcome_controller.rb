class WelcomeController < ApplicationController

	def index
		if current_user
			redirect_to :new_distribution
		else 
			redirect_to :log_in
		end
	end

end
