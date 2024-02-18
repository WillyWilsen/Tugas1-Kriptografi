import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.constant import INPUT_OPTION, METHOD
from utils.function import clean_text
from utils.VIGNERE_CIPHER.service import extend_key_vignere, encrypt_vignere, decrypt_vignere
from utils.AUTO_KEY_VIGNERE_CIPHER.service import extend_key_auto_key_vignere, encrypt_auto_key_vignere, decrypt_auto_key_vignere
from utils.EXTENDED_VIGNERE_CIPHER.service import encrypt_bytes_extended_vigenere, decrypt_bytes_extended_vigenere
from utils.PLAYFAIR_CIPHER.service import generate_matrix_key, prepare_text, encrypt_playfair, decrypt_playfair
from utils.AFFINE_CIPHER.service import encrypt_affine, decrypt_affine
from utils.HILL_CIPHER.service import convert_matrix_to_int, add_z_to_text, determinant_matrix, encrypt_hill, decrypt_hill

app = Flask(__name__)
CORS(app)

@app.route('/api/encrypt', methods=['POST'])
def encrypt():
  try:
    # Input
    if request.form:
      data = request.form.to_dict()
      file = request.files['inputFile']
      file_name = '[ENCRYPTED] ' + file.filename
      file_bytes = file.read()
      if data['method'] == METHOD['EXTENDED_VIGNERE_CIPHER']:
        data['inputText'] = file_bytes
      elif data['method'] == METHOD['HILL_CIPHER']:
        data['keyMatrixValue'] = json.loads(data['keyMatrixValue'])
      else:
        file_text = file_bytes.decode('utf-8')
        data['inputText'] = clean_text(file_text)
    else:
      data = request.get_json()
      data['inputText'] = clean_text(data['inputText'])
      if data['method'] == METHOD['EXTENDED_VIGNERE_CIPHER']:
        data['inputText'] = data['inputText'].encode('utf-8')
      
    # Output
    if data['method'] == METHOD['VIGNERE_CIPHER']:
      data['key'] = clean_text(data['key'])
      data['key'] = extend_key_vignere(data['key'], data['inputText'])
      data['result'] = encrypt_vignere(data['inputText'], data['key'])
    elif data['method'] == METHOD['AUTO_KEY_VIGNERE_CIPHER']:
      data['key'] = clean_text(data['key'])
      data['key'] = extend_key_auto_key_vignere(data['key'], data['inputText'])
      data['result'] = encrypt_auto_key_vignere(data['inputText'], data['key'])
    elif data['method'] == METHOD['EXTENDED_VIGNERE_CIPHER']:
      data['key'] = clean_text(data['key'])
      result = encrypt_bytes_extended_vigenere(data['inputText'], data['key'])
      if (data['inputOption'] == INPUT_OPTION['TEXT']):
        with open(f'output/[ENCRYPTED] output.txt', 'wb') as file:
          file.write(result)
      else:
        with open(f'output/{file_name}', 'wb') as file:
          file.write(result)
      data.pop('inputText', None)
      data['result'] = 'File has been encrypted'
    elif data['method'] == METHOD['PLAYFAIR_CIPHER']:
      data['key'] = clean_text(data['key'])
      data['key'] = generate_matrix_key(data['key'])
      data['inputText'] = prepare_text(data['inputText'])
      data['result'] = encrypt_playfair(data['inputText'], data['key'])
    elif data['method'] == METHOD['AFFINE_CIPHER']:
      data['keyM'] = int(data['keyM'])
      data['keyB'] = int(data['keyB'])
      data['result'] = encrypt_affine(data['inputText'], data['keyM'], data['keyB'])
    elif data['method'] == METHOD['HILL_CIPHER']:
      data['keyMatrixSize'] = int(data['keyMatrixSize'])
      data['keyMatrixValue'] = convert_matrix_to_int(data['keyMatrixValue'])
      data['inputText'] = add_z_to_text(data['inputText'], data['keyMatrixSize'])
      data['result'] = encrypt_hill(data['inputText'], data['keyMatrixValue'])
    
    return jsonify(data)
  except Exception as e:
    return jsonify({'error': str(e)}), 500

@app.route('/api/decrypt', methods=['POST'])
def decrypt():
  try:
    # Input
    if request.form:
      data = request.form.to_dict()
      file = request.files['inputFile']
      file_name = file.filename.replace('[ENCRYPTED] ', '')
      file_bytes = file.read()
      if data['method'] == METHOD['EXTENDED_VIGNERE_CIPHER']:
        data['inputText'] = file_bytes
      elif data['method'] == METHOD['HILL_CIPHER']:
        data['keyMatrixValue'] = json.loads(data['keyMatrixValue'])
      else:
        file_text = file_bytes.decode('utf-8')
        data['inputText'] = clean_text(file_text)
    else:
      data = request.get_json()
      data['inputText'] = clean_text(data['inputText'])
      if data['method'] == METHOD['EXTENDED_VIGNERE_CIPHER']:
        data['inputText'] = data['inputText'].encode('utf-8')
      
    # Output
    if data['method'] == METHOD['VIGNERE_CIPHER']:
      data['key'] = clean_text(data['key'])
      data['key'] = extend_key_vignere(data['key'], data['inputText'])
      data['result'] = decrypt_vignere(data['inputText'], data['key'])
    elif data['method'] == METHOD['AUTO_KEY_VIGNERE_CIPHER']:
      data['key'] = clean_text(data['key'])
      data['key'] = extend_key_auto_key_vignere(data['key'], data['inputText'])
      data['result'] = decrypt_auto_key_vignere(data['inputText'], data['key'])
    elif data['method'] == METHOD['EXTENDED_VIGNERE_CIPHER']:
      data['key'] = clean_text(data['key'])
      result = decrypt_bytes_extended_vigenere(data['inputText'], data['key'])
      if (data['inputOption'] == INPUT_OPTION['TEXT']):
        with open(f'output/output.txt', 'wb') as file:
          file.write(result)
      else:
        with open(f'output/{file_name}', 'wb') as file:
          file.write(result)
      data.pop('inputText', None)
      data['result'] = 'File has been decrypted'
    elif data['method'] == METHOD['PLAYFAIR_CIPHER']:
      data['key'] = clean_text(data['key'])
      data['key'] = generate_matrix_key(data['key'])
      data['inputText'] = prepare_text(data['inputText'])
      data['result'] = decrypt_playfair(data['inputText'], data['key'])
    elif data['method'] == METHOD['AFFINE_CIPHER']:
      data['keyM'] = int(data['keyM'])
      data['keyB'] = int(data['keyB'])
      data['result'] = decrypt_affine(data['inputText'], data['keyM'], data['keyB'])
    elif data['method'] == METHOD['HILL_CIPHER']:
      data['keyMatrixSize'] = int(data['keyMatrixSize'])
      data['keyMatrixValue'] = convert_matrix_to_int(data['keyMatrixValue'])
      if determinant_matrix(data['keyMatrixValue']) == 0:
        data['error'] = "Matrix is not invertible"
      else:
        data['inputText'] = add_z_to_text(data['inputText'], data['keyMatrixSize'])
        data['result'] = decrypt_hill(data['inputText'], data['keyMatrixValue'])
    
    return jsonify(data)
  except Exception as e:
    return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
  app.run()