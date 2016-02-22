require 'test_helper'

class SalesControllerTest < ActionController::TestCase
  test "should get IReady" do
    get :IReady
    assert_response :success
  end

end
