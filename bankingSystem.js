const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const accounts = [];

const bankNames = [
    "Global Trust Bank",
    "Universal Bank of Commerce",
    "Fortune Bank",
    "Horizon Savings Bank",
    "Pinnacle Bank",
    "Aurora National Bank",
    "Summit Financial Bank",
    "Crescent Bank & Trust",
    "Legacy Credit Union",
    "Infinity State Bank"
];

function getInput(question) {
    return new Promise((resolve) => rl.question(question, resolve));
}

function generateAccountNumber() {
    let accountNumber;
    do {
        accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    } while (accounts.some(acc => acc.accountNumber === accountNumber));
    return accountNumber;
}

async function selectBank() {
    console.log("\nSelect a Bank:");
    bankNames.forEach((bank, index) => {
        console.log(`${index + 1}. ${bank}`);
    });

    while (true) {
        const bankChoice = parseInt(await getInput("Enter the number of your chosen bank: "));
        if (bankChoice >= 1 && bankChoice <= bankNames.length) {
            return bankNames[bankChoice - 1];
        } else {
            console.log("Invalid choice. Please select a valid bank number.");
        }
    }
}

async function createAccount() {
    const selectedBank = await selectBank();
    const accountNumber = generateAccountNumber();
    const accountHolderName = await getInput("Enter account holder name: ");
    const accountType = await getInput("Enter account type (e.g., savings, checking): ");
    const balance = parseFloat(await getInput("Enter initial balance: "));

    let passcode;
    while (true) {
        passcode = await getInput("Enter a passcode (4 digits): ");
        if (passcode.length === 4 && !isNaN(passcode)) break;
        else console.log("Invalid passcode. Please enter a 4-digit passcode.");
    }

    accounts.push({
        bankName: selectedBank,
        accountNumber,
        accountHolderName,
        accountType,
        balance,
        passcode,
        failedAttempts: 0,
        lockTime: null
    });

    console.log("Account created successfully!");
    console.log(`Bank: ${selectedBank}`);
    console.log(`Account Holder: ${accountHolderName}`);
    console.log(`Account Number: ${accountNumber}`);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function handleFraudLockout(attempts, account) {
    const currentTime = Date.now();

    if (account.lockTime && currentTime - account.lockTime < 86400000) {
        const lockRemainingTime = (86400000 - (currentTime - account.lockTime)) / 1000;
        const hoursRemaining = Math.floor(lockRemainingTime / 3600);
        const minutesRemaining = Math.floor((lockRemainingTime % 3600) / 60);

        console.log(`\nYour account is blocked for 1 day. Please try again after ${hoursRemaining} hour(s) and ${minutesRemaining} minute(s).`);
        return true;
    }

    if (attempts === 5) {
        account.lockTime = currentTime;
        console.log("\nYou have entered the wrong passcode 5 times. Your account is blocked for 1 day.");
        return true;
    }

    return false;
}

async function deposit() {
    const accountNum = parseInt(await getInput("Enter account number: "));
    const account = accounts.find(acc => acc.accountNumber === accountNum);

    if (account) {
        let attempts = account.failedAttempts;
        if (await handleFraudLockout(attempts, account)) return;

        while (attempts < 5) {
            const passcode = await getInput("Enter passcode: ");
            if (passcode === account.passcode) {
                const amount = parseFloat(await getInput("Enter deposit amount: "));
                account.balance += amount;
                console.log(`Deposit successful. New balance is ${account.balance.toFixed(2)}`);
                account.failedAttempts = 0;
                return;
            } else {
                attempts++;
                account.failedAttempts = attempts;
                console.log(`Incorrect passcode. You have ${5 - attempts} attempts left.`);
                if (await handleFraudLockout(attempts, account)) return;
            }
        }
    } else {
        console.log("Account not found.");
    }
}

async function withdraw() {
    const accountNum = parseInt(await getInput("Enter account number: "));
    const account = accounts.find(acc => acc.accountNumber === accountNum);

    if (account) {
        let attempts = account.failedAttempts;
        if (await handleFraudLockout(attempts, account)) return;

        while (attempts < 5) {
            const passcode = await getInput("Enter passcode: ");
            if (passcode === account.passcode) {
                const amount = parseFloat(await getInput("Enter withdrawal amount: "));
                if (account.balance >= amount) {
                    account.balance -= amount;
                    console.log(`Withdrawal successful. New balance is ${account.balance.toFixed(2)}`);
                } else {
                    console.log("Insufficient funds.");
                }
                account.failedAttempts = 0;
                return;
            } else {
                attempts++;
                account.failedAttempts = attempts;
                console.log(`Incorrect passcode. You have ${5 - attempts} attempts left.`);
                if (await handleFraudLockout(attempts, account)) return;
            }
        }
    } else {
        console.log("Account not found.");
    }
}

async function checkAccount() {
    const accountNum = parseInt(await getInput("Enter account number to check: "));
    const account = accounts.find(acc => acc.accountNumber === accountNum);

    if (account) {
        let attempts = account.failedAttempts;
        if (await handleFraudLockout(attempts, account)) return;

        while (attempts < 5) {
            const passcode = await getInput("Enter passcode: ");
            if (passcode === account.passcode) {
                console.log("Account Details:");
                console.log(`Bank: ${account.bankName}`);
                console.log(`Account Number: ${account.accountNumber}`);
                console.log(`Account Holder: ${account.accountHolderName}`);
                console.log(`Account Type: ${account.accountType}`);
                console.log(`Balance: ${account.balance.toFixed(2)}`);
                account.failedAttempts = 0;
                return;
            } else {
                attempts++;
                account.failedAttempts = attempts;
                console.log(`Incorrect passcode. You have ${5 - attempts} attempts left.`);
                if (await handleFraudLockout(attempts, account)) return;
            }
        }
    } else {
        console.log("Account not found.");
    }
}

async function bankingSystem() {
    while (true) {
        console.log("\nBanking System");
        console.log("1. Create new account");
        console.log("2. Deposit funds");
        console.log("3. Withdraw funds");
        console.log("4. Check account details");
        console.log("5. Exit");

        const choice = parseInt(await getInput("Enter choice: "));
        if (choice === 5) {
            console.log("Exiting system. Thank you!");
            rl.close();
            break;
        }

        switch (choice) {
            case 1:
                await createAccount();
                break;
            case 2:
                await deposit();
                break;
            case 3:
                await withdraw();
                break;
            case 4:
                await checkAccount();
                break;
            default:
                console.log("Invalid choice. Please try again.");
        }
    }
}

bankingSystem();
