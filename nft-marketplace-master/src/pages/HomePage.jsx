import React, { useState, useEffect } from 'react';
import { NftSection } from '../components/marketPlace/NftSection';
import { MarketPlaceFilters } from '../components/marketPlace/MarketPlaceFilters';
import { MarketPlaceHeader } from '../components/marketPlace/MarketPlaceHeader';
import { MarketPlaceSubmenu } from '../components/marketPlace/MarketPlaceSubmenu';
import { LayoutContainer } from '../layout/LayoutContainer';
import axios from 'axios';
import { Navbar } from '../layout/Navbar';
import EventBooking from '../components/EventBooking/EventBooking';
export function HomePage() {
  const [nfts, setNfts] = useState([]);
  const [loading,setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchParticipants = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:4000/nfts');
  //       setNfts(response.data);
        
  //     } catch (error) {
  //       console.error('Error fetching participants:', error);
  //     }finally{
  //       setLoading(false);
  //     }
  //   }

  //   fetchParticipants();
  // }, [nfts]);
  //////////////////////////////////events
//   const [event,setEvent] = useState([])
// useEffect( () => { 
//   const events = async () => {
//     try{
//     const responce = await axios.get("http://localhost:4000/events");
    
//    setEvent(responce.data);
   
//     }catch(error){
//         console.log('Error fetching participants:',error);
//     }
//   }
//   events();
// },[event]);





  return (
    <LayoutContainer>
      {/* <MarketPlaceHeader />
      <MarketPlaceSubmenu />
      <MarketPlaceFilters />
      <NftSection nfts={nfts} loading = {loading} />  */}
      <EventBooking   />
    </LayoutContainer>
    
  );
}

