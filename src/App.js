import React, { useState, useEffect } from 'react';
import './App.css';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e9a4ea99d4mshb86997ce7e02ab0p12f17ajsn8cc2439ebcd4',
		'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
	}
};
const Card = ({ item }) => {
  return (
    <div className="card">
      <h1>{item.title}</h1>
      <p>{item.description}</p>
      <img src={item.thumbnail} alt="" />
      <p>{item.createdAt}</p>
    </div>
  );
};
function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  const fetch_data = async () => {
    try {
      const res = await fetch('https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk', options);
      if (res.ok) {
        const result = await res.json();
          console.log(result);
        setData(result.data);
      } else {
        console.error('Failed to fetch data:', res.status);
      }
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };

  useEffect(() => {
    fetch_data();
  }, []);

  return (
    <div className="App">
      <input type="search" name="search" value={query} onChange={handleInput} />
      <div className="card-container">
        {data.map((item, index) => (
          <div key={index} className="card">
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <img className='card-image' src={item.thumbnail} alt="" />
          <p>{item.createdAt}</p>
        </div>
        ))}
      </div>
    </div>
  );
}

export default App;
