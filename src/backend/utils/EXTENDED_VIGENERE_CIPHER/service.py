def extend_key_bytes(key_bytes, data_bytes):
  extended_key = bytearray()
  key_length = len(key_bytes)
  for i in range(len(data_bytes)):
    extended_key.append(key_bytes[i % key_length])
  return bytes(extended_key)

# Encrypt bytes using Extended Vigenere Cipher
def encrypt_bytes_extended_vigenere(data_bytes, key):
  key_bytes = key.encode('utf-8')
  extended_key = extend_key_bytes(key_bytes, data_bytes)
  encrypted_bytes = bytearray()
  for i in range(len(data_bytes)):
    encrypted_bytes.append((data_bytes[i] + extended_key[i]) % 256)
  return encrypted_bytes

# Decrypt bytes using Extended Vigenere Cipher
def decrypt_bytes_extended_vigenere(data_bytes, key):
  key_bytes = key.encode('utf-8')
  extended_key = extend_key_bytes(key_bytes, data_bytes)
  decrypted_bytes = bytearray()
  for i in range(len(data_bytes)):
    decrypted_bytes.append((data_bytes[i] - extended_key[i] + 256) % 256)
  return decrypted_bytes