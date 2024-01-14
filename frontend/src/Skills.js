// // src/Skills.js
// import React from 'react';

// function Skills() {
//   return (
//     <section id="skills">
//       <h2>Technical Skills</h2>
//       <ul>
//         <li>Development Tools: Java, Python, JavaScript, Data Structures, Object-Oriented Design</li>
//         <li>Frameworks and Software: React Native, VS Code, IntelliJ, PyCharm</li>
//         <li>Data Analysis Tools: JupyterLab, MATLAB</li>
//       </ul>
//     </section>
//   );
// }

// export default Skills;


// import React, { useState } from 'react';
// import Modal from 'react-modal';

// function Skills() {
//   const [skills, setSkills] = useState([]);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [newSkill, setNewSkill] = useState({
//     category: 'Development Tools',
//     description: '',
//   });
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to control success message

//   useEffect(() => {
//     fetch('http://localhost:8000/api/skills/')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setSkills(data); // Update the skills state with fetched data
//       })
//       .catch(error => {
//         console.error('Error fetching skills:', error);
//       });
//   }, []); // The empty array ensures this effect runs only once after initial render

//   const handleInputChange =

//     (e) => {
//       const { name, value } = e.target;
//       setNewSkill({ ...newSkill, [name]: value });
//     };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetch('http://localhost:8000/api/skills/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newSkill)
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setSkills(prevSkills => [...prevSkills, data]);
//         setShowSuccessMessage(true);
//         setTimeout(() => setShowSuccessMessage(false), 2000);
//         setNewSkill({ category: 'Development Tools', description: '' });
//         setModalIsOpen(false);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   };

//   return (
//     <section id="skills">
//       <h2>Skills</h2>
//       {skills.map((skill, index) => (
//         <div key={index}>
//           <p>{skill.description}</p>
//         </div>
//       ))}
//       <button onClick={() => setModalIsOpen(true)}>Add +</button>

//       <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
//         <form onSubmit={handleSubmit}>
//           <label>Description:<textarea name="description" value={newSkill.description} onChange={handleInputChange} /></label>
//           <button type="submit">Submit</button>
//           <button onClick={() => setModalIsOpen(false)}>Cancel</button>
//         </form>
//       </Modal>
//       {showSuccessMessage && (
//         <div className="success-message">Added Successfully!</div>
//       )}
//     </section>
//   );
// }

// export default Skills;

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function Skills() {
  const [skills, setSkills] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newSkill, setNewSkill] = useState({
    category: 'Development Tools', // default category
    description: '',
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/skills/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setSkills(data); // Update the skills state with fetched data
      })
      .catch(error => {
        console.error('Error fetching skills:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSkill({ ...newSkill, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/skills/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSkill)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setSkills(prevSkills => [...prevSkills, data]);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 2000); // Hide the success message after 2 seconds
        setNewSkill({ category: 'Development Tools', description: '' }); // Reset form fields
        setModalIsOpen(false); // Close the modal
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // Group skills by category for display
  const groupedSkills = skills.reduce((acc, skill) => {
    (acc[skill.category] = acc[skill.category] || []).push(skill.description);
    return acc;
  }, {});

  return (
    <section id="skills">
      <h2>Skills</h2>
      {Object.entries(groupedSkills).map(([category, skillsList]) => (
        <p key={category}>
          <strong>{category}:</strong> {skillsList.join(', ')}
        </p>
      ))}
      <button onClick={() => setModalIsOpen(true)}>Add +</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <form onSubmit={handleSubmit}>
          <label>
            Category:
        <select name="category" value={newSkill.category} onChange={handleInputChange}>
              <option value="Development Tools">Development Tools</option>
              <option value="Frameworks">Frameworks</option>
              <option value="Software">Software</option>
              <option value="Data Analysis Tools">Data Analysis Tools</option>
            </select>
          </label>
          <label>
            Skill:
        <input type="text" name="description" value={newSkill.description} onChange={handleInputChange} />
          </label>
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

export default Skills;    