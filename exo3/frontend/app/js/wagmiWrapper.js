import { prepareWriteContract, writeContract, readContract, waitForTransaction, watchContractEvent } from "@wagmi/core";
import { contractAddress, abi } from "./constants";

export const BankFunctions = {
  withdraw: "withdraw", //Takes uint as parameter
  deposit: "deposit", // Is payable
  getBalanceOfUser: "getBalanceOfUser", // Returns int
};

export const BankEvents = {
  etherDeposited: "etherDeposited",
  etherWithdrawed: "etherWithdrawed",
};

/**
 * Method used to call a "read" method.
 * In the case of voting contract, you can use owner, workflowStatus, winningProposalId, getVoter and getOneProposal.
 * For the last ones, remember to give the appropriated arguments.
 */
export async function callReadMethod(
  BankFunction,
  accountToUse,
  args = [],
  endTXCallback = () => {},
  errorCallback = (e) => {
    throw e;
  }
) {
  try {
    const data = await readContract({
      address: contractAddress,
      abi: abi,
      functionName: BankFunctions[BankFunction],
      args: args,
      account: accountToUse,
    });

    endTXCallback();

    return data;
  } catch (e) {
    errorCallback(e);
  }
}
/**
 * Method used to call a "write" method.
 * In the case of voting contract, you can use addVoter, setVote, tallyVotes, and all workflowsStatus change methods.
 * For the first ones, remember to give the appropriated arguments.
 *
 * You can use endTXCallback to call a method once the block containing the method has been validated (like a toast for example)
 */
export async function callWriteMethod(
  BankFunction,
  args = [],
  endTXCallback = () => {},
  errorCallback = (e) => {
    throw e;
  }
) {
  try {
    console.log("ARGS ====== " + args);
    const config = await prepareWriteContract({
      address: contractAddress,
      abi: abi,
      functionName: BankFunctions[BankFunction],
      args: args,
    });
    const { hash } = await writeContract(config);

    await waitForTransaction({ hash: hash });

    endTXCallback();
  } catch (e) {
    errorCallback(e);
  }
}

export async function callPayableMethod(
  BankFunction,
  amount,
  endTXCallback = () => {},
  errorCallback = (e) => {
    throw e;
  }
) {
  try {
    const config = await prepareWriteContract({
      address: contractAddress,
      abi: abi,
      functionName: BankFunctions[BankFunction],
      value: amount,
    });
    const { hash } = await writeContract(config);

    await waitForTransaction({ hash: hash });

    endTXCallback();
  } catch (e) {
    errorCallback(e);
  }
}

export function watchEvent(
  BankEvent,
  callback = (log) => {},
  errorCallback = (e) => {
    throw e;
  }
) {
  try {
    watchContractEvent(
      {
        address: contractAddress,
        abi: abi,
        eventName: BankEvents[BankEvent],
      },
      callback
    );
  } catch (e) {
    errorCallback(e);
  }
}
