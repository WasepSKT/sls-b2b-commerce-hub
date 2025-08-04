import { Check } from "lucide-react";
import { useTheme } from "@/lib/store/theme";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { Input } from "@/components/ui";
import { Button } from "@/components/ui";

interface FilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  dateFilter: string;
  setDateFilter: (date: string) => void;
  applyFilter: () => void;
  isDarkMode: boolean;
}

const FilterModal = ({
  open,
  onOpenChange,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
  applyFilter,
  isDarkMode
}: FilterModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(
        "max-h-[80vh] overflow-y-auto",
        isDarkMode ? "bg-gray-800 border-gray-700 text-gray-100" : ""
      )}>
        <DialogHeader>
          <DialogTitle className={cn(
            isDarkMode ? "text-gray-100" : ""
          )}>Filter Pesanan</DialogTitle>
          <DialogDescription className={cn(
            isDarkMode ? "text-gray-400" : ""
          )}>
            Pilih kriteria untuk memfilter daftar pesanan Anda
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h4 className={cn(
              "text-sm font-medium",
              isDarkMode ? "text-gray-300" : ""
            )}>Status Pesanan</h4>
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className={cn(
                isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
              )}>
                <SelectValue placeholder="Pilih status pesanan" />
              </SelectTrigger>
              <SelectContent className={cn(
                isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : ""
              )}>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="Diproses">Diproses</SelectItem>
                <SelectItem value="Dikirim">Dikirim</SelectItem>
                <SelectItem value="Selesai">Selesai</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <h4 className={cn(
              "text-sm font-medium",
              isDarkMode ? "text-gray-300" : ""
            )}>Tanggal Pesanan</h4>
            <Input
              type="text"
              placeholder="Contoh: Mei 2025"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className={cn(
                isDarkMode ? "border-gray-600 bg-gray-700 text-gray-200" : ""
              )}
            />
          </div>
        </div>

        <DialogFooter className="flex sm:justify-between">
          <DialogClose asChild>
            <Button 
              variant="outline" 
              className={cn(
                isDarkMode ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700" : ""
              )}
            >
              Batal
            </Button>
          </DialogClose>
          <Button 
            type="submit" 
            onClick={applyFilter}
            className={cn(
              "transition-colors duration-300",
              isDarkMode 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : ""
            )}
          >
            <Check className="h-4 w-4 mr-2" />
            Terapkan Filter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal; 