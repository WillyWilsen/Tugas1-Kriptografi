from sympy import mod_inverse

# Convert matrix from string to int
def convert_matrix_to_int(matrix):
  for i in range(len(matrix)):
    for j in range(len(matrix[i])):
      matrix[i][j] = int(matrix[i][j])
  return matrix

# Add Z to text if length % matrix_size != 0
def add_z_to_text(text, matrix_size):
  while len(text) % matrix_size != 0:
    text += "Z"
  return text

'''
Enkripsi: C = K * P mod 26
'''
def encrypt_hill(text, matrix):
  encrypted_text = ""
  for i in range(0, len(text), len(matrix)):
    for j in range(len(matrix)):
      sum = 0
      for k in range(len(matrix)):
        sum += matrix[j][k] * (ord(text[i + k]) - 65)
      encrypted_text += chr(sum % 26 + 65)
  return encrypted_text

# Minor matrix
def minor_matrix(mat, i, j):
  return [row[:j] + row[j+1:] for row in (mat[:i] + mat[i+1:])]

# Determinant matrix
def determinant_matrix(mat):
  if len(mat) == 1:
    return mat[0][0]
  if len(mat) == 2:
    return mat[0][0]*mat[1][1] - mat[0][1]*mat[1][0]
  det = 0
  for i in range(len(mat)):
    det += ((-1) ** i) * mat[0][i] * determinant_matrix(minor_matrix(mat, 0, i))
  return det

# Cofactor matrix
def cofactor_matrix(matrix):
  size = len(matrix)
  cofactor_mat = [[0]*size for _ in range(size)]
  for i in range(size):
    for j in range(size):
      minor = minor_matrix(matrix, i, j)
      cofactor_mat[i][j] = ((-1) ** (i+j)) * determinant_matrix(minor)
  return cofactor_mat

# Adjoint matrix
def adjoint_matrix(matrix):
  cofactor_mat = cofactor_matrix(matrix)
  adjoint_mat = [[cofactor_mat[j][i] for j in range(len(cofactor_mat))] for i in range(len(cofactor_mat[0]))]
  return adjoint_mat

# Invers matrix
def invers_matrix(matrix):
  adjoint_mat = adjoint_matrix(matrix)
  adjoint_mat = [[adjoint_mat[i][j] % 26 for j in range(len(adjoint_mat))] for i in range(len(adjoint_mat[0]))]
  det = determinant_matrix(matrix) % 26
  invers_det = mod_inverse(det, 26)
  invers_mat = [[adjoint_mat[i][j] * invers_det % 26 for j in range(len(adjoint_mat))] for i in range(len(adjoint_mat[0]))]
  return invers_mat

'''
Dekripsi: P = K-1 * C mod 26
'''
def decrypt_hill(text, matrix):
  decrypted_text = ""
  inv_matrix = invers_matrix(matrix)
  for i in range(0, len(text), len(inv_matrix)):
    for j in range(len(inv_matrix)):
      sum = 0
      for k in range(len(inv_matrix)):
        sum += inv_matrix[j][k] * (ord(text[i + k]) - 65)
      decrypted_text += chr(sum % 26 + 65)
  return decrypted_text