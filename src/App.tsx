import { MantineProvider, Title, Text, Center } from "@mantine/core";
import TranslatorPage from './TranslatorPage';

export default function App() {
  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <TranslatorPage />
    </MantineProvider>
  );
}
