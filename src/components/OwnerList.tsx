import React, { useState } from "react";
import Address from "./Address";
import { Button, TextInput, TrashIcon } from "evergreen-ui";

type OwnerListProp = {
  owners: string[];
  selfAddress: string;
  setOwners: (owners: string[]) => void;
};

const ownerListStyles = {
  ownerList: {
    textAlign: "left" as "left", // https://github.com/cssinjs/jss/issues/1344
  },
  owners: {
    marginBottom: "1em",
    display: "flex",
    flexDirection: "column" as "column",
    gap: "0.5em",
  },
  addOwner: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "1em",
  },
};

function OwnerList({ owners, selfAddress, setOwners }: OwnerListProp) {
  const [newOwner, setNewOwner] = useState("");

  const newOwnerInputHandler = (e) => {
    setNewOwner(e.target.value);
  };
  const addOwner = () => {
    if (!newOwner) return;
    if (newOwner.length !== 42) return;
    setOwners([...owners, newOwner]);
    setNewOwner("");
  };
  const removeOwner = (ownerIndex: number) => {
    const newOwners = [...owners];
    newOwners.splice(ownerIndex, 1);
    setOwners(newOwners);
  };

  return (
    <div className="owner-list" style={ownerListStyles.ownerList}>
      <h4>Owners</h4>
      <div className="owners" style={ownerListStyles.owners}>
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

      <div className="add-owner" style={ownerListStyles.addOwner}>
        <TextInput value={newOwner} onChange={newOwnerInputHandler} />
        <Button onClick={addOwner}>Add</Button>
      </div>
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
    position: "relative" as "relative",
  },
  you: {
    width: "3em",
  },
  remove: {
    position: "absolute" as "absolute",
    right: "0",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
  },
};

function Owner({ address, ownerIndex, isSelf, removeOwner }: OwnerProp) {
  return (
    <div className="owner" style={ownerStyle.owner}>
      <div className="you" style={ownerStyle.you}>
        {isSelf && "YOU"}
      </div>
      <Address address={address} />
      {!isSelf && (
        <TrashIcon
          className="remove"
          onClick={() => removeOwner(ownerIndex)}
          style={ownerStyle.remove}
        />
      )}
    </div>
  );
}

export default OwnerList;
