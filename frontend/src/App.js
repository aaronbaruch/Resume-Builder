// App.js
import React from 'react';
import './App.css';
import Education from './Education';
import Skills from './Skills';
import Experience from './Experience';
import Projects from './Projects';
import Leadership from './Leadership';

function App() {
  return (
    <div className="App">
      <Education />
      <Skills />
      <Experience />
      <Projects />
      <Leadership />
    </div>
  );
}

export default App;
