class VigenereService
  def extend_key_vigenere(key, text)
    extended_key = key
    while extended_key.length < text.length
      extended_key += key
    end
    extended_key[0, text.length]
  end

  def encrypt_vigenere(text, key)
    encrypted_text = ""
    text.each_char.with_index do |char, i|
      encrypted_text += ((char.ord + key[i].ord - 130) % 26 + 65).chr
    end
    encrypted_text
  end

  def decrypt_vigenere(text, key)
    decrypted_text = ""
    text.each_char.with_index do |char, i|
      decrypted_text += ((char.ord - key[i].ord + 26) % 26 + 65).chr
    end
    decrypted_text
  end
end