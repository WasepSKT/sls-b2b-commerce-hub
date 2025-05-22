import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Image as ImageIcon, Plus, X } from "lucide-react";
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

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: any, file: File | null) => void;
  categories: string[];
}

const AddProductModal = ({ isOpen, onClose, onAddProduct, categories }: AddProductModalProps) => {
  const { isDarkMode } = useTheme();
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

  const handleSubmit = () => {
    onAddProduct(newProduct, selectedFile);
    // Reset form
    setNewProduct({
      name: "",
      sku: "",
      price: "",
      category: "",
      stock: "",
      description: "",
      details: "",
      status: "Active",
    });
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(
        "sm:max-w-[700px]",
        isDarkMode ? "bg-gray-800 border-gray-700 text-gray-100" : ""
      )}>
        <DialogHeader>
          <DialogTitle className={cn(
            isDarkMode ? "text-gray-100" : ""
          )}>Tambah Produk Baru</DialogTitle>
          <DialogDescription className={cn(
            isDarkMode ? "text-gray-400" : ""
          )}>
            Lengkapi informasi untuk menambahkan produk baru
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className={cn(isDarkMode ? "text-gray-300" : "")}>
                Nama Produk <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Masukkan nama produk"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className={cn(
                  isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sku" className={cn(isDarkMode ? "text-gray-300" : "")}>
                SKU <span className="text-red-500">*</span>
              </Label>
              <Input
                id="sku"
                placeholder="Masukkan SKU produk"
                value={newProduct.sku}
                onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                className={cn(
                  isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className={cn(isDarkMode ? "text-gray-300" : "")}>
                Harga <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                placeholder="Contoh: 150000"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className={cn(
                  isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock" className={cn(isDarkMode ? "text-gray-300" : "")}>
                Stok <span className="text-red-500">*</span>
              </Label>
              <Input
                id="stock"
                type="number"
                placeholder="Masukkan jumlah stok"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                className={cn(
                  isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className={cn(isDarkMode ? "text-gray-300" : "")}>
                Kategori <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={newProduct.category} 
                onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
              >
                <SelectTrigger id="category" className={cn(
                  isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                )}>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent className={cn(
                  isDarkMode ? "bg-gray-800 border-gray-700" : ""
                )}>
                  {categories.map((category) => (
                    <SelectItem 
                      key={category} 
                      value={category}
                      className={cn(
                        isDarkMode ? "text-gray-200 focus:bg-gray-700" : ""
                      )}
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className={cn(isDarkMode ? "text-gray-300" : "")}>
                Status
              </Label>
              <Select 
                value={newProduct.status} 
                onValueChange={(value) => setNewProduct({ ...newProduct, status: value })}
              >
                <SelectTrigger id="status" className={cn(
                  isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
                )}>
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent className={cn(
                  isDarkMode ? "bg-gray-800 border-gray-700" : ""
                )}>
                  <SelectItem 
                    value="Active"
                    className={cn(
                      isDarkMode ? "text-gray-200 focus:bg-gray-700" : ""
                    )}
                  >
                    Aktif
                  </SelectItem>
                  <SelectItem 
                    value="Out of Stock"
                    className={cn(
                      isDarkMode ? "text-gray-200 focus:bg-gray-700" : ""
                    )}
                  >
                    Habis Stok
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className={cn(isDarkMode ? "text-gray-300" : "")}>
              Deskripsi Produk
            </Label>
            <Textarea
              id="description"
              placeholder="Masukkan deskripsi produk"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className={cn(
                "min-h-[80px]",
                isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="details" className={cn(isDarkMode ? "text-gray-300" : "")}>
              Detail Produk
            </Label>
            <Textarea
              id="details"
              placeholder="Masukkan spesifikasi dan detail produk"
              value={newProduct.details}
              onChange={(e) => setNewProduct({ ...newProduct, details: e.target.value })}
              className={cn(
                "min-h-[80px]",
                isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
              )}
            />
          </div>

          <div className="space-y-2">
            <Label className={cn(isDarkMode ? "text-gray-300" : "")}>
              Foto Produk
            </Label>
            <div className="mt-1 flex items-center">
              {previewUrl ? (
                <div className="relative">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="h-32 w-32 object-cover rounded-md" 
                  />
                  <button
                    type="button"
                    onClick={removeSelectedFile}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="file-upload"
                  className={cn(
                    "cursor-pointer flex flex-col items-center justify-center h-32 w-32 border-2 border-dashed rounded-md",
                    isDarkMode
                      ? "border-gray-600 hover:border-gray-500 bg-gray-700/50"
                      : "border-gray-300 hover:border-gray-400 bg-gray-50"
                  )}
                >
                  <div className="space-y-1 text-center">
                    <ImageIcon className={cn(
                      "h-8 w-8 mx-auto",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )} />
                    <div className="text-xs text-center">
                      <span className={cn(
                        "font-medium",
                        isDarkMode ? "text-blue-400" : "text-blue-600"
                      )}>
                        Klik untuk upload
                      </span>
                    </div>
                    <p className={cn(
                      "text-xs",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )}>
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline"
            onClick={onClose}
            className={cn(
              isDarkMode ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700" : ""
            )}
          >
            Batal
          </Button>
          <Button 
            onClick={handleSubmit}
            className={cn(
              "transition-colors duration-300",
              isDarkMode 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : ""
            )}
          >
            <Plus className="mr-2 h-4 w-4" />
            Tambah Produk
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal; 