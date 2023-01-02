import React from 'react';
import './style.sass';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { byEnter } from '../../../store/slices/profileSlice';
import { AppDispatch, RootState } from '../../../store/store';

export const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const byEnterValue = useSelector((state:RootState) => state.profile.byEnter);
  return (
    <div className='absolute'>
      <div className="profile">
        <Link to={'/'}>
          <button className="close-profile">&times;
          </button>
        </Link>
        <div className='profile__checkbox'>
          <input type="checkbox" id="byEnter" name="onEnter" value="byEnter" onChange={() => {dispatch(byEnter())}} defaultChecked={byEnterValue}/>
          <label htmlFor="byEnter">Send by Enter</label>
        </div>
      </div>
    </div>
  )
}
