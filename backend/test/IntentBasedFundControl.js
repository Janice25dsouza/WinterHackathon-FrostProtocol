const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("IntentBasedFundControl", function () {

  let Contract;
  let fundControl;
  let central, intermediary, beneficiary, outsider;

  beforeEach(async function () {
    [central, intermediary, beneficiary, outsider] = await ethers.getSigners();

    Contract = await ethers.getContractFactory("IntentBasedFundControl");
    fundControl = await Contract.deploy(central.address);
    await fundControl.waitForDeployment();
  });

  it("Should set central authority correctly", async function () {
    expect(await fundControl.centralAuthority()).to.equal(central.address);
  });

  it("Central should assign roles", async function () {
    await fundControl.assignRole(intermediary.address, 2); // INTERMEDIARY
    await fundControl.assignRole(beneficiary.address, 3);  // BENEFICIARY

    expect(await fundControl.roles(intermediary.address)).to.equal(2);
    expect(await fundControl.roles(beneficiary.address)).to.equal(3);
  });

  it("Only central can create root intent", async function () {
    await expect(
      fundControl.connect(intermediary).createIntent(
        0,
        "Invalid Root",
        100000,
        Math.floor(Date.now() / 1000) + 10000
      )
    ).to.be.revertedWith("Only central can create root");
  });

  it("Central can create root intent", async function () {
    await fundControl.createIntent(
      0,
      "Healthcare Budget",
      1_000_000,
      Math.floor(Date.now() / 1000) + 10000
    );

    const intent = await fundControl.getIntent(1);
    expect(intent.maxAmount).to.equal(1_000_000);
    expect(intent.owner).to.equal(central.address);
  });

  it("Intermediary can create child intent under its own intent", async function () {
    await fundControl.assignRole(intermediary.address, 2);

    await fundControl.createIntent(
      0,
      "Education Budget",
      2_000_000,
      Math.floor(Date.now() / 1000) + 20000
    );

    await fundControl.connect(central).assignRole(intermediary.address, 2);

    await fundControl.connect(central).createIntent(
      1,
      "Scholarship Scheme",
      500_000,
      Math.floor(Date.now() / 1000) + 10000
    );

    const childIntent = await fundControl.getIntent(2);
    expect(childIntent.parentId).to.equal(1);
  });

  it("Should log fiat disbursement correctly", async function () {
    await fundControl.assignRole(intermediary.address, 2);

    await fundControl.createIntent(
      0,
      "Food Scheme",
      1_000_000,
      Math.floor(Date.now() / 1000) + 10000
    );

    await fundControl.logFiatDisbursement(
      1,
      100_000,
      "UTR123456"
    );

    const log = await fundControl.getFiatLog(1);
    expect(log.amount).to.equal(100_000);
    expect(log.bankReference).to.equal("UTR123456");
  });

  it("Should reject disbursement exceeding intent limit", async function () {
    await fundControl.createIntent(
      0,
      "Housing Scheme",
      100_000,
      Math.floor(Date.now() / 1000) + 10000
    );

    await expect(
      fundControl.logFiatDisbursement(
        1,
        200_000,
        "UTR-OVERFLOW"
      )
    ).to.be.revertedWith("Exceeds intent limit");
  });

});
