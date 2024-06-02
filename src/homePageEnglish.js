import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getData, sendData } from './api';
import "./styles.css";
import invitation_english from './invitation_english.jpg'
import invitation_hebrew from './invitation_hebrew.jpg'
import invitationBackground from './stone-floor-texture.jpg';

export function HomePageEnglish() {
    const form = useRef(null);
    const { id } = useParams(); // Grab the id from the URL parameters
    const [recordData, setRecordData] = useState({})
    const [coming, setComing] = useState(false)
  
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

    const notComing = async() =>{
      await sendData(0, id)
      navigate('/submitted')
    }
  
    const unSure = async() =>{
        await sendData('Unsure', id)
        navigate('/submitted')
  
    }
  
    useEffect(() => {
      const fetchData = async () => {
        if (id) {
          try {
            const result = await getData(id);
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
        await sendData(comingCount,id)
        navigate('/submitted')
    };
  
    return (
      recordData && recordData.fields && (
        <div style={{
          backgroundImage: `url(${invitationBackground})`,
          backgroundSize: 'cover',
          height: '100vh',
          overflow: 'auto'
        }}>
          <div style={{
            display: 'flex',
            marginBottom: '10px',
            justifyContent: 'center',
            marginTop: '10px'
          }}>
            <img src={invitation_english} alt="Description of image" style={{ width: '30%', marginRight: '5%' }} />
            <img src={invitation_hebrew} alt="Description of image" style={{ width: '30%' }} />
          </div>
          <div style={{
            fontSize: '25px',
            textAlign: 'center',
            fontFamily: 'Garamond, serif',
            marginTop: '30px'
          }}>
            To {recordData.fields.Name}
          </div>
          <div style={{
            marginBottom: '0px',
            textAlign: 'center',
            fontFamily: 'Garamond, serif',
            fontSize: '25px',
            width: '100%',
            maxWidth: '100%'
          }}>
            Please Let Us Know if You Can Make it :)
          </div>
          <form ref={form} noValidate onSubmit={handleSubmit}>
            <div className="App">
              <div style={{
                fontFamily: 'Garamond, serif',
                justifyContent: 'center',
                paddingTop: '0%',
                textAlign: 'center'
              }}>
                {!coming && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                  }}>
                    <button type="button" className="button-17" style ={{fontFamily: 'Garamond, serif'}} onClick={() => setComing(true)}>Will Attend</button>
                    <button type="button" className="button-17" style ={{fontFamily: 'Garamond, serif'}} onClick={notComing}>Will Not Attend</button>
                    <button type="button" className="button-17" style ={{fontFamily: 'Garamond, serif'}} onClick={unSure}>Not Sure Yet</button>
                  </div>
                )}
                {coming && (
                  <div>
                    <button type="button" className="button-17" style ={{fontFamily: 'Garamond, serif'}} onClick={() => setComing(false)}>Back</button>
                    <div>
                      <div style={{ marginTop: '50px', fontFamily: 'Garamond, serif', fontSize:'20px' }}>
                        How Many People Are Coming?
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: '0%',
                        paddingBottom: '8%'
                      }}>
                        <button type="button" className="button-17" onClick={decrementCount}>-</button>
                        <div style={{ padding: '5%' }}>{comingCount}</div>
                        <button type="button" className="button-17" onClick={incrementCount}>+</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {coming && <button type="submit" style={{ display: 'block', margin: '0 auto', marginBottom: '5%' }}>Submit</button>}
          </form>
        </div>
      )
    );
  }