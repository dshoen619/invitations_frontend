
import {BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import "./styles.css";
import invitationBackground from './stone-floor-texture.jpg';
import LanguageSelection from './LanguageSelection';
import { HomePageEnglish } from './homePageEnglish';
import { HomePageHebrew } from './HomePageHebrew';

function Submitted() {
  return (
    <div style={{backgroundImage: `url(${invitationBackground})`, backgroundSize: 'cover', fontFamily:'Garamond, serif', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh', fontSize: '24px', flexDirection: 'column' , textAlign:'center'}}>
      <div>
        We Got It! Thank You 
      </div>
      <div style={{marginTop:'5%'}}>קיבלנו, תודה</div>
  </div>
  );
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:id" element={<LanguageSelection />} />
        <Route path="/homepageEnglish/:id" element={<HomePageEnglish />} />
        <Route path="/homepageHebrew/:id" element={<HomePageHebrew />} />
        <Route path="/submitted" element={<Submitted />} />
      </Routes>
    </Router>
  );
}

export default App;
