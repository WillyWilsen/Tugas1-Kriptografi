require "test_helper"

class EncryptionControllerTest < ActionDispatch::IntegrationTest
  test "should get encrypt" do
    get encryption_encrypt_url
    assert_response :success
  end

  test "should get decrypt" do
    get encryption_decrypt_url
    assert_response :success
  end
end
