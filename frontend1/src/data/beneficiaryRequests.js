const KEY = "BENEFICIARY_REQUESTS";

/* 🔹 GET ALL REQUESTS */
export function getBeneficiaryRequests() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

/* 🔹 ADD NEW REQUEST (from Beneficiary page) */
export function addBeneficiaryRequest(request) {
  const existing = getBeneficiaryRequests();

  const newRequest = {
    ...request,
    status: "PENDING", // PENDING → APPROVED → DISBURSED
    timestamp: Date.now()
  };

  localStorage.setItem(
    KEY,
    JSON.stringify([...existing, newRequest])
  );
}

/* 🔹 APPROVE REQUEST (Scheme validates beneficiary) */
export function approveBeneficiary(index) {
  const data = getBeneficiaryRequests();
  data[index].status = "APPROVED";

  localStorage.setItem(KEY, JSON.stringify(data));
}

/* 🔹 REJECT REQUEST (Scheme rejects beneficiary) */
export function rejectBeneficiary(index) {
  const data = getBeneficiaryRequests();
  data.splice(index, 1); // completely remove

  localStorage.setItem(KEY, JSON.stringify(data));
}

/* 🔹 MARK AS DISBURSED (Allocate funds) */
export function markDisbursed(index) {
  const data = getBeneficiaryRequests();
  data[index].status = "DISBURSED";

  localStorage.setItem(KEY, JSON.stringify(data));
}
