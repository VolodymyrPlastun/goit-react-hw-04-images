import {PropTypes} from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ onBigImgClick, gallery }) {
  return (
  <>
  {gallery.map(({ id, webformatURL, tags, largeImageURL }) => (
       <li key={id} onClick={() => onBigImgClick(largeImageURL)}  className={s.imageGalleryItem}>
  <img className={s.imageGalleryItemImage} src={webformatURL} alt={tags} />
</li>
  ))}   
    </>
)
} 

ImageGalleryItem.propTypes = {
  gallery: PropTypes.array.isRequired,
  onBigImgClick: PropTypes.func.isRequired,
}

