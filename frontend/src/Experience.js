// import React from 'react';

// function Experience() {
//   return (
//     <section id="experience">
//       <h2>Relevant Experience</h2>
//       <h3>Software Development Intern | SODA Dev | Haifa, Israel</h3>
//       <ul>
//         <li>Developed an Auto-Tagger tool in JavaScript, achieving 100% accuracy in classifying patients based on metabolic risk.</li>
//         <li>Aided front-end team in building a mobile application in React Native for metabolic risk monitoring in assisted living homes.</li>
//         <li>Debugged and tested SQLite database of the application, improving the reliability and efficiency of the back-end.</li>
//         <li>Analyzed and simplified medical data/machine learning results in JupyterLab for metabolic risk of 25,028 patients.</li>
//         <li>Collaborated with data science team to collect and evaluate over 100 different visualizations of statistical data.</li>
//         <li>Constructed a detailed research and development report to comprehensively present machine learning results to 3 executives.</li>
//       </ul>
//       <h3>Course Consultant | Cornell University | Ithaca, NY</h3>
//       <ul>
//         <li>Participate in staff training sessions and lead discussion/lab sections, provide online assistance, and grade homework/exams for students taking Introduction to Computing: A Design and Development Perspective.</li>
//         <li>Selected based on demonstrated interest in teaching computer science with students and grade performance of an A in the course for proficient work in Python programming.</li>
//       </ul>
//     </section>
//   );
// }

// export default Experience;

// src/components/Experience.js

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import moment from 'moment';

Modal.setAppElement('#root'); // This binds your modal to your app element

function Experience() {
  const [experiences, setExperiences] = useState([]); // State for existing experiences
  const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal visibility
  const [newExperience, setNewExperience] = useState({ // State for new experience form
    company: '',
    position: '',
    start_date: '',
    end_date: '',
    description: '',
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to control success message

  useEffect(() => {
    fetch('http://localhost:8000/api/experience/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setExperiences(data); // Update the skills state with fetched data
      })
      .catch(error => {
        console.error('Error fetching skills:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewExperience({ ...newExperience, [name]: type === 'checkbox' ? checked : value, });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new object for the request payload
    let experiencePayload = {
      ...newExperience,
      end_date: newExperience.isCurrent ? null : newExperience.end_date
    };

    // Remove 'isCurrent' from payload since it's not a part of your Django model
    delete experiencePayload.isCurrent;

    fetch('http://localhost:8000/api/experience/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(experiencePayload),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setExperiences(prevExperiences => [...prevExperiences, data]);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 2000);
        setNewExperience({
          company: '',
          position: '',
          start_date: '',
          end_date: '',
          description: '',
          isCurrent: false,
        });
        setModalIsOpen(false);
      })
      .catch(error => {
        console.error('Error submitting experience:', error);
      });
  };

  const formatDate = (dateString) => {
    return dateString ? moment(dateString).format('MMMM YYYY') : '';
  };

  const renderExperience = (exp) => {
    const formattedStartDate = formatDate(exp.start_date);
    const isCurrent = !exp.end_date;
    const formattedEndDate = isCurrent ? 'Current' : formatDate(exp.end_date);

    return (
      <div className="experience-entry" key={exp.id}>
        <div className="experience-details">
          <h3>{exp.position} at {exp.company}</h3>
          <p className="experience-description">{exp.description.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}</p>
        </div>
        <div className="experience-dates">
          <p>{formattedStartDate} - {formattedEndDate}</p>
        </div>
      </div>
    );
  };


  return (
    <section id="experience">
      <h2>Relevant Experience</h2>
      {experiences.map(renderExperience)}
      <button onClick={() => setModalIsOpen(true)}>Add +</button>
      {/* ... Modal and form ... */}
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <form onSubmit={handleSubmit}>
          <label>Company:<input type="text" name="company" value={newExperience.company} onChange={handleInputChange} /></label>
          <label>Position:<input type="text" name="position" value={newExperience.position} onChange={handleInputChange} /></label>
          <label>Start Date:<input type="date" name="start_date" value={newExperience.start_date} onChange={handleInputChange} /></label>
          <label>Currently Working Here:<input
            type="checkbox"
            name="isCurrent"
            checked={newExperience.isCurrent}
            onChange={handleInputChange} /></label>
          <label>End Date:<input
            type="date"
            name="end_date"
            value={newExperience.end_date}
            onChange={handleInputChange}
            disabled={newExperience.isCurrent} /></label>
          <label>Description:<textarea name="description" value={newExperience.description} onChange={handleInputChange} /></label>
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

export default Experience;


