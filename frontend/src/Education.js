// // src/Education.js
// import React from 'react';

// function Education() {
//   return (
//     <section id="education">
//       <h2>Education</h2>
//       <p><strong>Cornell University, College of Arts & Sciences | Ithaca, NY</strong><br />
//         Bachelor of Arts, Computer Science (Major), Business for Engineers (Minor)<br />
//         GPA: 3.911 | Expected May 2026<br />
//         Related Courses: Introduction to Computing using Python | Object-Oriented Programming and Data Structures (Java) | Discrete Structures | Linear Algebra | Calculus I, II, III (Currently Enrolled) | Data Structures and Functional Programming (Currently Enrolled)</p>
//       <p><strong>Mechinat Nachshon (The Israeli Educational Institute for Social Leadership) | Sderot, Israel</strong><br />
//         Diploma Received June 2022<br />
//         Exercised leadership, group-living and team-building values in preparatory military academy for Israeli high school graduates</p>
//     </section>
//   );
// }

// export default Education;




import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function Education() {
  const [educations, setEducations] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    gpa: '',
    related_courses: '',
    field_of_study: ''
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to control success message

  useEffect(() => {
    fetch('http://localhost:8000/api/education/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setEducations(data); // Update the skills state with fetched data
      })
      .catch(error => {
        console.error('Error fetching skills:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEducation({ ...newEducation, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Assume your API expects JSON, change to formData if it expects form-data
    fetch('http://localhost:8000/api/education/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEducation)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setEducations(prevEducations => [...prevEducations, data]);
        setShowSuccessMessage(true); // Show success message
        setTimeout(() => setShowSuccessMessage(false), 2000); // Hide success message after 2 seconds
        setNewEducation({ institution: '', degree: '', gpa: '', related_courses: '', field_of_study: '' }); // Reset form fields
        setModalIsOpen(false); // Close the modal
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <section id="education">
      <h2>Education</h2>
      {educations.map((edu, index) => (
        <div key={index}>
          <h3>{edu.degree} - {edu.field_of_study}</h3>
          <p>{edu.institution} | GPA: {edu.gpa}</p>
          <p>Related Courses: {edu.related_courses}</p>
        </div>
      ))}
      <button onClick={() => setModalIsOpen(true)}>Add +</button>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <form onSubmit={handleSubmit}>
          <label>Institution:<input type="text" name="institution" value={newEducation.institution} onChange={handleInputChange} /></label>
          <label>Degree:<input type="text" name="degree" value={newEducation.degree} onChange={handleInputChange} /></label>
          <label>GPA:<input type="text" name="gpa" value={newEducation.gpa} onChange={handleInputChange} /></label>
          <label>Related Courses:<input type="text" name="related_courses" value={newEducation.related_courses} onChange={handleInputChange} /></label>
          <label>Field of Study:<input type="text" name="field_of_study" value={newEducation.field_of_study} onChange={handleInputChange} /></label>
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

export default Education;


