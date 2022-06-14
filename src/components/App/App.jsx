import { useState, useEffect } from 'react';
import Button from '../Button';
import ImageGallery from '../ImageGallery';
import Searchbar from '../Searchbar';
import Loader from 'components/Loader/Loader';
import Modal from '../Modal';
import ImageGalleryItem from '../ImageGalleryItem';
import { fetchImages } from '../Services/Services';

import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './App.module.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { animateScroll as scroll } from "react-scroll";


export default function App() {
  const [gallery, setGallery] = useState([]);
  const [imageName, setImageName] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bigImg, setBigImg] = useState('');

  const formSubmit = imageName => {
    setImageName(imageName);
    setGallery([]);
    setPage(1);
      scroll.scrollToTop();
  }

 // eslint-disable-next-line react-hooks/exhaustive-deps
 async function searchImages() {
    setIsLoading(true)

    try {
      const gallery = await fetchImages(imageName, page)
 
      if (gallery.length === 0) {
        toast.error('Images not found');
        setIsLoading(false);
        return;
      } else {
  //         const newArr = gallery.map(({ id, webformatURL, largeImageURL }) => {
  //   return {
  //     id: id,
  //     webformatURL: webformatURL,
  //     largeImageURL: largeImageURL,
  //   };
  // });
        setGallery(prevState => ([...prevState, ...gallery]));
        setIsLoading(false);
        return 
      }
           } catch (error) {
      setError({ error });
    }
    
  }
  
  const showMoreImg = () => {
    setPage(prevState => prevState + 1);
    scroll.scrollToBottom();
  }
        
  const toggleModal = () => {
    setShowModal(!showModal);
  }

 const onBigImgClick = (url) => {
  toggleModal();
    setBigImg(url);
  }

  useEffect(() => {
    if (!imageName) {
      return
    }
    searchImages();
    
  }, [imageName, searchImages]);

    return (
      <div className={s.app}
      >
        <Searchbar onSubmit={formSubmit} />
        {isLoading && <Loader />}
        {imageName && (
<ImageGallery>
          <ImageGalleryItem onBigImgClick={onBigImgClick} gallery={gallery}/>
        </ImageGallery>
        )}
        
        {gallery.length > 0 && <Button moreImages={showMoreImg} />}
        {showModal && <Modal onClose={toggleModal}>
          <img className={s.bigImage} src={bigImg} alt={imageName} />
        </Modal>}
        <ToastContainer autoClose={3000}/>
      </div> 
    );
};
