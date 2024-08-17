import React, { useEffect, useState } from "react";
import EventBookingList from "./EventBookingList";
import { EventModal } from "./EventModal";
import './EventBooking.css';
import { Button } from '../shared/Button';
import axios from 'axios';

export default function EventBooking() {
  const [eventlist, setEventList] = useState([]);
  const [modalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [action, setAction] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [refresh,setRefresh]= useState('');
  const [favorites, setFavorites] = useState(() => {
    // Load favorites from local storage
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  

  useEffect(() => {
    const events = async () => {
      try {
        const response = await axios.get("http://localhost:4000/events");
        setEventList(response.data);
      } catch (error) {
        console.log('Error fetching events:', error);
      }
    }
    events();
  }, [refresh]);

  useEffect(() => {
    const searchEvent = () => {
      if (searchTerm) {
        setFilteredEvents(eventlist.filter(event =>
          event.name.toLowerCase().includes(searchTerm.toLowerCase())
        ));
      } else {
        setFilteredEvents(eventlist);
      }
    }
    searchEvent();
  }, [searchTerm, eventlist]);

  const handleSearchChange = (e) => {
    setTimeout(() => {
      setSearchTerm(e.target.value);
    }, 500);
  }

  const openModal = () => {
    setAction('add');
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const editModal = (event) => {
    setAction('edit');
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const deleteCard = async (event) => {
    setAction('del');
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (selectedEvent) {
      try {
        await axios.delete(`http://localhost:4000/events/${selectedEvent.id}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setEventList(prevList => prevList.filter(item => item.id !== selectedEvent.id));
      } catch (error) {
        console.error('Error deleting item:', error);
      }
      closeModal();
    }
  };

  const toggleFavorite = (eventId) => {
    setFavorites(prevFavorites => {
      // Toggle the favorite status
      const updatedFavorites = prevFavorites.includes(eventId)
        ? prevFavorites.filter(id => id !== eventId)
        : [...prevFavorites, eventId];
  
      // Update local storage
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };
  

  return (
    <>
      <div className="event-container flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={openModal}>
            Add New Event
          </Button>
          <input
            type="text"
            placeholder="Search..."
            className="border rounded px-3 py-1 text-black"
            onChange={handleSearchChange}
          />
        </div>

     

        {/* Main Event List Section */}
        <div className="event-grid">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventBookingList
              key={event.id}
              event={event}
              editModal={editModal}
              deleteCard={deleteCard}
              isFavorited={favorites.includes(event.id)}
              onToggleFavorite={() => toggleFavorite(event.id)}
            />
            ))
          ) : (
            <p>No Data available</p>
          )}
        </div>
   {/* Favorites Section */}
   <h1>Favorites</h1>
        <div className="event-grid">
          {favorites.length === 0 ? (
            <p>No favorites yet.</p>
          ) : (
            filteredEvents
              .filter(event => favorites.includes(event.id))
              .map(event => (
                <EventBookingList
                  key={event.id}
                  event={event}
                  editModal={editModal}
                  deleteCard={deleteCard}
                  isFavorited={true}
                  onToggleFavorite={() => toggleFavorite(event.id)}
                />
              ))
          )}
        </div>


      </div>
 
      {modalOpen && (
        <EventModal 
          event={selectedEvent}
          action={action}
          reFresh = {setRefresh}
          closeModal={closeModal} 
          onDelete={handleDelete}
        />
      )}
    </>
  );
}
