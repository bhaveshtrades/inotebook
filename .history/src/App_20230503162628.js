import './App.css';
import Navbar from './components/Navbar';
import Home  from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

function App() {
  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar/>
    <Alert message="This is an amazing alert"/>
    <div className='container'>
      <Routes>
      <Route exact path = '/home' element={<Home/>}/>
      <Route exact path = '/about' element={<About/>}/>
    </Routes>
    </div>
    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
