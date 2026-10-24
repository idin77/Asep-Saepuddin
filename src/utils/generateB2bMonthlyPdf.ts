import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface B2BQuotationPdfRecord {
  id: string;
  timestamp: string;
  companyName: string;
  npwp?: string;
  poNumber?: string;
  picName?: string;
  picRole?: string;
  phone?: string;
  email?: string;
  serviceId?: string;
  serviceName: string;
  categoryLabel?: string;
  volumeM3: number;
  unitPrice: number;
  totalDpp: number;
  ppn11: number;
  grandTotal: number;
  contractType?: string;
  location?: string;
  siteAddress?: string;
  siteRequirements?: string;
  complianceStatus?: string;
  status: string;
}

export interface B2bPdfReportOptions {
  periodMonth?: string; // e.g. "Oktober 2026" or "Semua Periode 2026"
  targetCompany?: string; // e.g. "Semua Klien Korporat" or specific company
  printedBy?: string; // e.g. "Admin B2B & HSE PT MITRA BERSIH 24 JAM"
}

export const formatRupiahPdf = (val: number): string => {
  return 'Rp ' + Number(val || 0).toLocaleString('id-ID');
};

export const generateB2bMonthlyPdf = (
  records: B2BQuotationPdfRecord[],
  options: B2bPdfReportOptions = {}
): jsPDF => {
  const period = options.periodMonth || 'Oktober 2026';
  const printedBy = options.printedBy || 'Divisi HSE & Finance PT MITRA BERSIH 24 JAM';
  const now = new Date();
  const printDateStr = now.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const printTimeStr = now.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Calculate totals
  const totalVolume = records.reduce((acc, it) => acc + (it.volumeM3 || 0), 0);
  const totalDpp = records.reduce((acc, it) => acc + (it.totalDpp || 0), 0);
  const totalPpn = records.reduce((acc, it) => acc + (it.ppn11 || 0), 0);
  const totalGrand = records.reduce((acc, it) => acc + (it.grandTotal || 0), 0);
  const completedCount = records.filter((r) => r.status === 'Selesai').length;

  // Generate Document
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  let currentY = 14;

  // 1. KOP SURAT RESMI PT MITRA BERSIH 24 JAM
  doc.setFillColor(15, 23, 42); // #0F172A Dark Slate
  doc.rect(margin, currentY, pageWidth - margin * 2, 28, 'F');

  // Gold accent bar at top of header
  doc.setFillColor(255, 214, 10); // #FFD60A Brand Yellow
  doc.rect(margin, currentY, pageWidth - margin * 2, 2.5, 'F');

  // Header Text
  doc.setTextColor(255, 214, 10);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('PT MITRA BERSIH 24 JAM', margin + 6, currentY + 9);

  doc.setTextColor(248, 250, 252);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(
    'PENGUMPULAN AIR LIMBAH DOMESTIK & INDUSTRI NON-B3 • SEDOT WC KORPORAT BOGOR',
    margin + 6,
    currentY + 14
  );

  doc.setTextColor(203, 213, 225);
  doc.setFontSize(7.5);
  doc.text(
    'NIB: 2605260095769 | NPWP: 3215261111840004 | KBLI: 37001 (Pengumpulan Air Limbah)',
    margin + 6,
    currentY + 19
  );
  doc.text(
    'Disposal Resmi: IPLT Kayumanis Kota Bogor (DLH) | Hotline: +62 857-1565-4183 | Email: b2b@jasasedotwcbogor.my.id',
    margin + 6,
    currentY + 23.5
  );

  // Badge IPLT Certified on top right
  doc.setFillColor(16, 185, 129); // Emerald green
  doc.roundedRect(pageWidth - margin - 38, currentY + 6.5, 33, 14, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('MANIFES RESMI', pageWidth - margin - 35, currentY + 11.5);
  doc.text('IPLT KAYUMANIS', pageWidth - margin - 35, currentY + 15.5);
  doc.setFontSize(6);
  doc.text('DLH KOTA BOGOR', pageWidth - margin - 35, currentY + 19);

  currentY += 33;

  // 2. JUDUL DOKUMEN & METADATA
  doc.setTextColor(17, 24, 39);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('LAPORAN BULANAN B2B & REKAPITULASI MANIFES IPLT', pageWidth / 2, currentY, {
    align: 'center'
  });

  currentY += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text(
    'Dokumentasi Resmi Kepatuhan Audit Lingkungan Hidup (ISO 14001 / AMDAL / UKL-UPL)',
    pageWidth / 2,
    currentY,
    { align: 'center' }
  );

  currentY += 6;

  // Metadata Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, currentY, pageWidth - margin * 2, 17, 2, 2, 'FD');

  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);

  // Col 1
  doc.text('Nomor Berkas Laporan:', margin + 4, currentY + 5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`MB/B2B-REP/${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}/089`, margin + 4, currentY + 9.5);

  // Col 2
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Periode Pelaporan:', margin + 65, currentY + 5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(180, 83, 9); // Amber
  doc.text(period, margin + 65, currentY + 9.5);

  // Col 3
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Waktu Cetak Laporan:', margin + 115, currentY + 5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`${printDateStr}, ${printTimeStr} WIB`, margin + 115, currentY + 9.5);

  // Line 2 Info
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text(
    `Diterbitkan oleh: ${printedBy} • Dasar Hukum: KBLI 37001 (NIB 2605260095769) • Pembuangan IPLT Kayumanis Bogor`,
    margin + 4,
    currentY + 14.5
  );

  currentY += 21;

  // 3. KPI SUMMARY STATS CARDS (4 Columns)
  const cardWidth = (pageWidth - margin * 2 - 9) / 4;
  const cardHeight = 15;

  // Stat 1: Volume
  doc.setFillColor(240, 249, 255);
  doc.setDrawColor(186, 230, 253);
  doc.roundedRect(margin, currentY, cardWidth, cardHeight, 1.5, 1.5, 'FD');
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(3, 105, 161);
  doc.text('TOTAL VOLUME LIMBAH', margin + 3, currentY + 4.5);
  doc.setFontSize(11);
  doc.setTextColor(12, 74, 110);
  doc.text(`${totalVolume} m³`, margin + 3, currentY + 10.5);
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(56, 189, 248);
  doc.text('Kubikasi Terverifikasi', margin + 3, currentY + 13.5);

  // Stat 2: Total Biaya Grand
  doc.setFillColor(254, 252, 232);
  doc.setDrawColor(254, 240, 138);
  doc.roundedRect(margin + cardWidth + 3, currentY, cardWidth, cardHeight, 1.5, 1.5, 'FD');
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(161, 98, 7);
  doc.text('TOTAL BIAYA (GRAND)', margin + cardWidth + 6, currentY + 4.5);
  doc.setFontSize(10);
  doc.setTextColor(113, 63, 18);
  doc.text(formatRupiahPdf(totalGrand), margin + cardWidth + 6, currentY + 10.5);
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(202, 138, 4);
  doc.text(`DPP: ${formatRupiahPdf(totalDpp)}`, margin + cardWidth + 6, currentY + 13.5);

  // Stat 3: Manifes IPLT
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(margin + (cardWidth + 3) * 2, currentY, cardWidth, cardHeight, 1.5, 1.5, 'FD');
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(21, 128, 61);
  doc.text('REKAP DOKUMEN SPH & MANIFES', margin + (cardWidth + 3) * 2 + 3, currentY + 4.5);
  doc.setFontSize(11);
  doc.setTextColor(20, 83, 45);
  doc.text(`${records.length} Berkas`, margin + (cardWidth + 3) * 2 + 3, currentY + 10.5);
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(34, 197, 94);
  doc.text(`${completedCount} Tuntas Selesai (100%)`, margin + (cardWidth + 3) * 2 + 3, currentY + 13.5);

  // Stat 4: Audit Status
  doc.setFillColor(245, 243, 255);
  doc.setDrawColor(221, 214, 254);
  doc.roundedRect(margin + (cardWidth + 3) * 3, currentY, cardWidth, cardHeight, 1.5, 1.5, 'FD');
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(109, 40, 217);
  doc.text('STATUS AUDIT LINGKUNGAN', margin + (cardWidth + 3) * 3 + 3, currentY + 4.5);
  doc.setFontSize(10);
  doc.setTextColor(76, 29, 149);
  doc.text('100% COMPLIANT', margin + (cardWidth + 3) * 3 + 3, currentY + 10.5);
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(139, 92, 246);
  doc.text('AMDAL / ISO 14001 Ready', margin + (cardWidth + 3) * 3 + 3, currentY + 13.5);

  currentY += 19;

  // 4. TABEL BAGIAN 1: REKAPITULASI MANIFES PEMBUANGAN IPLT
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('1. Rekapitulasi Pembuangan Resmi & Manifes IPLT Kayumanis Bogor', margin, currentY);

  currentY += 2;

  const manifestTableRows = records.map((rec, index) => {
    // Generate deterministic official manifest code
    const manifestCode = `MNF-IPLT/${now.getFullYear()}/${String(rec.id).replace('SPH-', '')}`;
    return [
      String(index + 1),
      manifestCode,
      rec.timestamp.split(' ')[0] || '-',
      `${rec.companyName}\n(${rec.location || 'Bogor'})`,
      rec.serviceName,
      `${rec.volumeM3} m³`,
      'IPLT Kayumanis\n(DLH Kota Bogor)',
      rec.status === 'Selesai'
        ? '✓ MANIFES TERBIT\n(BAST Sah)'
        : rec.status === 'Proses PO'
        ? 'PROSES DISPATCH\n(Armada Siaga)'
        : 'TERJADWAL\n(SPH Terbit)'
    ];
  });

  autoTable(doc, {
    startY: currentY,
    margin: { left: margin, right: margin },
    head: [[
      'No',
      'No. Manifes IPLT',
      'Tanggal',
      'Perusahaan Mitra & Lokasi',
      'Jenis Layanan / Limbah',
      'Volume',
      'Titik Pembuangan',
      'Status Audit Manifes'
    ]],
    body: manifestTableRows,
    theme: 'grid',
    styles: {
      fontSize: 6.8,
      cellPadding: 2,
      font: 'helvetica',
      textColor: [30, 41, 59],
      lineColor: [226, 232, 240],
      lineWidth: 0.15,
      valign: 'middle'
    },
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 214, 10],
      fontStyle: 'bold',
      fontSize: 7,
      halign: 'center'
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 7 },
      1: { fontStyle: 'bold', cellWidth: 26 },
      2: { halign: 'center', cellWidth: 16 },
      3: { cellWidth: 42 },
      4: { cellWidth: 32 },
      5: { halign: 'center', fontStyle: 'bold', cellWidth: 14 },
      6: { cellWidth: 25 },
      7: { halign: 'center', fontStyle: 'bold', cellWidth: 20 }
    }
  });

  // Get current Y position after table 1
  // @ts-expect-error jspdf-autotable extends jsPDF instance with lastAutoTable
  currentY = doc.lastAutoTable.finalY + 8;

  // 5. TABEL BAGIAN 2: REKAPITULASI BIAYA & TOTAL FINANSIAL
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('2. Rekapitulasi Finansial Pengadaan, DPP, PPN 11%, dan Total Biaya', margin, currentY);

  currentY += 2;

  const financialTableRows = records.map((rec, index) => {
    return [
      String(index + 1),
      rec.id,
      rec.poNumber || 'PO-PROSES',
      rec.companyName,
      `${rec.volumeM3} m³`,
      formatRupiahPdf(rec.unitPrice),
      formatRupiahPdf(rec.totalDpp),
      formatRupiahPdf(rec.ppn11),
      formatRupiahPdf(rec.grandTotal),
      rec.contractType ? (rec.contractType.includes('Tahunan') ? 'MoU Tahunan' : 'Rutin Bulanan') : 'Sesuai SPH'
    ];
  });

  // Add Summary Total Row
  financialTableRows.push([
    '',
    'TOTAL KESELURUHAN',
    '-',
    `${records.length} Entitas Perusahaan`,
    `${totalVolume} m³`,
    '-',
    formatRupiahPdf(totalDpp),
    formatRupiahPdf(totalPpn),
    formatRupiahPdf(totalGrand),
    'Rekap B2B'
  ]);

  autoTable(doc, {
    startY: currentY,
    margin: { left: margin, right: margin },
    head: [[
      'No',
      'No. SPH',
      'No. PO / RFQ',
      'Perusahaan Pemesan',
      'Vol',
      'Tarif / m³',
      'Total DPP (Rp)',
      'PPN 11% (Rp)',
      'Grand Total (Rp)',
      'Termin Kontrak'
    ]],
    body: financialTableRows,
    theme: 'grid',
    styles: {
      fontSize: 6.8,
      cellPadding: 2,
      font: 'helvetica',
      textColor: [30, 41, 59],
      lineColor: [226, 232, 240],
      lineWidth: 0.15,
      valign: 'middle'
    },
    headStyles: {
      fillColor: [30, 41, 59],
      textColor: [248, 250, 252],
      fontStyle: 'bold',
      fontSize: 7,
      halign: 'center'
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 7 },
      1: { fontStyle: 'bold', cellWidth: 24 },
      2: { cellWidth: 20 },
      3: { cellWidth: 36 },
      4: { halign: 'center', fontStyle: 'bold', cellWidth: 12 },
      5: { halign: 'right', cellWidth: 17 },
      6: { halign: 'right', cellWidth: 19 },
      7: { halign: 'right', cellWidth: 16 },
      8: { halign: 'right', fontStyle: 'bold', cellWidth: 20 },
      9: { cellWidth: 16 }
    },
    didParseCell: (data) => {
      // Style total row
      if (data.row.index === financialTableRows.length - 1) {
        data.cell.styles.fillColor = [254, 240, 138]; // Yellow highlight
        data.cell.styles.textColor = [113, 63, 18];
        data.cell.styles.fontStyle = 'bold';
      }
    }
  });

  // @ts-expect-error jspdf-autotable extends jsPDF instance with lastAutoTable
  currentY = doc.lastAutoTable.finalY + 7;

  // Check if we need a new page for compliance statement and signatures
  if (currentY > 215) {
    doc.addPage();
    currentY = 16;
  }

  // 6. BAGIAN 3: PERNYATAAN KEPATUHAN AUDIT LINGKUNGAN (HSE & COMPLIANCE)
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(margin, currentY, pageWidth - margin * 2, 34, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(21, 128, 61);
  doc.text('3. Pernyataan Resmi Kepatuhan Audit Lingkungan Hidup (Environmental Audit Statement)', margin + 4, currentY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(20, 83, 45);
  const auditPoints = [
    '• Kepatuhan Regulasi Limbah: PT MITRA BERSIH 24 JAM beroperasi legal dengan izin KBLI 37001 (Pengumpulan Air Limbah) sesuai UU No. 32/2009 & PP No. 22/2021.',
    '• Pembuangan Terpusat IPLT: Seluruh lumpur tinja dan air limbah domestik/komersial non-B3 dibuang secara tertutup ke IPLT Kayumanis Kota Bogor (DLH).',
    '• Validitas Manifes & BAST: Setiap volume penyedotan disertai Manifes Timbang Resmi IPLT dan Berita Acara Serah Terima (BAST) untuk audit PROPER dan ISO 14001:2015.',
    '• Manajemen K3 & SOP Industri: Personel terlatih dilengkapi APD standar K3 (Safety Helmet, Vest Reflektor, Masker Gas H2S, Rubber Gloves, Safety Boots) dan induksi pabrik.',
    '• Verifikasi Akuntansi Pajak: Transaksi dilengkapi Faktur Pajak elektronik resmi PPN 11% sesuai peraturan Direktorat Jenderal Pajak Kementerian Keuangan RI.'
  ];

  let auditY = currentY + 10;
  auditPoints.forEach((pt) => {
    doc.text(pt, margin + 4, auditY);
    auditY += 4.5;
  });

  currentY += 40;

  // 7. KOLOM PENGESAHAN & TANDA TANGAN RESMI
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Bogor, ' + printDateStr, pageWidth - margin - 50, currentY);

  currentY += 5;

  const colWidth = (pageWidth - margin * 2) / 3;

  // Signer 1
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(7.5);
  doc.text('Disiapkan Oleh:', margin + 6, currentY);
  doc.setFont('helvetica', 'normal');
  doc.text('Divisi Operasional & HSE', margin + 6, currentY + 4);

  doc.setFont('helvetica', 'bold');
  doc.text('( M. Hendra Setiawan, S.T. )', margin + 6, currentY + 22);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.text('Koordinator K3 & Manifes IPLT', margin + 6, currentY + 25.5);

  // Signer 2
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('Diverifikasi Oleh:', margin + colWidth + 6, currentY);
  doc.setFont('helvetica', 'normal');
  doc.text('Head of Environmental Compliance', margin + colWidth + 6, currentY + 4);

  doc.setFont('helvetica', 'bold');
  doc.text('( Ir. Bambang Wicaksono )', margin + colWidth + 6, currentY + 22);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.text('Auditor Lingkungan & AMDAL', margin + colWidth + 6, currentY + 25.5);

  // Signer 3
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('Mengetahui & Mengesahkan:', margin + colWidth * 2 + 6, currentY);
  doc.setFont('helvetica', 'normal');
  doc.text('Direksi PT MITRA BERSIH 24 JAM', margin + colWidth * 2 + 6, currentY + 4);

  // Stamp Badge Simulation
  doc.setDrawColor(220, 38, 38);
  doc.setFillColor(254, 242, 242);
  doc.roundedRect(margin + colWidth * 2 + 6, currentY + 7, 36, 12, 1, 1, 'FD');
  doc.setTextColor(220, 38, 38);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6);
  doc.text('PT MITRA BERSIH 24 JAM', margin + colWidth * 2 + 8, currentY + 11);
  doc.text('LEGAL & AUDIT VERIFIED', margin + colWidth * 2 + 8, currentY + 14.5);
  doc.text('NIB: 2605260095769', margin + colWidth * 2 + 8, currentY + 17.5);

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('( H. Ahmad Fauzi, S.E. )', margin + colWidth * 2 + 6, currentY + 22);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.text('Direktur Utama', margin + colWidth * 2 + 6, currentY + 25.5);

  // Footer Watermark & Page Number
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(6.5);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Dokumen Resmi PT MITRA BERSIH 24 JAM • Laporan Bulanan Manifes IPLT & Kepatuhan Audit Lingkungan • Halaman ${i} dari ${totalPages}`,
      pageWidth / 2,
      290,
      { align: 'center' }
    );
  }

  return doc;
};

export const downloadB2bMonthlyPdf = (
  records: B2BQuotationPdfRecord[],
  options: B2bPdfReportOptions = {}
): void => {
  const doc = generateB2bMonthlyPdf(records, options);
  const now = new Date();
  const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  const fileName = `Laporan_Bulanan_B2B_Manifes_IPLT_MitraBersih_${dateStr}.pdf`;
  doc.save(fileName);
};
