from sympy import mod_inverse

'''
Enkripsi: C = mP+ b (mod n)

 Keterangan: 
 1. n adalah ukuran alfabet
 2. m bilangan bulat yang relatif prima dengan n
 3. b adalah jumlah pergeseran
 4. Caesar cipher adalah khusus dari affine cipher dengan m = 1
 5. m-1 adalah inversi m (mod n), yaitu m * m-1 = 1 (mod n)
'''
def encrypt_affine(text, m, b):
  encrypted_text = ""
  for char in text:
    encrypted_text += chr(((ord(char) - 65) * m + b) % 26 + 65)
  return encrypted_text


'''
Dekripsi: P = m-1 (C - b) (mod n)

 Keterangan: 
 1. n adalah ukuran alfabet
 2. m bilangan bulat yang relatif prima dengan n
 3. b adalah jumlah pergeseran
 4. Caesar cipher adalah khusus dari affine cipher dengan m = 1
 5. m-1 adalah inversi m (mod n), yaitu m * m-1 = 1 (mod n)
'''
def decrypt_affine(text, m, b):
  decrypted_text = ""
  for char in text:
    decrypted_text += chr(((ord(char) - 65 - b) * mod_inverse(m, 26)) % 26 + 65)
  return decrypted_text