/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import articleImg1 from './assets/images/septic_tank_signs_1791232849125.jpg';
import articleImg2 from './assets/images/septic_vacuum_truck_1791232864840.jpg';
import articleImg3 from './assets/images/clogged_drain_cleaning_1791232881201.jpg';
import articleImg4 from './assets/images/fresh_drain_garden_1791232895094.jpg';

interface GalleryItem {
  id: number;
  image: string;
  fallbackImage: string;
  title: string;
  description: string;
  alt: string;
}

const GALLERY_DATA: GalleryItem[] = [
  {
    id: 1,
    image: 'https://z-cdn-media.chatglm.cn/files/8b35c692-dce0-460e-9c8c-12dc2dd28a67.jpg?auth_key=1891145358-528231c042254e76abb0a2a5a1e99a0b-0-6ba9fa9ff84c63ed8b7413f69005a108',
    fallbackImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    title: 'Penyedotan Septic Tank',
    description: 'Tim petugas membersihkan septic tank dengan truk sedot profesional.',
    alt: 'Petugas membersihkan septic tank dengan truk sedot'
  },
  {
    id: 2,
    image: 'https://z-cdn-media.chatglm.cn/files/93764afb-0b78-41ec-9859-1723b7981014.jpg?auth_key=1891145358-e3036d2346f44ddab499d0ee91780c1a-0-4b5f27c73cf2fce784eeb806d23ef6e8',
    fallbackImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    title: 'Tim Teknisi Siaga',
    description: 'Tiga teknisi berseragam lengkap bersiap melakukan penanganan pipa.',
    alt: 'Teknisi sedot WC berdiri di depan truk Isuzu'
  },
  {
    id: 3,
    image: 'https://z-cdn-media.chatglm.cn/files/33748952-6a43-47b0-920c-c6cbbceeb719.jpg?auth_key=1891145358-97889be3a24546a2a9f0271e61e6a9a9-0-52fcb6d86bb0c9f1115d1978a78abc83',
    fallbackImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    title: 'Pelancaran Saluran',
    description: 'Pengerjaan pelancaran saluran tersumbat di area pemukiman.',
    alt: 'Pekerja membersihkan saluran di area perkotaan'
  },
  {
    id: 4,
    image: 'https://z-cdn-media.chatglm.cn/files/c701d28f-9ce6-410f-9af1-5bdf6bd82fe4.jpg?auth_key=1891145358-f10d651607cc4ebcb600e88f06f3eda9-0-cadac15e64fade2d6e42565a9da55f4d',
    fallbackImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    title: 'Operasi Armada Sedot',
    description: 'Petugas mengoperasikan pompa penyedot pada truk tangki kami.',
    alt: 'Petugas mengoperasikan truk sedot limbah'
  },
  {
    id: 5,
    image: 'https://z-cdn-media.chatglm.cn/files/55d24ab3-1d3c-4736-beb5-0371dc813146.jpg?auth_key=1891145358-c43c6073058c4960a42f5ce7d7cbd58b-0-dc68fbb11a48f6e16eedbe80d17bb7bd',
    fallbackImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    title: 'Inspeksi Saluran',
    description: 'Technisi memeriksa kondisi saluran limbah di area perumahan.',
    alt: 'Pengecekan saluran pipa oleh teknisi'
  },
  {
    id: 6,
    image: 'https://z-cdn-media.chatglm.cn/files/7efc89d8-0f13-443c-b203-82f00182f517.jpg?auth_key=1891145358-ac532b14e237478a9e2694802c0403b7-0-9e00006dc0a7880924b28ad916f7fb47',
    fallbackImage: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80',
    title: 'Pembukaan Manhole',
    description: 'Proses aman membuka tutup bak kontrol untuk inspeksi lebih lanjut.',
    alt: 'Petugas membuka tutup septic tank'
  },
  {
    id: 7,
    image: 'https://z-cdn-media.chatglm.cn/files/ea99f8ec-d5af-4248-ac08-f9e15af12faf.jpg?auth_key=1891145358-f34e05e963b846bfb3a011ad42d52dd8-0-41fecceb77c1fcf170cfb796fe654b60',
    fallbackImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    title: 'Operasi Selang Sedot',
    description: 'Menjalankan selang penyedot limbah cair secara hati-hati dan terukur.',
    alt: 'Pekerja mengoperasikan selang sedot'
  },
  {
    id: 8,
    image: 'https://z-cdn-media.chatglm.cn/files/dca59c1c-5058-4fc6-8a6a-b9eef25523d9.jpg?auth_key=1891145358-8db531af9f664f438a0ec864ebb08085-0-365027590c53c23da998bea53eecf486',
    fallbackImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    title: 'Armada Mitra Bersih',
    description: 'Truk penyedot kuning kami siaga di lokasi untuk mengerjakan tugas.',
    alt: 'Truk sedot limbah truk kuning Mitra Bersih'
  }
];

const BOGOR_AREAS = [
  'Bogor Barat', 'Bogor Selatan', 'Bogor Tengah', 'Bogor Timur', 'Bogor Utara',
  'Tanah Sareal', 'Babakan Madang', 'Bojonggede', 'Caringin', 'Cariu',
  'Ciampea', 'Ciawi', 'Cibinong', 'Cibungbulang', 'Cigombong',
  'Cigudeg', 'Cijeruk', 'Cileungsi', 'Ciomas', 'Cisarua',
  'Ciseeng', 'Citeureup', 'Dramaga', 'Gunung Putri', 'Gunung Sindur',
  'Jasinga', 'Jonggol', 'Kemang', 'Klapanunggal', 'Leuwiliang',
  'Leuwisadeng', 'Megamendung', 'Nanggung', 'Pamijahan', 'Parung',
  'Parung Panjang', 'Rancabungur', 'Rumpin', 'Sukajaya', 'Sukamakmur',
  'Sukaraja', 'Tajurhalang', 'Tamansari', 'Tanjungsari', 'Tenjo', 'Tenjolaya'
];

interface FAQItem {
  id: number;
  question: string;
  answer: React.ReactNode;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: 'Bagaimana cara pemesanan jasa Sedot WC Mitra Bersih di Bogor?',
    answer: (
      <>
        <p>Cara pemesanan sangat mudah dan cepat tanpa perlu uang muka (DP):</p>
        <ol style={{ paddingLeft: '20px', marginTop: '6px', marginBottom: '8px' }}>
          <li><strong>Hubungi Kami:</strong> Klik tombol WhatsApp atau telepon ke <strong>+62 857-1565-4183</strong> yang aktif 24 jam.</li>
          <li><strong>Konsultasi &amp; Lokasi:</strong> Sampaikan kendala Anda (WC mampet, septic tank penuh, saluran got) serta alamat/share loc di area Bogor.</li>
          <li><strong>Konfirmasi Harga &amp; Kedatangan:</strong> Tim kami memberikan estimasi harga transparan dan langsung meluncurkan armada terdekat ke lokasi Anda.</li>
        </ol>
        <p>Pembayaran baru dilakukan setelah pekerjaan selesai tuntas dan saluran terbukti lancar.</p>
      </>
    )
  },
  {
    id: 2,
    question: 'Berapa lama estimasi armada tiba di lokasi saya di Kota/Kabupaten Bogor?',
    answer: (
      <p>
        Rata-rata armada kami tiba dalam <strong>15 hingga 30 menit</strong> untuk area Kota Bogor dan pusat pemukiman Kabupaten Bogor. Kami menempatkan armada siaga di berbagai pos strategis (seperti Cibinong, Tanah Sareal, Bogor Barat, Ciawi, Sukaraja, Bojonggede, dan Parung) sehingga penanganan darurat dapat dilakukan dengan sangat cepat.
      </p>
    )
  },
  {
    id: 3,
    question: 'Apakah bisa melayani rumah di gang sempit atau perumahan padat?',
    answer: (
      <p>
        <strong>Tentu saja bisa!</strong> Kami memiliki armada truk ukuran kompak yang lincah bermanuver di jalan perumahan, serta dilengkapi <strong>selang sambung berdaya hisap tinggi hingga 50 – 100 meter</strong>. Meskipun truk tidak bisa parkir tepat di depan pintu pagar rumah Anda, penyedotan tetap berjalan maksimal, bersih, dan tuntas.
      </p>
    )
  },
  {
    id: 4,
    question: 'Bagaimana prosedur dan syarat klaim garansi jika saluran mampet lagi?',
    answer: (
      <>
        <p>
          Setiap pengerjaan kami dilengkapi dengan <strong>garansi pengerjaan nyata</strong>:
        </p>
        <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
          <li>Setelah pengerjaan, teknisi akan melakukan uji kelancaran saluran bersama Anda sampai benar-benar tuntas.</li>
          <li>Anda menerima nota pengerjaan resmi dari teknisi Mitra Bersih.</li>
          <li>Jika dalam masa garansi terjadi kendala mampet kembali pada titik yang sama, Anda cukup hubungi nomor WA kami, dan teknisi akan datang melakukan <strong>pengerjaan ulang secara GRATIS</strong>.</li>
        </ul>
      </>
    )
  },
  {
    id: 5,
    question: 'Apakah proses pelancaran WC mampet harus membongkar kloset atau lantai?',
    answer: (
      <p>
        <strong>99% pengerjaan kami TANPA BONGKAR!</strong> Kami menggunakan mesin *electric drain cleaner* spiral baja lentur modern yang berputar mengikuti lekukan pipa pembuangan untuk menghancurkan sumbatan (lemak beku, pembalut, sisa kain, dll.). Keramik lantai dan pipa paralon PVC Anda tetap aman, utuh, dan tidak rusak.
      </p>
    )
  },
  {
    id: 6,
    question: 'Apakah ada biaya tambahan atau biaya tersembunyi (biaya siluman)?',
    answer: (
      <p>
        <strong>Sama sekali tidak ada biaya siluman!</strong> Prinsip kami adalah keterbukaan. Tarif disepakati bersama di awal sebelum pengerjaan dimulai. Jika ada kondisi khusus di lapangan (misalnya penambahan selang ekstra di atas 50 meter atau pembuatan lubang kontrol baru karena septic tank tertutup cor semen mati), teknisi akan menjelaskan dan meminta persetujuan Anda terlebih dahulu.
      </p>
    )
  },
  {
    id: 7,
    question: 'Apakah layanan benar-benar siaga 24 jam termasuk tengah malam dan hari libur?',
    answer: (
      <p>
        <strong>Ya, kami siap siaga 24 Jam Nonstop setiap hari</strong>, termasuk hari Minggu, tengah malam, dan hari libur nasional. Masalah saluran meluap sering kali terjadi tiba-tiba di waktu tak terduga, sehingga tim piket darurat kami selalu siap kapan pun Anda butuhkan.
      </p>
    )
  }
];

interface ArticlePoint {
  heading: string;
  text: string;
}

interface ArticleItem {
  id: number;
  title: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  fallbackImage: string;
  excerpt: string;
  content: {
    intro: string;
    points: ArticlePoint[];
    conclusion: string;
  };
}

const ARTICLES_DATA: ArticleItem[] = [
  {
    id: 1,
    title: '5 Tanda Septic Tank Penuh vs WC Mampet Biasa: Jangan Salah Penanganan!',
    category: 'Panduan Sanitasi',
    readTime: '4 Menit Baca',
    date: '04 Okt 2026',
    image: articleImg1,
    fallbackImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80',
    excerpt: 'Seringkali pemilik rumah menduga klosetnya mampet padahal septic tank sudah meluap penuh. Kenali 5 ciri khasnya agar tidak salah menggunakan obat kimia.',
    content: {
      intro: 'Banyak warga Bogor yang mengira klosetnya tersumbat benda padat dan langsung menuangkan soda api atau cairan kimia keras. Padahal, jika penyebab aslinya adalah penampungan septic tank yang sudah penuh, menuang bahan kimia justru membunuh bakteri pengurai alami dan mempercepat kerusakan dinding resapan tangki.',
      points: [
        {
          heading: '1. Air Kloset Turun Lambat Meskipun Disiram Berkali-kali',
          text: 'Pada WC mampet biasa, air akan langsung meluap naik dan tidak turun sama sekali. Namun jika septic tank penuh, air tetap bisa turun tetapi sangat lambat (membutuhkan waktu 10–20 menit) karena ruang udara di dalam tangki sudah habis terisi lumpur dan air limbah.'
        },
        {
          heading: '2. Tercium Bau Busuk Menyengat di Sekitar Kamar Mandi & Halaman',
          text: 'Septic tank yang sudah overload tidak mampu lagi menyerap gas metana dari penguraian tinja. Akibatnya, bau busuk akan terdorong keluar melalui celah kloset, lubang floor drain, atau celah tutup bak kontrol di halaman rumah.'
        },
        {
          heading: '3. Terdengar Suara "Gluguk-Gluguk" Saat Kloset Dibilas (Flushed)',
          text: 'Suara gelembung udara atau "gluguk" menandakan adanya tekanan balik (backpressure) udara dari dalam tangki septic tank yang sudah tidak memiliki rongga pernapasan karena permukaan air limbah sudah menyentuh leher pipa inlet.'
        },
        {
          heading: '4. Rumput di Sekitar Area Resapan Septic Tank Menghijau Subur',
          text: 'Air limbah yang meluap dari tangki resapan yang jenuh akan merembes ke lapisan tanah atas. Ini menyebabkan rumput atau tanaman di atas septic tank tampak basah becek dan tumbuh jauh lebih subur dibanding area lain di halaman.'
        },
        {
          heading: '5. Sudah Lebih dari 2–3 Tahun Belum Pernah Disedot',
          text: 'Jika usia penggunaan rumah Anda sudah melewati 2 hingga 3 tahun tanpa pengurasan berkala, hampir dapat dipastikan endapan lumpur feses padat di dasar tangki sudah menumpuk dan menutupi pori-pori tanah resapan.'
        }
      ],
      conclusion: 'Jika Anda menemukan tanda-tanda di atas, hindari menuang bahan kimia tajam. Segera hubungi jasa sedot WC profesional untuk pengurasan tangki secara tuntas agar kloset dapat digunakan kembali dengan normal dan higienis.'
    }
  },
  {
    id: 2,
    title: 'Berapa Tahun Sekali Waktu Ideal Kuras Septic Tank Rumah Tangga?',
    category: 'Tips Perawatan',
    readTime: '3 Menit Baca',
    date: '28 Sep 2026',
    image: articleImg2,
    fallbackImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=80',
    excerpt: 'Standar baku Kementerian Kesehatan dan SNI merekomendasikan pengurasan septic tank secara terjadwal. Mengapa tidak boleh menunggu sampai mampet dulu?',
    content: {
      intro: 'Sebagian besar masyarakat baru memanggil jasa sedot WC ketika kloset sudah benar-benar meluap atau tidak bisa digunakan. Padahal, membiarkan septic tank penuh terlalu lama dapat mencemari air tanah sumur bor dangkal di pemukiman padat penduduk seperti di Kota dan Kabupaten Bogor.',
      points: [
        {
          heading: '1. Rekomendasi Waktu Ideal: 2 Sampai 3 Tahun Sekali',
          text: 'Untuk rumah tangga beranggotakan 4–6 orang dengan kapasitas septic tank standar (1.500–2.000 liter), pengurasan ideal wajib dilakukan setiap 2 hingga 3 tahun sekali. Waktu ini cukup untuk menjaga keseimbangan bakteri pengurai dan mencegah penumpukan lumpur mati (sludge).'
        },
        {
          heading: '2. Mencegah Kristalisasi Lumpur di Dinding Resapan',
          text: 'Lumpur tinja yang dibiarkan bertahun-tahun akan mengeras seperti lempung atau semen di dasar septic tank. Kondisi ini menutup pori-pori tanah sehingga air tidak bisa meresap lagi, menyebabkan septic tank akan sangat cepat penuh kembali meskipun baru disedot airnya.'
        },
        {
          heading: '3. Menjaga Kebersihan Sumber Air Sumur Warga',
          text: 'Jarak aman septic tank ke sumur resapan air minum menurut standar kesehatan adalah minimal 10–11 meter. Pada perumahan padat, rembesan septic tank yang meluap berpotensi tinggi mencemari sumber air tanah dengan bakteri berbahaya seperti E. Coli.'
        },
        {
          heading: '4. Lebih Hemat Biaya Dibandingkan Perbaikan Total',
          text: 'Biaya sedot WC berkala jauh lebih murah (hanya sekitar Rp 350rb - 450rb per rit) dibandingkan biaya pembongkaran lantai dan pembuatan bak resapan baru yang bisa menelan biaya jutaan rupiah.'
        }
      ],
      conclusion: 'Jangan tunggu sampai air kloset meluap ke lantai kamar mandi. Jadwalkan sedot septic tank rutin keluarga Anda bersama Mitra Bersih untuk menjaga sanitasi lingkungan yang sehat dan nyaman.'
    }
  },
  {
    id: 3,
    title: 'Penyebab Utama Saluran Kamar Mandi & Wastafel Mampet Serta Solusinya',
    category: 'Solusi Saluran',
    readTime: '5 Menit Baca',
    date: '15 Sep 2026',
    image: articleImg3,
    fallbackImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=700&q=80',
    excerpt: 'Lemak sisa cucian piring membeku dan rontokan rambut adalah biang keladi 80% saluran mampet. Simak cara pencegahannya secara efektif tanpa merusak pipa.',
    content: {
      intro: 'Saluran pembuangan air kotor di dapur (kitchen sink) dan kamar mandi seringkali tersumbat secara tiba-tiba. Menyiram air berkali-kali seringkali justru membuat genangan semakin tinggi dan menimbulkan bau menyengat.',
      points: [
        {
          heading: '1. Pembekuan Lemak dan Minyak Goreng (Grease Trap)',
          text: 'Minyak goreng atau sisa kuah berlemak yang dibuang ke wastafel akan mendingin dan menempel di dinding pipa PVC. Lambat laun lapisan kerak lemak ini menebal hingga menutup seluruh rongga pipa.'
        },
        {
          heading: '2. Gumpalan Rambut & Residu Sabun Mandi',
          text: 'Pada floor drain kamar mandi, rambut yang rontok saat mandi akan tersangkut di lekukan pipa P-Trap dan bercampur dengan lemak buih sabun. Campuran ini membentuk sumbatan serat yang sangat liat dan sulit larut dengan air biasa.'
        },
        {
          heading: '3. Kemiringan (Slope) Pipa yang Kurang Curam',
          text: 'Kesalahan instalasi saluran pembuangan dengan kemiringan yang landai menyebabkan aliran air lambat, sehingga kotoran padat mudah mengendap di tengah perjalanan pipa sebelum sampai ke bak kontrol.'
        },
        {
          heading: '4. Mengapa Penggunaan Soda Api Sangat Berisiko?',
          text: 'Soda api bekerja dengan menimbulkan reaksi panas ekstrem. Pada pipa PVC standar, panas ini dapat melunakkan pipa hingga peot, membuat sambungan lem sambungan lepas, atau bahkan memicu kebocoran di balik dinding/lantai yang sangat mahal biaya perbaikannya.'
        },
        {
          heading: '5. Solusi Aman: Mesin Spiral Lentur (Drain Snake)',
          text: 'Solusi terbaik dan aman adalah menggunakan mesin pelancar saluran bertenaga listrik dengan kawat spiral baja fleksibel. Kawat ini berputar menembus belokan pipa dan mencacah sumbatan hingga terlepas tanpa risiko merusak fisik pipa.'
        }
      ],
      conclusion: 'Selalu pasang saringan rambut di floor drain dan buang minyak sisa ke tempat sampah. Jika saluran sudah tersumbat parah, hubungi tim pelancaran saluran Mitra Bersih 24 jam untuk penanganan cepat tanpa bongkar.'
    }
  },
  {
    id: 4,
    title: 'Cara Alami Menghilangkan Bau Got dan Bak Kontrol Septic Tank di Rumah',
    category: 'Kesehatan Rumah',
    readTime: '3 Menit Baca',
    date: '05 Sep 2026',
    image: articleImg4,
    fallbackImage: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=700&q=80',
    excerpt: 'Bau tidak sedap yang naik ke kamar mandi sangat mengganggu kenyamanan. Kenali cara periksa pipa ventilasi T dan pemanfaatan bakteri pengurai biologis.',
    content: {
      intro: 'Bau menyengat menyerupai telur busuk atau got di dalam rumah seringkali muncul terutama saat musim hujan atau saat cuaca terik. Sumber bau ini adalah gas hidrogen sulfida dan metana yang dihasilkan dari proses fermentasi kotoran di dalam septic tank.',
      points: [
        {
          heading: '1. Pastikan Air Pada Leher Angsa (Water Seal) Selalu Terisi',
          text: 'Kloset duduk maupun jongkok didesain dengan leher angsa yang menahan genangan air bersih. Air ini berfungsi sebagai "pintu air" penahan gas bau dari septic tank. Jika kloset jarang digunakan, air bisa menguap dan menyebabkan bau leluasa masuk ke ruangan.'
        },
        {
          heading: '2. Periksa Pipa Ventilasi Udara (Vent Pipe) Septic Tank',
          text: 'Setiap septic tank wajib memiliki cerobong pipa ventilasi T setinggi minimal 2 meter agar gas pembuangan keluar ke udara bebas. Periksa apakah ujung pipa tersumbat sarang burung, dedaunan kering, atau serangga.'
        },
        {
          heading: '3. Tambahkan Probiotik Bakteri Pengurai Hayati',
          text: 'Alih-alih menggunakan pewangi kimiawi yang hanya menyamarkan bau sementara, berikan bakteri pengurai hayati ke dalam kloset. Bakteri menguntungkan ini akan mempercepat penguraian feses padat dan menekan populasi bakteri anaerob penghasil gas berbau tajam.'
        },
        {
          heading: '4. Periksa Kerapatan Tutup Bak Kontrol',
          text: 'Tutup manhole atau bak kontrol di garasi/halaman yang retak atau tidak rapat harus diperbaiki dengan menambahkan karet silikon atau semen penutup agar uap bau tidak menyebar ke teras rumah.'
        }
      ],
      conclusion: 'Menjaga sirkulasi udara septic tank dan menambah bakteri pengurai secara teratur akan membuat hunian Anda senantiasa segar, sehat, dan bebas dari aroma tak sedap.'
    }
  }
];

interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  location: string;
  serviceType: string;
  comment: string;
  date: string;
  verified?: boolean;
}

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Budi Santoso',
    rating: 5,
    location: 'Bogor Barat',
    serviceType: 'Sedot WC Rumah Tangga',
    comment: 'Pelayanannya sangat cepat dan profesional! Saya telepon malam jam 21.00, kurang dari 30 menit langsung datang. WC mampet langsung beres tuntas tanpa bau.',
    date: '04 Okt 2026',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Hj. Siti Rahayu',
    rating: 5,
    location: 'Tanah Sareal',
    serviceType: 'Kuras Total Lumpur Septic Tank',
    comment: 'Harga transparan, tidak menaikkan harga di tengah pekerjaan. Petugasnya ramah dan bersih. Septic tank penuh yang mengeras langsung disedot bersih total.',
    date: '02 Okt 2026',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Ahmad Hidayat',
    rating: 5,
    location: 'Cibinong',
    serviceType: 'Sedot Limbah STP Restoran',
    comment: 'Sudah langganan untuk ruko cafe kami di Cibinong. Selalu tepat waktu, armada bersih, selang panjang tanpa merusak fasilitas toko.',
    date: '28 Sep 2026',
    verified: true
  },
  {
    id: 'rev-4',
    name: 'Hendra Kusuma',
    rating: 5,
    location: 'Sentul City, Babakan Madang',
    serviceType: 'Sedot WC Rumah Tangga',
    comment: 'Luar biasa responnya. Kloset anak mampet terisi mainan, diatasi dengan mesin spiral tanpa bongkar keramik lantai sama sekali. Sangat rekomen untuk warga Bogor!',
    date: '25 Sep 2026',
    verified: true
  },
  {
    id: 'rev-5',
    name: 'Dewi Anggraeni',
    rating: 5,
    location: 'Bogor Selatan (Ciomas)',
    serviceType: 'Pelancaran Saluran Mampet',
    comment: 'Wastafel dapur mampet parah karena lemak beku. Dikerjakan rapi sekali, bau got langsung hilang dan air mengalir deras kembali. Ongkos terjangkau!',
    date: '19 Sep 2026',
    verified: true
  },
  {
    id: 'rev-6',
    name: 'dr. Irfan Gunawan',
    rating: 5,
    location: 'Baranangsiang, Bogor Timur',
    serviceType: 'Kuras Septic Tank & Bakteri',
    comment: 'Teknisi Mitra Bersih sangat edukatif menjelaskan siklus septic tank dan sirkulasi pipa ventilasi. Garansi pekerjaannya nyata dan pengerjaan cepat.',
    date: '12 Sep 2026',
    verified: true
  }
];

const STAR_TEXTS: Record<number, string> = {
  1: '⭐ (1/5) Tidak Puas - Pelayanan Kurang Sesuai',
  2: '⭐⭐ (2/5) Kurang Puas - Perlu Ditingkatkan',
  3: '⭐⭐⭐ (3/5) Cukup Baik - Standar Layanan Oke',
  4: '⭐⭐⭐⭐ (4/5) Sangat Baik - Cepat & Rapi',
  5: '⭐⭐⭐⭐⭐ (5/5) Luar Biasa - Sangat Puas & Merekomendasikan'
};

const WA_QUICK_TOPICS = [
  {
    id: 'wc-mampet',
    icon: 'fas fa-toilet',
    label: 'WC Mampet & Meluap',
    desc: 'Bantuan darurat kilat',
    text: 'Halo Mitra Bersih, kloset WC saya mampet / meluap. Mohon bantuan armada terdekat ke lokasi saya di Bogor.'
  },
  {
    id: 'kuras-septic',
    icon: 'fas fa-truck',
    label: 'Kuras Septic Tank',
    desc: 'Sedot tuntas sampai dasar',
    text: 'Halo Mitra Bersih, septic tank rumah saya sudah penuh. Mohon info biaya dan jadwal sedot WC Bogor.'
  },
  {
    id: 'saluran-pipa',
    icon: 'fas fa-faucet',
    label: 'Saluran Air / Got Mampet',
    desc: 'Mesin spiral tanpa bongkar',
    text: 'Halo Mitra Bersih, saluran air / wastafel saya tersumbat lemak. Butuh pelancaran pipa tanpa bongkar di Bogor.'
  },
  {
    id: 'limbah-stp',
    icon: 'fas fa-industry',
    label: 'Sedot Lemak / Grease Trap',
    desc: 'Ruko, resto & pabrik',
    text: 'Halo Mitra Bersih, saya butuh penanganan sedot grease trap / limbah IPAL resto di Bogor. Mohon penawaran harga.'
  }
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(1);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [selectedWaTopic, setSelectedWaTopic] = useState(0);

  // Ulasan Pelanggan & Carousel State
  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem('mitra_bersih_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_REVIEWS;
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formHoverRating, setFormHoverRating] = useState(0);
  const [formLocation, setFormLocation] = useState('Bogor Barat');
  const [formService, setFormService] = useState('Sedot WC Rumah Tangga');
  const [formComment, setFormComment] = useState('');
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Responsive Items Per Page
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const maxSlideIndex = Math.max(0, reviews.length - itemsPerPage);

  // Auto slide effect
  useEffect(() => {
    if (isCarouselPaused || isFormOpen) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlideIndex ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [maxSlideIndex, isCarouselPaused, isFormOpen]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlideIndex ? 0 : prev + 1));
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlideIndex : prev - 1));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: formName.trim(),
      rating: formRating,
      location: formLocation || 'Bogor',
      serviceType: formService,
      comment: formComment.trim(),
      date: 'Baru saja',
      verified: true
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem('mitra_bersih_reviews', JSON.stringify(updated));
    } catch {
      // storage error
    }

    setFormSuccess(`Terima kasih Bapak/Ibu ${formName.trim()}! Ulasan bintang ${formRating} Anda telah berhasil diterbitkan.`);
    setFormName('');
    setFormComment('');
    setFormRating(5);
    setIsFormOpen(false);
    setCurrentSlide(0);
  };

  // Scroll spy & navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ['home', 'layanan', 'tentang', 'faq', 'galeri', 'artikel', 'ulasan', 'kontak'];
      const scrollPos = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer for animation classes
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const fadeEls = document.querySelectorAll('.fade-in');
    fadeEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Escape key handler for lightbox & article modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxImg) setLightboxImg(null);
        if (selectedArticle) setSelectedArticle(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImg, selectedArticle]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.getElementById(targetId);
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="logo">
            <div className="logo-icon">
              <i className="fas fa-truck"></i>
            </div>
            <div className="logo-text">
              <strong>SEDOT WC</strong>
              <span>MITRA BERSIH 24JAM</span>
            </div>
          </a>

          <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
            <li>
              <a
                href="#home"
                onClick={(e) => scrollToSection(e, 'home')}
                className={activeSection === 'home' ? 'active' : ''}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#layanan"
                onClick={(e) => scrollToSection(e, 'layanan')}
                className={activeSection === 'layanan' ? 'active' : ''}
              >
                Layanan
              </a>
            </li>
            <li>
              <a
                href="#tentang"
                onClick={(e) => scrollToSection(e, 'tentang')}
                className={activeSection === 'tentang' ? 'active' : ''}
              >
                Tentang Kami
              </a>
            </li>
            <li>
              <a
                href="#faq"
                onClick={(e) => scrollToSection(e, 'faq')}
                className={activeSection === 'faq' ? 'active' : ''}
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                href="#galeri"
                onClick={(e) => scrollToSection(e, 'galeri')}
                className={activeSection === 'galeri' ? 'active' : ''}
              >
                Galeri
              </a>
            </li>
            <li>
              <a
                href="#artikel"
                onClick={(e) => scrollToSection(e, 'artikel')}
                className={activeSection === 'artikel' ? 'active' : ''}
              >
                Tips &amp; Artikel
              </a>
            </li>
            <li>
              <a
                href="#ulasan"
                onClick={(e) => scrollToSection(e, 'ulasan')}
                className={activeSection === 'ulasan' ? 'active' : ''}
              >
                Ulasan
              </a>
            </li>
            <li>
              <a
                href="#kontak"
                onClick={(e) => scrollToSection(e, 'kontak')}
                className={activeSection === 'kontak' ? 'active' : ''}
              >
                Kontak
              </a>
            </li>
          </ul>

          <div className="nav-actions">
            <a
              href="tel:+6285715654183"
              className="nav-call-btn"
              title="Klik untuk Telepon Langsung"
            >
              <i className="fas fa-phone-alt"></i>
              <span className="call-full-text">Klik untuk Telepon</span>
              <span className="call-short-text">Telepon</span>
            </a>

            <a
              href="https://wa.me/6285715654183"
              className="nav-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="dot"></span>
              <span>Layanan 24 Jam</span>
              <span className="phone-text">· +62 857-1565-4183</span>
            </a>

            <button
              className={`hamburger ${menuOpen ? 'active' : ''}`}
              id="hamburger"
              aria-label="Menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <span className="decoration bubble bubble-1"></span>
        <span className="decoration bubble bubble-2"></span>
        <span className="decoration bubble bubble-3"></span>
        <i className="fas fa-plus decoration cross-icon"></i>
        <span className="decoration triangle"></span>
        <span className="decoration diamond"></span>
        <span className="decoration circle-outline"></span>
        <span className="decoration dot-pattern"></span>

        <div className="container">
          <div className="hero-content fade-in">
            <div className="hero-badge">
              <span className="dot"></span>
              Online Sekarang · Siap Datang Ke Lokasi Anda
            </div>
            <h1>
              SEDOT WC BOGOR<br />MITRA BERSIH 24JAM
              <span className="highlight">
                Butuh jasa sedot wc Bogor panggilan darurat? Kami melayani sedot wc kota Bogor &amp; kabupaten Bogor 24 jam. Kuras septic tank cepat, wc mampet beres, datang cepat ke lokasi!
              </span>
            </h1>
            <a
              href="https://wa.me/6285715654183?text=Halo,%20saya%20ingin%20booking%20layanan%20sedot%20wc%20Bogor%20sekarang"
              className="hero-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-phone-alt"></i>
              PANGGIL SEKARANG · +62 857-1565-4183
            </a>
            <div className="hero-stats">
              <div className="stat">
                <strong>24/7</strong>
                <span>Layanan Siaga</span>
              </div>
              <div className="stat">
                <strong>15+</strong>
                <span>Tahun Pengalaman</span>
              </div>
              <div className="stat">
                <strong>5000+</strong>
                <span>Pelanggan Puas</span>
              </div>
            </div>
          </div>

          <div className="hero-visual fade-in fade-in-delay-1">
            <div className="truck-card">
              {/* Truck Illustration SVG */}
              <svg className="truck-svg" viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg">
                {/* Ground shadow */}
                <ellipse cx="250" cy="320" rx="200" ry="12" fill="rgba(255,214,10,0.15)" />

                {/* House Background */}
                <g opacity="0.4">
                  <rect x="20" y="120" width="100" height="100" fill="#FFD60A" rx="4" />
                  <polygon points="20,120 70,80 120,120" fill="#FFD60A" />
                  <rect x="40" y="150" width="20" height="20" fill="#111111" opacity="0.6" />
                  <rect x="80" y="150" width="20" height="20" fill="#111111" opacity="0.6" />
                  <rect x="55" y="185" width="30" height="35" fill="#111111" opacity="0.6" />

                  <rect x="380" y="100" width="90" height="120" fill="#FFD60A" opacity="0.5" rx="4" />
                  <polygon points="380,100 425,70 470,100" fill="#FFD60A" opacity="0.5" />
                  <rect x="395" y="130" width="15" height="15" fill="#111111" opacity="0.4" />
                  <rect x="425" y="130" width="15" height="15" fill="#111111" opacity="0.4" />
                  <rect x="395" y="160" width="15" height="15" fill="#111111" opacity="0.4" />
                  <rect x="425" y="160" width="15" height="15" fill="#111111" opacity="0.4" />
                </g>

                {/* Truck Body Main Tank */}
                <rect x="80" y="140" width="240" height="110" fill="#FFD60A" rx="20" stroke="#111111" stroke-width="3" />

                {/* Tank Details */}
                <rect x="95" y="155" width="210" height="50" fill="rgba(17,17,17,0.1)" rx="8" />

                {/* MITRA BERSIH Text */}
                <text x="200" y="185" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="20" fontWeight="900" fill="#111111">MITRA BERSIH</text>
                <text x="200" y="205" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="11" fontWeight="600" fill="#111111" opacity="0.7">24 JAM SERVICE</text>

                {/* Flame/Drop Logo on Tank */}
                <g transform="translate(200, 225)">
                  <circle cx="0" cy="0" r="14" fill="#111111" />
                  <path d="M -6,-2 Q -6,-8 0,-10 Q 6,-8 6,-2 Q 6,4 0,6 Q -6,4 -6,-2 Z" fill="#FFD60A" />
                </g>

                {/* Truck Cab */}
                <rect x="320" y="170" width="100" height="80" fill="#111111" rx="12" />
                <rect x="332" y="180" width="76" height="40" fill="#FFD60A" rx="6" />
                <rect x="340" y="188" width="60" height="24" fill="rgba(17,17,17,0.3)" rx="3" />

                {/* Cab Details */}
                <rect x="335" y="225" width="20" height="20" fill="#FFD60A" rx="3" />
                <text x="345" y="240" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="8" fontWeight="700" fill="#111111">24J</text>

                {/* Headlight */}
                <circle cx="415" cy="220" r="6" fill="#FFD60A" />
                <circle cx="415" cy="220" r="3" fill="#FFFFFF" />

                {/* Wheels */}
                <circle cx="130" cy="260" r="24" fill="#111111" />
                <circle cx="130" cy="260" r="12" fill="#FFD60A" />
                <circle cx="130" cy="260" r="6" fill="#111111" />

                <circle cx="220" cy="260" r="24" fill="#111111" />
                <circle cx="220" cy="260" r="12" fill="#FFD60A" />
                <circle cx="220" cy="260" r="6" fill="#111111" />

                <circle cx="370" cy="260" r="24" fill="#111111" />
                <circle cx="370" cy="260" r="12" fill="#FFD60A" />
                <circle cx="370" cy="260" r="6" fill="#111111" />

                {/* Hose from truck */}
                <path d="M 90 230 Q 50 240 30 270" stroke="#111111" strokeWidth="8" fill="none" strokeLinecap="round" />
                <path d="M 90 230 Q 50 240 30 270" stroke="#FFD60A" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="6,4" />

                {/* Worker 1 (left, holding hose) */}
                <g transform="translate(30, 240)">
                  <rect x="-12" y="0" width="24" height="40" fill="#111111" rx="4" />
                  <rect x="-12" y="14" width="24" height="4" fill="#FFD60A" />
                  <circle cx="0" cy="-8" r="10" fill="#FFD60A" />
                  <path d="M -12 -10 Q -12 -22 0 -22 Q 12 -22 12 -10 L 12 -8 L -12 -8 Z" fill="#111111" />
                  <rect x="-18" y="6" width="12" height="6" fill="#FFD60A" rx="2" transform="rotate(20)" />
                  <rect x="-10" y="40" width="8" height="20" fill="#111111" />
                  <rect x="2" y="40" width="8" height="20" fill="#111111" />
                </g>

                {/* Worker 2 (right, holding hose) */}
                <g transform="translate(450, 240)">
                  <rect x="-12" y="0" width="24" height="40" fill="#111111" rx="4" />
                  <rect x="-12" y="14" width="24" height="4" fill="#FFD60A" />
                  <circle cx="0" cy="-8" r="10" fill="#FFD60A" />
                  <path d="M -12 -10 Q -12 -22 0 -22 Q 12 -22 12 -10 L 12 -8 L -12 -8 Z" fill="#111111" />
                  <rect x="6" y="6" width="12" height="6" fill="#FFD60A" rx="2" transform="rotate(-20)" />
                  <rect x="-10" y="40" width="8" height="20" fill="#111111" />
                  <rect x="2" y="40" width="8" height="20" fill="#111111" />
                </g>

                {/* Sparkles/Clean indicators */}
                <g opacity="0.8">
                  <g transform="translate(150, 100)">
                    <path d="M 0,-8 L 2,-2 L 8,0 L 2,2 L 0,8 L -2,2 L -8,0 L -2,-2 Z" fill="#FFD60A" />
                  </g>
                  <g transform="translate(280, 90)">
                    <path d="M 0,-6 L 1.5,-1.5 L 6,0 L 1.5,1.5 L 0,6 L -1.5,1.5 L -6,0 L -1.5,-1.5 Z" fill="#FFD60A" />
                  </g>
                  <g transform="translate(350, 130)">
                    <path d="M 0,-5 L 1,-1 L 5,0 L 1,1 L 0,5 L -1,1 L -5,0 L -1,-1 Z" fill="#FFD60A" />
                  </g>
                </g>
              </svg>
            </div>

            <div className="hero-tags tag-1">
              <i className="fas fa-shield-alt"></i>
              <span>Bergaransi</span>
            </div>
            <div className="hero-tags tag-2">
              <i className="fas fa-bolt"></i>
              <span>Respon 15 Menit</span>
            </div>
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="wave-bottom">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,60 C240,100 480,20 720,40 C960,60 1200,100 1440,60 L1440,120 L0,120 Z" fill="#F0F7FA" />
          </svg>
        </div>
      </section>

      {/* LAYANAN */}
      <section className="layanan" id="layanan">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-badge">LAYANAN KAMI</span>
            <h2 className="section-title">Solusi Tuntas untuk<br />Setiap Masalah Saluran</h2>
            <p className="section-subtitle">
              Layanan sedot wc Bogor profesional dengan armada modern dan tukang sedot wc berpengalaman untuk menangani kebutuhan saluran dan limbah Anda.
            </p>
          </div>

          <div className="services-grid">
            <div className="service-card fade-in">
              <div className="service-icon">
                <i className="fas fa-truck-loading"></i>
              </div>
              <h3>Sedot WC &amp; Septic Tank</h3>
              <p>
                Layanan kuras septic tank &amp; sedot tinja Bogor untuk rumah, ruko, dan kantor. Mengatasi septic tank penuh atau meluap. Tarif sedot wc Bogor murah, harga per tangki transparan tanpa biaya tambahan.
              </p>
              <a
                href="https://wa.me/6285715654183?text=Halo,%20saya%20ingin%20pesan%20layanan%20Sedot%20WC%20Bogor"
                className="service-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pelajari <i className="fas fa-arrow-right"></i>
              </a>
            </div>

            <div className="service-card fade-in fade-in-delay-1">
              <div className="service-icon">
                <i className="fas fa-faucet"></i>
              </div>
              <h3>Pelancaran Saluran Mampet</h3>
              <p>
                Jasa wc mampet Bogor dan saluran mampet bogor (wastafel, kamar mandi, got). Mengatasi wc bau dan sedot kamar mandi tanpa bongkar, hemat biaya. Tukang sedot wc terdekat Bogor datang cepat.
              </p>
              <a
                href="https://wa.me/6285715654183?text=Halo,%20saya%20ingin%20pesan%20layanan%20Pelancaran%20Saluran%20Mampet%20Bogor"
                className="service-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pelajari <i className="fas fa-arrow-right"></i>
              </a>
            </div>

            <div className="service-card fade-in fade-in-delay-2">
              <div className="service-icon">
                <i className="fas fa-industry"></i>
              </div>
              <h3>Sedot Limbah &amp; Ipal</h3>
              <p>
                Sedot grease trap Bogor, sedot ipal Bogor, dan sedot limbah Bogor untuk pabrik/industri. Penanganan profesional dengan standar lingkungan tinggi. Booking sedot wc Bogor hari ini via WA.
              </p>
              <a
                href="https://wa.me/6285715654183?text=Halo,%20saya%20ingin%20pesan%20layanan%20Sedot%20Limbah%20STP%20Bogor"
                className="service-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pelajari <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="why-us" id="tentang">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-badge">KEUNGGULAN</span>
            <h2 className="section-title">Jasa Sedot WC Bogor Terpercaya</h2>
            <p className="section-subtitle">
              Kami berkomitmen memberikan layanan sedot wc Bogor 24 jam terpercaya dengan keunggulan yang tidak akan Anda temukan di tempat lain.
            </p>
          </div>

          <div className="why-grid">
            <div className="why-card fade-in">
              <div className="why-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="why-content">
                <h3>Sedot WC Bogor 24 Jam</h3>
                <p>
                  Butuh sedot wc bogor darurat? Tim kami siap melayani 24 jam penuh. Baik siang, malam, atau hari libur — kami selalu siap datang cepat ke lokasi Anda.
                </p>
              </div>
            </div>

            <div className="why-card fade-in fade-in-delay-1">
              <div className="why-icon">
                <i className="fas fa-user-tie"></i>
              </div>
              <div className="why-content">
                <h3>Tim Ahli &amp; Profesional</h3>
                <p>
                  Ditangani oleh tukang sedot wc Bogor berpengalaman. Setiap petugas berseragam rapi, ramah, dan menjaga kebersihan lokasi kerja Anda.
                </p>
              </div>
            </div>

            <div className="why-card fade-in fade-in-delay-2">
              <div className="why-icon">
                <i className="fas fa-truck-moving"></i>
              </div>
              <div className="why-content">
                <h3>Armada Modern &amp; Bersih</h3>
                <p>
                  Truk tangki modern dengan sistem penyedot berteknologi tinggi. Semua kendaraan dirawat rutin, memastikan proses sedot septic tank Bogor berjalan lancar.
                </p>
              </div>
            </div>

            <div className="why-card fade-in fade-in-delay-3">
              <div className="why-icon">
                <i className="fas fa-tags"></i>
              </div>
              <div className="why-content">
                <h3>Biaya Transparan</h3>
                <p>
                  Harga sedot wc Bogor transparan. Tidak ada biaya tambahan. Biaya sedot wc Bogor sesuai kapasitas dan jarak lokasi, dengan harga per tangki yang jelas di awal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / TESTIMONI */}
      <section className="trust">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-badge">TESTIMONI</span>
            <h2 className="section-title">Kepercayaan Pelanggan</h2>
            <p className="section-subtitle">
              Ribuan pelanggan telah mempercayai layanan sedot wc Bogor murah kami. Berikut adalah beberapa testimoni dari mereka.
            </p>
          </div>

          <div className="badges-row fade-in">
            <div className="badge-pill">
              <i className="fas fa-star"></i>
              <span>98% Kepuasan</span>
            </div>
            <div className="badge-pill">
              <i className="fas fa-bolt"></i>
              <span>Respon Cepat</span>
            </div>
            <div className="badge-pill">
              <i className="fas fa-shield-alt"></i>
              <span>Layanan Terjamin</span>
            </div>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card fade-in">
              <i className="fas fa-quote-right quote-icon"></i>
              <div className="stars">
                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
              </div>
              <p className="testimonial-text">
                &ldquo;Pelayanannya sangat cepat dan profesional. Saya telepon malam, kurang dari 30 menit langsung datang. WC mampet saya langsung beres. Sedot wc Bogor terdekat yang pernah saya pakai!&rdquo;
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">B</div>
                <div className="author-info">
                  <strong>Budi Santoso</strong>
                  <span>Bogor Barat</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card fade-in fade-in-delay-1">
              <i className="fas fa-quote-right quote-icon"></i>
              <div className="stars">
                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
              </div>
              <p className="testimonial-text">
                &ldquo;Harga transparan, tidak menaikkan harga di tengah pekerjaan. Petugasnya ramah dan bersih. Septic tank penuh langsung teratasi. Terima kasih jasa kuras wc Bogor Mitra Bersih!&rdquo;
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">S</div>
                <div className="author-info">
                  <strong>Siti Rahayu</strong>
                  <span>Tanah Sareal</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card fade-in fade-in-delay-2">
              <i className="fas fa-quote-right quote-icon"></i>
              <div className="stars">
                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
              </div>
              <p className="testimonial-text">
                &ldquo;Sudah langganan untuk sedot limbah STP di ruko saya. Selalu tepat waktu, armada bersih, dan pelayanan ramah. Sangat membantu kelancaran usaha saya di Cibinong.&rdquo;
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">A</div>
                <div className="author-info">
                  <strong>Ahmad Hidayat</strong>
                  <span>Cibinong</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ (PERTANYAAN SERING DIAJUKAN) */}
      <section className="faq-section" id="faq">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-badge">TANYA JAWAB</span>
            <h2 className="section-title">Pertanyaan Sering Diajukan<br />(FAQ Pelanggan)</h2>
            <p className="section-subtitle">
              Jawaban lengkap seputar cara pemesanan, jangkauan wilayah spesifik Bogor, estimasi waktu kedatangan, prosedur garansi, dan transparansi tarif Mitra Bersih.
            </p>
          </div>

          <div className="faq-container fade-in">
            <div className="faq-list">
              {FAQ_DATA.map((item) => {
                const isOpen = openFaq === item.id;
                return (
                  <div
                    key={item.id}
                    className={`faq-item ${isOpen ? 'active' : ''}`}
                  >
                    <button
                      type="button"
                      className="faq-question"
                      onClick={() => setOpenFaq(isOpen ? null : item.id)}
                      aria-expanded={isOpen}
                    >
                      <div className="faq-question-text">
                        <span className="faq-q-badge">{item.id}</span>
                        <span>{item.question}</span>
                      </div>
                      <div className="faq-toggle-icon">
                        <i className={`fas ${isOpen ? 'fa-minus' : 'fa-plus'}`}></i>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="faq-answer">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Contact Box inside FAQ */}
            <div className="faq-cta-card fade-in">
              <div className="faq-cta-info">
                <h4>Punya Pertanyaan Spesifik Lainnya?</h4>
                <p>Konsultasikan kendala saluran atau septic tank Anda secara gratis bersama customer support teknis kami sekarang.</p>
              </div>
              <a
                href="https://wa.me/6285715654183?text=Halo%20Mitra%20Bersih,%20saya%20ingin%20tanya%20seputar%20layanan%20sedot%20WC%20di%20Bogor"
                className="faq-cta-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp"></i>
                Tanya CS Kami (24 Jam)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* GALERI */}
      <section className="galeri" id="galeri">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-badge">DOKUMENTASI</span>
            <h2 className="section-title">Galeri Aktivitas Kami</h2>
            <p className="section-subtitle">
              Bukti nyata pengerjaan jasa sedot wc kabupaten Bogor oleh tim profesional kami dengan armada modern.
            </p>
          </div>

          <div className="gallery-grid fade-in">
            {GALLERY_DATA.map((item) => (
              <div
                key={item.id}
                className="gallery-item"
                data-image={item.image}
                onClick={() => setLightboxImg(item.image)}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to reliable placeholder if CDN URL has expired auth
                    const target = e.currentTarget;
                    if (target.src !== item.fallbackImage) {
                      target.src = item.fallbackImage;
                    }
                  }}
                />
                <div className="gallery-icon">
                  <i className="fas fa-expand"></i>
                </div>
                <div className="gallery-overlay">
                  <div className="content">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION HUBUNGI KAMI VIA WHATSAPP (CTA INTERAKTIF BESAR) */}
      <section className="wa-section" id="hubungi-wa">
        <div className="container">
          <div className="wa-card fade-in">
            <div className="wa-card-content">
              <div className="wa-live-badge">
                <span className="wa-live-dot"></span>
                <span>CS TEKNIS SIAGA ONLINE 24 JAM BOGOR</span>
              </div>

              <h2 className="wa-card-title">
                Punya Masalah WC atau Saluran Mampet?<br />
                Chat CS Kami Langsung via WhatsApp!
              </h2>

              <p className="wa-card-subtitle">
                Tak perlu repot mencari nomor atau simpan kontak manual. Klik tombol interaktif di bawah untuk langsung terhubung dengan tim customer service Mitra Bersih dalam hitungan detik.
              </p>

              {/* Quick Topic Selector */}
              <div>
                <span className="wa-topics-label">
                  <i className="fas fa-hand-pointer"></i> Pilih Kendala Anda (Pesan Otomatis Tersedia):
                </span>
                <div className="wa-topics-grid">
                  {WA_QUICK_TOPICS.map((topic, idx) => (
                    <button
                      key={topic.id}
                      type="button"
                      className={`wa-topic-chip ${selectedWaTopic === idx ? 'active' : ''}`}
                      onClick={() => setSelectedWaTopic(idx)}
                    >
                      <div className="wa-topic-chip-top">
                        <i className={topic.icon}></i>
                        <span>{topic.label}</span>
                      </div>
                      <span className="wa-topic-chip-desc">{topic.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Big Interactive WhatsApp CTA Button */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <a
                  href={`https://wa.me/6285715654183?text=${encodeURIComponent(WA_QUICK_TOPICS[selectedWaTopic].text)}`}
                  className="wa-giant-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat WhatsApp CS Mitra Bersih"
                >
                  <i className="fab fa-whatsapp"></i>
                  <div className="wa-giant-text">
                    <span className="wa-giant-title">CHAT CS VIA WHATSAPP SEKARANG</span>
                    <span className="wa-giant-sub">
                      +62 857-1565-4183 · Respon Kilat (&lt; 2 Menit)
                    </span>
                  </div>
                </a>
              </div>

              {/* Secondary Direct Call / Alternative */}
              <div className="wa-alt-row">
                <span style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.8)' }}>
                  Lebih nyaman panggilan suara?
                </span>
                <a href="tel:+6285715654183" className="wa-alt-phone">
                  <i className="fas fa-phone-alt"></i>
                  <span>Klik untuk Telepon Langsung: +62 857-1565-4183</span>
                </a>
              </div>

              {/* Trust Guarantees */}
              <div className="wa-trust-bullets">
                <div className="wa-bullet">
                  <i className="fas fa-check-circle"></i>
                  <span>Konsultasi Teknis &amp; Cek Biaya 100% Gratis</span>
                </div>
                <div className="wa-bullet">
                  <i className="fas fa-check-circle"></i>
                  <span>Tanpa Perlu Bayar Uang Muka (DP)</span>
                </div>
                <div className="wa-bullet">
                  <i className="fas fa-check-circle"></i>
                  <span>Armada Siaga Cepat di Seluruh Kecamatan Bogor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIPS & ARTIKEL */}
      <section className="articles-section" id="artikel">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-badge">TIPS &amp; EDUKASI</span>
            <h2 className="section-title">Tips &amp; Artikel Perawatan Saluran</h2>
            <p className="section-subtitle">
              Panduan praktis merawat septic tank, tanda-tanda kloset mampet, dan tips menjaga sanitasi rumah tangga tetap higienis &amp; bebas bau.
            </p>
          </div>

          <div className="articles-grid fade-in">
            {ARTICLES_DATA.map((article) => (
              <div
                key={article.id}
                className="article-card"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="article-thumb">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== article.fallbackImage) {
                        target.src = article.fallbackImage;
                      }
                    }}
                  />
                  <span className="article-category">{article.category}</span>
                </div>

                <div className="article-body">
                  <div className="article-meta">
                    <span><i className="far fa-calendar-alt"></i> {article.date}</span>
                    <span><i className="far fa-clock"></i> {article.readTime}</span>
                  </div>

                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-excerpt">{article.excerpt}</p>

                  <div className="article-footer">
                    <span className="article-read-btn">
                      Baca Selengkapnya <i className="fas fa-arrow-right"></i>
                    </span>
                    <span className="article-share-hint">
                      <i className="fas fa-bookmark"></i> Edukasi
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION ULASAN PELANGGAN & CAROUSEL */}
      <section className="ulasan-section" id="ulasan">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-badge">ULASAN PELANGGAN</span>
            <h2 className="section-title">Apa Kata Warga Bogor?</h2>
            <p className="section-subtitle">
              Kepuasan pelanggan adalah komitmen utama Mitra Bersih. Lihat testimoni asli pengguna jasa kami atau bagikan pengalaman Anda.
            </p>
          </div>

          {/* Social Proof Header Bar */}
          <div className="ulasan-header-bar fade-in">
            <div className="ulasan-summary-left">
              <div className="ulasan-big-score">
                4.9 <span>/ 5.0</span>
              </div>
              <div className="ulasan-summary-info">
                <div className="ulasan-stars-row">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <div className="ulasan-summary-count">
                  Berdasarkan <strong>{reviews.length} ulasan pelanggan terverifikasi</strong> di wilayah Bogor
                </div>
              </div>
            </div>

            <button
              type="button"
              className="ulasan-open-form-btn"
              onClick={() => {
                setIsFormOpen(!isFormOpen);
                setFormSuccess(null);
              }}
            >
              <i className={`fas ${isFormOpen ? 'fa-times' : 'fa-pen'}`}></i>
              {isFormOpen ? 'Tutup Form Ulasan' : 'Tulis Ulasan Anda'}
            </button>
          </div>

          {/* Success Toast */}
          {formSuccess && (
            <div className="ulasan-success-toast">
              <div className="ulasan-success-left">
                <i className="fas fa-check-circle"></i>
                <span>{formSuccess}</span>
              </div>
              <button
                type="button"
                className="ulasan-success-close"
                onClick={() => setFormSuccess(null)}
                aria-label="Tutup pesan sukses"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          )}

          {/* Interactive Review Form */}
          {isFormOpen && (
            <div className="ulasan-form-wrapper fade-in">
              <div className="ulasan-form-header">
                <div className="ulasan-form-title">
                  <i className="fas fa-comment-dots"></i>
                  <span>Beri Penilaian &amp; Ulasan Layanan Mitra Bersih</span>
                </div>
                <button
                  type="button"
                  className="ulasan-form-close"
                  onClick={() => setIsFormOpen(false)}
                  aria-label="Tutup form"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <form onSubmit={handleSubmitReview}>
                {/* Interactive Star Picker */}
                <div className="star-picker-container">
                  <span className="star-picker-label">Pilih Rating Bintang Kepuasan Anda:</span>
                  <div className="star-picker-stars">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled = (formHoverRating || formRating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          className={`star-picker-btn ${isFilled ? 'active' : ''}`}
                          onMouseEnter={() => setFormHoverRating(star)}
                          onMouseLeave={() => setFormHoverRating(0)}
                          onClick={() => setFormRating(star)}
                          aria-label={`Beri ${star} Bintang`}
                        >
                          <i className={`${isFilled ? 'fas' : 'far'} fa-star`}></i>
                        </button>
                      );
                    })}
                  </div>
                  <span className="star-picker-desc">
                    {STAR_TEXTS[formHoverRating || formRating]}
                  </span>
                </div>

                <div className="ulasan-form-grid">
                  <div className="form-group">
                    <label htmlFor="rev-name">
                      Nama Lengkap Anda <span className="required">*</span>
                    </label>
                    <input
                      id="rev-name"
                      type="text"
                      className="form-input"
                      placeholder="Contoh: Bapak Hendra Kusuma"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="rev-location">Wilayah / Kecamatan di Bogor</label>
                    <select
                      id="rev-location"
                      className="form-select"
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                    >
                      {BOGOR_AREAS.slice(0, 16).map((area, aIdx) => (
                        <option key={aIdx} value={area}>
                          {area}
                        </option>
                      ))}
                      <option value="Kota Bogor (Lainnya)">Kota Bogor (Lainnya)</option>
                      <option value="Kabupaten Bogor (Lainnya)">Kabupaten Bogor (Lainnya)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="rev-service">Jenis Layanan Yang Digunakan</label>
                    <select
                      id="rev-service"
                      className="form-select"
                      value={formService}
                      onChange={(e) => setFormService(e.target.value)}
                    >
                      <option value="Sedot WC Rumah Tangga">Sedot WC Rumah Tangga</option>
                      <option value="Pelancaran Saluran Mampet">Pelancaran Saluran Mampet</option>
                      <option value="Kuras Total Lumpur Septic Tank">Kuras Total Lumpur Septic Tank</option>
                      <option value="Sedot Limbah STP Restoran">Sedot Limbah STP Restoran</option>
                      <option value="Sedot Lemak / Grease Trap">Sedot Lemak / Grease Trap</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '24px' }}>
                  <label htmlFor="rev-comment">
                    Komentar Singkat Tentang Pelayanan Kami <span className="required">*</span>
                  </label>
                  <textarea
                    id="rev-comment"
                    className="form-textarea"
                    placeholder="Ceritakan pengalaman Anda mengenai kecepatan respon armada, keramahan tukang sedot WC, kerapihan pengerjaan, atau transparansi biaya..."
                    value={formComment}
                    onChange={(e) => setFormComment(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="ulasan-form-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setIsFormOpen(false)}
                  >
                    Batal
                  </button>
                  <button type="submit" className="btn-submit-review">
                    <i className="fas fa-paper-plane"></i>
                    Kirim Ulasan Sekarang
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Carousel Viewport */}
          <div
            className="ulasan-carousel-container fade-in"
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
          >
            <div className="ulasan-carousel-viewport">
              <div
                className="ulasan-carousel-track"
                style={{
                  transform: `translateX(calc(-${currentSlide} * ((100% + 24px) / ${itemsPerPage})))`
                }}
              >
                {reviews.map((rev) => {
                  const initial = rev.name.charAt(0).toUpperCase();
                  return (
                    <div key={rev.id} className="ulasan-carousel-item">
                      <div className="ulasan-card">
                        <div>
                          <div className="ulasan-card-top">
                            <div className="ulasan-card-rating">
                              {Array.from({ length: 5 }).map((_, idx) => (
                                <i
                                  key={idx}
                                  className={`${idx < rev.rating ? 'fas' : 'far'} fa-star`}
                                ></i>
                              ))}
                            </div>
                            <span className="ulasan-card-date">{rev.date}</span>
                          </div>

                          <span className="ulasan-card-service-badge">
                            <i className="fas fa-check"></i> {rev.serviceType}
                          </span>

                          <p className="ulasan-card-quote">
                            &ldquo;{rev.comment}&rdquo;
                          </p>
                        </div>

                        <div className="ulasan-card-user">
                          <div className="ulasan-avatar">{initial}</div>
                          <div className="ulasan-user-info">
                            <strong className="ulasan-user-name">
                              {rev.name}
                              <i className="fas fa-check-circle" title="Pelanggan Terverifikasi"></i>
                            </strong>
                            <span className="ulasan-user-location">
                              <i className="fas fa-map-marker-alt"></i> {rev.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Nav arrows & dots */}
            <div className="ulasan-nav-bar">
              <div className="ulasan-dots">
                {Array.from({ length: maxSlideIndex + 1 }).map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    className={`ulasan-dot ${currentSlide === dotIdx ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(dotIdx)}
                    aria-label={`Slide ke-${dotIdx + 1}`}
                  ></button>
                ))}
              </div>

              <div className="ulasan-nav-arrows">
                <button
                  type="button"
                  className="ulasan-nav-btn"
                  onClick={handlePrevSlide}
                  disabled={currentSlide === 0}
                  aria-label="Ulasan Sebelumnya"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  type="button"
                  className="ulasan-nav-btn"
                  onClick={handleNextSlide}
                  disabled={currentSlide >= maxSlideIndex}
                  aria-label="Ulasan Selanjutnya"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Trust strip */}
          <div className="ulasan-trust-strip fade-in">
            <div className="ulasan-trust-item">
              <i className="fas fa-shield-alt"></i>
              <span>100% Ulasan Asli Pelanggan</span>
            </div>
            <div className="ulasan-trust-item">
              <i className="fas fa-truck"></i>
              <span>Layanan Tersebar di Seluruh Wilayah Bogor</span>
            </div>
            <div className="ulasan-trust-item">
              <i className="fas fa-medal"></i>
              <span>Garansi Pekerjaan Rapi &amp; Tuntas</span>
            </div>
          </div>
        </div>
      </section>

      {/* AREA LAYANAN */}
      <section className="area" id="kontak">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-badge">WILAYAH LAYANAN</span>
            <h2 className="section-title">Area Layanan Kami</h2>
            <p className="section-subtitle">
              Kami melayani sedot wc kota Bogor, sedot wc kabupaten Bogor, dan sekitarnya dengan respon cepat.
            </p>
          </div>

          <div className="area-content">
            <div className="area-illustration fade-in">
              <i className="fas fa-map-marked-alt icon-big"></i>
              <h3>Kota &amp; Kabupaten Bogor</h3>
              <p>Cakupan area layanan kami meliputi seluruh kecamatan di Bogor dengan waktu tempuh tercepat.</p>
            </div>

            <div className="area-list fade-in fade-in-delay-1">
              {BOGOR_AREAS.map((area, idx) => (
                <div key={idx} className="area-item">
                  <i className="fas fa-check-circle"></i> {area}
                </div>
              ))}
              <div className="area-more">
                <i className="fas fa-location-arrow"></i> Dan kecamatan sekitarnya
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>Informasi Kontak</h4>
              <div className="footer-contact-item">
                <i className="fas fa-phone-alt"></i>
                <div className="info">
                  <span>Telepon / WhatsApp</span>
                  <strong>+62 857-1565-4183</strong>
                </div>
              </div>
              <div className="footer-contact-item">
                <i className="fab fa-whatsapp"></i>
                <div className="info">
                  <span>No HP / WhatsApp</span>
                  <strong>+62 857-1565-4183</strong>
                </div>
              </div>
              <div className="footer-contact-item">
                <i className="fas fa-envelope"></i>
                <div className="info">
                  <span>Email</span>
                  <strong>info@mitrabersih24jam.com</strong>
                </div>
              </div>
              <div className="footer-contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <div className="info">
                  <span>Alamat</span>
                  <strong>Kota Bogor, Jawa Barat</strong>
                </div>
              </div>

              <div className="social-row">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://wa.me/6285715654183" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <i className="fab fa-tiktok"></i>
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Layanan</h4>
              <ul className="footer-links">
                <li>
                  <a href="#layanan" onClick={(e) => scrollToSection(e, 'layanan')}>
                    <i className="fas fa-chevron-right"></i> Sedot WC Bogor
                  </a>
                </li>
                <li>
                  <a href="#layanan" onClick={(e) => scrollToSection(e, 'layanan')}>
                    <i className="fas fa-chevron-right"></i> Kuras Septic Tank Bogor
                  </a>
                </li>
                <li>
                  <a href="#layanan" onClick={(e) => scrollToSection(e, 'layanan')}>
                    <i className="fas fa-chevron-right"></i> Pelancaran Saluran Mampet
                  </a>
                </li>
                <li>
                  <a href="#layanan" onClick={(e) => scrollToSection(e, 'layanan')}>
                    <i className="fas fa-chevron-right"></i> Sedot Limbah &amp; Ipal Bogor
                  </a>
                </li>
                <li>
                  <a href="#layanan" onClick={(e) => scrollToSection(e, 'layanan')}>
                    <i className="fas fa-chevron-right"></i> Sedot Grease Trap Bogor
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Lainnya</h4>
              <ul className="footer-links">
                <li>
                  <a href="#tentang" onClick={(e) => scrollToSection(e, 'tentang')}>
                    <i className="fas fa-chevron-right"></i> Tentang Kami
                  </a>
                </li>
                <li>
                  <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')}>
                    <i className="fas fa-chevron-right"></i> Tanya Jawab (FAQ)
                  </a>
                </li>
                <li>
                  <a href="#galeri" onClick={(e) => scrollToSection(e, 'galeri')}>
                    <i className="fas fa-chevron-right"></i> Galeri
                  </a>
                </li>
                <li>
                  <a href="#artikel" onClick={(e) => scrollToSection(e, 'artikel')}>
                    <i className="fas fa-chevron-right"></i> Tips &amp; Artikel SEO
                  </a>
                </li>
                <li>
                  <a href="#ulasan" onClick={(e) => scrollToSection(e, 'ulasan')}>
                    <i className="fas fa-chevron-right"></i> Ulasan Pelanggan
                  </a>
                </li>
                <li>
                  <a href="#kontak" onClick={(e) => scrollToSection(e, 'kontak')}>
                    <i className="fas fa-chevron-right"></i> Kontak
                  </a>
                </li>
                <li>
                  <a href="#home" onClick={(e) => scrollToSection(e, 'home')}>
                    <i className="fas fa-chevron-right"></i> Beranda
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="brand">SEDOT WC BOGOR - MITRA BERSIH 24JAM</div>
            <div className="copyright">&copy; 2024 Mitra Bersih 24Jam. All Rights Reserved.</div>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/6285715654183?text=Halo,%20saya%20ingin%20booking%20sedot%20wc%20Bogor"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
      </a>

      {/* LIGHTBOX MODAL */}
      <div
        className={`lightbox ${lightboxImg ? 'active' : ''}`}
        id="lightbox"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setLightboxImg(null);
          }
        }}
      >
        <button
          className="lightbox-close"
          id="lightboxClose"
          aria-label="Tutup"
          onClick={() => setLightboxImg(null)}
        >
          <i className="fas fa-times"></i>
        </button>
        {lightboxImg && (
          <img
            src={lightboxImg}
            alt="Gambar Galeri Mitra Bersih"
            id="lightboxImage"
          />
        )}
      </div>

      {/* ARTICLE READER MODAL */}
      {selectedArticle && (
        <div
          className="article-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedArticle(null);
            }
          }}
        >
          <div className="article-modal-content">
            <button
              className="article-modal-close"
              aria-label="Tutup Artikel"
              onClick={() => setSelectedArticle(null)}
            >
              <i className="fas fa-times"></i>
            </button>

            <div className="article-modal-header">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== selectedArticle.fallbackImage) {
                    target.src = selectedArticle.fallbackImage;
                  }
                }}
              />
            </div>

            <div className="article-modal-body">
              <span className="article-modal-badge">{selectedArticle.category}</span>
              <h2 className="article-modal-title">{selectedArticle.title}</h2>

              <div className="article-modal-meta">
                <span><i className="far fa-calendar-alt"></i> Dipublikasikan: {selectedArticle.date}</span>
                <span><i className="far fa-clock"></i> {selectedArticle.readTime}</span>
                <span><i className="fas fa-user-check"></i> Tim Redaksi Mitra Bersih</span>
              </div>

              <div className="article-modal-text">
                <p><strong>Ringkasan:</strong> {selectedArticle.content.intro}</p>

                <h4>Poin &amp; Panduan Penting:</h4>
                <ol>
                  {selectedArticle.content.points.map((pt, pIdx) => (
                    <li key={pIdx}>
                      <strong>{pt.heading}</strong>
                      <p>{pt.text}</p>
                    </li>
                  ))}
                </ol>

                <h4>Kesimpulan &amp; Solusi:</h4>
                <p>{selectedArticle.content.conclusion}</p>
              </div>

              <div className="article-modal-cta">
                <div>
                  <strong style={{ display: 'block', color: 'var(--black)', fontSize: '15px' }}>
                    Mengalami Masalah Serupa Pada Kloset / Septic Tank Anda?
                  </strong>
                  <span style={{ fontSize: '13px', color: 'var(--gray)' }}>
                    Konsultasikan langsung dengan teknisi kami untuk penanganan cepat tanpa bongkar di Bogor.
                  </span>
                </div>
                <a
                  href={`https://wa.me/6285715654183?text=${encodeURIComponent(`Halo Mitra Bersih, saya membaca artikel "${selectedArticle.title}" dan ingin konsultasi mengenai septic tank / saluran saya di Bogor.`)}`}
                  className="calc-result-btn"
                  style={{ width: 'auto', padding: '10px 22px', fontSize: '13.5px' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-whatsapp"></i>
                  Konsultasi via WA
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
