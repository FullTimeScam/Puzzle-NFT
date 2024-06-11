import { Flex } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { JsonRpcSigner } from "ethers";
import { Contract } from "ethers";
import mintContractAbi from "../lib/mintContractAbi.json";
import { mintContractAddress } from "../lib/contractAddress";

export interface OutletContext {
  mintContract: Contract | null;
  signer: JsonRpcSigner | null;
}

const Layout: FC = () => {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [mintContract, setMintContract] = useState<Contract | null>(null);

  useEffect(() => {
    if (!signer) return;

    setMintContract(new Contract(mintContractAddress, mintContractAbi, signer));
  }, [signer]);

  useEffect(() => console.log(mintContract), [mintContract]);

  return (
    <Flex
      bgGradient={"linear(to-t, blue, blue.300)"}
      maxW={{ base: "100%", md: 768 }}
      mx={"auto"}
      minH={"100vH"}
      p={4}
      boxShadow={"lg"}
      border={"1px solid"}
      borderColor={"gray.200"}
      borderRadius={8}
      flexDir={"column"}
      letterSpacing={4}
    >
      <Header signer={signer} setSigner={setSigner} />
      <Flex
        bgColor={"green.100"}
        flexGrow={1}
        flex={1}
        mt={{ base: 4, md: 0 }}
        borderBottomRadius={8}
      >
        <Outlet context={{ signer, mintContract }} />
      </Flex>
    </Flex>
  );
};

export default Layout;
