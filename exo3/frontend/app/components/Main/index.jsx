"use client";

import {
  Button,
  Flex,
  VStack,
  Text,
  Input,
  InputGroup,
  InputRightAddon,
  Box,
  Card,
  CardHeader,
  CardBody,
  ListItem,
  ListIcon,
  UnorderedList,
} from "@chakra-ui/react";
import { MdArrowCircleDown, MdArrowCircleUp } from "react-icons/md";
import { useState, useEffect } from "react";
import { init, deposit, withdraw, getBalanceOfUser } from "@/app/components/Main/Main.js";
import { useAccount } from "wagmi";
import Loader from "@/app/components/Loader";

const Main = () => {
  let [isLoading, setIsLoading] = useState(true);
  let [depositEvents, setDepositEvents] = useState([]);
  let [withdrawEvents, setWithdrawEvents] = useState([]);
  let [userBalance, setUserBalance] = useState(0);
  let { address } = useAccount();
  let isLoadingUserBalance = false;

  useEffect(() => {
    init(
      () => depositEvents,
      setDepositEvents,
      () => withdrawEvents,
      setWithdrawEvents
    );
    refreshUserBalance();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refreshUserBalance();
  }, [depositEvents, withdrawEvents]);

  function refreshUserBalance() {
    if (!isLoadingUserBalance) {
      isLoadingUserBalance = true;

      getBalanceOfUser(address).then((balance) => {
        if (isLoadingUserBalance) {
          setUserBalance(Number(balance));
          isLoadingUserBalance = false;
        }
      });
    }
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Flex alignContent={"center"} justifyContent={"center"} flexDirection={"column"}>
          <VStack spacing="24px">
            <Card width="30%" align="center">
              <CardHeader>Your balance in the Bank</CardHeader>
              <CardBody>
                <Text>{userBalance}</Text>
              </CardBody>
            </Card>

            <Card width="60%">
              <CardHeader>Deposit</CardHeader>
              <CardBody>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <InputGroup marginRight={5}>
                    <Input type="number" id="depositAmount"></Input>
                    <InputRightAddon>Wei</InputRightAddon>
                  </InputGroup>
                  <Button colorScheme="blue" onClick={() => deposit(document.getElementById("depositAmount").value)}>
                    Validate deposit
                  </Button>
                </Box>
              </CardBody>
            </Card>

            <Card width="60%">
              <CardHeader>Withdraw</CardHeader>
              <CardBody>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <InputGroup marginRight={5}>
                    <Input type="number" id="withdrawAmount"></Input>
                    <InputRightAddon>Wei</InputRightAddon>
                  </InputGroup>
                  <Button colorScheme="blue" onClick={() => withdraw([document.getElementById("withdrawAmount").value])}>
                    Validate withdraw
                  </Button>
                </Box>
              </CardBody>
            </Card>

            <Card width="60%">
              <CardHeader>Deposit Events</CardHeader>
              <CardBody>
                <UnorderedList>
                  {depositEvents.map((event) => (
                    <ListItem key={event.substr(event.lengt - 8, event.length - 1)}>
                      <ListIcon as={MdArrowCircleDown} color="green.500" />
                      {event}
                    </ListItem>
                  ))}
                </UnorderedList>
              </CardBody>
            </Card>

            <Card width="60%">
              <CardHeader>Withdraw Events</CardHeader>
              <CardBody>
                <UnorderedList>
                  {withdrawEvents.map((event) => (
                    <ListItem key={event.substr(event.lengt - 8, event.length - 1)}>
                      <ListIcon as={MdArrowCircleUp} color="red.500" />
                      {event}
                    </ListItem>
                  ))}
                </UnorderedList>
              </CardBody>
            </Card>
          </VStack>
        </Flex>
      )}
    </>
  );
};

export default Main;
