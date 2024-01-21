import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Flex, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <>
      <Flex px="2rem" py="1rem" justifyContent="space-between" alignItems="center" width="100%" backgroundColor="#05045E">
        <Text fontSize={18} fontWeight={700} color={"#ffffff"}>
          Bank DApp
        </Text>
        <ConnectButton />
      </Flex>
    </>
  );
};

export default Header;
