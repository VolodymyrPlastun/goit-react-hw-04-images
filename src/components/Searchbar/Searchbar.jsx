import { useState } from 'react';
import s from './Searchbar.module.css';
import { toast } from 'react-toastify';
import {PropTypes} from 'prop-types';


export default function Searchbar({onSubmit}) {
const [imageName, setImageName] = useState('')
  
const handleChange = evt => {
setImageName(evt.currentTarget.value.toLowerCase())
  }

const handleSubmit = evt => {
    // const { imageName } = this.state;
    evt.preventDefault();
    if (imageName.trim() === '') {
      return toast.warning('Enter your request');
}
  onSubmit(imageName);
  setImageName('');
  }


    return (
        <header className={s.searchbar}>
  <form onSubmit={handleSubmit} className={s.searchForm}>
    <button type="submit" className={s.searchFormButton}>
    </button>

    <input
      className={s.searchFormInput}
      type="text"
      autoComplete="off"
      autoFocus
            placeholder="Search images and photos"
            value={imageName}
            onChange={handleChange}
    />
  </form>
</header>
    )
}

  Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}