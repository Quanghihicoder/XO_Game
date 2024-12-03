import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../styles/room.css";
import { useNavigate } from "react-router-dom";
import reload from "../../icons/reload.png";
import gameControl from "../../icons/game-controller.png";

const Room = () => {
  const navigate = useNavigate();

  // Retrieve game settings from Redux store
  const size = Number(useSelector((state) => state.size));
  const winCondition = Number(useSelector((state) => state.winingCondition));

  const [overlay, setOverlay] = useState(false);

  const goBack = () => {
    navigate(-1);
  };

  const handleNewRoom = () => {
    setOverlay(true);
  };

  const handleNewRoomCancel = () => {
    setOverlay(false);
  };

  const handleNewPublicRoom = () => {};

  const handleNewPrivateRoom = () => {};

  const handleJoinRoom = ()=> {};

  const handleReload = ()=> {};

  return (
    <div className="Container Room">
      <div
        className={`Overlay ${overlay === false && "None"}`}
        onClick={() => handleNewRoomCancel()}
      />

      <div className={`OverlayControl ${overlay === false && "None"}`}>
        <div>
          <button
            className="Button Medium Green"
            onClick={() => handleNewPublicRoom()}
          >
            Public Room
          </button>

          <button
            className="Button Medium Orange"
            onClick={() => handleNewPrivateRoom()}
          >
            Private Room
          </button>
        </div>
        <button
          className="Button Medium Red"
          onClick={() => handleNewRoomCancel()}
        >
          Cancel
        </button>
      </div>

      <div className="Header">
        <button className="Button Medium Navy" onClick={() => goBack()}>
          Back
        </button>

        <button className="Button Medium Green" onClick={() => handleNewRoom()}>
          New Room
        </button>
      </div>

      <div className="Body">
        <div className="List">
          <div className="Header">
            <div className="Input">
              <div>
                <p className="InputTitle">Enter room ID or join a room below</p>
                <input className="InputBox" type="text" />
              </div>
              <button onClick={()=>handleJoinRoom()}>Join</button>
            </div>

            <div>
              <button className="Reload" onClick={()=>handleReload()}><img src={reload} alt="Reload Icon" width={30} height={30}/></button>
            </div>
          </div>

          <div className="Item" onClick={()=>handleJoinRoom()}>
            <img src={gameControl} alt="Game Icon" width={18} height={18}/>
            <p className="Name">Room: shhskaaa</p>
          </div>

          <div className="Item">
            <p className="Name">shhskaaa</p>
          </div>

          <div className="Item">
            <p className="Name">shhskaaa</p>
          </div>

          <div className="Item">
            <p className="Name">shhskaaa</p>
          </div>

          <div className="Item">
            <p className="Name">shhskaaa</p>
          </div>

          <div className="Item">
            <p className="Name">shhskaaa</p>
          </div>

          <div className="Item">
            <p className="Name">shhskaaa</p>
          </div>

          <div className="Item">
            <p className="Name">shhskaaa</p>
          </div>

          <div className="Item">
            <p className="Name">shhskaaa</p>
          </div>

          <div className="Item">
            <p className="Name">shhskaaa</p>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Room;
