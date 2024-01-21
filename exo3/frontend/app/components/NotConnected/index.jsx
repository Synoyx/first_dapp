import { Flex, Heading, Text } from "@chakra-ui/react";

const NotConnected = () => {
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" height="80vh">
      <Heading as="h1">Hi there!</Heading>
      <Heading as="h3" fontSize="4xl" mt="4">
        Welcome to our bank DApp
      </Heading>
      <Text mt="2rem">Please connect your wallet to be able to interact with our Dapp!!</Text>
    </Flex>
  );
};

export default NotConnected;
