class PlayfairService
  def generate_matrix_key(key)
    key = key.gsub(" ", "")
    key = key.gsub("J", "")
    key = key.chars.uniq.join
    alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"
    key.each_char { |char| alphabet.delete!(char) }
    key += alphabet
    matrix_key = []
    5.times do |i|
      matrix_key[i] = []
      5.times do |j|
        matrix_key[i][j] = key[i * 5 + j]
      end
    end
    matrix_key
  end

  def prepare_text(text)
    text = text.gsub("J", "I")
    text = text.chars
    i = 0
    while i < text.length
      if i + 1 < text.length && text[i] == text[i + 1]
        text.insert(i + 1, 'X')
        i += 1
      end
      i += 2
    end
    text << 'X' if text.length.odd?
    text
  end  

  def encrypt_playfair(text, matrix_key)
    encrypted_text = ""
    text.each_slice(2) do |pair|
      row1, col1 = 0, 0
      row2, col2 = 0, 0
      matrix_key.each_with_index do |row, i|
        row.each_with_index do |char, j|
          if char == pair[0]
            row1, col1 = i, j
          elsif char == pair[1]
            row2, col2 = i, j
          end
        end
      end
      if row1 == row2
        encrypted_text += matrix_key[row1][(col1 + 1) % 5]
        encrypted_text += matrix_key[row2][(col2 + 1) % 5]
      elsif col1 == col2
        encrypted_text += matrix_key[(row1 + 1) % 5][col1]
        encrypted_text += matrix_key[(row2 + 1) % 5][col2]
      else
        encrypted_text += matrix_key[row1][col2]
        encrypted_text += matrix_key[row2][col1]
      end
    end
    encrypted_text
  end

  def decrypt_playfair(text, matrix_key)
    decrypted_text = ""
    text.each_slice(2) do |pair|
      row1, col1 = 0, 0
      row2, col2 = 0, 0
      matrix_key.each_with_index do |row, i|
        row.each_with_index do |char, j|
          if char == pair[0]
            row1, col1 = i, j
          elsif char == pair[1]
            row2, col2 = i, j
          end
        end
      end
      if row1 == row2
        decrypted_text += matrix_key[row1][(col1 - 1) % 5]
        decrypted_text += matrix_key[row2][(col2 - 1) % 5]
      elsif col1 == col2
        decrypted_text += matrix_key[(row1 - 1) % 5][col1]
        decrypted_text += matrix_key[(row2 - 1) % 5][col2]
      else
        decrypted_text += matrix_key[row1][col2]
        decrypted_text += matrix_key[row2][col1]
      end
    end
    decrypted_text.gsub("X", "")
  end
end