import React from "react";
import { Text } from "evergreen-ui";

type AddressType = {
  style?: { [key: string]: string | undefined };
  address?: string;
};
function Address({ address, style }: AddressType) {
  if (!address) return null;

  const abbrevAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  // return <Text style={style}>{abbrevAddress}</Text>;
  return <>{abbrevAddress}</>;
}

export default Address;
