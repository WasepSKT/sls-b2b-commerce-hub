// Base User Interface sesuai ERD
export interface User {
  userId: string; // UUID/BIGINT
  username: string; // VARCHAR, UNIQUE
  email: string; // VARCHAR, UNIQUE
  passwordHash: string; // VARCHAR
  role: 'customer' | 'reseller' | 'agent' | 'principal' | 'distributor' | 'admin';
  isVerified: boolean; // BOOLEAN, default: false
  createdAt: string; // TIMESTAMP
  updatedAt: string; // TIMESTAMP
}

// User Profile Interface sesuai ERD
export interface UserProfile {
  profileId: string; // UUID/BIGINT
  userId: string; // FK ke users, UNIQUE
  fullName: string; // VARCHAR
  phoneNumber: string; // VARCHAR
  addressJson: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }; // JSONB/TEXT
  principalId?: string; // FK ke principals, NULLABLE
  agentId?: string; // FK ke agents, NULLABLE
  resellerId?: string; // FK ke resellers, NULLABLE
}

// Principal Interface sesuai ERD
export interface Principal {
  principalId: string; // UUID/BIGINT
  userId: string; // FK ke users, UNIQUE
  companyName: string; // VARCHAR
  contactPerson: string; // VARCHAR
  status: 'active' | 'inactive'; // ENUM
}

// Distributor Interface sesuai ERD
export interface Distributor {
  distributorId: string; // UUID/BIGINT
  userId: string; // FK ke users, UNIQUE
  principalId: string; // FK ke principals
  companyName: string; // VARCHAR
  address: string; // TEXT
  status: 'active' | 'pending_approval'; // ENUM
}

// Agent Interface sesuai ERD
export interface Agent {
  agentId: string; // UUID/BIGINT
  userId: string; // FK ke users, UNIQUE
  uplineAgentId?: string; // FK ke agents, NULLABLE
  level: number; // INTEGER, default: 1
  referralCode: string; // VARCHAR, UNIQUE
  status: 'active' | 'pending_approval'; // ENUM
}

// Reseller Interface sesuai ERD
export interface Reseller {
  resellerId: string; // UUID/BIGINT
  userId: string; // FK ke users, UNIQUE
  recruitedByAgentId?: string; // FK ke agents, NULLABLE
  status: 'active' | 'inactive'; // ENUM
}

// Sample data dengan struktur baru
export const users: User[] = [
  {
    userId: "user-admin-001",
    username: "admin",
    email: "admin@slsb2b.com",
    passwordHash: "hashed_password_here",
    role: "admin",
    isVerified: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    userId: "user-principal-001",
    username: "sarah_principal",
    email: "principal@company.com",
    passwordHash: "hashed_password_here",
    role: "principal",
    isVerified: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    userId: "user-agent-001",
    username: "mike_agent",
    email: "agent@company.com",
    passwordHash: "hashed_password_here",
    role: "agent",
    isVerified: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    userId: "user-customer-001",
    username: "david_customer",
    email: "customer@email.com",
    passwordHash: "hashed_password_here",
    role: "customer",
    isVerified: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    userId: "user-distributor-001",
    username: "budi_distributor",
    email: "distributor@slsb2b.com",
    passwordHash: "hashed_password_here",
    role: "distributor",
    isVerified: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    userId: "user-reseller-001",
    username: "rina_reseller",
    email: "reseller@slsb2b.com",
    passwordHash: "hashed_password_here",
    role: "reseller",
    isVerified: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }
];

export const userProfiles: UserProfile[] = [
  {
    profileId: "profile-admin-001",
    userId: "user-admin-001",
    fullName: "John Admin",
    phoneNumber: "+62811234567",
    addressJson: {
      street: "Admin Office",
      city: "Jakarta",
      state: "DKI Jakarta",
      zipCode: "10110",
      country: "Indonesia"
    }
  },
  {
    profileId: "profile-principal-001",
    userId: "user-principal-001",
    fullName: "Sarah Principal",
    phoneNumber: "+62811234567",
    addressJson: {
      street: "Jakarta Business District",
      city: "Jakarta",
      state: "DKI Jakarta",
      zipCode: "10110",
      country: "Indonesia"
    },
    principalId: "principal-001"
  },
  {
    profileId: "profile-agent-001",
    userId: "user-agent-001",
    fullName: "Mike Agent",
    phoneNumber: "+62821234567",
    addressJson: {
      street: "Surabaya Sales Office",
      city: "Surabaya",
      state: "Jawa Timur",
      zipCode: "60111",
      country: "Indonesia"
    },
    agentId: "agent-001"
  },
  {
    profileId: "profile-customer-001",
    userId: "user-customer-001",
    fullName: "David Customer",
    phoneNumber: "+62831234567",
    addressJson: {
      street: "Bandung Shopping Center",
      city: "Bandung",
      state: "Jawa Barat",
      zipCode: "40111",
      country: "Indonesia"
    }
  },
  {
    profileId: "profile-distributor-001",
    userId: "user-distributor-001",
    fullName: "Budi Distributor",
    phoneNumber: "+6285212345678",
    addressJson: {
      street: "Gudang Pusat, Jakarta",
      city: "Jakarta",
      state: "DKI Jakarta",
      zipCode: "10110",
      country: "Indonesia"
    }
  },
  {
    profileId: "profile-reseller-001",
    userId: "user-reseller-001",
    fullName: "Rina Reseller",
    phoneNumber: "+6287712345678",
    addressJson: {
      street: "Toko Rina, Bandung",
      city: "Bandung",
      state: "Jawa Barat",
      zipCode: "40111",
      country: "Indonesia"
    },
    resellerId: "reseller-001"
  }
];

export const principals: Principal[] = [
  {
    principalId: "principal-001",
    userId: "user-principal-001",
    companyName: "Tech Solutions Inc",
    contactPerson: "Sarah Principal",
    status: "active"
  }
];

export const distributors: Distributor[] = [
  {
    distributorId: "distributor-001",
    userId: "user-distributor-001",
    principalId: "principal-001",
    companyName: "Maju Mundur Sejahtera",
    address: "Gudang Pusat, Jakarta",
    status: "active"
  }
];

export const agents: Agent[] = [
  {
    agentId: "agent-001",
    userId: "user-agent-001",
    uplineAgentId: undefined,
    level: 1,
    referralCode: "AGENT001",
    status: "active"
  }
];

export const resellers: Reseller[] = [
  {
    resellerId: "reseller-001",
    userId: "user-reseller-001",
    recruitedByAgentId: "agent-001",
    status: "active"
  }
];

// Helper functions
export const getUserById = (userId: string) => {
  return users.find(user => user.userId === userId);
};

export const getUserProfileByUserId = (userId: string) => {
  return userProfiles.find(profile => profile.userId === userId);
};

export const getPrincipalByUserId = (userId: string) => {
  return principals.find(principal => principal.userId === userId);
};

export const getDistributorByUserId = (userId: string) => {
  return distributors.find(distributor => distributor.userId === userId);
};

export const getAgentByUserId = (userId: string) => {
  return agents.find(agent => agent.userId === userId);
};

export const getResellerByUserId = (userId: string) => {
  return resellers.find(reseller => reseller.userId === userId);
};

export const getCompleteUserData = (userId: string) => {
  const user = getUserById(userId);
  const profile = getUserProfileByUserId(userId);
  const principal = getPrincipalByUserId(userId);
  const distributor = getDistributorByUserId(userId);
  const agent = getAgentByUserId(userId);
  const reseller = getResellerByUserId(userId);

  return {
    user,
    profile,
    principal,
    distributor,
    agent,
    reseller
  };
};