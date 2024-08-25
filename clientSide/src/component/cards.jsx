import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FlashCard from './flashCard';
import { CgCloseO } from "react-icons/cg";


const Cards = () => {
  const [cardsUser, setCardsUser] = useState([]);
  const [name, setName] = useState('')
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [description, setDescription] = useState('');
  const [editingCardId, setEditingCardId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [image, setImage] = useState(null);

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
  useEffect(() => {

      
      fetchCards();
  }, []);

  // const handleAddCard = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(
  //       'http://localhost:3000/cards',
  //       { text1, text2, description },
  //       { withCredentials: true }
  //     );

  //     console.log('Card added:', response.data);

  //     // Optionally, fetch the updated cards list after adding the new card
  //     setCardsUser(prevCards => [...prevCards, response.data]);

  //     // Clear the form fields
  //     setText1('');
  //     setText2('');
  //     setDescription('');
  //     // fetchCards();
      
  //   } catch (error) {
  //     console.error('Error adding card:', error);
  //   }
  // };


// console.log('cardsDATA', cards)

const handleImageChange = (e) => {
  setImage(e.target.files[0]);
};

const handleAddCard = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('text1', text1);
  formData.append('text2', text2);
  formData.append('description', description);
  if (image) {
    formData.append('image', image);
  }
  try {
      // const response = await axios.post(
      //     'http://localhost:3000/cards',
      //     { text1, text2, description},
      //     { withCredentials: true }
      // );
      const response = await axios.post(
          'http://localhost:3000/cards',
          formData,
          { 
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          }
      );

      console.log('Card added:', response.data);
      console.log(' response.data.insertId:', response.data.insertId);

      // Optionally, fetch the updated cards list after adding the new card
      const newCard = {
          id: response.data.insertId, // or any unique identifier returned by the server
          text1,
          text2,
          description,
          image: response.data.imagePath,
          login_User: name, // Adding the username to match the logged-in user's cards
        
        };
      console.log('newCard:',newCard)
      // Update the state to include the new card
      // console.log("before cardsUser==>",cardsUser)
      setCardsUser(prevCards => [...prevCards, newCard]);
      
      // Clear the form fields
      setText1('');
      setText2('');
      setDescription('');
      setImage(null);
      fetchCards();
      // handleClosePopup()
      setIsPopupOpen(false)
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };
  // console.log("after cardsUser==>",cardsUser)
  
// console.log('cardsDATA arr', cardsUser)


const handleEditCard = (card) => {
  setEditingCardId(card.id);
  setText1(card.text1);
  setText2(card.text2);
  setDescription(card.description);
};

const handleUpdateCard = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.put(
      `http://localhost:3000/cards/${editingCardId}`,
      { text1, text2, description },
      { withCredentials: true }
    );

    console.log('Card updated:', response.data);

    // Update the state to include the updated card
    setCardsUser(prevCards => 
      prevCards.map(card => 
        card.id === editingCardId ? { ...card, text1, text2, description } : card
      )
    );

    // Clear the form and reset editing state
    setEditingCardId(null);
    setText1('');
    setText2('');
    setDescription('');
  } catch (error) {
    console.error('Error updating card:', error);
  }
};

const handleDeleteCard = async (cardId) => {
  try {
    const response = await axios.delete(`http://localhost:3000/cards/${cardId}`, {
      withCredentials: true,
    });

    console.log('Card deleted:', response.data);

    // Update the state to remove the deleted card
    setCardsUser(prevCards => prevCards.filter(card => card.id !== cardId));
  } catch (error) {
    console.error('Error deleting card:', error);
  }
};


const handleOpenPopup = () => {
  setIsPopupOpen(true);
};

const handleClosePopup = () => {
  setIsPopupOpen(false);
};


  return (
      <div className="p-4 relative">
          <div className='flex justify-between items-center my-10 border rounded-md '>
            <h1 className="text-2xl m-2">Flashcards</h1>
            <button 
              className='px-2 py-2 m-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700'
              onClick={()=>handleOpenPopup()}>
                Add a New Card
            </button>
          </div>
        {/* fetching and updating cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {cardsUser.map(card => (
            <div key={card.id}>
              {editingCardId === card.id ? (
                <form onSubmit={handleUpdateCard} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Text 1</label>
                    <input
                      type="text"
                      value={text1}
                      onChange={(e) => setText1(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Text 2</label>
                    <input
                      type="text"
                      value={text2}
                      onChange={(e) => setText2(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      Update Card
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <FlashCard 
                    text1={card.text1}
                    text2={card.text2} 
                    handleEditCard={()=>handleEditCard(card)} 
                    handleDeleteCard={() => handleDeleteCard(card.id)}
                    image={card.image}
                    />
                </div>
              )}
            </div>
          ))}
        </div>

          <button 
            className='px-2 py-2 my-6 bg-green-600 text-white font-medium rounded-md hover:bg-green-700'
            onClick={()=>handleOpenPopup()}>
              Add a New Card
          </button>
          {/* adding cards */}
          {isPopupOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
              <div className="mt-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white p-8 rounded shadow-lg">
                <h2 className="text-xl mb-4">Add a New Card</h2>
                <form onSubmit={handleAddCard} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Text 1</label>
                    <input
                      type="text"
                      value={text1}
                      onChange={(e) => setText1(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Text 2</label>
                    <input
                      type="text"
                      value={text2}
                      onChange={(e) => setText2(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="mt-1 block w-full"
                    />
                  </div>

                  <div className='flex justify-between'>
                    <button
                      type="submit"
                      className="px-2 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Add Card
                    </button>
                  <button
                    onClick={handleClosePopup} 
                    className='bg-red-400 p-2 text-white font-medium rounded-md hover:bg-red-600' >
                    Close
                  </button>
                  </div>
                </form>
                <button
                  onClick={handleClosePopup}  
                  className='absolute top-3 right-3 p-2 text-xl hover:text-red-600 '>
                  <CgCloseO />
                </button>
              </div>
          </div>
          )}

      </div>
  );
}

export default Cards