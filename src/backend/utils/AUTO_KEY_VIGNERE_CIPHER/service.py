# Function for key length and text length are equal but the key is followed by the text
def extend_key_auto_key_vignere(key, text):
  extended_key = key + text
  return extended_key[:len(text)]

# Encrypt text using Vignere Cipher
def encrypt_auto_key_vignere(text, key):
  encrypted_text = ""
  for i in range(len(text)):
    encrypted_text += chr((ord(text[i]) + ord(key[i])) % 26 + 65)
  return encrypted_text

# Decrypt text using Vignere Cipher
def decrypt_auto_key_vignere(text, key):
  decrypted_text = ""
  for i in range(len(text)):
    decrypted_text += chr((ord(text[i]) - ord(key[i]) + 26) % 26 + 65)
  return decrypted_text