import Navbar from '../Navbar/Navbar';
import Items from '../Items';
import ListNewItem from '../ListNewItem';
import MyAccount from '../MyAccount';
import { useState } from 'react';
import Hero from '../Hero/Hero';

function UserPage(props) {
  const [isNewClicked, setNewClick] = useState(false);
  const [isAccountClicked, setAccountClick] = useState(false);

  const [seed, setSeed] = useState(1);

  function handleHome() {
    setAccountClick(false);
    setNewClick(false);
  }
  function handleNewItem() {
    setNewClick(true);
    setAccountClick(false);
  }
  function handleMyAcc() {
    setAccountClick(true);
    setNewClick(false);
  }
  function handleSignOut() {
    // window.location.reload();
    props.handleSignOut();
  }
  function handleRerender() {
    setSeed(Math.random());
    setNewClick(false);
    setAccountClick(false);
  }
  async function handleBuy(item) {
    handleRerender();

    try {
      const res = await fetch('https://odd-cyan-agouti-toga.cyclic.app/buy-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            userId: props.userId,
            itemId: item._id,
          },
        ]),
      })
        .then((res) => res.json())
        .then((data) => data !== 'poop' && props.newUserData(data));
    } catch (err) {
      console.log(err);
    }
    // window.alert('item bought, view in My Account');
    // console.log(item);
  }
  function newData(data) {
    props.newUserData(data);
  }
  return (
    <>
      <Navbar
        Nav1={'Home'}
        onNav1={handleHome}
        Nav2={'List Item'}
        onNav2={handleNewItem}
        Nav3={'My Account'}
        onNav3={handleMyAcc}
        Nav4={'Sign Out'}
        onNav4={handleSignOut}
      />
      <div className="userPageDiv bg-[#f0ebfb]">
         <div className="bg-[#01959a] w-full py-8 lg:py-4 font-fredoka text-2xl text-center text-white">
         
          </div>
          <div className="bg-[#01959a] w-full py-8 lg:py-4 font-fredoka text-2xl text-center text-white">
         
          </div>
           <div className="bg-[#01959a] w-full py-8 lg:py-4 font-fredoka text-2xl text-center text-white">
          
          </div>
        <div className="grid grid-cols-3 font-fredoka py-4 pl-8 bg-[#01959a]">
          <div className="userPageText my-4 lg:my-12 text-white text-2xl md:text-3xl lg:text-4xl">
            Hello {props.userName}
          </div>
          
          <div className="text-center">
            <img
              className="inline-block w-24 sm:w-40"
              src="/avatar2.png"
              alt=""
            />
          </div>
          <div className="refresh text-end my-4 lg:my-12 pr-8">
            <span
              className="text-white hover:cursor-pointer text-2xl hover:text-[#f5f1ff]"
              onClick={handleRerender}
            >
              Refresh
            </span>
          </div>
        </div>

        {!isNewClicked && !isAccountClicked ? (
          <div className="userHomeDiv">
            <Items seed={seed} onBuyClick={handleBuy} />
          </div>
        ) : isAccountClicked ? (
          <MyAccount
            boughtItems={props?.boughtItems}
            listedItems={props?.listedItems}
            addNewItem={handleNewItem}
          />
        ) : isNewClicked ? (
          <ListNewItem
            newUserData={newData}
            onTap={handleRerender}
            userName={props.userName}
            userId={props.userId}
          />
        ) : (
          <div className="userHomeDiv">
            <Items seed={seed} onBuyClick={handleBuy} />
          </div>
        )}
      </div>
    </>
  );
}

export default UserPage;

