import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import data from '../data.json'



function App() {
  const [selectedState, setSelectedState] = useState('');
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [isDistrictDisabled, setIsDistrictDisabled] = useState(true);

  const getStates = () => {
    const states = [...new Set(data.map(item => item.state))]; // ...new Set - google it to get unique elements
    return states;
  };
  
  const getDistricts = (selectedState) => {
    const districts = data
      .filter(item => item.state === selectedState)
      .map(item => item.district);
    return [...new Set(districts)]; 
  };

  const stateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    const districts = getDistricts(state);
    setDistricts(districts);
    setIsDistrictDisabled(districts.length === 0);
    setSelectedDistrict(''); 
  };

  const districtChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  const handleSubmit = () => {
    alert(`Selected State: ${selectedState}, Selected District: ${selectedDistrict}`);
  };

  return (
    <div>
      <div>
        <label htmlFor="state">State: </label>
        <select id="state" value={selectedState} onChange={stateChange}>
          <option value="">Select State</option>
          {getStates().map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="district">District: </label>
        <select id="district" value={selectedDistrict} onChange={districtChange} disabled={isDistrictDisabled}>
          <option value="">Select District</option>
          {districts.map((district, index) => (
            <option key={index} value={district}>{district}</option>
          ))}
        </select>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default App