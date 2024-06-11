import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FC } from "react";

const Header: FC = () => {
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
          >
            Home
          </Button>
          <Button
            variant={"link"}
            colorScheme="blue"
            fontWeight={"bold"}
            textColor={"green.700"}
          >
            Mint
          </Button>
          <Button
            variant={"link"}
            colorScheme="blue"
            fontWeight={"bold"}
            textColor={"green.700"}
          >
            Market
          </Button>
        </Flex>
      </Flex>
      <Flex display={["none", "none", "flex"]}>
        <Button justifyContent="end">로그인</Button>
      </Flex>
      <Flex display={["flex", "flex", "none"]}>
        <Menu colorScheme="blue">
          <MenuButton
            colorScheme="blue"
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            Actions
          </MenuButton>
          <MenuList>
            <MenuItem>로그인</MenuItem>
            <MenuItem>HOME</MenuItem>
            <MenuItem>MINT</MenuItem>
            <MenuItem>MARKET</MenuItem>
            <MenuItem>로그아웃</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Header;
