import { Button } from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Input } from "@/components/ui";
import { Label } from "@/components/ui";

const ResellerProfile = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "081234567890",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informasi Profil</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Nama</Label>
          <Input id="name" defaultValue={user.name} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue={user.email} />
        </div>
        <div>
          <Label htmlFor="phone">Nomor Telepon</Label>
          <Input id="phone" type="tel" defaultValue={user.phone} />
        </div>
        <Button>Simpan Perubahan</Button>
      </CardContent>
    </Card>
  );
};

export default ResellerProfile;
