import {
  Button,
  Flex,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
// import { ethers } from "ethers";
import { useMetamask } from "../lib";

import axios from "axios";
import MintModal from "../components/MintModal";

const Mint: FC = () => {
  const { signer, setSigner, mintContract } = useOutletContext<OutletContext>();
  const [tokenId, setTokenId] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [stsNftMetadata, setStsNftMetadata] = useState<StsNftMetadata>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClickMintNft = async () => {
    try {
      if (!mintContract || !tokenId || !amount) return;

      setIsLoading(true);

      const response = await mintContract.mintNft(tokenId, amount);

      await response.wait();

      const axiosResponse = await axios.get<NftMetadata>(
        `${import.meta.env.VITE_METADATA_URI}/${tokenId}.json`
      );

      setStsNftMetadata({
        ...axiosResponse.data,
        tokenId,
        amount,
      });

      onOpen();

      setIsLoading(false);
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  };

  //   useEffect(() => {
  //     console.log(tokenId);
  //   }, [tokenId]);
  //   const onClickMetamask = async () => {
  //     try {
  //       if (!window.ethereum) return;

  //       const provider = new ethers.BrowserProvider(window.ethereum);

  //       setSigner(await provider.getSigner());
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  // ilb의 index.tsx에 넣어놨음
  return (
    <>
      <Flex
        flexDir="column"
        w="100%"
        mb={[10, 10, 20]}
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize={[24, 24, 36]} fontWeight={"semibold"}>
          Kimchi hehe
        </Text>
        <Image
          src="images/Fulltime_scam_promrammer_pepe.png"
          alt="image"
          mb={2}
        />
        {signer ? (
          <Flex flexDir={"column"} gap={[4, 4, 8]} mb={8}>
            <Flex>{signer.address}</Flex>
            <Flex gap={3}>
              <Flex>
                <Text>NFT ID</Text>
                <NumberInput
                  size={["sm", "sm", "md"]}
                  value={tokenId}
                  onChange={(v) => setTokenId(Number(v))}
                  defaultValue={1}
                  min={1}
                  max={15}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
              <Flex>
                <Text>발행량</Text>
                <NumberInput
                  size={["sm", "sm", "md"]}
                  value={amount}
                  onChange={(v) => setAmount(Number(v))}
                  defaultValue={1}
                  min={0}
                  max={20}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
              <Button
                colorScheme="blue"
                size={["sm", "sm", "md"]}
                onClick={onClickMintNft}
                isDisabled={isLoading || tokenId === 0 || amount === 0}
                isLoading={isLoading}
                loadingText="SCAMMING..."
              >
                민팅하기
              </Button>
            </Flex>
          </Flex>
        ) : (
          <Flex
            flexDir={"column"}
            gap={[4, 4, 8]}
            alignItems={"center"}
            fontWeight={"bold"}
          >
            <Text>바다를 저장하지 1,000BTC 즉.시.증.정.</Text>
            <Text>100% No SCAM</Text>
            <Text>상위1만 바다를 오직 구하다 있습니다!</Text>
            <Button
              colorScheme="blue"
              w={"fit-content"}
              onClick={() => useMetamask(setSigner)}
            >
              🦊 로그인
            </Button>
          </Flex>
        )}
      </Flex>
      <MintModal
        isOpen={isOpen}
        onClose={onClose}
        stsNftMetadata={stsNftMetadata}
      />
    </>
  );
};

export default Mint;
