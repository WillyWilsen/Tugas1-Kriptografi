# Generate 5x5 matrix key from input key
def generate_matrix_key(key):
  key = key.replace(" ", "")
  key = key.replace("J", "")
  key = "".join(dict.fromkeys(key))
  alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"
  for i in range(len(key)):
    alphabet = alphabet.replace(key[i], "")
  key += alphabet
  matrix_key = [['' for i in range(5)] for j in range(5)]
  for i in range(5):
    for j in range(5):
      matrix_key[i][j] = key[i * 5 + j]
  return matrix_key

'''
Pesan yang akan dienkripsi diatur terlebih dahulu sebagai berikut:
 1. Buang semua spasi
 2. Ganti huruf j (bila ada) dengan i
 3. Tulis pesan dalam pasangan huruf (bigram).
 4. Jangan sampai ada pasangan huruf yang sama. Jika ada, sisipkan x di
 tengahnya
 5. Jika jumlah huruf ganjil,tambahkan huruf x di akhir
'''
def prepare_text(text):
  text = text.replace("J", "I")
  text = list(text)
  for i in range(0, len(text), 2):
    if i + 1 < len(text):
      if text[i] == text[i + 1]:
        text.insert(i + 1, 'X')
  if len(text) % 2 == 1:
    text.append('X')
  return text

'''
Algoritma Enkripsi:
 1. Jika dua huruf terdapat pada baris kunci yang sama maka tiap huruf
 diganti dengan huruf di kanannya (bersifat siklik).
 2. Jika dua huruf terdapat pada kolom kunci yang sama maka tiap huruf
 diganti dengan huruf di bawahnya (bersifat siklik).
 3. Jika dua huruf tidak pada baris yang sama atau kolom yang sama,
 maka:
 • huruf pertama diganti dengan huruf pada perpotongan baris huruf
 pertama dengan kolom huruf kedua.
 • huruf kedua diganti dengan huruf pada titik sudut keempat dari
 persegi panjang yang dibentuk dari tiga huruf yang digunakan sampai
 sejauh ini.
'''
def encrypt_playfair(text, matrix_key):
  encrypted_text = ""
  for i in range(0, len(text), 2):
    row1, col1 = 0, 0
    row2, col2 = 0, 0
    for j in range(5):
      for k in range(5):
        if matrix_key[j][k] == text[i]:
          row1, col1 = j, k
        if matrix_key[j][k] == text[i + 1]:
          row2, col2 = j, k
    if row1 == row2:
      encrypted_text += matrix_key[row1][(col1 + 1) % 5]
      encrypted_text += matrix_key[row2][(col2 + 1) % 5]
    elif col1 == col2:
      encrypted_text += matrix_key[(row1 + 1) % 5][col1]
      encrypted_text += matrix_key[(row2 + 1) % 5][col2]
    else:
      encrypted_text += matrix_key[row1][col2]
      encrypted_text += matrix_key[row2][col1]
  return encrypted_text

'''
Algoritma dekripsi kebalikan dari algoritma enkripsi. Langkah
langkahnya adalah sebagai berikut:
 1. Jika dua huruf terdapat pada baris bujursangkar yang sama maka
 tiap huruf diganti dengan huruf di kirinya.
 2. Jika dua huruf terdapat pada kolom bujursangkar yang sama maka
 tiap huruf diganti dengan huruf di atasnya.
 3. Jika dua huruf tidak pada baris yang sama atau kolom yang sama, 
maka huruf pertama diganti dengan huruf pada perpotongan baris
 huruf pertama dengan kolom huruf kedua. Huruf kedua diganti
 dengan huruf pada titik sudut keempat dari persegi panjang yang 
dibentuk dari tiga huruf yang digunakan sampai sejauh ini.
 4. Buanglah huruf X yang tidak mengandung makna.
'''
def decrypt_playfair(text, matrix_key):
  decrypted_text = ""
  for i in range(0, len(text), 2):
    row1, col1 = 0, 0
    row2, col2 = 0, 0
    for j in range(5):
      for k in range(5):
        if matrix_key[j][k] == text[i]:
          row1, col1 = j, k
        if matrix_key[j][k] == text[i + 1]:
          row2, col2 = j, k
    if row1 == row2:
      decrypted_text += matrix_key[row1][(col1 - 1) % 5]
      decrypted_text += matrix_key[row2][(col2 - 1) % 5]
    elif col1 == col2:
      decrypted_text += matrix_key[(row1 - 1) % 5][col1]
      decrypted_text += matrix_key[(row2 - 1) % 5][col2]
    else:
      decrypted_text += matrix_key[row1][col2]
      decrypted_text += matrix_key[row2][col1]
  return decrypted_text.replace("X", "")