import React, { useState } from "react";

type OwnerListProp = {
  owners: string[];
  selfAddress: string;
  setOwners: (owners: string[]) => void;
};

function OwnerList({ owners, selfAddress, setOwners }: OwnerListProp) {
  const [newOwner, setNewOwner] = useState("");

  const newOwnerInputHandler = (e) => {
    setNewOwner(e.target.value);
  };
  const addOwner = () => {
    if (!newOwner) return;
    setOwners([...owners, newOwner]);
    setNewOwner("");
  };
  const removeOwner = (ownerIndex: number) => {
    const newOwners = [...owners];
    newOwners.splice(ownerIndex, 1);
    setOwners(newOwners);
  };

  return (
    <div className="owner-list">
      <div className="owners">
        {owners.map((address, idx) => (
          <Owner
            key={address}
            address={address}
            ownerIndex={idx}
            isSelf={address === selfAddress}
            removeOwner={removeOwner}
          />
        ))}
      </div>

      <input type="text" value={newOwner} onChange={newOwnerInputHandler} />
      <button onClick={addOwner}>add Owner</button>
    </div>
  );
}

type OwnerProp = {
  address: string;
  ownerIndex: number;
  isSelf: boolean;
  removeOwner: (ownerIndex: number) => void;
};

const ownerStyle = {
  owner: {
    display: "flex",
    flexDirection: "row" as "row", // https://github.com/cssinjs/jss/issues/1344
    gap: "1em",
  },
  you: {
    width: "5em",
  },
};

function Owner({ address, ownerIndex, isSelf, removeOwner }: OwnerProp) {
  return (
    <div className="owner" style={ownerStyle.owner}>
      <span className="you" style={ownerStyle.you}>
        {isSelf && "YOU"}
      </span>
      <span className="address">{address}</span>
      {!isSelf && (
        <span className="remove" onClick={() => removeOwner(ownerIndex)}>
          X
        </span>
      )}
    </div>
  );
}

export default OwnerList;
