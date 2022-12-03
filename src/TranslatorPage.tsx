import { useState, useEffect } from 'react';
import { Title, Text, Stack, Center, Textarea, FileButton, Button, Group, Space, Container } from "@mantine/core";
import Papa from 'papaparse';

export default function TranslatorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [translationMap, setTranslationMap] = useState<Map<string, string>>(new Map());

  const [englishText, setEnglishText] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string | null>(null);

  useEffect(() => {
    if (file != null) {
      Papa.parse(file as Papa.LocalFile, {
        complete: function(results) {
          const resultArray = results.data as string[][]
          const trimmedArray = resultArray.map(word => {
            return [ word[0].trim(), word[1].trim() ];
          })
          const map = new Map(trimmedArray.map(([e, t]) => [e, t]))
          console.log(map)
          setTranslationMap(map)
        }
      });
    }
  }, [file])
  

  const handleTranslation = () => {
    var input = englishText

    for (const [english, dialect] of translationMap.entries()) {
      let esc = english.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      let reg = new RegExp(esc, 'ig');
      input = input.replaceAll(reg, dialect)
    }

    setTranslatedText(input)
  }

  return (
    <Center>
      <Stack spacing='lg' style={{ width: 750 }} p='lg'>
        <Container>
          <Title align='center' size='h1' color="blue.5">Dialect Translator</Title>
          <Text align='center'>Choose a CSV, input English text, and click 'Translate'.</Text>
          <Text align='center' c='dimmed'>Col 1: English, col 2: Dialect, no headers.</Text>
        </Container>
        <Space />
        <Container style={{ height: 100 }}>
          <Group position="center">
            <FileButton onChange={setFile} accept="csv">
              {(props) => <Button {...props} disabled={file !== null}>{file ? "Selected" : "Select CSV"}</Button>}
            </FileButton>
          </Group>
          {file && (
            <Text size="sm" align="center" mt="sm">
              Word count: {translationMap.size}
            </Text>
          )}
        </Container>
        <Textarea
          placeholder={file === null ? "Select a csv first" : "Enter text to translate"}
          label="English"
          autosize
          disabled={file === null}
          value={englishText} 
          onChange={(event) => setEnglishText(event.currentTarget.value)}
        />
        <Button disabled={englishText == '' || file == null} onClick={handleTranslation}>
          Translate
        </Button>
        <Space />
        {
          translatedText ?
          <Container align='center'>
            <Title size='h3'>Translated</Title>
            <Text>{translatedText}</Text>
          </Container> : null
        }
      </Stack>
    </Center>
  );
}
