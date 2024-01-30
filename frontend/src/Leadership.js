// import React from 'react';

// function Leadership() {
//   return (
//     <section id="leadership">
//       <h2>Leadership Experience</h2>
//       <h3>Vice-President of Advocacy and Education | Cornellians for Israel | Ithaca, NY</h3>
//       <ul>
//         <li>Co-facilitate 3+ educational events about Israeli history, politics, and the Israeli-Palestinian conflict.</li>
//         <li>Organize large scale events with 2+ acclaimed speakers, with expected 75+ participants.</li>
//         <li>Administer $4,000 dollars from organization budget for educational events amongst 70+ club members.</li>
//       </ul>
//       <h3>Student Engagement Director | Chabad at Cornell Student Board | Ithaca, NY</h3>
//       <ul>
//         <li>Carry out communication and outreach to over 3,000 incoming and current Jewish Cornell University students.</li>
//         <li>Coordinate with 14 fellow board members in planning 10+ events and organizing weekly Shabbat meals for 100+ students.</li>
//       </ul>
//       <h3>Operations Director | Zeta Beta Tau, Kappa Chapter | Ithaca, NY</h3>
//       <ul>
//         <li>Correspond with local builders to lead 50+ construction projects, and complete 11 inspections and permits at fraternity house.</li>
//         <li>Orchestrate distribution of daily tasks among 20 house residents that include cleaning, maintenance, and inventory management.</li>
//       </ul>
//       <h3>Consulting | TAMID Group at Cornell University | Ithaca, NY</h3>
//       <ul>
//         <li>Attend 8 new member seminars and networking events on elements of finance, consulting, and professional development.</li>
//         <li>Analyze Israeli startup market/trends to present investment opportunities and recommendations in tech startups and venture capital.</li>
//       </ul>
//       <h3>Head Lifeguard | MECA Pool Club | Merrick, NY</h3>
//       <ul>
//         <li>Managed a safe and secure pool by leading a team of 4 lifeguards and enforcing facility policies and procedures.</li>
//         <li>Completed American Red Cross Lifeguarding with CPR/AED for Professional Rescuers and First Aid certification course.</li>
//         <li>Communicated professionally with 40+ pool patrons and customers daily and exemplified a positive and trustworthy attitude.</li>
//       </ul>
//     </section>
//   );
// }

// export default Leadership;

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import moment from 'moment';

Modal.setAppElement('#root'); // This binds your modal to your app element

function Leadership() {
  const [leaderships, setLeaderships] = useState([]); // State for existing leaderships
  const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal visibility
  const [newLeadership, setNewLeadership] = useState({ // State for new leadership form
    organization: '',
    position: '',
    start_date: '',
    end_date: '',
    description: '',
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to control success message

  useEffect(() => {
    fetch('http://localhost:8000/api/leadership/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setLeaderships(data); // Update the skills state with fetched data
      })
      .catch(error => {
        console.error('Error fetching skills:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewLeadership({ ...newLeadership, [name]: type === 'checkbox' ? checked : value, });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new object for the request payload
    let leadershipPayload = {
      ...newLeadership,
      end_date: newLeadership.isCurrent ? null : newLeadership.end_date
    };

    // Remove 'isCurrent' from payload since it's not a part of your Django model
    delete leadershipPayload.isCurrent;

    fetch('http://localhost:8000/api/leadership/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadershipPayload),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setLeaderships(prevLeaderships => [...prevLeaderships, data]);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 2000);
        setNewLeadership({
          organization: '',
          position: '',
          start_date: '',
          end_date: '',
          description: '',
          isCurrent: false,
        });
        setModalIsOpen(false);
      })
      .catch(error => {
        console.error('Error submitting leadership:', error);
      });
  };

  const formatDate = (dateString) => {
    return dateString ? moment(dateString).format('MMMM YYYY') : '';
  };

  const renderLeadership = (lead) => {
    const formattedStartDate = formatDate(lead.start_date);
    const isCurrent = !lead.end_date;
    const formattedEndDate = isCurrent ? 'Current' : formatDate(lead.end_date);

    return (
      <div className="leadership-entry" key={lead.id}>
        <div className="leadership-details">
          <h3>{lead.position} at {lead.organization}</h3>
          <p className="leadership-description">{lead.description.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}</p>
        </div>
        <div className="leadership-dates">
          <p>{formattedStartDate} - {formattedEndDate}</p>
        </div>
      </div>
    );
  };


  return (
    <section id="leadership">
      <h2>Relevant Leadership</h2>
      {leaderships.map(renderLeadership)}
      <button onClick={() => setModalIsOpen(true)}>Add +</button>
      {/* ... Modal and form ... */}
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <form onSubmit={handleSubmit}>
          <label>Organization:<input type="text" name="organization" value={newLeadership.organization} onChange={handleInputChange} /></label>
          <label>Position:<input type="text" name="position" value={newLeadership.position} onChange={handleInputChange} /></label>
          <label>Start Date:<input type="date" name="start_date" value={newLeadership.start_date} onChange={handleInputChange} /></label>
          <label>Currently Working Here:<input
            type="checkbox"
            name="isCurrent"
            checked={newLeadership.isCurrent}
            onChange={handleInputChange} /></label>
          <label>End Date:<input
            type="date"
            name="end_date"
            value={newLeadership.end_date}
            onChange={handleInputChange}
            disabled={newLeadership.isCurrent} /></label>
          <label>Description:<textarea name="description" value={newLeadership.description} onChange={handleInputChange} /></label>
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

export default Leadership;


