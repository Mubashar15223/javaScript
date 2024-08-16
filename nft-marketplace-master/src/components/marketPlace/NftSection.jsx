import React, { useState, useEffect, useCallback,useRef } from 'react';
import axios from 'axios';
import { NftCard } from './NftCard';
import { Modal } from './Modal';
// import debounce from 'lodash.debounce'; 

export function NftSection({ nfts }) {
  const [nftList, setNftList] = useState(nfts);
  const [filteredNfts, setFilteredNfts] = useState(nfts);
  const [selectedNft, setSelectedNft] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
 

  useEffect(() => {
    setNftList(nfts);
  }, [nfts]);
// star logic search 
  useEffect(() => {
    const filterNfts = () => {
      if (searchTerm) {
        setFilteredNfts(nftList.filter(nft =>
          nft.title.toLowerCase().includes(searchTerm.toLowerCase())
        ));
      } else {
        setFilteredNfts(nftList);
      }
    };
    filterNfts();
  }, [searchTerm, nftList]);

  let timeOut = null;

  const handleSearchChange = (event) => {
   
    timeOut= setTimeout(()=>{
    setSearchTerm (event.target.value);
  },200);
  }
  // useEffect(()=>{
  //   clearTimeout(timeOut);
  // });
 
  //end serch

  const openAddModal = () => {
    setModalAction('add');
    setSelectedNft(null);
    setIsModalOpen(true);
  };

  const openEditModal = (nft) => {
    setModalAction('edit');
    setSelectedNft(nft);
    setIsModalOpen(true);
  };

  const deleteCard = async (nft) => {
    setModalAction('del');
    setSelectedNft(nft);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (selectedNft) {
      try {
        await axios.delete(`http://localhost:4000/nfts/${selectedNft.id}`);
        setNftList(prevList => prevList.filter(item => item.id !== selectedNft.id));
        setFilteredNfts(prevList => prevList.filter(item => item.id !== selectedNft.id));
      } catch (error) {
        console.error('Error deleting item:', error);
      }
      closeModal();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNft(null);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <button onClick={openAddModal} className="bg-blue-500 text-white px-4 py-2 rounded">Add New NFT</button>
        <input
          type="text"
          placeholder="Search..."
          className="border rounded px-3 py-1 text-black"
          onChange={handleSearchChange}
        />
      </div>
      <div className="grid xlm:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 py-6 gap-8">
        {filteredNfts.map((nft) => (
          <NftCard key={nft.id} nft={nft} onEditClick={openEditModal} deleteCard={deleteCard} />
        ))}
      </div>

      {isModalOpen && (
        <Modal
          action={modalAction}
          nft={selectedNft}
          onClose={closeModal}
          onDelete={handleDelete} // Pass delete function to the modal
        />
      )}
    </>
  );
}
