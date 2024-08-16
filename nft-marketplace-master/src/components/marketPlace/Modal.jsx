import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../shared/Button';

export function Modal({ onClose, nft, action , onDelete }) {
 
  const [formData, setFormData] = useState({
    title: '',
    reference: '',
    author: '',
    priceEth: '',
    priceUsd: '',
    img: ''
  });

  const [errors, setErrors] = useState({});
 
  useEffect(() => {
    if (action === 'edit' && nft) {
      setFormData({
        title: nft.title || '',
        reference: nft.reference || '',
        author: nft.author || '',
        priceEth: nft.priceEth || '',
        priceUsd: nft.priceUsd || '',
        img: nft.img || ''
      });
    }
  }, [nft, action]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
      
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFormData(prevState => ({
        ...prevState,
           img:fileUrl
      }));
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.reference) newErrors.reference = 'Reference is required';
    if (!formData.author) newErrors.author = 'Author is required';
    if (!formData.priceEth || isNaN(formData.priceEth)) newErrors.priceEth = 'Valid ETH price is required';
    if (!formData.priceUsd || isNaN(formData.priceUsd)) newErrors.priceUsd = 'Valid USD price is required';
    if (!formData.img) newErrors.img = 'Image URL is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    const formDataSubmit = new FormData();
    e.preventDefault();
    if (action === 'del') {
      if (onDelete) onDelete(); 
    } else if (validateForm()) {
      try {
          formDataSubmit.append( 'title', formData.title );
          formDataSubmit.append('reference' , formData.reference)
          formDataSubmit.append('author', formData.author )
          formDataSubmit.append ('priceEth', formData.priceEth)
          formDataSubmit.append('priceUsd', formData.priceUsd)
          formDataSubmit.append('img', formData.img)
          
 
        if (action === 'add') {
          await axios.post('http://localhost:4000/nfts', formDataSubmit,{
            headers: {
              'Content-Type': 'application/json'
          }
          } );
        } else if (action === 'edit' && nft) {
          await axios.put(`http://localhost:4000/nfts/${nft.id}`, formDataSubmit,{
            headers: {
              'Content-Type': 'application/json'
          }
          });
        }
        onClose();
      } catch (error) {
        console.error('Error saving item:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg" style={{ width: '500px', maxHeight: '80vh', overflowY: 'auto' }}>
        <h2 className="text-xl font-bold mb-4 text-white">
          {action === 'add' ? 'Add New Item' : action === 'edit' ? 'Edit Item' : 'Confirm Deletion'}
        </h2>
        <form onSubmit={handleSubmit}>
          {action === 'del' ? (
            <div className="mb-4 text-white">
              <p>Are you sure you want to delete this item?</p>
            </div>
          ) : (
            <>
                        <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-white" htmlFor="title">Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className="border border-gray-600 rounded-lg w-full p-2 bg-gray-800 text-gray-200"
                />
                {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-white" htmlFor="reference">Reference</label>
                <input
                  id="reference"
                  name="reference"
                  type="text"
                  value={formData.reference}
                  onChange={handleChange}
                  className="border border-gray-600 rounded-lg w-full p-2 bg-gray-800 text-gray-200"
                />
                {errors.reference && <div className="text-red-500 text-sm">{errors.reference}</div>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-white" htmlFor="author">Author</label>
                <input
                  id="author"
                  name="author"
                  type="text"
                  value={formData.author}
                  onChange={handleChange}
                  className="border border-gray-600 rounded-lg w-full p-2 bg-gray-800 text-gray-200"
                />
                {errors.author && <div className="text-red-500 text-sm">{errors.author}</div>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-white" htmlFor="priceEth">Price (ETH)</label>
                <input
                  id="priceEth"
                  name="priceEth"
                  type="number"
                  step="0.01"
                  value={formData.priceEth}
                  onChange={handleChange}
                  className="border border-gray-600 rounded-lg w-full p-2 bg-gray-800 text-gray-200"
                />
                {errors.priceEth && <div className="text-red-500 text-sm">{errors.priceEth}</div>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-white" htmlFor="priceUsd">Price (USD)</label>
                <input
                  id="priceUsd"
                  name="priceUsd"
                  type="number"
                  step="0.01"
                  value={formData.priceUsd}
                  onChange={handleChange}
                  className="border border-gray-600 rounded-lg w-full p-2 bg-gray-800 text-gray-200"
                />
                {errors.priceUsd && <div className="text-red-500 text-sm">{errors.priceUsd}</div>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-white" htmlFor="img">Image URL</label>
                <input
                  id="img"
                  name="img"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="border border-gray-600 rounded-lg w-full p-2 bg-gray-800 text-gray-200"
                />
                {formData.img && <img src={formData.img} alt="Preview" className="mt-2 max-w-full h-auto" />}
                {errors.img && <div className="text-red-500 text-sm">{errors.img}</div>}
              </div>

            </>
          )}

          <div className="flex justify-between">
            <Button type="submit" className={`bg-${action === 'del' ? 'red' : 'blue'}-500 text-white`}>
              {action === 'add' ? 'Add' : action === 'edit' ? 'Update' : 'Delete'}
            </Button>
            <Button type="button" onClick={onClose} className="bg-gray-500 text-white">Close</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
