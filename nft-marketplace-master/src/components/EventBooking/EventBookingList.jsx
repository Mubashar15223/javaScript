import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash,faHeart } from '@fortawesome/free-solid-svg-icons';
export default function EventBookingList({ event, editModal, deleteCard, isFavorited, onToggleFavorite }) {
  const { name, targetAudience, img, description, dateTime } = event;


  
  const calculateTimeLeft = () => {
    let timeLeft = {};
    const timePeriod = new Date(dateTime) - new Date();
    if (timePeriod > 0) {
      timeLeft = {
        days: Math.floor(timePeriod / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timePeriod / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((timePeriod / 1000 / 60) % 60),
        seconds: Math.floor((timePeriod / 1000) % 60),
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    return timeLeft;
  };

  const [isExpanded, setIsExpanded ] = useState(false);


  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };
  const truncatedDescription = description && description.length > 50 
  ? description.substring(0, 50) + "...."  : description || '';
   
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [dateTime]);

  return (
   
    <div className="relative event-card border rounded-xl border-solid p-2">
  
  <div className="absolute left-2 top-2 flex flex-col gap-1 z-10">
        <button 
          className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
          onClick={() => editModal(event)}
        >
          <FontAwesomeIcon icon={faEdit} />
          <span className="sr-only">Edit</span>
        </button>
        <button 
          className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 flex items-center gap-2"
          onClick={() => deleteCard(event)}
        >
          <FontAwesomeIcon icon={faTrash} />
          <span className="sr-only">Delete</span> 
        </button>
       
        <button
  className={`bottom-2 right-2 rounded-full p-2 ${isFavorited ? 'bg-yellow-500' : 'bg-gray-600'} text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500`}
  onClick={() => onToggleFavorite(event.id)}
>
  <FontAwesomeIcon icon={faHeart} className="text-xl" />
  <span className="sr-only">Favorite</span>
</button>

      </div>
    
    
  

    <div className="relative event-image " >
      {img && img !== "" ? (
        <img src={img} alt={name} class="event-img w-full h-auto" style={{height: '220px'}} />
      ) : (
        <div className="flex items-center justify-center w-32 h-32 bg-gray-300 rounded-full text-4xl font-bold"
        style={{ margin: '42px 0 0 82px' }}>
     {name ? name.charAt(0) : targetAudience.charAt(0)}
   </div>
      
      )}
    </div>
  
    <div className="event-info p-2 z-10">
      <div className="event-name text-lg font-semibold">{name}</div>
      <div className="event-targetAudience text-sm text-gray-600">{targetAudience}</div>
      <div className="event-dateTime text-sm text-gray-500">
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </div>
      <div className="event-description text-sm text-gray-700">
        {isExpanded ? description : truncatedDescription }
      {description.length > 50 &&(
        <button  onClick={toggleDescription}  className="text-blue-500 mt-2">
          {isExpanded ? 'show Less' : 'Read more'}
        </button>
      )}
        </div>
    </div>
  </div>
  
  
 
  );
}
