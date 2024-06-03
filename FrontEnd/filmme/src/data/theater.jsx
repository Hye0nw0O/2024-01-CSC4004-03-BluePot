import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from '../components/card/Card';

import theater1 from "../assets/images/Main/theater/에무시네마.png";
import theater2 from "../assets/images/Main/theater/라이카시네마.png";
import theater3 from "../assets/images/Main/theater/인디스페이스.png";

const Theater = () => {
    const [theaters, setTheaters] = useState([]);
    useEffect(() => {
      axios.get('http://localhost:8000/api/cinemas/')
        .then(response => {
          console.log(response);
          console.log(response.data);
          setTheaters(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the theaters!", error);
        });
    }, []);

    return (
        <div>
          {theaters.map(theater => (
            <Card
              key={theater.id || ''}
              id={theater.id || ''}
              name={theater.name || 'Unknown'}
              region={theater.region || 'Unknown'}
              star={theater.star || 'No Rating'}
              score={theater.score || 'No Score'}
              like={theater.like || 0}
              img={theater.img || theater1} // Assuming the img URL is directly provided
            />
          ))}
        </div>
      );
    }

export default Theater;