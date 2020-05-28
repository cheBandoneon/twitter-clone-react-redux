import React from 'react';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import {Hashtag} from './pages/Hashtag';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getFrontPageTweets,getUsers,getHashtags} from './actions';
import Sidebar from './components/Sidebar';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getFrontPageTweets())
    dispatch(getHashtags())
  }, [dispatch]);   

  return (
    <Router>
      <div className="App">
        <div className="container">
          <div className="page-wrapper">
            <div className="main-sidebar">
              <Sidebar></Sidebar>
            </div>
            <Switch>
              <Route path="/" exact component = {Home}></Route>
              <Route path="/explore" component = {Explore}></Route>
              <Route path="/hashtag/:id" children = {<Hashtag />}></Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;