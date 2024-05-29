import React, { useEffect, useState, useRef } from 'react';
import { useParams, BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { getData, sendData } from './api';
import { useForm } from "react-cool-form"
import "./styles.css";
import invitation_english from './invitation_english.jpg'
import invitation_hebrew from './invitation_hebrew.jpg'
import invitationBackground from './stone-floor-texture.jpg';

function Submitted() {
  return (
    <div style={{backgroundImage: `url(${invitationBackground})`, backgroundSize: 'cover', fontFamily:'Garamond, serifra', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh', fontSize: '24px', flexDirection: 'column' }}>
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
  const [recordData, setRecordData] = useState({})
  const [comingResponses, setComingResponses] = useState({});
  const [cantComeResponses, setCantComeResponses] = useState({});
  let [comingCount, setComingCount] = useState(0)
  const navigate = useNavigate()
  
  function incrementCount() {
    comingCount = comingCount + 1;
    setComingCount(comingCount);
  }
  function decrementCount() {
    if (comingCount==0){
      // do nothing
    }
    else{
      comingCount = comingCount - 1;
      setComingCount(comingCount);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const result = await getData(id);
          setData(result.fields.names_in_group.split(',').filter(Boolean));
          setRecordData(result)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [id]); // Add id as a dependency to refetch when it changes


  const handleSubmit = async (event) => {
    event.preventDefault();
    // const uncheckedItems = data.filter(name => !comingResponses[name] && !cantComeResponses[name]);
    // if (uncheckedItems.length > 0) {
    //   alert('Please respond for all invitees: ' + uncheckedItems.join(', '));
    // } else {
    //   console.log('Form submitted:');
    //   console.log('Coming:', comingResponses);
    //   console.log("Can't Come:", cantComeResponses);
    //   const response = await sendData(comingResponses,cantComeResponses,id)
      navigate('/submitted')
      // Add your form submission logic here
    // }
  };

  return (
<div style={{ backgroundImage: `url(${invitationBackground})`, backgroundSize: 'cover', height: '100vh', overflow: 'auto' }}>
  <div style={{ display: 'flex', marginBottom: '10px', justifyContent:'center', marginTop:'10px' }}>
    <img src={invitation_english} alt="Description of image" style={{ width: '30%', marginRight: '5%' }} />
    <img src={invitation_hebrew} alt="Description of image" style={{ width: '30%' }} />  
  </div>
  <form ref={form} noValidate onSubmit={handleSubmit}>
    <div style={{ marginBottom: '20px', textAlign:'center', fontFamily: 'Garamond, serif', fontSize:'25px', width:'100%', maxWidth: '100%' }}>
      Please Let Us Know if You Can Make it :)
    </div>
    <div style={{ marginBottom: '20px', textAlign:'center', fontFamily: 'Garamond, serif', fontSize:'25px', width:'100%', maxWidth: '100%' }}>
      (:אשמח אם תעדכנו אותנו מי מגיע"
    </div>

    <div className="App">
      {recordData && recordData.fields && (
        <div style={{ fontFamily: 'Garamond, serif', justifyContent: 'center', paddingTop: '8%', textAlign:'center' }}>
          <div style={{fontSize:'25px'}}>
            To {recordData.fields.Name}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center', paddingTop:'8%', paddingBottom:'8%'}}>
            <button type ="button" className="button-17" onClick={decrementCount}>-</button>
            <div style={{padding:'5%'}}>{comingCount}</div>
            <button type ="button" className="button-17" onClick={incrementCount}>+</button>
          </div>
        </div>
      )}
    </div>
      
    <button type="submit" style={{ display: 'block', margin: '0 auto', marginBottom:'5%'}}>Submit</button>
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
