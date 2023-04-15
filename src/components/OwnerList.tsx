import React, { useState } from "react";

type OwnerListProp = {
  // 先頭のオーナーは自分であることを想定
  // つまり owners.length >= 1
  owners: string[];
  updateOwners: (owners: string[]) => void;
};

function OwnerList({ owners, updateOwners }: OwnerListProp) {
  const [self, ...others] = owners;
  const [newOwner, setNewOwner] = useState("");
  console.log("Child update!");

  const newOwnerInputHandler = (e) => {
    setNewOwner(e.target.value);
  };
  const addOwner = () => {
    if (!newOwner) return;
    updateOwners([...owners, newOwner]);
    setNewOwner("");
  };
  const removeOwner = (ownerIndex: number) => {
    owners.splice(ownerIndex, 1);
    updateOwners([...owners]);
  };

  return (
    <div className="owner-list">
      <div className="owners">
        <SelfOwner address={self} />
        {others.map((address, idx) => (
          <OtherOwner
            key={address}
            address={address}
            ownerIndex={idx + 1}
            removeOwner={removeOwner}
          />
        ))}
      </div>

      <input type="text" value={newOwner} onChange={newOwnerInputHandler} />
      <button onClick={addOwner}>add Owner</button>
    </div>
  );
}

type SelfOwnerProp = {
  address: string;
};
type OtherOwnerProp = {
  ownerIndex: number;
  removeOwner: (ownerIndex: number) => void;
} & SelfOwnerProp;
const ownerStyle = {
  selfAndOtherOwner: {
    display: "flex",
    flexDirection: "row" as "row", // https://github.com/cssinjs/jss/issues/1344
    gap: "1em",
  },
  you: {
    width: "5em",
  },
};

function SelfOwner({ address }: SelfOwnerProp) {
  return (
    <div className="self-owner" style={ownerStyle.selfAndOtherOwner}>
      <span className="you" style={ownerStyle.you}>
        YOU
      </span>
      <span className="address">{address}</span>
      <span className="remove"></span>
    </div>
  );
}

function OtherOwner({ address, ownerIndex, removeOwner }: OtherOwnerProp) {
  return (
    <div className="other-owner" style={ownerStyle.selfAndOtherOwner}>
      <span className="you" style={ownerStyle.you}></span>
      <span className="address">{address}</span>
      <span className="remove" onClick={() => removeOwner(ownerIndex)}>
        X
      </span>
    </div>
  );
}

export default OwnerList;
