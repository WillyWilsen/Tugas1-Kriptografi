from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.constant import INPUT_OPTION, METHOD
from utils.function import clean_text
from utils.VIGNERE_CIPHER.service import extend_key_vignere, encrypt_vignere, decrypt_vignere
from utils.AUTO_KEY_VIGNERE_CIPHER.service import extend_key_auto_key_vignere, encrypt_auto_key_vignere, decrypt_auto_key_vignere
from utils.PLAYFAIR_CIPHER.service import generate_matrix_key, prepare_text, encrypt_playfair, decrypt_playfair
from utils.AFFINE_CIPHER.service import encrypt_affine, decrypt_affine
app = Flask(__name__)
CORS(app)

@app.route('/api/encrypt', methods=['POST'])
def encrypt():
  data = request.get_json()
  if data['inputOption'] == INPUT_OPTION['TEXT']:
    data['inputText'] = clean_text(data['inputText'])

  if data['method'] == METHOD['VIGNERE_CIPHER']:
    data['key'] = clean_text(data['key'])
    data['key'] = extend_key_vignere(data['key'], data['inputText'])
    data['result'] = encrypt_vignere(data['inputText'], data['key'])
  elif data['method'] == METHOD['AUTO_KEY_VIGNERE_CIPHER']:
    data['key'] = clean_text(data['key'])
    data['key'] = extend_key_auto_key_vignere(data['key'], data['inputText'])
    data['result'] = encrypt_auto_key_vignere(data['inputText'], data['key'])
  elif data['method'] == METHOD['EXTENDED_VIGNERE_CIPHER']:
    pass
  elif data['method'] == METHOD['PLAYFAIR_CIPHER']:
    data['key'] = clean_text(data['key'])
    data['key'] = generate_matrix_key(data['key'])
    data['inputText'] = prepare_text(data['inputText'])
    data['result'] = encrypt_playfair(data['inputText'], data['key'])
  elif data['method'] == METHOD['AFFINE_CIPHER']:
    data['result'] = encrypt_affine(data['inputText'], data['keyM'], data['keyB'])
  
  return jsonify(data)

@app.route('/api/decrypt', methods=['POST'])
def decrypt():
  data = request.get_json()
  if data['inputOption'] == INPUT_OPTION['TEXT']:
    data['inputText'] = clean_text(data['inputText'])

  if data['method'] == METHOD['VIGNERE_CIPHER']:
    data['key'] = clean_text(data['key'])
    data['key'] = extend_key_vignere(data['key'], data['inputText'])
    data['result'] = decrypt_vignere(data['inputText'], data['key'])
  elif data['method'] == METHOD['AUTO_KEY_VIGNERE_CIPHER']:
    data['key'] = clean_text(data['key'])
    data['key'] = extend_key_auto_key_vignere(data['key'], data['inputText'])
    data['result'] = decrypt_auto_key_vignere(data['inputText'], data['key'])
  elif data['method'] == METHOD['EXTENDED_VIGNERE_CIPHER']:
    pass
  elif data['method'] == METHOD['PLAYFAIR_CIPHER']:
    data['key'] = clean_text(data['key'])
    data['key'] = generate_matrix_key(data['key'])
    data['inputText'] = prepare_text(data['inputText'])
    data['result'] = decrypt_playfair(data['inputText'], data['key'])
  elif data['method'] == METHOD['AFFINE_CIPHER']:
    data['result'] = decrypt_affine(data['inputText'], data['keyM'], data['keyB'])
  
  return jsonify(data)

if __name__ == '__main__':
  app.run()