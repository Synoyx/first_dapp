import { BankFunctions, BankEvents, callReadMethod, callWriteMethod, callPayableMethod, watchEvent } from "@/app/js/wagmiWrapper.js";

async function init(getDepositEvents, setDepositEvents, getWithdrawEvents, setWithdrawEvents) {
  watchEvent(BankEvents.etherDeposited, async (event) => {
    const eventText =
      getCurrentDateAsReadableString() + " " + event[0].eventName + "(" + event[0].args.account + ", " + event[0].args.amount + ")";

    if (getDepositEvents().indexOf(eventText) === -1) {
      setDepositEvents([...getDepositEvents(), eventText]);
    }
  });

  watchEvent(BankEvents.etherWithdrawed, async (event) => {
    const eventText =
      getCurrentDateAsReadableString() + " " + event[0].eventName + "(" + event[0].args.account + ", " + event[0].args.amount + ")";

    if (getWithdrawEvents().indexOf(eventText) === -1) {
      setWithdrawEvents([...getWithdrawEvents(), eventText]);
    }
  });
}

async function withdraw(amount) {
  await callWriteMethod(BankFunctions.withdraw, amount);
}

async function deposit(amount) {
  await callPayableMethod(BankFunctions.deposit, amount);
}

async function getBalanceOfUser(accountToUse) {
  return await callReadMethod(BankFunctions.getBalanceOfUser, accountToUse);
}

function getCurrentDateAsReadableString() {
  let cDate = new Date();
  return (
    "[" +
    String(cDate.getDate()).padStart(2, "0") +
    "/" +
    String(cDate.getMonth() + 1).padStart(2, "0") +
    "/" +
    cDate.getFullYear() +
    " @ " +
    String(cDate.getHours()).padStart(2, "0") +
    ":" +
    String(cDate.getMinutes()).padStart(2, "0") +
    ":" +
    String(cDate.getSeconds()).padStart(2, "0") +
    "]"
  );
}

export { init, deposit, withdraw, getBalanceOfUser };
