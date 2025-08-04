import { ResellerCommission, AgentReferralFee, Payout } from './orders';

// Sample commission data
export const resellerCommissions: ResellerCommission[] = [
  {
    commissionId: "commission-001",
    orderItemId: "item-001",
    resellerId: "reseller-001",
    commissionAmount: 1650000, // 10% dari subtotal
    commissionPercentage: 10,
    calculatedAt: "2024-01-15T11:30:00Z",
    payoutStatus: "pending"
  },
  {
    commissionId: "commission-002",
    orderItemId: "item-002",
    resellerId: "reseller-001",
    commissionAmount: 850000, // 10% dari subtotal
    commissionPercentage: 10,
    calculatedAt: "2024-01-15T11:30:00Z",
    payoutStatus: "pending"
  },
  {
    commissionId: "commission-003",
    orderItemId: "item-003",
    resellerId: "reseller-001",
    commissionAmount: 200000, // 10% dari subtotal
    commissionPercentage: 10,
    calculatedAt: "2024-01-20T15:30:00Z",
    payoutStatus: "pending"
  },
  {
    commissionId: "commission-004",
    orderItemId: "item-004",
    resellerId: "reseller-001",
    commissionAmount: 260000, // 10% dari subtotal
    commissionPercentage: 10,
    calculatedAt: "2024-01-20T15:30:00Z",
    payoutStatus: "pending"
  },
  {
    commissionId: "commission-005",
    orderItemId: "item-005",
    resellerId: "reseller-001",
    commissionAmount: 1650000, // 10% dari subtotal
    commissionPercentage: 10,
    calculatedAt: "2024-01-05T10:30:00Z",
    payoutStatus: "paid"
  },
  {
    commissionId: "commission-006",
    orderItemId: "item-006",
    resellerId: "reseller-001",
    commissionAmount: 2550000, // 10% dari subtotal
    commissionPercentage: 10,
    calculatedAt: "2024-01-22T16:30:00Z",
    payoutStatus: "pending"
  }
];

// Sample agent referral fees
export const agentReferralFees: AgentReferralFee[] = [
  {
    referralFeeId: "referral-fee-001",
    resellerCommissionId: "commission-001",
    agentId: "agent-001",
    feeAmount: 165000, // 10% dari commission
    feePercentage: 10,
    calculatedAt: "2024-01-15T11:35:00Z",
    payoutStatus: "pending"
  },
  {
    referralFeeId: "referral-fee-002",
    resellerCommissionId: "commission-002",
    agentId: "agent-001",
    feeAmount: 85000, // 10% dari commission
    feePercentage: 10,
    calculatedAt: "2024-01-15T11:35:00Z",
    payoutStatus: "pending"
  },
  {
    referralFeeId: "referral-fee-003",
    resellerCommissionId: "commission-003",
    agentId: "agent-001",
    feeAmount: 20000, // 10% dari commission
    feePercentage: 10,
    calculatedAt: "2024-01-20T15:35:00Z",
    payoutStatus: "pending"
  },
  {
    referralFeeId: "referral-fee-004",
    resellerCommissionId: "commission-004",
    agentId: "agent-001",
    feeAmount: 26000, // 10% dari commission
    feePercentage: 10,
    calculatedAt: "2024-01-20T15:35:00Z",
    payoutStatus: "pending"
  },
  {
    referralFeeId: "referral-fee-005",
    resellerCommissionId: "commission-005",
    agentId: "agent-001",
    feeAmount: 165000, // 10% dari commission
    feePercentage: 10,
    calculatedAt: "2024-01-05T10:35:00Z",
    payoutStatus: "paid"
  },
  {
    referralFeeId: "referral-fee-006",
    resellerCommissionId: "commission-006",
    agentId: "agent-001",
    feeAmount: 255000, // 10% dari commission
    feePercentage: 10,
    calculatedAt: "2024-01-22T16:35:00Z",
    payoutStatus: "pending"
  }
];

// Sample payouts
export const payouts: Payout[] = [
  {
    payoutId: "payout-001",
    recipientUserId: "user-reseller-001",
    totalAmount: 1650000,
    payoutDate: "2024-01-25T10:00:00Z",
    bankAccountInfoJson: {
      accountNumber: "1234567890",
      accountName: "Rina Reseller",
      bankName: "Bank Central Asia",
      branchCode: "BCA001"
    },
    status: "processed"
  },
  {
    payoutId: "payout-002",
    recipientUserId: "user-agent-001",
    totalAmount: 165000,
    payoutDate: "2024-01-25T10:00:00Z",
    bankAccountInfoJson: {
      accountNumber: "0987654321",
      accountName: "Mike Agent",
      bankName: "Bank Mandiri",
      branchCode: "MDR001"
    },
    status: "processed"
  },
  {
    payoutId: "payout-003",
    recipientUserId: "user-reseller-001",
    totalAmount: 2700000,
    payoutDate: "2024-01-30T10:00:00Z",
    bankAccountInfoJson: {
      accountNumber: "1234567890",
      accountName: "Rina Reseller",
      bankName: "Bank Central Asia",
      branchCode: "BCA001"
    },
    status: "pending"
  },
  {
    payoutId: "payout-004",
    recipientUserId: "user-agent-001",
    totalAmount: 270000,
    payoutDate: "2024-01-30T10:00:00Z",
    bankAccountInfoJson: {
      accountNumber: "0987654321",
      accountName: "Mike Agent",
      bankName: "Bank Mandiri",
      branchCode: "MDR001"
    },
    status: "pending"
  }
];

// Helper functions
export const getCommissionsByReseller = (resellerId: string) => {
  return resellerCommissions.filter(commission => commission.resellerId === resellerId);
};

export const getCommissionsByOrderItem = (orderItemId: string) => {
  return resellerCommissions.filter(commission => commission.orderItemId === orderItemId);
};

export const getReferralFeesByAgent = (agentId: string) => {
  return agentReferralFees.filter(fee => fee.agentId === agentId);
};

export const getReferralFeesByCommission = (commissionId: string) => {
  return agentReferralFees.filter(fee => fee.resellerCommissionId === commissionId);
};

export const getPayoutsByUser = (userId: string) => {
  return payouts.filter(payout => payout.recipientUserId === userId);
};

export const getPendingCommissions = () => {
  return resellerCommissions.filter(commission => commission.payoutStatus === "pending");
};

export const getPaidCommissions = () => {
  return resellerCommissions.filter(commission => commission.payoutStatus === "paid");
};

export const getPendingReferralFees = () => {
  return agentReferralFees.filter(fee => fee.payoutStatus === "pending");
};

export const getPaidReferralFees = () => {
  return agentReferralFees.filter(fee => fee.payoutStatus === "paid");
};

export const getPendingPayouts = () => {
  return payouts.filter(payout => payout.status === "pending");
};

export const getProcessedPayouts = () => {
  return payouts.filter(payout => payout.status === "processed");
};

export const getFailedPayouts = () => {
  return payouts.filter(payout => payout.status === "failed");
};

// Commission calculation functions
export const calculateResellerCommission = (orderItemSubtotal: number, commissionPercentage: number = 10) => {
  return (orderItemSubtotal * commissionPercentage) / 100;
};

export const calculateAgentReferralFee = (commissionAmount: number, feePercentage: number = 10) => {
  return (commissionAmount * feePercentage) / 100;
};

// Total calculations
export const getTotalCommissionsByReseller = (resellerId: string) => {
  const commissions = getCommissionsByReseller(resellerId);
  return commissions.reduce((total, commission) => total + commission.commissionAmount, 0);
};

export const getTotalReferralFeesByAgent = (agentId: string) => {
  const fees = getReferralFeesByAgent(agentId);
  return fees.reduce((total, fee) => total + fee.feeAmount, 0);
};

export const getTotalPendingCommissionsByReseller = (resellerId: string) => {
  const commissions = getCommissionsByReseller(resellerId);
  const pendingCommissions = commissions.filter(commission => commission.payoutStatus === "pending");
  return pendingCommissions.reduce((total, commission) => total + commission.commissionAmount, 0);
};

export const getTotalPendingReferralFeesByAgent = (agentId: string) => {
  const fees = getReferralFeesByAgent(agentId);
  const pendingFees = fees.filter(fee => fee.payoutStatus === "pending");
  return pendingFees.reduce((total, fee) => total + fee.feeAmount, 0);
}; 