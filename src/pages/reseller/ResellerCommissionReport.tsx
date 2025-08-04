import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";

const commissionData = {
  totalCommission: 1500000,
  commissions: [
    { orderId: "ORD001", orderDate: "2025-08-01", totalSale: 350000, commission: 35000 },
    { orderId: "ORD002", orderDate: "2025-08-01", totalSale: 500000, commission: 50000 },
    { orderId: "ORD003", orderDate: "2025-07-31", totalSale: 200000, commission: 20000 },
    { orderId: "ORD004", orderDate: "2025-07-30", totalSale: 450000, commission: 45000 },
  ]
};

const ResellerCommissionReport = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Total Komisi Didapat</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-green-500">Rp {commissionData.totalCommission.toLocaleString()}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Rincian Komisi</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Pesanan</TableHead>
                <TableHead>Tanggal Pesanan</TableHead>
                <TableHead>Total Penjualan</TableHead>
                <TableHead>Komisi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commissionData.commissions.map((commission) => (
                <TableRow key={commission.orderId}>
                  <TableCell className="font-medium">{commission.orderId}</TableCell>
                  <TableCell>{commission.orderDate}</TableCell>
                  <TableCell>Rp {commission.totalSale.toLocaleString()}</TableCell>
                  <TableCell className="text-green-500">+Rp {commission.commission.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResellerCommissionReport;
