require 'prime'

class HillService
  def convert_matrix_to_int(matrix)
    matrix.map { |row| row.map(&:to_i) }
  end

  def add_z_to_text(text, matrix_size)
    text += 'Z' until text.length % matrix_size == 0
    text
  end

  def encrypt_hill(text, matrix)
    encrypted_text = ''
    matrix_size = matrix.length
    text.chars.each_slice(matrix_size) do |slice|
      matrix_size.times do |j|
        sum = slice.each_with_index.inject(0) do |sum, (char, k)|
          sum + (matrix[j][k] * (char.ord - 65))
        end
        encrypted_text += ((sum % 26) + 65).chr
      end
    end
    encrypted_text
  end

  def minor_matrix(mat, i, j)
    (mat.take(i) + mat.drop(i+1)).map { |row| row.take(j) + row.drop(j+1) }
  end

  def determinant_matrix(mat)
    size = mat.length
    return mat[0][0] if size == 1
    return mat[0][0]*mat[1][1] - mat[0][1]*mat[1][0] if size == 2

    det = 0
    size.times do |i|
      det += ((-1) ** i) * mat[0][i] * determinant_matrix(minor_matrix(mat, 0, i))
    end
    det
  end

  def cofactor_matrix(matrix)
    size = matrix.length
    cofactor_mat = Array.new(size) { Array.new(size, 0) }
    size.times do |i|
      size.times do |j|
        minor = minor_matrix(matrix, i, j)
        puts "minor: #{minor}"
        cofactor_mat[i][j] = ((-1) ** (i+j)) * determinant_matrix(minor)
      end
    end
    cofactor_mat
  end

  def adjoint_matrix(matrix)
    cofactor_mat = cofactor_matrix(matrix)
    cofactor_mat.transpose
  end

  def inverse_matrix(matrix)
    adjoint_mat = adjoint_matrix(matrix)
    puts "adjoint_mat: #{adjoint_mat}"
    adjoint_mat = adjoint_mat.map { |row| row.map { |element| element % 26 } }
    det = determinant_matrix(matrix) % 26
    invers_det = det.to_bn.mod_inverse(26)
    invers_mat = adjoint_mat.map { |row| row.map { |element| (element * invers_det) % 26 } }
  end

  def decrypt_hill(text, matrix)
    decrypted_text = ''
    inv_matrix = inverse_matrix(matrix)
    matrix_size = inv_matrix.length
    text.chars.each_slice(matrix_size) do |slice|
      matrix_size.times do |j|
        sum = slice.each_with_index.inject(0) do |sum, (char, k)|
          sum + (inv_matrix[j][k] * (char.ord - 65))
        end
        decrypted_text += ((sum % 26) + 65).chr
      end
    end
    decrypted_text
  end
end