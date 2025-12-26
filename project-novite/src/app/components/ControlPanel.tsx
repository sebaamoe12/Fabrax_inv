import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface ControlPanelProps {
  invoiceNumber: string;
  invoiceDate: string;
  quantities: { [key: string]: number };
  onInvoiceNumberChange: (value: string) => void;
  onInvoiceDateChange: (value: string) => void;
  onQuantityChange: (size: string, value: number) => void;
}

const UNIT_PRICE = 120.0;
const TVA_RATE = 0.19;

export default function ControlPanel({
  invoiceNumber,
  invoiceDate,
  quantities,
  onInvoiceNumberChange,
  onInvoiceDateChange,
  onQuantityChange,
}: ControlPanelProps) {
  const sizes = ['40', '41', '42', '43', '44', '45'];

  const calculateTotals = () => {
    const totalQuantity = sizes.reduce((sum, size) => sum + (quantities[size] || 0), 0);
    const montantTotalHT = totalQuantity * UNIT_PRICE;
    const montantTVA = montantTotalHT * TVA_RATE;
    const montantTotalTTC = montantTotalHT + montantTVA;
    return { totalQuantity, montantTotalHT, montantTVA, montantTotalTTC };
  };

  const totals = calculateTotals();

  return (
    <div className="bg-white p-6 border border-gray-200 rounded-lg">
      <h2 className="text-xl mb-6">Invoice Controls</h2>
      <div className="mb-4">
        <Label htmlFor="invoice-number">Invoice Number</Label>
        <Input id="invoice-number" type="text" value={invoiceNumber} onChange={(e) => onInvoiceNumberChange(e.target.value)} className="mt-1" />
      </div>
      <div className="mb-6">
        <Label htmlFor="invoice-date">Invoice Date</Label>
        <Input id="invoice-date" type="date" value={invoiceDate} onChange={(e) => onInvoiceDateChange(e.target.value)} className="mt-1" />
      </div>
      <div className="mb-6">
        <h3 className="mb-3">Quantities by Size</h3>
        <div className="space-y-3">
          {sizes.map((size) => (
            <div key={size} className="flex items-center gap-3">
              <Label htmlFor={`size-${size}`} className="w-16">Size {size}</Label>
              <Input id={`size-${size}`} type="number" min="0" value={quantities[size] || 0} onChange={(e) => onQuantityChange(size, parseInt(e.target.value) || 0)} className="w-24" />
            </div>
          ))}
        </div>
      </div>
      <div className="border-t pt-4 space-y-2">
        <h3 className="mb-3">Totals</h3>
        <div className="flex justify-between text-sm"><span>Total Quantity:</span><span>{totals.totalQuantity}</span></div>
        <div className="flex justify-between text-sm"><span>Montant Total HT:</span><span>{totals.montantTotalHT.toFixed(2)} DA</span></div>
        <div className="flex justify-between text-sm"><span>Montant TVA (19%):</span><span>{totals.montantTVA.toFixed(2)} DA</span></div>
        <div className="flex justify-between border-t pt-2 mt-2"><span>Montant Total TTC:</span><span>{totals.montantTotalTTC.toFixed(2)} DA</span></div>
      </div>
    </div>
  );
}
