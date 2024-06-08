import readlinkSync from "readline-sync";
import { authUser, getUserBalance, updateUserBalance } from "./user";

export const startAtm = (): void => {
  console.log("Wellcome to the ATM!");

  const userId = readlinkSync.question("Enter Your User Id : ");
  const userPin = readlinkSync.question("Enter Your Pin : ", {
    hideEchoBack: true,
  });

  if (authUser(userId, userPin)) {
    console.log("Authentication Successfull");

    let exit = false;

    while (!exit) {
      console.log(
        "\n 1. Check Balance \n 2. Deposit Money \n 3. Withdraw Money \n 4. Exit"
      );

      const choice = readlinkSync.question("Choose an Option : ");

      switch (choice) {
        case "1":
          const balance = getUserBalance(userId);
          console.log(`Your Balance is ${balance}`);
          break;

        case "2":
          const depositAmmount = parseFloat(
            readlinkSync.question("Enter amount to deposit : ")
          );

          if (depositAmmount > 0) {
            const currentBalance = getUserBalance(userId);
            let newBalance = (currentBalance || 0) + depositAmmount;
            updateUserBalance(userId, newBalance);
          }

        case "3":
          const withDrawAmount = parseFloat(
            readlinkSync.question("Enter amount to withdraw : ")
          );
          const currentBalance = getUserBalance(userId);
          if (
            withDrawAmount > 0 &&
            currentBalance &&
            withDrawAmount <= currentBalance
          ) {
            updateUserBalance(userId, currentBalance - withDrawAmount);
            console.log(
              `Withdraw ${withDrawAmount}. New Balance ${
                currentBalance - withDrawAmount
              }`
            );
          } else {
            console.log("invalid ammount or insufficient balance.");
          }
          break;
        case "4":
          exit = true;
          console.log("Thank you for using our ATM!");
          break;
        default:
          console.log("invalid option.");
      }
    }
  } else {
    console.log("Authentication Failed. Please check your user ID and PIN.");
  }
};
