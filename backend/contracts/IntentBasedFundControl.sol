// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract IntentBasedFundControl {

    /* ─────────────────────────────────────────────
       ROLES (3 LEVEL MODEL)
       CENTRAL → INTERMEDIARY (SCHEME) → BENEFICIARY
    ───────────────────────────────────────────── */

    address public centralAuthority;

    enum Role {
        NONE,
        CENTRAL,
        INTERMEDIARY,
        BENEFICIARY
    }

    mapping(address => Role) public roles;

    modifier onlyCentral() {
        require(msg.sender == centralAuthority, "Not central authority");
        _;
    }

    modifier onlyRole(Role r) {
        require(roles[msg.sender] == r, "Unauthorized role");
        _;
    }

    constructor(address _centralGov) {
        centralAuthority = _centralGov;
        roles[_centralGov] = Role.CENTRAL;
    }

    function assignRole(address user, Role role) external onlyCentral {
        roles[user] = role;
    }

    /* ─────────────────────────────────────────────
       INTENT STRUCTURE
    ───────────────────────────────────────────── */

    struct Intent {
        uint256 id;
        uint256 parentId;
        string purpose;
        uint256 maxAmount;     // INR smallest unit (paise)
        uint256 usedAmount;
        uint256 validUntil;
        address owner;
        bool exists;
    }

    uint256 public intentCounter;
    mapping(uint256 => Intent) public intents;

    event IntentCreated(
        uint256 intentId,
        uint256 parentId,
        string purpose,
        uint256 maxAmount,
        address owner
    );

    function createIntent(
        uint256 parentId,
        string calldata purpose,
        uint256 maxAmount,
        uint256 validUntil
    ) external {

        if (parentId == 0) {
            require(roles[msg.sender] == Role.CENTRAL, "Only central can create root");
        } else {
            Intent storage parent = intents[parentId];
            require(parent.exists, "Parent not found");
            require(parent.owner == msg.sender, "Not parent owner");
            require(maxAmount <= parent.maxAmount - parent.usedAmount, "Exceeds parent limit");
            require(validUntil <= parent.validUntil, "Invalid validity");
        }

        intentCounter++;

        intents[intentCounter] = Intent({
            id: intentCounter,
            parentId: parentId,
            purpose: purpose,
            maxAmount: maxAmount,
            usedAmount: 0,
            validUntil: validUntil,
            owner: msg.sender,
            exists: true
        });

        emit IntentCreated(intentCounter, parentId, purpose, maxAmount, msg.sender);
    }

    /* ─────────────────────────────────────────────
       FIAT DISBURSEMENT LOGGING (NEW)
    ───────────────────────────────────────────── */

    struct FiatDisbursement {
        uint256 id;
        uint256 intentId;
        uint256 amount;           // INR (paise)
        string currency;          // "INR"
        string bankReference;     // UTR / NEFT / RTGS ID
        address loggedBy;
        uint256 timestamp;
    }

    uint256 public fiatCounter;
    mapping(uint256 => FiatDisbursement) public fiatLogs;

    event FiatDisbursed(
        uint256 fiatId,
        uint256 intentId,
        uint256 amount,
        string currency,
        string bankReference,
        address loggedBy
    );

    function logFiatDisbursement(
        uint256 intentId,
        uint256 amount,
        string calldata bankReference
    ) external {

        Intent storage intent = intents[intentId];

        require(intent.exists, "Invalid intent");
        require(
            msg.sender == centralAuthority || msg.sender == intent.owner,
            "Not authorized"
        );

        require(intent.usedAmount + amount <= intent.maxAmount, "Exceeds intent limit");

        intent.usedAmount += amount;

        fiatCounter++;

        fiatLogs[fiatCounter] = FiatDisbursement({
            id: fiatCounter,
            intentId: intentId,
            amount: amount,
            currency: "INR",
            bankReference: bankReference,
            loggedBy: msg.sender,
            timestamp: block.timestamp
        });

        emit FiatDisbursed(
            fiatCounter,
            intentId,
            amount,
            "INR",
            bankReference,
            msg.sender
        );
    }

    /* ─────────────────────────────────────────────
       READ HELPERS
    ───────────────────────────────────────────── */

    function getIntent(uint256 intentId) external view returns (Intent memory) {
        return intents[intentId];
    }

    function getFiatLog(uint256 fiatId) external view returns (FiatDisbursement memory) {
        return fiatLogs[fiatId];
    }
}
