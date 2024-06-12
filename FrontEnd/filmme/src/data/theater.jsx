import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from '../components/card/Card';

const Theater = () => {
    const [theaters, setTheaters] = useState([]);
    useEffect(() => {
      axios.get('https://filmme-drf-deploy-932ced3808f2.herokuapp.com/api/cinemas/')
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
              region={theater.location || 'Unknown'}
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