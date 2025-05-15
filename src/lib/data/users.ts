export interface User {
  id: string;
  email: string;
  password: string; // In real app, this would be hashed
  role: 'admin' | 'principal' | 'agent' | 'customer';
  name: string;
  avatar?: string;
  companyName?: string;
  phone?: string;
  address?: string;
}

export const users: User[] = [
  {
    id: "admin-1",
    email: "admin@slsb2b.com",
    password: "admin123",
    role: "admin",
    name: "John Admin",
    avatar: "/avatars/admin.jpg"
  },
  {
    id: "principal-1",
    email: "principal@company.com",
    password: "principal123",
    role: "principal",
    name: "Sarah Principal",
    companyName: "Tech Solutions Inc",
    phone: "+62811234567",
    address: "Jakarta Business District",
    avatar: "/avatars/principal.jpg"
  },
  {
    id: "agent-1",
    email: "agent@company.com",
    password: "agent123",
    role: "agent",
    name: "Mike Agent",
    companyName: "Tech Solutions Inc",
    phone: "+62821234567",
    address: "Surabaya Sales Office",
    avatar: "/avatars/agent.jpg"
  },
  {
    id: "customer-1",
    email: "customer@email.com",
    password: "customer123",
    role: "customer",
    name: "David Customer",
    companyName: "Retail Store Ltd",
    phone: "+62831234567",
    address: "Bandung Shopping Center",
    avatar: "/avatars/customer.jpg"
  }
]; 