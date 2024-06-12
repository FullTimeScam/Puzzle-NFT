import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { JsonRpcSigner } from "ethers";
import { Dispatch, FC, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useMetamask } from "../lib";

interface HeaderProps {
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
}

const Header: FC<HeaderProps> = ({ signer, setSigner }) => {
  // const onClickMetamask = async () => {
  //   try {
  //     if (!window.ethereum) return;

  //     const provider = new ethers.BrowserProvider(window.ethereum);

  //     setSigner(await provider.getSigner());
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const onClickLogOut = () => {
    setSigner(null);
  };

  // useEffect(() => console.log(signer), [signer]);
  const navigate = useNavigate();

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Mint",
      path: "/mint",
    },
    {
      name: "Market",
      path: "/sale",
    },
    {
      name: "My",
      path: "/my",
    },
  ];

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
          {navLinks.map((v, i) => (
            <Button
              key={i}
              variant={"link"}
              colorScheme="blue"
              fontWeight={"bold"}
              textColor={"green.700"}
              onClick={() => navigate(v.path)}
            >
              {v.name}
            </Button>
          ))}
          {/* <Button
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
            구하러가기
          </Button>
          <Button
            variant={"link"}
            colorScheme="blue"
            fontWeight={"bold"}
            textColor={"green.700"}
            onClick={() => navigate("/market")}
          >
            Market
          </Button> */}
        </Flex>
      </Flex>
      <Flex display={["none", "none", "flex"]} justifyContent={"end"}>
        {signer ? (
          <Button colorScheme="blue">
            {signer.address.substring(0, 7)}...
          </Button>
        ) : (
          <Button colorScheme="blue" onClick={() => useMetamask(setSigner)}>
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
              <MenuItem onClick={() => useMetamask(setSigner)}>
                🦊 로그인
              </MenuItem>
            )}
            {navLinks.map((v, i) => (
              <MenuItem key={i} onClick={() => navigate(v.path)}>
                {v.name}
              </MenuItem>
            ))}
            {signer && <MenuItem onClick={onClickLogOut}>🦊 로그아웃</MenuItem>}
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Header;
