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

///////////////// WITHOUT DATES //////////////////

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
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/education/')
      .then(response => response.json())
      .then(data => setEducations(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEducation({ ...newEducation, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8000/api/education/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEducation)
    })
      .then(response => response.json())
      .then(data => {
        setEducations([...educations, data]);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 2000);
        setNewEducation({
          institution: '',
          degree: '',
          gpa: '',
          related_courses: '',
          field_of_study: ''
        });
        setModalIsOpen(false);
      })
      .catch(error => console.error('Error:', error));
  };

  const renderEducation = (edu) => (
    <div key={edu.id}>
      <h3>{edu.degree} - {edu.field_of_study}</h3>
      <p>{edu.institution} | GPA: {edu.gpa}</p>
      <p>Related Courses: {edu.related_courses}</p>
    </div>
  );

  return (
    <section id="education">
      <h2>Education</h2>
      {educations.map(renderEducation)}
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

///////////////// WITH DATES //////////////////

// import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal';
// import moment from 'moment';

// Modal.setAppElement('#root');

// function Education() {
//   const [educations, setEducations] = useState([]);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [newEducation, setNewEducation] = useState({
//     institution: '',
//     degree: '',
//     gpa: '',
//     related_courses: '',
//     field_of_study: '',
//     start_date: '',
//     end_date: '',
//     currently_enrolled: false,
//   });
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);

//   useEffect(() => {
//     fetch('http://localhost:8000/api/education/')
//       .then(response => response.json())
//       .then(data => setEducations(data))
//       .catch(error => console.error('Error:', error));
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setNewEducation({
//       ...newEducation,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const educationPayload = {
//       ...newEducation,
//       end_date: newEducation.currently_enrolled ? null : newEducation.end_date,
//     };

//     fetch('http://localhost:8000/api/education/', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(educationPayload),
//     })
//       .then(response => response.json())
//       .then(data => {
//         setEducations([...educations, data]);
//         setShowSuccessMessage(true);
//         setTimeout(() => setShowSuccessMessage(false), 2000);
//         setNewEducation({
//           institution: '',
//           degree: '',
//           gpa: '',
//           related_courses: '',
//           field_of_study: '',
//           start_date: '',
//           end_date: '',
//           currently_enrolled: false,
//         });
//         setModalIsOpen(false);
//       })
//       .catch(error => console.error('Error:', error));
//   };

//   const formatDate = (dateString) => {
//     // Check specifically for null or undefined, allowing empty strings to be processed
//     return dateString == null ? 'Current' : moment(dateString).format('MMMM YYYY');
//   };

//   const renderEducation = (edu) => {
//     const formattedStartDate = formatDate(edu.start_date);
//     // Check if currently enrolled or no end date is provided
//     const isCurrent = edu.currently_enrolled || edu.end_date == null;
//     const formattedEndDate = isCurrent ? 'Current' : formatDate(edu.end_date);

//     return (
//       <div className="education-entry" key={edu.id}>
//         <div className="education-details">
//           <h3>{edu.degree} - {edu.field_of_study}</h3>
//           <p>{edu.institution} | GPA: {edu.gpa}</p>
//           <p>Related Courses: {edu.related_courses}</p>
//         </div>
//         <div className="education-dates">
//           <p>{formattedStartDate} - {formattedEndDate}</p>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <section id="education">
//       <h2>Education</h2>
//       {educations.map(renderEducation)}
//       <button onClick={() => setModalIsOpen(true)}>Add +</button>

//       <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
//         <form onSubmit={handleSubmit}>

//           <label>Institution:<input type="text" name="institution" value={newEducation.institution} onChange={handleInputChange} /></label>
//           <label>Degree:<input type="text" name="degree" value={newEducation.degree} onChange={handleInputChange} /></label>
//           <label>GPA:<input type="text" name="gpa" value={newEducation.gpa} onChange={handleInputChange} /></label>
//           <label>Related Courses:<input type="text" name="related_courses" value={newEducation.related_courses} onChange={handleInputChange} /></label>
//           <label>Field of Study:<input type="text" name="field_of_study" value={newEducation.field_of_study} onChange={handleInputChange} /></label>
//           <label>Start Date:<input type="date" name="start_date" value={newEducation.start_date} onChange={handleInputChange} /></label>
//           <label>Currently Enrolled:
//         <input
//               type="checkbox"
//               name="currently_enrolled"
//               checked={newEducation.currently_enrolled}
//               onChange={handleInputChange}
//             />
//           </label>
//           {!newEducation.currently_enrolled && (
//             <label>End Date:
//               <input
//                 type="date"
//                 name="end_date"
//                 value={newEducation.end_date}
//                 onChange={handleInputChange}
//               />
//             </label>
//           )}
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

// export default Education;

