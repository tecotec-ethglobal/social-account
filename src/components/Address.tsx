import React from "react";
import { Text, ClipboardIcon } from "evergreen-ui";

type AddressType = {
  style?: { [key: string]: string | undefined };
  address?: string;
};

const styles = {
  icon: {
    cursor: "pointer",
    verticalAlign: "baseline",
  },
};

function Address({ address, style }: AddressType) {
  if (!address) return null;

  const abbrevAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
  };

  // return <Text style={style}>{abbrevAddress}</Text>;
  return (
    <span>
      <ClipboardIcon style={styles.icon} onClick={copyToClipboard} /> {abbrevAddress}
    </span>
  );
}

export default Address;
