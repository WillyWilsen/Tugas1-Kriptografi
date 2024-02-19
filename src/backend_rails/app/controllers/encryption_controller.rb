require_relative '../utils/function.rb'
require_relative '../utils/constant.rb'
require_relative '../utils/VIGENERE_CIPHER/service.rb'
require_relative '../utils/AUTO_KEY_VIGENERE_CIPHER/service.rb'
require_relative '../utils/PLAYFAIR_CIPHER/service.rb'
require_relative '../utils/AFFINE_CIPHER/service.rb'
require_relative '../utils/HILL_CIPHER/service.rb'

class EncryptionController < ApplicationController
  before_action :initialize_service

  def initialize_service
    @vigenere_service = VigenereService.new
    @auto_key_vigenere_service = AutoKeyVigenereService.new
    @playfair_service = PlayfairService.new
    @affine_service = AffineService.new
    @hill_service = HillService.new
  end

  def encrypt
    # Input
    data = JSON.parse(request.body.read)
    data['inputText'] = clean_text(data['inputText'])
    
    # Output
    if data['method'] == METHOD[:VIGENERE_CIPHER]
      data['key'] = clean_text(data['key'])
      data['key'] = @vigenere_service.extend_key_vigenere(data['key'], data['inputText'])
      data['result'] = @vigenere_service.encrypt_vigenere(data['inputText'], data['key'])
    elsif data['method'] == METHOD[:AUTO_KEY_VIGENERE_CIPHER]
      data['key'] = clean_text(data['key'])
      data['key'] = @auto_key_vigenere_service.extend_key_auto_key_vigenere(data['key'], data['inputText'])
      data['result'] = @auto_key_vigenere_service.encrypt_auto_key_vigenere(data['inputText'], data['key'])
    elsif data['method'] == METHOD[:PLAYFAIR_CIPHER]
      data['key'] = clean_text(data['key'])
      data['key'] = @playfair_service.generate_matrix_key(data['key'])
      data['inputText'] = @playfair_service.prepare_text(data['inputText'])
      data['result'] = @playfair_service.encrypt_playfair(data['inputText'], data['key'])
    elsif data['method'] == METHOD[:AFFINE_CIPHER]
      data['keyM'] = data['keyM'].to_i
      data['keyB'] = data['keyB'].to_i
      data['result'] = @affine_service.encrypt_affine(data['inputText'], data['keyM'], data['keyB'])
    elsif data['method'] == METHOD[:HILL_CIPHER]
      data['keyMatrixSize'] = data['keyMatrixSize'].to_i
      data['keyMatrixValue'] = @hill_service.convert_matrix_to_int(data['keyMatrixValue'])
      data['inputText'] = @hill_service.add_z_to_text(data['inputText'], data['keyMatrixSize'])
      data['result'] = @hill_service.encrypt_hill(data['inputText'], data['keyMatrixValue'])
    end

    render json: data.to_json
  end

  def decrypt
    # Input
    data = JSON.parse(request.body.read)
    data['inputText'] = clean_text(data['inputText'])
    
    # Output
    if data['method'] == METHOD[:VIGENERE_CIPHER]
      data['key'] = clean_text(data['key'])
      data['key'] = @vigenere_service.extend_key_vigenere(data['key'], data['inputText'])
      data['result'] = @vigenere_service.decrypt_vigenere(data['inputText'], data['key'])
    elsif data['method'] == METHOD[:AUTO_KEY_VIGENERE_CIPHER]
      data['key'] = clean_text(data['key'])
      data['key'] = @auto_key_vigenere_service.extend_key_auto_key_vigenere(data['key'], data['inputText'])
      data['result'] = @auto_key_vigenere_service.decrypt_auto_key_vigenere(data['inputText'], data['key'])
    elsif data['method'] == METHOD[:PLAYFAIR_CIPHER]
      data['key'] = clean_text(data['key'])
      data['key'] = @playfair_service.generate_matrix_key(data['key'])
      data['inputText'] = @playfair_service.prepare_text(data['inputText'])
      data['result'] = @playfair_service.decrypt_playfair(data['inputText'], data['key'])
    elsif data['method'] == METHOD[:AFFINE_CIPHER]
      data['keyM'] = data['keyM'].to_i
      data['keyB'] = data['keyB'].to_i
      data['result'] = @affine_service.decrypt_affine(data['inputText'], data['keyM'], data['keyB'])
    elsif data['method'] == METHOD[:HILL_CIPHER]
      data['keyMatrixSize'] = data['keyMatrixSize'].to_i
      data['keyMatrixValue'] = @hill_service.convert_matrix_to_int(data['keyMatrixValue'])
      if @hill_service.determinant_matrix(data['keyMatrixValue']) == 0
        data['error'] = "Matrix is not invertible"
      else
        data['inputText'] = @hill_service.add_z_to_text(data['inputText'], data['keyMatrixSize'])
        data['result'] = @hill_service.decrypt_hill(data['inputText'], data['keyMatrixValue'])
      end
    end

    render json: data.to_json
  end
end
