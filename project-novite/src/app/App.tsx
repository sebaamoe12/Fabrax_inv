import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Navigation from './components/Navigation';
import InvoicePreview from './components/InvoicePreview';
import ControlPanel from './components/ControlPanel';
import ClaudeChat from './components/ClaudeChat';
import { Button } from './components/ui/button';

export default function App() {
  const [invoiceNumber, setInvoiceNumber] = useState('1');
  const [invoiceDate, setInvoiceDate] = useState('2025-12-21');
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    '40': 200,
    '41': 400,
    '42': 400,
    '43': 400,
    '44': 200,
    '45': 200,
  });

  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleNewInvoice = () => {
    const currentNum = parseInt(invoiceNumber);
    setInvoiceNumber((currentNum + 1).toString());
    setQuantities({ '40': 0, '41': 0, '42': 0, '43': 0, '44': 0, '45': 0 });
    const today = new Date().toISOString().split('T')[0];
    setInvoiceDate(today);
  };

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;
    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        removeContainer: true,
        imageTimeout: 0,
        onclone: (clonedDoc) => {
          const clonedInvoice = clonedDoc.querySelector('[data-invoice-preview]') as HTMLElement;
          if (clonedInvoice) clonedInvoice.style.color = '#000000';
        },
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Facture_${invoiceNumber}_${invoiceDate}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleQuantityChange = (size: string, value: number) => {
    setQuantities((prev) => ({ ...prev, [size]: value }));
  };

  const formatDateForDisplay = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onNewInvoice={handleNewInvoice} />
      <div className="mx-auto max-w-[1440px] px-8 py-8">
        <div className="flex flex-col gap-6">
          {/* Claude Chat Section */}
          <div className="mb-4">
            <ClaudeChat />
          </div>

          {/* Invoice Controls */}
          <div className="flex gap-4">
            <div className="flex-1">
              <ControlPanel
                invoiceNumber={invoiceNumber}
                invoiceDate={invoiceDate}
                quantities={quantities}
                onInvoiceNumberChange={setInvoiceNumber}
                onInvoiceDateChange={setInvoiceDate}
                onQuantityChange={handleQuantityChange}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleDownloadPDF} className="bg-green-600 hover:bg-green-700 text-white px-8 h-12">
                Download PDF
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <InvoicePreview
              ref={invoiceRef}
              data={{ invoiceNumber, invoiceDate: formatDateForDisplay(invoiceDate), quantities }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
