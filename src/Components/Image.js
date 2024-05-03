import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';

const Image = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [breedImages, setBreedImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        if (!response.ok) {
          throw new Error('Failed to fetch breeds');
        }
        const data = await response.json();
        const breedsArray = Object.keys(data.message);
        setBreeds(breedsArray);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching breeds:', error);
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  const fetchBreedImages = async () => {
    setLoading(false);
    try {
      const response = await fetch(`https://dog.ceo/api/breed/${selectedBreed}/images`);
      if (!response.ok) {
        throw new Error('Failed to fetch breed images');
      }
      const data = await response.json();
      setBreedImages(data.message.slice(0,5));
      console.log(breedImages)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching breed images:', error);
      setLoading(false);
    }
  };

  const handleSelectBreed = (event) => {
    setSelectedBreed(event.target.value);
    fetchBreedImages()
  
  };

  // const handleFetchImages = () => {
  //   fetchBreedImages();
  // };

  return (<>
    <div>
      <h1>List of Dog Breeds</h1>
      {loading ? (
        <div className='d-flex justify-content-center'>
        <div class="spinner-border text-success " role="status">
  <span class="visually-hidden">Loading...</span>
</div></div>
      ) : (
        <div>
          
          <select className='p-2 w-75' value={selectedBreed} onChange={handleSelectBreed}>
            <option value="">Select a breed</option>
            {breeds.map(breed => (
              <option key={breed} value={breed}>{breed}</option>
            ))}
          </select>
          {/* <button className='p-2 m-5' onClick={handleFetchImages}>Search Images</button> */}
          
          <h2 className='d-flex justify-content-center '> Images of {selectedBreed}</h2>
          <div>
            {breedImages.map(image => (
              <img class="img-thumbnail" key={image} src={image} alt={selectedBreed} style={{ width: '300px', margin: '5px' }} />
            ))}
          </div>
        </div>
      )}
    </div>
    <Sidebar/>
    </>
  );
};

export default Image;
