import { forwardRef } from 'react';
import { numberToWordsFr } from './utils/numberToWords';

interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  quantities: { [key: string]: number };
}

interface InvoicePreviewProps { data: InvoiceData }

const UNIT_PRICE = 120.0;
const TVA_RATE = 0.19;

const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(({ data }, ref) => {
  const sizes = ['40', '41', '42', '43', '44', '45'];
  const lineTotals = sizes.map(size => ({ size, quantity: data.quantities[size] || 0, total: (data.quantities[size] || 0) * UNIT_PRICE }));
  const totalQuantity = lineTotals.reduce((sum, item) => sum + item.quantity, 0);
  const montantTotalHT = lineTotals.reduce((sum, item) => sum + item.total, 0);
  const montantTVA = montantTotalHT * TVA_RATE;
  const montantTotalTTC = montantTotalHT + montantTVA;

  return (
    <div ref={ref} data-invoice-preview className="bg-white shadow-sm" style={{ width: '794px', minHeight: '1123px', fontFamily: 'Courier New, monospace', fontSize: '11px', padding: '40px', border: '1px solid #d1d5db', color: '#000000' }}>
      <div className="flex justify-between items-start mb-6">
        <div className="text-4xl font-bold text-blue-600" style={{ fontFamily: 'Arial, sans-serif' }}>Fabrax</div>
        <div className="text-right"><span>Facture N° {data.invoiceNumber} | {data.invoiceDate}</span></div>
      </div>
      <div className="border-t-2 border-black mb-6"></div>
      <div className="text-right mb-6"><span>Date : {data.invoiceDate}</span></div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border-2 border-black p-3">
          <div className="mb-2"><strong>De :</strong></div>
          <div className="mb-1"><strong></strong> ABDELWARAB BOUDJELIDA</div>
          <div className="mb-1"><strong>Adresse :</strong> IBKAOUN 35C7ION 4 COLLECTE DE</div>
          <div className="mb-1 ml-16">FROMPTE 62,50900,Rouiba,Alger</div>
          <div className="mb-1"><strong>Activité :</strong> FABRICATION D'ARTICLE EN PLASTIQUE</div>
          <div className="mb-1"><strong>RC :</strong> 11 A 4881137 - 16/09</div>
          <div className="mb-1"><strong>NIF :</strong> 17616602223188416O1</div>
          <div><strong>Telephone :</strong> 06 60 07 62 09</div>
        </div>
        <div className="border-2 border-black p-3">
          <div className="mb-2"><strong>A :</strong></div>
          <div className="mb-1"><strong></strong> SARL MARMALOUFI SHOES</div>
          <div className="mb-1"><strong>Adresse :</strong> AIN AZEL WILAYA DE SETIF</div>
          <div className="mb-1"><strong>RC :</strong> 98 B 0262464</div>
          <div className="mb-1"><strong>NIF :</strong> 998290082464</div>
          <div className="mb-1"><strong>Article N° :</strong> 1940259021</div>
          <div className="mb-1"><strong>Banque :</strong> ALSALAM BANQUE</div>
          <div className="mb-1"><strong>N° Compte :</strong> 03801301241851001O8</div>
          <div className="mb-1"><strong>Telephone :</strong> 05 50 55 17 01 / 06 58 72 83 51</div>
          <div><strong>Fax :</strong> 036 55 29 24</div>
        </div>
      </div>
      <div className="mb-6">
        <table className="w-full border-collapse border-2 border-black">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-400 p-2 text-left">Désignation De Produits</th>
              <th className="border border-gray-400 p-2 text-center">Code</th>
              <th className="border border-gray-400 p-2 text-center">U/M</th>
              <th className="border border-gray-400 p-2 text-center">Qté</th>
              <th className="border border-gray-400 p-2 text-center">P/U - HT<br/>en DA</th>
              <th className="border border-gray-400 p-2 text-center">Montant HT<br/>en DA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-400 p-2" rowSpan={7}>Semelles De Chaussures</td>
              <td className="border border-gray-400 p-2 text-center">Point</td>
              <td className="border border-gray-400 p-2 text-center">Paire</td>
              <td className="border border-gray-400 p-2 text-center">{totalQuantity}</td>
              <td className="border border-gray-400 p-2 text-center" rowSpan={7}>{UNIT_PRICE.toFixed(2)}</td>
              <td className="border border-gray-400 p-2 text-right" rowSpan={7}>{montantTotalHT.toFixed(2)}</td>
            </tr>
            {lineTotals.map((item) => (
              <tr key={item.size}>
                <td className="border border-gray-400 p-2 text-center">{item.size}</td>
                <td className="border border-gray-400 p-2 text-center"></td>
                <td className="border border-gray-400 p-2 text-center">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-2">
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="border-2 border-black p-2 text-center" colSpan={5}><strong>MONTANT TOTAL EN HT</strong></td>
                <td className="border-2 border-black p-2 text-right">{montantTotalHT.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-2 flex justify-end">
          <table className="border-collapse" style={{ width: '50%' }}>
            <tbody>
              <tr className="bg-gray-100">
                <td className="border-2 border-black p-2 text-center"><strong>MONTANT TOTAL EN HT</strong></td>
                <td className="border-2 border-black p-2 text-right">{montantTotalHT.toFixed(2)}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border-2 border-black p-2 text-center"><strong>MONTANT TVA 19%</strong></td>
                <td className="border-2 border-black p-2 text-right">{montantTVA.toFixed(2)}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border-2 border-black p-2 text-center"><strong>MONTANT TOTAL EN TTC</strong></td>
                <td className="border-2 border-black p-2 text-right">{montantTotalTTC.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="border-2 border-black p-3 mb-6">
        <div className="mb-1"><strong>Arrêtée la presenta facture à terme en toutes taxes comprises à la somme de :</strong></div>
        <div>{numberToWordsFr(montantTotalTTC)}</div>
      </div>
      <div className="mb-6">
        <div className="mb-2"><strong>Moyen De Livraison :</strong> Moyen Propres Du Client</div>
        <div className="flex justify-between">
          <div><strong>Nom Du Chauffeur:</strong> .........................</div>
          <div><strong>Recu Le :</strong> .........................</div>
        </div>
      </div>
      <div className="mt-20 pt-6 border-t border-gray-400 flex justify-between text-gray-500">
        <div>Fabrax©</div>
        <div><strong>Page 1 sur 1</strong></div>
        <div>{data.invoiceDate}</div>
      </div>
    </div>
  );
});

InvoicePreview.displayName = 'InvoicePreview';
export default InvoicePreview;
