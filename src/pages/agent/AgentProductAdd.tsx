import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Upload,
  Plus,
  X
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/store/theme";

const AgentProductAdd = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementasi logika penyimpanan produk
    console.log("Menyimpan produk...");
    // Redirect ke halaman katalog setelah berhasil
    navigate("/dashboard/agent/catalog");
  };

  return (
    <DashboardLayout role="agent" pageTitle="Tambah Produk">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className={cn(
              "transition-colors duration-200",
              isDarkMode
                ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                : "border-gray-200 hover:bg-gray-100"
            )}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
          <div>
            <h2 className={cn(
              "text-2xl font-semibold tracking-tight",
              isDarkMode ? "text-gray-50" : "text-slate-900"
            )}>Tambah Produk Baru</h2>
            <p className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-500"
            )}>
              Tambahkan produk baru ke katalog Anda
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className={cn(
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          )}>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Label className={cn(
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  )}>Foto Produk</Label>
                  <div className="mt-2">
                    <div className={cn(
                      "border-2 border-dashed rounded-lg p-4 text-center",
                      isDarkMode
                        ? "border-gray-600 hover:border-gray-500"
                        : "border-gray-300 hover:border-gray-400"
                    )}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="product-image"
                      />
                      <label
                        htmlFor="product-image"
                        className="cursor-pointer block"
                      >
                        {imagePreview ? (
                          <div className="relative aspect-[4/3]">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                setImagePreview(null);
                              }}
                              className={cn(
                                "absolute top-2 right-2 p-1 rounded-full",
                                isDarkMode
                                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                  : "bg-white text-gray-600 hover:bg-gray-100"
                              )}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div className={cn(
                            "flex flex-col items-center justify-center py-8",
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          )}>
                            <Upload className="h-12 w-12 mb-2" />
                            <p className="text-sm font-medium">
                              Klik untuk unggah foto produk
                            </p>
                            <p className="text-xs mt-1">
                              PNG, JPG, JPEG (Maks. 2MB)
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className={cn(
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    )}>Nama Produk</Label>
                    <Input
                      required
                      placeholder="Masukkan nama produk"
                      className={cn(
                        "mt-1",
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                          : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                      )}
                    />
                  </div>
                  <div>
                    <Label className={cn(
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    )}>Kategori</Label>
                    <select
                      required
                      className={cn(
                        "w-full mt-1 rounded-md border px-3 py-2",
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-200 text-gray-900"
                      )}
                    >
                      <option value="">Pilih kategori</option>
                      <option value="electronics">Electronics</option>
                      <option value="fashion">Fashion</option>
                      <option value="home">Home</option>
                      <option value="beauty">Beauty</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label className={cn(
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  )}>Deskripsi</Label>
                  <Textarea
                    required
                    placeholder="Masukkan deskripsi produk"
                    className={cn(
                      "mt-1",
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                        : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                    )}
                    rows={4}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className={cn(
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    )}>Harga</Label>
                    <Input
                      required
                      type="number"
                      placeholder="Masukkan harga"
                      className={cn(
                        "mt-1",
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                          : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                      )}
                    />
                  </div>
                  <div>
                    <Label className={cn(
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    )}>Stok</Label>
                    <Input
                      required
                      type="number"
                      placeholder="Masukkan jumlah stok"
                      className={cn(
                        "mt-1",
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                          : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                      )}
                    />
                  </div>
                </div>

                <div>
                  <Label className={cn(
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  )}>Tag Produk</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className={cn(
                      "px-3 py-1 text-sm rounded-full",
                      isDarkMode
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-100 text-gray-700"
                    )}>
                      Premium
                      <button className="ml-2 text-gray-400 hover:text-gray-600">
                        <X className="h-3 w-3 inline" />
                      </button>
                    </span>
                    <button
                      type="button"
                      className={cn(
                        "px-3 py-1 text-sm rounded-full flex items-center",
                        isDarkMode
                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      )}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Tambah Tag
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              className={cn(
                isDarkMode
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                  : "border-gray-200 hover:bg-gray-100"
              )}
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Simpan Produk
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AgentProductAdd; 