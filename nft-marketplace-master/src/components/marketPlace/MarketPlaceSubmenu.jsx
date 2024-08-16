import React, { useState } from 'react';
import { Button } from '../shared/Button'; // Adjust the path as needed
import { Search, Cross, Diamond, Discount, Hand, Image } from '../../assets/Icons'; // Import your existing icons
import { Modal } from './Modal'; // Adjust the path as needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NftCard } from './NftCard';
export function MarketPlaceSubmenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='py-6 flex md:gap-3 justify-between text-sm'>
      <div className='flex bg-zinc-800 rounded-xl items-center p-3 gap-1 w-full'>
        <Search />
        <input type='search' placeholder='Search' className='bg-zinc-800 text-white placeholder-gray-400' />
      </div>
      <div className='flex gap-3'>
        <Button
          className='md:flex hidden gap-2.5 rounded-xl px-[50px] bg-secondary-danger items-center'
          variant='ghost'
          onClick={openModal}
        >
          <Image />
          <span>NFT</span>
          <Cross />
        </Button>
        <Button
          className='md:flex hidden gap-2.5 rounded-xl px-[50px] bg-zinc-800 items-center min-w-max'
          variant='ghost'
        >
          <Discount />
          <span>Discount Codes</span>
        </Button>
        <Button
          className='xl:flex hidden gap-2.5 rounded-xl px-[50px] bg-zinc-800 items-center min-w-max'
          variant='ghost'
        >
          <Hand />
          <span>Physical Items</span>
        </Button>
        <div className='flex gap-3'>
        <Button
          className='md:flex hidden gap-2.5 rounded-xl px-[50px] bg-secondary-danger items-center'
          variant='ghost'
          onClick ={openModal}
        >
          <FontAwesomeIcon icon={faPlus} /> {/* Use faPlus for the "Add" icon */}
          <span>Add</span>
        </Button>
        {/* Other buttons */}
      </div>
      </div>

      {/* Modal */}
      {isModalOpen && <Modal onClose={closeModal} />}
     
    </div>
  );
}
