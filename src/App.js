import { useId, useState } from "react";
import "./App.css";

export default function App() {
  const [open, setOpen] = useState();
  const [add, setAdd] = useState(0);
  const [newName, setNewName] = useState();
  const id = useId();
  const [friends, setFriends] = useState([
    {
      id: { id },
      name: "Chinmay",
      owe: 0,
    },
    {
      id: { id },
      name: "Anirban",
      owe: 0,
    },
    {
      id: { id },
      name: "Akshat",
      owe: 0,
    },
    {
      id: { id },
      name: "Gowtham",
      owe: 0,
    },
  ]);

  function handleOpen(id) {
    setOpen((open) => (open === id ? undefined : id));
  }



  function handleAdder() {
    if (newName) {
      setFriends((prevItems) => [
        ...prevItems,
        {
          id: { id },
          name: newName,
          owe: 0,
        },
      ]);
      setNewName("");
      setAdd(0);
    }
  }

  function findFriend() {
    const friend = friends.find((friend) => friend.id === open);
    return friend ? friend.name : "";
  }

  function Friend({ data }) {
    return (
      <div className="friendList">
        <div className="content">
          <span>{data.name}</span>
          <span
            className={`owe ${
              data.owe > 0 ? "green" : data.owe < 0 ? "red" : ""
            }`}
          >
            {`${
              data.owe >= 0 ? `${data.name} owes you` : `You owe ${data.name}`
            } ${Math.abs(data.owe)}$`}
          </span>
        </div>
        <button onClick={() => handleOpen(data.id)}>
          {open === data.id ? "Close" : "Select"}
        </button>
      </div>
    );
  }
  function AddMenu() {
    return (
      <div className="addMenu">
        <div className="inputs">
          <span for="adder">Friend Name:</span>
          <input
            type="text"
            id="adder"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <button className="add-menu-button" onClick={handleAdder}>
          Add
        </button>
      </div>
    );
  }

  function SplitMenu() {
    const [billVal, setBillVal] = useState();
    const [yexVal, setYexVal] = useState();
    const [payer, setPayer] = useState("You");

    function handleSubmit(e) {
      e.preventDefault();
      setFriends((prevItems) =>
        prevItems.map((item) =>
          item.id === open
            ? {
                ...item,
                owe: payer === "You" ? billVal - yexVal : yexVal - billVal,
              }
            : item
        )
      );
    }

    return (
      <div className="split-menu">
        <span id="splitstat">
          SPLIT BILL WITH {findFriend().toLocaleUpperCase()}
        </span>
        <form onSubmit={(e) => handleSubmit(e)} key={open}>
          <div className="inputs">
            <label for="BVal">
              <span>Bill value</span>
            </label>
            <input
              type="text"
              id="BVal"
              value={billVal}
              onChange={(e) => setBillVal(e.target.value)}
            />
          </div>
          <div className="inputs">
            <label for="Yex">
              <span>Your expense</span>
            </label>
            <input
              type="text"
              id="Yex"
              value={yexVal}
              onChange={(e) => setYexVal(e.target.value)}
            />
          </div>
          <div className="inputs">
            <span>{findFriend()}'s expense</span>
            <div className="calEx">
              {billVal - yexVal >= 0 ? billVal - yexVal : "-"}
            </div>
          </div>
          <div className="inputs">
            <label for="Payer">
              <span>Who is paying?</span>
            </label>
            <select
              value={payer}
              onChange={(e) => setPayer(e.target.value)}
              id="Payer"
            >
              <option value="You">You</option>
              <option value={findFriend()}>{findFriend()}</option>
            </select>
          </div>
          <input type="submit" value="Split Bill" className="submit" />
        </form>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="friends">
        <div className="list">
          {friends.map((yo) => (
            <Friend data={yo} />
          ))}
        </div>
        {add === 0 && (
          <button className="Add" onClick={() => setAdd(add === 0 ? "1" : "0")}>
            Add friend
          </button>
        )}
        {add !== 0 && <AddMenu />}
      </div>
      {open !== undefined && <SplitMenu />}
    </div>
  );
}
