import { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Heading,
  Box,
  Select,
  Textarea,
  Button,
  Alert,
  AlertIcon,
  Input,
  Spinner,
} from '@chakra-ui/react'
import { INPUT_OPTION, METHOD } from '../utils/constant';
import axios, { AxiosError } from 'axios';

export const Home = () => {
  const [inputOption, setInputOption] = useState<string>(INPUT_OPTION.TEXT);
  const [inputText, setInputText] = useState<string>('');
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [method, setMethod] = useState<string>(METHOD.VIGENERE_CIPHER);
  const [key, setKey] = useState<string>('');
  const [keyM, setKeyM] = useState<string>('');
  const [keyB, setKeyB] = useState<string>('');
  const [keyVigenere, setKeyVigenere] = useState<string>('');
  const [keyTransposition, setKeyTransposition] = useState<string>('');
  const [keyMatrixSize, setKeyMatrixSize] = useState<string>('');
  const [keyMatrixValue, setKeyMatrixValue] = useState<string[][]>([]);
  const [errorText, setErrorText] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const encrypt = async () => {
    setErrorText('');
    setResult('');
    setLoading(true);
    let response;

    try {
      if (inputOption === INPUT_OPTION.FILE) {
        if (!inputFile) {
          setErrorText('Input file cannot be empty');
          return;
        }

        if (method === METHOD.AFFINE_CIPHER) {
          if (keyM === '') {
            setErrorText('Key M cannot be empty');
            return;
          } else if (isNaN(parseInt(keyM))) {
            setErrorText('Key M must be an integer');
            return;
          } else if (parseInt(keyM) % 2 === 0 || parseInt(keyM) % 13 === 0) {
            setErrorText('Key M must be relative prime with 26');
            return;
          }

          if (keyB === '') {
            setErrorText('Key B cannot be empty');
            return;
          } else if (isNaN(parseInt(keyB))) {
            setErrorText('Key B must be an integer');
            return;
          }

          const formData = new FormData();
          formData.append('inputOption', inputOption);
          formData.append('inputFile', inputFile);
          formData.append('method', method);
          formData.append('keyM', keyM);
          formData.append('keyB', keyB);

          response = await axios.post(`${import.meta.env.VITE_API_URL}/encrypt`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } else if (method === METHOD.HILL_CIPHER) {
          if (keyMatrixSize === '') {
            setErrorText('Key matrix size cannot be empty');
            return;
          } else if (isNaN(parseInt(keyMatrixSize))) {
            setErrorText('Key matrix size must be an integer');
            return;
          }

          for (let i = 0; i < parseInt(keyMatrixSize); i++) {
            for (let j = 0; j < parseInt(keyMatrixSize); j++) {
              if (keyMatrixValue[i][j] === '') {
                setErrorText('Key matrix value cannot be empty');
                return;
              } else if (isNaN(parseInt(keyMatrixValue[i][j]))) {
                setErrorText('Key matrix value must be an integer');
                return;
              }
            }
          }

          const formData = new FormData();
          formData.append('inputOption', inputOption);
          formData.append('inputFile', inputFile);
          formData.append('method', method);
          formData.append('keyMatrixSize', keyMatrixSize);
          formData.append('keyMatrixValue', JSON.stringify(keyMatrixValue));

          response = await axios.post(`${import.meta.env.VITE_API_URL}/encrypt`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } else if (method === METHOD.SUPER_ENKRIPSI) {
          if (keyVigenere === '') {
            setErrorText('Key Vigenere cannot be empty');
            return;
          }

          if (keyTransposition === '') {
            setErrorText('Key Transposition cannot be empty');
            return;
          } else if (isNaN(parseInt(keyTransposition))) {
            setErrorText('Key Transposition must be an integer');
            return;
          }

          const formData = new FormData();
          formData.append('inputOption', inputOption);
          formData.append('inputFile', inputFile);
          formData.append('method', method);
          formData.append('keyVigenere', keyVigenere);
          formData.append('keyTransposition', keyTransposition);

          response = await axios.post(`${import.meta.env.VITE_API_URL}/encrypt`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } else {
          if (key === '') {
            setErrorText('Key cannot be empty');
            return;
          }

          const formData = new FormData();
          formData.append('inputOption', inputOption);
          formData.append('inputFile', inputFile);
          formData.append('method', method);
          formData.append('key', key);

          response = await axios.post(`${import.meta.env.VITE_API_URL}/encrypt`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        }

        if (response.data.result) {
          setResult(response.data.result);
        } else {
          setErrorText(response.data.error);
        }
      } else if (inputOption === INPUT_OPTION.TEXT) {
        if (inputText === '') {
          setErrorText('Input text cannot be empty');
          return;
        }

        if (method === METHOD.AFFINE_CIPHER) {
          if (keyM === '') {
            setErrorText('Key M cannot be empty');
            return;
          } else if (isNaN(parseInt(keyM))) {
            setErrorText('Key M must be an integer');
            return;
          } else if (parseInt(keyM) % 2 === 0 || parseInt(keyM) % 13 === 0) {
            setErrorText('Key M must be relative prime with 26');
            return;
          }

          if (keyB === '') {
            setErrorText('Key B cannot be empty');
            return;
          } else if (isNaN(parseInt(keyB))) {
            setErrorText('Key B must be an integer');
            return;
          }

          response = await axios.post(`${import.meta.env.VITE_API_URL}/encrypt`, {
            inputOption,
            inputText,
            method,
            keyM,
            keyB,
          });
        } else if (method === METHOD.HILL_CIPHER) {
          if (keyMatrixSize === '') {
            setErrorText('Key matrix size cannot be empty');
            return;
          } else if (isNaN(parseInt(keyMatrixSize))) {
            setErrorText('Key matrix size must be an integer');
            return;
          }

          for (let i = 0; i < parseInt(keyMatrixSize); i++) {
            for (let j = 0; j < parseInt(keyMatrixSize); j++) {
              if (keyMatrixValue[i][j] === '') {
                setErrorText('Key matrix value cannot be empty');
                return;
              } else if (isNaN(parseInt(keyMatrixValue[i][j]))) {
                setErrorText('Key matrix value must be an integer');
                return;
              }
            }
          }

          response = await axios.post(`${import.meta.env.VITE_API_URL}/encrypt`, {
            inputOption,
            inputText,
            method,
            keyMatrixSize,
            keyMatrixValue,
          });
        } else if (method === METHOD.SUPER_ENKRIPSI) {
          if (keyVigenere === '') {
            setErrorText('Key Vigenere cannot be empty');
            return;
          }

          if (keyTransposition === '') {
            setErrorText('Key Transposition cannot be empty');
            return;
          } else if (isNaN(parseInt(keyTransposition))) {
            setErrorText('Key Transposition must be an integer');
            return;
          }

          response = await axios.post(`${import.meta.env.VITE_API_URL}/encrypt`, {
            inputOption,
            inputText,
            method,
            keyVigenere,
            keyTransposition,
          });
        } else {
          if (key === '') {
            setErrorText('Key cannot be empty');
            return;
          }

          response = await axios.post(`${import.meta.env.VITE_API_URL}/encrypt`, {
            inputOption,
            inputText,
            method,
            key,
          });
        }

        if (response.data.result) {
          setResult(response.data.result);
        } else {
          setErrorText(response.data.error);
        }
      }
    } catch (e) {
      setErrorText((e as AxiosError).message);
    } finally {
      setLoading(false);
    }
  }

  const decrypt = async () => {
    setErrorText('');
    setResult('');
    setLoading(true);
    let response;

    try {
      if (inputOption === INPUT_OPTION.FILE) {
        if (!inputFile) {
          setErrorText('Input file cannot be empty');
          return;
        }

        if (method === METHOD.AFFINE_CIPHER) {
          if (keyM === '') {
            setErrorText('Key M cannot be empty');
            return;
          } else if (isNaN(parseInt(keyM))) {
            setErrorText('Key M must be an integer');
            return;
          } else if (parseInt(keyM) % 2 === 0 || parseInt(keyM) % 13 === 0) {
            setErrorText('Key M must be relative prime with 26');
            return;
          }

          if (keyB === '') {
            setErrorText('Key B cannot be empty');
            return;
          } else if (isNaN(parseInt(keyB))) {
            setErrorText('Key B must be an integer');
            return;
          }

          const formData = new FormData();
          formData.append('inputOption', inputOption);
          formData.append('inputFile', inputFile);
          formData.append('method', method);
          formData.append('keyM', keyM);
          formData.append('keyB', keyB);

          response = await axios.post(`${import.meta.env.VITE_API_URL}/decrypt`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } else if (method === METHOD.HILL_CIPHER) {
          if (keyMatrixSize === '') {
            setErrorText('Key matrix size cannot be empty');
            return;
          } else if (isNaN(parseInt(keyMatrixSize))) {
            setErrorText('Key matrix size must be an integer');
            return;
          }

          for (let i = 0; i < parseInt(keyMatrixSize); i++) {
            for (let j = 0; j < parseInt(keyMatrixSize); j++) {
              if (keyMatrixValue[i][j] === '') {
                setErrorText('Key matrix value cannot be empty');
                return;
              } else if (isNaN(parseInt(keyMatrixValue[i][j]))) {
                setErrorText('Key matrix value must be an integer');
                return;
              }
            }
          }

          const formData = new FormData();
          formData.append('inputOption', inputOption);
          formData.append('inputFile', inputFile);
          formData.append('method', method);
          formData.append('keyMatrixSize', keyMatrixSize);
          formData.append('keyMatrixValue', JSON.stringify(keyMatrixValue));

          response = await axios.post(`${import.meta.env.VITE_API_URL}/decrypt`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } else if (method === METHOD.SUPER_ENKRIPSI) {
          if (keyVigenere === '') {
            setErrorText('Key Vigenere cannot be empty');
            return;
          }

          if (keyTransposition === '') {
            setErrorText('Key Transposition cannot be empty');
            return;
          } else if (isNaN(parseInt(keyTransposition))) {
            setErrorText('Key Transposition must be an integer');
            return;
          }

          const formData = new FormData();
          formData.append('inputOption', inputOption);
          formData.append('inputFile', inputFile);
          formData.append('method', method);
          formData.append('keyVigenere', keyVigenere);
          formData.append('keyTransposition', keyTransposition);

          response = await axios.post(`${import.meta.env.VITE_API_URL}/decrypt`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } else {
          if (key === '') {
            setErrorText('Key cannot be empty');
            return;
          }

          const formData = new FormData();
          formData.append('inputOption', inputOption);
          formData.append('inputFile', inputFile);
          formData.append('method', method);
          formData.append('key', key);

          response = await axios.post(`${import.meta.env.VITE_API_URL}/decrypt`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        }

        if (response.data.result) {
          setResult(response.data.result);
        } else {
          setErrorText(response.data.error);
        }
      } else if (inputOption === INPUT_OPTION.TEXT) {
        if (inputText === '') {
          setErrorText('Input text cannot be empty');
          return;
        }

        if (method === METHOD.AFFINE_CIPHER) {
          if (keyM === '') {
            setErrorText('Key M cannot be empty');
            return;
          } else if (isNaN(parseInt(keyM))) {
            setErrorText('Key M must be an integer');
            return;
          } else if (parseInt(keyM) % 2 === 0 || parseInt(keyM) % 13 === 0) {
            setErrorText('Key M must be relative prime with 26');
            return;
          }

          if (keyB === '') {
            setErrorText('Key B cannot be empty');
            return;
          } else if (isNaN(parseInt(keyB))) {
            setErrorText('Key B must be an integer');
            return;
          }

          response = await axios.post(`${import.meta.env.VITE_API_URL}/decrypt`, {
            inputOption,
            inputText,
            method,
            keyM,
            keyB,
          });
        } else if (method === METHOD.HILL_CIPHER) {
          if (keyMatrixSize === '') {
            setErrorText('Key matrix size cannot be empty');
            return;
          } else if (isNaN(parseInt(keyMatrixSize))) {
            setErrorText('Key matrix size must be an integer');
            return;
          }

          for (let i = 0; i < parseInt(keyMatrixSize); i++) {
            for (let j = 0; j < parseInt(keyMatrixSize); j++) {
              if (keyMatrixValue[i][j] === '') {
                setErrorText('Key matrix value cannot be empty');
                return;
              } else if (isNaN(parseInt(keyMatrixValue[i][j]))) {
                setErrorText('Key matrix value must be an integer');
                return;
              }
            }
          }

          response = await axios.post(`${import.meta.env.VITE_API_URL}/decrypt`, {
            inputOption,
            inputText,
            method,
            keyMatrixSize,
            keyMatrixValue,
          });
        } else if (method === METHOD.SUPER_ENKRIPSI) {
          if (keyVigenere === '') {
            setErrorText('Key Vigenere cannot be empty');
            return;
          }

          if (keyTransposition === '') {
            setErrorText('Key Transposition cannot be empty');
            return;
          } else if (isNaN(parseInt(keyTransposition))) {
            setErrorText('Key Transposition must be an integer');
            return;
          }

          response = await axios.post(`${import.meta.env.VITE_API_URL}/decrypt`, {
            inputOption,
            inputText,
            method,
            keyVigenere,
            keyTransposition,
          });
        } else {
          if (key === '') {
            setErrorText('Key cannot be empty');
            return;
          }

          response = await axios.post(`${import.meta.env.VITE_API_URL}/decrypt`, {
            inputOption,
            inputText,
            method,
            key,
          });
        }

        if (response.data.result) {
          setResult(response.data.result);
        } else {
          setErrorText(response.data.error);
        }
      }
    } catch (e) {
      setErrorText((e as AxiosError).message);
    } finally {
      setLoading(false);
    }
  }

  const downloadResult = () => {
    const element = document.createElement('a');
    const file = new Blob([result], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'result.txt';
    document.body.appendChild(element);
    element.click();
  }

  return (
    <>
      <Heading as="h1" size="xl" textAlign="center" my="4" mx="4">
        Tugas 1 IF4020 Kriptografi
      </Heading>
      <Box borderWidth="2px" borderRadius="md" p="4" mx="4" bg="gray.50">
        <FormControl mt="2">
          <FormLabel>Input</FormLabel>
          <Select borderWidth="1px" borderColor="black" placeholder='Select input option' defaultValue={inputOption} onChange={e => setInputOption(e.target.value)}>
            <option value={INPUT_OPTION.TEXT}>{INPUT_OPTION.TEXT}</option>
            <option value={INPUT_OPTION.FILE}>{INPUT_OPTION.FILE}</option>
          </Select>
        </FormControl>
        {inputOption === INPUT_OPTION.TEXT && <FormControl mt="2">
          <FormLabel>Text</FormLabel>
          <Textarea borderWidth="1px" borderColor="black" placeholder="Input plain text" size="sm" rows={5} onChange={e => setInputText(e.target.value)} />
        </FormControl>}
        {inputOption === INPUT_OPTION.FILE && <FormControl mt="2">
          <FormLabel>File</FormLabel>
          <Input type="file" borderWidth="1px" borderColor="black" size="sm" onChange={e => setInputFile(e.target.files?.length ? (e.target.files?.length > 0 ? e.target.files[0] : null) : null)} />
        </FormControl>}
        <FormControl mt="2">
          <FormLabel>Method</FormLabel>
          <Select borderWidth="1px" borderColor="black" placeholder='Select input option' defaultValue={method} onChange={e => setMethod(e.target.value)}>
            <option value={METHOD.VIGENERE_CIPHER}>{METHOD.VIGENERE_CIPHER}</option>
            <option value={METHOD.AUTO_KEY_VIGENERE_CIPHER}>{METHOD.AUTO_KEY_VIGENERE_CIPHER}</option>
            <option value={METHOD.EXTENDED_VIGENERE_CIPHER}>{METHOD.EXTENDED_VIGENERE_CIPHER}</option>
            <option value={METHOD.PLAYFAIR_CIPHER}>{METHOD.PLAYFAIR_CIPHER}</option>
            <option value={METHOD.AFFINE_CIPHER}>{METHOD.AFFINE_CIPHER}</option>
            <option value={METHOD.HILL_CIPHER}>{METHOD.HILL_CIPHER}</option>
            <option value={METHOD.SUPER_ENKRIPSI}>{METHOD.SUPER_ENKRIPSI}</option>
            <option value={METHOD.ENIGMA_CIPHER}>{METHOD.ENIGMA_CIPHER}</option>
          </Select>
        </FormControl>
        <FormControl mt="2">
          <FormLabel>Key</FormLabel>
          {method !== METHOD.AFFINE_CIPHER && method !== METHOD.HILL_CIPHER && method !== METHOD.SUPER_ENKRIPSI && <Textarea borderWidth="1px" borderColor="black" placeholder="Input key" size="sm" rows={1} onChange={e => setKey(e.target.value)} />}
          {method === METHOD.AFFINE_CIPHER && (
            <>
              <Textarea borderWidth="1px" borderColor="black" placeholder="Input key m" size="sm" rows={1} onChange={e => setKeyM(e.target.value)} />
              <Textarea borderWidth="1px" borderColor="black" placeholder="Input key b" size="sm" rows={1} onChange={e => setKeyB(e.target.value)} />
            </>
          )}
          {method === METHOD.HILL_CIPHER && (
            <>
              <Textarea borderWidth="1px" borderColor="black" placeholder="Input key matrix size" size="sm" rows={1} onChange={e => {
                setKeyMatrixSize(e.target.value)
                if (!isNaN(parseInt(e.target.value)) && parseInt(e.target.value) > 0) {
                  setKeyMatrixValue(new Array(parseInt(e.target.value)).fill(new Array(parseInt(e.target.value)).fill('')))
                } else {
                  setKeyMatrixValue([])
                }
              }} />
              <Box mt="4">
                {keyMatrixValue.map((row, i) => (
                  <Box key={i} display="flex" flexDirection="row">
                    {row.map((_, j) => (
                      <Input key={j} borderWidth="1px" borderColor="black" size="sm" onChange={e => {
                        const newMatrix = keyMatrixValue.map(row => [...row]);
                        newMatrix[i][j] = e.target.value
                        setKeyMatrixValue(newMatrix)
                      }} />
                    ))}
                  </Box>
                ))}
              </Box>
            </>
          )}
          {method === METHOD.SUPER_ENKRIPSI && (
            <>
              <Textarea borderWidth="1px" borderColor="black" placeholder="Input key vigenere" size="sm" rows={1} onChange={e => setKeyVigenere(e.target.value)} />
              <Textarea borderWidth="1px" borderColor="black" placeholder="Input key transposition" size="sm" rows={1} onChange={e => setKeyTransposition(e.target.value)} />
            </>
          )}
        </FormControl>
        <FormControl mt="2">
          <Button colorScheme="green" size="md" mx="1" onClick={encrypt}>Encrypt</Button>
          <Button colorScheme="green" size="md" mx="1" onClick={decrypt}>Decrypt</Button>
          {errorText && (
            <Alert status="error" my="2">
              <AlertIcon />
              {errorText}
            </Alert>
          )}
        </FormControl>
        <FormControl mt="2">
          <FormLabel>Result {loading && <Spinner color="green.500" />}</FormLabel>
          <Textarea borderWidth="1px" borderColor="gray" color="gray" size="sm" rows={5} value={result} readOnly />
        </FormControl>
        <FormControl mt="2">
          <Button colorScheme="green" size="md" mx="1" onClick={downloadResult}>Download Result</Button>
        </FormControl>
      </Box>
    </>
  )
}