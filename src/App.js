import './App.css';
import Navbar from './components/Navbar';
import Home  from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './components/About';
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar/>
      <Routes>
      <Route exact path = '/home' element={<Home/>}/>
      <Route exact path = '/about' element={<About/>}/>
    </Routes>
    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
