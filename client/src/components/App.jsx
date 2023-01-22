import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Navbar/Navbar';
import Items from './Items';
import Login from './Login';
import Register from './Register';
import UserPage from './User/UserPage';
import Footer from './Footer/Footer';
import Hero from './Hero/Hero';

function App() {
  const [logOrRegister, setLogOrRegister] = useState(true);
  const [isSignClick, setSignClick] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState('');

  function handleHome() {
    window.location.reload();
  }
  function handleSignInClick() {
    setSignClick((value) => !value);
  }
  function handleUserData(data) {
    setUserInfo(data);
    setAuthenticated((value) => !value);
  }
  function refreshUserData(data) {
    setUserInfo(data);
  }
  function login() {
    setSignClick(false);
  }
  function loginError() {
    window.alert('user not found,please register or try again');
  }
  function register() {
    window.alert('Registered, You Can Login Now');
  }
  function goToLogin() {
    setLogOrRegister(true);
  }
  function goToRegister() {
    setLogOrRegister(false);
  }
  function handleSignOut() {
    setAuthenticated((value) => !value);
    setUserInfo('');
  }

  return (
    <div className=" text-[#2e0f6a] font-allerta">
      
      {isAuthenticated ? (
        <UserPage
          newUserData={refreshUserData}
          userId={userInfo._id}
          userName={userInfo.username}
          boughtItems={userInfo.boughtItems}
          listedItems={userInfo.listedItems}
          handleSignOut={handleSignOut}
        />
      ) : (
        <div className="homePageDiv">
          {isSignClick &&
            (logOrRegister ? (
              <Login
                onLogin={login}
                onError={loginError}
                userData={handleUserData}
                onGoToRegister={goToRegister}
                onCut={handleSignInClick}
              />
            ) : (
              <Register
                onRegister={register}
                onGoToLogin={goToLogin}
                onCut={handleSignInClick}
              />
            ))}

          <Navbar
            Nav3={'Home'}
            onNav3={handleHome}
            Nav4={'Login/Signup'}
            onNav4={handleSignInClick}
            // Nav3={}
            // onNav3={handleSignClick}
          />
              <div >
          <Hero 
   cName="hero"
   ID="home"
   title="Best place to"
   text="What are you waiting for?"
   buttonText="Explore Now"
   url="#explore"
   
   btnClass="show"
   />
          </div>
      

          {/* <div className="bg-purple-800 w-full py-8 lg:py-4 font-fredoka text-2xl text-center text-white">
            Let's Browse !{' '}
          </div> */}
          <div id='explore'>
          <Items seed={''} onBuyClick={handleSignInClick} />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
