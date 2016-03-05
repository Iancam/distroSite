require 'test_helper'

class AdminControllerTest < ActionController::TestCase
  test "should get show_distributions" do
    get :show_distributions
    assert_response :success
  end

end
