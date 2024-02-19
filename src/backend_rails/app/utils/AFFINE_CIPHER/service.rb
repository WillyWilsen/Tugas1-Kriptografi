require 'prime'

class AffineService
  def encrypt_affine(text, m, b)
    encrypted_text = ""
    text.each_char do |char|
      encrypted_text += (((char.ord - 65) * m + b) % 26 + 65).chr
    end
    encrypted_text
  end
  
  def decrypt_affine(text, m, b)
    decrypted_text = ""
    m_inverse = m.to_bn.mod_inverse(26)
    text.each_char do |char|
      decrypted_text += (((char.ord - 65 - b) * m_inverse) % 26 + 65).chr
    end
    decrypted_text
  end
end  