# README for Banking System CLI

## Project Name: **Banking System CLI**

## Description:
This project is a Command-Line Interface (CLI) banking application built using **Node.js**. The application allows users to perform basic banking operations such as creating an account, depositing funds, withdrawing funds, and checking account details. It also includes features like passcode protection, account lockout after multiple failed attempts, and fraud prevention mechanisms.

---

## Features:

1. **Account Creation**:
   - Users can create new accounts by selecting a bank, entering personal and account details.
   - The system generates a unique 10-digit account number.

2. **Deposit Funds**:
   - Users can deposit funds to their account after providing the correct passcode.
   - Ensures account security with fraud lockout mechanisms.

3. **Withdraw Funds**:
   - Users can withdraw funds if their balance is sufficient and after entering the correct passcode.
   - Prevents overdrawals.

4. **Check Account Details**:
   - Users can view account information, including balance, after entering the correct passcode.

5. **Fraud Prevention**:
   - After 5 incorrect passcode attempts, the account is locked for 24 hours.
   - Progressive warnings are issued for incorrect passcode attempts.

---

## Prerequisites:

- **Node.js** (Version 14+ recommended)

---

## Installation:


1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the application:

   ```bash
   node bankingSystem.js
   ```

---

## Usage:

1. Start the application using the provided command.
2. Follow the prompts in the menu to:
   - Create an account.
   - Deposit or withdraw funds.
   - Check account details.
3. Enter the required information as prompted.

### Example Menu:

```text
Banking System

1. Create new account
2. Deposit funds
3. Withdraw funds
4. Check account details
5. Exit

Enter choice:
```

---

## Files:

- `bankingSystem.js`: Main script for the banking system application.

---

## Security Features:

1. **Passcode Protection**:
   - Each account is protected by a unique 4-digit passcode.

2. **Account Lockout**:
   - 24-hour lockout after 5 incorrect passcode attempts.

3. **Unique Account Numbers**:
   - Ensures no duplicate account numbers exist.

---

## Limitations:

- This is a CLI-based application and does not have a graphical user interface.
- Data is stored in memory (not persisted across sessions).
- Does not support multi-user access simultaneously.

---

## Future Improvements:

1. Integration with a database for persistent storage.
2. Addition of more banking features like money transfers and transaction history.
3. Improved error handling and input validation.
4. A web-based or mobile application interface.

---

## License:

This project is licensed under the MIT License.

---

## Author:

**Shuvam Ghosh**
