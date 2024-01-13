import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import io from 'socket.io-client';
import React, {useState} from 'react';
import PirateForm from './components/PirateForm.jsx';
import PirateList from './components/PirateList';
import PirateDetails from './components/PirateDetails';
import EditOne from './components/EditOne';


function App() {

  const socket = io('http://localhost:8000', {transports: ['websocket']})
  const [update, setUpdate] = useState(false)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/pirates" />} />
          <Route path='/pirates' element={<PirateList update={update} setUpdate={setUpdate} socket={socket}/>}/>
          <Route path='/pirate/new' element={<PirateForm socket={socket}/>}/>
          <Route path='/pirate/:id' element={<PirateDetails socket={socket} update={update} setUpdate={setUpdate} />}/>
          <Route path="/pirate/:id/edit" element={<EditOne />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;