import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FlashCard from './flashCard';

const Cards = () => {
  const [cardsUser, setCardsUser] = useState([]);
  const [name, setName] = useState('')


  useEffect(() => {
      const fetchCards = async () => {
          try {
              const response = await axios.get('http://localhost:3000/cards',{
                withCredentials: true,
              });
            
            const username = localStorage.getItem('username');
            console.log("from cards username:",username);

            if (username) {
                setName(username);
                const foundUser = response.data.filter(c => c.login_User === username);
                setCardsUser(foundUser)
                console.log('cardsDATA:', foundUser)
            } else {
                window.location.href = '/login';
            }

          } catch (error) {
              console.error('Error fetching cards:', error);
          }
      };

      
      fetchCards();
  }, []);

// console.log('cardsDATA', cards)
console.log('cardsDATA arr', cardsUser)


  return (
      <div className="p-4">
          <h1 className="text-2xl mb-4">Flashcards</h1>
            <div class="w-full relative flex items-center justify-center h-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              {cardsUser.map(card => (
                <>
                    {/* <div key={card.id} className="mb-4">
                        <h2>{card.text1}</h2>
                        <p>{card.text2}</p>
                    </div> */}
                            <FlashCard 
                                text1={card.text1}
                                text2={card.text2}
                            />
                </>    
                ))}
            </div>
            </div>

      </div>
  );
}

export default Cards