import React, { useEffect } from 'react';
import './App.css';
import Logo from './components/logo/Logo';
import { useDispatch, useSelector } from 'react-redux';
import Search from './components/search/Search';
import { fetchImages } from './state/app.actions';
import Grid from './components/grid/Grid';
import { toast } from 'react-toastify';
import { StateOfSearch } from './interfaces/enums';
import { AppState } from './state/app.reducers';

toast.configure();

function App() {
  const dispatch = useDispatch();
  const currentState = useSelector(
    (state: { appState: AppState }) => state.appState.currentState
  );

  useEffect(() => {
    const trackScroll = () => {
      const wrappedElement = document.getElementById('body');
      if (
        wrappedElement.getBoundingClientRect().bottom <=
        window.innerHeight + window.innerHeight * 0.2
      ) {
        dispatch(fetchImages(currentState));
      }
    };
    document.addEventListener('scroll', trackScroll);
    return () => {
      document.removeEventListener('scroll', trackScroll);
    };
  }, [currentState, dispatch]);

  useEffect(() => {
    dispatch(fetchImages(StateOfSearch.TRENDING));
  }, [dispatch]);

  return (
    <div className="App">
      <div className="container-fluid">
        <Logo />
        <Search />
        <Grid />
      </div>
    </div>
  );
}

export default App;
