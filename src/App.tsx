import './App.css';
import React, {useState} from 'react';
import { Routes , Route} from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import JobEditor from './components/JobEditor/JobEditor';
import JobEditorCategory from './components/JobEditorCategory/JobEditorCategory';

function App() {

  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/job-editor/:id" element={<JobEditor/>} />
        <Route path="/job-editor-category/:category" element={<JobEditorCategory/>} />
      </Routes> 
    </div>
  );
}
export default App;