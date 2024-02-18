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
} from '@chakra-ui/react'
import { INPUT_OPTION, METHOD } from '../utils/constant';
import axios from 'axios';

export const Home = () => {
  const [inputOption, setInputOption] = useState<string>(INPUT_OPTION.TEXT);
  const [inputText, setInputText] = useState<string>('');
  const [method, setMethod] = useState<string>(METHOD.VIGNERE_CIPHER);
  const [key, setKey] = useState<string>('');
  const [keyM, setKeyM] = useState<string>('');
  const [keyB, setKeyB] = useState<string>('');
  const [errorText, setErrorText] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const encrypt = async () => {
    setErrorText('');

    try {
      if (inputOption === INPUT_OPTION.FILE) {
        return;
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

          const response = await axios.post(`${import.meta.env.VITE_API_URL}/encrypt`, {
            inputOption,
            inputText,
            method,
            keyM: parseInt(keyM),
            keyB: parseInt(keyB),
          });
          setResult(response.data.result);
        } else {
          if (key === '') {
            setErrorText('Key cannot be empty');
            return;
          }

          const response = await axios.post(`${import.meta.env.VITE_API_URL}/encrypt`, {
            inputOption,
            inputText,
            method,
            key,
          });
          setResult(response.data.result);
        }
      }
    } catch (e) {
      setErrorText((e as Error).message);
    }
  }

  const decrypt = async () => {
    setErrorText('');

    try {
      if (inputOption === INPUT_OPTION.FILE) {
        return;
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

          const response = await axios.post(`${import.meta.env.VITE_API_URL}/decrypt`, {
            inputOption,
            inputText,
            method,
            keyM: parseInt(keyM),
            keyB: parseInt(keyB),
          });
          setResult(response.data.result);
        } else {
          if (key === '') {
            setErrorText('Key cannot be empty');
            return;
          }

          const response = await axios.post(`${import.meta.env.VITE_API_URL}/decrypt`, {
            inputOption,
            inputText,
            method,
            key,
          });
          setResult(response.data.result);
        }
      }
    } catch (e) {
      setErrorText((e as Error).message);
    }
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
        <FormControl mt="2">
          <FormLabel>Text</FormLabel>
          <Textarea borderWidth="1px" borderColor="black" placeholder="Input plain text" size="sm" rows={5} onChange={e => setInputText(e.target.value)} />
        </FormControl>
        <FormControl mt="2">
          <FormLabel>Method</FormLabel>
          <Select borderWidth="1px" borderColor="black" placeholder='Select input option' defaultValue={method} onChange={e => setMethod(e.target.value)}>
            <option value={METHOD.VIGNERE_CIPHER}>{METHOD.VIGNERE_CIPHER}</option>
            <option value={METHOD.AUTO_KEY_VIGNERE_CIPHER}>{METHOD.AUTO_KEY_VIGNERE_CIPHER}</option>
            <option value={METHOD.EXTENDED_VIGNERE_CIPHER}>{METHOD.EXTENDED_VIGNERE_CIPHER}</option>
            <option value={METHOD.PLAYFAIR_CIPHER}>{METHOD.PLAYFAIR_CIPHER}</option>
            <option value={METHOD.AFFINE_CIPHER}>{METHOD.AFFINE_CIPHER}</option>
            <option value={METHOD.HILL_CIPHER}>{METHOD.HILL_CIPHER}</option>
            <option value={METHOD.SUPER_ENKRIPSI}>{METHOD.SUPER_ENKRIPSI}</option>
            <option value={METHOD.ENIGMA_CIPHER}>{METHOD.ENIGMA_CIPHER}</option>
          </Select>
        </FormControl>
        <FormControl mt="2">
          <FormLabel>Key</FormLabel>
          {method !== METHOD.AFFINE_CIPHER && <Textarea borderWidth="1px" borderColor="black" placeholder="Input key" size="sm" rows={1} onChange={e => setKey(e.target.value)} />}
          {method === METHOD.AFFINE_CIPHER && (
            <>
              <Textarea borderWidth="1px" borderColor="black" placeholder="Input key m" size="sm" rows={1} onChange={e => setKeyM(e.target.value)} />
              <Textarea borderWidth="1px" borderColor="black" placeholder="Input key b" size="sm" rows={1} onChange={e => setKeyB(e.target.value)} />
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
          <FormLabel>Result</FormLabel>
          <Textarea borderWidth="1px" borderColor="black" placeholder="Result" value={result} size="sm" rows={5} readOnly />
        </FormControl>
      </Box>
    </>
  )
}