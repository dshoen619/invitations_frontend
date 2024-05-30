import axios from 'axios';

//const API_BASE_URL = 'http://localhost:8000'; // Replace with your backend URL
const API_BASE_URL = 'http://127.0.0.1:8000'
// const API_BASE_URL = 'https://linoy-and-david-138050e5f001.herokuapp.com'

// Example function to get data
export const getData = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      console.log('response',response)
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }; 

  export const sendData = async (comingCount, record_id) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/rsvp`, {
        comingCount,
        record_id
      });
  }catch(err){
    console.log(err)
    throw err
  }
}

