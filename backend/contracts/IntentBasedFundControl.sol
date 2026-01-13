// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FundFlowDemo {

    /* ─────────────────────────────
       BALANCES (ON-CHAIN STORAGE)
    ───────────────────────────── */

    uint256 public centralBalance = 100000;

    uint256 public scheme1Balance;
    uint256 public scheme2Balance;

    uint256 public ben1Balance;
    uint256 public ben2Balance;
    uint256 public ben3Balance;

    /* ─────────────────────────────
       EVENTS
    ───────────────────────────── */

    event CentralToScheme(string scheme, uint256 amount);
    event SchemeToBeneficiary(string scheme, string beneficiary, uint256 amount);

    /* ─────────────────────────────
       CENTRAL → SCHEME TRANSFER
    ───────────────────────────── */

    function approveSchemeFund(
        string calldata scheme,
        uint256 amount
    ) external {
        require(centralBalance >= amount, "Central: insufficient funds");

        centralBalance -= amount;

        if (keccak256(bytes(scheme)) == keccak256(bytes("scheme1"))) {
            scheme1Balance += amount;
        } 
        else if (keccak256(bytes(scheme)) == keccak256(bytes("scheme2"))) {
            scheme2Balance += amount;
        } 
        else {
            revert("Invalid scheme");
        }

        emit CentralToScheme(scheme, amount);
    }

    /* ─────────────────────────────
       SCHEME → BENEFICIARY TRANSFER
    ───────────────────────────── */

    function approveBeneficiaryFund(
        string calldata scheme,
        string calldata beneficiary,
        uint256 amount
    ) external {

        if (keccak256(bytes(scheme)) == keccak256(bytes("scheme1"))) {
            require(scheme1Balance >= amount, "Scheme1: insufficient funds");
            scheme1Balance -= amount;
        }
        else if (keccak256(bytes(scheme)) == keccak256(bytes("scheme2"))) {
            require(scheme2Balance >= amount, "Scheme2: insufficient funds");
            scheme2Balance -= amount;
        }
        else {
            revert("Invalid scheme");
        }

        if (keccak256(bytes(beneficiary)) == keccak256(bytes("ben1"))) {
            ben1Balance += amount;
        }
        else if (keccak256(bytes(beneficiary)) == keccak256(bytes("ben2"))) {
            ben2Balance += amount;
        }
        else if (keccak256(bytes(beneficiary)) == keccak256(bytes("ben3"))) {
            ben3Balance += amount;
        }
        else {
            revert("Invalid beneficiary");
        }

        emit SchemeToBeneficiary(scheme, beneficiary, amount);
    }

    /* ─────────────────────────────
       READ HELPERS
    ───────────────────────────── */

    function getBalances()
        external
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        return (
            centralBalance,
            scheme1Balance,
            scheme2Balance,
            ben1Balance,
            ben2Balance,
            ben3Balance
        );
    }
}
