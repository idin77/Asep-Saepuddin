import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent header for telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// FAQ & Knowledge Base for PT Mitra Bersih 24 Jam
const COMPANY_FAQ_KNOWLEDGE = `
IDENTITAS PERUSAHAAN:
- Nama Usaha: PT MITRA BERSIH 24 JAM
- Bidang Usaha: Jasa Sedot WC & Pengumpulan Air Limbah Domestik / Industri Non-B3 Bogor
- Legalitas Resmi: NIB 2605260095769, NPWP 3215261111840004, KBLI 37001 (Pengumpulan Air Limbah)
- Fasilitas Pembuangan Resmi: Instalasi Pengolahan Lumpur Tinja (IPLT) Kayumanis, Kota Bogor (di bawah binaan Dinas Lingkungan Hidup)
- Nomor WhatsApp & Telepon Hotline 24 Jam: +62 857-1565-4183
- Jam Operasional: 24 Jam Nonstop (Senin - Minggu termasuk hari libur nasional)
- Waktu Respons: Armada truk tangki meluncur segera, estimasi tiba di lokasi dalam 15 – 30 menit dari Pos Siaga terdekat.

LOKASI 5 POS SIAGA ARMADA BOGOR RAYA:
1. Pos Pusat Kota Bogor (Jl. Sholeh Iskandar & Jl. Pajajaran): Melayani Tanah Sareal, Bogor Tengah, Bogor Barat, Bogor Timur, Bogor Utara, Bogor Selatan.
2. Pos Siaga Cibinong & Sentul: Melayani Cibinong, Sentul City, Babakan Madang, Citeureup, Sukaraja, Bojonggede.
3. Pos Siaga Dramaga & Ciomas: Melayani Dramaga, Ciomas, Ciampea, Cibungbulang, Laladon, Leuwiliang.
4. Pos Siaga Ciawi & Puncak: Melayani Ciawi, Gadog, Megamendung, Cisarua, Caringin, Cijeruk, Tajur.
5. Pos Siaga Parung & Kemang: Melayani Parung, Gunung Sindur, Ciseeng, Kemang, Tajurhalang, Bojonggede.

DAFTAR LAYANAN & TARIF TRANSPARAN:
1. Sedot WC & Kuras Septic Tank Rumah Tangga: Mulai Rp 350.000 / tangki (Kapasitas penuh sampai dasar, pembersihan lumpur).
2. Pelancaran Saluran / Kloset Mampet Tanpa Bongkar: Mulai Rp 250.000 / titik (Metode spiral baja fleksibel & water pressure modern).
3. Sedot Septic Tank & STP Komersial (Ruko/Kantor/Sekolah/Klinik): Mulai Rp 600.000 / tangki.
4. Kuras Grease Trap Lemak Restoran / Kafe / Food Court: Mulai Rp 450.000 / bak (Pengambilan kerak lemak beku).
5. Sedot Limbah IPAL / Lumpur Pabrik & Industri: Harga kontrak / m³ resmi ber-Manifes IPLT & Faktur Pajak PPN 11%.

KEUNGGULAN UTAMA:
- Tanpa Biaya Siluman / Tanpa Biaya Tambahan: Tarif flat resmi, tidak ada pembengkakan biaya di akhir pengerjaan.
- Selang Panjang 50 – 100 Meter: Menjangkau rumah di dalam gang sempit tanpa perlu parkir mobil di depan pintu.
- Garansi Tuntas 30 Hari: Jika dalam 30 hari timbul kendala yang sama, tim datang kembali tanpa biaya tambahan.
- Tanpa Bongkar Keramik: Menggunakan teknologi mesin spiral modern yang aman untuk pipa paralon dan keramik.
- Metode Pembayaran: Tunai setelah selesai, Transfer Bank (BCA, Mandiri, BRI, BNI), QRIS resmi di tempat, atau Invoice & Faktur Pajak B2B.
- WhatsApp Direct Dispatch: https://wa.me/6285715654183 (Respon cepat 24 jam).
`;

// API endpoint for Gemini Chatbot
app.post('/api/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      res.status(400).json({ error: 'Pesan pertanyaan tidak boleh kosong.' });
      return;
    }

    const trimmedMessage = message.trim();

    // Check if GEMINI_API_KEY is available
    if (process.env.GEMINI_API_KEY) {
      try {
        const systemInstruction = `
Anda adalah "MitraBot", asisten virtual AI cerdas dari PT MITRA BERSIH 24 JAM (Jasa Sedot WC & Pengumpulan Air Limbah Resmi se-Bogor 24 Jam Nonstop).

PANDUAN MENJAWAB:
1. Jawablah dengan ramah, sopan, percaya diri, jelas, dan profesional dalam Bahasa Indonesia.
2. Gunakan informasi resmi perusahaan berikut untuk memberikan jawaban akurat:
${COMPANY_FAQ_KNOWLEDGE}
3. Tekankan keunggulan utama: Layanan 24 Jam, respon 15-30 menit, harga jujur tanpa biaya siluman, garansi 30 hari, alat modern tanpa bongkar keramik, dan legalitas resmi IPLT Kayumanis.
4. Jika pelanggan menanyakan tarif, sebutkan estimasi harga resmi transparan (misal Sedot WC Rumah Tangga mulai Rp 350.000, Saluran Mampet mulai Rp 250.000).
5. Jika pelanggan menanyakan lokasi atau menanyakan apakah melayani area tertentu di Bogor, tegaskan bahwa armada siap di 5 Pos Siaga (Kota Bogor, Cibinong/Sentul, Dramaga, Ciawi/Puncak, Parung) dan mencakup seluruh Kota & Kabupaten Bogor.
6. Ajak pelanggan dengan ramah untuk langsung order atau konsultasi gratis via WhatsApp CS di nomor +62 857-1565-4183 atau gunakan fitur Booking Tanggal di website.
7. Jaga jawaban tetap ringkas, terstruktur (gunakan poin-poin bila perlu), dan mudah dibaca oleh pengguna ponsel.
`;

        // Build conversation contents including history if available
        const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

        if (Array.isArray(history) && history.length > 0) {
          // Take the last 6 messages to keep context concise
          const recentHistory = history.slice(-6);
          for (const item of recentHistory) {
            if (item && item.text && (item.role === 'user' || item.role === 'model')) {
              contents.push({
                role: item.role,
                parts: [{ text: item.text }]
              });
            }
          }
        }

        // Add user's current message
        contents.push({
          role: 'user',
          parts: [{ text: trimmedMessage }]
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: contents,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
            maxOutputTokens: 800
          }
        });

        const reply = response.text || 'Halo! Terima kasih telah menghubungi PT MITRA BERSIH 24 JAM. Tim kami siaga 24 jam untuk membantu Anda. Silakan hubungi WhatsApp kami di +62 857-1565-4183 untuk respon darurat kilat.';

        res.json({
          reply,
          source: 'gemini',
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        });
        return;
      } catch (geminiError) {
        console.warn('Gemini API call warning, falling back to local FAQ engine:', geminiError);
      }
    }

    // Fallback: Smart local FAQ matcher if API key is temporarily unavailable
    const q = trimmedMessage.toLowerCase();
    let fallbackReply = '';

    if (q.includes('biaya') || q.includes('tarif') || q.includes('harga') || q.includes('ongkos') || q.includes('siluman') || q.includes('tambahan')) {
      fallbackReply = `*Tarif Resmi & Transparan PT MITRA BERSIH 24 JAM:*\n` +
        `• Sedot WC Rumah Tangga: Mulai Rp 350.000 / tangki penuh\n` +
        `• Saluran / Kloset Mampet: Mulai Rp 250.000 / titik (Tanpa Bongkar)\n` +
        `• Septic Tank Gedung / Ruko: Mulai Rp 600.000 / tangki\n` +
        `• Kuras Lemak Grease Trap Restoran: Mulai Rp 450.000 / bak\n` +
        `• Limbah Industri / IPAL: Kontrak resmi / m³ ber-Manifes IPLT.\n\n` +
        `✓ Kami menjamin *TANPA BIAYA SILUMAN* atau biaya tersembunyi. Silakan hubungi CS kami di *+62 857-1565-4183* untuk konfirmasi penawaran!`;
    } else if (q.includes('berapa lama') || q.includes('waktu') || q.includes('kapan') || q.includes('cepat') || q.includes('jam') || q.includes('tiba') || q.includes('datang')) {
      fallbackReply = `Armada PT MITRA BERSIH 24 JAM siaga *24 Jam Nonstop* setiap hari. Dengan 5 Pos Siaga strategis di Kota dan Kabupaten Bogor, estimasi waktu armada tiba di lokasi Anda adalah sekitar *15 hingga 30 menit* setelah pemesanan dikonfirmasi via WhatsApp *+62 857-1565-4183*.`;
    } else if (q.includes('area') || q.includes('wilayah') || q.includes('lokasi') || q.includes('sentul') || q.includes('cibinong') || q.includes('dramaga') || q.includes('ciawi') || q.includes('parung') || q.includes('bogor')) {
      fallbackReply = `Layanan kami mencakup *seluruh wilayah Kota dan Kabupaten Bogor*. Kami menempatkan armada di 5 Pos Siaga utama:\n` +
        `1. Pos Pusat Kota Bogor (Tanah Sareal, Pajajaran, Baranangsiang)\n` +
        `2. Pos Siaga Cibinong & Sentul\n` +
        `3. Pos Siaga Dramaga & Ciomas\n` +
        `4. Pos Siaga Ciawi & Kawasan Puncak\n` +
        `5. Pos Siaga Parung & Bojonggede\n\n` +
        `Truk tangki kami siap meluncur ke alamat Anda tanpa biaya transport tambahan!`;
    } else if (q.includes('bongkar') || q.includes('keramik') || q.includes('pipa') || q.includes('alat') || q.includes('metode') || q.includes('selang')) {
      fallbackReply = `Pengerjaan pelancaran pipa mampet dilakukan *100% TANPA BONGKAR* lantai keramik! Kami menggunakan mesin *spiral baja fleksibel (drain snake)* dan semprotan air bertekanan tinggi modern. Kami juga menyediakan selang panjang hingga *100 meter* yang dapat menjangkau rumah di dalam lorong gang sempit.`;
    } else if (q.includes('garansi') || q.includes('mampet lagi') || q.includes('jaminan')) {
      fallbackReply = `Setiap pekerjaan kami berikan *Garansi Tuntas 30 Hari*. Apabila terjadi keluhan serupa dalam masa garansi, tim teknisi kami akan datang melakukan penanganan ulang tanpa dipungut biaya tambahan.`;
    } else if (q.includes('bayar') || q.includes('pembayaran') || q.includes('rekening') || q.includes('qris') || q.includes('transfer')) {
      fallbackReply = `Metode pembayaran sangat fleksibel dan aman:\n` +
        `1. Tunai langsung kepada petugas setelah pekerjaan tuntas dan Anda periksa.\n` +
        `2. Transfer Bank resmi (BCA, Bank Mandiri, BRI, BNI).\n` +
        `3. QRIS resmi di tempat (BCA Mobile, Livin, GoPay, OVO, DANA, dll).\n` +
        `4. Invoice resmi + Faktur Pajak PPN 11% untuk instansi dan korporat.`;
    } else if (q.includes('legalitas') || q.includes('iplt') || q.includes('izin') || q.includes('resmi') || q.includes('nib') || q.includes('npwp')) {
      fallbackReply = `PT MITRA BERSIH 24 JAM adalah badan usaha berizin resmi:\n` +
        `• NIB: 2605260095769\n` +
        `• NPWP: 3215261111840004\n` +
        `• KBLI 37001 (Pengumpulan Air Limbah)\n` +
        `• Pembuangan resmi ke IPLT Kayumanis Kota Bogor (di bawah pengawasan Dinas Lingkungan Hidup). Limbah diolah secara ramah lingkungan dan bersertifikasi manifes.`;
    } else {
      fallbackReply = `Halo! Saya MitraBot dari *PT MITRA BERSIH 24 JAM* (Jasa Sedot WC & Pelancaran Saluran Mampet Bogor 24 Jam).\n\n` +
        `Kami siap melayani kebutuhan Anda:\n` +
        `• Sedot WC Penuh / Kuras Septic Tank (Mulai Rp 350.000)\n` +
        `• Pelancaran Saluran Mampet Tanpa Bongkar (Mulai Rp 250.000)\n` +
        `• Kuras Lemak Grease Trap & Limbah IPAL Industri\n` +
        `• Armada standby 24 jam (Tiba ~15-30 menit se-Bogor)\n\n` +
        `Ada yang ingin Anda tanyakan lebih lanjut? Anda juga bisa langsung chat WhatsApp CS kami di *+62 857-1565-4183*.`;
    }

    res.json({
      reply: fallbackReply,
      source: 'faq-fallback',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Terjadi kendala pada sistem chatbot.';
    console.error('Chat error:', errorMsg);
    res.status(500).json({
      error: 'Mohon maaf, sistem AI chatbot sedang sibuk. Silakan hubungi WhatsApp kami langsung di +62 857-1565-4183.',
      details: errorMsg
    });
  }
});

// Configure Vite middleware in development or static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[Mitra Bersih 24 Jam] Server running at http://0.0.0.0:${port}`);
  });
}

startServer();
