# Function for key length and text length are equal
def extend_key_vigenere(key, text):
  extended_key = key
  while len(extended_key) < len(text):
      extended_key += key
  return extended_key[:len(text)]

# Encrypt text using Vigenere Cipher
def encrypt_vigenere(text, key):
  encrypted_text = ""
  for i in range(len(text)):
    encrypted_text += chr((ord(text[i]) + ord(key[i])) % 26 + 65)
  return encrypted_text

# Decrypt text using Vigenere Cipher
def decrypt_vigenere(text, key):
  decrypted_text = ""
  for i in range(len(text)):
    decrypted_text += chr((ord(text[i]) - ord(key[i]) + 26) % 26 + 65)
  return decrypted_text