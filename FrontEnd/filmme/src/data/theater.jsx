import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from '../components/card/Card';

import theater1 from "../assets/images/Main/theater/에무시네마.png";
import theater2 from "../assets/images/Main/theater/라이카시네마.png";
import theater3 from "../assets/images/Main/theater/인디스페이스.png";

const Theater = () => {
    const [theaters, setTheaters] = useState([]);
    useEffect(() => {
      axios.get('http://localhost:8000/cinemas/')
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

/*const theater = [
    {
        id: 1,
        name: '머지할것이다!!!',
        region: '세종',
        star: '⭐⭐⭐⭐⭐',
        score: '(42)',
        like: 112,
        img: theater2,
    },

    {
        id: 2,
        name: '이것도',
        region: '대전',
        star: '⭐⭐⭐⭐⭐',
        score: '(42)',
        like: 110,
        img: theater1,
    },

    {
        id: 3,
        name: '하하하',
        region: '강원',
        star: '⭐⭐⭐⭐⭐',
        score: '(42)',
        like: 100,
        img: theater3,
    },

    {
        id: 4,
        name: '에무시네마',
        region: '서울',
        star: '⭐⭐⭐⭐⭐',
        score: '(42)',
        like: 99,
        img: theater1,
    },

    {
        id: 5,
        name: '라이카시네마',
        region: '인천',
        star: '⭐⭐⭐⭐⭐',
        score: '(42)',
        like: 102,
        img: theater2,
    },

    {
        id: 6,
        name: '인디스페이스',
        region: '경기',
        star: '⭐⭐⭐⭐⭐',
        score: '(42)',
        like: 101,
        img: theater3,
    },
];*/

export default Theater;