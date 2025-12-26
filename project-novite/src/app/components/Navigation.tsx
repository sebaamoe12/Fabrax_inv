import { Button } from "./ui/button";

interface NavigationProps {
  onNewInvoice: () => void;
}

export default function Navigation({ onNewInvoice }: NavigationProps) {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-[1440px] flex items-center justify-between px-8 py-4">
        <div className="text-3xl font-bold text-blue-600">Fabrax</div>
        <Button 
          onClick={onNewInvoice}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6"
        >
          + New Invoice
        </Button>
      </div>
    </nav>
  );
}
