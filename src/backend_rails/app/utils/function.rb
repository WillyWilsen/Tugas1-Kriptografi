def clean_text(text)
  text.gsub(/[^a-zA-Z]/, '').upcase
end