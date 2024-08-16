import React,{useState} from 'react';
import author from '../../assets/author.png';
import { Modal } from './Modal';
export function NftCard({nft,onEditClick,deleteCard}) {
 
  if (!nft) {
    return null; 
  }
  return (
    <div className='relative card border  rounded-xl border-solid p-2'>
     <div style={{ marginTop: '20px' }}>
      <button 
        className='absolute top-2  left-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'
        onClick={()=>deleteCard(nft)}
      >
        Delete
      </button>
      </div>
      <button 
        className='absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'
        onClick={() => onEditClick(nft)}
      >
        Edit
      </button>
      
      <div>
        <img className='w-full max-h-[350px]' src={nft.img || 'fallback-image-url.png'} alt={nft.title || 'NFT'} />
      </div>
      <div className='pt-2 flex flex-col gap-1'>
        <span className='text-sm text-[#A1A1AA]'>{nft.title || 'Title not available'}</span>
        <h1>{nft.reference || 'Reference not available'}</h1>
      </div>
      <div className='py-2 mt-3 flex justify-between rounded-xl px-3 bg-zinc-800 items-center'>
        <div className='flex flex-col gap-1'>
          <span className='text-xs text-[#A1A1AA]'>Author</span>
          <div className='text-sm xl:text-base flex gap-1'>
            <img src={author} alt='author' />
            <p>{nft.author || 'Author not available'}</p>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <span className='text-xs text-[#A1A1AA]'>Price</span>
          <div className='text-sm xl:text-base flex gap-1 items-center'>
            <div className='flex gap-1'>
              <p>{nft.priceEth || 'N/A'}</p>
              <span>ETH</span>
            </div>
            <span className='text-[#A1A1AA] text-xs'>${nft.priceUsd || 'N/A'}</span>
          </div>
        </div>
      </div>
    
    </div>
     
  );
}
