import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { JsonRpcSigner, ethers } from "ethers";
import { Dispatch, FC, SetStateAction, useEffect } from "react";

interface HeaderProps {
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
}

const Header: FC<HeaderProps> = ({ signer, setSigner }) => {
  const onClickMetamask = async () => {
    try {
      if (!window.ethereum) return;

      const provider = new ethers.BrowserProvider(window.ethereum);

      setSigner(await provider.getSigner());
    } catch (error) {
      console.error(error);
    }
  };

  const onClickLogOut = () => {
    setSigner(null);
  };

  useEffect(() => console.log(signer), [signer]);
  const navigate = useNavigate();

  return (
    <Flex
      h={20}
      borderTopRadius={8}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Flex fontWeight={"semibold"} px={4}>
        Save the SEA
      </Flex>
      <Flex display={["none", "none", "flex"]}>
        <Flex display={["none", "none", "flex"]} gap={8}>
          <Button
            variant={"link"}
            colorScheme="blue"
            fontWeight={"bold"}
            textColor={"green.700"}
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          <Button
            variant={"link"}
            colorScheme="blue"
            fontWeight={"bold"}
            textColor={"green.700"}
            onClick={() => navigate("/mint")}
          >
            Mint
          </Button>
          <Button
            variant={"link"}
            colorScheme="blue"
            fontWeight={"bold"}
            textColor={"green.700"}
            onClick={() => navigate("/market")}
          >
            Market
          </Button>
        </Flex>
      </Flex>
      <Flex display={["none", "none", "flex"]} justifyContent={"end"}>
        {signer ? (
          <Button colorScheme="blue">
            {signer.address.substring(0, 7)}...
          </Button>
        ) : (
          <Button colorScheme="blue" onClick={onClickMetamask}>
            🦊 로그인
          </Button>
        )}
      </Flex>
      <Flex display={["flex", "flex", "none"]}>
        <Menu colorScheme="blue">
          <MenuButton
            colorScheme="blue"
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            {signer ? `${signer.address.substring(0, 7)}...` : "메뉴"}
          </MenuButton>
          <MenuList>
            {!signer && (
              <MenuItem onClick={onClickMetamask}>🦊 로그인</MenuItem>
            )}
            <MenuItem>HOME</MenuItem>
            <MenuItem>MINT</MenuItem>
            <MenuItem>MARKET</MenuItem>
            {signer && <MenuItem onClick={onClickLogOut}>🦊 로그아웃</MenuItem>}
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Header;
