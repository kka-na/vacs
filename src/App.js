import React from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core';
import Navbar from './components/Navbar';
import mainTheme from './mainTheme'
import Home from './pages/home/Home';
import Manual from './pages/manual/Manual';
import Visualization from './pages/visualize/Visualization';
import Alert from './pages/alert/Alert';
import Control from './pages/control/Control';

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visualize" element={<Visualization />} />
          <Route path="/alert" element={<Alert />} />
          <Route path="/control" element={<Control />} />
          <Route path="/manual" element={<Manual />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

