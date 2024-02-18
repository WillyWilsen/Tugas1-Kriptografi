from ..VIGENERE_CIPHER.service import encrypt_vigenere, decrypt_vigenere

# Function for key length and text length are equal but the key is followed by the text
def extend_key_auto_key_vigenere(key, text):
  extended_key = key + text
  return extended_key[:len(text)]

# Encrypt text using Auto Key Vigenere Cipher
def encrypt_auto_key_vigenere(text, key):
  return encrypt_vigenere(text, key)

# Decrypt text using Auto Key Vigenere Cipher
def decrypt_auto_key_vigenere(text, key):
  return decrypt_vigenere(text, key)