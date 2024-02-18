from ..VIGNERE_CIPHER.service import encrypt_vignere, decrypt_vignere

# Function for key length and text length are equal but the key is followed by the text
def extend_key_auto_key_vignere(key, text):
  extended_key = key + text
  return extended_key[:len(text)]

# Encrypt text using Auto Key Vignere Cipher
def encrypt_auto_key_vignere(text, key):
  return encrypt_vignere(text, key)

# Decrypt text using Auto Key Vignere Cipher
def decrypt_auto_key_vignere(text, key):
  return decrypt_vignere(text, key)