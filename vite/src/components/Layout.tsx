import { Flex } from "@chakra-ui/react";
import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { JsonRpcSigner } from "ethers";

const Layout: FC = () => {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
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
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default Layout;
