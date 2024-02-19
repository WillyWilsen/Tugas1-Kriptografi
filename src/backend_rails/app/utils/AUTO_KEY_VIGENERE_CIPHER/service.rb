require_relative '../VIGENERE_CIPHER/service.rb'

class AutoKeyVigenereService
  def initialize
    @vigenere_service = VigenereService.new
  end

  def extend_key_auto_key_vigenere(key, text)
    extended_key = key + text
    extended_key[0, text.length]
  end

  def encrypt_auto_key_vigenere(text, key)
    @vigenere_service.encrypt_vigenere(text, key)
  end

  def decrypt_auto_key_vigenere(text, key)
    @vigenere_service.decrypt_vigenere(text, key)
  end
end