import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Mock cart data - replace with actual cart data
  const cart = {
    items: [
      {
        id: 1,
        name: "Premium Product",
        price: 1500000,
        quantity: 2,
        image: "/product-1.jpg",
      },
      {
        id: 2,
        name: "Standard Product",
        price: 750000,
        quantity: 1,
        image: "/product-2.jpg",
      },
    ],
    subtotal: 3750000,
    shipping: 50000,
    tax: 375000,
    total: 4175000,
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Implement order submission logic here
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      toast({
        title: "Order Placed Successfully",
        description: "Your order has been placed and is being processed.",
      });
      
      // Redirect to order confirmation page
      // Implementation will be added later
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 border-b">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-primary font-medium">
                      Rp {item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Payment Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      <SelectItem value="credit_card">Credit Card</SelectItem>
                      <SelectItem value="ewallet">E-Wallet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Shipping Address</Label>
                  <Textarea placeholder="Enter your shipping address" />
                </div>

                <div>
                  <Label>Notes (Optional)</Label>
                  <Textarea placeholder="Add any special instructions" />
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rp {cart.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Rp {cart.shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>Rp {cart.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>Rp {cart.total.toLocaleString()}</span>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : "Place Order"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checkout; 