# Clean text from number, space, & special characters and convert to lower case
def clean_text(text):
  return ''.join(e for e in text if e.isalnum()).upper()