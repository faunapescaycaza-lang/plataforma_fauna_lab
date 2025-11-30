import React, { useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Platforms from './components/Platforms';
import AnimalPage from './components/AnimalPage';
import theme from './theme';
import './App.css';

function App() {
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const activeTheme = useMemo(() => theme(mode), [mode]);

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      <Router>
        <Layout colorMode={colorMode} mode={mode}>
          <Routes>
            <Route path="/" element={<Platforms />} />
            <Route path="/animal/:animalName" element={<AnimalPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
