import React, { useEffect, useState, useRef } from 'react';
import { useParams, BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { getData, sendData } from './api';
import { useForm } from "react-cool-form"
import "./styles.css";
import invitation_english from './invitation_english.jpg'
import invitation_hebrew from './invitation_hebrew.jpg'


const Field = ({ id, value, label, checked, onChange }) => (
  <div style={{ marginBottom: '0px' }}>
    <input id={id} value={value} type="checkbox" checked={checked} onChange={onChange} />
    <label htmlFor={id}>{label}</label>
  </div>
);
const Group = ({ title, error, children }) => (
  <div style={{ marginBottom: '20px', textAlign:'center'}}>
    <h3>{title}</h3>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    {children}
  </div>
);

function Submitted() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh', fontSize: '24px', flexDirection: 'column' }}>
      <div>We Got It! Thank You</div>
      <div style={{marginTop:'5%'}}>קיבלנו, תודה</div>
  </div>
  );
}


function HomePage() {
  const form = useRef(null);
  const [checkedItems, setCheckedItems] = useState({});
  const { id } = useParams(); // Grab the id from the URL parameters
  const [data, setData] = useState(['']);
  const [comingResponses, setComingResponses] = useState({});
  const [cantComeResponses, setCantComeResponses] = useState({});
  const navigate = useNavigate()
  

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        console.log(id)
        try {
          const result = await getData(id);
          console.log('result', result);
          console.log(result.fields.names_in_group)
          setData(result.fields.names_in_group.split(',').filter(Boolean));
          console.log(data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [id]); // Add id as a dependency to refetch when it changes

  const handleCheckboxChange = (name, type, value) => {
    if (type === 'coming') {
      if (value && cantComeResponses[name]) {
        setCantComeResponses({
          ...cantComeResponses,
          [name]: false,
        });
      }
      setComingResponses({
        ...comingResponses,
        [name]: value,
      });
    } else if (type === 'cantCome') {
      if (value && comingResponses[name]) {
        setComingResponses({
          ...comingResponses,
          [name]: false,
        });
      }
      setCantComeResponses({
        ...cantComeResponses,
        [name]: value,
      });
    }
  };;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const uncheckedItems = data.filter(name => !comingResponses[name] && !cantComeResponses[name]);
    if (uncheckedItems.length > 0) {
      alert('Please respond for all invitees: ' + uncheckedItems.join(', '));
    } else {
      console.log('Form submitted:');
      console.log('Coming:', comingResponses);
      console.log("Can't Come:", cantComeResponses);
      const response = await sendData(comingResponses,cantComeResponses,id)
      navigate('/submitted')
      // Add your form submission logic here
    }
  };

  return (
  <div>
    <div  style={{ display: 'flex', marginBottom: '10px', justifyContent:'center', marginTop:'10px' }}>
      <img src={invitation_english} alt="Description of image" style={{ width: '30%', marginRight: '5%' }} />
      <img src={invitation_hebrew} alt="Description of image" style={{ width: '30%' }} />  
    </div>
    <form ref={form} noValidate onSubmit={handleSubmit}>
    <Group title="Please Let Us Know if You Can Make it :) (:אשמח אם תעדכנו אותנו מי מגיע">
  <div style={{ width: '90%', margin: '0 auto', justifyContent:'center' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '60px', margin:'0 auto' }}>
      <div>
        <div>Name</div>
        <div> שֵׁם</div>
      </div>
      <div>
        <div>Coming</div>
        <div>מגיע</div>
      </div>
      <div>
        <div>Can't Come </div>
        <div>לא מגיע</div>
      </div>
    </div>
    {data.map((name, index) => (
      <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
        <div>{name}</div>
        <div>
          <Field
            id={`coming_${index}`}
            value="coming"
            label=""
            checked={comingResponses[name]}
            onChange={(event) => handleCheckboxChange(name, 'coming', event.target.checked)}
          />
        </div>
        <div>
          <Field
            id={`not_coming_${index}`}
            value="cantCome"
            label=""
            checked={cantComeResponses[name]}
            onChange={(event) => handleCheckboxChange(name, 'cantCome', event.target.checked)}
          />
        </div>
      </div>
    ))}
  </div>
</Group>
    <button type="submit">Submit</button>
  </form>
  </div>
   

  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:id" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/submitted" element={<Submitted />} />
      </Routes>
    </Router>
  );
}

export default App;
