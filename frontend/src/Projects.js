// import React from 'react';

// function Projects() {
//   return (
//     <section id="projects">
//       <h2>Project Experience</h2>
//       <h3>Smart Crib Research and Development | Long Island, NY</h3>
//       <ul>
//         <li>Investigated potential causes of Sudden Infant Death Syndrome, specifically focusing on the impact of infant sleeping positions.</li>
//         <li>Built a computer vision algorithm with IBM Watson, achieving a confidence score of 0.92 in classifying infant positions.</li>
//         <li>Devised and executed an experiment using open-source Processing to integrate facial recognition and confidently detect breathing patterns with a positive-derivative low pass filter, and developed an Android App to send customizable mobile alerts.</li>
//         <li>Compiled and submitted research in collaboration with two team members for presentation at Long Island Science and Engineering Fair (LISEF), and was awarded second place in the category of biomedical engineering.</li>
//       </ul>
//     </section>
//   );
// }

// export default Projects;


import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function Projects() {
  const [projects, setProjects] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/projects/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setProjects(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/projects/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProject),
    })
      .then(response => response.json())
      .then(data => {
        setProjects([...projects, data]);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 2000);
        setNewProject({ title: '', description: '' });
        setModalIsOpen(false);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <section id="projects">
      <h2>Projects</h2>
      {projects.map(project => (
        <div key={project.id}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
      ))}
      <button onClick={() => setModalIsOpen(true)}>Add +</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <form onSubmit={handleSubmit}>
          <label>Title:<input type="text" name="title" value={newProject.title} onChange={handleInputChange} /></label>
          <label>Description:<textarea name="description" value={newProject.description} onChange={handleInputChange} /></label>
          <button type="submit">Submit</button>
          <button onClick={() => setModalIsOpen(false)}>Cancel</button>
        </form>
      </Modal>
      {showSuccessMessage && (
        <div className="success-message">Added Successfully!</div>
      )}
    </section>
  );
}

export default Projects;
