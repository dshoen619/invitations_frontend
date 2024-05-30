import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import invitationBackground from './stone-floor-texture.jpg';
import "./styles.css";
import first_photo from './first_photo.jpg'



function LanguageSelection() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleLanguageSelection = (language) => {
    if (language === 'english') {
      navigate(`/homepageEnglish/${id}`);
    } else if (language === 'hebrew') {
      navigate(`/homepageHebrew/${id}`);
    }
  };

  return (
    <div style={{          
        backgroundImage: `url(${invitationBackground})`,
        backgroundSize: 'cover',
        overflow: 'auto', 
        display: 'flex', justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        flexDirection: 'column' }}>

        <div 
        style={{
        display: 'flex',
        marginBottom: '10px',
        justifyContent: 'center',
        marginTop: '10px'
        }}>
            <img src={first_photo} style={{ width: '30%' }} />
        </div>
        <button type="button" className="button-17" style ={{fontFamily: 'Garamond, serif', margin:"10px"}} onClick={() => handleLanguageSelection('english')}>English</button>
        <button type="button" className="button-17" style ={{fontFamily: 'Garamond, serif'}} onClick={() => handleLanguageSelection('hebrew')}>עִברִית</button>
    </div>
  );
}

export default LanguageSelection;
