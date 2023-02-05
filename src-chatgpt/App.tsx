import React, { useState } from 'react';
import { Container, Button, Input } from '@mantine/core';

const DialectTranslator = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleCsvSelect = (event) => {
    const file = event.target.files[0];
    setCsvFile(file);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleTranslate = () => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const csv = event.target.result;
      const lines = csv.split('\n');
      const wordMap = new Map();
  
      for (const line of lines) {
        const [source, translation] = line.split(',');
        wordMap.set(source, translation);
      }
  
      const words = input.split(' ');
      const translatedWords = words.map((word) => {
        return wordMap.get(word) || word;
      });
      const translatedText = translatedWords.join(' ');
      setOutput(translatedText);
    };
    reader.readAsText(csvFile);
  };    

  return (
    <Container p='lg'>
      <h1>Dialect Translator</h1>
      <input type="file" onChange={handleCsvSelect} />
      <Input value={input} onChange={handleInputChange} />
      <Button onClick={handleTranslate}>Translate</Button>
      {output}
    </Container>
  );
};

export default DialectTranslator;