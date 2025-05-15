import { useState } from "react";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Edit, Trash2 } from "lucide-react";

const Users = () => {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy data - replace with actual API call
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Principal", status: "Active" },
    { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "Agent", status: "Inactive" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Customer", status: "Active" },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className={cn(
          "text-3xl font-bold",
          isDarkMode ? "text-white" : "text-gray-900"
        )}>
          User Management
        </h1>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
            isDarkMode ? "text-gray-400" : "text-gray-500"
          )} />
          <Input
            type="search"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "pl-10",
              isDarkMode 
                ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-400" 
                : "bg-white border-gray-200"
            )}
          />
        </div>
      </div>

      <div className={cn(
        "rounded-lg border",
        isDarkMode ? "border-gray-700" : "border-gray-200"
      )}>
        <Table>
          <TableHeader>
            <TableRow className={isDarkMode ? "border-gray-700" : "border-gray-200"}>
              <TableHead className={isDarkMode ? "text-gray-300" : ""}>Name</TableHead>
              <TableHead className={isDarkMode ? "text-gray-300" : ""}>Email</TableHead>
              <TableHead className={isDarkMode ? "text-gray-300" : ""}>Role</TableHead>
              <TableHead className={isDarkMode ? "text-gray-300" : ""}>Status</TableHead>
              <TableHead className={isDarkMode ? "text-gray-300" : ""}>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className={isDarkMode ? "border-gray-700" : "border-gray-200"}>
                <TableCell className={isDarkMode ? "text-white" : ""}>{user.name}</TableCell>
                <TableCell className={isDarkMode ? "text-white" : ""}>{user.email}</TableCell>
                <TableCell className={isDarkMode ? "text-white" : ""}>{user.role}</TableCell>
                <TableCell>
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    user.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  )}>
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Users; 