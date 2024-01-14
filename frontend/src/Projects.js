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


import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');


function Projects() {
  const [projects, setProjects] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technology: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewProject({ ...newProject, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newProject.title);
    formData.append('description', newProject.description);
    formData.append('technology', newProject.technology);
    formData.append('image', newProject.image);

    // Replace with your actual POST request URL and include necessary headers
    fetch('http://localhost:8000/api/projects/', {
      method: 'POST',
      body: formData, // For file upload, FormData should be used
    })
      .then(response => response.json())
      .then(data => {
        setProjects([...projects, data]);
        setModalIsOpen(false);
        setNewProject({ title: '', description: '', technology: '', image: null });
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <section id="projects">
      <h2>Projects</h2>
      {projects.map(project => (
        <div key={project.id}>
          <h3>{project.title}</h3>
          {/* Display project details */}
        </div>
      ))}
      <button onClick={() => setModalIsOpen(true)}>Add +</button>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <form onSubmit={handleSubmit}>
          <label>Title:<input type="text" name="title" value={newProject.title} onChange={handleInputChange} /></label>
          <label>Description:<textarea name="description" value={newProject.description} onChange={handleInputChange} /></label>
          <label>Technology:<input type="text" name="technology" value={newProject.technology} onChange={handleInputChange} /></label>
          <label>Image:<input type="file" name="image" onChange={handleImageChange} /></label>
          <button type="submit">Submit</button>
          <button onClick={() => setModalIsOpen(false)}>Cancel</button>
        </form>
      </Modal>
    </section>
  );
}

export default Projects;
