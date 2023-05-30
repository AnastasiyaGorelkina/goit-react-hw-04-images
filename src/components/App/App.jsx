import React, { useEffect, useState } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

const statusName = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const per_page = 12;

export const App = () => {
  const [status, setStatus] = useState(statusName.IDLE);
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    };
    const fetchFn = () => {
      setStatus(statusName.PENDING);
      const BASE_URL = 'https://pixabay.com/api/';
      const API_KEY = '35127623-0d4b7af5e30d2b7869ece6cf1';
      const ALL_URL = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`;

      fetch(ALL_URL)
        .then(res => res.json())
        .then(({ hits }) => setImages(images => [...images, ...hits]))
        .catch(error => {
          setError(error);
          setStatus(statusName.REJECTED);
        })
        .finally(() => setStatus(statusName.RESOLVED));
    };

    fetchFn();
  }, [query, page]);
    

  const onBtnClickPg = () => {
    setPage(page + 1);
  };

  const onSubmit = value => {
    setQuery(value);
    setPage(1);
    setImages([]);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      {status === statusName.IDLE && <div>Введіть значення</div>}
      {status === statusName.PENDING && <Loader />}
      {status === statusName.RESOLVED && (<ImageGallery images={images} />)}
      {status === statusName.REJECTED && (<h1>{error.message}</h1>)}
      {images.length !== 0 && (images.length / per_page) === page && <Button onClick={onBtnClickPg} />}
    </>
  );
};
