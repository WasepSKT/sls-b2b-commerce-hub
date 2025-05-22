import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Search, 
  Filter, 
  Package, 
  Plus, 
  Edit, 
  Trash, 
  Image as ImageIcon, 
  X,
  ChevronDown,
  Save,
  AlertTriangle
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Import the modal components
import AddProductModal from "@/components/modals/AddProductModal";
import EditProductModal from "@/components/modals/EditProductModal";
import DeleteProductModal from "@/components/modals/DeleteProductModal";

const PrincipalProducts = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { isDarkMode } = useTheme();
  const { toast } = useToast();
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    details: "",
    status: "Active",
  });
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    sku: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    details: "",
    status: "",
  });

  const categories = [
    "Elektronik",
    "Fashion",
    "Kesehatan",
    "Rumah Tangga",
    "Makanan & Minuman",
    "Otomotif",
    "Olahraga",
    "Lainnya"
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };
  
  const handleAddProduct = (product: any, file: File | null) => {
    // Validate form
    if (!product.name || !product.sku || !product.price || !product.category || !product.stock) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Mohon lengkapi data produk yang diperlukan",
      });
      return;
    }

    // In a real app, this would make an API call to add the product
    toast({
      title: "Produk ditambahkan",
      description: "Produk baru berhasil ditambahkan",
    });
    
    // Close modal
    setIsAddProductOpen(false);
  };

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Produk Premium 1",
      sku: "SKU-001",
      price: "Rp 150,000",
      category: "Elektronik",
      stock: 25,
      status: "Active"
    },
    {
      id: 2,
      name: "Produk Premium 2",
      sku: "SKU-002",
      price: "Rp 225,000",
      category: "Fashion",
      stock: 15,
      status: "Active"
    },
    {
      id: 3,
      name: "Produk Premium 3",
      sku: "SKU-003",
      price: "Rp 175,000",
      category: "Kesehatan",
      stock: 30,
      status: "Active"
    },
    {
      id: 4,
      name: "Produk Premium 4",
      sku: "SKU-004",
      price: "Rp 320,000",
      category: "Elektronik",
      stock: 10,
      status: "Out of Stock"
    },
    {
      id: 5,
      name: "Produk Premium 5",
      sku: "SKU-005",
      price: "Rp 180,000",
      category: "Rumah Tangga",
      stock: 22,
      status: "Active"
    },
    {
      id: 6,
      name: "Produk Premium 6",
      sku: "SKU-006",
      price: "Rp 250,000",
      category: "Fashion",
      stock: 0,
      status: "Out of Stock"
    },
    {
      id: 7,
      name: "Produk Premium 7",
      sku: "SKU-007",
      price: "Rp 300,000",
      category: "Elektronik",
      stock: 18,
      status: "Active"
    }
  ];

  const deleteProduct = (productId: number) => {
    // In a real app, this would make an API call to delete the product
    toast({
      title: "Produk dihapus",
      description: `Produk #${productId} telah dihapus`,
    });
    
    // Close the dialog and reset current product
    setIsDeleteDialogOpen(false);
    setCurrentProduct(null);
  };

  const productStats = [
    { title: "Total Produk", value: "152", icon: Package, iconClass: "text-primary" },
    { title: "Produk Aktif", value: "134", icon: Package, iconClass: "text-green-500" },
    { title: "Stok Menipis", value: "8", icon: Package, iconClass: "text-amber-500" },
    { title: "Habis Stok", value: "10", icon: Package, iconClass: "text-red-500" },
  ];

  // Filter states
  const [activeFilters, setActiveFilters] = useState({
    category: "",
    status: "",
    stock: ""
  });
  
  const applyFilter = (filterType: string, value: string) => {
    setActiveFilters({
      ...activeFilters,
      [filterType]: value
    });
    
    toast({
      title: "Filter diterapkan",
      description: `Filter ${filterType}: ${value}`,
    });
  };

  const clearFilters = () => {
    setActiveFilters({
      category: "",
      status: "",
      stock: ""
    });
    
    toast({
      title: "Filter dihapus",
      description: "Semua filter telah dihapus",
    });
  };

  // Apply filters to products 
  // In a real app, this might be done server-side
  const filteredProducts = products.filter(product => {
    let matches = true;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      matches = matches && (
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    if (activeFilters.category) {
      matches = matches && product.category === activeFilters.category;
    }
    
    if (activeFilters.status) {
      matches = matches && product.status === activeFilters.status;
    }
    
    if (activeFilters.stock) {
      switch (activeFilters.stock) {
        case "Tersedia":
          matches = matches && product.stock > 0;
          break;
        case "Habis":
          matches = matches && product.stock === 0;
          break;
        case "Menipis":
          matches = matches && product.stock > 0 && product.stock < 10;
          break;
      }
    }
    
    return matches;
  });

  // Function to handle opening the edit modal
  const handleOpenEditModal = (product: any) => {
    setCurrentProduct(product);
    setIsEditProductOpen(true);
  };

  // Function to handle edit product form submission
  const handleEditProduct = (product: any, file: File | null) => {
    // Validate form
    if (!product.name || !product.sku || !product.price || !product.category) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Mohon lengkapi data produk yang diperlukan",
      });
      return;
    }

    // In a real app, this would make an API call to update the product
    toast({
      title: "Produk diperbarui",
      description: `Produk ${product.name} berhasil diperbarui`,
    });
    
    // Reset form and close modal
    setIsEditProductOpen(false);
    setCurrentProduct(null);
  };

  // Function to open delete confirmation dialog
  const handleOpenDeleteDialog = (product: any) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };

  // Function to navigate to product detail page
  const navigateToProductDetail = (productId: number) => {
    console.log(`Navigating to product detail with ID: ${productId}`);
    const url = `/dashboard/principal/products/${productId}`;
    console.log(`Navigation URL: ${url}`);
    navigate(url);
  };

  return (
    <DashboardLayout role="principal" pageTitle="Manajemen Produk">
      <div className="space-y-6">
        {/* Add Product Modal */}
        <AddProductModal 
          isOpen={isAddProductOpen}
          onClose={() => setIsAddProductOpen(false)}
          onAddProduct={handleAddProduct}
          categories={categories}
        />

        {/* Edit Product Modal */}
        <EditProductModal 
          isOpen={isEditProductOpen}
          onClose={() => setIsEditProductOpen(false)}
          onEditProduct={handleEditProduct}
          categories={categories}
          currentProduct={currentProduct}
        />

        {/* Delete Confirmation Modal */}
        <DeleteProductModal 
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onDeleteProduct={deleteProduct}
          product={currentProduct}
        />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h2 className={cn(
              "text-2xl font-semibold tracking-tight",
              isDarkMode ? "text-gray-50" : "text-slate-900"
            )}>Produk</h2>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )}>
              Kelola produk dan inventaris Anda
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "pl-10 pr-4 transition-colors duration-300",
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                    : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                )}
              />
            </div>
            <Button 
              className={cn(
                "transition-colors duration-300",
                isDarkMode 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-blue-600 text-white hover:bg-blue-700"
              )}
              onClick={() => setIsAddProductOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Tambah Produk
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {productStats.map((stat, index) => (
            <Card key={index} className={cn(
              "transition-colors duration-300",
              isDarkMode 
                ? "bg-transparent backdrop-blur-sm border-blue-900/50" 
                : "bg-white border-gray-200 hover:bg-gray-50"
            )}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={cn(
                      "text-sm font-medium",
                      isDarkMode ? "text-gray-300" : "text-gray-500"
                    )}>{stat.title}</p>
                    <h3 className={cn(
                      "text-2xl font-bold tracking-tight",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}>{stat.value}</h3>
                  </div>
                  <div className={cn(
                    "rounded-full p-2",
                    stat.iconClass,
                    isDarkMode ? "bg-transparent border border-blue-700/50" : "bg-gray-100"
                  )}>
                    <stat.icon className="h-6 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className={cn(
          "transition-colors duration-300",
          isDarkMode 
            ? "bg-transparent backdrop-blur-sm border-blue-900/50" 
            : "bg-white border-gray-200 hover:bg-gray-50"
        )}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className={cn(
                "transition-colors duration-300",
                isDarkMode ? "text-white" : "text-gray-900"
              )}>Daftar Produk</CardTitle>
              <CardDescription className={cn(
                "transition-colors duration-300",
                isDarkMode ? "text-gray-300" : "text-gray-500"
              )}>
                {Object.values(activeFilters).some(filter => filter !== "") 
                  ? "Menampilkan produk dengan filter aktif" 
                  : "Kelola semua produk Anda"}
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={cn(
                    "transition-colors duration-300",
                    isDarkMode 
                      ? "border-blue-700 text-blue-300 hover:bg-blue-900/30" 
                      : "border-gray-200 text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className={cn(
                  "w-56",
                  isDarkMode ? "bg-transparent backdrop-blur-sm border-blue-900/50 text-gray-100" : ""
                )}
              >
                <DropdownMenuLabel className={cn(
                  isDarkMode ? "text-blue-300" : ""
                )}>Filter Produk</DropdownMenuLabel>
                <DropdownMenuSeparator className={cn(
                  isDarkMode ? "bg-blue-900/50" : ""
                )} />
                <DropdownMenuGroup>
                  <DropdownMenuLabel className={cn(
                    "text-xs pt-0",
                    isDarkMode ? "text-blue-400" : "text-gray-500"
                  )}>Kategori</DropdownMenuLabel>
                  <DropdownMenuItem 
                    onClick={() => applyFilter("category", "")}
                    className={cn(
                      "cursor-pointer",
                      activeFilters.category === "" 
                        ? isDarkMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-50 text-blue-600"
                        : isDarkMode ? "text-gray-300 hover:bg-blue-900/20" : "hover:bg-gray-100"
                    )}
                  >
                    Semua Kategori
                  </DropdownMenuItem>
                  {categories.map((category) => (
                    <DropdownMenuItem 
                      key={category}
                      onClick={() => applyFilter("category", category)}
                      className={cn(
                        "cursor-pointer",
                        activeFilters.category === category 
                          ? isDarkMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-50 text-blue-600"
                          : isDarkMode ? "text-gray-300 hover:bg-blue-900/20" : "hover:bg-gray-100"
                      )}
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator className={cn(
                    isDarkMode ? "bg-blue-900/50" : ""
                  )} />
                  <DropdownMenuLabel className={cn(
                    "text-xs pt-0",
                    isDarkMode ? "text-blue-400" : "text-gray-500"
                  )}>Status</DropdownMenuLabel>
                  <DropdownMenuItem 
                    onClick={() => applyFilter("status", "")}
                    className={cn(
                      "cursor-pointer",
                      activeFilters.status === "" 
                        ? isDarkMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-50 text-blue-600"
                        : isDarkMode ? "text-gray-300 hover:bg-blue-900/20" : "hover:bg-gray-100"
                    )}
                  >
                    Semua Status
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => applyFilter("status", "Active")}
                    className={cn(
                      "cursor-pointer",
                      activeFilters.status === "Active" 
                        ? isDarkMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-50 text-blue-600"
                        : isDarkMode ? "text-gray-300 hover:bg-blue-900/20" : "hover:bg-gray-100"
                    )}
                  >
                    Aktif
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => applyFilter("status", "Out of Stock")}
                    className={cn(
                      "cursor-pointer",
                      activeFilters.status === "Out of Stock" 
                        ? isDarkMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-50 text-blue-600"
                        : isDarkMode ? "text-gray-300 hover:bg-blue-900/20" : "hover:bg-gray-100"
                    )}
                  >
                    Habis Stok
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className={cn(
                    isDarkMode ? "bg-blue-900/50" : ""
                  )} />
                  <DropdownMenuLabel className={cn(
                    "text-xs pt-0",
                    isDarkMode ? "text-blue-400" : "text-gray-500"
                  )}>Ketersediaan</DropdownMenuLabel>
                  <DropdownMenuItem 
                    onClick={() => applyFilter("stock", "")}
                    className={cn(
                      "cursor-pointer",
                      activeFilters.stock === "" 
                        ? isDarkMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-50 text-blue-600"
                        : isDarkMode ? "text-gray-300 hover:bg-blue-900/20" : "hover:bg-gray-100"
                    )}
                  >
                    Semua Stok
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => applyFilter("stock", "Tersedia")}
                    className={cn(
                      "cursor-pointer",
                      activeFilters.stock === "Tersedia" 
                        ? isDarkMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-50 text-blue-600"
                        : isDarkMode ? "text-gray-300 hover:bg-blue-900/20" : "hover:bg-gray-100"
                    )}
                  >
                    Tersedia
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => applyFilter("stock", "Habis")}
                    className={cn(
                      "cursor-pointer",
                      activeFilters.stock === "Habis" 
                        ? isDarkMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-50 text-blue-600"
                        : isDarkMode ? "text-gray-300 hover:bg-blue-900/20" : "hover:bg-gray-100"
                    )}
                  >
                    Habis Stok
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => applyFilter("stock", "Menipis")}
                    className={cn(
                      "cursor-pointer",
                      activeFilters.stock === "Menipis" 
                        ? isDarkMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-50 text-blue-600"
                        : isDarkMode ? "text-gray-300 hover:bg-blue-900/20" : "hover:bg-gray-100"
                    )}
                  >
                    Stok Menipis
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className={cn(
                  isDarkMode ? "bg-blue-900/50" : ""
                )} />
                <DropdownMenuItem
                  onClick={clearFilters}
                  className={cn(
                    "cursor-pointer justify-center font-medium",
                    isDarkMode ? "text-red-400 hover:bg-red-900/30" : "text-red-600 hover:bg-red-50"
                  )}
                >
                  Hapus Semua Filter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className={cn(
                    "transition-colors duration-300",
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  )}>
                    <TableHead className={cn(
                      "transition-colors duration-300",
                      isDarkMode ? "text-gray-100" : "text-gray-700"
                    )}>ID</TableHead>
                    <TableHead className={cn(
                      "transition-colors duration-300",
                      isDarkMode ? "text-gray-100" : "text-gray-700"
                    )}>Nama Produk</TableHead>
                    <TableHead className={cn(
                      "transition-colors duration-300",
                      isDarkMode ? "text-gray-100" : "text-gray-700"
                    )}>SKU</TableHead>
                    <TableHead className={cn(
                      "transition-colors duration-300",
                      isDarkMode ? "text-gray-100" : "text-gray-700"
                    )}>Kategori</TableHead>
                    <TableHead className={cn(
                      "transition-colors duration-300",
                      isDarkMode ? "text-gray-100" : "text-gray-700"
                    )}>Harga</TableHead>
                    <TableHead className={cn(
                      "transition-colors duration-300",
                      isDarkMode ? "text-gray-100" : "text-gray-700"
                    )}>Stok</TableHead>
                    <TableHead className={cn(
                      "transition-colors duration-300",
                      isDarkMode ? "text-gray-100" : "text-gray-700"
                    )}>Status</TableHead>
                    <TableHead className={cn(
                      "transition-colors duration-300 text-right",
                      isDarkMode ? "text-gray-100" : "text-gray-700"
                    )}>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <TableRow key={product.id} className={cn(
                        "transition-colors duration-300",
                        isDarkMode 
                          ? "hover:bg-blue-900/20 border-gray-700" 
                          : "hover:bg-blue-50/70 border-gray-200"
                      )}>
                        <TableCell className={cn(
                          "transition-colors duration-300",
                          isDarkMode ? "text-gray-100" : "text-gray-900"
                        )}>{product.id}</TableCell>
                        <TableCell 
                          className={cn(
                            "font-medium transition-colors duration-300 cursor-pointer hover:text-blue-600",
                            isDarkMode ? "text-gray-100 hover:text-blue-400" : "text-gray-900"
                          )}
                          onClick={() => navigateToProductDetail(product.id)}
                        >
                          {product.name}
                        </TableCell>
                        <TableCell className={cn(
                          "transition-colors duration-300",
                          isDarkMode ? "text-gray-100" : "text-gray-900"
                        )}>{product.sku}</TableCell>
                        <TableCell className={cn(
                          "transition-colors duration-300",
                          isDarkMode ? "text-gray-100" : "text-gray-900"
                        )}>{product.category}</TableCell>
                        <TableCell className={cn(
                          "transition-colors duration-300",
                          isDarkMode ? "text-gray-100" : "text-gray-900"
                        )}>{product.price}</TableCell>
                        <TableCell className={cn(
                          "transition-colors duration-300",
                          isDarkMode ? "text-gray-100" : "text-gray-900"
                        )}>{product.stock}</TableCell>
                        <TableCell>
                          <Badge
                            className={cn(
                              product.status === "Active"
                                ? isDarkMode 
                                  ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                  : "bg-green-100 text-green-800 hover:bg-green-200"
                                : isDarkMode
                                  ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                  : "bg-red-100 text-red-800 hover:bg-red-200"
                            )}
                          >
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleOpenEditModal(product)}
                              className={cn(
                                "transition-colors duration-300",
                                isDarkMode 
                                  ? "text-blue-400 hover:text-blue-300 hover:bg-blue-900/30" 
                                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                              )}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleOpenDeleteDialog(product)}
                              className={cn(
                                "transition-colors duration-300",
                                isDarkMode 
                                  ? "text-red-400 hover:text-red-300 hover:bg-red-900/30" 
                                  : "text-red-600 hover:text-red-700 hover:bg-red-100"
                              )}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        <p className={cn(
                          "text-sm",
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        )}>
                          Tidak ada produk yang sesuai dengan kriteria pencarian
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PrincipalProducts;
