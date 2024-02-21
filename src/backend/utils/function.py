# Clean text from number, space, & special characters and convert to upper case
def clean_text(text):
  return ''.join(e for e in text if e.isalpha()).upper()