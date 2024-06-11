import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";

const Home: FC = () => {
  const { signer, mintContract } = useOutletContext<OutletContext>();

  const getCheckNfts = async () => {
    try {
      if (!signer || !mintContract) return;

      const response = await mintContract.checkNfts(signer.address);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return <Flex>Home</Flex>;
};

export default Home;
