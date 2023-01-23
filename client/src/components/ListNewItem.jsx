import { useState } from 'react';
import './App.css';

function ListNewItem(props) {
  const [itemName, setName] = useState('');
  const [itemPrice, setPrice] = useState('');
  const [itemImgUrl, setUrl] = useState('');

  function handleNameChange(e) {
    const { value } = e.target;

    setName(value);
  }
  function handlePriceChange(e) {
    const { value } = e.target;

    setPrice(value);
  }
  function handleUrlChange(e) {
    const { value } = e.target;

    setUrl(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.onTap();

    try {
      const res = await fetch('https://odd-cyan-agouti-toga.cyclic.app/new-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            itemName: itemName,
            itemPrice: itemPrice,
            itemImgUrl: itemImgUrl,
            userName: props.userName,
            userId: props.userId,
          },
        ]),
      })
        .then((res) => res.json())
        .then((data) => data !== 'poop' && props.newUserData(data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" font-allerta lg:my-8 px-[5%] pt-[15%] pb-[50%] lg:p-[2%_25%_15%]">
      <form
        className="shadow-xl p-4 lg:p-[2%] bg-[#ddd2f3] rounded-lg"
        onSubmit={handleSubmit}
      >
        <label htmlFor="itemName">
          Item Name <span className="text-red-500">*</span>
        </label>
        <input
          className="block border-none rounded-sm w-[90%] h-[2rem] m-[3%_0] focus:outline-none"
          id="itemName"
          type="text"
          value={itemName}
          onChange={handleNameChange}
          name="itemName"
        />
        <label className="text-md m-[1%_0]" htmlFor="itemPrice">
          Item Price <span className="text-red-500">*</span>
        </label>
        <input
          className="block border-none rounded-sm w-[90%] px-2 h-[2rem] m-[3%_0] focus:outline-none"
          id="itemPrice"
          type="number"
          value={itemPrice}
          onChange={handlePriceChange}
          name="itemPrice"
        />
        <label className="text-md m-[1%_0]" htmlFor="itemImgUrl">
          Item Image Url/Link
        </label>
        <input
          className="block border-none rounded-sm w-[90%] px-2 h-[2rem] m-[3%_0] focus:outline-none"
          id="itemImgUrl"
          type="text"
          value={itemImgUrl}
          onChange={handleUrlChange}
          name="itemImgUrl"
        />
        <div className="messageDiv">
          <p
            className="m-0"
            style={
              itemName && itemPrice
                ? { visibility: 'hidden' }
                : { color: '#01959a' }
            }
          >
            Please fill in the required fields *
          </p>
        </div>
        <center>
          {' '}
          <button
            className="bg-[#01959a]  border-[#8c51ff] hover:bg-[#01959a]  text-white text-xl w-[66%] p-[2%] m-[3%_0] rounded-2xl border-2"
            type={itemName && itemPrice ? 'submit' : 'button'}
          >
            {' '}
            Add New Item
          </button>
        </center>{' '}
      </form>
    </div>
  );
}

export default ListNewItem;
