import { useState } from "react";
import FriendsList from "./components/FriendList";
import FormAddFriend from "./components/FormAddFriend";
import Button from "./components/Button";
import FormSplitBill from "./components/FormSplitBill";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, SetSelectedFriend] = useState(null);

  function handleAddFriend(friend) {
    setFriends((fr) => [...fr, friend]);
    setShowAddFriend(false);
  }

  function handleShowAddFriend() {
    setShowAddFriend((curr) => !curr);
  }

  function handleSelection(friend) {
    SetSelectedFriend((selected) =>
      selected?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    SetSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />

        {showAddFriend && <FormAddFriend onFriendAdd={handleAddFriend} />}

        <Button onClick={handleShowAddFriend}>
          {!showAddFriend ? "Add friend" : "Close"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

// function Button({ children, onClick }) {
//   return (
//     <button className="button" onClick={onClick}>
//       {children}
//     </button>
//   );
// }

// function FriendsList({ friends, onSelection, selectedFriend }) {
//   return (
//     <ul>
//       {friends.map((friend) => (
//         <Friend
//           friend={friend}
//           key={friend.id}
//           onSelection={onSelection}
//           selectedFriend={selectedFriend}
//         />
//       ))}
//     </ul>
//   );
// }

// function Friend({ friend, onSelection, selectedFriend }) {
//   const isSelected = selectedFriend?.id === friend.id;

//   return (
//     <li className={isSelected ? "selected" : ""}>
//       <img src={friend.image} alt="friend img" />
//       <h3>{friend.name}</h3>

//       {friend.balance < 0 && (
//         <p className="red">
//           You owe {friend.name} ${Math.abs(friend.balance)}
//         </p>
//       )}
//       {friend.balance > 0 && (
//         <p className="green">
//           {friend.name} owe you ${Math.abs(friend.balance)}
//         </p>
//       )}
//       {friend.balance === 0 && (
//         <p className="">You and {friend.name} are even</p>
//       )}

//       <Button onClick={() => onSelection(friend)}>
//         {isSelected ? "close" : "select"}
//       </Button>
//     </li>
//   );
// }

// function FormAddFriend({ onFriendAdd }) {
//   const [name, setName] = useState("");
//   const [image, setImage] = useState("https://i.pravatar.cc/48");

//   function handleSubmit(e) {
//     e.preventDefault();

//     if (!name || !image) return;

//     const id = crypto.randomUUID();

//     const newFriend = {
//       name: name,
//       image: `${image}?=${id}`,
//       balance: 0,
//       id: id,
//     };

//     onFriendAdd(newFriend);

//     setName("");
//     setImage("https://i.pravatar.cc/48");
//   }

//   return (
//     <form className="form-add-friend" onSubmit={handleSubmit}>
//       <label>👫Friend name</label>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       <label>🌄Image URL</label>
//       <input
//         type="text"
//         value={image}
//         onChange={(e) => setImage(e.target.value)}
//       />

//       <Button>Add</Button>
//     </form>
//   );
// }

// function FormSplitBill({ selectedFriend, onSplitBill }) {
//   const [bill, setBill] = useState("");
//   const [paidByUser, setPaidByUser] = useState("");

//   const [whoIsPaying, setWhoISPaying] = useState("user");

//   const paidByFriend = bill ? bill - paidByUser : "";

//   function handleSubmit(e) {
//     e.preventDefault();

//     if (!bill || !paidByUser) return;

//     onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
//   }

//   return (
//     <form className="form-split-bill" onSubmit={handleSubmit}>
//       <h2>Split a bill with {selectedFriend.name}</h2>

//       <label>💰 Bill value</label>
//       <input
//         type="text"
//         value={bill}
//         onChange={(e) => setBill(Number(e.target.value))}
//       />

//       <label>🧍‍♀️ Your expense</label>
//       <input
//         type="text"
//         value={paidByUser}
//         onChange={(e) =>
//           setPaidByUser(
//             Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
//           )
//         }
//       />

//       <label>👫 {selectedFriend.name}'s expense</label>
//       <input type="text" disabled value={paidByFriend} />

//       <label>🤑 Who is paying the bill</label>
//       <select
//         value={whoIsPaying}
//         onChange={(e) => setWhoISPaying(e.target.value)}
//       >
//         <option value="user">you</option>
//         <option value="friend">{selectedFriend.name}</option>
//       </select>

//       <Button>Split bill</Button>
//     </form>
//   );
// }

export default App;
