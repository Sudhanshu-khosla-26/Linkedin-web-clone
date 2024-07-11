import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Header from './components/Header';
import Articles from './components/Articles';
import { useEffect } from 'react';
import { getAritcleAPI, getUserAuth } from './actions';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { connect } from 'react-redux';
import MyNetwork from './components/MyNetwork';
import ProfilePage from './components/ProfilePage';
function App(props) {
  // const payload = {
  //   user: props.User,
  // }

  useEffect(() => {
    // props.getAritcles(payload);
    props.getUserAuth();
    // console.log(props.articles);
  }, [])
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/feed" element={
            <>
              <Header/>
              <Home/>
            </>
            } />
            <Route path="/article" element={
              <>
                <Header/>
                <Articles/>
              </>
              } />
              <Route path="/mynetwork/grow/" element={
              <>
                <Header/>
                <MyNetwork/>
              </>
              } />
              <Route path={`/in/${props.User.displayName}-${props.User.uid}/`} element={
              <>
                <Header/>
                <ProfilePage/>
              </>
              } />
              
              {/* {props.articles && 
              props.articles.map((article, Key) => (
                  <Route path={`/pulse/${article.Article.Title}/${props.User.displayName}-${props.User.uid}/`} 
                  element={
                    <>
                    <Header/>
                    </>
                  }/>
                ))} */}
                
        </Routes>
      </Router>
    </>
  );
}

const mapStateTOProps = (state) => {
  return {
    user: state.userState.user,
    User: JSON.parse(localStorage.getItem('User')),
  };
};

const mapDispatchToProps = (dispatch) => ({
    getUserAuth: () => dispatch(getUserAuth()),
    // getAritcles: (payload) => dispatch(getAritcleAPI(payload)),
});

export default connect(mapStateTOProps, mapDispatchToProps)(App);
