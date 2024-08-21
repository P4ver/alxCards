import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Cards = () => {
  const [cards, setCards] = useState([]);
  const [name, setName] = useState('')


  useEffect(() => {
      const fetchCards = async () => {
          try {
              const response = await axios.get('http://localhost:3000/cards',{
                withCredentials: true,
              });
              setCards(response.data);
          } catch (error) {
              console.error('Error fetching cards:', error);
          }
      };
      const username = localStorage.getItem('username');
      console.log("from cards username:",username);

      if (username) {
        setName(username);
      } else {
          window.location.href = '/login';
      }
      fetchCards();

      const cardsUser = cards.find(c => c.login_User === username);
      
  }, []);

console.log('cardsDATA', cards)

  return (
      <div className="p-4">
          <h1 className="text-2xl mb-4">Flashcards</h1>
          {/* <ul>
              {cards.map(card => (
                  <li key={card.id} className="mb-2">
                      <Link to={`/flashcard/${card.id}`} className="text-blue-500">{card.text1}</Link>
                  </li>
              ))}
          </ul> */}

      </div>
  );
}

export default Cards