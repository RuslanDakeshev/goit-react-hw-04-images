import { useEffect, useState } from 'react';
import { fetchPictures, imagesOfPages } from 'services/picturesApi';
import { picturesMapper } from 'utils/mapper';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export const App = () => {
  const [query, setQuery] = useState('');

  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [modalShown, setModalShown] = useState(false);
  // const [searchDone, setSearchDone] = useState(false);

  useEffect(() => {
    const getPictures = async () => {
      setIsLoading(true);

      const arrayOfImages = await fetchPictures(page, query);
      const filteredArray = picturesMapper(arrayOfImages);
      if (filteredArray.length === 0) {
        setIsLoading(false);
        return toast.error('Oops! Something went wrong!');
      }

      setTotalNumberOfPages(imagesOfPages);
      setModalShown(false);
      setImages(prevImages => [...prevImages, ...filteredArray]);
      setIsLoading(false);
    };

    if (query) {
      getPictures();
    }
  }, [query, page]);

  // const handleInputChange(newQuery) {
  //   const searchQuery = newQuery.trim();
  //   setQuery(searchQuery);
  // }

  const showPictures = query => {
    setImages([]);
    setQuery(query);
    setPage(1);
  };

  const openModal = data => {
    setModalShown(true);
    setCurrentImage(data);
  };

  const closeModal = () => {
    setCurrentImage(null);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <SearchBar showPictures={showPictures} />
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} query={query} />
      )}
      {isLoading && <Loader />}
      {/* {currentImage && (
          <Modal image={currentImage} closeModal={this.closeModal} />
        )} */}
      {/* {!isLoading && !error && (<Button text='Load more' clickHandler={this.loadMore} />)} */}
      {images.length > 0 && !isLoading && page < totalNumberOfPages && (
        <Button text="Load more" loadMore={loadMore} />
      )}

      {currentImage && (
        <Modal
          query={query}
          largeImageUrl={currentImage}
          closeModal={closeModal}
        />
      )}
      <ToastContainer autoClose={2000} />
    </>
  );
};
