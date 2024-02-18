from ..EXTENDED_VIGENERE_CIPHER.service import encrypt_bytes_extended_vigenere, decrypt_bytes_extended_vigenere

# Validate key for Transposition Cipher
def is_valid_key_transposition(data_bytes, keyTransposition):
  return keyTransposition > 0 and len(data_bytes) % keyTransposition == 0

# Encrypt bytes using Extended Vigenere Cipher and Transposition Cipher
def encrypt_bytes_super_encryption(data_bytes, keyVigenere, keyTransposition):
  # Encrypt using Extended Vigenere Cipher
  encrypted_bytes = encrypt_bytes_extended_vigenere(data_bytes, keyVigenere)

  # Split bytes with length keyTransposition
  rows = []
  for i in range(0, len(encrypted_bytes), keyTransposition):
    rows.append(encrypted_bytes[i:i + keyTransposition])

  # Combine rows by column
  combined_bytes = bytearray()
  for i in range(keyTransposition):
    for row in rows:
      combined_bytes.append(row[i])

  return combined_bytes

# Decrypt bytes using Extended Vigenere Cipher and Transposition Cipher
def decrypt_bytes_super_encryption(data_bytes, keyVigenere, keyTransposition):
  # Split bytes with length len(data_bytes) // keyTransposition
  rows = []
  for i in range(0, len(data_bytes), len(data_bytes) // keyTransposition):
    rows.append(data_bytes[i:i + len(data_bytes) // keyTransposition])

  # Combine rows by column
  combined_bytes = bytearray()
  for i in range(len(data_bytes) // keyTransposition):
    for row in rows:
      combined_bytes.append(row[i])

  # Decrypt using Extended Vigenere Cipher
  decrypted_bytes = decrypt_bytes_extended_vigenere(combined_bytes, keyVigenere)

  return decrypted_bytes