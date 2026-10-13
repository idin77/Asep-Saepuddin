/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import articleImg1 from './assets/images/septic_tank_signs_1791232849125.jpg';
import articleImg2 from './assets/images/septic_vacuum_truck_1791232864840.jpg';
import articleImg3 from './assets/images/clogged_drain_cleaning_1791232881201.jpg';
import articleImg4 from './assets/images/fresh_drain_garden_1791232895094.jpg';

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query || !query.trim()) return text;
  const trimmed = query.trim();
  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark
        key={i}
        style={{
          background: '#FEF08A',
          color: '#854D0E',
          padding: '1px 3px',
          borderRadius: '3px',
          fontWeight: 700
        }}
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
}

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

export interface BogorAreaDetail {
  name: string;
  type: 'Kota Bogor' | 'Kabupaten Bogor';
  hub: string;
  hubBadge: string;
  estTime: string;
  keywords?: string[];
}

export const BOGOR_AREA_DETAILS: BogorAreaDetail[] = [
  // Kota Bogor (6 Kecamatan)
  {
    name: 'Bogor Barat',
    type: 'Kota Bogor',
    hub: 'Pos Kota Bogor',
    hubBadge: 'Pos Kota',
    estTime: '15 – 25 Menit',
    keywords: ['bubulak', 'semplak', 'pasir jaya', 'menteng', 'cilendek', 'curug mekar', 'sindang barang', 'balumbang jaya']
  },
  {
    name: 'Bogor Selatan',
    type: 'Kota Bogor',
    hub: 'Pos Kota Bogor',
    hubBadge: 'Pos Kota',
    estTime: '15 – 25 Menit',
    keywords: ['batutulis', 'cipaku', 'empang', 'pamoyanan', 'cipinang gading', 'bojongkerta', 'bondongan', 'harjasari', 'lawanggintung']
  },
  {
    name: 'Bogor Tengah',
    type: 'Kota Bogor',
    hub: 'Pos Kota Bogor',
    hubBadge: 'Pos Kota',
    estTime: '15 – 20 Menit',
    keywords: ['stasiun bogor', 'kebun raya', 'paledang', 'juanda', 'babakan pasar', 'cibogor', 'panaragan', 'suryakencana']
  },
  {
    name: 'Bogor Timur',
    type: 'Kota Bogor',
    hub: 'Pos Kota Bogor',
    hubBadge: 'Pos Kota',
    estTime: '15 – 20 Menit',
    keywords: ['baranangsiang', 'pajajaran', 'katulampa', 'tajur', 'sindangrasa', 'sukasari']
  },
  {
    name: 'Bogor Utara',
    type: 'Kota Bogor',
    hub: 'Pos Kota Bogor',
    hubBadge: 'Pos Kota',
    estTime: '15 – 20 Menit',
    keywords: ['bantarjati', 'kedunghalang', 'cibuluh', 'ciluar', 'cimahpar', 'tegal gundil', 'pandu raya', 'bangbarung']
  },
  {
    name: 'Tanah Sareal',
    type: 'Kota Bogor',
    hub: 'Pos Kota Bogor',
    hubBadge: 'Pos Kota',
    estTime: '15 – 20 Menit',
    keywords: ['sholeh iskandar', 'yasmin', 'kayumanis', 'kebon pedes', 'kedung badak', 'kedung waringin', 'mekarwangi', 'sukadamai', 'sukaresmi']
  },

  // Kabupaten Bogor (40 Kecamatan)
  {
    name: 'Babakan Madang',
    type: 'Kabupaten Bogor',
    hub: 'Pos Cibinong & Sentul',
    hubBadge: 'Pos Sentul',
    estTime: '20 – 30 Menit',
    keywords: ['sentul', 'sentul city', 'bellanova', 'kadumangu', 'sumur batu', 'citaringgul', 'bojong koneng']
  },
  {
    name: 'Bojonggede',
    type: 'Kabupaten Bogor',
    hub: 'Pos Cibinong & Sentul',
    hubBadge: 'Pos Cibinong',
    estTime: '15 – 25 Menit',
    keywords: ['stasiun bojonggede', 'gaperi', 'kalisuren', 'susukan', 'kedung waringin', 'ragajaya', 'rawa panjang']
  },
  {
    name: 'Caringin',
    type: 'Kabupaten Bogor',
    hub: 'Pos Ciawi & Puncak',
    hubBadge: 'Pos Ciawi',
    estTime: '25 – 35 Menit',
    keywords: ['cinagara', 'lembah hijau', 'pancawati', 'tangkil', 'muara']
  },
  {
    name: 'Cariu',
    type: 'Kabupaten Bogor',
    hub: 'Pos Cibinong & Sentul',
    hubBadge: 'Pos Cibinong',
    estTime: '35 – 45 Menit',
    keywords: ['kuta mekar', 'mekarwangi', 'bantarkuning', 'babakan raden']
  },
  {
    name: 'Ciampea',
    type: 'Kabupaten Bogor',
    hub: 'Pos Dramaga & Barat',
    hubBadge: 'Pos Dramaga',
    estTime: '20 – 30 Menit',
    keywords: ['warung borong', 'benteng', 'cibadak', 'cibanteng', 'cicadas']
  },
  {
    name: 'Ciawi',
    type: 'Kabupaten Bogor',
    hub: 'Pos Ciawi & Puncak',
    hubBadge: 'Pos Ciawi',
    estTime: '15 – 25 Menit',
    keywords: ['gadog', 'pintu tol ciawi', 'banjarwaru', 'bendungan', 'bitungsari', 'pandansari']
  },
  {
    name: 'Cibinong',
    type: 'Kabupaten Bogor',
    hub: 'Pos Cibinong & Sentul',
    hubBadge: 'Pos Cibinong',
    estTime: '15 – 20 Menit',
    keywords: ['pemda bogor', 'tegar beriman', 'sukahati', 'pakansari', 'cibinong city mall', 'ccm', 'cirimekar', 'harapan jaya', 'tengah', 'pabuaran']
  },
  {
    name: 'Cibungbulang',
    type: 'Kabupaten Bogor',
    hub: 'Pos Dramaga & Barat',
    hubBadge: 'Pos Dramaga',
    estTime: '25 – 35 Menit',
    keywords: ['cimanggu', 'cibatok', 'galuga', 'situ udik']
  },
  {
    name: 'Cigombong',
    type: 'Kabupaten Bogor',
    hub: 'Pos Ciawi & Puncak',
    hubBadge: 'Pos Ciawi',
    estTime: '25 – 35 Menit',
    keywords: ['lido', 'wates jaya', 'tugujaya', 'cisalada']
  },
  {
    name: 'Cigudeg',
    type: 'Kabupaten Bogor',
    hub: 'Pos Dramaga & Barat',
    hubBadge: 'Pos Dramaga',
    estTime: '30 – 40 Menit',
    keywords: ['bunar', 'argapura', 'sukamaju', 'wargajaya']
  },
  {
    name: 'Cijeruk',
    type: 'Kabupaten Bogor',
    hub: 'Pos Ciawi & Puncak',
    hubBadge: 'Pos Ciawi',
    estTime: '25 – 35 Menit',
    keywords: ['tajur halang', 'cipicung', 'palasari', 'warung menteng']
  },
  {
    name: 'Cileungsi',
    type: 'Kabupaten Bogor',
    hub: 'Pos Cibinong & Sentul',
    hubBadge: 'Pos Cibinong',
    estTime: '25 – 35 Menit',
    keywords: ['mekarsari', 'metland cileungsi', 'limusnunggal', 'pasir angin', 'cipenjo']
  },
  {
    name: 'Ciomas',
    type: 'Kabupaten Bogor',
    hub: 'Pos Dramaga & Barat',
    hubBadge: 'Pos Dramaga',
    estTime: '15 – 25 Menit',
    keywords: ['pagelaran', 'laladon', 'kotabatu', 'sukamakmur', 'ciapus']
  },
  {
    name: 'Cisarua',
    type: 'Kabupaten Bogor',
    hub: 'Pos Ciawi & Puncak',
    hubBadge: 'Pos Ciawi',
    estTime: '25 – 35 Menit',
    keywords: ['puncak', 'taman safari', 'tugu utara', 'tugu selatan', 'kopo', 'citeko']
  },
  {
    name: 'Ciseeng',
    type: 'Kabupaten Bogor',
    hub: 'Pos Parung & Utara',
    hubBadge: 'Pos Parung',
    estTime: '20 – 30 Menit',
    keywords: ['pemandian air panas', 'cibeuteung', 'karya mekar', 'babakan']
  },
  {
    name: 'Citeureup',
    type: 'Kabupaten Bogor',
    hub: 'Pos Cibinong & Sentul',
    hubBadge: 'Pos Cibinong',
    estTime: '15 – 25 Menit',
    keywords: ['tarikolot', 'karang asem', 'puspasari', 'sanja', 'gunung sari']
  },
  {
    name: 'Dramaga',
    type: 'Kabupaten Bogor',
    hub: 'Pos Dramaga & Barat',
    hubBadge: 'Pos Dramaga',
    estTime: '15 – 25 Menit',
    keywords: ['ipb', 'kampus ipb', 'dramaga cantik', 'babakan', 'ciherang', 'petir', 'sukadamai']
  },
  {
    name: 'Gunung Putri',
    type: 'Kabupaten Bogor',
    hub: 'Pos Cibinong & Sentul',
    hubBadge: 'Pos Cibinong',
    estTime: '25 – 35 Menit',
    keywords: ['cikeas', 'kranggan', 'tlajung udik', 'nagrak', 'cicadas']
  },
  {
    name: 'Gunung Sindur',
    type: 'Kabupaten Bogor',
    hub: 'Pos Parung & Utara',
    hubBadge: 'Pos Parung',
    estTime: '20 – 30 Menit',
    keywords: ['prumpung', 'cidokom', 'rawa kalong', 'curug', 'padurenan']
  },
  {
    name: 'Jasinga',
    type: 'Kabupaten Bogor',
    hub: 'Pos Dramaga & Barat',
    hubBadge: 'Pos Dramaga',
    estTime: '35 – 45 Menit',
    keywords: ['koleang', 'barengkok', 'jugala jaya', 'sipahutar']
  },
  {
    name: 'Jonggol',
    type: 'Kabupaten Bogor',
    hub: 'Pos Cibinong & Sentul',
    hubBadge: 'Pos Cibinong',
    estTime: '30 – 40 Menit',
    keywords: ['citra indah', 'sukamaju', 'singajaya', 'sirnagalih']
  },
  {
    name: 'Kemang',
    type: 'Kabupaten Bogor',
    hub: 'Pos Parung & Utara',
    hubBadge: 'Pos Parung',
    estTime: '20 – 30 Menit',
    keywords: ['salabenda', 'atang sendjaja', 'bojong', 'pondok udik', 'tegal']
  },
  {
    name: 'Klapanunggal',
    type: 'Kabupaten Bogor',
    hub: 'Pos Cibinong & Sentul',
    hubBadge: 'Pos Cibinong',
    estTime: '25 – 35 Menit',
    keywords: ['nambo', 'kembang kuning', 'cikahuripan', 'bantarjati']
  },
  {
    name: 'Leuwiliang',
    type: 'Kabupaten Bogor',
    hub: 'Pos Dramaga & Barat',
    hubBadge: 'Pos Dramaga',
    estTime: '25 – 35 Menit',
    keywords: ['pasar leuwiliang', 'karehkel', 'barengkok', 'karyasari']
  },
  {
    name: 'Leuwisadeng',
    type: 'Kabupaten Bogor',
    hub: 'Pos Dramaga & Barat',
    hubBadge: 'Pos Dramaga',
    estTime: '30 – 40 Menit',
    keywords: ['sadeng', 'sibanteng', 'wangun jaya']
  },
  {
    name: 'Megamendung',
    type: 'Kabupaten Bogor',
    hub: 'Pos Ciawi & Puncak',
    hubBadge: 'Pos Ciawi',
    estTime: '20 – 30 Menit',
    keywords: ['puncak', 'gadog', 'sukamahi', 'sukagalih', 'cipayung darmaga']
  },
  {
    name: 'Nanggung',
    type: 'Kabupaten Bogor',
    hub: 'Pos Dramaga & Barat',
    hubBadge: 'Pos Dramaga',
    estTime: '35 – 45 Menit',
    keywords: ['pongkor', 'kalong liud', 'sukaluyu', 'bantar karet']
  },
  {
    name: 'Pamijahan',
    type: 'Kabupaten Bogor',
    hub: 'Pos Dramaga & Barat',
    hubBadge: 'Pos Dramaga',
    estTime: '30 – 40 Menit',
    keywords: ['gunung salak endah', 'gunung sari', 'cibitung', 'purwabakti']
  },
  {
    name: 'Parung',
    type: 'Kabupaten Bogor',
    hub: 'Pos Parung & Utara',
    hubBadge: 'Pos Parung',
    estTime: '15 – 25 Menit',
    keywords: ['pasar parung', 'lebaksangi', 'waru', 'bojong indah', 'iwul', 'cogreg']
  },
  {
    name: 'Parung Panjang',
    type: 'Kabupaten Bogor',
    hub: 'Pos Parung & Utara',
    hubBadge: 'Pos Parung',
    estTime: '30 – 40 Menit',
    keywords: ['stasiun parung panjang', 'kabasiran', 'dago', 'pingku', 'gintung cilejet']
  },
  {
    name: 'Rancabungur',
    type: 'Kabupaten Bogor',
    hub: 'Pos Parung & Utara',
    hubBadge: 'Pos Parung',
    estTime: '20 – 30 Menit',
    keywords: ['bantarsari', 'bantarjaya', 'pasirgaok', 'mekarsari']
  },
  {
    name: 'Rumpin',
    type: 'Kabupaten Bogor',
    hub: 'Pos Parung & Utara',
    hubBadge: 'Pos Parung',
    estTime: '30 – 40 Menit',
    keywords: ['cipinang', 'sukasari', 'rabak', 'koleang']
  },
  {
    name: 'Sukajaya',
    type: 'Kabupaten Bogor',
    hub: 'Pos Dramaga & Barat',
    hubBadge: 'Pos Dramaga',
    estTime: '35 – 45 Menit',
    keywords: ['harkatjaya', 'kiarapandak', 'pasir madang', 'sukamulih']
  },
  {
    name: 'Sukamakmur',
    type: 'Kabupaten Bogor',
    hub: 'Pos Cibinong & Sentul',
    hubBadge: 'Pos Cibinong',
    estTime: '35 – 45 Menit',
    keywords: ['villa khayangan', 'wargajaya', 'sukaharja', 'sirnajaya']
  },
  {
    name: 'Sukaraja',
    type: 'Kabupaten Bogor',
    hub: 'Pos Cibinong & Sentul',
    hubBadge: 'Pos Sentul',
    estTime: '15 – 25 Menit',
    keywords: ['sentul', 'cikeas', 'katulampa', 'gunung geulis', 'cilebut', 'pasir jambu']
  },
  {
    name: 'Tajurhalang',
    type: 'Kabupaten Bogor',
    hub: 'Pos Parung & Utara',
    hubBadge: 'Pos Parung',
    estTime: '20 – 30 Menit',
    keywords: ['kalisuren', 'sasakpanjang', 'tonjong', 'sukmajaya']
  },
  {
    name: 'Tamansari',
    type: 'Kabupaten Bogor',
    hub: 'Pos Dramaga & Barat',
    hubBadge: 'Pos Dramaga',
    estTime: '20 – 30 Menit',
    keywords: ['sukamantri', 'sirnagalih', 'pasireurih', 'curug nangka']
  },
  {
    name: 'Tanjungsari',
    type: 'Kabupaten Bogor',
    hub: 'Pos Cibinong & Sentul',
    hubBadge: 'Pos Cibinong',
    estTime: '35 – 45 Menit',
    keywords: ['sirnarasa', 'pasirtanjung', 'tanjungrasa', 'buanajaya']
  },
  {
    name: 'Tenjo',
    type: 'Kabupaten Bogor',
    hub: 'Pos Parung & Utara',
    hubBadge: 'Pos Parung',
    estTime: '35 – 45 Menit',
    keywords: ['stasiun tenjo', 'kotapodomoro', 'cilaku', 'singabraja', 'bojong']
  },
  {
    name: 'Tenjolaya',
    type: 'Kabupaten Bogor',
    hub: 'Pos Dramaga & Barat',
    hubBadge: 'Pos Dramaga',
    estTime: '25 – 35 Menit',
    keywords: ['curug luhur', 'cinangneng', 'situdaun', 'tapos']
  }
];

interface FAQItem {
  id: number;
  question: string;
  category: string;
  keywords: string[];
  answer: React.ReactNode;
  answerText: string;
  waTopicText?: string;
}

const FAQ_CATEGORIES = [
  'Topik Populer',
  'Tarif & Biaya',
  'Pemesanan',
  'Armada & Waktu',
  'Garansi',
  'Tanpa Bongkar',
  '24 Jam Nonstop',
  'Pencegahan'
];

export interface PricingPackage {
  id: string;
  name: string;
  category: 'septic-tank' | 'drain-clearing' | 'combo';
  categoryLabel: string;
  tag: string;
  badge?: string;
  isPopular?: boolean;
  icon: string;
  startingPrice: number;
  priceDisplay: string;
  unit: string;
  description: string;
  targetProperty: string;
  estTime: string;
  warranty: string;
  features: string[];
  specs: {
    capacity: string;
    machine: string;
    hose: string;
    warranty: string;
    disinfectant: string;
    ipltLegal: string;
  };
}

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'drain-clearing',
    name: 'Pelancaran Saluran Mampet',
    category: 'drain-clearing',
    categoryLabel: 'Pelancaran Saluran Pipa',
    tag: 'SPESIALIS SALURAN',
    badge: 'Tanpa Bongkar Lantai',
    icon: 'fa-faucet-drip',
    startingPrice: 300000,
    priceDisplay: 'Rp 300.000',
    unit: 'Mulai dari / titik pengerjaan',
    description: 'Solusi cepat untuk pipa wastafel, floor drain kamar mandi, atau bak kontrol mampet tersumbat lemak & kotoran.',
    targetProperty: 'Rumah, Ruko, Kontrakan, Resto',
    estTime: '30 - 60 Menit',
    warranty: '30 Hari Resmi',
    features: [
      'Mesin Spiral Roto-Rooter Elektrik fleksibel',
      'Tanpa bongkar keramik & lantai tetap utuh',
      'Mengikis tuntas kerak lemak, rambut & sabun',
      'Jangkauan spiral baja hingga 30 meter',
      'Garansi kelancaran 30 hari penuh',
      'Gratis uji debit aliran air setelah pengerjaan'
    ],
    specs: {
      capacity: 'Menyesuaikan titik pipa',
      machine: 'Spiral Elektrik Roto-Rooter',
      hose: 'Spiral Baja s/d 30 Meter',
      warranty: '30 Hari Resmi',
      disinfectant: 'Pembersihan Aliran',
      ipltLegal: 'N/A (Limbah Cair Ringan)'
    }
  },
  {
    id: 'septic-standard',
    name: 'Sedot Septic Tank Standar',
    category: 'septic-tank',
    categoryLabel: 'Sedot Septic Tank',
    tag: 'RUMAH TINGGAL & PERUMAHAN',
    badge: 'Paling Populer & Hemat',
    isPopular: true,
    icon: 'fa-truck-droplet',
    startingPrice: 450000,
    priceDisplay: 'Rp 450.000',
    unit: 'Mulai dari / tangki standar (3 m³)',
    description: 'Pengurasan menyeluruh septic tank rumah tinggal dan perumahan Bogor sampai ke dasar lumpur tinja.',
    targetProperty: 'Rumah Pribadi, Perumahan, Kost',
    estTime: '45 - 90 Menit',
    warranty: '30 Hari Resmi',
    features: [
      'Pengurasan tuntas tinja & lumpur dasar septic tank',
      'Truk vakum hidrolik bertekanan hisap tinggi (tanpa bau)',
      'Gratis fasilitas selang standar s/d 50 meter (aman masuk gang)',
      'Semprot cairan disinfektan & anti bau gratis',
      'Garansi servis tuntas 30 hari resmi',
      'Pembuangan legal ramah lingkungan ke IPLT Pemda Bogor'
    ],
    specs: {
      capacity: 'Tangki Standar 3.000 Liter (3 m³)',
      machine: 'Vakum Hidrolik High-Power',
      hose: 'Selang Standar 50 Meter Gratis',
      warranty: '30 Hari Resmi',
      disinfectant: 'Ya (Disinfektan & Anti Bau)',
      ipltLegal: 'Ya (Resmi IPLT Pemda Bogor)'
    }
  },
  {
    id: 'septic-commercial',
    name: 'Sedot Septic Tank Komersial & Jumbo',
    category: 'septic-tank',
    categoryLabel: 'Sedot Septic Tank',
    tag: 'BISNIS & FASILITAS UMUM',
    badge: 'Kapasitas 4.000 – 6.000 Liter',
    icon: 'fa-building',
    startingPrice: 650000,
    priceDisplay: 'Rp 650.000',
    unit: 'Mulai dari / rit truk jumbo (5 m³)',
    description: 'Pengurasan septic tank volume besar dan grease trap untuk ruko, restoran, kafe, kantor, sekolah, dan tempat ibadah.',
    targetProperty: 'Restoran, Kafe, Ruko, Kantor, Hotel',
    estTime: '1 - 2 Jam',
    warranty: '30 Hari Resmi',
    features: [
      'Kapasitas tangki armada jumbo 4.000 – 6.000 liter',
      'Pengurasan lumpur pekat & perawatan grease trap lemak',
      'Jadwal fleksibel (pengerjaan malam / subuh tersedia)',
      'Faktur / Kwitansi resmi & Berita Acara Pekerjaan',
      'Garansi servis pengerjaan 30 hari resmi',
      'Penugasan kru teknisi ahli bersertifikat sanitasi'
    ],
    specs: {
      capacity: 'Tangki Jumbo 4.000 - 6.000 Liter',
      machine: 'Vakum Heavy-Duty High-Capacity',
      hose: 'Selang Standar 50 Meter Gratis',
      warranty: '30 Hari Resmi',
      disinfectant: 'Ya (Pembersihan Ekstra)',
      ipltLegal: 'Ya (Resmi IPLT Pemda Bogor)'
    }
  },
  {
    id: 'combo-package',
    name: 'Paket Kombo Tuntas Hemat',
    category: 'combo',
    categoryLabel: 'Paket Kombo All-in-One',
    tag: 'SOLUSI MENYELURUH',
    badge: 'Hemat Rp 100.000',
    icon: 'fa-shield-virus',
    startingPrice: 700000,
    priceDisplay: 'Rp 700.000',
    unit: 'Paket lengkap kombo tuntas',
    description: 'Septic tank penuh sekaligus kloset atau wastafel mampet? Ditangani bersamaan dalam satu kedatangan teknisi.',
    targetProperty: 'Semua Jenis Properti (Rumah, Ruko, Usaha)',
    estTime: '1 - 2 Jam',
    warranty: '45 Hari Resmi',
    features: [
      'Sedot habis 1 tangki septic tank standar 3.000 liter',
      'Pelancaran 1 titik saluran pipa mampet dengan mesin spiral',
      'Pemberian probiotik pengurai mikroba ramah lingkungan',
      'Disinfeksi menyeluruh & sterilisasi aroma toilet',
      'Garansi perlindungan ekstra 45 hari',
      'Prioritas panggilan darurat siaga 24 jam'
    ],
    specs: {
      capacity: '3.000 Liter + 1 Titik Saluran Pipa',
      machine: 'Vakum Hidrolik + Mesin Spiral Elektrik',
      hose: 'Selang 50m + Spiral 30m',
      warranty: '45 Hari Resmi (Ekstra)',
      disinfectant: 'Ya (Disinfektan & Bakteri Pengurai)',
      ipltLegal: 'Ya (Resmi IPLT Pemda Bogor)'
    }
  }
];

export interface ArticleCategoryConfig {
  name: string;
  icon: string;
  description: string;
}

export const ARTICLE_CATEGORY_CONFIGS: ArticleCategoryConfig[] = [
  { name: 'Semua', icon: 'fa-layer-group', description: 'Semua panduan edukasi sanitasi' },
  { name: 'Tips Perawatan', icon: 'fa-tools', description: 'Tips perawatan septic tank & kloset' },
  { name: 'Panduan Sanitasi', icon: 'fa-shield-virus', description: 'Standar kesehatan dan pemeliharaan' },
  { name: 'Solusi Saluran', icon: 'fa-wrench', description: 'Solusi pipa wastafel & saluran mampet' },
  { name: 'Kesehatan Rumah', icon: 'fa-home', description: 'Bebas bau & sanitasi higienis' }
];

export const ARTICLE_CATEGORIES = ARTICLE_CATEGORY_CONFIGS.map((c) => c.name);

const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: 'Apakah ada biaya tambahan atau biaya tersembunyi (biaya siluman)?',
    category: 'Tarif & Biaya',
    keywords: ['biaya tambahan', 'biaya tersembunyi', 'siluman', 'tarif', 'ongkos', 'transparansi', 'harga', 'kejujuran'],
    answerText: 'Sama sekali tidak ada biaya siluman! Prinsip kami adalah keterbukaan. Tarif disepakati bersama di awal sebelum pengerjaan dimulai. Jika ada kondisi khusus di lapangan (misalnya penambahan selang ekstra di atas 50 meter atau pembuatan lubang kontrol baru karena septic tank tertutup cor semen mati), teknisi akan menjelaskan dan meminta persetujuan Anda terlebih dahulu.',
    waTopicText: 'Halo CS Mitra Bersih, saya membaca FAQ tentang transparansi harga tanpa biaya siluman. Boleh saya minta estimasi tarif untuk kendala septic tank / kloset saya di Bogor?',
    answer: (
      <p>
        <strong>Sama sekali tidak ada biaya siluman!</strong> Prinsip kami adalah keterbukaan. Tarif disepakati bersama di awal sebelum pengerjaan dimulai. Jika ada kondisi khusus di lapangan (misalnya penambahan selang ekstra di atas 50 meter atau pembuatan lubang kontrol baru karena septic tank tertutup cor semen mati), teknisi akan menjelaskan dan meminta persetujuan Anda terlebih dahulu.
      </p>
    )
  },
  {
    id: 2,
    question: 'Bagaimana cara pemesanan jasa Sedot WC Mitra Bersih di Bogor?',
    category: 'Pemesanan',
    keywords: ['cara pesan', 'order', 'whatsapp', 'telepon', 'kontak', 'prosedur', 'dp', 'tanpa dp', 'pembayaran', 'alur'],
    answerText: 'Cara pemesanan sangat mudah dan cepat tanpa perlu uang muka (DP). Hubungi kami klik tombol WhatsApp atau telepon ke +62 857-1565-4183 yang aktif 24 jam. Konsultasikan kendala dan alamat/share loc di area Bogor. Konfirmasi harga transparan dan armada terdekat langsung meluncur. Pembayaran dilakukan setelah pekerjaan selesai tuntas dan lancar.',
    waTopicText: 'Halo CS Mitra Bersih, saya membaca FAQ tentang cara pemesanan sedot WC. Saya ingin konsultasi kendala WC/septic tank dan pesan armada untuk area Bogor.',
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
    id: 3,
    question: 'Berapa lama estimasi armada tiba di lokasi saya di Kota/Kabupaten Bogor?',
    category: 'Armada & Waktu',
    keywords: ['estimasi waktu', 'berapa lama', 'cepat', 'kedatangan', 'pos siaga', 'cibinong', 'tanah sareal', 'bogor barat', 'ciawi', 'sukaraja', 'bojonggede', 'parung'],
    answerText: 'Rata-rata armada kami tiba dalam 15 hingga 30 menit untuk area Kota Bogor dan pusat pemukiman Kabupaten Bogor. Kami menempatkan armada siaga di berbagai pos strategis (seperti Cibinong, Tanah Sareal, Bogor Barat, Ciawi, Sukaraja, Bojonggede, dan Parung) sehingga penanganan darurat dapat dilakukan dengan sangat cepat.',
    waTopicText: 'Halo CS Mitra Bersih, saya membaca FAQ tentang estimasi waktu kedatangan armada (15-30 menit). Boleh cek armada siaga terdekat ke lokasi saya di Bogor sekarang?',
    answer: (
      <p>
        Rata-rata armada kami tiba dalam <strong>15 hingga 30 menit</strong> untuk area Kota Bogor dan pusat pemukiman Kabupaten Bogor. Kami menempatkan armada siaga di berbagai pos strategis (seperti Cibinong, Tanah Sareal, Bogor Barat, Ciawi, Sukaraja, Bojonggede, dan Parung) sehingga penanganan darurat dapat dilakukan dengan sangat cepat.
      </p>
    )
  },
  {
    id: 4,
    question: 'Apakah bisa melayani rumah di gang sempit atau perumahan padat?',
    category: 'Armada & Waktu',
    keywords: ['gang sempit', 'selang panjang', 'perumahan padat', 'truk kompak', '50 meter', '100 meter', 'parkir jauh', 'jangkauan'],
    answerText: 'Tentu saja bisa! Kami memiliki armada truk ukuran kompak yang lincah bermanuver di jalan perumahan, serta dilengkapi selang sambung berdaya hisap tinggi hingga 50 – 100 meter. Meskipun truk tidak bisa parkir tepat di depan pintu pagar rumah Anda, penyedotan tetap berjalan maksimal, bersih, dan tuntas.',
    waTopicText: 'Halo CS Mitra Bersih, saya membaca FAQ tentang layanan rumah di gang sempit & selang panjang 50-100 meter. Rumah saya di gang sempit area Bogor, mohon info teknis penyedotan.',
    answer: (
      <p>
        <strong>Tentu saja bisa!</strong> Kami memiliki armada truk ukuran kompak yang lincah bermanuver di jalan perumahan, serta dilengkapi <strong>selang sambung berdaya hisap tinggi hingga 50 – 100 meter</strong>. Meskipun truk tidak bisa parkir tepat di depan pintu pagar rumah Anda, penyedotan tetap berjalan maksimal, bersih, dan tuntas.
      </p>
    )
  },
  {
    id: 5,
    question: 'Apakah proses pelancaran WC mampet harus membongkar kloset atau lantai?',
    category: 'Tanpa Bongkar',
    keywords: ['tanpa bongkar', 'bongkar kloset', 'lantai', 'spiral', 'electric drain cleaner', 'keramik aman', 'pipa paralon', 'pvc'],
    answerText: '99% pengerjaan kami TANPA BONGKAR! Kami menggunakan mesin electric drain cleaner spiral baja lentur modern yang berputar mengikuti lekukan pipa pembuangan untuk menghancurkan sumbatan (lemak beku, pembalut, sisa kain, dll.). Keramik lantai dan pipa paralon PVC Anda tetap aman, utuh, dan tidak rusak.',
    waTopicText: 'Halo CS Mitra Bersih, saya membaca FAQ tentang pelancaran WC mampet tanpa bongkar dengan mesin spiral. Apakah bisa dicek kendala kloset mampet saya di Bogor?',
    answer: (
      <p>
        <strong>99% pengerjaan kami TANPA BONGKAR!</strong> Kami menggunakan mesin *electric drain cleaner* spiral baja lentur modern yang berputar mengikuti lekukan pipa pembuangan untuk menghancurkan sumbatan (lemak beku, pembalut, sisa kain, dll.). Keramik lantai dan pipa paralon PVC Anda tetap aman, utuh, dan tidak rusak.
      </p>
    )
  },
  {
    id: 6,
    question: 'Apakah layanan benar-benar siaga 24 jam termasuk tengah malam dan hari libur?',
    category: '24 Jam Nonstop',
    keywords: ['24 jam', 'tengah malam', 'hari libur', 'minggu', 'tanggal merah', 'darurat', 'nonstop', 'piket'],
    answerText: 'Ya, kami siap siaga 24 Jam Nonstop setiap hari, termasuk hari Minggu, tengah malam, dan hari libur nasional. Masalah saluran meluap sering kali terjadi tiba-tiba di waktu tak terduga, sehingga tim piket darurat kami selalu siap kapan pun Anda butuhkan.',
    waTopicText: 'Halo CS Mitra Bersih, saya membaca FAQ tentang layanan darurat 24 jam nonstop. Saya membutuhkan penanganan darurat segera untuk lokasi saya di Bogor.',
    answer: (
      <p>
        <strong>Ya, kami siap siaga 24 Jam Nonstop setiap hari</strong>, termasuk hari Minggu, tengah malam, dan hari libur nasional. Masalah saluran meluap sering kali terjadi tiba-tiba di waktu tak terduga, sehingga tim piket darurat kami selalu siap kapan pun Anda butuhkan.
      </p>
    )
  },
  {
    id: 7,
    question: 'Bagaimana prosedur dan syarat klaim garansi jika saluran mampet lagi?',
    category: 'Garansi',
    keywords: ['garansi', 'prosedur garansi', 'syarat klaim', 'mampet lagi', 'komplain', 'gratis', 'nota resmi', 'uji kelancaran'],
    answerText: 'Setiap pengerjaan kami dilengkapi dengan garansi pengerjaan nyata: uji kelancaran bersama Anda sampai benar-benar tuntas, nota pengerjaan resmi dari teknisi Mitra Bersih, dan jika terjadi kendala mampet kembali pada titik yang sama teknisi datang melakukan pengerjaan ulang secara GRATIS.',
    waTopicText: 'Halo CS Mitra Bersih, saya membaca FAQ tentang garansi pengerjaan dan nota resmi. Saya ingin tahu lebih lanjut seputar syarat garansi layanan sedot WC di Bogor.',
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
    id: 8,
    question: 'Bagaimana cara mencegah WC mampet mendadak dan benda apa saja yang dilarang dibuang ke kloset?',
    category: 'Pencegahan',
    keywords: ['pencegahan', 'mencegah wc mampet', 'benda terlarang', 'tisu basah', 'pembalut', 'minyak goreng', 'rambut', 'flushing', 'saringan', 'kebiasaan baik'],
    answerText: 'Pencegahan utama adalah disiplin membuang sampah: jangan pernah membuang tisu basah, pembalut, popok bayi, cotton bud, gumpalan rambut, atau sisa minyak goreng ke dalam kloset karena benda-benda tersebut tidak bisa terurai dan akan menyangkut di leher angsa pipa. Sediakan tempat sampah tertutup di kamar mandi, gunakan volume siraman air (flushing) yang cukup setiap kali buang air besar, dan siram air panas berkala sebulan sekali untuk melarutkan sisa sabun yang menempel di dinding pipa.',
    waTopicText: 'Halo CS Mitra Bersih, saya membaca FAQ tips pencegahan WC mampet. Saya ingin konsultasi pengecekan pipa dan pencegahan saluran tersumbat di rumah saya area Bogor.',
    answer: (
      <>
        <p>
          Kunci utama mencegah WC mampet mendadak adalah menerapkan <strong>kebiasaan sanitasi yang tepat</strong>:
        </p>
        <ul style={{ paddingLeft: '20px', marginTop: '6px', marginBottom: '8px' }}>
          <li>
            <strong>Hindari Benda Terlarang:</strong> Jangan pernah membuang tisu basah, pembalut, popok bayi, <em>cotton bud</em>, gumpalan rambut, puntung rokok, atau sisa minyak goreng ke dalam lubang kloset. Benda-benda ini tidak larut dalam air dan akan menyangkut di leher angsa (<em>P-trap</em>).
          </li>
          <li>
            <strong>Sediakan Tempat Sampah Tertutup:</strong> Letakkan tempat sampah khusus di kamar mandi agar penghuni atau tamu tidak membuang sampah kecil ke kloset.
          </li>
          <li>
            <strong>Siraman Air (Flushing) Cukup:</strong> Pastikan debit air siraman tangki kloset mencukupi agar kotoran terdorong tuntas sampai ke septic tank dan tidak mengendap di tengah jalur pipa horisontal.
          </li>
          <li>
            <strong>Bilas Air Hangat Berkala:</strong> Tuang seember air hangat (bukan air mendidih) sebulan sekali ke dalam kloset dan saluran buang untuk melarutkan kerak sabun dan lemak tipis yang menempel.
          </li>
        </ul>
      </>
    )
  },
  {
    id: 9,
    question: 'Apakah aman menggunakan soda api atau cairan kimia keras untuk mencegah kloset mampet?',
    category: 'Pencegahan',
    keywords: ['soda api', 'cairan kimia keras', 'bahaya soda api', 'pipa paralon rusak', 'pvc', 'bakteri pengurai', 'septic tank penuh', 'alternatif aman', 'pencegahan'],
    answerText: 'Sangat TIDAK disarankan menggunakan soda api atau bahan kimia keras sebagai langkah perawatan atau pencegahan. Reaksi kimia soda api menghasilkan panas ekstrem di atas 100°C yang dapat melunakkan dan merusak pipa paralon PVC, menyebabkan sambungan pipa bocor atau keramik kloset retak. Selain itu, bahan kimia keras mematikan bakteri pengurai alami di septic tank, sehingga tinja tidak membusuk dan septic tank justru menjadi cepat penuh serta berbau menyengat. Gunakan serbuk mikroba pengurai alami ramah lingkungan sebagai alternatif yang aman.',
    waTopicText: 'Halo CS Mitra Bersih, saya membaca FAQ pencegahan mengenai bahaya penggunaan soda api. Saya butuh solusi perawatan pipa yang aman dan ramah lingkungan untuk area Bogor.',
    answer: (
      <>
        <p>
          <strong>Sangat TIDAK disarankan!</strong> Menggunakan soda api atau cairan kimia keras korosif secara rutin untuk pencegahan justru membawa risiko besar:
        </p>
        <ul style={{ paddingLeft: '20px', marginTop: '6px', marginBottom: '8px' }}>
          <li>
            <strong>Merusak Pipa Paralon (PVC):</strong> Reaksi kimia soda api dengan air menimbulkan reaksi termal panas tinggi (&gt;100&deg;C) yang dapat melengkungkan pipa PVC, membuat sambungan lem terlepas, hingga memecahkan porselen mangkuk kloset.
          </li>
          <li>
            <strong>Membunuh Bakteri Pengurai Alami:</strong> Bahan kimia keras yang mengalir ke septic tank akan mematikan koloni bakteri pengurai (anaerob), akibatnya kotoran tidak hancur dan septic tank Anda akan jauh lebih cepat penuh.
          </li>
          <li>
            <strong>Solusi Alternatif Aman:</strong> Gunakan serbuk probiotik / mikroba pengurai hayati organik setiap 4–6 bulan sekali yang aman bagi pipa dan justru menyuburkan bakteri pengurai tinja di dalam tangki.
          </li>
        </ul>
      </>
    )
  },
  {
    id: 10,
    question: 'Bagaimana cara merawat septic tank agar awet, tidak cepat penuh, dan tidak menimbulkan bau ke dalam rumah?',
    category: 'Pencegahan',
    keywords: ['merawat septic tank', 'tidak cepat penuh', 'bebas bau', 'bakteri probiotik', 'pipa ventilasi', 'kuras berkala', 'saluran air sabun', 'resapan', 'pencegahan'],
    answerText: 'Untuk menjaga septic tank tidak cepat penuh dan bebas bau: 1) Pisahkan saluran pembuangan air cucian sabun/deterjen dari saluran tinja agar deterjen tidak membunuh bakteri pengurai di septic tank; 2) Berikan suplemen bakteri pengurai (bio-enzim) setiap 6 bulan sekali; 3) Pastikan lubang pipa hawa/ventilasi septic tank tidak tertutup tanah atau sarang serangga agar gas metana terbuang lancar ke atas; 4) Lakukan kuras sedot septic tank secara rutin tiap 2-3 tahun sekali sebelum lumpur padat mengeras dan menyumbat pori-pori resapan.',
    waTopicText: 'Halo CS Mitra Bersih, saya membaca FAQ pencegahan mengenai cara merawat septic tank agar awet dan tidak cepat penuh. Saya ingin konsultasi jadwal pengurasan septic tank di Bogor.',
    answer: (
      <>
        <p>
          Agar septic tank rumah Anda berfungsi optimal, awet belasan tahun, dan bebas bau, terapkan 4 langkah pencegahan berikut:
        </p>
        <ol style={{ paddingLeft: '20px', marginTop: '6px', marginBottom: '8px' }}>
          <li>
            <strong>Pisahkan Saluran Limbah Sabun:</strong> Jangan gabungkan buangan mesin cuci, air mandi, atau sabun deterjen ke dalam septic tank. Bahan pemutih dan deterjen kimia mematikan mikroorganisme pengurai tinja.
          </li>
          <li>
            <strong>Jaga Sirkulasi Pipa Ventilasi (Pipa Hawa T):</strong> Pastikan pipa ventilasi udara septic tank berada di posisi terbuka bebas hambatan dan tidak tertutup lumut atau sarang serangga, agar sirkulasi gas metana stabil dan tidak membalik ke kloset rumah.
          </li>
          <li>
            <strong>Tambahkan Bakteri Pengurai Berkala:</strong> Berikan bubuk atau cairan kultur bakteri probiotik setiap 6 bulan sekali untuk membantu proses pencernaan endapan feses padat menjadi cair.
          </li>
          <li>
            <strong>Jadwalkan Kuras Rutin 2–3 Tahun Sekali:</strong> Jangan menunggu sampai air WC meluap. Pengurasan rutin mencegah lumpur tinja padat (sludge) mengendap permanen dan menutup pori-pori tanah resapan tangki.
          </li>
        </ol>
      </>
    )
  }
];

export const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': FAQ_DATA.map((item) => ({
    '@type': 'Question',
    'name': item.question,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': item.answerText
    }
  }))
};

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
  month?: string;
  monthKey?: string;
  viewsEstimate?: string;
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
  },
  {
    id: 5,
    title: 'Tips Perawatan Berkala Pipa PVC Rumah Tangga Agar Bebas Kerak Lemak & Awet Puluhan Tahun',
    category: 'Tips Perawatan',
    readTime: '4 Menit Baca',
    date: '02 Okt 2026',
    image: articleImg2,
    fallbackImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=80',
    excerpt: 'Pipa pembuangan PVC seringkali menyempit akibat tumpukan buih sabun dan lemak beku. Terapkan 4 langkah perawatan mandiri setiap bulan tanpa merusak sambungan lem pipa.',
    content: {
      intro: 'Banyak pemilik rumah tidak menyadari bahwa saluran pipa pembuangan air kotor di bawah lantai perlahan mengalami penyempitan diameter pipa akibat kerak sabun dan lemak dapur yang mengeras.',
      points: [
        {
          heading: '1. Siram dengan Air Hangat Berkala Seminggu Sekali',
          text: 'Mengalirkan air panas bersuhu 60–70°C secara rutin membantu melunakkan lapisan lemak tipis sebelum mengeras menjadi kerak kapur yang membatu.'
        },
        {
          heading: '2. Gunakan Campuran Soda Kue dan Cuka Putih Alami',
          text: 'Reaksi asam asetat cuka dan natrium bikarbonat menghasilkan gelembung CO2 yang mengikis kotoran organik di dinding pipa tanpa mengikis lapisan PVC.'
        },
        {
          heading: '3. Pasang Saringan Kawat Stainless di Setiap Afur Pembuangan',
          text: 'Saringan berpori halus menangkap 95% serat rambut dan sisa makanan sebelum masuk ke belokan elbow pipa.'
        },
        {
          heading: '4. Hindari Bahan Kimia Korosif Terlalu Sering',
          text: 'Zat kimia keras dapat melarutkan lem sambungan pipa PVC dan memicu rembesan air kotor di bawah pondasi lantai rumah.'
        }
      ],
      conclusion: 'Perawatan mandiri yang teratur menghemat biaya pemanggilan teknisi darurat dan menjamin saluran pembuangan rumah Anda lancar sepanjang tahun.'
    }
  },
  {
    id: 6,
    title: 'Panduan Sanitasi Septic Tank Sesuai Standar SNI untuk Wilayah Padat Penduduk di Bogor',
    category: 'Panduan Sanitasi',
    readTime: '5 Menit Baca',
    date: '29 Sep 2026',
    image: articleImg1,
    fallbackImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80',
    excerpt: 'Standar baku Kementerian Kesehatan dan SNI 2398:2017 mengatur jarak aman resapan ke sumber air minum serta frekuensi kuras rutin. Simak poin pentingnya untuk hunian Anda.',
    content: {
      intro: 'Kepadatan pemukiman di Kota dan Kabupaten Bogor menuntut kepatuhan terhadap standar sanitasi lingkungan agar limbah tinja tidak mencemari lapisan air tanah dangkal yang digunakan warga.',
      points: [
        {
          heading: '1. Aturan Jarak Minimal 10 Meter ke Sumur Bor',
          text: 'Bakteri patogen seperti E. Coli dapat meresap melalui pori-pori tanah hingga radius 8 meter. Menjaga jarak 10 meter adalah syarat mutlak air sumur layak pakai.'
        },
        {
          heading: '2. Konstruksi Dua Kompartemen Kedap Air',
          text: 'Septic tank yang baik memiliki ruang pengendapan pertama yang kedap air dan ruang resapan kedua dengan filter kerikil serta ijuk aktif.'
        },
        {
          heading: '3. Wajib Pipa Ventilasi Udara dengan Kassa Nyamuk',
          text: 'Cerobong hawa vertikal mencegah ledakan gas metana dan diberi saringan kawat agar tidak menjadi sarang nyamuk demam berdarah.'
        },
        {
          heading: '4. Jadwal Pengurasan Maksimal 3 Tahun Sekali',
          text: 'Lumpur tinja mati yang mengendap wajib disedot secara profesional agar tidak meluap ke saluran drainase got pemukiman.'
        }
      ],
      conclusion: 'Mematuhi standar sanitasi bukan hanya menjaga kenyamanan keluarga Anda, tetapi juga melindungi kesehatan lingkungan tetangga di sekitar tempat tinggal.'
    }
  },
  {
    id: 7,
    title: 'Solusi Cepat Mengatasi Air Buangan Dapur & Mesin Cuci Meluap ke Lantai Saat Digunakan',
    category: 'Solusi Saluran',
    readTime: '3 Menit Baca',
    date: '20 Sep 2026',
    image: articleImg3,
    fallbackImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=700&q=80',
    excerpt: 'Air buangan busa deterjen mesin cuci yang meluap balik ke kamar mandi menandakan adanya sumbatan serat pakaian dan kerak busa di pipa cabang. Ini solusinya.',
    content: {
      intro: 'Pompa pembuangan mesin cuci membuang debit air besar dalam waktu singkat. Jika pipa cabang terhambat, air berbusa akan mencari jalur keluar terendah seperti floor drain kamar mandi.',
      points: [
        {
          heading: '1. Bersihkan Filter Serat Kain pada Mesin Cuci',
          text: 'Serat benang pakaian yang lolos akan menggumpal dengan busa deterjen di dalam pipa PVC dan membentuk sumbatan seperti wol basah.'
        },
        {
          heading: '2. Gunakan Mesin Spiral Baja Tanpa Kimia',
          text: 'Kawat spiral bermesin rotasi tinggi mampu menarik gumpalan serat kain dan kotoran keluar dari pipa tanpa risiko kebocoran sambungan.'
        },
        {
          heading: '3. Pasang Pipa Pembuangan dengan Diameter Minimal 2 Inci',
          text: 'Untuk pembuangan mesin cuci dan wastafel cuci piring, pipa berdiameter minimal 2–2.5 inci diperlukan untuk menampung debit debit air pompa.'
        },
        {
          heading: '4. Periksa Bak Kontrol Akhir Komplek',
          text: 'Pastikan bak kontrol tidak tertutup sedimentasi pasir agar aliran air buangan lancar terbuang ke drainase umum komplek.'
        }
      ],
      conclusion: 'Jika genangan air buangan sudah meluap ke lantai, segera lakukan pelancaran mekanis bersama tim profesional Mitra Bersih untuk penanganan cepat tanpa bongkar.'
    }
  }
];

export interface ArchiveMonthTab {
  key: string;
  label: string;
  period: string;
  count: number;
  icon: string;
}

export const ARCHIVE_MONTH_TABS: ArchiveMonthTab[] = [
  { key: 'all', label: 'Semua Periode', period: 'Mei – Agu 2026', count: 11, icon: 'fa-layer-group' },
  { key: 'agustus-2026', label: 'Agustus 2026', period: 'Bulan Lalu', count: 3, icon: 'fa-calendar-alt' },
  { key: 'juli-2026', label: 'Juli 2026', period: '2 Bulan Lalu', count: 3, icon: 'fa-calendar-alt' },
  { key: 'juni-2026', label: 'Juni 2026', period: '3 Bulan Lalu', count: 3, icon: 'fa-calendar-alt' },
  { key: 'mei-2026', label: 'Mei 2026', period: '4 Bulan Lalu', count: 2, icon: 'fa-calendar-alt' }
];

export const ARCHIVED_ARTICLES_DATA: ArticleItem[] = [
  {
    id: 101,
    title: 'Persiapan Menghadapi Puncak Musim Hujan di Bogor: Cegah Septic Tank Meluap & Banjir Saluran',
    category: 'Panduan Musim Hujan',
    readTime: '4 Menit Baca',
    date: '24 Agu 2026',
    month: 'Agustus 2026',
    monthKey: 'agustus-2026',
    viewsEstimate: '1.8k dibaca',
    image: '/src/assets/images/musim_hujan_septic_tank_1791377684411.jpg',
    fallbackImage: '/src/assets/images/musim_hujan_septic_tank_1791377684411.jpg',
    excerpt: 'Tingginya curah hujan di Kota Hujan Bogor seringkali membuat tanah resapan jenuh air. Simak 4 langkah pencegahan luapan air kotor ke dalam hunian keluarga.',
    content: {
      intro: 'Sebagai wilayah dengan julukan Kota Hujan, intensitas curah hujan di Bogor dapat mencapai rekor ekstrem dalam waktu singkat. Hal ini berdampak langsung pada penurunan daya serap lapisan tanah di sekitar bak septic tank rumah tangga.',
      points: [
        {
          heading: '1. Periksa Tutup Bak Kontrol & Pipa Hawa (Vent Pipe)',
          text: 'Pastikan tutup manhole tidak berada di bawah genangan halaman dan cerobong udara memiliki penutup payung agar air hujan tidak mengalir masuk ke dalam tangki limbah.'
        },
        {
          heading: '2. Hindari Menyiram Air Berlebih Saat Hujan Deras',
          text: 'Saat tanah luar sedang jenuh air, batasi beban buangan air kamar mandi agar volume air di dalam tangki resapan tidak meluap balik ke pipa kloset.'
        },
        {
          heading: '3. Pasang Katup Backflow Valve di Saluran Utama',
          text: 'Backflow valve mencegah air got perkotaan yang meluap masuk kembali ke saluran pembuangan dapur atau kamar mandi rumah Anda.'
        },
        {
          heading: '4. Jadwalkan Pengurasan Sebelum Puncak Hujan Tiba',
          text: 'Menguras endapan lumpur padat sebelum musim hujan memastikan kapasitas ruang tangki maksimal dan siap menampung debit limbah harian.'
        }
      ],
      conclusion: 'Tindakan pencegahan sebelum musim hujan jauh lebih hemat dan menenangkan daripada harus menangani banjir air limbah yang meluap di lantai rumah.'
    }
  },
  {
    id: 102,
    title: 'Perbedaan Septic Tank Konvensional Bata vs Biofilter Biotech Ramah Lingkungan',
    category: 'Teknologi Sanitasi',
    readTime: '5 Menit Baca',
    date: '16 Agu 2026',
    month: 'Agustus 2026',
    monthKey: 'agustus-2026',
    viewsEstimate: '2.1k dibaca',
    image: '/src/assets/images/biofilter_septic_tank_1791377699972.jpg',
    fallbackImage: '/src/assets/images/biofilter_septic_tank_1791377699972.jpg',
    excerpt: 'Bingung memilih bak penampungan untuk renovasi rumah? Pahami kelebihan dan kekurangan septic tank rembesan bata konvensional dibanding biofilter modern.',
    content: {
      intro: 'Perkembangan konstruksi modern kini menghadirkan septic tank biofilter berbahan fiberglass yang dilengkapi media sel pengurai dan disinfektan klorin sebagai alternatif resapan bata konvensional.',
      points: [
        {
          heading: '1. Sistem Kerja Resapan vs Penyaringan Multi-Tahap',
          text: 'Septic tank bata mengandalkan daya serap tanah sekitar, sedangkan biofilter menyaring limbah melalui media biokontaktor bakteri dan menghasilkan air buangan yang layak dialirkan ke selokan.'
        },
        {
          heading: '2. Risiko Pencemaran Air Tanah di Pemukiman Padat',
          text: 'Di perumahan Bogor yang padat dengan jarak sumur bor kurang dari 10 meter, biofilter jauh lebih aman karena tidak merembeskan bakteri tinja ke dalam air tanah.'
        },
        {
          heading: '3. Daya Tahan Material dan Kekedapan Air',
          text: 'Biofilter fiberglass tahan bocor dan korosi hingga puluhan tahun, sementara bak bata dapat mengalami keretakan akibat gempa mikro atau pergeseran tanah liat Bogor.'
        },
        {
          heading: '4. Kebutuhan Perawatan dan Frekuensi Sedot',
          text: 'Keduanya tetap memerlukan pengurasan berkala saat lumpur mati menumpuk, namun biofilter umumnya memiliki interval sedot yang lebih terprediksi.'
        }
      ],
      conclusion: 'Untuk kawasan perumahan padat di Bogor, penggunaan septic tank biofilter sangat disarankan demi menjaga kelestarian sumber air tanah keluarga.'
    }
  },
  {
    id: 103,
    title: 'Daftar 6 Benda Terlarang yang Tidak Boleh Dibuang ke Kloset Agar Pipa Aman',
    category: 'Tips Pencegahan',
    readTime: '3 Menit Baca',
    date: '05 Agu 2026',
    month: 'Agustus 2026',
    monthKey: 'agustus-2026',
    viewsEstimate: '1.5k dibaca',
    image: '/src/assets/images/benda_terlarang_kloset_1791376781169.jpg',
    fallbackImage: '/src/assets/images/benda_terlarang_kloset_1791376781169.jpg',
    excerpt: 'Tisu basah, pembalut, cotton bud, hingga minyak jelantah sering dianggap sepele namun memicu 90% kasus kloset tersumbat darurat di pemukiman.',
    content: {
      intro: 'Kloset dirancang secara mekanis hanya untuk menampung kotoran manusia dan air bilasan. Membuang benda sintetis ke dalam lubang toilet menjadi penyebab utama pipa mampet total.',
      points: [
        {
          heading: '1. Tisu Basah (Wet Wipes)',
          text: 'Meskipun bertuliskan flushable, tisu basah mengandung serat sintetis yang tidak terurai oleh air dan akan membentuk gumpalan keras di leher pipa.'
        },
        {
          heading: '2. Pembalut & Popok Bayi',
          text: 'Material penyerap gel di dalam pembalut akan mengembang berlipat ganda saat terkena air dan menyumbat total leher angsa kloset.'
        },
        {
          heading: '3. Minyak Goreng & Lemak Kuah Makanan',
          text: 'Minyak yang dituang ke WC akan mendingin dan menempel pada pipa PVC, mengeras seperti semen dan mempersempit jalur aliran kotoran.'
        },
        {
          heading: '4. Rambut Rontok & Dental Floss',
          text: 'Benang gigi dan jalinan rambut bertindak sebagai jaring penangkap kotoran lain di dalam pipa, memicu sumbatan yang liat dan sulit diurai.'
        }
      ],
      conclusion: 'Sediakan tempat sampah kecil tertutup di dalam kamar mandi dan edukasi seluruh anggota keluarga untuk tidak membuang sampah ke kloset.'
    }
  },
  {
    id: 104,
    title: 'Panduan Perawatan Grease Trap (Perangkap Lemak) Dapur Rumah & Restoran Kuliner Bogor',
    category: 'Sanitasi Usaha',
    readTime: '4 Menit Baca',
    date: '28 Jul 2026',
    month: 'Juli 2026',
    monthKey: 'juli-2026',
    viewsEstimate: '1.9k dibaca',
    image: '/src/assets/images/perawatan_grease_trap_1791377714394.jpg',
    fallbackImage: '/src/assets/images/perawatan_grease_trap_1791377714394.jpg',
    excerpt: 'Bagi pemilik usaha kuliner di Bogor, grease trap wajib dibersihkan teratur agar limbah lemak tidak membatu dan menimbulkan aroma tak sedap.',
    content: {
      intro: 'Kota Bogor yang kaya dengan destinasi wisata kuliner menuntut standar kebersihan saluran dapur yang ketat. Lemak makanan dari pencucian piring adalah musuh utama pipa pembuangan umum.',
      points: [
        {
          heading: '1. Cara Kerja Pemisahan Lemak & Air',
          text: 'Grease trap memanfaatkan perbedaan massa jenis: lemak dan minyak mengapung di permukaan kompartemen pertama, sementara air bersih mengalir ke saluran kota.'
        },
        {
          heading: '2. Jadwal Pembersihan Rutin Mingguan',
          text: 'Untuk restoran aktif, penyendokan kerak minyak mengapung wajib dilakukan setiap 2–3 hari sekali sebelum lapisan lemak menebal dan membusuk.'
        },
        {
          heading: '3. Pencegahan Bau Menyengat di Ruang Makan',
          text: 'Grease trap yang tidak terawat menghasilkan asam lemak volatil berbau asam busuk yang dapat mengganggu kenyamanan pelanggan restoran Anda.'
        },
        {
          heading: '4. Kapan Harus Menggunakan Jasa Sedot Lemak Vakum?',
          text: 'Jika pipa pembuangan setelah grease trap sudah terlanjur tersumbat kerak kapur lemak, pembersihan bertekanan tinggi (hydro-jetting) diperlukan.'
        }
      ],
      conclusion: 'Disiplin merawat grease trap menghindarkan tempat usaha Anda dari sanksi kebersihan dan menjamin operasional dapur berjalan lancar.'
    }
  },
  {
    id: 105,
    title: 'Berapa Kapasitas Ideal Septic Tank untuk Rumah 2 Lantai dan Keluarga 6–8 Orang?',
    category: 'Konstruksi Rumah',
    readTime: '4 Menit Baca',
    date: '14 Jul 2026',
    month: 'Juli 2026',
    monthKey: 'juli-2026',
    viewsEstimate: '2.4k dibaca',
    image: '/src/assets/images/kapasitas_septic_tank_1791377730119.jpg',
    fallbackImage: '/src/assets/images/kapasitas_septic_tank_1791377730119.jpg',
    excerpt: 'Rumus perhitungan volume bak septik standar SNI agar tidak cepat penuh dan tidak membebani resapan tanah di kontur perbukitan Bogor.',
    content: {
      intro: 'Menentukan ukuran septic tank yang tepat saat membangun atau merenovasi rumah dua lantai adalah kunci kenyamanan jangka panjang bagi keluarga besar.',
      points: [
        {
          heading: '1. Rumus Estimasi SNI: Debit Limbah Harian',
          text: 'Rata-rata manusia menghasilkan 20–30 liter lumpur tinja per tahun dan sekitar 100 liter limbah cair per hari. Untuk 8 orang, volume minimal yang disarankan adalah 2.500–3.000 liter.'
        },
        {
          heading: '2. Pemisahan Kompartemen Pengendapan dan Resapan',
          text: 'Bak pertama (ruang lumpur) idealnya berukuran 2/3 dari total volume, sedangkan bak kedua (ruang resapan) berukuran 1/3 dengan lapisan ijuk, kerikil, dan pasir aktif.'
        },
        {
          heading: '3. Penyesuaian dengan Kontur Tanah Liat Bogor',
          text: 'Sebagian besar tanah di kawasan Bogor memiliki kadar lempung tinggi dengan daya serap sedang, sehingga bak resapan membutuhkan luas bidang kontak lebih lebar.'
        },
        {
          heading: '4. Manhole Akses Sedot yang Ergonomis',
          text: 'Pastikan selalu menyediakan lubang kontrol (manhole) berdiameter minimal 40 cm di atas tangki agar selang armada sedot dapat masuk tanpa merusak keramik.'
        }
      ],
      conclusion: 'Perencanaan kapasitas septic tank yang proporsional menghemat biaya perawatan dan menjamin tangki dapat bertahan bertahun-tahun tanpa kendala.'
    }
  },
  {
    id: 106,
    title: 'Kenapa Kloset Sering Berbau Saat Cuaca Panas Terik? Ini Penjelasan Ilmiah & Solusinya',
    category: 'Kesehatan Rumah',
    readTime: '3 Menit Baca',
    date: '02 Jul 2026',
    month: 'Juli 2026',
    monthKey: 'juli-2026',
    viewsEstimate: '1.6k dibaca',
    image: '/src/assets/images/kloset_bau_panas_1791377749144.jpg',
    fallbackImage: '/src/assets/images/kloset_bau_panas_1791377749144.jpg',
    excerpt: 'Suhu udara tinggi mempercepat fermentasi bakteri anaerob di dalam septic tank. Pelajari cara memperbaiki perangkap air leher angsa dan ventilasi T.',
    content: {
      intro: 'Pada saat terik matahari memuncak di kawasan Bogor, banyak pemilik rumah mengeluhkan aroma tak sedap yang tiba-tiba menyeruak dari kamar mandi meskipun kloset sudah dibersihkan higienis.',
      points: [
        {
          heading: '1. Peningkatan Laju Reaksi Fermentasi Gas Metana',
          text: 'Peningkatan suhu lingkungan mempercepat metabolisme bakteri anaerob di dalam tangki, menghasilkan lonjakan volume gas hidrogen sulfida berbau belerang.'
        },
        {
          heading: '2. Penguapan Air Water-Seal pada Kloset',
          text: 'Panas udara memicu penguapan air di leher angsa kloset atau floor drain yang jarang disiram, membuka celah bagi gas septic tank untuk naik ke ruangan.'
        },
        {
          heading: '3. Tekanan Udara Termal di Saluran Pipa',
          text: 'Udara panas di dalam pipa ventilasi septic tank bergerak ke atas dan menciptakan perbedaan tekanan yang mendorong gas keluar melalui sambungan pipa yang longgar.'
        },
        {
          heading: '4. Solusi Efektif Mengatasi Bau Panas',
          text: 'Siram kloset secara berkala, pastikan cerobong ventilasi T bersih dari sarang serangga, dan berikan kultur bakteri aerob pengurai bau.'
        }
      ],
      conclusion: 'Jangan abaikan bau menyengat di kamar mandi Anda; periksa leher angsa dan saluran pernapasan septic tank secara teratur.'
    }
  },
  {
    id: 107,
    title: 'Langkah Tepat Memilih Jasa Sedot WC di Bogor: Waspada Oknum Tukang Tembak Harga!',
    category: 'Tips Konsumen',
    readTime: '5 Menit Baca',
    date: '26 Jun 2026',
    month: 'Juni 2026',
    monthKey: 'juni-2026',
    viewsEstimate: '3.2k dibaca',
    image: '/src/assets/images/memilih_jasa_sedot_wc_1791377760821.jpg',
    fallbackImage: '/src/assets/images/memilih_jasa_sedot_wc_1791377760821.jpg',
    excerpt: 'Banyak warga mengeluhkan tarif yang melambung berkali-kali lipat saat pengerjaan. Ini 5 tips memastikan Anda mendapatkan jasa bergaransi dan harga transparan.',
    content: {
      intro: 'Modus oknum tidak bertanggung jawab yang memasang tarif murah di iklan namun menagih jutaan rupiah dengan dalih hitungan per meter selang atau per kubik fiktif masih sering terjadi.',
      points: [
        {
          heading: '1. Selalu Sepakati Harga Final Per Rit di Awal',
          text: 'Jasa profesional resmi seperti Mitra Bersih selalu menawarkan skema harga paket per rit/tangki tuntas, tanpa biaya tersembunyi untuk panjang selang atau waktu kerja.'
        },
        {
          heading: '2. Pastikan Armada Truk Memiliki Tangki Transparan/Kaca Intip',
          text: 'Sebelum penyedotan dimulai, periksa bahwa tangki truk vakum dalam kondisi kosong melalui indikator kaca intip belakang tangki.'
        },
        {
          heading: '3. Verifikasi Surat Jalan & Surat Garansi Tertulis',
          text: 'Layanan terpercaya selalu memberikan bukti pengerjaan resmi dan garansi pekerjaan gratis jika kloset kembali mampet dalam masa garansi.'
        },
        {
          heading: '4. Pembayaran Setelah Hasil Kerja Terbukti Lancar',
          text: 'Jangan pernah memberikan uang muka (DP) di awal. Lakukan pembayaran hanya setelah Anda menguji flush kloset dan saluran terbukti lancar sempurna.'
        }
      ],
      conclusion: 'Menjadi konsumen yang teliti akan melindungi dompet Anda dan menjamin septic tank rumah ditangani oleh teknisi profesional bersertifikat.'
    }
  },
  {
    id: 108,
    title: 'Solusi Penanganan Saluran Got Komplek Mampet Akibat Sedimen Pasir & Sampah Liar',
    category: 'Saluran Publik',
    readTime: '4 Menit Baca',
    date: '15 Jun 2026',
    month: 'Juni 2026',
    monthKey: 'juni-2026',
    viewsEstimate: '1.7k dibaca',
    image: '/src/assets/images/saluran_got_komplek_1791377780714.jpg',
    fallbackImage: '/src/assets/images/saluran_got_komplek_1791377780714.jpg',
    excerpt: 'Got depan rumah meluap saat hujan deras? Simak metode hydro-jetting tekanan tinggi dan penggunaan kawat spiral fleksibel tanpa merusak semen trotoar.',
    content: {
      intro: 'Saluran drainase air hujan dan buangan rumah tangga di perumahan seringkali tersumbat akibat endapan tanah liat, pasir sisa pembangunan, dan sampah kantong plastik.',
      points: [
        {
          heading: '1. Masalah Endapan Sedimen yang Membatu',
          text: 'Lumpur dan pasir yang terbawa arus hujan lama-kelamaan memadat di dasar buis beton got, mempersempit kapasitas debit air hingga 70%.'
        },
        {
          heading: '2. Bahaya Membongkar Trotoar Tanpa Alat Modern',
          text: 'Membongkar lantai semen got membutuhkan biaya renovasi yang mahal. Solusi modern menggunakan mesin spiral lentur dapat melancarkan sumbatan dari bak kontrol tanpa bongkar.'
        },
        {
          heading: '3. Teknologi Hydro-Jetting Bertekanan Tinggi',
          text: 'Semprotan air bertekanan hingga 200 bar mampu menyapu bersih endapan lumpur keras dan mendorong sampah keluar menuju saluran induk komplek.'
        },
        {
          heading: '4. Gotong Royong Warga & Penutup Grill Besi',
          text: 'Pemasangan saringan grill besi di setiap bibir saluran depan rumah sangat efektif mencegah dedaunan dan botol plastik masuk ke gorong-gorong tertutup.'
        }
      ],
      conclusion: 'Pemeliharaan got secara rutin menjaga perumahan tetap asri, bebas nyamuk demam berdarah, dan aman dari bahaya banjir luapan air hujan.'
    }
  },
  {
    id: 109,
    title: 'Pentingnya Desain Pipa Hawa (Ventilation Pipe) Septic Tank untuk Keamanan Rumah Anda',
    category: 'Keamanan Sanitasi',
    readTime: '3 Menit Baca',
    date: '03 Jun 2026',
    month: 'Juni 2026',
    monthKey: 'juni-2026',
    viewsEstimate: '1.4k dibaca',
    image: '/src/assets/images/pipa_hawa_septic_tank_1791377792952.jpg',
    fallbackImage: '/src/assets/images/pipa_hawa_septic_tank_1791377792952.jpg',
    excerpt: 'Gas metana yang terperangkap tanpa ventilasi dapat menimbulkan risiko tekanan balik dan bau busuk yang masuk ke ventilasi kamar tidur.',
    content: {
      intro: 'Pipa hawa seringkali dianggap sebagai detail kecil yang diabaikan saat tukang memasang septic tank, padahal fungsinya sangat krusial bagi keselamatan dan kelancaran sirkulasi udara tangki.',
      points: [
        {
          heading: '1. Fungsi Pembuangan Gas Metana yang Mudah Terbakar',
          text: 'Penguraian tinja menghasilkan gas metana (CH4). Tanpa pipa pembuangan, gas akan terakumulasi dan menciptakan tekanan tinggi yang dapat meretakkan dinding bak septic tank.'
        },
        {
          heading: '2. Mencegah Fenomena Air Kloset Macet (Air Lock)',
          text: 'Ketika kotoran baru masuk dari kloset, udara di dalam tangki harus memiliki jalur keluar. Jika pipa ventilasi tersumbat, udara terperangkap dan menahan air kloset agar tidak turun.'
        },
        {
          heading: '3. Standar Ketinggian Pipa Hawa SNI',
          text: 'Pipa ventilasi sebaiknya dipasang vertikal dengan tinggi minimal 2 meter di atas permukaan tanah dan dilengkapi penutup berbentuk huruf T atau pipa saringan kawat kassa.'
        },
        {
          heading: '4. Posisi Penempatan yang Jauh dari Jendela Kamar',
          text: 'Hindari mengarahkan ujung pipa ventilasi tepat di dekat jendela kamar tidur atau ruang keluarga agar aroma gas buangan tidak terbawa angin ke dalam ruangan.'
        }
      ],
      conclusion: 'Periksa kondisi pipa hawa septic tank rumah Anda hari ini; pastikan tidak ada sarang burung atau sarang lebah yang menyumbat jalur pembuangan gas.'
    }
  },
  {
    id: 110,
    title: 'Tips Sanitasi Toilet Bersih Menjelang Mudik & Meninggalkan Rumah Kosong Berhari-hari',
    category: 'Tips Rumah Tangga',
    readTime: '3 Menit Baca',
    date: '25 Mei 2026',
    month: 'Mei 2026',
    monthKey: 'mei-2026',
    viewsEstimate: '2.0k dibaca',
    image: '/src/assets/images/sanitasi_toilet_mudik_1791377807924.jpg',
    fallbackImage: '/src/assets/images/sanitasi_toilet_mudik_1791377807924.jpg',
    excerpt: 'Sebelum bepergian libur panjang, pastikan leher angsa terisi dan tutup lubang floor drain agar kecoa dan bau got tidak naik ke dalam hunian.',
    content: {
      intro: 'Meninggalkan rumah dalam keadaan kosong selama berminggu-minggu saat mudik atau liburan panjang seringkali menyisakan kejutan aroma tak sedap di kamar mandi saat Anda pulang.',
      points: [
        {
          heading: '1. Bersihkan Mangkuk Kloset Sebelum Berangkat',
          text: 'Sikat mangkuk kloset dan siram bersih. Endapan kotoran yang tertinggal berhari-hari dalam kondisi lembap akan menjadi sarang jamur hitam yang membandel.'
        },
        {
          heading: '2. Tambahkan Sedikit Air & Minyak Goreng ke Floor Drain',
          text: 'Tetesan sedikit minyak di atas air perangkap leher angsa floor drain membentuk lapisan tipis yang mencegah penguapan air selama rumah ditinggal.'
        },
        {
          heading: '3. Pasang Penutup Karet pada Seluruh Lubang Pembuangan',
          text: 'Tutup lubang wastafel dan saringan lantai dengan penutup silikon kedap udara untuk mencegah kecoa got atau tikus naik ke kamar mandi.'
        },
        {
          heading: '4. Matikan Stop Kran Utama Pipa Air Bersih',
          text: 'Mematikan keran utama meteran air PDAM mencegah kebocoran mendadak pada pelampung kloset yang dapat menyebabkan banjir tersembunyi.'
        }
      ],
      conclusion: 'Dengan menerapkan langkah sederhana ini, Anda dapat menikmati liburan dengan tenang dan kembali ke rumah yang tetap wangi dan bersih.'
    }
  },
  {
    id: 111,
    title: 'Cara Mengatasi Kloset Duduk Rusak Tombol Flush & Air Mengalir Terus ke Mangkok WC',
    category: 'Panduan Mandiri',
    readTime: '4 Menit Baca',
    date: '09 Mei 2026',
    month: 'Mei 2026',
    monthKey: 'mei-2026',
    viewsEstimate: '1.9k dibaca',
    image: '/src/assets/images/tombol_flush_kloset_1791377819244.jpg',
    fallbackImage: '/src/assets/images/tombol_flush_kloset_1791377819244.jpg',
    excerpt: 'Air tangki kloset merembes terus-menerus bisa membuat tagihan PDAM membengkak. Kenali kerusakan pelampung, flapper seal, dan cara perbaikannya.',
    content: {
      intro: 'Suara air gemericik pelan yang tidak pernah berhenti di dalam kloset duduk adalah tanda bahwa katup pengisian atau katup pembilasan tangki mengalami kebocoran mekanis.',
      points: [
        {
          heading: '1. Kenali Bagian Flapper Valve (Karet Katup Bawah)',
          text: 'Flapper valve yang aus, berkerak kapur, atau kotor oleh lumut tidak dapat menutup lubang pembilas dengan rapat, menyebabkan air mengalir terus ke mangkuk kloset.'
        },
        {
          heading: '2. Periksa Ketinggian Pelampung (Fill Valve)',
          text: 'Jika pelampung disetel terlalu tinggi, air akan terus mengalir hingga meluap ke pipa overflow darurat. Putar sekrup penyetel pelampung searah jarum jam untuk menurunkan batas air.'
        },
        {
          heading: '3. Rantai Tombol Flush Terlilit atau Terlalu Pendek',
          text: 'Rantai penghubung antara tombol flush dan flapper karet yang terlalu tegang akan menahan katup tetap terbuka sedikit. Sesuaikan panjang mata rantai agar pas.'
        },
        {
          heading: '4. Mengganti Seal Karet yang Mengeras',
          text: 'Di toko bangunan terdekat di Bogor, set seal flapper universal dijual dengan harga terjangkau dan dapat diganti sendiri tanpa perlu membongkar kloset.'
        }
      ],
      conclusion: 'Memperbaiki kebocoran kloset duduk dengan cepat menyelamatkan ratusan liter air bersih setiap hari dan menghemat biaya tagihan air keluarga Anda.'
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

const TESTIMONI_WA_TOPICS = [
  {
    id: 'darurat',
    label: 'Pesan Panggilan Darurat',
    badge: 'Siaga 24 Jam Nonstop',
    icon: 'fas fa-bolt',
    desc: 'Armada siaga meluncur 15–30 menit ke lokasi Anda di Bogor',
    text: 'Halo Admin Mitra Bersih, saya ingin Pesan Panggilan Darurat untuk penanganan segera (WC meluap / saluran mampet parah). Mohon kirimkan armada terdekat ke lokasi saya di Bogor.'
  },
  {
    id: 'tanya-harga',
    label: 'Tanya Harga',
    badge: 'Transparan Tanpa Biaya Siluman',
    icon: 'fas fa-calculator',
    desc: 'Konsultasi gratis estimasi tarif pasti sebelum teknisi mulai bekerja',
    text: 'Halo Admin Mitra Bersih, saya ingin Tanya Harga estimasi biaya sedot WC / pelancaran saluran mampet untuk rumah/tempat usaha saya di wilayah Bogor.'
  },
  {
    id: 'konsultasi-garansi',
    label: 'Konsultasi Garansi',
    badge: 'Garansi Resmi & Pengerjaan Ulang Gratis',
    icon: 'fas fa-shield-alt',
    desc: 'Tanya syarat garansi, nota pengerjaan resmi, dan jaminan tuntas',
    text: 'Halo Admin Mitra Bersih, saya ingin Konsultasi Garansi dan menanyakan prosedur jaminan pengerjaan tuntas untuk layanan sedot WC di Bogor.'
  }
];

interface MapHub {
  id: string;
  name: string;
  shortLabel: string;
  badge: string;
  address: string;
  coverage: string;
  estTime: string;
  trucks: string;
  mapQuery: string;
  coordinates: { lat: number; lng: number };
}

const MAP_HUBS: MapHub[] = [
  {
    id: 'kota-bogor',
    name: 'Pos Pusat Kota Bogor (Workshop Utama)',
    shortLabel: 'Kota Bogor (Pusat)',
    badge: 'HQ & Workshop',
    address: 'Jl. Sholeh Iskandar & Jl. Raya Pajajaran, Kota Bogor, Jawa Barat',
    coverage: 'Tanah Sareal, Bogor Tengah, Bogor Barat, Bogor Timur, Bogor Utara, Bogor Selatan',
    estTime: '15 – 25 Menit',
    trucks: '3 Truk Tangki Vakum (3.000L & 4.500L) + Mesin Spiral',
    mapQuery: 'Kota Bogor, Jawa Barat',
    coordinates: { lat: -6.5971, lng: 106.806 }
  },
  {
    id: 'cibinong',
    name: 'Pos Siaga Cibinong & Sentul (Bogor Timur)',
    shortLabel: 'Cibinong & Sentul',
    badge: 'Pos Siaga Timur',
    address: 'Kawasan Pemda Tegar Beriman, Cibinong, Kabupaten Bogor',
    coverage: 'Cibinong, Sentul, Sukaraja, Bojonggede, Citeureup, Babakan Madang',
    estTime: '15 – 25 Menit',
    trucks: '2 Truk Tangki Vakum + Selang Panjang 100m',
    mapQuery: 'Cibinong, Bogor, Jawa Barat',
    coordinates: { lat: -6.4817, lng: 106.8542 }
  },
  {
    id: 'dramaga',
    name: 'Pos Siaga Bogor Barat & Dramaga',
    shortLabel: 'Dramaga & Ciomas',
    badge: 'Pos Siaga Barat',
    address: 'Jl. Raya Dramaga (Dekat Kampus IPB), Bogor Barat',
    coverage: 'Dramaga, Ciomas, Ciampea, Cibungbulang, Laladon, Leuwiliang',
    estTime: '15 – 30 Menit',
    trucks: '2 Truk Kompak (Lincah Gang Sempit & Perumahan)',
    mapQuery: 'Dramaga, Bogor, Jawa Barat',
    coordinates: { lat: -6.5828, lng: 106.7322 }
  },
  {
    id: 'ciawi',
    name: 'Pos Siaga Ciawi & Kawasan Puncak',
    shortLabel: 'Ciawi & Puncak',
    badge: 'Pos Siaga Selatan',
    address: 'Simpang Ciawi - Gadog, Kabupaten Bogor',
    coverage: 'Ciawi, Gadog, Megamendung, Cisarua, Caringin, Cijeruk, Tajur',
    estTime: '20 – 30 Menit',
    trucks: '2 Truk Tangki Vakum Khusus Tanjakan',
    mapQuery: 'Ciawi, Bogor, Jawa Barat',
    coordinates: { lat: -6.6588, lng: 106.8544 }
  },
  {
    id: 'parung',
    name: 'Pos Siaga Parung & Bojonggede (Bogor Utara)',
    shortLabel: 'Parung & Kemang',
    badge: 'Pos Siaga Utara',
    address: 'Jl. Raya Parung - Kemang, Kabupaten Bogor',
    coverage: 'Parung, Gunung Sindur, Ciseeng, Kemang, Tajurhalang, Bojonggede',
    estTime: '20 – 30 Menit',
    trucks: '2 Truk Tangki Vakum Kapasitas 3.500L',
    mapQuery: 'Parung, Bogor, Jawa Barat',
    coordinates: { lat: -6.4258, lng: 106.7297 }
  }
];

export interface PosArmadaMarker {
  id: string;
  name: string;
  shortLabel: string;
  kecamatan: string;
  hubId: string;
  badge: string;
  address: string;
  truckCount: number;
  estArrival: string;
  coordinates: { lat: number; lng: number };
  x: number;
  y: number;
}

export interface RealtimeFleetTruck {
  id: string;
  unitCode: string;
  plate: string;
  hubId: string;
  hubName: string;
  kecamatan: string;
  subdistrict: string;
  truckType: string;
  capacity: string;
  hoseLength: string;
  driver: string;
  status: 'standby' | 'dispatched' | 'service';
  statusLabel: string;
  speed: string;
  eta: string;
  distanceKm: number;
  coordinates: { lat: number; lng: number };
  x: number;
  y: number;
}

export const POS_ARMADA_MARKERS: PosArmadaMarker[] = [
  // --- KOTA BOGOR (6 KECAMATAN) ---
  {
    id: 'pos-tanah-sareal',
    name: 'Pos Siaga Kec. Tanah Sareal (Sholeh Iskandar & Yasmin)',
    shortLabel: 'Pos Kec. Tanah Sareal',
    kecamatan: 'Tanah Sareal',
    hubId: 'kota-bogor',
    badge: 'Pos Siaga Tanah Sareal',
    address: 'Jl. Sholeh Iskandar No. 88 (Dekat Simpang Yasmin), Kec. Tanah Sareal, Kota Bogor',
    truckCount: 2,
    estArrival: '15 – 20 Menit',
    coordinates: { lat: -6.5580, lng: 106.7840 },
    x: 42,
    y: 42
  },
  {
    id: 'pos-bogor-tengah',
    name: 'Pos Pusat Kec. Bogor Tengah (Juanda & Paledang)',
    shortLabel: 'Pos Kec. Bogor Tengah',
    kecamatan: 'Bogor Tengah',
    hubId: 'kota-bogor',
    badge: 'HQ & Workshop Utama',
    address: 'Jl. Ir. H. Juanda & Paledang (Dekat Stasiun KA Bogor), Kec. Bogor Tengah, Kota Bogor',
    truckCount: 3,
    estArrival: '15 – 20 Menit',
    coordinates: { lat: -6.5971, lng: 106.7950 },
    x: 49,
    y: 49
  },
  {
    id: 'pos-bogor-barat',
    name: 'Pos Siaga Kec. Bogor Barat (Bubulak & Semplak)',
    shortLabel: 'Pos Kec. Bogor Barat',
    kecamatan: 'Bogor Barat',
    hubId: 'kota-bogor',
    badge: 'Pos Siaga Bogor Barat',
    address: 'Jl. KH. R. Abdullah Bin Nuh, Bubulak & Cilendek, Kec. Bogor Barat, Kota Bogor',
    truckCount: 2,
    estArrival: '15 – 20 Menit',
    coordinates: { lat: -6.5750, lng: 106.7610 },
    x: 35,
    y: 48
  },
  {
    id: 'pos-bogor-timur',
    name: 'Pos Siaga Kec. Bogor Timur (Baranangsiang & Katulampa)',
    shortLabel: 'Pos Kec. Bogor Timur',
    kecamatan: 'Bogor Timur',
    hubId: 'kota-bogor',
    badge: 'Pos Siaga Bogor Timur',
    address: 'Jl. Raya Pajajaran & Baranangsiang Indah, Kec. Bogor Timur, Kota Bogor',
    truckCount: 2,
    estArrival: '15 – 20 Menit',
    coordinates: { lat: -6.6060, lng: 106.8120 },
    x: 57,
    y: 53
  },
  {
    id: 'pos-bogor-utara',
    name: 'Pos Siaga Kec. Bogor Utara (Bantarjati & Kedunghalang)',
    shortLabel: 'Pos Kec. Bogor Utara',
    kecamatan: 'Bogor Utara',
    hubId: 'kota-bogor',
    badge: 'Pos Siaga Bogor Utara',
    address: 'Jl. Pandu Raya & KS Tubun, Bantarjati, Kec. Bogor Utara, Kota Bogor',
    truckCount: 2,
    estArrival: '15 – 20 Menit',
    coordinates: { lat: -6.5540, lng: 106.8090 },
    x: 55,
    y: 39
  },
  {
    id: 'pos-bogor-selatan',
    name: 'Pos Siaga Kec. Bogor Selatan (Batu Tulis & Cipaku)',
    shortLabel: 'Pos Kec. Bogor Selatan',
    kecamatan: 'Bogor Selatan',
    hubId: 'kota-bogor',
    badge: 'Pos Siaga Bogor Selatan',
    address: 'Jl. Lawang Gintung & Batu Tulis, Kec. Bogor Selatan, Kota Bogor',
    truckCount: 2,
    estArrival: '15 – 25 Menit',
    coordinates: { lat: -6.6280, lng: 106.8080 },
    x: 51,
    y: 59
  },

  // --- KABUPATEN BOGOR (TIMUR & SENTUL) ---
  {
    id: 'pos-cibinong',
    name: 'Pos Siaga Kec. Cibinong (Kawasan Pemda Tegar Beriman)',
    shortLabel: 'Pos Kec. Cibinong',
    kecamatan: 'Cibinong',
    hubId: 'cibinong',
    badge: 'Pos Siaga Cibinong',
    address: 'Kawasan Pemda Tegar Beriman & Sukahati, Kec. Cibinong, Kab. Bogor',
    truckCount: 3,
    estArrival: '15 – 20 Menit',
    coordinates: { lat: -6.4817, lng: 106.8542 },
    x: 69,
    y: 24
  },
  {
    id: 'pos-babakan-madang',
    name: 'Pos Siaga Kec. Babakan Madang (Sentul City & Sirkuit)',
    shortLabel: 'Pos Kec. Babakan Madang',
    kecamatan: 'Babakan Madang',
    hubId: 'cibinong',
    badge: 'Pos Siaga Sentul City',
    address: 'Sentul City & Akses Sirkuit Sentul, Kec. Babakan Madang, Kab. Bogor',
    truckCount: 2,
    estArrival: '15 – 25 Menit',
    coordinates: { lat: -6.5385, lng: 106.8745 },
    x: 77,
    y: 36
  },
  {
    id: 'pos-sukaraja',
    name: 'Pos Siaga Kec. Sukaraja (Ciluar & Cijujung)',
    shortLabel: 'Pos Kec. Sukaraja',
    kecamatan: 'Sukaraja',
    hubId: 'cibinong',
    badge: 'Pos Satelit Sukaraja',
    address: 'Jl. Raya Bogor KM 50, Ciluar & Cijujung, Kec. Sukaraja, Kab. Bogor',
    truckCount: 1,
    estArrival: '15 – 25 Menit',
    coordinates: { lat: -6.5200, lng: 106.8280 },
    x: 63,
    y: 34
  },
  {
    id: 'pos-citeureup',
    name: 'Pos Siaga Kec. Citeureup (Kawasan Industri & Pintu Tol)',
    shortLabel: 'Pos Kec. Citeureup',
    kecamatan: 'Citeureup',
    hubId: 'cibinong',
    badge: 'Pos Satelit Citeureup',
    address: 'Jl. Mayor Oking Jaya Atmaja, Kec. Citeureup, Kab. Bogor',
    truckCount: 2,
    estArrival: '20 – 30 Menit',
    coordinates: { lat: -6.4910, lng: 106.8790 },
    x: 79,
    y: 24
  },
  {
    id: 'pos-gunung-putri',
    name: 'Pos Siaga Kec. Gunung Putri (Wanaherang & Cicadas)',
    shortLabel: 'Pos Kec. Gunung Putri',
    kecamatan: 'Gunung Putri',
    hubId: 'cibinong',
    badge: 'Pos Satelit Gunung Putri',
    address: 'Jl. Raya Mercedes Benz, Wanaherang, Kec. Gunung Putri, Kab. Bogor',
    truckCount: 1,
    estArrival: '20 – 30 Menit',
    coordinates: { lat: -6.4420, lng: 106.9020 },
    x: 85,
    y: 18
  },

  // --- KABUPATEN BOGOR (UTARA) ---
  {
    id: 'pos-bojonggede',
    name: 'Pos Siaga Kec. Bojonggede (Dekat Stasiun KA Bojonggede)',
    shortLabel: 'Pos Kec. Bojonggede',
    kecamatan: 'Bojonggede',
    hubId: 'parung',
    badge: 'Pos Siaga Bojonggede',
    address: 'Jl. Raya Bojonggede (Dekat Stasiun KA), Kec. Bojonggede, Kab. Bogor',
    truckCount: 2,
    estArrival: '15 – 25 Menit',
    coordinates: { lat: -6.4952, lng: 106.7972 },
    x: 47,
    y: 22
  },
  {
    id: 'pos-tajurhalang',
    name: 'Pos Siaga Kec. Tajurhalang (Kalisuren & Sasak Panjang)',
    shortLabel: 'Pos Kec. Tajurhalang',
    kecamatan: 'Tajurhalang',
    hubId: 'parung',
    badge: 'Pos Satelit Tajurhalang',
    address: 'Jl. Raya Kalisuren - Sasak Panjang, Kec. Tajurhalang, Kab. Bogor',
    truckCount: 1,
    estArrival: '15 – 25 Menit',
    coordinates: { lat: -6.4680, lng: 106.7620 },
    x: 40,
    y: 19
  },
  {
    id: 'pos-parung',
    name: 'Pos Siaga Kec. Parung (Pasar Parung & Lebak Wangi)',
    shortLabel: 'Pos Kec. Parung',
    kecamatan: 'Parung',
    hubId: 'parung',
    badge: 'Pos Siaga Parung',
    address: 'Jl. Raya Parung (Dekat Simpang Pasar), Kec. Parung, Kab. Bogor',
    truckCount: 2,
    estArrival: '15 – 25 Menit',
    coordinates: { lat: -6.4258, lng: 106.7297 },
    x: 27,
    y: 14
  },
  {
    id: 'pos-kemang',
    name: 'Pos Siaga Kec. Kemang (Salabenda & Perbatasan ATS)',
    shortLabel: 'Pos Kec. Kemang',
    kecamatan: 'Kemang',
    hubId: 'parung',
    badge: 'Pos Siaga Kemang',
    address: 'Jl. Raya Kemang - Salabenda (Akses Bandara ATS), Kec. Kemang, Kab. Bogor',
    truckCount: 2,
    estArrival: '15 – 25 Menit',
    coordinates: { lat: -6.5050, lng: 106.7450 },
    x: 33,
    y: 28
  },
  {
    id: 'pos-gunung-sindur',
    name: 'Pos Siaga Kec. Gunung Sindur (Prumpung & Perbatasan Serpong)',
    shortLabel: 'Pos Kec. Gunung Sindur',
    kecamatan: 'Gunung Sindur',
    hubId: 'parung',
    badge: 'Pos Satelit Gn. Sindur',
    address: 'Jl. Raya Prumpung - Gunung Sindur, Kec. Gunung Sindur, Kab. Bogor',
    truckCount: 1,
    estArrival: '20 – 30 Menit',
    coordinates: { lat: -6.3750, lng: 106.7020 },
    x: 19,
    y: 10
  },
  {
    id: 'pos-ciseeng',
    name: 'Pos Siaga Kec. Ciseeng (Pemandian Air Panas & Babakan)',
    shortLabel: 'Pos Kec. Ciseeng',
    kecamatan: 'Ciseeng',
    hubId: 'parung',
    badge: 'Pos Satelit Ciseeng',
    address: 'Jl. Raya Ciseeng - Babakan, Kec. Ciseeng, Kab. Bogor',
    truckCount: 1,
    estArrival: '20 – 30 Menit',
    coordinates: { lat: -6.4200, lng: 106.6950 },
    x: 19,
    y: 20
  },

  // --- KABUPATEN BOGOR (BARAT) ---
  {
    id: 'pos-dramaga',
    name: 'Pos Siaga Kec. Dramaga (Dekat Gerbang Kampus IPB)',
    shortLabel: 'Pos Kec. Dramaga',
    kecamatan: 'Dramaga',
    hubId: 'dramaga',
    badge: 'Pos Siaga Dramaga',
    address: 'Jl. Raya Dramaga KM 7 (Dekat Kampus IPB), Kec. Dramaga, Kab. Bogor',
    truckCount: 2,
    estArrival: '15 – 25 Menit',
    coordinates: { lat: -6.5828, lng: 106.7322 },
    x: 24,
    y: 58
  },
  {
    id: 'pos-ciomas',
    name: 'Pos Siaga Kec. Ciomas (Pagelaran & Terminal Laladon)',
    shortLabel: 'Pos Kec. Ciomas',
    kecamatan: 'Ciomas',
    hubId: 'dramaga',
    badge: 'Pos Siaga Ciomas',
    address: 'Jl. Raya Ciomas - Pagelaran (Dekat Laladon), Kec. Ciomas, Kab. Bogor',
    truckCount: 2,
    estArrival: '15 – 25 Menit',
    coordinates: { lat: -6.6022, lng: 106.7645 },
    x: 34,
    y: 65
  },
  {
    id: 'pos-ciampea',
    name: 'Pos Siaga Kec. Ciampea (Warung Borong & Benteng)',
    shortLabel: 'Pos Kec. Ciampea',
    kecamatan: 'Ciampea',
    hubId: 'dramaga',
    badge: 'Pos Satelit Ciampea',
    address: 'Jl. Raya Warung Borong, Kec. Ciampea, Kab. Bogor',
    truckCount: 1,
    estArrival: '20 – 30 Menit',
    coordinates: { lat: -6.5680, lng: 106.6920 },
    x: 15,
    y: 55
  },
  {
    id: 'pos-leuwiliang',
    name: 'Pos Siaga Kec. Leuwiliang & Cibungbulang (Bogor Barat Raya)',
    shortLabel: 'Pos Kec. Leuwiliang',
    kecamatan: 'Leuwiliang',
    hubId: 'dramaga',
    badge: 'Pos Satelit Leuwiliang',
    address: 'Jl. Raya Leuwiliang - Cemplang, Kec. Leuwiliang, Kab. Bogor',
    truckCount: 1,
    estArrival: '25 – 35 Menit',
    coordinates: { lat: -6.5740, lng: 106.6340 },
    x: 8,
    y: 62
  },

  // --- KABUPATEN BOGOR (SELATAN & PUNCAK) ---
  {
    id: 'pos-ciawi',
    name: 'Pos Siaga Kec. Ciawi (Simpang Gadog & Tol Jagorawi)',
    shortLabel: 'Pos Kec. Ciawi',
    kecamatan: 'Ciawi',
    hubId: 'ciawi',
    badge: 'Pos Siaga Ciawi',
    address: 'Simpang Ciawi - Pintu Tol Jagorawi, Kec. Ciawi, Kab. Bogor',
    truckCount: 3,
    estArrival: '15 – 25 Menit',
    coordinates: { lat: -6.6588, lng: 106.8544 },
    x: 69,
    y: 70
  },
  {
    id: 'pos-megamendung',
    name: 'Pos Siaga Kec. Megamendung (Gadog & Cipayung Girang)',
    shortLabel: 'Pos Kec. Megamendung',
    kecamatan: 'Megamendung',
    hubId: 'ciawi',
    badge: 'Pos Satelit Megamendung',
    address: 'Jl. Raya Puncak Gadog - Cipayung, Kec. Megamendung, Kab. Bogor',
    truckCount: 2,
    estArrival: '20 – 30 Menit',
    coordinates: { lat: -6.6520, lng: 106.8920 },
    x: 78,
    y: 75
  },
  {
    id: 'pos-cisarua',
    name: 'Pos Siaga Kec. Cisarua (Tugu & Jalur Puncak KM 77)',
    shortLabel: 'Pos Kec. Cisarua Puncak',
    kecamatan: 'Cisarua',
    hubId: 'ciawi',
    badge: 'Pos Siaga Cisarua',
    address: 'Jl. Raya Puncak Km. 77, Tugu Selatan, Kec. Cisarua, Kab. Bogor',
    truckCount: 2,
    estArrival: '25 – 35 Menit',
    coordinates: { lat: -6.6987, lng: 106.9387 },
    x: 87,
    y: 84
  },
  {
    id: 'pos-caringin',
    name: 'Pos Siaga Kec. Caringin & Cijeruk (Akses Tol Bocimi)',
    shortLabel: 'Pos Kec. Caringin',
    kecamatan: 'Caringin',
    hubId: 'ciawi',
    badge: 'Pos Satelit Caringin',
    address: 'Jl. Raya Sukabumi - Caringin (Akses Tol Bocimi), Kec. Caringin, Kab. Bogor',
    truckCount: 1,
    estArrival: '20 – 30 Menit',
    coordinates: { lat: -6.7110, lng: 106.8290 },
    x: 61,
    y: 80
  }
];

export const REALTIME_FLEET_TRUCKS: RealtimeFleetTruck[] = [
  {
    id: 'truck-01',
    unitCode: 'Armada MB-01',
    plate: 'F 8412 BA',
    hubId: 'kota-bogor',
    hubName: 'Pos Kota Bogor',
    kecamatan: 'Tanah Sareal',
    subdistrict: 'Jl. Sholeh Iskandar & Yasmin',
    truckType: 'Truk Vakum Standar',
    capacity: '4.000 Liter',
    hoseLength: 'Selang 60 Meter',
    driver: 'Pak Ujang & Kru 1',
    status: 'standby',
    statusLabel: 'Siaga di Pos Pangkalan',
    speed: '0 km/j',
    eta: '15 Menit',
    distanceKm: 1.8,
    coordinates: { lat: -6.5612, lng: 106.7892 },
    x: 44,
    y: 46
  },
  {
    id: 'truck-02',
    unitCode: 'Armada MB-02',
    plate: 'F 8190 WS',
    hubId: 'kota-bogor',
    hubName: 'Pos Kota Bogor',
    kecamatan: 'Bogor Tengah',
    subdistrict: 'Jl. Ir. H. Juanda & Paledang',
    truckType: 'Truk Vakum Cepat',
    capacity: '3.000 Liter',
    hoseLength: 'Selang 50 Meter',
    driver: 'Pak Hendra & Kru 2',
    status: 'dispatched',
    statusLabel: 'Meluncur ke Lokasi Pelanggan',
    speed: '28 km/j',
    eta: '10 Menit',
    distanceKm: 2.1,
    coordinates: { lat: -6.5971, lng: 106.795 },
    x: 53,
    y: 52
  },
  {
    id: 'truck-03',
    unitCode: 'Armada MB-03',
    plate: 'F 8821 BB',
    hubId: 'kota-bogor',
    hubName: 'Pos Kota Bogor',
    kecamatan: 'Bogor Barat',
    subdistrict: 'Bubulak & Cilendek',
    truckType: 'Truk Kompak Gang Sempit',
    capacity: '2.800 Liter',
    hoseLength: 'Selang 80 Meter',
    driver: 'Pak Deni & Kru 3',
    status: 'service',
    statusLabel: 'Sedang Pengerjaan di Lokasi',
    speed: '0 km/j',
    eta: 'Dalam Pengerjaan',
    distanceKm: 2.9,
    coordinates: { lat: -6.575, lng: 106.761 },
    x: 38,
    y: 51
  },
  {
    id: 'truck-04',
    unitCode: 'Armada MB-04',
    plate: 'F 8530 CB',
    hubId: 'cibinong',
    hubName: 'Pos Cibinong',
    kecamatan: 'Cibinong',
    subdistrict: 'Kawasan Pemda Tegar Beriman',
    truckType: 'Truk Vakum Jumbo',
    capacity: '4.500 Liter',
    hoseLength: 'Selang 100 Meter',
    driver: 'Pak Yayat & Kru 4',
    status: 'standby',
    statusLabel: 'Siaga Pangkalan Cibinong',
    speed: '0 km/j',
    eta: '15 Menit',
    distanceKm: 1.4,
    coordinates: { lat: -6.4817, lng: 106.8542 },
    x: 65,
    y: 26
  },
  {
    id: 'truck-05',
    unitCode: 'Armada MB-05',
    plate: 'F 8391 CS',
    hubId: 'cibinong',
    hubName: 'Pos Cibinong & Sentul',
    kecamatan: 'Babakan Madang',
    subdistrict: 'Sentul City & Kadumangu',
    truckType: 'Truk Vakum Sedang',
    capacity: '3.500 Liter',
    hoseLength: 'Selang 70 Meter',
    driver: 'Pak Agus & Kru 5',
    status: 'dispatched',
    statusLabel: 'Meluncur Area Sentul City',
    speed: '32 km/j',
    eta: '12 Menit',
    distanceKm: 3.2,
    coordinates: { lat: -6.5385, lng: 106.8745 },
    x: 76,
    y: 39
  },
  {
    id: 'truck-06',
    unitCode: 'Armada MB-06',
    plate: 'F 8204 BG',
    hubId: 'cibinong',
    hubName: 'Pos Cibinong',
    kecamatan: 'Bojonggede',
    subdistrict: 'Kawasan Stasiun Bojonggede & Gaperi',
    truckType: 'Truk Vakum Lincah',
    capacity: '3.000 Liter',
    hoseLength: 'Selang 60 Meter',
    driver: 'Pak Tedi & Kru 6',
    status: 'standby',
    statusLabel: 'Siaga Pos Bojonggede',
    speed: '0 km/j',
    eta: '15 Menit',
    distanceKm: 2.0,
    coordinates: { lat: -6.4952, lng: 106.7972 },
    x: 50,
    y: 24
  },
  {
    id: 'truck-07',
    unitCode: 'Armada MB-07',
    plate: 'F 8711 DR',
    hubId: 'dramaga',
    hubName: 'Pos Dramaga',
    kecamatan: 'Dramaga',
    subdistrict: 'Jl. Raya Dramaga (Dekat IPB)',
    truckType: 'Truk Vakum Standar',
    capacity: '3.500 Liter',
    hoseLength: 'Selang 75 Meter',
    driver: 'Pak Dedi & Kru 7',
    status: 'standby',
    statusLabel: 'Siaga Pangkalan Dramaga',
    speed: '0 km/j',
    eta: '15 Menit',
    distanceKm: 1.5,
    coordinates: { lat: -6.5828, lng: 106.7322 },
    x: 23,
    y: 54
  },
  {
    id: 'truck-08',
    unitCode: 'Armada MB-08',
    plate: 'F 8443 CM',
    hubId: 'dramaga',
    hubName: 'Pos Dramaga',
    kecamatan: 'Ciomas',
    subdistrict: 'Pagelaran & Laladon',
    truckType: 'Truk Kompak Perumahan',
    capacity: '2.500 Liter',
    hoseLength: 'Selang 80 Meter',
    driver: 'Pak Acep & Kru 8',
    status: 'service',
    statusLabel: 'Sedang Pengerjaan di Ciomas',
    speed: '0 km/j',
    eta: 'Dalam Pengerjaan',
    distanceKm: 2.6,
    coordinates: { lat: -6.6022, lng: 106.7645 },
    x: 35,
    y: 64
  },
  {
    id: 'truck-09',
    unitCode: 'Armada MB-09',
    plate: 'F 8660 CW',
    hubId: 'ciawi',
    hubName: 'Pos Ciawi',
    kecamatan: 'Ciawi',
    subdistrict: 'Simpang Ciawi & Gadog',
    truckType: 'Truk Torsi Tinggi Tanjakan',
    capacity: '4.000 Liter',
    hoseLength: 'Selang 80 Meter',
    driver: 'Pak Maman & Kru 9',
    status: 'standby',
    statusLabel: 'Siaga Simpang Ciawi Gadog',
    speed: '0 km/j',
    eta: '18 Menit',
    distanceKm: 2.2,
    coordinates: { lat: -6.6588, lng: 106.8544 },
    x: 65,
    y: 74
  },
  {
    id: 'truck-10',
    unitCode: 'Armada MB-10',
    plate: 'F 8115 PC',
    hubId: 'ciawi',
    hubName: 'Pos Ciawi & Puncak',
    kecamatan: 'Cisarua',
    subdistrict: 'Jalur Raya Puncak & Megamendung',
    truckType: 'Truk Vakum Khusus Puncak',
    capacity: '3.500 Liter',
    hoseLength: 'Selang 90 Meter',
    driver: 'Pak Iwan & Kru 10',
    status: 'dispatched',
    statusLabel: 'Meluncur Jalur Wisata Cisarua',
    speed: '24 km/j',
    eta: '20 Menit',
    distanceKm: 4.8,
    coordinates: { lat: -6.6987, lng: 106.9387 },
    x: 86,
    y: 82
  },
  {
    id: 'truck-11',
    unitCode: 'Armada MB-11',
    plate: 'F 8502 PR',
    hubId: 'parung',
    hubName: 'Pos Parung',
    kecamatan: 'Parung',
    subdistrict: 'Jl. Raya Parung & Kemang',
    truckType: 'Truk Vakum Standar',
    capacity: '3.500 Liter',
    hoseLength: 'Selang 70 Meter',
    driver: 'Pak Rudi & Kru 11',
    status: 'standby',
    statusLabel: 'Siaga Pangkalan Parung',
    speed: '0 km/j',
    eta: '15 Menit',
    distanceKm: 1.7,
    coordinates: { lat: -6.4258, lng: 106.7297 },
    x: 30,
    y: 18
  }
];

export interface LayananAreaOption {
  value: string;
  label: string;
  hubId: string;
  districtBadge: string;
}

export const LAYANAN_AREA_OPTIONS: LayananAreaOption[] = [
  { value: 'all', label: '📍 Semua Wilayah (Lihat Kesiapan Semua 5 Pos Armada Bogor)', hubId: 'all', districtBadge: 'Seluruh Bogor' },

  // Pos Kota Bogor
  { value: 'kota-bogor', label: '🏙️ Seluruh Kota Bogor (Pusat & Wilayah Umum)', hubId: 'kota-bogor', districtBadge: 'Kota Bogor' },
  { value: 'tanah-sareal', label: '🏢 Tanah Sareal & Jl. Sholeh Iskandar', hubId: 'kota-bogor', districtBadge: 'Tanah Sareal' },
  { value: 'bogor-tengah-timur', label: '🏬 Bogor Tengah, Pajajaran & Baranangsiang', hubId: 'kota-bogor', districtBadge: 'Bogor Tengah/Timur' },
  { value: 'bogor-barat-selatan', label: '🏡 Bogor Barat (Bubulak/Semplak) & Bogor Selatan', hubId: 'kota-bogor', districtBadge: 'Bogor Barat/Selatan' },

  // Pos Cibinong & Sentul
  { value: 'cibinong', label: '🏢 Cibinong (Pusat Pemda Tegar Beriman & Sukahati)', hubId: 'cibinong', districtBadge: 'Cibinong' },
  { value: 'sentul-city', label: '⛳ Sentul & Sentul City (Babakan Madang & Sukaraja)', hubId: 'cibinong', districtBadge: 'Sentul & Sukaraja' },
  { value: 'bojonggede-citeureup', label: '🚆 Bojonggede & Citeureup', hubId: 'cibinong', districtBadge: 'Bojonggede & Citeureup' },

  // Pos Dramaga & Barat
  { value: 'dramaga', label: '🎓 Dramaga & Kampus IPB Dramaga', hubId: 'dramaga', districtBadge: 'Dramaga & IPB' },
  { value: 'ciomas-laladon', label: '🏡 Ciomas, Pagelaran & Terminal Laladon', hubId: 'dramaga', districtBadge: 'Ciomas & Laladon' },
  { value: 'ciampea-leuwiliang', label: '🌾 Ciampea, Cibungbulang & Leuwiliang', hubId: 'dramaga', districtBadge: 'Ciampea & Leuwiliang' },

  // Pos Ciawi & Puncak
  { value: 'ciawi', label: '⛰️ Ciawi & Simpang Gadog (Pintu Tol Jagorawi)', hubId: 'ciawi', districtBadge: 'Ciawi & Gadog' },
  { value: 'puncak-megamendung', label: '🌲 Jalur Puncak (Megamendung & Cisarua)', hubId: 'ciawi', districtBadge: 'Puncak & Cisarua' },
  { value: 'tajur-caringin', label: '🚗 Tajur, Caringin & Cijeruk', hubId: 'ciawi', districtBadge: 'Tajur & Caringin' },

  // Pos Parung & Utara
  { value: 'parung', label: '🛣️ Parung & Kawasan Pasar Parung', hubId: 'parung', districtBadge: 'Parung' },
  { value: 'kemang-salabenda', label: '✈️ Kemang & Salabenda', hubId: 'parung', districtBadge: 'Kemang & Salabenda' },
  { value: 'gunung-sindur-ciseeng', label: '🏭 Gunung Sindur & Ciseeng', hubId: 'parung', districtBadge: 'Gunung Sindur & Ciseeng' },
  { value: 'tajurhalang-kalisuren', label: '🏘️ Tajurhalang & Kalisuren', hubId: 'parung', districtBadge: 'Tajurhalang' }
];

export const HUB_PILLS = [
  { id: 'all', label: 'Semua Pos', icon: 'fa-globe-asia' },
  { id: 'kota-bogor', label: 'Kota Bogor', icon: 'fa-city' },
  { id: 'cibinong', label: 'Cibinong & Sentul', icon: 'fa-building' },
  { id: 'dramaga', label: 'Dramaga & Ciomas', icon: 'fa-graduation-cap' },
  { id: 'ciawi', label: 'Ciawi & Puncak', icon: 'fa-mountain' },
  { id: 'parung', label: 'Parung & Kemang', icon: 'fa-road' }
];

export interface ServiceProblemOption {
  id: string;
  label: string;
  problemDesc: string;
}

export interface ServiceCardItem {
  id: string;
  icon: string;
  title: string;
  shortType: string;
  badge: string;
  description: string;
  delayClass: string;
  problems: ServiceProblemOption[];
  defaultProblem: string;
  buildWaText: (problem: string, areaName: string, hubLabel?: string) => string;
}

export const SERVICE_CONSULTATION_CARDS: ServiceCardItem[] = [
  {
    id: 'sedot-wc',
    title: 'Sedot WC & Septic Tank',
    shortType: 'Sedot WC',
    badge: 'Layanan 24 Jam Nonstop',
    icon: 'fas fa-truck-loading',
    delayClass: '',
    description: 'Layanan kuras septic tank & sedot tinja Bogor untuk rumah, ruko, dan kantor. Mengatasi septic tank penuh atau meluap. Tarif sedot wc Bogor murah, harga per tangki transparan tanpa biaya tambahan.',
    defaultProblem: 'Septic tank sudah penuh / meluap dan kloset tidak bisa disiram',
    problems: [
      { id: 'wc-penuh', label: 'Septic Tank Penuh / Meluap', problemDesc: 'Septic tank sudah penuh / meluap dan kloset tidak bisa disiram' },
      { id: 'wc-mampet', label: 'Kloset Mampet Total', problemDesc: 'Kloset duduk/jongkok mampet & air tergenang tidak kunjung surut' },
      { id: 'wc-kuras-rutin', label: 'Kuras Septic Tank Rutin', problemDesc: 'Perawatan rutin pengurasan septic tank 1-2 tahunan rumah tangga' },
      { id: 'wc-bau', label: 'WC Berbau & Rembes Pipa', problemDesc: 'Kloset berbau menyengat & ada indikasi rembesan pipa pembuangan' }
    ],
    buildWaText: (problem, areaName, hubLabel) =>
      `Halo CS Mitra Bersih, saya ingin berkonsultasi mengenai layanan *Sedot WC & Septic Tank Bogor*.\n\n` +
      `*Kendala Spesifik:* ${problem}\n` +
      `*Lokasi Saya:* ${areaName}${hubLabel ? ` (${hubLabel})` : ''}\n\n` +
      `Mohon info estimasi tarif sedot per tangki dan kesiapan armada terdekat untuk meluncur ke lokasi saya. Terima kasih!`
  },
  {
    id: 'pelancaran',
    title: 'Pelancaran Saluran Mampet',
    shortType: 'Pelancaran',
    badge: 'Tanpa Bongkar Keramik',
    icon: 'fas fa-faucet',
    delayClass: 'fade-in-delay-1',
    description: 'Jasa wc mampet Bogor dan saluran mampet bogor (wastafel, kamar mandi, got). Mengatasi wc bau dan sedot kamar mandi tanpa bongkar, hemat biaya. Tukang sedot wc terdekat Bogor datang cepat.',
    defaultProblem: 'Wastafel / bak cuci piring mampet total akibat kerak lemak sisa makanan',
    problems: [
      { id: 'saluran-benda', label: 'Tersumbat Benda Asing', problemDesc: 'Kloset tersumbat benda padat / tisu / pembalut / mainan' },
      { id: 'saluran-wastafel', label: 'Wastafel / Bak Cuci Piring', problemDesc: 'Wastafel / bak cuci piring mampet total akibat kerak lemak sisa makanan' },
      { id: 'saluran-kamar-mandi', label: 'Floor Drain Kamar Mandi', problemDesc: 'Saluran pembuangan air kamar mandi meluap dan tergenang tidak kunjung surut' },
      { id: 'saluran-got', label: 'Pipa Got / Talang Buntu', problemDesc: 'Pipa got pembuangan air kotor buntu & butuh mesin drain cleaner tanpa bongkar' }
    ],
    buildWaText: (problem, areaName, hubLabel) =>
      `Halo CS Mitra Bersih, saya ingin berkonsultasi mengenai layanan *Pelancaran Saluran Mampet Tanpa Bongkar Bogor*.\n\n` +
      `*Kendala Spesifik:* ${problem}\n` +
      `*Lokasi Saya:* ${areaName}${hubLabel ? ` (${hubLabel})` : ''}\n\n` +
      `Mohon info metode pengerjaan (spiral baja drain cleaner), estimasi biaya, dan garansi layanannya. Terima kasih!`
  },
  {
    id: 'limbah',
    title: 'Sedot Limbah & Ipal',
    shortType: 'Limbah',
    badge: 'Armada Tangki Besar Berizin',
    icon: 'fas fa-industry',
    delayClass: 'fade-in-delay-2',
    description: 'Sedot grease trap Bogor, sedot ipal Bogor, dan sedot limbah Bogor untuk pabrik/industri. Penanganan profesional dengan standar lingkungan tinggi. Booking sedot wc Bogor hari ini via WA.',
    defaultProblem: 'Pengurasan bak grease trap penyaring lemak dapur resto / cafe / rumah makan',
    problems: [
      { id: 'limbah-grease', label: 'Grease Trap Lemak Resto', problemDesc: 'Pengurasan bak grease trap penyaring lemak dapur resto / cafe / rumah makan' },
      { id: 'limbah-stp', label: 'Limbah STP Gedung / Ruko', problemDesc: 'Penyedotan rutin tangki STP gedung perkantoran, ruko, hotel, atau klinik' },
      { id: 'limbah-ipal', label: 'Limbah Lumpur IPAL Pabrik', problemDesc: 'Pembersihan endapan limbah cair & lumpur IPAL industri pabrik' },
      { id: 'limbah-kontrol', label: 'Bak Kontrol & Lemak Beku', problemDesc: 'Penyedotan kerak lemak beku pada bak kontrol & pembuangan resmi berizin' }
    ],
    buildWaText: (problem, areaName, hubLabel) =>
      `Halo CS Mitra Bersih, saya ingin berkonsultasi mengenai layanan *Sedot Limbah STP & IPAL / Grease Trap Bogor*.\n\n` +
      `*Kendala Spesifik:* ${problem}\n` +
      `*Lokasi Saya:* ${areaName}${hubLabel ? ` (${hubLabel})` : ''}\n\n` +
      `Mohon info ketersediaan armada truk tangki, jadwal penanganan, dan penawaran biayanya. Terima kasih!`
  }
];

// Custom hook for smooth animated number counting on scroll
function useCountUp(end: number, duration: number = 1600, startTrigger: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startTrigger) return;
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease-out cubic curve: 1 - (1 - progress)^3
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration, startTrigger]);

  return count;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(1);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [selectedWaTopic, setSelectedWaTopic] = useState(0);
  const [selectedTestimoniTopic, setSelectedTestimoniTopic] = useState(0);
  const [selectedMapHub, setSelectedMapHub] = useState(0);
  const [mapZoomKey, setMapZoomKey] = useState(0);
  const [isMapZooming, setIsMapZooming] = useState(false);
  const [selectedLokasiKecamatan, setSelectedLokasiKecamatan] = useState('');

  // Interactive Map Real-Time Fleet & Pos Marker States
  const [mapViewMode, setMapViewMode] = useState<'visual' | 'google'>('visual');
  const [markerCategoryFilter, setMarkerCategoryFilter] = useState<'all' | 'trucks' | 'pos'>('all');
  const [activeMapMarker, setActiveMapMarker] = useState<{ type: 'truck' | 'pos'; id: string } | null>({
    type: 'pos',
    id: 'pos-bogor-tengah'
  });
  const [isGpsRefreshing, setIsGpsRefreshing] = useState(false);
  const [lastGpsSync, setLastGpsSync] = useState('Baru saja');

  const handleRefreshGps = () => {
    setIsGpsRefreshing(true);
    setTimeout(() => {
      setIsGpsRefreshing(false);
      setLastGpsSync('Baru saja');
    }, 650);
  };

  // Stats Real-time Section Observer & Animated Counters
  const statsSectionRef = useRef<HTMLDivElement | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (statsSectionRef.current) {
      observer.observe(statsSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const countTotalArmada = useCountUp(24, 1700, statsVisible);
  const countArmadaTersedia = useCountUp(18, 1700, statsVisible);
  const countPosSiaga = useCountUp(5, 1400, statsVisible);

  // Armada Card Pos Siaga Selection States & Helper
  const [armadaCard1Pos, setArmadaCard1Pos] = useState('kota-bogor');
  const [armadaCard2Pos, setArmadaCard2Pos] = useState('cibinong');
  const [armadaCard3Pos, setArmadaCard3Pos] = useState('cibinong');

  const getArmadaCardWaUrl = (
    cardType: 'total' | 'available' | 'hubs',
    selectedHubId: string
  ) => {
    const hub = MAP_HUBS.find((h) => h.id === selectedHubId) || MAP_HUBS[0];
    let cardTitle = '';
    let cardTopic = '';

    if (cardType === 'total') {
      cardTitle = 'Total Armada Aktif (24 Unit Truk Tangki)';
      cardTopic =
        `Saya ingin menanyakan kesiapan dan jadwal operasional armada di *${hub.name}*.\n` +
        `• *Cakupan Area:* ${hub.coverage}\n` +
        `• *Unit di Pos:* ${hub.trucks}\n` +
        `• *Pertanyaan:* Apakah ada unit truk yang bisa dijadwalkan ke alamat saya di area Bogor?`;
    } else if (cardType === 'available') {
      cardTitle = 'Armada Tersedia Saat Ini (18 Unit Standby Siap Jalan)';
      cardTopic =
        `Saya butuh penanganan darurat/segera dan ingin cek ketersediaan unit siaga di *${hub.name}*.\n` +
        `• *Estimasi Kedatangan:* ${hub.estTime}\n` +
        `• *Alamat Pos:* ${hub.address}\n` +
        `• *Pertanyaan:* Apakah armada di pos ini bisa langsung meluncur ke lokasi saya sekarang tanpa antre lama?`;
    } else {
      cardTitle = 'Pos Siaga Terbanyak & Strategis (5 Pos Utama Bogor)';
      cardTopic =
        `Saya ingin konsultasi penanganan di simpul pos siaga *${hub.name}*.\n` +
        `• *Spesifikasi Unit:* ${hub.trucks}\n` +
        `• *Jangkauan Layanan:* ${hub.coverage}\n` +
        `• *Pertanyaan:* Mohon info ketersediaan armada terdekat dan estimasi biaya pengerjaan di wilayah saya.`;
    }

    const message =
      `Halo Admin CS Mitra Bersih 24 Jam,\n\n` +
      `Saya memantau *Monitoring Real-Time Armada* di website (${cardTitle}) dan ingin menanyakan ketersediaan armada spesifik untuk pos siaga:\n\n` +
      `📍 *Pos Siaga Terpilih:* ${hub.name}\n` +
      `🏷️ *Label Pos:* ${hub.shortLabel} (${hub.badge})\n\n` +
      `${cardTopic}\n\n` +
      `Mohon konfirmasi ketersediaan unit armada dan respon tercepatnya. Terima kasih!`;

    return `https://wa.me/6285715654183?text=${encodeURIComponent(message)}`;
  };

  const handleViewHubOnMapFromArmada = (e: React.MouseEvent, hubId: string) => {
    e.preventDefault();
    const hubIdx = MAP_HUBS.findIndex((h) => h.id === hubId);
    if (hubIdx !== -1) {
      triggerMapZoom(hubIdx);
    }
    const target = document.getElementById('lokasi');
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const triggerMapZoom = (newHubIndex: number) => {
    setSelectedMapHub(newHubIndex);
    setMapZoomKey((prev) => prev + 1);
    setIsMapZooming(true);
    const targetHub = MAP_HUBS[newHubIndex];
    if (targetHub) {
      const posMarker = POS_ARMADA_MARKERS.find((p) => p.hubId === targetHub.id);
      if (posMarker) {
        setActiveMapMarker({ type: 'pos', id: posMarker.id });
      }
    }
    setTimeout(() => {
      setIsMapZooming(false);
    }, 750);
  };

  const handleLokasiKecamatanSelect = (kecamatanName: string) => {
    setSelectedLokasiKecamatan(kecamatanName);
    if (!kecamatanName) return;

    // Cari pos armada yang menaungi kecamatan ini (prioritas agar pengguna langsung melihat titik pos armada di peta)
    const matchingPos = POS_ARMADA_MARKERS.find(
      (p) =>
        p.kecamatan.toLowerCase().includes(kecamatanName.toLowerCase()) ||
        kecamatanName.toLowerCase().includes(p.kecamatan.toLowerCase()) ||
        p.shortLabel.toLowerCase().includes(kecamatanName.toLowerCase()) ||
        kecamatanName.toLowerCase().includes(p.shortLabel.toLowerCase())
    );

    // Cari truk armada yang sedang siaga di/dekat kecamatan ini sebagai alternatif
    const matchingTruck = REALTIME_FLEET_TRUCKS.find(
      (t) =>
        t.kecamatan.toLowerCase() === kecamatanName.toLowerCase() ||
        kecamatanName.toLowerCase().includes(t.kecamatan.toLowerCase())
    );

    if (matchingPos) {
      setActiveMapMarker({ type: 'pos', id: matchingPos.id });
    } else if (matchingTruck) {
      setActiveMapMarker({ type: 'truck', id: matchingTruck.id });
    }

    const areaDetail = BOGOR_AREA_DETAILS.find((a) => a.name.toLowerCase() === kecamatanName.toLowerCase());
    if (areaDetail) {
      let targetHubId = 'kota-bogor';
      if (areaDetail.hub.includes('Cibinong')) targetHubId = 'cibinong';
      else if (areaDetail.hub.includes('Dramaga')) targetHubId = 'dramaga';
      else if (areaDetail.hub.includes('Ciawi')) targetHubId = 'ciawi';
      else if (areaDetail.hub.includes('Parung')) targetHubId = 'parung';
      else targetHubId = 'kota-bogor';

      const foundHubIdx = MAP_HUBS.findIndex((h) => h.id === targetHubId);
      if (foundHubIdx !== -1) {
        triggerMapZoom(foundHubIdx);
      }
    }
  };
  const [layananArea, setLayananArea] = useState<string>('all');

  // Service Card consultation problem state
  const [serviceProblems, setServiceProblems] = useState<Record<string, string>>({
    'sedot-wc': 'Septic tank sudah penuh / meluap dan kloset tidak bisa disiram',
    'pelancaran': 'Wastafel / bak cuci piring mampet total akibat kerak lemak sisa makanan',
    'limbah': 'Pengurasan bak grease trap penyaring lemak dapur resto / cafe / rumah makan'
  });

  // Client-side validation state for Quick Chat (Under Testimonials)
  const [quickWaName, setQuickWaName] = useState('');
  const [quickWaLocation, setQuickWaLocation] = useState('');
  const [quickWaError, setQuickWaError] = useState<string | null>(null);

  // Client-side validation state for Hubungi WA (Between Gallery & Articles)
  const [hubungiWaName, setHubungiWaName] = useState('');
  const [hubungiWaLocation, setHubungiWaLocation] = useState('');
  const [hubungiWaError, setHubungiWaError] = useState<string | null>(null);

  // Client-side validation & modal state for FAQ Chat
  const [faqModalItem, setFaqModalItem] = useState<FAQItem | null>(null);
  const [faqModalName, setFaqModalName] = useState('');
  const [faqModalLocation, setFaqModalLocation] = useState('');
  const [faqModalNotes, setFaqModalNotes] = useState('');
  const [faqModalError, setFaqModalError] = useState<string | null>(null);

  // Jadwal Layanan Rutin State & Handlers
  const [rutinDuration, setRutinDuration] = useState<'6-bulan' | '1-tahun'>('1-tahun');
  const [rutinName, setRutinName] = useState('');
  const [rutinPhone, setRutinPhone] = useState('');
  const [rutinLocation, setRutinLocation] = useState('');
  const [rutinProperty, setRutinProperty] = useState('Rumah Tinggal Pribadi');
  const [rutinService, setRutinService] = useState('Kuras Septic Tank & Sedot Tinja Rutin');
  const [rutinError, setRutinError] = useState<string | null>(null);
  const [rutinSuccess, setRutinSuccess] = useState<string | null>(null);

  const handleRutinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rutinName.trim() || rutinName.trim().length < 2) {
      setRutinError('Mohon masukkan Nama Anda / Penanggung Jawab (minimal 2 huruf).');
      return;
    }
    if (!rutinLocation.trim()) {
      setRutinError('Mohon pilih Wilayah / Kecamatan properti Anda di Bogor.');
      return;
    }
    setRutinError(null);

    const durasiLabel =
      rutinDuration === '6-bulan'
        ? '6 Bulan (Semi-Tahunan / Intensif)'
        : '1 Tahun (Tahunan / Standar Sanitasi SNI)';

    const text =
      `Halo CS Mitra Bersih 24 Jam,\n\n` +
      `Saya ingin mendaftar *Program Jadwal Layanan Rutin* untuk properti saya:\n` +
      `• *Nama Pemilik / PIC:* ${rutinName.trim()}\n` +
      `${rutinPhone.trim() ? `• *No. WhatsApp / HP:* ${rutinPhone.trim()}\n` : ''}` +
      `• *Pilihan Durasi Rutin:* ${durasiLabel}\n` +
      `• *Wilayah / Kecamatan:* ${rutinLocation.trim()}, Bogor\n` +
      `• *Jenis Properti:* ${rutinProperty}\n` +
      `• *Jenis Layanan:* ${rutinService}\n` +
      `• *Kebutuhan:* Pengingat otomatis via WhatsApp sebelum jadwal pemeliharaan jatuh tempo agar septic tank/saluran tidak mampet atau meluap.\n\n` +
      `Mohon dicatat dalam sistem pengingat Mitra Bersih dan berikan konfirmasi jadwal serta penawaran tarif rutinnya. Terima kasih!`;

    window.open(`https://wa.me/6285715654183?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setRutinSuccess(`Terima kasih Bapak/Ibu ${rutinName.trim()}! Pengingat jadwal rutin ${rutinDuration === '6-bulan' ? '6 Bulan' : '1 Tahun'} Anda sedang diteruskan ke WhatsApp CS kami.`);
  };

  const getDirectRutinWaUrl = (duration: '6-bulan' | '1-tahun') => {
    const durasiText = duration === '6-bulan' ? '6 Bulan (Semi-Tahunan)' : '1 Tahun (Tahunan)';
    const text =
      `Halo CS Mitra Bersih 24 Jam,\n\n` +
      `Saya ingin mendaftar *Program Pengingat Jadwal Layanan Rutin ${durasiText}* di Bogor.\n\n` +
      `Mohon dibantu pendaftaran jadwal pemeliharaan berkala untuk septic tank / saluran pembuangan properti saya agar selalu terpantau dan tidak terlambat disedot.\n\n` +
      `Terima kasih!`;
    return `https://wa.me/6285715654183?text=${encodeURIComponent(text)}`;
  };

  // FAQ Search & Filter State
  const [faqSearch, setFaqSearch] = useState('');
  const [faqCategory, setFaqCategory] = useState('Topik Populer');
  const [isFaqTyping, setIsFaqTyping] = useState(false);
  const [isFilterRunning, setIsFilterRunning] = useState(false);
  const faqTypingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const filterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isSearchActive = isFaqTyping || isFilterRunning;

  const markSearchFilterRunning = () => {
    setIsFaqTyping(true);
    setIsFilterRunning(true);
    if (faqTypingTimeoutRef.current) {
      clearTimeout(faqTypingTimeoutRef.current);
    }
    if (filterTimeoutRef.current) {
      clearTimeout(filterTimeoutRef.current);
    }
    faqTypingTimeoutRef.current = setTimeout(() => {
      setIsFaqTyping(false);
    }, 550);
    filterTimeoutRef.current = setTimeout(() => {
      setIsFilterRunning(false);
    }, 600);
  };

  const handleFaqSearchChange = (val: string) => {
    setFaqSearch(val);
    if (val.trim()) {
      markSearchFilterRunning();
    } else {
      setIsFaqTyping(false);
      setIsFilterRunning(false);
      if (faqTypingTimeoutRef.current) clearTimeout(faqTypingTimeoutRef.current);
      if (filterTimeoutRef.current) clearTimeout(filterTimeoutRef.current);
    }
  };

  const handleFaqSearchClear = () => {
    setFaqSearch('');
    setIsFaqTyping(false);
    setIsFilterRunning(false);
    if (faqTypingTimeoutRef.current) {
      clearTimeout(faqTypingTimeoutRef.current);
    }
    if (filterTimeoutRef.current) {
      clearTimeout(filterTimeoutRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (faqTypingTimeoutRef.current) {
        clearTimeout(faqTypingTimeoutRef.current);
      }
      if (filterTimeoutRef.current) {
        clearTimeout(filterTimeoutRef.current);
      }
    };
  }, []);

  // Real-time filtered FAQ list
  const filteredFaqs = useMemo(() => {
    const q = faqSearch.trim().toLowerCase();
    return FAQ_DATA.filter((item) => {
      const matchCat = faqCategory === 'Topik Populer' || item.category === faqCategory;
      if (!matchCat) return false;
      if (!q) return true;

      const inQuestion = item.question.toLowerCase().includes(q);
      const inAnswer = item.answerText.toLowerCase().includes(q);
      const inKeywords = item.keywords.some((k) => k.toLowerCase().includes(q));
      const inCategory = item.category.toLowerCase().includes(q);

      return inQuestion || inAnswer || inKeywords || inCategory;
    });
  }, [faqSearch, faqCategory]);

  // Automatically keep first match expanded when searching
  useEffect(() => {
    if (faqSearch.trim()) {
      if (filteredFaqs.length > 0 && (!openFaq || !filteredFaqs.some((f) => f.id === openFaq))) {
        setOpenFaq(filteredFaqs[0].id);
      }
    }
  }, [faqSearch, filteredFaqs, openFaq]);

  // FAQ Share State & Handlers
  const [shareFaqItem, setShareFaqItem] = useState<FAQItem | null>(null);
  const [copiedFaqId, setCopiedFaqId] = useState<number | null>(null);
  const [shareCopiedText, setShareCopiedText] = useState(false);
  const [shareCopiedLink, setShareCopiedLink] = useState(false);
  const [shareToast, setShareToast] = useState<string | null>(null);
  const shareToastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showShareToast = (msg: string) => {
    setShareToast(msg);
    if (shareToastTimerRef.current) clearTimeout(shareToastTimerRef.current);
    shareToastTimerRef.current = setTimeout(() => {
      setShareToast(null);
    }, 3200);
  };

  useEffect(() => {
    return () => {
      if (shareToastTimerRef.current) clearTimeout(shareToastTimerRef.current);
    };
  }, []);

  const getFaqDirectUrl = (item: FAQItem) => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}${window.location.pathname}#faq-${item.id}`;
    }
    return `https://sedotwcbogor-mitrabersih.com#faq-${item.id}`;
  };

  const getFaqShareWaUrl = (item: FAQItem) => {
    const url = getFaqDirectUrl(item);
    const text =
      `💡 *Tips Edukasi Sanitasi & Sedot WC Bogor — Mitra Bersih 24 Jam*\n\n` +
      `❓ *Pertanyaan:* "${item.question}"\n` +
      `📂 *Kategori:* ${item.category}\n\n` +
      `✅ *Jawaban:* ${item.answerText}\n\n` +
      `🔗 *Baca selengkapnya:* ${url}\n` +
      `📞 Kontak / Darurat 24 Jam: 0857-1565-4183 (Wilayah Kota & Kab. Bogor)`;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  };

  const getFaqShareTelegramUrl = (item: FAQItem) => {
    const url = getFaqDirectUrl(item);
    const text = `💡 Tips Sanitasi Bogor: "${item.question}"\n\n${item.answerText}\n\nSumber: Mitra Bersih 24 Jam Bogor\n${url}`;
    return `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
  };

  const getFaqShareFacebookUrl = (item: FAQItem) => {
    const url = getFaqDirectUrl(item);
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  };

  const getFaqShareTwitterUrl = (item: FAQItem) => {
    const url = getFaqDirectUrl(item);
    const text = `Tips Sanitasi Bogor: "${item.question}" via Mitra Bersih 24 Jam`;
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  };

  const fallbackCopyText = (text: string) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    } catch {
      // ignore
    }
  };

  const handleCopyFaqFullText = (item: FAQItem) => {
    const url = getFaqDirectUrl(item);
    const fullText =
      `❓ PERTANYAAN: ${item.question}\n` +
      `📂 Kategori: ${item.category}\n\n` +
      `💡 JAWABAN TEKNISI:\n${item.answerText}\n\n` +
      `📍 Sumber: Mitra Bersih — Jasa Sedot WC & Pelancaran Saluran 24 Jam Bogor\n` +
      `🔗 Tautan: ${url}\n` +
      `📞 Hubungi / Konsultasi: 0857-1565-4183`;

    const triggerSuccess = () => {
      setCopiedFaqId(item.id);
      setShareCopiedText(true);
      showShareToast('Teks jawaban FAQ lengkap berhasil disalin ke clipboard!');
      setTimeout(() => {
        setCopiedFaqId(null);
        setShareCopiedText(false);
      }, 2500);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullText).then(triggerSuccess).catch(() => {
        fallbackCopyText(fullText);
        triggerSuccess();
      });
    } else {
      fallbackCopyText(fullText);
      triggerSuccess();
    }
  };

  const handleCopyFaqLink = (item: FAQItem) => {
    const url = getFaqDirectUrl(item);
    const triggerSuccess = () => {
      setShareCopiedLink(true);
      showShareToast('Tautan langsung ke pertanyaan FAQ berhasil disalin!');
      setTimeout(() => setShareCopiedLink(false), 2500);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(triggerSuccess).catch(() => {
        fallbackCopyText(url);
        triggerSuccess();
      });
    } else {
      fallbackCopyText(url);
      triggerSuccess();
    }
  };

  const handleNativeDeviceShare = async (item: FAQItem) => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: item.question,
          text: `*${item.question}*\n\n${item.answerText}\n\nSumber: Mitra Bersih Sedot WC 24 Jam Bogor`,
          url: getFaqDirectUrl(item)
        });
        showShareToast('Jawaban FAQ berhasil dibagikan!');
      } catch {
        // User closed native sheet without sharing
      }
    }
  };

  const openFaqShare = (item: FAQItem) => {
    setShareFaqItem(item);
    setShareCopiedText(false);
    setShareCopiedLink(false);
  };

  // Floating Action Button & FAQ Modal Overlay State
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [isFaqModalClosing, setIsFaqModalClosing] = useState(false);
  const faqModalCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [modalFaqSearch, setModalFaqSearch] = useState('');
  const [modalFaqCategory, setModalFaqCategory] = useState('Topik Populer');
  const [openModalFaq, setOpenModalFaq] = useState<number | null>(1);
  const [isModalFaqTyping, setIsModalFaqTyping] = useState(false);
  const [isModalFilterRunning, setIsModalFilterRunning] = useState(false);
  const modalFaqTypingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const modalFilterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isModalSearchActive = isModalFaqTyping || isModalFilterRunning;

  const markModalSearchFilterRunning = () => {
    setIsModalFaqTyping(true);
    setIsModalFilterRunning(true);
    if (modalFaqTypingTimeoutRef.current) {
      clearTimeout(modalFaqTypingTimeoutRef.current);
    }
    if (modalFilterTimeoutRef.current) {
      clearTimeout(modalFilterTimeoutRef.current);
    }
    modalFaqTypingTimeoutRef.current = setTimeout(() => {
      setIsModalFaqTyping(false);
    }, 550);
    modalFilterTimeoutRef.current = setTimeout(() => {
      setIsModalFilterRunning(false);
    }, 600);
  };

  const handleModalFaqSearchChange = (val: string) => {
    setModalFaqSearch(val);
    if (val.trim()) {
      markModalSearchFilterRunning();
    } else {
      setIsModalFaqTyping(false);
      setIsModalFilterRunning(false);
      if (modalFaqTypingTimeoutRef.current) clearTimeout(modalFaqTypingTimeoutRef.current);
      if (modalFilterTimeoutRef.current) clearTimeout(modalFilterTimeoutRef.current);
    }
  };

  const handleModalFaqSearchClear = () => {
    setModalFaqSearch('');
    setIsModalFaqTyping(false);
    setIsModalFilterRunning(false);
    if (modalFaqTypingTimeoutRef.current) clearTimeout(modalFaqTypingTimeoutRef.current);
    if (modalFilterTimeoutRef.current) clearTimeout(modalFilterTimeoutRef.current);
  };

  const handleOpenFaqModal = () => {
    if (faqModalCloseTimeoutRef.current) {
      clearTimeout(faqModalCloseTimeoutRef.current);
    }
    setIsFaqModalClosing(false);
    setIsFaqModalOpen(true);
    if (faqSearch) {
      setModalFaqSearch(faqSearch);
      markModalSearchFilterRunning();
    }
    if (faqCategory) setModalFaqCategory(faqCategory);
  };

  const handleCloseFaqModal = () => {
    if (isFaqModalClosing || !isFaqModalOpen) return;
    setIsFaqModalClosing(true);
    if (faqModalCloseTimeoutRef.current) {
      clearTimeout(faqModalCloseTimeoutRef.current);
    }
    faqModalCloseTimeoutRef.current = setTimeout(() => {
      setIsFaqModalOpen(false);
      setIsFaqModalClosing(false);
    }, 280);
  };

  useEffect(() => {
    return () => {
      if (faqModalCloseTimeoutRef.current) {
        clearTimeout(faqModalCloseTimeoutRef.current);
      }
      if (modalFaqTypingTimeoutRef.current) {
        clearTimeout(modalFaqTypingTimeoutRef.current);
      }
      if (modalFilterTimeoutRef.current) {
        clearTimeout(modalFilterTimeoutRef.current);
      }
    };
  }, []);

  // Lock body scroll and handle Escape key for FAQ Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFaqModalOpen && !isFaqModalClosing) {
        handleCloseFaqModal();
      }
    };
    if (isFaqModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFaqModalOpen, isFaqModalClosing]);

  // Real-time filtered FAQ list inside the modal
  const modalFilteredFaqs = useMemo(() => {
    const q = modalFaqSearch.trim().toLowerCase();
    return FAQ_DATA.filter((item) => {
      const matchCat = modalFaqCategory === 'Topik Populer' || item.category === modalFaqCategory;
      if (!matchCat) return false;
      if (!q) return true;

      const inQuestion = item.question.toLowerCase().includes(q);
      const inAnswer = item.answerText.toLowerCase().includes(q);
      const inKeywords = item.keywords.some((k) => k.toLowerCase().includes(q));
      const inCategory = item.category.toLowerCase().includes(q);
      return inQuestion || inAnswer || inKeywords || inCategory;
    });
  }, [modalFaqSearch, modalFaqCategory]);

  // Automatically keep first match expanded when searching inside modal
  useEffect(() => {
    if (modalFaqSearch.trim()) {
      if (modalFilteredFaqs.length > 0 && (!openModalFaq || !modalFilteredFaqs.some((f) => f.id === openModalFaq))) {
        setOpenModalFaq(modalFilteredFaqs[0].id);
      }
    }
  }, [modalFaqSearch, modalFilteredFaqs, openModalFaq]);

  const handleViewOnPageFaq = () => {
    handleCloseFaqModal();
    if (modalFaqSearch) setFaqSearch(modalFaqSearch);
    if (modalFaqCategory) setFaqCategory(modalFaqCategory);
    setTimeout(() => {
      const el = document.getElementById('faq');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  // Tips & Artikel Search & Filter State
  const [articleSearch, setArticleSearch] = useState('');
  const [articleCategory, setArticleCategory] = useState('Semua');

  // Real-time filtered Articles list
  const filteredArticles = useMemo(() => {
    const q = articleSearch.trim().toLowerCase();
    return ARTICLES_DATA.filter((article) => {
      const matchCat = articleCategory === 'Semua' || article.category === articleCategory;
      if (!matchCat) return false;
      if (!q) return true;

      const inTitle = article.title.toLowerCase().includes(q);
      const inExcerpt = article.excerpt.toLowerCase().includes(q);
      const inCat = article.category.toLowerCase().includes(q);
      const inIntro = article.content.intro.toLowerCase().includes(q);
      const inPoints = article.content.points.some(
        (p) => p.heading.toLowerCase().includes(q) || p.text.toLowerCase().includes(q)
      );

      return inTitle || inExcerpt || inCat || inIntro || inPoints;
    });
  }, [articleSearch, articleCategory]);

  // Berita Lingkungan Newsletter Subscription State
  const [subscribers, setSubscribers] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('subscribers');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // fallback
    }
    return [];
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState<string | null>(null);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);

  // Arsip Artikel State & Handlers (Previous Months' Articles)
  const [selectedArchiveMonth, setSelectedArchiveMonth] = useState('all');
  const [archiveSearch, setArchiveSearch] = useState('');

  const filteredArchivedArticles = useMemo(() => {
    const q = archiveSearch.trim().toLowerCase();
    return ARCHIVED_ARTICLES_DATA.filter((article) => {
      const matchMonth = selectedArchiveMonth === 'all' || article.monthKey === selectedArchiveMonth;
      if (!matchMonth) return false;
      if (!q) return true;

      const inTitle = article.title.toLowerCase().includes(q);
      const inExcerpt = article.excerpt.toLowerCase().includes(q);
      const inCat = article.category.toLowerCase().includes(q);
      const inMonth = (article.month || '').toLowerCase().includes(q);
      const inIntro = article.content.intro.toLowerCase().includes(q);

      return inTitle || inExcerpt || inCat || inMonth || inIntro;
    });
  }, [selectedArchiveMonth, archiveSearch]);

  const handlePrevArchiveMonth = () => {
    const currentIdx = ARCHIVE_MONTH_TABS.findIndex((m) => m.key === selectedArchiveMonth);
    if (currentIdx > 1) {
      setSelectedArchiveMonth(ARCHIVE_MONTH_TABS[currentIdx - 1].key);
    } else if (currentIdx === 1) {
      setSelectedArchiveMonth(ARCHIVE_MONTH_TABS[ARCHIVE_MONTH_TABS.length - 1].key);
    } else {
      setSelectedArchiveMonth(ARCHIVE_MONTH_TABS[1].key);
    }
  };

  const handleNextArchiveMonth = () => {
    const currentIdx = ARCHIVE_MONTH_TABS.findIndex((m) => m.key === selectedArchiveMonth);
    if (currentIdx >= 1 && currentIdx < ARCHIVE_MONTH_TABS.length - 1) {
      setSelectedArchiveMonth(ARCHIVE_MONTH_TABS[currentIdx + 1].key);
    } else if (currentIdx === ARCHIVE_MONTH_TABS.length - 1) {
      setSelectedArchiveMonth(ARCHIVE_MONTH_TABS[1].key);
    } else {
      setSelectedArchiveMonth(ARCHIVE_MONTH_TABS[1].key);
    }
  };

  // Area Jangkauan Search & Filter State
  const [areaSearchTerm, setAreaSearchTerm] = useState('');
  const [areaTypeFilter, setAreaTypeFilter] = useState<'all' | 'Kota Bogor' | 'Kabupaten Bogor'>('all');
  const [selectedAreaItem, setSelectedAreaItem] = useState<BogorAreaDetail | null>(null);

  // Real-time filtered coverage areas calculation
  const filteredBogorAreas = useMemo(() => {
    const q = areaSearchTerm.trim().toLowerCase();
    return BOGOR_AREA_DETAILS.filter((area) => {
      if (areaTypeFilter !== 'all' && area.type !== areaTypeFilter) {
        return false;
      }
      if (!q) return true;
      return (
        area.name.toLowerCase().includes(q) ||
        area.type.toLowerCase().includes(q) ||
        area.hub.toLowerCase().includes(q) ||
        (area.keywords && area.keywords.some((k) => k.toLowerCase().includes(q)))
      );
    });
  }, [areaSearchTerm, areaTypeFilter]);

  // Helper for matching text highlight in Area Search
  const highlightAreaMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const q = query.trim().toLowerCase();
    const index = text.toLowerCase().indexOf(q);
    if (index === -1) return text;
    return (
      <>
        {text.substring(0, index)}
        <mark className="area-search-highlight">
          {text.substring(index, index + q.length)}
        </mark>
        {text.substring(index + q.length)}
      </>
    );
  };

  // WhatsApp generator for specific area inquiry
  const getAreaWaUrl = (areaName: string, areaType: string, hub: string) => {
    const text =
      `Halo Admin CS Mitra Bersih 24 Jam,\n\n` +
      `Saya sedang mengecek daftar area layanan di website. Saya berada di *Kecamatan ${areaName}* (${areaType}).\n\n` +
      `Saya ingin menanyakan ketersediaan armada siaga terdekat (*${hub}*) untuk penanganan:\n` +
      `• Sedot WC / Kuras Septic Tank\n` +
      `• Pelancaran Pipa / Kloset Mampet\n` +
      `• Sedot Limbah / Grease Trap\n\n` +
      `Mohon info ketersediaan unit truk tangki dan estimasi waktu meluncur ke lokasi saya. Terima kasih!`;
    return `https://wa.me/6285715654183?text=${encodeURIComponent(text)}`;
  };

  // Pricing Table Component States & Filter Logic
  const [pricingCategoryFilter, setPricingCategoryFilter] = useState<'all' | 'septic-tank' | 'drain-clearing' | 'combo'>('all');
  const [pricingSearchQuery, setPricingSearchQuery] = useState('');
  const [pricingArea, setPricingArea] = useState<string>('Semua Wilayah Bogor');
  const [showPricingComparison, setShowPricingComparison] = useState(false);

  const filteredPricingPackages = useMemo(() => {
    return PRICING_PACKAGES.filter((p) => {
      // Category filter
      const matchesCategory = pricingCategoryFilter === 'all' || p.category === pricingCategoryFilter;
      if (!matchesCategory) return false;

      // Search query filter
      if (!pricingSearchQuery.trim()) return true;
      const q = pricingSearchQuery.toLowerCase().trim();
      const matchesName = p.name.toLowerCase().includes(q);
      const matchesDesc = p.description.toLowerCase().includes(q);
      const matchesTag = p.tag.toLowerCase().includes(q);
      const matchesBadge = p.badge ? p.badge.toLowerCase().includes(q) : false;
      const matchesCatLabel = p.categoryLabel.toLowerCase().includes(q);
      const matchesTarget = p.targetProperty.toLowerCase().includes(q);
      const matchesFeatures = p.features.some((f) => f.toLowerCase().includes(q));
      const matchesPrice = p.priceDisplay.toLowerCase().includes(q) || p.unit.toLowerCase().includes(q);

      return (
        matchesName ||
        matchesDesc ||
        matchesTag ||
        matchesBadge ||
        matchesCatLabel ||
        matchesTarget ||
        matchesFeatures ||
        matchesPrice
      );
    });
  }, [pricingCategoryFilter, pricingSearchQuery]);

  const getPricingWaUrl = (pkg: PricingPackage, locationName: string) => {
    const locText = locationName === 'Semua Wilayah Bogor' ? 'Bogor (Kota / Kabupaten)' : `Kecamatan ${locationName}, Bogor`;
    const text =
      `Halo Admin CS Mitra Bersih 24 Jam,\n\n` +
      `Saya ingin berkonsultasi / memesan paket layanan resmi:\n` +
      `📦 *Nama Paket:* ${pkg.name}\n` +
      `💰 *Tarif Mulai:* ${pkg.priceDisplay} (${pkg.unit})\n` +
      `📍 *Lokasi Pengerjaan:* ${locText}\n` +
      `⏱️ *Estimasi Waktu:* ${pkg.estTime}\n` +
      `🛡️ *Garansi Servis:* ${pkg.warranty}\n\n` +
      `Mohon info ketersediaan armada terdekat dan konfirmasi jadwal kedatangan teknisi ke lokasi saya. Terima kasih!`;
    return `https://wa.me/6285715654183?text=${encodeURIComponent(text)}`;
  };

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

      const sections = ['home', 'layanan', 'tarif', 'tentang', 'faq', 'galeri', 'artikel', 'ulasan', 'lokasi', 'kontak'];
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

  // Escape key handler for lightbox, article modal & FAQ modal / share modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxImg) setLightboxImg(null);
        if (selectedArticle) setSelectedArticle(null);
        if (faqModalItem) setFaqModalItem(null);
        if (shareFaqItem) setShareFaqItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImg, selectedArticle, faqModalItem, shareFaqItem]);

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

  const handleViewHubOnMap = (hubId: string) => {
    const hubIndex = MAP_HUBS.findIndex(h => h.id === hubId);
    if (hubIndex !== -1) {
      triggerMapZoom(hubIndex);
    }
    const target = document.getElementById('lokasi');
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Client-side validation for Quick WA Contact (Under Testimonials)
  const handleQuickWaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTestimoniTopic < 0 || selectedTestimoniTopic >= TESTIMONI_WA_TOPICS.length) {
      setQuickWaError('Silakan pilih salah satu topik kebutuhan Anda terlebih dahulu.');
      return;
    }
    if (!quickWaName.trim() || quickWaName.trim().length < 2) {
      setQuickWaError('Mohon masukkan Nama Anda (minimal 2 huruf) agar CS kami dapat menyapa dengan tepat.');
      return;
    }
    if (!quickWaLocation.trim()) {
      setQuickWaError('Mohon pilih Wilayah / Kecamatan Anda di Bogor agar admin langsung mengecek armada terdekat.');
      return;
    }

    setQuickWaError(null);
    const topic = TESTIMONI_WA_TOPICS[selectedTestimoniTopic];
    const text = `Halo Admin Mitra Bersih 24 Jam,\nSaya ingin konsultasi / pesan layanan:\n- Nama: ${quickWaName.trim()}\n- Lokasi: ${quickWaLocation.trim()}, Bogor\n- Topik: ${topic.label}\n- Pesan: "${topic.text}"\nMohon info respon cepat dan estimasi kedatangan armada ke lokasi saya. Terima kasih.`;
    window.open(`https://wa.me/6285715654183?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  // Client-side validation for Hubungi WA Section (Between Gallery & Articles)
  const handleHubungiWaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedWaTopic < 0 || selectedWaTopic >= WA_QUICK_TOPICS.length) {
      setHubungiWaError('Silakan pilih salah satu kendala Anda terlebih dahulu.');
      return;
    }
    if (!hubungiWaName.trim() || hubungiWaName.trim().length < 2) {
      setHubungiWaError('Mohon masukkan Nama Anda (minimal 2 huruf) agar CS kami dapat melayani dengan ramah.');
      return;
    }
    if (!hubungiWaLocation.trim()) {
      setHubungiWaError('Mohon pilih Wilayah / Kecamatan Anda di Bogor agar kami segera cek posisi truk tangki terdekat.');
      return;
    }

    setHubungiWaError(null);
    const topic = WA_QUICK_TOPICS[selectedWaTopic];
    const text = `Halo CS Mitra Bersih 24 Jam,\nSaya ingin pesan layanan / cek armada:\n- Nama: ${hubungiWaName.trim()}\n- Wilayah/Kecamatan: ${hubungiWaLocation.trim()}, Bogor\n- Kendala: ${topic.label}\n- Pesan: "${topic.text}"\nMohon konfirmasi ketersediaan armada terdekat ke lokasi saya. Terima kasih.`;
    window.open(`https://wa.me/6285715654183?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  // Open FAQ Preparation Modal
  const openFaqChatModal = (item: FAQItem) => {
    setFaqModalItem(item);
    setFaqModalError(null);
  };

  // Client-side validation for FAQ Chat Modal
  const handleFaqModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqModalItem) return;

    if (!faqModalName.trim() || faqModalName.trim().length < 2) {
      setFaqModalError('Mohon masukkan Nama Anda (minimal 2 huruf).');
      return;
    }
    if (!faqModalLocation.trim()) {
      setFaqModalError('Mohon pilih Wilayah / Kecamatan Anda di Bogor.');
      return;
    }

    setFaqModalError(null);
    const text =
      `Halo Admin CS Mitra Bersih,\n\n` +
      `Saya ingin bertanya seputar pertanyaan spesifik FAQ di website:\n` +
      `❓ *Pertanyaan:* "${faqModalItem.question}"\n` +
      `📂 *Kategori:* ${faqModalItem.category}\n\n` +
      `*Data Pelanggan:*\n` +
      `- Nama: ${faqModalName.trim()}\n` +
      `- Lokasi: ${faqModalLocation.trim()}, Bogor\n` +
      (faqModalNotes.trim() ? `- Detail Kendala Tambahan: "${faqModalNotes.trim()}"\n` : '') +
      `\nMohon info penjelasan teknis, estimasi tarif, & ketersediaan armada terdekat ke alamat saya. Terima kasih!`;

    const waUrl = `https://wa.me/6285715654183?text=${encodeURIComponent(text)}`;
    const link = document.createElement('a');
    link.href = waUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setFaqModalItem(null);
    setFaqModalNotes('');
  };

  // Newsletter Subscription for Berita Lingkungan
  const handleSubscribeNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    const email = newsletterEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setNewsletterError('Mohon masukkan alamat email Anda.');
      setNewsletterSuccess(null);
      return;
    }

    if (!emailRegex.test(email)) {
      setNewsletterError('Format email tidak valid. Pastikan penulisan sesuai (contoh: nama@domain.com).');
      setNewsletterSuccess(null);
      return;
    }

    const normalized = email.toLowerCase();
    if (subscribers.includes(normalized)) {
      setNewsletterSuccess('Email Anda sudah terdaftar dalam buletin Berita Lingkungan kami!');
      setNewsletterError(null);
      setNewsletterEmail('');
      return;
    }

    const updated = [normalized, ...subscribers];
    setSubscribers(updated);
    try {
      localStorage.setItem('subscribers', JSON.stringify(updated));
    } catch {
      // storage error fallback
    }

    setNewsletterSuccess(`Terima kasih! Email ${email} berhasil bergabung dengan buletin Berita Lingkungan Mitra Bersih.`);
    setNewsletterError(null);
    setNewsletterEmail('');
  };

  const selectedLayananOption = LAYANAN_AREA_OPTIONS.find((o) => o.value === layananArea) || LAYANAN_AREA_OPTIONS[0];
  const matchedLayananHub = selectedLayananOption.hubId === 'all'
    ? null
    : (MAP_HUBS.find((h) => h.id === selectedLayananOption.hubId) || null);

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
                href="#tarif"
                onClick={(e) => scrollToSection(e, 'tarif')}
                className={activeSection === 'tarif' ? 'active' : ''}
              >
                Paket Tarif
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
                href="#lokasi"
                onClick={(e) => scrollToSection(e, 'lokasi')}
                className={activeSection === 'lokasi' ? 'active' : ''}
              >
                Lokasi
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
                <rect x="80" y="140" width="240" height="110" fill="#FFD60A" rx="20" stroke="#111111" strokeWidth="3" />

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

          {/* LOCATION FILTER & FLEET AVAILABILITY */}
          <div className="layanan-fleet-control fade-in">
            <div className="layanan-filter-card">
              <div className="layanan-filter-header">
                <div className="layanan-filter-title">
                  <div className="filter-title-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4>Cek Ketersediaan Armada di Lokasi Anda</h4>
                    <p>Pilih kecamatan atau wilayah Anda di Bogor untuk melihat pos siaga terdekat &amp; unit truk standby.</p>
                  </div>
                </div>

                <div className="layanan-select-box">
                  <label htmlFor="layanan-filter-dropdown" className="sr-only">Pilih Wilayah atau Kecamatan Bogor</label>
                  <div className="select-wrapper">
                    <i className="fas fa-search-location select-icon"></i>
                    <select
                      id="layanan-filter-dropdown"
                      className="layanan-dropdown-input"
                      value={layananArea}
                      onChange={(e) => setLayananArea(e.target.value)}
                    >
                      <option value="all">📍 Semua Wilayah (Lihat Kesiapan Semua 5 Pos Armada Bogor)</option>

                      <optgroup label="Pos Siaga Kota Bogor (Pusat &amp; Sekitarnya)">
                        <option value="kota-bogor">🏙️ Seluruh Kota Bogor (Pusat &amp; Wilayah Umum)</option>
                        <option value="tanah-sareal">🏢 Tanah Sareal &amp; Jl. Sholeh Iskandar</option>
                        <option value="bogor-tengah-timur">🏬 Bogor Tengah, Pajajaran &amp; Baranangsiang</option>
                        <option value="bogor-barat-selatan">🏡 Bogor Barat (Bubulak/Semplak) &amp; Bogor Selatan</option>
                      </optgroup>

                      <optgroup label="Pos Siaga Cibinong &amp; Sentul (Bogor Timur)">
                        <option value="cibinong">🏢 Cibinong (Pusat Pemda Tegar Beriman &amp; Sukahati)</option>
                        <option value="sentul-city">⛳ Sentul &amp; Sentul City (Babakan Madang &amp; Sukaraja)</option>
                        <option value="bojonggede-citeureup">🚆 Bojonggede &amp; Citeureup</option>
                      </optgroup>

                      <optgroup label="Pos Siaga Dramaga &amp; Ciomas (Bogor Barat)">
                        <option value="dramaga">🎓 Dramaga &amp; Kampus IPB Dramaga</option>
                        <option value="ciomas-laladon">🏡 Ciomas, Pagelaran &amp; Terminal Laladon</option>
                        <option value="ciampea-leuwiliang">🌾 Ciampea, Cibungbulang &amp; Leuwiliang</option>
                      </optgroup>

                      <optgroup label="Pos Siaga Ciawi &amp; Jalur Puncak (Bogor Selatan)">
                        <option value="ciawi">⛰️ Ciawi &amp; Simpang Gadog (Pintu Tol Jagorawi)</option>
                        <option value="puncak-megamendung">🌲 Jalur Puncak (Megamendung &amp; Cisarua)</option>
                        <option value="tajur-caringin">🚗 Tajur, Caringin &amp; Cijeruk</option>
                      </optgroup>

                      <optgroup label="Pos Siaga Parung &amp; Kemang (Bogor Utara)">
                        <option value="parung">🛣️ Parung &amp; Kawasan Pasar Parung</option>
                        <option value="kemang-salabenda">✈️ Kemang &amp; Salabenda</option>
                        <option value="gunung-sindur-ciseeng">🏭 Gunung Sindur &amp; Ciseeng</option>
                        <option value="tajurhalang-kalisuren">🏘️ Tajurhalang &amp; Kalisuren</option>
                      </optgroup>
                    </select>
                    <i className="fas fa-chevron-down select-caret"></i>
                  </div>
                </div>
              </div>

              {/* Quick Hub Pills */}
              <div className="layanan-pills-bar">
                <span className="pills-label">Pintasan Pos:</span>
                <div className="pills-scroll">
                  {HUB_PILLS.map((pill) => {
                    const isActive = pill.id === 'all'
                      ? layananArea === 'all'
                      : (matchedLayananHub?.id === pill.id);
                    return (
                      <button
                        key={pill.id}
                        type="button"
                        className={`layanan-pill-btn ${isActive ? 'active' : ''}`}
                        onClick={() => setLayananArea(pill.id)}
                      >
                        <i className={`fas ${pill.icon}`}></i>
                        <span>{pill.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Fleet Status Display */}
              {matchedLayananHub ? (
                /* Specific Hub Highlight */
                <div className="layanan-hub-card active-hub fade-in">
                  <div className="hub-card-header">
                    <div className="hub-badges">
                      <span className="hub-status-live">
                        <span className="pulse-indicator"></span>
                        ARMADA STANDBY SIAGA
                      </span>
                      <span className="hub-badge-pill">{matchedLayananHub.badge}</span>
                      <span className="hub-area-pill">
                        <i className="fas fa-check-circle"></i> Melayani {selectedLayananOption.districtBadge}
                      </span>
                    </div>
                    <h3 className="hub-card-title">{matchedLayananHub.name}</h3>
                  </div>

                  <div className="hub-info-grid">
                    <div className="hub-info-box eta-highlight">
                      <div className="info-icon"><i className="fas fa-bolt"></i></div>
                      <div className="info-content">
                        <label>Estimasi Waktu Tiba:</label>
                        <div className="eta-val">{matchedLayananHub.estTime}</div>
                        <span className="eta-sub">Langsung berangkat • Respon kilat</span>
                      </div>
                    </div>

                    <div className="hub-info-box">
                      <div className="info-icon"><i className="fas fa-truck-moving"></i></div>
                      <div className="info-content">
                        <label>Kesiapan Unit Armada:</label>
                        <p>{matchedLayananHub.trucks}</p>
                      </div>
                    </div>

                    <div className="hub-info-box">
                      <div className="info-icon"><i className="fas fa-map-pin"></i></div>
                      <div className="info-content">
                        <label>Pangkalan Pos Terdekat:</label>
                        <p>{matchedLayananHub.address}</p>
                      </div>
                    </div>

                    <div className="hub-info-box">
                      <div className="info-icon"><i className="fas fa-route"></i></div>
                      <div className="info-content">
                        <label>Cakupan Kecamatan:</label>
                        <p>{matchedLayananHub.coverage}</p>
                      </div>
                    </div>
                  </div>

                  <div className="hub-action-row">
                    <a
                      href={`https://wa.me/6285715654183?text=${encodeURIComponent(
                        `Halo Mitra Bersih, saya butuh layanan sedot WC / saluran mampet di area ${selectedLayananOption.districtBadge} (${matchedLayananHub.shortLabel}). Apakah armada bisa segera meluncur ke lokasi saya?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hub-btn-wa"
                    >
                      <i className="fab fa-whatsapp"></i>
                      <span>Panggil Armada Pos {matchedLayananHub.shortLabel} Sekarang</span>
                    </a>

                    <button
                      type="button"
                      className="hub-btn-map"
                      onClick={() => handleViewHubOnMap(matchedLayananHub.id)}
                    >
                      <i className="fas fa-map-marked-alt"></i>
                      <span>Lihat Pos di Peta Interaktif</span>
                    </button>

                    <button
                      type="button"
                      className="hub-btn-reset"
                      onClick={() => setLayananArea('all')}
                      title="Lihat semua pos armada"
                    >
                      <i className="fas fa-undo"></i>
                      <span>Tampilkan Semua Pos</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* All Hubs Overview Grid */
                <div className="layanan-all-hubs-overview fade-in">
                  <div className="all-hubs-banner">
                    <div className="banner-left">
                      <span className="banner-dot"></span>
                      <div>
                        <strong>11+ Armada Truk Siaga di 5 Pos Strategis Seluruh Bogor</strong>
                        <p>Pilih wilayah Anda pada menu dropdown di atas atau klik pos siaga di bawah untuk melihat armada terdekat:</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="all-hubs-map-btn"
                      onClick={() => handleViewHubOnMap(MAP_HUBS[0].id)}
                    >
                      <i className="fas fa-map-marked-alt"></i> Buka Peta Interaktif
                    </button>
                  </div>

                  <div className="all-hubs-cards-grid">
                    {MAP_HUBS.map((hub) => (
                      <div
                        key={hub.id}
                        className="hub-mini-card"
                        onClick={() => setLayananArea(hub.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setLayananArea(hub.id);
                          }
                        }}
                      >
                        <div className="mini-card-top">
                          <span className="mini-card-badge">{hub.badge}</span>
                          <span className="mini-card-eta">
                            <i className="fas fa-bolt"></i> {hub.estTime}
                          </span>
                        </div>
                        <h4 className="mini-card-title">{hub.shortLabel}</h4>
                        <p className="mini-card-trucks">
                          <i className="fas fa-truck"></i> {hub.trucks}
                        </p>
                        <p className="mini-card-area">
                          <i className="fas fa-map-marker-alt"></i> {hub.coverage.split(',').slice(0, 3).join(', ')}...
                        </p>
                        <div className="mini-card-footer">
                          <span className="mini-card-link">
                            Cek Kesiapan Armada <i className="fas fa-arrow-right"></i>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="services-grid">
            {SERVICE_CONSULTATION_CARDS.map((service) => {
              const activeProblem = serviceProblems[service.id] || service.defaultProblem;
              const areaName = selectedLayananOption.districtBadge || 'Seluruh Bogor';
              const hubLabel = matchedLayananHub ? `Pos ${matchedLayananHub.shortLabel}` : undefined;
              const waUrl = `https://wa.me/6285715654183?text=${encodeURIComponent(
                service.buildWaText(activeProblem, areaName, hubLabel)
              )}`;
              const directOrderMsg = matchedLayananHub
                ? `Halo Mitra Bersih, saya ingin pesan layanan ${service.title} untuk wilayah ${selectedLayananOption.districtBadge} (Pos ${matchedLayananHub.shortLabel}). Apakah armada bisa meluncur sekarang?`
                : `Halo Mitra Bersih, saya ingin pesan layanan ${service.title} Bogor.`;

              return (
                <div key={service.id} className={`service-card fade-in ${service.delayClass}`.trim()}>
                  <div className="service-icon">
                    <i className={service.icon}></i>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>

                  {/* Dynamic Fleet Status Tag */}
                  <div className="service-fleet-status-tag">
                    {matchedLayananHub ? (
                      <span className="tag-ready">
                        <i className="fas fa-check-circle"></i> Armada Siap: <strong>Pos {matchedLayananHub.shortLabel}</strong> (Tiba ~{matchedLayananHub.estTime})
                      </span>
                    ) : (
                      <span className="tag-available">
                        <i className="fas fa-shield-alt"></i> Standby 24 Jam di 5 Pos Seluruh Bogor
                      </span>
                    )}
                  </div>

                  {/* Interactive Problem Selector */}
                  <div className="service-problem-selector">
                    <div className="service-problem-label">
                      <i className="fas fa-hand-pointer"></i>
                      <span>Pilih Kendala Spesifik Anda:</span>
                    </div>
                    <div
                      className="service-problem-chips"
                      role="radiogroup"
                      aria-label={`Pilih masalah spesifik ${service.title}`}
                    >
                      {service.problems.map((p) => {
                        const isSelected = activeProblem === p.problemDesc;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            className={`service-problem-chip ${isSelected ? 'active' : ''}`}
                            onClick={() =>
                              setServiceProblems((prev) => ({
                                ...prev,
                                [service.id]: p.problemDesc
                              }))
                            }
                            role="radio"
                            aria-checked={isSelected}
                            title={`Pilih kendala: ${p.label}`}
                          >
                            <i className={`fas ${isSelected ? 'fa-check-circle' : 'fa-circle'}`}></i>
                            <span>{p.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pre-filled Message Live Preview */}
                  <div className="service-wa-preview-snippet">
                    <div className="preview-top">
                      <i className="fab fa-whatsapp"></i>
                      <span>Pesan WA Terisi Otomatis ({service.shortType}):</span>
                    </div>
                    <p>
                      &ldquo;Halo CS Mitra Bersih, saya ingin berkonsultasi mengenai layanan {service.title} untuk wilayah {areaName}. Kendala: {activeProblem}...&rdquo;
                    </p>
                  </div>

                  {/* Card Actions */}
                  <div className="service-card-actions">
                    <a
                      href={waUrl}
                      className="service-wa-cta-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Hubungi CS via WhatsApp untuk konsultasi ${service.title}`}
                    >
                      <i className="fab fa-whatsapp"></i>
                      <span>Hubungi CS via WhatsApp</span>
                    </a>

                    <div className="service-wa-secondary-row">
                      <a
                        href="#biaya"
                        onClick={(e) => scrollToSection(e, 'biaya')}
                        className="service-card-calc-link"
                      >
                        <i className="fas fa-calculator"></i>
                        <span>Cek Estimasi Biaya</span>
                      </a>
                      <a
                        href={`https://wa.me/6285715654183?text=${encodeURIComponent(directOrderMsg)}`}
                        className="service-card-order-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Pesan langsung armada untuk ${service.title}`}
                      >
                        <span>{matchedLayananHub ? `Pesan di ${selectedLayananOption.districtBadge}` : 'Pesan Armada Cepat'}</span>
                        <i className="fas fa-arrow-right"></i>
                      </a>
                    </div>

                    <div className="service-wa-trust-row">
                      <span><i className="fas fa-bolt"></i> Respon &plusmn;3 Menit</span>
                      <span><i className="fas fa-shield-alt"></i> Bebas Biaya Konsultasi</span>
                      <span><i className="fas fa-clock"></i> 24 Jam Siaga</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION TARIF & PAKET HARGA (RESPONSIVE PRICING TABLE) */}
      <section className="pricing-section" id="tarif">
        <span id="biaya" style={{ position: 'relative', top: '-100px', display: 'block', visibility: 'hidden' }}></span>
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-badge">
              <i className="fas fa-tags" style={{ marginRight: '6px' }}></i>
              DAFTAR TARIF TRANSPARAN
            </span>
            <h2 className="section-title">
              Paket Layanan &amp; Estimasi Biaya Resmi Bogor
            </h2>
            <p className="section-subtitle">
              Pilihan paket sedot septic tank standar dan pelancaran saluran pipa mampet di Kota &amp; Kabupaten Bogor. Tarif jujur tanpa biaya tersembunyi dengan garansi tuntas.
            </p>
          </div>

          {/* Kolom Pencarian Cepat Paket Layanan (Search Input Top of Pricing Table) */}
          <div className="pricing-search-container fade-in">
            <div className="pricing-search-box-row">
              <div className="pricing-search-box">
                <i className="fas fa-search pricing-search-icon"></i>
                <input
                  type="text"
                  id="pricing-search-input"
                  className="pricing-search-input"
                  placeholder="Cari paket layanan (misal: sedot septic tank, saluran pipa mampet, wastafel, ruko komersial)..."
                  value={pricingSearchQuery}
                  onChange={(e) => setPricingSearchQuery(e.target.value)}
                  aria-label="Cari paket layanan dan estimasi biaya sedot WC Bogor"
                />
                {pricingSearchQuery && (
                  <button
                    type="button"
                    className="pricing-search-clear-btn"
                    onClick={() => setPricingSearchQuery('')}
                    aria-label="Hapus kata kunci pencarian paket"
                    title="Hapus pencarian"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>

              {pricingSearchQuery.trim() && (
                <div className="pricing-search-result-pill">
                  <i className="fas fa-check-circle"></i>
                  <span>
                    Ditemukan <strong>{filteredPricingPackages.length}</strong> paket
                  </span>
                </div>
              )}
            </div>

            {/* Quick Keyword Chips */}
            <div className="pricing-search-quick-tags">
              <span className="pricing-quick-label">
                <i className="fas fa-bolt"></i> Kata Kunci Cepat:
              </span>
              <div className="pricing-quick-chips">
                {[
                  { label: 'Septic Tank Standar', query: 'septic tank' },
                  { label: 'Saluran Mampet', query: 'saluran mampet' },
                  { label: 'Rumah Tinggal', query: 'rumah' },
                  { label: 'Komersial / Ruko', query: 'komersial' },
                  { label: 'Paket Kombo', query: 'kombo' },
                  { label: 'Tanpa Bongkar', query: 'tanpa bongkar' }
                ].map((chip) => {
                  const isChipActive = pricingSearchQuery.toLowerCase() === chip.query.toLowerCase();
                  return (
                    <button
                      key={chip.query}
                      type="button"
                      className={`pricing-quick-chip ${isChipActive ? 'active' : ''}`}
                      onClick={() => {
                        if (isChipActive) {
                          setPricingSearchQuery('');
                        } else {
                          setPricingSearchQuery(chip.query);
                        }
                      }}
                    >
                      {chip.label}
                    </button>
                  );
                })}
                {(pricingSearchQuery || pricingCategoryFilter !== 'all') && (
                  <button
                    type="button"
                    className="pricing-quick-chip reset"
                    onClick={() => {
                      setPricingSearchQuery('');
                      setPricingCategoryFilter('all');
                    }}
                    title="Reset pencarian dan kategori paket"
                  >
                    <i className="fas fa-rotate-left"></i> Reset Filter
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Pricing Controls: Category Filters & Bogor Location Selector */}
          <div className="pricing-controls-card fade-in">
            <div className="pricing-filter-group">
              <span className="pricing-filter-label">
                <i className="fas fa-filter"></i> Filter Layanan:
              </span>
              <div className="pricing-filter-pills" role="tablist" aria-label="Filter Paket Layanan">
                <button
                  type="button"
                  className={`pricing-filter-pill ${pricingCategoryFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setPricingCategoryFilter('all')}
                  role="tab"
                  aria-selected={pricingCategoryFilter === 'all'}
                >
                  Semua Paket ({PRICING_PACKAGES.length})
                </button>
                <button
                  type="button"
                  className={`pricing-filter-pill ${pricingCategoryFilter === 'septic-tank' ? 'active' : ''}`}
                  onClick={() => setPricingCategoryFilter('septic-tank')}
                  role="tab"
                  aria-selected={pricingCategoryFilter === 'septic-tank'}
                >
                  <i className="fas fa-truck-droplet"></i> Sedot Septic Tank (2)
                </button>
                <button
                  type="button"
                  className={`pricing-filter-pill ${pricingCategoryFilter === 'drain-clearing' ? 'active' : ''}`}
                  onClick={() => setPricingCategoryFilter('drain-clearing')}
                  role="tab"
                  aria-selected={pricingCategoryFilter === 'drain-clearing'}
                >
                  <i className="fas fa-sink"></i> Pelancaran Saluran (1)
                </button>
                <button
                  type="button"
                  className={`pricing-filter-pill ${pricingCategoryFilter === 'combo' ? 'active' : ''}`}
                  onClick={() => setPricingCategoryFilter('combo')}
                  role="tab"
                  aria-selected={pricingCategoryFilter === 'combo'}
                >
                  <i className="fas fa-shield-virus"></i> Paket Kombo (1)
                </button>
              </div>
            </div>

            <div className="pricing-location-picker">
              <label htmlFor="pricing-area-select" className="pricing-location-label">
                <i className="fas fa-map-marker-alt"></i> Lokasi Pengerjaan:
              </label>
              <div className="pricing-select-wrapper">
                <select
                  id="pricing-area-select"
                  className="pricing-select-input"
                  value={pricingArea}
                  onChange={(e) => setPricingArea(e.target.value)}
                  aria-label="Pilih Kecamatan atau Wilayah Bogor untuk Paket Tarif"
                >
                  <option value="Semua Wilayah Bogor">📍 Seluruh Wilayah Kota &amp; Kab. Bogor</option>
                  {BOGOR_AREAS.map((area) => (
                    <option key={area} value={area}>
                      Kecamatan {area}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Pricing Cards Grid or Empty State */}
          {filteredPricingPackages.length > 0 ? (
            <div className="pricing-cards-grid fade-in">
              {filteredPricingPackages.map((pkg) => {
                const waUrl = getPricingWaUrl(pkg, pricingArea);
                return (
                  <div
                    key={pkg.id}
                    className={`pricing-card ${pkg.isPopular ? 'popular' : ''}`}
                  >
                    {pkg.badge && (
                      <div className="pricing-card-badge">
                        <i className={`fas ${pkg.isPopular ? 'fa-fire' : 'fa-award'}`}></i>
                        <span>{pkg.badge}</span>
                      </div>
                    )}

                    <div className="pricing-card-header">
                      <span className="pricing-card-tag">{pkg.tag}</span>
                      <div className="pricing-card-title-row">
                        <div className="pricing-card-icon">
                          <i className={`fas ${pkg.icon}`}></i>
                        </div>
                        <h3 className="pricing-card-name">{pkg.name}</h3>
                      </div>
                      <p className="pricing-card-desc">{pkg.description}</p>
                    </div>

                    <div className="pricing-price-box">
                      <span className="pricing-start-label">Mulai Dari</span>
                      <div className="pricing-price-row">
                        <span className="pricing-currency">Rp</span>
                        <span className="pricing-amount">
                          {pkg.startingPrice.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <span className="pricing-unit-text">{pkg.unit}</span>
                    </div>

                    <div className="pricing-meta-pills">
                      <div className="pricing-meta-pill" title="Target properti yang cocok">
                        <i className="fas fa-home"></i>
                        <span>{pkg.targetProperty}</span>
                      </div>
                      <div className="pricing-meta-pill" title="Estimasi waktu pengerjaan di lokasi">
                        <i className="fas fa-stopwatch"></i>
                        <span>{pkg.estTime}</span>
                      </div>
                      <div className="pricing-meta-pill" title="Garansi perlindungan resmi">
                        <i className="fas fa-shield-alt"></i>
                        <span>Garansi {pkg.warranty}</span>
                      </div>
                    </div>

                    <div className="pricing-features-section">
                      <div className="pricing-features-title">
                        <i className="fas fa-check-double"></i> Layanan Termasuk:
                      </div>
                      <ul className="pricing-features-list">
                        {pkg.features.map((feature, fIdx) => (
                          <li key={fIdx} className="pricing-feature-item">
                            <i className="fas fa-check-circle pricing-check-icon"></i>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pricing-card-action">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`pricing-cta-btn ${pkg.isPopular ? 'btn-popular' : ''}`}
                        title={`Pesan ${pkg.name} via WhatsApp`}
                      >
                        <i className="fab fa-whatsapp"></i>
                        <span>Pesan Paket via WA</span>
                      </a>
                      <div className="pricing-card-footnote">
                        <i className="fas fa-bolt"></i> Respon cepat armada terdekat {pricingArea !== 'Semua Wilayah Bogor' ? `Kec. ${pricingArea}` : 'Bogor'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="pricing-empty-state fade-in">
              <div className="pricing-empty-icon">
                <i className="fas fa-search-minus"></i>
              </div>
              <h3 className="pricing-empty-title">Tidak Ada Paket Layanan yang Sesuai</h3>
              <p className="pricing-empty-desc">
                Tidak ditemukan paket tarif untuk pencarian <strong>"{pricingSearchQuery}"</strong>
                {pricingCategoryFilter !== 'all' ? ' pada kategori yang dipilih' : ''}.
                Silakan coba kata kunci lain atau klik tombol reset di bawah untuk menampilkan seluruh paket layanan.
              </p>
              <div className="pricing-empty-actions">
                <button
                  type="button"
                  className="pricing-empty-reset-btn"
                  onClick={() => {
                    setPricingSearchQuery('');
                    setPricingCategoryFilter('all');
                  }}
                >
                  <i className="fas fa-redo-alt"></i> Tampilkan Semua Paket ({PRICING_PACKAGES.length})
                </button>
                <a
                  href={`https://wa.me/6285715654183?text=${encodeURIComponent(
                    `Halo Admin Mitra Bersih 24 Jam, saya mencari layanan untuk kendala "${pricingSearchQuery}". Apakah ada paket atau estimasi biaya khusus untuk kebutuhan saya?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pricing-empty-wa-btn"
                >
                  <i className="fab fa-whatsapp"></i> Konsultasi Kendala via WA
                </a>
              </div>
            </div>
          )}

          {/* Interactive Feature Comparison Toggle */}
          <div className="pricing-compare-toggle-wrap fade-in">
            <button
              type="button"
              className="pricing-compare-toggle-btn"
              onClick={() => setShowPricingComparison(!showPricingComparison)}
              aria-expanded={showPricingComparison}
              aria-controls="pricing-comparison-table-wrapper"
            >
              <i className={`fas ${showPricingComparison ? 'fa-compress-arrows-alt' : 'fa-table-list'}`}></i>
              <span>{showPricingComparison ? 'Sembunyikan Tabel Perbandingan Spesifikasi' : 'Bandingkan Rincian Spesifikasi & Fitur Seluruh Paket'}</span>
              <i className={`fas ${showPricingComparison ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </button>
          </div>

          {/* Detailed Responsive Comparison Table */}
          {showPricingComparison && (
            <div id="pricing-comparison-table-wrapper" className="pricing-compare-table-container fade-in">
              <div className="pricing-table-responsive">
                <table className="pricing-compare-table">
                  <thead>
                    <tr>
                      <th className="col-spec">Spesifikasi &amp; Layanan</th>
                      {PRICING_PACKAGES.map((pkg) => (
                        <th key={pkg.id} className={`col-pkg ${pkg.isPopular ? 'highlight' : ''}`}>
                          <div className="pkg-th-name">{pkg.name}</div>
                          <div className="pkg-th-price">{pkg.priceDisplay}</div>
                          <div className="pkg-th-unit">{pkg.unit}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="spec-label">
                        <i className="fas fa-box"></i> Kapasitas Pengerjaan
                      </td>
                      {PRICING_PACKAGES.map((pkg) => (
                        <td key={pkg.id} className={pkg.isPopular ? 'highlight' : ''}>
                          {pkg.specs.capacity}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="spec-label">
                        <i className="fas fa-cogs"></i> Jenis Mesin / Alat
                      </td>
                      {PRICING_PACKAGES.map((pkg) => (
                        <td key={pkg.id} className={pkg.isPopular ? 'highlight' : ''}>
                          {pkg.specs.machine}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="spec-label">
                        <i className="fas fa-ruler-combined"></i> Fasilitas Selang Standar
                      </td>
                      {PRICING_PACKAGES.map((pkg) => (
                        <td key={pkg.id} className={pkg.isPopular ? 'highlight' : ''}>
                          {pkg.specs.hose}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="spec-label">
                        <i className="fas fa-shield-alt"></i> Garansi Pengerjaan Resmi
                      </td>
                      {PRICING_PACKAGES.map((pkg) => (
                        <td key={pkg.id} className={pkg.isPopular ? 'highlight' : ''}>
                          <span className="spec-badge-warranty">{pkg.specs.warranty}</span>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="spec-label">
                        <i className="fas fa-spray-can-sparkles"></i> Disinfektan &amp; Pembersih Aroma
                      </td>
                      {PRICING_PACKAGES.map((pkg) => (
                        <td key={pkg.id} className={pkg.isPopular ? 'highlight' : ''}>
                          {pkg.specs.disinfectant}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="spec-label">
                        <i className="fas fa-recycle"></i> Pembuangan Legal IPLT Bogor
                      </td>
                      {PRICING_PACKAGES.map((pkg) => (
                        <td key={pkg.id} className={pkg.isPopular ? 'highlight' : ''}>
                          {pkg.specs.ipltLegal}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="spec-label">
                        <i className="fas fa-file-invoice"></i> Bukti Pembayaran / Kwitansi
                      </td>
                      {PRICING_PACKAGES.map((pkg) => (
                        <td key={pkg.id} className={pkg.isPopular ? 'highlight' : ''}>
                          <span className="spec-check-yes">
                            <i className="fas fa-check"></i> Tersedia
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="spec-label">Pesan Paket Sekarang</td>
                      {PRICING_PACKAGES.map((pkg) => (
                        <td key={pkg.id} className={pkg.isPopular ? 'highlight' : ''}>
                          <a
                            href={getPricingWaUrl(pkg, pricingArea)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="table-order-btn"
                          >
                            <i className="fab fa-whatsapp"></i> Pesan
                          </a>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pricing Trust Badges (4 Guarantees) */}
          <div className="pricing-trust-grid fade-in">
            <div className="pricing-trust-card">
              <div className="trust-card-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <div className="trust-card-body">
                <h4>Kepastian Harga di Awal</h4>
                <p>Tanpa biaya siluman. Seluruh estimasi tarif disepakati sebelum selang dan mesin diturunkan di lokasi Anda.</p>
              </div>
            </div>

            <div className="pricing-trust-card">
              <div className="trust-card-icon">
                <i className="fas fa-route"></i>
              </div>
              <div className="trust-card-body">
                <h4>Gratis Selang s/d 50 Meter</h4>
                <p>Menjangkau pemukiman gang sempit dan perumahan padat di seluruh wilayah Bogor tanpa biaya tambahan selang standar.</p>
              </div>
            </div>

            <div className="pricing-trust-card">
              <div className="trust-card-icon">
                <i className="fas fa-certificate"></i>
              </div>
              <div className="trust-card-body">
                <h4>Garansi Servis 30 - 45 Hari</h4>
                <p>Layanan dijamin tuntas. Apabila saluran kembali macet dalam masa garansi, teknisi siap datang kembali gratis.</p>
              </div>
            </div>

            <div className="pricing-trust-card">
              <div className="trust-card-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="trust-card-body">
                <h4>Siaga 24 Jam Nonstop</h4>
                <p>Armada tangki vakum standby di 5 pos siaga Bogor untuk panggilan darurat septic tank meluap kapan pun dibutuhkan.</p>
              </div>
            </div>
          </div>

          {/* Pricing Notice & Consultation Footer */}
          <div className="pricing-notice-banner fade-in">
            <div className="pricing-notice-left">
              <i className="fas fa-info-circle pricing-notice-icon"></i>
              <div>
                <strong>Catatan Kondisi Khusus di Lapangan:</strong>
                <p>
                  Tarif di atas adalah harga mulai standar untuk septic tank berjarak selang standar (&le; 50 m) dan lubang kontrol yang mudah dibuka. Jika septic tank tertutup cor mati tanpa tutup atau jarak selang lebih dari 50 meter, teknisi akan memberikan opsi transparan dan meminta persetujuan Anda terlebih dahulu.
                </p>
              </div>
            </div>
            <div className="pricing-notice-right">
              <a
                href="https://wa.me/6285715654183?text=Halo%20Admin%20Mitra%20Bersih,%20saya%20ingin%20konsultasi%20kendala%20septic%20tank%20/%20saluran%20dan%20meminta%20estimasi%20tarif%20Bogor"
                target="_blank"
                rel="noopener noreferrer"
                className="pricing-consult-cta"
              >
                <i className="fab fa-whatsapp"></i>
                <span>Tanya Estimasi via WA</span>
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

      {/* SECTION CHAT ADMIN VIA WHATSAPP (KONVERSI CEPAT SETELAH TESTIMONI) */}
      <section className="quick-wa-section" id="chat-admin">
        <div className="container">
          <div className="quick-wa-card fade-in">
            <div className="quick-wa-badge">
              <span className="quick-wa-dot"></span>
              <span>CS TEKNIS SIAGA ONLINE 24 JAM BOGOR</span>
            </div>

            <h2 className="quick-wa-title">
              Punya Masalah WC atau Butuh Respon Cepat?<br />
              Chat Admin Kami Langsung via WhatsApp!
            </h2>

            <p className="quick-wa-subtitle">
              Pilih salah satu topik kebutuhan Anda di bawah ini agar pesan WhatsApp otomatis terisi secara instan tanpa perlu mengetik panjang. Tim kami siap merespon dalam hitungan menit.
            </p>

            {/* 3 Interactive Auto-Topic Buttons */}
            <div>
              <span className="quick-wa-topics-label">
                <i className="fas fa-hand-pointer" style={{ marginRight: '6px' }}></i>
                Pilih Topik Kebutuhan Anda:
              </span>
              <div className="quick-wa-topics-grid">
                {TESTIMONI_WA_TOPICS.map((topic, idx) => (
                  <div
                    key={topic.id}
                    className={`quick-wa-topic-card ${selectedTestimoniTopic === idx ? 'active' : ''}`}
                    onClick={() => setSelectedTestimoniTopic(idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedTestimoniTopic(idx);
                      }
                    }}
                  >
                    <div className="quick-wa-topic-top">
                      <div className="quick-wa-topic-icon">
                        <i className={topic.icon}></i>
                      </div>
                      <span className="quick-wa-topic-badge">{topic.badge}</span>
                    </div>
                    <span className="quick-wa-topic-name">{topic.label}</span>
                    <span className="quick-wa-topic-desc">{topic.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Preview Box */}
            <div className="quick-wa-preview-box">
              <i className="fab fa-whatsapp"></i>
              <div className="quick-wa-preview-text">
                <strong>Pratinjau Pesan Otomatis ({TESTIMONI_WA_TOPICS[selectedTestimoniTopic].label}):</strong>
                <p>&ldquo;{TESTIMONI_WA_TOPICS[selectedTestimoniTopic].text}&rdquo;</p>
              </div>
            </div>

            {/* Client-Side Validation Contact Form */}
            <form onSubmit={handleQuickWaSubmit} className="wa-prep-form">
              <div className="wa-prep-box">
                <div className="wa-prep-header">
                  <div className="wa-prep-badge">
                    <i className="fas fa-clipboard-check"></i>
                    <span>VERIFIKASI DATA PEMESAN</span>
                  </div>
                  <span className="wa-prep-hint">Lengkapi nama &amp; lokasi agar admin langsung mengecek armada terdekat</span>
                </div>

                <div className="wa-prep-grid">
                  <div className="form-group" style={{ margin: 0 }}>
                    <label htmlFor="quick-wa-name-input" className="wa-prep-label">
                      Nama Lengkap Anda <span className="req">*</span>
                    </label>
                    <input
                      id="quick-wa-name-input"
                      type="text"
                      className={`wa-prep-input ${quickWaError && (!quickWaName.trim() || quickWaName.trim().length < 2) ? 'input-error' : ''}`}
                      placeholder="Contoh: Pak Budi / Ibu Siti"
                      value={quickWaName}
                      onChange={(e) => {
                        setQuickWaName(e.target.value);
                        if (quickWaError) setQuickWaError(null);
                      }}
                    />
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label htmlFor="quick-wa-loc-input" className="wa-prep-label">
                      Wilayah / Kecamatan di Bogor <span className="req">*</span>
                    </label>
                    <select
                      id="quick-wa-loc-input"
                      className={`wa-prep-select ${quickWaError && !quickWaLocation.trim() ? 'input-error' : ''}`}
                      value={quickWaLocation}
                      onChange={(e) => {
                        setQuickWaLocation(e.target.value);
                        if (quickWaError) setQuickWaError(null);
                      }}
                    >
                      <option value="">-- Pilih Kecamatan di Bogor --</option>
                      {BOGOR_AREAS.map((area, aIdx) => (
                        <option key={aIdx} value={area}>
                          {area}
                        </option>
                      ))}
                      <option value="Kota Bogor Lainnya">Kota Bogor Lainnya</option>
                      <option value="Kabupaten Bogor Lainnya">Kabupaten Bogor Lainnya</option>
                    </select>
                  </div>
                </div>

                {/* Validation Error Feedback */}
                {quickWaError && (
                  <div className="wa-validation-alert" role="alert">
                    <i className="fas fa-exclamation-circle"></i>
                    <span>{quickWaError}</span>
                  </div>
                )}
              </div>

              {/* Big Interactive WhatsApp CTA Button */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  type="submit"
                  className="quick-wa-cta-btn"
                  aria-label="Chat Admin via WhatsApp"
                >
                  <i className="fab fa-whatsapp"></i>
                  <div className="quick-wa-cta-text">
                    <span className="quick-wa-cta-title">CHAT ADMIN VIA WHATSAPP SEKARANG</span>
                    <span className="quick-wa-cta-sub">
                      +62 857-1565-4183 · Respon Kilat (&lt; 2 Menit)
                    </span>
                  </div>
                </button>
              </div>
            </form>

            {/* Direct Call Alternative */}
            <div className="quick-wa-phone-row">
              <span>Lebih nyaman telepon langsung?</span>
              <a href="tel:+6285715654183" className="quick-wa-phone-link">
                <i className="fas fa-phone-alt"></i>
                <span>Klik untuk Panggilan Suara: +62 857-1565-4183</span>
              </a>
            </div>

            {/* Trust Points Strip */}
            <div className="quick-wa-trust-strip">
              <div className="quick-wa-trust-item">
                <i className="fas fa-check-circle"></i>
                <span>Konsultasi &amp; Cek Tarif 100% Gratis</span>
              </div>
              <div className="quick-wa-trust-item">
                <i className="fas fa-check-circle"></i>
                <span>Tanpa Perlu Bayar DP (Bayar Pas Beres)</span>
              </div>
              <div className="quick-wa-trust-item">
                <i className="fas fa-check-circle"></i>
                <span>Garansi Resmi &amp; Armada Siaga Seluruh Bogor</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ (PERTANYAAN SERING DIAJUKAN) */}
      <section className="faq-section" id="faq">
        {/* Schema.org FAQPage Structured Data (JSON-LD) for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
        />

        <div className="container">
          <div className="section-header fade-in">
            <span className="section-badge">TANYA JAWAB</span>
            <h2 className="section-title">Pertanyaan Sering Diajukan<br />(FAQ Pelanggan)</h2>
            <p className="section-subtitle">
              Jawaban lengkap seputar cara pemesanan, jangkauan wilayah spesifik Bogor, estimasi waktu kedatangan, dan prosedur garansi Mitra Bersih.
            </p>
          </div>

          {/* Real-time FAQ Search Bar & Category Filters */}
          <div className={`faq-search-container fade-in ${isSearchActive ? 'is-typing search-active' : ''} ${faqSearch.trim() ? 'has-query' : ''}`}>
            <div className={`faq-search-box ${isSearchActive ? 'is-typing faq-search-pulse search-active is-processing' : ''} ${faqSearch.trim() ? 'has-query' : ''}`}>
              <i className={`fas fa-search faq-search-icon ${isSearchActive ? 'icon-searching' : ''}`}></i>
              <input
                type="text"
                id="faq-search-input"
                data-testid="faq-search-input"
                className={`faq-search-input ${
                  isSearchActive
                    ? 'search-active soft-yellow-glow faq-search-input-filtering is-typing is-processing faq-search-pulse pulse-border typing-pulse'
                    : ''
                }`}
                placeholder="Cari pertanyaan... (contoh: tarif, garansi, gang sempit, 24 jam, cara pesan)"
                value={faqSearch}
                onChange={(e) => handleFaqSearchChange(e.target.value)}
                onInput={markSearchFilterRunning}
                onKeyDown={markSearchFilterRunning}
                onKeyUp={markSearchFilterRunning}
                onFocus={() => {
                  if (faqSearch.trim()) markSearchFilterRunning();
                }}
                aria-label="Cari pertanyaan FAQ"
                aria-busy={isSearchActive}
              />
              {isSearchActive && (
                <span className="faq-search-typing-indicator" title="Sedang menyaring pertanyaan...">
                  <span className="typing-pulse-dot"></span>
                  <span className="typing-pulse-text">Menyaring</span>
                </span>
              )}
              {faqSearch && (
                <button
                  type="button"
                  className="faq-search-clear"
                  onClick={handleFaqSearchClear}
                  title="Hapus pencarian"
                  aria-label="Hapus kata kunci pencarian"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>

            <div className="faq-filter-row">
              <div className="faq-filter-pills">
                {FAQ_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`faq-filter-pill ${faqCategory === cat ? 'active' : ''}`}
                    onClick={() => {
                      setFaqCategory(cat);
                      if (faqSearch.trim()) {
                        markSearchFilterRunning();
                      }
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="faq-count-badge">
                {isSearchActive && faqSearch.trim() ? (
                  <span className="faq-count-searching">
                    <i className="fas fa-spinner fa-spin" style={{ marginRight: '6px', color: '#D97706' }}></i>
                    Menyaring pertanyaan cerdas...
                  </span>
                ) : faqSearch || faqCategory !== 'Topik Populer' ? (
                  <span>
                    Ditemukan <strong>{filteredFaqs.length}</strong> dari {FAQ_DATA.length} pertanyaan
                  </span>
                ) : (
                  <span>Total {FAQ_DATA.length} topik populer</span>
                )}
              </div>
            </div>
          </div>

          <div className="faq-container fade-in">
            {isSearchActive && faqSearch.trim() ? (
              <div
                key={`faq-skeleton-${faqCategory}`}
                className="faq-loading-skeleton-container faq-results-refresh faq-scale-in"
                role="status"
                aria-live="polite"
                aria-label="Menyaring pertanyaan FAQ dengan AI"
              >
                {/* AI Filtering Progress Box */}
                <div className="faq-filtering-progress-box">
                  <div className="faq-filtering-progress-track">
                    <div className="faq-filtering-progress-bar"></div>
                  </div>
                  <div className="faq-filtering-status-info">
                    <div className="faq-filtering-status-left">
                      <span className="faq-ai-filter-sparkle">
                        <i className="fas fa-wand-magic-sparkles"></i>
                      </span>
                      <span className="faq-ai-filter-text">
                        <strong>AI Smart Filter:</strong> Menyaring pertanyaan relevan untuk &ldquo;{faqSearch}&rdquo;...
                      </span>
                    </div>
                    <span className="faq-filtering-loading-tag">
                      <i className="fas fa-circle-notch fa-spin"></i> Menyaring Jawaban
                    </span>
                  </div>
                </div>

                {/* Skeleton Cards Preview */}
                <div className="faq-skeleton-list">
                  {[1, 2, 3].map((idx) => (
                    <div
                      key={`faq-skeleton-${idx}`}
                      className={`faq-skeleton-card ${idx === 1 ? 'is-expanded-preview' : ''}`}
                      style={{ animationDelay: `${(idx - 1) * 0.08}s` }}
                    >
                      <div className="faq-skeleton-bar">
                        <div className="faq-skeleton-badge skeleton-shimmer"></div>
                        <div className="faq-skeleton-content">
                          <div
                            className="faq-skeleton-line skeleton-title skeleton-shimmer"
                            style={{ width: idx === 1 ? '78%' : idx === 2 ? '64%' : '82%' }}
                          ></div>
                          <div className="faq-skeleton-meta-row">
                            <div
                              className="faq-skeleton-tag skeleton-shimmer"
                              style={{ width: idx === 1 ? '90px' : idx === 2 ? '75px' : '100px' }}
                            ></div>
                            <div
                              className="faq-skeleton-line skeleton-subtitle skeleton-shimmer"
                              style={{ width: idx === 1 ? '36%' : idx === 2 ? '28%' : '42%' }}
                            ></div>
                          </div>
                        </div>
                        <div className="faq-skeleton-action skeleton-shimmer"></div>
                      </div>

                      {/* Realistic Answer Block Skeleton Preview for the First Open Item */}
                      {idx === 1 && (
                        <div className="faq-skeleton-answer">
                          <div className="faq-skeleton-line skeleton-body skeleton-shimmer" style={{ width: '94%' }}></div>
                          <div className="faq-skeleton-line skeleton-body skeleton-shimmer" style={{ width: '86%' }}></div>
                          <div className="faq-skeleton-line skeleton-body skeleton-shimmer" style={{ width: '62%' }}></div>
                          <div className="faq-skeleton-btn-row">
                            <div className="faq-skeleton-btn skeleton-shimmer" style={{ width: '185px' }}></div>
                            <div className="faq-skeleton-btn skeleton-shimmer" style={{ width: '135px' }}></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : filteredFaqs.length === 0 ? (
              <div key={`faq-empty-${faqSearch}-${faqCategory}`} className="faq-empty-state faq-results-refresh faq-scale-in">
                <i className="fas fa-search"></i>
                <h4>Tidak Ada Pertanyaan Ditemukan</h4>
                <p>
                  Maaf, tidak ada tanya jawab yang cocok dengan kata kunci &ldquo;{faqSearch}&rdquo;{faqCategory !== 'Topik Populer' ? ` pada kategori ${faqCategory}` : ''}. Silakan coba kata kunci lain atau konsultasikan langsung dengan customer support teknis kami.
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="faq-empty-reset-btn"
                    onClick={() => {
                      handleFaqSearchClear();
                      setFaqCategory('Topik Populer');
                    }}
                  >
                    <i className="fas fa-redo-alt" style={{ marginRight: '6px' }}></i>
                    Tampilkan Semua Topik Populer
                  </button>
                  <a
                    href={`https://wa.me/6285715654183?text=${encodeURIComponent(`Halo Mitra Bersih, saya ingin tanya kendala spesifik: ${faqSearch}`)}`}
                    className="faq-cta-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '13.5px', padding: '10px 20px' }}
                  >
                    <i className="fab fa-whatsapp"></i> Tanya Langsung via WA
                  </a>
                </div>
              </div>
            ) : (
              <div key={`faq-list-${faqSearch}-${faqCategory}`} className="faq-list faq-results-refresh faq-scale-in">
                {filteredFaqs.map((item, index) => {
                  const isOpen = openFaq === item.id;
                  const directWaMessage =
                    `Halo Admin CS Mitra Bersih,\n\n` +
                    `Saya ingin bertanya seputar pertanyaan spesifik dari FAQ website:\n` +
                    `❓ *Pertanyaan:* "${item.question}"\n` +
                    `📂 *Kategori:* ${item.category}\n\n` +
                    `*Kebutuhan:* Mohon info penjelasan teknis, estimasi tarif pengerjaan, dan ketersediaan jadwal armada untuk area Bogor.\n\n` +
                    `Terima kasih!`;
                  const directWaUrl = `https://wa.me/6285715654183?text=${encodeURIComponent(directWaMessage)}`;

                  return (
                    <div
                      key={item.id}
                      id={`faq-${item.id}`}
                      className={`faq-item ${isOpen ? 'active' : ''}`}
                      style={{ animationDelay: `${Math.min(index * 0.035, 0.28)}s` }}
                    >
                      <div className="faq-question-bar">
                        <button
                          type="button"
                          className="faq-question"
                          onClick={() => setOpenFaq(isOpen ? null : item.id)}
                          aria-expanded={isOpen}
                          aria-controls={`faq-answer-${item.id}`}
                        >
                          <div className="faq-question-text">
                            <span className="faq-q-badge">{item.id}</span>
                            <span>{highlightMatch(item.question, faqSearch)}</span>
                          </div>
                        </button>
                        <div className="faq-question-actions">
                          <button
                            type="button"
                            className="faq-share-trigger-btn"
                            onClick={() => openFaqShare(item)}
                            title="Bagikan jawaban pertanyaan ini ke media sosial atau pesan instan"
                            aria-label={`Bagikan jawaban untuk: ${item.question}`}
                          >
                            <i className="fas fa-share-alt"></i>
                            <span className="faq-share-trigger-label">Bagikan</span>
                          </button>
                          <button
                            type="button"
                            className="faq-toggle-btn"
                            onClick={() => setOpenFaq(isOpen ? null : item.id)}
                            aria-expanded={isOpen}
                            aria-label={isOpen ? `Tutup jawaban FAQ nomor ${item.id}` : `Buka jawaban FAQ nomor ${item.id}`}
                          >
                            <div className="faq-toggle-icon">
                              <i className={`fas ${isOpen ? 'fa-minus' : 'fa-plus'}`}></i>
                            </div>
                          </button>
                        </div>
                      </div>

                      <div
                        id={`faq-answer-${item.id}`}
                        className={`faq-answer-collapse ${isOpen ? 'open' : ''}`}
                        aria-hidden={!isOpen}
                      >
                        <div className="faq-answer">
                          {item.answer}

                          {/* Tombol Tanya Admin via WhatsApp & Bagikan Jawaban */}
                          <div className="faq-item-action">
                            <div className="faq-item-action-header">
                              <div className="faq-item-action-icon">
                                <i className="fab fa-whatsapp"></i>
                              </div>
                              <div className="faq-item-action-text">
                                <strong>Punya pertanyaan spesifik terkait hal ini?</strong>
                                <span>Tanyakan langsung ke Admin Mitra Bersih via WhatsApp 24 jam dengan detail pertanyaan otomatis terisi.</span>
                              </div>
                            </div>
                            <div className="faq-item-action-btns">
                              <a
                                href={directWaUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="faq-item-wa-btn"
                                aria-label={`Tanya Admin via WhatsApp tentang: ${item.question}`}
                              >
                                <i className="fab fa-whatsapp"></i>
                                <span>Tanya Admin via WhatsApp</span>
                              </a>
                              <button
                                type="button"
                                onClick={() => openFaqChatModal(item)}
                                className="faq-item-custom-btn"
                                title="Kustomisasi dengan menyertakan nama dan alamat Bogor"
                                aria-label={`Kustomisasi detail dengan nama dan lokasi untuk pertanyaan: ${item.question}`}
                              >
                                <i className="fas fa-edit"></i>
                                <span>Sertakan Nama &amp; Wilayah</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => openFaqShare(item)}
                                className="faq-item-share-btn"
                                title="Bagikan jawaban informatif ini ke media sosial atau pesan instan"
                                aria-label={`Bagikan jawaban untuk: ${item.question}`}
                              >
                                <i className="fas fa-share-alt"></i>
                                <span>Bagikan Jawaban</span>
                              </button>
                            </div>
                          </div>

                          {/* Quick Share Strip */}
                          <div className="faq-item-share-strip">
                            <span className="faq-share-strip-title">
                              <i className="fas fa-share-nodes"></i> Bagikan Solusi:
                            </span>
                            <div className="faq-share-strip-links">
                              <a
                                href={getFaqShareWaUrl(item)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="faq-strip-btn faq-strip-wa"
                                title="Bagikan ke WhatsApp"
                                aria-label="Bagikan ke WhatsApp"
                              >
                                <i className="fab fa-whatsapp"></i>
                                <span>WhatsApp</span>
                              </a>
                              <a
                                href={getFaqShareTelegramUrl(item)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="faq-strip-btn faq-strip-telegram"
                                title="Bagikan ke Telegram"
                                aria-label="Bagikan ke Telegram"
                              >
                                <i className="fab fa-telegram"></i>
                                <span>Telegram</span>
                              </a>
                              <a
                                href={getFaqShareFacebookUrl(item)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="faq-strip-btn faq-strip-facebook"
                                title="Bagikan ke Facebook"
                                aria-label="Bagikan ke Facebook"
                              >
                                <i className="fab fa-facebook-f"></i>
                                <span>Facebook</span>
                              </a>
                              <a
                                href={getFaqShareTwitterUrl(item)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="faq-strip-btn faq-strip-twitter"
                                title="Bagikan ke X / Twitter"
                                aria-label="Bagikan ke X"
                              >
                                <i className="fab fa-x-twitter"></i>
                                <span>X</span>
                              </a>
                              <button
                                type="button"
                                onClick={() => handleCopyFaqFullText(item)}
                                className="faq-strip-btn faq-strip-copy"
                                title="Salin teks jawaban lengkap"
                                aria-label="Salin teks jawaban lengkap"
                              >
                                <i className={`fas ${copiedFaqId === item.id ? 'fa-check text-green-600' : 'fa-copy'}`}></i>
                                <span>{copiedFaqId === item.id ? 'Tersalin!' : 'Salin Teks'}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

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
                      onClick={() => {
                        setSelectedWaTopic(idx);
                        if (hubungiWaError) setHubungiWaError(null);
                      }}
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

              {/* Client-Side Validation Contact Form */}
              <form onSubmit={handleHubungiWaSubmit} className="wa-section-prep-form">
                <div className="wa-section-prep-box">
                  <div className="wa-prep-header">
                    <div className="wa-prep-badge" style={{ background: '#111', color: 'var(--yellow)' }}>
                      <i className="fas fa-user-check"></i>
                      <span>FORM CEPAT HUBUNGI KAMI</span>
                    </div>
                    <span className="wa-prep-hint" style={{ color: '#E2E8F0' }}>
                      Isi nama &amp; kecamatan Anda di Bogor agar CS langsung meluncurkan armada
                    </span>
                  </div>

                  <div className="wa-prep-grid">
                    <div className="form-group" style={{ margin: 0 }}>
                      <label htmlFor="hubungi-wa-name-input" className="wa-prep-label" style={{ color: '#F8FAFC' }}>
                        Nama Lengkap Anda <span className="req" style={{ color: 'var(--yellow)' }}>*</span>
                      </label>
                      <input
                        id="hubungi-wa-name-input"
                        type="text"
                        className={`wa-prep-input ${hubungiWaError && (!hubungiWaName.trim() || hubungiWaName.trim().length < 2) ? 'input-error' : ''}`}
                        placeholder="Contoh: Ibu Lestari / Pak Wahyu"
                        value={hubungiWaName}
                        onChange={(e) => {
                          setHubungiWaName(e.target.value);
                          if (hubungiWaError) setHubungiWaError(null);
                        }}
                      />
                    </div>

                    <div className="form-group" style={{ margin: 0 }}>
                      <label htmlFor="hubungi-wa-loc-input" className="wa-prep-label" style={{ color: '#F8FAFC' }}>
                        Wilayah / Kecamatan di Bogor <span className="req" style={{ color: 'var(--yellow)' }}>*</span>
                      </label>
                      <select
                        id="hubungi-wa-loc-input"
                        className={`wa-prep-select ${hubungiWaError && !hubungiWaLocation.trim() ? 'input-error' : ''}`}
                        value={hubungiWaLocation}
                        onChange={(e) => {
                          setHubungiWaLocation(e.target.value);
                          if (hubungiWaError) setHubungiWaError(null);
                        }}
                      >
                        <option value="">-- Pilih Kecamatan di Bogor --</option>
                        {BOGOR_AREAS.map((area, aIdx) => (
                          <option key={aIdx} value={area}>
                            {area}
                          </option>
                        ))}
                        <option value="Kota Bogor Lainnya">Kota Bogor Lainnya</option>
                        <option value="Kabupaten Bogor Lainnya">Kabupaten Bogor Lainnya</option>
                      </select>
                    </div>
                  </div>

                  {/* Validation Error Alert */}
                  {hubungiWaError && (
                    <div className="wa-validation-alert" style={{ background: '#FEF2F2', borderColor: '#FCA5A5', color: '#991B1B' }} role="alert">
                      <i className="fas fa-exclamation-triangle"></i>
                      <span>{hubungiWaError}</span>
                    </div>
                  )}
                </div>

                {/* Big Interactive WhatsApp CTA Button */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                    type="submit"
                    className="wa-giant-btn"
                    aria-label="Chat WhatsApp CS Mitra Bersih"
                  >
                    <i className="fab fa-whatsapp"></i>
                    <div className="wa-giant-text">
                      <span className="wa-giant-title">CHAT CS VIA WHATSAPP SEKARANG</span>
                      <span className="wa-giant-sub">
                        +62 857-1565-4183 · Respon Kilat (&lt; 2 Menit)
                      </span>
                    </div>
                  </button>
                </div>
              </form>

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

          {/* Article Category Filter & Search Bar */}
          <div className="article-search-container fade-in">
            {/* Pill-Based Category Navigation */}
            <div className="article-category-nav-wrapper">
              <div className="article-category-nav-header">
                <div className="article-category-nav-title">
                  <i className="fas fa-filter"></i>
                  <span>Filter Kategori Artikel:</span>
                </div>
                <div className="article-category-nav-hint">
                  Pilih kategori untuk memfilter panduan spesifik
                </div>
              </div>

              <div className="article-category-pills" role="tablist" aria-label="Navigasi Filter Kategori Artikel">
                {ARTICLE_CATEGORY_CONFIGS.map((cat) => {
                  const isActive = articleCategory === cat.name;
                  const count = cat.name === 'Semua'
                    ? ARTICLES_DATA.length
                    : ARTICLES_DATA.filter((a) => a.category === cat.name).length;

                  return (
                    <button
                      key={cat.name}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`article-category-pill-btn ${isActive ? 'active' : ''}`}
                      onClick={() => setArticleCategory(cat.name)}
                      title={cat.description}
                    >
                      <i className={`fas ${cat.icon}`}></i>
                      <span className="category-pill-title">{cat.name}</span>
                      <span className="category-pill-badge">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search Input Box & Filter Result Indicator */}
            <div className="article-search-box">
              <i className="fas fa-search article-search-icon"></i>
              <input
                type="text"
                className="article-search-input"
                placeholder="Cari topik artikel... (contoh: septic tank penuh, bau got, wastafel mampet, pipa pvc)"
                value={articleSearch}
                onChange={(e) => setArticleSearch(e.target.value)}
                aria-label="Cari artikel edukasi"
              />
              {articleSearch && (
                <button
                  type="button"
                  className="article-search-clear"
                  onClick={() => setArticleSearch('')}
                  title="Hapus pencarian"
                  aria-label="Hapus kata kunci pencarian"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>

            <div className="article-filter-summary-row">
              <div className="article-active-filter-indicator">
                <i className="fas fa-tag"></i>
                <span>
                  Kategori aktif: <strong>{articleCategory}</strong>
                  {articleSearch && <> • Kata kunci: &ldquo;<em>{articleSearch}</em>&rdquo;</>}
                </span>
              </div>

              <div className="article-count-badge">
                <span>
                  Ditemukan <strong>{filteredArticles.length}</strong> dari {ARTICLES_DATA.length} artikel
                </span>
              </div>
            </div>
          </div>

          <div className="articles-grid fade-in">
            {filteredArticles.length === 0 ? (
              <div className="article-empty-state">
                <i className="fas fa-newspaper"></i>
                <h4>Artikel Tidak Ditemukan</h4>
                <p>
                  Tidak ada artikel yang cocok dengan kata kunci &ldquo;{articleSearch}&rdquo;{articleCategory !== 'Semua' ? ` pada kategori ${articleCategory}` : ''}. Silakan cari topik lain atau reset pencarian.
                </p>
                <button
                  type="button"
                  className="article-empty-reset-btn"
                  onClick={() => {
                    setArticleSearch('');
                    setArticleCategory('Semua');
                  }}
                >
                  <i className="fas fa-redo-alt" style={{ marginRight: '6px' }}></i>
                  Tampilkan Semua Artikel
                </button>
              </div>
            ) : (
              filteredArticles.map((article) => (
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
                      referrerPolicy="no-referrer"
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

                    <h3 className="article-title">{highlightMatch(article.title, articleSearch)}</h3>
                    <p className="article-excerpt">{highlightMatch(article.excerpt, articleSearch)}</p>

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
              ))
            )}
          </div>

          {/* Quick jump to Arsip Artikel */}
          <div className="article-archive-prompt fade-in">
            <div className="article-archive-prompt-inner">
              <div className="article-archive-prompt-text">
                <i className="fas fa-history"></i>
                <div>
                  <strong>Mencari panduan dari bulan-bulan sebelumnya?</strong>
                  <span>Tersedia 11 panduan terarsip lengkap dari Mei hingga Agustus 2026.</span>
                </div>
              </div>
              <a
                href="#arsip-artikel"
                onClick={(e) => scrollToSection(e, 'arsip-artikel')}
                className="article-archive-prompt-link"
              >
                <span>Buka Arsip Artikel</span>
                <i className="fas fa-arrow-down"></i>
              </a>
            </div>
          </div>

          {/* SECTION NEWSLETTER: BERITA LINGKUNGAN */}
          <div className="newsletter-box fade-in">
            <div className="newsletter-inner">
              <div className="newsletter-header">
                <div className="newsletter-badge">
                  <i className="fas fa-leaf"></i>
                  <span>BULETIN &amp; BERITA LINGKUNGAN BOGOR</span>
                </div>
                <h3 className="newsletter-title">
                  Dapatkan Tips Sanitasi &amp; Berita Lingkungan Terbaru
                </h3>
                <p className="newsletter-subtitle">
                  Bergabunglah dengan buletin informatif Mitra Bersih 24 Jam. Kami membagikan panduan pencegahan WC mampet, sanitasi rumah tangga ramah lingkungan, dan berita lingkungan terkini di Kota &amp; Kabupaten Bogor langsung ke email Anda.
                </p>
              </div>

              <div className="newsletter-perks">
                <div className="newsletter-perk-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Tips Hemat Perawatan Septic Tank</span>
                </div>
                <div className="newsletter-perk-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Waspada Saluran Mampet Musim Hujan</span>
                </div>
                <div className="newsletter-perk-item">
                  <i className="fas fa-check-circle"></i>
                  <span>100% Gratis &amp; Bebas Spam</span>
                </div>
              </div>

              <form onSubmit={handleSubscribeNewsletter} className="newsletter-form">
                <div className="newsletter-input-group">
                  <i className="fas fa-envelope newsletter-field-icon"></i>
                  <input
                    type="email"
                    className={`newsletter-input ${newsletterError ? 'input-error' : ''}`}
                    placeholder="Masukkan alamat email Anda (contoh: warga.bogor@gmail.com)..."
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      if (newsletterError) setNewsletterError(null);
                    }}
                    aria-label="Alamat email untuk berlangganan berita lingkungan"
                  />
                  <button type="submit" className="newsletter-submit-btn">
                    <i className="fas fa-paper-plane"></i>
                    <span>Join Sekarang</span>
                  </button>
                </div>

                {newsletterError && (
                  <div className="newsletter-alert error" role="alert">
                    <i className="fas fa-exclamation-triangle"></i>
                    <span>{newsletterError}</span>
                  </div>
                )}

                {newsletterSuccess && (
                  <div className="newsletter-alert success" role="status">
                    <i className="fas fa-check-circle"></i>
                    <span>{newsletterSuccess}</span>
                  </div>
                )}

                {subscribers.length > 0 && (
                  <div className="newsletter-counter-badge">
                    <i className="fas fa-users"></i>
                    <span>
                      Telah diikuti oleh <strong>{subscribers.length}</strong> pembaca peduli sanitasi &amp; lingkungan di Bogor
                    </span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ARSIP ARTIKEL (PREVIOUS MONTHS) */}
      <section className="arsip-section" id="arsip-artikel">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-badge">ARSIP ARTIKEL</span>
            <h2 className="section-title">Arsip Panduan &amp; Edukasi Terdahulu</h2>
            <p className="section-subtitle">
              Jelajahi kembali kumpulan artikel sanitasi, tips perawatan septic tank, dan pemeliharaan saluran dari bulan-bulan sebelumnya (Mei – Agustus 2026).
            </p>
          </div>

          {/* Month Navigation & Controls Bar */}
          <div className="arsip-controls-card fade-in">
            <div className="arsip-controls-top">
              <div className="arsip-month-nav">
                <span className="arsip-nav-label">
                  <i className="fas fa-filter"></i> Pilih Periode:
                </span>
                <div className="arsip-month-pills">
                  {ARCHIVE_MONTH_TABS.map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      className={`arsip-month-pill ${selectedArchiveMonth === tab.key ? 'active' : ''}`}
                      onClick={() => setSelectedArchiveMonth(tab.key)}
                    >
                      <i className={`fas ${tab.icon}`}></i>
                      <span>{tab.label}</span>
                      <span className="arsip-pill-count">{tab.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Prev / Next Month Navigation Arrows */}
              <div className="arsip-nav-arrows">
                <button
                  type="button"
                  className="arsip-nav-arrow-btn"
                  onClick={handlePrevArchiveMonth}
                  title="Ke Bulan Sebelumnya"
                  aria-label="Pindah ke arsip bulan sebelumnya"
                >
                  <i className="fas fa-chevron-left"></i>
                  <span>Bulan Sebelumnya</span>
                </button>
                <button
                  type="button"
                  className="arsip-nav-arrow-btn"
                  onClick={handleNextArchiveMonth}
                  title="Ke Bulan Berikutnya"
                  aria-label="Pindah ke arsip bulan berikutnya"
                >
                  <span>Bulan Berikutnya</span>
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>

            {/* Quick Filter / Search in Archive */}
            <div className="arsip-controls-bottom">
              <div className="arsip-search-wrap">
                <i className="fas fa-search arsip-search-icon"></i>
                <input
                  type="text"
                  className="arsip-search-input"
                  placeholder="Cari topik di arsip... (contoh: got, grease trap, biofilter, ventilasi, mudik)"
                  value={archiveSearch}
                  onChange={(e) => setArchiveSearch(e.target.value)}
                  aria-label="Cari artikel di arsip"
                />
                {archiveSearch && (
                  <button
                    type="button"
                    className="arsip-search-clear"
                    onClick={() => setArchiveSearch('')}
                    title="Hapus pencarian arsip"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>

              <div className="arsip-summary-badge">
                <span>
                  Menampilkan <strong>{filteredArchivedArticles.length}</strong> artikel terarsip
                  {selectedArchiveMonth !== 'all' && (
                    <> pada periode <em>{ARCHIVE_MONTH_TABS.find((t) => t.key === selectedArchiveMonth)?.label}</em></>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Archived Articles Grid */}
          <div className="arsip-grid fade-in">
            {filteredArchivedArticles.length === 0 ? (
              <div className="arsip-empty-state">
                <i className="fas fa-folder-open"></i>
                <h4>Tidak Ada Artikel di Arsip Ini</h4>
                <p>
                  Tidak ditemukan artikel arsip yang cocok dengan kata kunci &ldquo;{archiveSearch}&rdquo;. Silakan ganti kata kunci atau pilih periode bulan lain.
                </p>
                <button
                  type="button"
                  className="arsip-empty-reset-btn"
                  onClick={() => {
                    setArchiveSearch('');
                    setSelectedArchiveMonth('all');
                  }}
                >
                  <i className="fas fa-redo-alt"></i> Tampilkan Semua Arsip
                </button>
              </div>
            ) : (
              filteredArchivedArticles.map((article) => (
                <div
                  key={article.id}
                  className="arsip-card"
                  onClick={() => setSelectedArticle(article)}
                >
                  <div className="arsip-card-thumb">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== article.fallbackImage) {
                          target.src = article.fallbackImage;
                        }
                      }}
                    />
                    <div className="arsip-badge-group">
                      <span className="arsip-month-tag">
                        <i className="far fa-calendar-alt"></i> {article.month}
                      </span>
                      <span className="arsip-category-tag">{article.category}</span>
                    </div>
                  </div>

                  <div className="arsip-card-body">
                    <div className="arsip-card-meta">
                      <span className="arsip-date-text">
                        <i className="far fa-clock"></i> {article.date}
                      </span>
                      <span className="arsip-readtime-text">
                        <i className="fas fa-book-reader"></i> {article.readTime}
                      </span>
                      {article.viewsEstimate && (
                        <span className="arsip-views-text">
                          <i className="fas fa-eye"></i> {article.viewsEstimate}
                        </span>
                      )}
                    </div>

                    <h3 className="arsip-card-title">
                      {highlightMatch(article.title, archiveSearch)}
                    </h3>

                    <p className="arsip-card-excerpt">
                      {highlightMatch(article.excerpt, archiveSearch)}
                    </p>

                    <div className="arsip-card-footer">
                      <span className="arsip-card-read-link">
                        Baca Panduan Lengkap <i className="fas fa-arrow-right"></i>
                      </span>
                      <span className="arsip-card-label">
                        <i className="fas fa-history"></i> Panduan Terverifikasi
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Return to Latest Articles & Consultation Footer Bar */}
          <div className="arsip-footer-bar fade-in">
            <div className="arsip-footer-left">
              <a
                href="#artikel"
                onClick={(e) => scrollToSection(e, 'artikel')}
                className="arsip-back-to-latest-btn"
              >
                <i className="fas fa-arrow-up"></i>
                <span>Kembali ke Artikel Terbaru (Oktober 2026)</span>
              </a>
              <span className="arsip-footer-hint">
                <i className="fas fa-info-circle"></i> Seluruh artikel arsip tetap relevan dengan standar sanitasi &amp; SNI Indonesia.
              </span>
            </div>

            <a
              href="https://wa.me/6285715654183?text=Halo%20Mitra%20Bersih,%20saya%20membaca%20arsip%20artikel%20sanitasi%20dan%20ingin%20konsultasi%20kendala%20saluran%20di%20Bogor"
              target="_blank"
              rel="noopener noreferrer"
              className="arsip-consult-btn"
            >
              <i className="fab fa-whatsapp"></i>
              <span>Konsultasi Kendala via WA</span>
            </a>
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

      {/* SECTION STATISTIK REAL-TIME ARMADA */}
      <section className="armada-stats-section" id="statistik-armada" ref={statsSectionRef}>
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-badge">
              <i className="fas fa-satellite-dish" style={{ marginRight: '6px' }}></i>
              MONITORING REAL-TIME ARMADA
            </span>
            <h2 className="section-title">
              Status Kesiapan Armada &amp; Pos Siaga Bogor
            </h2>
            <p className="section-subtitle">
              Pantauan langsung kesiapan unit truk tangki vakum yang beroperasi aktif dan siap meluncur ke lokasi Anda 24 jam nonstop.
            </p>
          </div>

          <div className="armada-stats-grid">
            {/* Card 1: Total Armada Aktif */}
            <div className={`armada-stat-card ${statsVisible ? 'card-animated' : ''}`}>
              <div className="armada-stat-header">
                <div className="armada-stat-icon-wrap total">
                  <i className="fas fa-truck-moving"></i>
                </div>
                <div className="armada-stat-pill green">
                  <span className="pulse-dot-green"></span>
                  <span>100% Beroperasi</span>
                </div>
              </div>
              <div className="armada-stat-body">
                <div className="armada-stat-number-row">
                  <span className="armada-stat-number">{countTotalArmada}</span>
                  <span className="armada-stat-unit">Unit Truk</span>
                </div>
                <h3 className="armada-stat-title">Total Armada Aktif</h3>
                <p className="armada-stat-desc">
                  Unit mobil tangki vakum kapasitas 3.000L – 5.000L berstandar modern siap melayani kawasan perumahan dan perkantoran.
                </p>

                {/* Fitur Pilih Pos Siaga & Tanya Admin via WhatsApp */}
                <div className="armada-card-action-box">
                  <div className="armada-pos-select-group">
                    <label htmlFor="armada-pos-select-1" className="armada-pos-select-label">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>Pilih Pos Siaga:</span>
                    </label>
                    <div className="armada-pos-dropdown-wrap">
                      <select
                        id="armada-pos-select-1"
                        value={armadaCard1Pos}
                        onChange={(e) => setArmadaCard1Pos(e.target.value)}
                        className="armada-pos-dropdown"
                        aria-label="Pilih Pos Siaga untuk Cek Total Armada"
                      >
                        {MAP_HUBS.map((hub) => (
                          <option key={hub.id} value={hub.id}>
                            {hub.shortLabel} ({hub.estTime})
                          </option>
                        ))}
                      </select>
                      <i className="fas fa-chevron-down armada-pos-dropdown-icon"></i>
                    </div>
                  </div>

                  <div className="armada-card-btn-row">
                    <a
                      href={getArmadaCardWaUrl('total', armadaCard1Pos)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="armada-stat-admin-btn"
                      title={`Tanya Ketersediaan Armada ke Admin WhatsApp untuk ${MAP_HUBS.find((h) => h.id === armadaCard1Pos)?.name || ''}`}
                      aria-label={`Tanya Admin WhatsApp ketersediaan armada pos ${MAP_HUBS.find((h) => h.id === armadaCard1Pos)?.shortLabel || ''}`}
                    >
                      <i className="fab fa-whatsapp"></i>
                      <span>Tanya Admin</span>
                      <span className="armada-admin-btn-hub">
                        ({MAP_HUBS.find((h) => h.id === armadaCard1Pos)?.shortLabel || 'Pos'})
                      </span>
                    </a>
                    <button
                      type="button"
                      onClick={(e) => handleViewHubOnMapFromArmada(e, armadaCard1Pos)}
                      className="armada-pos-map-link-btn"
                      title="Lihat koordinat pos ini di Google Maps"
                      aria-label="Lihat pos ini di Google Maps"
                    >
                      <i className="fas fa-map-marked-alt"></i>
                      <span>Peta</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="armada-stat-footer">
                <div className="armada-stat-metric">
                  <i className="fas fa-check-circle"></i>
                  <span>Terbagi di 5 Pos Wilayah</span>
                </div>
                <div className="armada-progress-bar">
                  <div className="armada-progress-fill total" style={{ width: statsVisible ? '100%' : '0%' }}></div>
                </div>
              </div>
            </div>

            {/* Card 2: Armada Tersedia Saat Ini */}
            <div className={`armada-stat-card highlight ${statsVisible ? 'card-animated' : ''}`}>
              <div className="armada-stat-header">
                <div className="armada-stat-icon-wrap available">
                  <i className="fas fa-bolt"></i>
                </div>
                <div className="armada-stat-pill yellow">
                  <span className="pulse-dot-yellow"></span>
                  <span>Standby Siap Jalan</span>
                </div>
              </div>
              <div className="armada-stat-body">
                <div className="armada-stat-number-row">
                  <span className="armada-stat-number">{countArmadaTersedia}</span>
                  <span className="armada-stat-unit">Unit Siaga</span>
                </div>
                <h3 className="armada-stat-title">Armada Tersedia Saat Ini</h3>
                <p className="armada-stat-desc">
                  Unit siaga di pos terdekat yang siap langsung dipanggil tanpa antre lama dengan estimasi tiba 15 – 25 menit.
                </p>

                {/* Fitur Pilih Pos Siaga & Tanya Admin via WhatsApp */}
                <div className="armada-card-action-box">
                  <div className="armada-pos-select-group">
                    <label htmlFor="armada-pos-select-2" className="armada-pos-select-label">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>Pilih Pos Siaga:</span>
                    </label>
                    <div className="armada-pos-dropdown-wrap">
                      <select
                        id="armada-pos-select-2"
                        value={armadaCard2Pos}
                        onChange={(e) => setArmadaCard2Pos(e.target.value)}
                        className="armada-pos-dropdown"
                        aria-label="Pilih Pos Siaga untuk Cek Armada Tersedia"
                      >
                        {MAP_HUBS.map((hub) => (
                          <option key={hub.id} value={hub.id}>
                            {hub.shortLabel} ({hub.estTime})
                          </option>
                        ))}
                      </select>
                      <i className="fas fa-chevron-down armada-pos-dropdown-icon"></i>
                    </div>
                  </div>

                  <div className="armada-card-btn-row">
                    <a
                      href={getArmadaCardWaUrl('available', armadaCard2Pos)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="armada-stat-admin-btn"
                      title={`Tanya Ketersediaan Armada ke Admin WhatsApp untuk ${MAP_HUBS.find((h) => h.id === armadaCard2Pos)?.name || ''}`}
                      aria-label={`Tanya Admin WhatsApp ketersediaan armada pos ${MAP_HUBS.find((h) => h.id === armadaCard2Pos)?.shortLabel || ''}`}
                    >
                      <i className="fab fa-whatsapp"></i>
                      <span>Tanya Admin</span>
                      <span className="armada-admin-btn-hub">
                        ({MAP_HUBS.find((h) => h.id === armadaCard2Pos)?.shortLabel || 'Pos'})
                      </span>
                    </a>
                    <button
                      type="button"
                      onClick={(e) => handleViewHubOnMapFromArmada(e, armadaCard2Pos)}
                      className="armada-pos-map-link-btn"
                      title="Lihat koordinat pos ini di Google Maps"
                      aria-label="Lihat pos ini di Google Maps"
                    >
                      <i className="fas fa-map-marked-alt"></i>
                      <span>Peta</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="armada-stat-footer">
                <div className="armada-stat-metric">
                  <i className="fas fa-clock"></i>
                  <span>Respon Cepat &lt; 20 Menit</span>
                </div>
                <div className="armada-progress-bar">
                  <div className="armada-progress-fill available" style={{ width: statsVisible ? '75%' : '0%' }}></div>
                </div>
              </div>
            </div>

            {/* Card 3: Pos Siaga Terbanyak */}
            <div className={`armada-stat-card ${statsVisible ? 'card-animated' : ''}`}>
              <div className="armada-stat-header">
                <div className="armada-stat-icon-wrap hubs">
                  <i className="fas fa-warehouse"></i>
                </div>
                <div className="armada-stat-pill blue">
                  <span className="pulse-dot-blue"></span>
                  <span>Strategis 360°</span>
                </div>
              </div>
              <div className="armada-stat-body">
                <div className="armada-stat-number-row">
                  <span className="armada-stat-number">{countPosSiaga}</span>
                  <span className="armada-stat-unit">Pos Utama</span>
                </div>
                <h3 className="armada-stat-title">Pos Siaga Terbanyak</h3>
                <p className="armada-stat-desc">
                  Simpul armada terbesar di Cibinong &amp; Sentul (6 truk), didukung Pos Kota, Dramaga, Ciawi, dan Parung.
                </p>

                {/* Fitur Pilih Pos Siaga & Tanya Admin via WhatsApp */}
                <div className="armada-card-action-box">
                  <div className="armada-pos-select-group">
                    <label htmlFor="armada-pos-select-3" className="armada-pos-select-label">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>Pilih Pos Siaga:</span>
                    </label>
                    <div className="armada-pos-dropdown-wrap">
                      <select
                        id="armada-pos-select-3"
                        value={armadaCard3Pos}
                        onChange={(e) => setArmadaCard3Pos(e.target.value)}
                        className="armada-pos-dropdown"
                        aria-label="Pilih Pos Siaga untuk Cek Hub Terbanyak"
                      >
                        {MAP_HUBS.map((hub) => (
                          <option key={hub.id} value={hub.id}>
                            {hub.shortLabel} ({hub.estTime})
                          </option>
                        ))}
                      </select>
                      <i className="fas fa-chevron-down armada-pos-dropdown-icon"></i>
                    </div>
                  </div>

                  <div className="armada-card-btn-row">
                    <a
                      href={getArmadaCardWaUrl('hubs', armadaCard3Pos)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="armada-stat-admin-btn"
                      title={`Tanya Ketersediaan Armada ke Admin WhatsApp untuk ${MAP_HUBS.find((h) => h.id === armadaCard3Pos)?.name || ''}`}
                      aria-label={`Tanya Admin WhatsApp ketersediaan armada pos ${MAP_HUBS.find((h) => h.id === armadaCard3Pos)?.shortLabel || ''}`}
                    >
                      <i className="fab fa-whatsapp"></i>
                      <span>Tanya Admin</span>
                      <span className="armada-admin-btn-hub">
                        ({MAP_HUBS.find((h) => h.id === armadaCard3Pos)?.shortLabel || 'Pos'})
                      </span>
                    </a>
                    <button
                      type="button"
                      onClick={(e) => handleViewHubOnMapFromArmada(e, armadaCard3Pos)}
                      className="armada-pos-map-link-btn"
                      title="Lihat koordinat pos ini di Google Maps"
                      aria-label="Lihat pos ini di Google Maps"
                    >
                      <i className="fas fa-map-marked-alt"></i>
                      <span>Peta</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="armada-stat-footer">
                <div className="armada-stat-metric">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Jangkau 46 Kecamatan</span>
                </div>
                <div className="armada-progress-bar">
                  <div className="armada-progress-fill hubs" style={{ width: statsVisible ? '100%' : '0%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Ticker Status Strip */}
          <div className="armada-ticker-bar fade-in">
            <div className="armada-ticker-info">
              <span className="armada-ticker-pulse"></span>
              <span>
                <strong>LIVE DISPATCH MONITOR:</strong> Seluruh pos siaga dalam status prima • Melayani darurat 24 jam nonstop termasuk hari libur
              </span>
            </div>
            <a
              href="#lokasi"
              onClick={(e) => scrollToSection(e, 'lokasi')}
              className="armada-ticker-action-btn"
            >
              <span>Lihat Pos Terdekat di Peta</span>
              <i className="fas fa-arrow-down"></i>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION JADWAL LAYANAN RUTIN */}
      <section className="jadwal-rutin-section" id="jadwal-rutin">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-badge">
              <i className="fas fa-calendar-check" style={{ marginRight: '6px' }}></i>
              PROGRAM PEMELIHARAAN BERKALA
            </span>
            <h2 className="section-title">
              Jadwal Layanan Rutin &amp; Pengingat Otomatis
            </h2>
            <p className="section-subtitle">
              Cegah kloset mampet dan septic tank meluap sebelum terlambat. Pilih siklus pemeliharaan berkala <strong>6 Bulan</strong> atau <strong>1 Tahun</strong> dengan sistem pengingat otomatis langsung ke WhatsApp Anda.
            </p>
          </div>

          {/* DURATION TOGGLE & COMPARISON CARDS */}
          <div className="jadwal-cards-grid fade-in">
            {/* Card 1: Paket 6 Bulan */}
            <div
              className={`jadwal-plan-card ${rutinDuration === '6-bulan' ? 'active-plan' : ''}`}
              onClick={() => setRutinDuration('6-bulan')}
            >
              <div className="jadwal-plan-badge usaha">
                <i className="fas fa-store-alt"></i> REKOMENDASI USAHA &amp; RESTO
              </div>
              <div className="jadwal-plan-header">
                <div className="jadwal-plan-title-wrap">
                  <h3 className="jadwal-plan-title">Paket 6 Bulan</h3>
                  <span className="jadwal-plan-subtitle">Semi-Tahunan (Siklus Intensif)</span>
                </div>
                <div className="jadwal-plan-radio">
                  <span className={`jadwal-radio-dot ${rutinDuration === '6-bulan' ? 'checked' : ''}`}></span>
                </div>
              </div>

              <div className="jadwal-plan-pricing">
                <span className="jadwal-price-prefix">Siklus:</span>
                <strong>2x Pengecekan</strong>
                <span className="jadwal-price-suffix">/ Tahun</span>
              </div>

              <p className="jadwal-plan-desc">
                Sangat ideal untuk properti dengan intensitas pembuangan tinggi agar saluran tidak pernah tersumbat lemak membeku atau septic tank meluap mendadak.
              </p>

              <div className="jadwal-plan-target">
                <strong><i className="fas fa-building"></i> Cocok Untuk:</strong>
                <span>Resto, Kafe, Ruko, Kosan, Usaha Katering, &amp; Keluarga &gt; 5 Orang</span>
              </div>

              <ul className="jadwal-plan-features">
                <li>
                  <i className="fas fa-check-circle"></i>
                  <span>Pengingat otomatis via WhatsApp <strong>H-7</strong> sebelum jadwal jatuh tempo</span>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <span>Prioritas pemesanan armada weekend &amp; jam sibuk tanpa antre</span>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <span>Gratis inspeksi resapan &amp; pengecekan kerak grease trap</span>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <span>Diskon tarif berkala flat transparan di seluruh Bogor</span>
                </li>
              </ul>

              <div className="jadwal-plan-actions">
                <button
                  type="button"
                  className={`jadwal-select-btn ${rutinDuration === '6-bulan' ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setRutinDuration('6-bulan');
                  }}
                >
                  <i className="fas fa-check"></i> {rutinDuration === '6-bulan' ? 'Paket Terpilih (6 Bulan)' : 'Pilih Siklus 6 Bulan'}
                </button>
                <a
                  href={getDirectRutinWaUrl('6-bulan')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jadwal-direct-wa-btn"
                  onClick={(e) => e.stopPropagation()}
                  title="Daftar Langsung 6 Bulan via WhatsApp"
                >
                  <i className="fab fa-whatsapp"></i> Chat CS
                </a>
              </div>
            </div>

            {/* Card 2: Paket 1 Tahun */}
            <div
              className={`jadwal-plan-card ${rutinDuration === '1-tahun' ? 'active-plan' : ''}`}
              onClick={() => setRutinDuration('1-tahun')}
            >
              <div className="jadwal-plan-badge sni">
                <i className="fas fa-shield-alt"></i> STANDAR SANITASI SNI
              </div>
              <div className="jadwal-plan-header">
                <div className="jadwal-plan-title-wrap">
                  <h3 className="jadwal-plan-title">Paket 1 Tahun</h3>
                  <span className="jadwal-plan-subtitle">Tahunan (Standar Rumah Tangga)</span>
                </div>
                <div className="jadwal-plan-radio">
                  <span className={`jadwal-radio-dot ${rutinDuration === '1-tahun' ? 'checked' : ''}`}></span>
                </div>
              </div>

              <div className="jadwal-plan-pricing">
                <span className="jadwal-price-prefix">Siklus:</span>
                <strong>1x Pengurasan</strong>
                <span className="jadwal-price-suffix">/ Tahun</span>
              </div>

              <p className="jadwal-plan-desc">
                Sesuai standar baku mutu sanitasi Kementerian PUPR untuk menjaga kualitas air tanah, mencegah bau gas berbahaya, dan memastikan resapan tetap awet.
              </p>

              <div className="jadwal-plan-target">
                <strong><i className="fas fa-home"></i> Cocok Untuk:</strong>
                <span>Rumah tinggal pribadi, perumahan cluster, villa, dan ruko hunian keluarga</span>
              </div>

              <ul className="jadwal-plan-features">
                <li>
                  <i className="fas fa-check-circle"></i>
                  <span>Pengingat otomatis via WhatsApp <strong>H-14</strong> sebelum tanggal pemeliharaan</span>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <span>Jaminan pengurasan tuntas hingga dasar tangki tanpa bongkar keramik</span>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <span>Garansi kelancaran saluran kloset &amp; pipa pembuangan</span>
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  <span>Bebas biaya survei lokasi untuk seluruh wilayah Bogor</span>
                </li>
              </ul>

              <div className="jadwal-plan-actions">
                <button
                  type="button"
                  className={`jadwal-select-btn ${rutinDuration === '1-tahun' ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setRutinDuration('1-tahun');
                  }}
                >
                  <i className="fas fa-check"></i> {rutinDuration === '1-tahun' ? 'Paket Terpilih (1 Tahun)' : 'Pilih Siklus 1 Tahun'}
                </button>
                <a
                  href={getDirectRutinWaUrl('1-tahun')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jadwal-direct-wa-btn"
                  onClick={(e) => e.stopPropagation()}
                  title="Daftar Langsung 1 Tahun via WhatsApp"
                >
                  <i className="fab fa-whatsapp"></i> Chat CS
                </a>
              </div>
            </div>
          </div>

          {/* INTERACTIVE BOOKING / REMINDER FORM */}
          <div className="jadwal-form-container fade-in">
            <div className="jadwal-form-header">
              <div className="jadwal-form-title-wrap">
                <div className="jadwal-form-icon">
                  <i className="fab fa-whatsapp"></i>
                </div>
                <div>
                  <h3>Aktifkan Pengingat Jadwal Rutin via WhatsApp</h3>
                  <p>Isi formulir ringkas di bawah. Sistem kami akan otomatis mencatat data Anda dan memicu pesan WhatsApp pengingat.</p>
                </div>
              </div>
              <div className="jadwal-active-pill">
                <span>Durasi Aktif:</span>
                <strong>{rutinDuration === '6-bulan' ? '6 Bulan (Semi-Tahunan)' : '1 Tahun (Tahunan)'}</strong>
              </div>
            </div>

            {rutinError && (
              <div className="jadwal-alert error">
                <i className="fas fa-exclamation-circle"></i> {rutinError}
              </div>
            )}

            {rutinSuccess && (
              <div className="jadwal-alert success">
                <i className="fas fa-check-circle"></i> {rutinSuccess}
              </div>
            )}

            <form onSubmit={handleRutinSubmit} className="jadwal-form-grid">
              <div className="form-group">
                <label htmlFor="rutin-name">Nama Pemilik / Penanggung Jawab <span className="req">*</span></label>
                <div className="input-with-icon">
                  <i className="fas fa-user"></i>
                  <input
                    id="rutin-name"
                    type="text"
                    placeholder="Contoh: Bpk. Bambang / Ibu Dewi"
                    value={rutinName}
                    onChange={(e) => setRutinName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="rutin-phone">No. WhatsApp / HP</label>
                <div className="input-with-icon">
                  <i className="fab fa-whatsapp"></i>
                  <input
                    id="rutin-phone"
                    type="tel"
                    placeholder="Contoh: 0812-xxxx-xxxx"
                    value={rutinPhone}
                    onChange={(e) => setRutinPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="rutin-location">Wilayah / Kecamatan di Bogor <span className="req">*</span></label>
                <div className="input-with-icon">
                  <i className="fas fa-map-marker-alt"></i>
                  <select
                    id="rutin-location"
                    value={rutinLocation}
                    onChange={(e) => setRutinLocation(e.target.value)}
                    required
                  >
                    <option value="">-- Pilih Kecamatan di Bogor --</option>
                    {BOGOR_AREAS.map((area, idx) => (
                      <option key={idx} value={area}>{area}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="rutin-property">Jenis Properti</label>
                <div className="input-with-icon">
                  <i className="fas fa-city"></i>
                  <select
                    id="rutin-property"
                    value={rutinProperty}
                    onChange={(e) => setRutinProperty(e.target.value)}
                  >
                    <option value="Rumah Tinggal Pribadi">Rumah Tinggal Pribadi / Cluster</option>
                    <option value="Resto / Cafe / Rumah Makan">Resto / Cafe / Rumah Makan</option>
                    <option value="Ruko / Kantor / Tempat Usaha">Ruko / Kantor / Tempat Usaha</option>
                    <option value="Kos-kosan / Kontrakan">Kos-kosan / Kontrakan</option>
                    <option value="Villa / Penginapan">Villa / Penginapan (Puncak &amp; Sekitarnya)</option>
                    <option value="Pabrik / Gudang / Industri">Pabrik / Gudang / Industri</option>
                  </select>
                </div>
              </div>

              <div className="form-group span-2">
                <label htmlFor="rutin-service">Pilihan Layanan Pemeliharaan</label>
                <div className="input-with-icon">
                  <i className="fas fa-tools"></i>
                  <select
                    id="rutin-service"
                    value={rutinService}
                    onChange={(e) => setRutinService(e.target.value)}
                  >
                    <option value="Kuras Septic Tank & Sedot Tinja Rutin">Kuras Septic Tank &amp; Sedot Tinja Rutin</option>
                    <option value="Pengurasan Bak Grease Trap Lemak Dapur">Pengurasan Bak Grease Trap Lemak Dapur</option>
                    <option value="Perawatan & Pelancaran Saluran Pipa Mampet">Perawatan &amp; Pelancaran Saluran Pipa Mampet</option>
                    <option value="Paket Komplit (Kuras Tangki + Saluran Lancar)">Paket Komplit (Kuras Tangki + Saluran Lancar)</option>
                  </select>
                </div>
              </div>

              <div className="jadwal-form-actions span-2">
                <button type="submit" className="jadwal-submit-btn">
                  <i className="fab fa-whatsapp"></i>
                  <span>Daftarkan Pengingat Rutin via WhatsApp Sekarang</span>
                </button>
                <p className="jadwal-form-note">
                  <i className="fas fa-shield-alt"></i> Tanpa biaya pendaftaran. Notifikasi pengingat pemeliharaan dikirimkan langsung via WhatsApp secara sopan tanpa spam.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* SECTION LOKASI KAMI & GOOGLE MAPS INTERAKTIF */}
      <section className="lokasi-section" id="lokasi">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-badge">LOKASI KAMI &amp; AREA JANGKAUAN</span>
            <h2 className="section-title">
              Pusat Operasional &amp; Pos Siaga<br />Armada Seluruh Wilayah Bogor
            </h2>
            <p className="section-subtitle">
              Peta interaktif titik siaga armada Mitra Bersih 24 Jam. Kami menempatkan armada di berbagai simpul strategis Kota dan Kabupaten Bogor untuk memastikan kedatangan cepat dalam 15 hingga 30 menit ke lokasi Anda.
            </p>
          </div>

          {/* Pos Selector Pills / Buttons */}
          <div className="lokasi-tabs fade-in">
            <span className="lokasi-tabs-label">
              <i className="fas fa-map-marker-alt" style={{ marginRight: '6px' }}></i>
              Pilih Pos Siaga Armada Terdekat Anda:
            </span>
            <div className="lokasi-tabs-grid">
              {MAP_HUBS.map((hub, idx) => (
                <button
                  key={hub.id}
                  type="button"
                  className={`lokasi-tab-btn ${selectedMapHub === idx ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedLokasiKecamatan('');
                    triggerMapZoom(idx);
                  }}
                  title={`Klik untuk fokuskan peta ke ${hub.name}`}
                >
                  <i className="fas fa-truck-moving"></i>
                  <span>{hub.shortLabel}</span>
                  {selectedMapHub === idx && <span className="lokasi-tab-dot"></span>}
                </button>
              ))}
            </div>

            {/* Quick Area / Subdistrict Dropdown to Jump to Hub with Zoom */}
            <div className="lokasi-area-jump-row">
              <span className="lokasi-area-jump-label">
                <i className="fas fa-crosshairs"></i> Atau cari pos berdasarkan kecamatan Anda:
              </span>
              <div className="lokasi-area-select-box">
                <select
                  className="lokasi-area-select"
                  value={selectedLokasiKecamatan}
                  onChange={(e) => handleLokasiKecamatanSelect(e.target.value)}
                  aria-label="Pilih kecamatan untuk fokuskan peta"
                >
                  <option value="">-- Pilih Kecamatan di Bogor (Peta Langsung Zoom ke Pos Terdekat) --</option>
                  {BOGOR_AREA_DETAILS.map((area) => (
                    <option key={area.name} value={area.name}>
                      {area.name} ({area.type}) → {area.hub} [{area.estTime}]
                    </option>
                  ))}
                </select>
                <i className="fas fa-chevron-down lokasi-select-caret"></i>
              </div>
            </div>
          </div>

          {/* Main Map & Info Card Grid */}
          <div className="lokasi-grid fade-in">
            {/* Interactive Map Viewport with Subtle Zoom-In Animation */}
            <div className="lokasi-map-wrapper">
              {/* Map Top Header with Live GPS Status & View Mode Switcher */}
              <div className="lokasi-map-topbar">
                <div className="lokasi-map-status">
                  <span className="lokasi-pulse-dot"></span>
                  <span className="lokasi-map-status-title">LIVE GPS ARMADA BOGOR</span>
                  <span className="lokasi-gps-sync-badge">
                    <i className="fas fa-satellite"></i> 11/11 Unit Online
                  </span>
                </div>

                <div className="lokasi-map-actions-top">
                  <div className="lokasi-view-mode-tabs" role="tablist" aria-label="Pilih Tampilan Peta">
                    <button
                      type="button"
                      className={`lokasi-mode-pill ${mapViewMode === 'visual' ? 'active' : ''}`}
                      onClick={() => setMapViewMode('visual')}
                      role="tab"
                      aria-selected={mapViewMode === 'visual'}
                      title="Peta Interaktif Radar & Pos Siaga"
                    >
                      <i className="fas fa-radar"></i> Radar Live ({REALTIME_FLEET_TRUCKS.length} Truk)
                    </button>
                    <button
                      type="button"
                      className={`lokasi-mode-pill ${mapViewMode === 'google' ? 'active' : ''}`}
                      onClick={() => setMapViewMode('google')}
                      role="tab"
                      aria-selected={mapViewMode === 'google'}
                      title="Tampilan Google Maps Navigasi"
                    >
                      <i className="fas fa-map-location-dot"></i> Google Maps
                    </button>
                  </div>

                  <button
                    type="button"
                    className="lokasi-gps-refresh-btn"
                    onClick={handleRefreshGps}
                    title="Segarkan data GPS satelit real-time"
                    aria-label="Segarkan sinyal GPS"
                  >
                    <i className={`fas fa-rotate-right ${isGpsRefreshing ? 'fa-spin' : ''}`}></i>
                    <span>{lastGpsSync}</span>
                  </button>
                </div>
              </div>

              {/* Marker Filter Buttons (Only in Visual Mode) */}
              {mapViewMode === 'visual' && (
                <div className="lokasi-marker-filter-bar">
                  <div className="lokasi-marker-filter-top">
                    <span className="lokasi-marker-filter-label">
                      <i className="fas fa-filter"></i> Filter Titik Peta:
                    </span>
                    <div className="lokasi-marker-filter-chips">
                      <button
                        type="button"
                        className={`lokasi-filter-chip ${markerCategoryFilter === 'all' ? 'active' : ''}`}
                        onClick={() => setMarkerCategoryFilter('all')}
                      >
                        Semua Titik ({POS_ARMADA_MARKERS.length + REALTIME_FLEET_TRUCKS.length})
                      </button>
                      <button
                        type="button"
                        className={`lokasi-filter-chip ${markerCategoryFilter === 'pos' ? 'active' : ''}`}
                        onClick={() => setMarkerCategoryFilter('pos')}
                      >
                        <i className="fas fa-warehouse"></i> Pos Armada Siaga ({POS_ARMADA_MARKERS.length} Kecamatan)
                      </button>
                      <button
                        type="button"
                        className={`lokasi-filter-chip ${markerCategoryFilter === 'trucks' ? 'active' : ''}`}
                        onClick={() => setMarkerCategoryFilter('trucks')}
                      >
                        <i className="fas fa-truck-moving"></i> Posisi Truk Real-Time ({REALTIME_FLEET_TRUCKS.length})
                      </button>
                    </div>
                  </div>

                  {/* Quick Subdistrict Pos Siaga Selector Chips */}
                  <div className="lokasi-pos-kecamatan-strip">
                    <span className="lokasi-pos-kecamatan-label">
                      <i className="fas fa-map-pin"></i> Pos Armada Siaga per Kecamatan:
                    </span>
                    <div className="lokasi-pos-kecamatan-scroll" tabIndex={0} aria-label="Daftar pos armada per kecamatan">
                      {POS_ARMADA_MARKERS.map((pos) => {
                        const isPosSelected = activeMapMarker?.type === 'pos' && activeMapMarker.id === pos.id;
                        return (
                          <button
                            key={`chip-${pos.id}`}
                            type="button"
                            className={`pos-kecamatan-chip ${isPosSelected ? 'active' : ''}`}
                            onClick={() => {
                              setActiveMapMarker({ type: 'pos', id: pos.id });
                              const hubIdx = MAP_HUBS.findIndex((h) => h.id === pos.hubId);
                              if (hubIdx !== -1) setSelectedMapHub(hubIdx);
                              if (markerCategoryFilter === 'trucks') setMarkerCategoryFilter('all');
                            }}
                            title={`Lihat Pos Siaga Kecamatan ${pos.kecamatan} (${pos.truckCount} Truk Standby)`}
                          >
                            <span className="pos-chip-dot"></span>
                            <span className="pos-chip-title">{pos.shortLabel.replace(/^Pos (Kec\.\s*)?/, '')}</span>
                            <span className="pos-chip-count">{pos.truckCount} Truk</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Map Viewport: Visual Digital Radar vs Google Maps */}
              <div className="lokasi-iframe-container">
                {mapViewMode === 'visual' ? (
                  <div className="lokasi-interactive-canvas">
                    {/* SVG Vector Map of Greater Bogor */}
                    <svg className="lokasi-canvas-svg" viewBox="0 0 1000 650" preserveAspectRatio="none">
                      <defs>
                        <pattern id="radar-grid" width="45" height="45" patternUnits="userSpaceOnUse">
                          <path d="M 45 0 L 0 0 0 45" fill="none" stroke="rgba(255, 214, 10, 0.08)" strokeWidth="0.8" />
                        </pattern>
                        <linearGradient id="road-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.5" />
                          <stop offset="50%" stopColor="#FFD60A" stopOpacity="0.9" />
                          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.5" />
                        </linearGradient>
                        <linearGradient id="river-blue" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#0284C7" stopOpacity="0.3" />
                        </linearGradient>
                      </defs>

                      {/* Map Background with Coordinates Grid */}
                      <rect width="1000" height="650" fill="#0B1329" />
                      <rect width="1000" height="650" fill="url(#radar-grid)" />

                      {/* Sungai Ciliwung Natural Curve */}
                      <path
                        d="M 520 0 Q 510 180 500 270 T 520 380 T 490 510 T 680 650"
                        fill="none"
                        stroke="url(#river-blue)"
                        strokeWidth="7"
                        strokeLinecap="round"
                      />

                      {/* Tol Jagorawi Main Artery (Cibinong - Sentul - Bogor - Ciawi) */}
                      <path
                        d="M 680 0 L 670 170 L 730 260 L 580 370 L 670 480 L 850 650"
                        fill="none"
                        stroke="url(#road-gold)"
                        strokeWidth="4.5"
                        strokeDasharray="9 4"
                      />

                      {/* Jl. Raya Parung - Kemang to Kota Bogor */}
                      <path
                        d="M 280 0 L 290 130 L 400 240 L 470 340"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.35)"
                        strokeWidth="3.5"
                      />

                      {/* Jl. Sholeh Iskandar & Yasmin Ring Road */}
                      <path
                        d="M 330 290 L 540 310 L 650 330"
                        fill="none"
                        stroke="rgba(255, 214, 10, 0.6)"
                        strokeWidth="3.5"
                      />

                      {/* Jl. Raya Dramaga to Bogor Barat */}
                      <path
                        d="M 120 370 L 260 365 L 430 350 L 490 355"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.35)"
                        strokeWidth="3.5"
                      />

                      {/* Jl. Raya Ciawi - Puncak */}
                      <path
                        d="M 660 480 Q 750 520 850 560 T 980 650"
                        fill="none"
                        stroke="rgba(255, 214, 10, 0.6)"
                        strokeWidth="3.5"
                      />

                      {/* Radar Range Rings */}
                      <circle cx="490" cy="340" r="140" fill="none" stroke="rgba(255, 214, 10, 0.16)" strokeWidth="1" strokeDasharray="4 4" />
                      <circle cx="490" cy="340" r="280" fill="none" stroke="rgba(255, 214, 10, 0.11)" strokeWidth="1" strokeDasharray="6 6" />
                      <circle cx="490" cy="340" r="420" fill="none" stroke="rgba(255, 214, 10, 0.07)" strokeWidth="1" />
                    </svg>

                    {/* District Area Watermark Labels */}
                    <div className="lokasi-district-tags" aria-hidden="true">
                      <span className="district-tag" style={{ left: '26%', top: '12%' }}>KEC. PARUNG</span>
                      <span className="district-tag" style={{ left: '46%', top: '16%' }}>KEC. BOJONGGEDE</span>
                      <span className="district-tag" style={{ left: '68%', top: '18%' }}>KEC. CIBINONG</span>
                      <span className="district-tag" style={{ left: '76%', top: '32%' }}>SENTUL CITY</span>
                      <span className="district-tag" style={{ left: '41%', top: '38%' }}>TANAH SAREAL</span>
                      <span className="district-tag highlight" style={{ left: '50%', top: '44%' }}>KOTA BOGOR (PUSAT)</span>
                      <span className="district-tag" style={{ left: '20%', top: '64%' }}>KEC. DRAMAGA</span>
                      <span className="district-tag" style={{ left: '36%', top: '68%' }}>KEC. CIOMAS</span>
                      <span className="district-tag" style={{ left: '68%', top: '64%' }}>KEC. CIAWI</span>
                      <span className="district-tag" style={{ left: '85%', top: '76%' }}>PUNCAK / CISARUA</span>
                    </div>

                    {/* Interactive Pos Armada Siaga Markers */}
                    {(markerCategoryFilter === 'all' || markerCategoryFilter === 'pos') &&
                      POS_ARMADA_MARKERS.map((pos) => {
                        const isPosSelected = activeMapMarker?.type === 'pos' && activeMapMarker.id === pos.id;
                        return (
                          <div
                            key={pos.id}
                            className={`pos-armada-marker ${isPosSelected ? 'active' : ''}`}
                            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                            onClick={() => {
                              setActiveMapMarker({ type: 'pos', id: pos.id });
                              const hubIdx = MAP_HUBS.findIndex((h) => h.id === pos.hubId);
                              if (hubIdx !== -1) setSelectedMapHub(hubIdx);
                            }}
                            title={`Pos Siaga: ${pos.name} (${pos.truckCount} Truk Standby)`}
                          >
                            <span className="pos-armada-pulse-ring"></span>
                            <div className="pos-armada-icon-box">
                              <i className="fas fa-warehouse"></i>
                            </div>
                            <div className="pos-armada-tooltip-tag">
                              <span className="pos-armada-tag-name">{pos.shortLabel}</span>
                              <span className="pos-armada-tag-count">{pos.truckCount} Truk Ready</span>
                            </div>
                          </div>
                        );
                      })}

                    {/* Interactive Real-Time Fleet Truck Markers */}
                    {(markerCategoryFilter === 'all' || markerCategoryFilter === 'trucks') &&
                      REALTIME_FLEET_TRUCKS.map((truck) => {
                        const isTruckSelected = activeMapMarker?.type === 'truck' && activeMapMarker.id === truck.id;
                        return (
                          <div
                            key={truck.id}
                            className={`fleet-truck-marker status-${truck.status} ${isTruckSelected ? 'active' : ''}`}
                            style={{ left: `${truck.x}%`, top: `${truck.y}%` }}
                            onClick={() => {
                              setActiveMapMarker({ type: 'truck', id: truck.id });
                              const hubIdx = MAP_HUBS.findIndex((h) => h.id === truck.hubId);
                              if (hubIdx !== -1) setSelectedMapHub(hubIdx);
                            }}
                            title={`Armada: ${truck.unitCode} (${truck.plate}) - ${truck.statusLabel}`}
                          >
                            <span className={`fleet-truck-pulse status-${truck.status}`}></span>
                            <div className="fleet-truck-icon-circle">
                              <i className="fas fa-truck-moving"></i>
                            </div>
                            <div className="fleet-truck-tag">
                              <span className="fleet-truck-unit">{truck.unitCode}</span>
                              <span className="fleet-truck-plate">{truck.plate}</span>
                              {truck.status === 'dispatched' && (
                                <span className="fleet-truck-speed">{truck.speed}</span>
                              )}
                            </div>
                          </div>
                        );
                      })}

                    {/* Interactive Marker Popover Card Overlay */}
                    {activeMapMarker && (
                      <div className="map-marker-popover fade-in">
                        {activeMapMarker.type === 'truck' && (() => {
                          const truck = REALTIME_FLEET_TRUCKS.find((t) => t.id === activeMapMarker.id) || REALTIME_FLEET_TRUCKS[0];
                          return (
                            <div className="map-popover-card">
                              <div className="map-popover-header">
                                <div className="map-popover-title-row">
                                  <span className={`map-popover-status-badge status-${truck.status}`}>
                                    <span className="status-ping"></span>
                                    {truck.statusLabel}
                                  </span>
                                  <button
                                    type="button"
                                    className="map-popover-close-btn"
                                    onClick={() => setActiveMapMarker(null)}
                                    aria-label="Tutup info armada"
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
                                </div>
                                <h4 className="map-popover-title">
                                  <i className="fas fa-truck"></i> {truck.unitCode} ({truck.plate})
                                </h4>
                                <p className="map-popover-subtitle">
                                  📍 Wilayah Operasi: <strong>Kecamatan {truck.kecamatan}</strong> ({truck.subdistrict})
                                </p>
                              </div>

                              <div className="map-popover-body">
                                <div className="map-popover-meta-grid">
                                  <div className="map-popover-meta-item">
                                    <label>Tipe Unit:</label>
                                    <span>{truck.truckType}</span>
                                  </div>
                                  <div className="map-popover-meta-item">
                                    <label>Kapasitas Tangki:</label>
                                    <span>{truck.capacity}</span>
                                  </div>
                                  <div className="map-popover-meta-item">
                                    <label>Panjang Selang:</label>
                                    <span>{truck.hoseLength}</span>
                                  </div>
                                  <div className="map-popover-meta-item">
                                    <label>Estimasi Tiba:</label>
                                    <span className="text-eta">
                                      <i className="fas fa-bolt"></i> {truck.eta} (~{truck.distanceKm} km)
                                    </span>
                                  </div>
                                </div>
                                <div className="map-popover-driver-row">
                                  <i className="fas fa-user-check"></i>
                                  <span>Petugas: <strong>{truck.driver}</strong> • Pangkalan: {truck.hubName}</span>
                                </div>
                              </div>

                              <div className="map-popover-footer">
                                <a
                                  href={`https://wa.me/6285715654183?text=${encodeURIComponent(
                                    `Halo Admin Mitra Bersih 24 Jam,\nSaya melihat di Peta Real-Time unit *${truck.unitCode} (${truck.plate})* sedang siaga di area *Kecamatan ${truck.kecamatan}*.\nMohon konfirmasi kedatangan armada ini ke alamat saya. Terima kasih!`
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="map-popover-cta-btn"
                                >
                                  <i className="fab fa-whatsapp"></i>
                                  <span>Panggil Unit Ini Sekarang</span>
                                </a>
                              </div>
                            </div>
                          );
                        })()}

                        {activeMapMarker.type === 'pos' && (() => {
                          const pos = POS_ARMADA_MARKERS.find((p) => p.id === activeMapMarker.id) || POS_ARMADA_MARKERS[0];
                          return (
                            <div className="map-popover-card">
                              <div className="map-popover-header">
                                <div className="map-popover-title-row">
                                  <span className="map-popover-status-badge pos-badge">
                                    <i className="fas fa-warehouse"></i> {pos.badge}
                                  </span>
                                  <button
                                    type="button"
                                    className="map-popover-close-btn"
                                    onClick={() => setActiveMapMarker(null)}
                                    aria-label="Tutup info pos"
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
                                </div>
                                <h4 className="map-popover-title">{pos.name}</h4>
                                <p className="map-popover-subtitle">
                                  📍 Wilayah Naungan: <strong>{pos.kecamatan}</strong>
                                </p>
                              </div>

                              <div className="map-popover-body">
                                <div className="map-popover-meta-grid">
                                  <div className="map-popover-meta-item">
                                    <label>Armada Standby:</label>
                                    <span className="text-highlight">
                                      <i className="fas fa-truck-moving"></i> {pos.truckCount} Truk Tangki Ready
                                    </span>
                                  </div>
                                  <div className="map-popover-meta-item">
                                    <label>Estimasi Respon:</label>
                                    <span className="text-eta">
                                      <i className="fas fa-clock"></i> {pos.estArrival}
                                    </span>
                                  </div>
                                </div>
                                <p className="map-popover-address">
                                  <i className="fas fa-map-marker-alt"></i> {pos.address}
                                </p>
                              </div>

                              <div className="map-popover-footer">
                                <a
                                  href={`https://wa.me/6285715654183?text=${encodeURIComponent(
                                    `Halo Admin Mitra Bersih 24 Jam,\nSaya ingin order sedot WC dari *${pos.name}* (${pos.shortLabel}).\nMohon info ketersediaan armada terdekat ke wilayah saya di Bogor. Terima kasih!`
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="map-popover-cta-btn"
                                >
                                  <i className="fab fa-whatsapp"></i>
                                  <span>Hubungi Pos Ini via WA</span>
                                </a>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}

                    {/* Interactive Legend Strip at bottom of visual canvas */}
                    <div className="lokasi-canvas-legend">
                      <div className="legend-item">
                        <span className="legend-dot status-standby"></span>
                        <span>Siaga (6 Truk)</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-dot status-dispatched"></span>
                        <span>Meluncur (3 Truk)</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-dot status-service"></span>
                        <span>Pengerjaan (2 Truk)</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-icon pos-icon">
                          <i className="fas fa-warehouse"></i>
                        </span>
                        <span>Pos Siaga ({POS_ARMADA_MARKERS.length} Titik)</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    key={`map-zoom-viewport-${selectedMapHub}-${mapZoomKey}`}
                    className={`lokasi-map-animator ${isMapZooming ? 'map-zooming' : ''}`}
                  >
                    <iframe
                      key={`map-iframe-${selectedMapHub}`}
                      title={`Peta Lokasi ${MAP_HUBS[selectedMapHub].name}`}
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(MAP_HUBS[selectedMapHub].mapQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    ></iframe>

                    {isMapZooming && (
                      <div className="lokasi-map-focus-overlay">
                        <div className="lokasi-map-focus-badge">
                          <span className="lokasi-map-radar-pulse"></span>
                          <i className="fas fa-crosshairs"></i>
                          <span>Fokus Pos: <strong>{MAP_HUBS[selectedMapHub].shortLabel}</strong></span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Floating Map Bottom Bar */}
              <div className="lokasi-map-footer">
                <div className="lokasi-map-coords">
                  <i className="fas fa-compass"></i>
                  <span>
                    Koordinat Pusat: {MAP_HUBS[selectedMapHub].coordinates.lat}, {MAP_HUBS[selectedMapHub].coordinates.lng} (Wilayah {MAP_HUBS[selectedMapHub].shortLabel})
                  </span>
                </div>
                <div className="lokasi-map-footer-links">
                  {mapViewMode === 'google' ? (
                    <button
                      type="button"
                      className="lokasi-switch-back-btn"
                      onClick={() => setMapViewMode('visual')}
                    >
                      <i className="fas fa-radar"></i> Kembali ke Radar Real-Time
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="lokasi-switch-back-btn"
                      onClick={() => setMapViewMode('google')}
                    >
                      <i className="fas fa-map-location-dot"></i> Buka Google Maps
                    </button>
                  )}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_HUBS[selectedMapHub].mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lokasi-open-gmaps-btn"
                    title="Buka rute navigasi di Google Maps eksternal"
                  >
                    <i className="fas fa-external-link-alt"></i> Navigasi Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Hub Details & Real-Time Action Card */}
            <div key={`hub-detail-card-${selectedMapHub}-${activeMapMarker?.id || 'hub'}`} className="lokasi-detail-card">
              {activeMapMarker?.type === 'truck' ? (() => {
                const truck = REALTIME_FLEET_TRUCKS.find((t) => t.id === activeMapMarker.id) || REALTIME_FLEET_TRUCKS[0];
                return (
                  <>
                    <div className="lokasi-card-header">
                      <span className="lokasi-card-tag">ARMADA AKTIF TERPILIH</span>
                      <h3 className="lokasi-card-title">{truck.unitCode} • {truck.plate}</h3>
                      <div className="lokasi-card-eta">
                        <i className="fas fa-bolt"></i>
                        <span>Estimasi Tiba: <strong>{truck.eta}</strong> (~{truck.distanceKm} km ke lokasi Anda)</span>
                      </div>
                    </div>

                    <div className="lokasi-card-body">
                      <div className="lokasi-info-item">
                        <div className="lokasi-info-icon">
                          <i className="fas fa-location-crosshairs"></i>
                        </div>
                        <div className="lokasi-info-text">
                          <label>Posisi Terkini Real-Time:</label>
                          <p>Kecamatan {truck.kecamatan} ({truck.subdistrict})</p>
                        </div>
                      </div>

                      <div className="lokasi-info-item">
                        <div className="lokasi-info-icon">
                          <i className="fas fa-signal"></i>
                        </div>
                        <div className="lokasi-info-text">
                          <label>Status Armada &amp; Kecepatan:</label>
                          <p><strong>{truck.statusLabel}</strong> • Kecepatan GPS: {truck.speed}</p>
                        </div>
                      </div>

                      <div className="lokasi-info-item">
                        <div className="lokasi-info-icon">
                          <i className="fas fa-truck-droplet"></i>
                        </div>
                        <div className="lokasi-info-text">
                          <label>Tipe Tangki &amp; Fasilitas:</label>
                          <p>{truck.truckType} ({truck.capacity}) + {truck.hoseLength}</p>
                        </div>
                      </div>

                      <div className="lokasi-info-item">
                        <div className="lokasi-info-icon">
                          <i className="fas fa-user-shield"></i>
                        </div>
                        <div className="lokasi-info-text">
                          <label>Kru Teknisi &amp; Pangkalan Pos:</label>
                          <p>{truck.driver} • {truck.hubName}</p>
                        </div>
                      </div>
                    </div>

                    <div className="lokasi-card-actions">
                      <a
                        href={`https://wa.me/6285715654183?text=${encodeURIComponent(
                          `Halo Admin Mitra Bersih 24 Jam,\nSaya ingin meminta kedatangan unit *${truck.unitCode} (${truck.plate})* yang sedang siaga di area *Kecamatan ${truck.kecamatan}* Bogor.\nMohon info kesiapan armada menuju alamat saya. Terima kasih!`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="lokasi-dispatch-btn"
                      >
                        <i className="fab fa-whatsapp"></i>
                        <span>Panggil {truck.unitCode} via WA</span>
                      </a>

                      <a
                        href="tel:+6285715654183"
                        className="lokasi-call-btn"
                        title="Telepon Panggilan Cepat"
                      >
                        <i className="fas fa-phone-alt"></i>
                        <span>Telepon Cepat: +62 857-1565-4183</span>
                      </a>
                    </div>
                  </>
                );
              })() : activeMapMarker?.type === 'pos' ? (() => {
                const pos = POS_ARMADA_MARKERS.find((p) => p.id === activeMapMarker.id) || POS_ARMADA_MARKERS[0];
                return (
                  <>
                    <div className="lokasi-card-header">
                      <span className="lokasi-card-tag pos-tag">POS SIAGA KECAMATAN AKTIF</span>
                      <h3 className="lokasi-card-title">{pos.name}</h3>
                      <div className="lokasi-card-eta">
                        <i className="fas fa-bolt"></i>
                        <span>Estimasi Respon: <strong>{pos.estArrival}</strong> ke lokasi Anda</span>
                      </div>
                    </div>

                    <div className="lokasi-card-body">
                      <div className="lokasi-info-item">
                        <div className="lokasi-info-icon">
                          <i className="fas fa-warehouse"></i>
                        </div>
                        <div className="lokasi-info-text">
                          <label>Status &amp; Kategori Pos:</label>
                          <p><strong>{pos.badge}</strong> • Pangkalan Simpul {MAP_HUBS.find((h) => h.id === pos.hubId)?.shortLabel || 'Bogor'}</p>
                        </div>
                      </div>

                      <div className="lokasi-info-item">
                        <div className="lokasi-info-icon">
                          <i className="fas fa-map-location-dot"></i>
                        </div>
                        <div className="lokasi-info-text">
                          <label>Alamat Titik Pangkalan Siaga:</label>
                          <p>{pos.address}</p>
                        </div>
                      </div>

                      <div className="lokasi-info-item">
                        <div className="lokasi-info-icon">
                          <i className="fas fa-layer-group"></i>
                        </div>
                        <div className="lokasi-info-text">
                          <label>Kecamatan Naungan Siaga:</label>
                          <p>Kecamatan <strong>{pos.kecamatan}</strong> &amp; sekitarnya</p>
                        </div>
                      </div>

                      <div className="lokasi-info-item">
                        <div className="lokasi-info-icon">
                          <i className="fas fa-truck-moving"></i>
                        </div>
                        <div className="lokasi-info-text">
                          <label>Kesiapan Armada Standby:</label>
                          <p><strong>{pos.truckCount} Truk Tangki Vakum</strong> Siaga Siap Berangkat 24 Jam</p>
                        </div>
                      </div>
                    </div>

                    <div className="lokasi-card-actions">
                      <a
                        href={`https://wa.me/6285715654183?text=${encodeURIComponent(
                          `Halo Mitra Bersih 24 Jam,\nSaya melihat titik pos siaga *${pos.name}* (Kecamatan ${pos.kecamatan}) di peta interaktif.\nMohon info ketersediaan armada terdekat ke alamat saya di Bogor. Terima kasih!`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="lokasi-dispatch-btn"
                      >
                        <i className="fab fa-whatsapp"></i>
                        <span>Panggil Armada Pos {pos.shortLabel} via WA</span>
                      </a>

                      <a
                        href="tel:+6285715654183"
                        className="lokasi-call-btn"
                        title="Telepon Panggilan Cepat"
                      >
                        <i className="fas fa-phone-alt"></i>
                        <span>Telepon Cepat: +62 857-1565-4183</span>
                      </a>
                    </div>
                  </>
                );
              })() : (
                <>
                  <div className="lokasi-card-header">
                    <span className="lokasi-card-tag">POS OPERASIONAL AKTIF</span>
                    <h3 className="lokasi-card-title">{MAP_HUBS[selectedMapHub].name}</h3>
                    <div className="lokasi-card-eta">
                      <i className="fas fa-bolt"></i>
                      <span>Estimasi Tiba: <strong>{MAP_HUBS[selectedMapHub].estTime}</strong></span>
                    </div>
                  </div>

                  <div className="lokasi-card-body">
                    <div className="lokasi-info-item">
                      <div className="lokasi-info-icon">
                        <i className="fas fa-map-pin"></i>
                      </div>
                      <div className="lokasi-info-text">
                        <label>Alamat / Pangkalan Siaga:</label>
                        <p>{MAP_HUBS[selectedMapHub].address}</p>
                      </div>
                    </div>

                    <div className="lokasi-info-item">
                      <div className="lokasi-info-icon">
                        <i className="fas fa-layer-group"></i>
                      </div>
                      <div className="lokasi-info-text">
                        <label>Cakupan Kecamatan &amp; Kelurahan:</label>
                        <p>{MAP_HUBS[selectedMapHub].coverage}</p>
                      </div>
                    </div>

                    <div className="lokasi-info-item">
                      <div className="lokasi-info-icon">
                        <i className="fas fa-truck"></i>
                      </div>
                      <div className="lokasi-info-text">
                        <label>Kesiapan Armada Standby:</label>
                        <p>{MAP_HUBS[selectedMapHub].trucks}</p>
                      </div>
                    </div>

                    <div className="lokasi-info-item">
                      <div className="lokasi-info-icon">
                        <i className="fas fa-clock"></i>
                      </div>
                      <div className="lokasi-info-text">
                        <label>Jam Operasional:</label>
                        <p><strong>Siaga 24 Jam Nonstop</strong> (Setiap Hari Termasuk Libur)</p>
                      </div>
                    </div>
                  </div>

                  <div className="lokasi-card-actions">
                    <a
                      href={`https://wa.me/6285715654183?text=${encodeURIComponent(
                        `Halo Mitra Bersih, saya butuh penanganan sedot WC / saluran mampet di area ${MAP_HUBS[selectedMapHub].shortLabel} Bogor. Mohon kirimkan armada terdekat ke alamat saya.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lokasi-dispatch-btn"
                    >
                      <i className="fab fa-whatsapp"></i>
                      <span>Panggil Armada Pos Ini via WA</span>
                    </a>

                    <a
                      href="tel:+6285715654183"
                      className="lokasi-call-btn"
                      title="Telepon Panggilan Cepat"
                    >
                      <i className="fas fa-phone-alt"></i>
                      <span>Telepon Cepat: +62 857-1565-4183</span>
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Trust strip for Location */}
          <div className="lokasi-trust-bar fade-in">
            <div className="lokasi-trust-item">
              <i className="fas fa-shield-alt"></i>
              <div>
                <strong>Tanpa Biaya Ekstra Transport</strong>
                <span>Tarif resmi flat transparan untuk radius area layanan Bogor</span>
              </div>
            </div>
            <div className="lokasi-trust-item">
              <i className="fas fa-road"></i>
              <div>
                <strong>Selang Fleksibel 50 – 100 Meter</strong>
                <span>Jangkau rumah di lorong sempit tanpa repot parkir dekat</span>
              </div>
            </div>
            <div className="lokasi-trust-item">
              <i className="fas fa-headset"></i>
              <div>
                <strong>Respon Kilat CS &amp; Sopir Armada</strong>
                <span>Komunikasi langsung via WhatsApp dengan info estimasi waktu nyata</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AREA LAYANAN DENGAN FITUR SEARCH BAR & FILTER JANGKAUAN */}
      <section className="area" id="kontak">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-badge">WILAYAH &amp; JANGKAUAN LAYANAN</span>
            <h2 className="section-title">Area Layanan Kami di Bogor</h2>
            <p className="section-subtitle">
              Cari kecamatan Anda di bawah untuk memastikan jangkauan armada siaga dan estimasi waktu tempuh tercepat 24 jam nonstop.
            </p>
          </div>

          {/* SEARCH BAR & JURISDICTION FILTER PILLS */}
          <div className="area-search-container fade-in">
            <div className="area-search-input-wrapper">
              <i className="fas fa-search area-search-icon"></i>
              <input
                type="text"
                className="area-search-input"
                placeholder="Cari kecamatan Anda di Bogor... (contoh: Cibinong, Dramaga, Ciawi, Bogor Barat, Sentul)"
                value={areaSearchTerm}
                onChange={(e) => setAreaSearchTerm(e.target.value)}
                aria-label="Cari kecamatan di Bogor"
              />
              {areaSearchTerm && (
                <button
                  type="button"
                  className="area-search-clear-btn"
                  onClick={() => setAreaSearchTerm('')}
                  title="Hapus pencarian"
                  aria-label="Hapus pencarian"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>

            {/* FILTER PILLS & POPULAR SHORTCUTS */}
            <div className="area-filters-row">
              <div className="area-type-pills">
                <button
                  type="button"
                  className={`area-pill ${areaTypeFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setAreaTypeFilter('all')}
                >
                  <i className="fas fa-layer-group"></i> Semua Wilayah ({BOGOR_AREA_DETAILS.length})
                </button>
                <button
                  type="button"
                  className={`area-pill ${areaTypeFilter === 'Kota Bogor' ? 'active' : ''}`}
                  onClick={() => setAreaTypeFilter('Kota Bogor')}
                >
                  <i className="fas fa-city"></i> Kota Bogor (6)
                </button>
                <button
                  type="button"
                  className={`area-pill ${areaTypeFilter === 'Kabupaten Bogor' ? 'active' : ''}`}
                  onClick={() => setAreaTypeFilter('Kabupaten Bogor')}
                >
                  <i className="fas fa-tree"></i> Kabupaten Bogor (40)
                </button>
              </div>

              {/* POPULAR DISTRICT SHORTCUT CHIPS */}
              <div className="area-popular-chips">
                <span className="area-chips-label">
                  <i className="fas fa-bolt"></i> Populer:
                </span>
                {[
                  { label: 'Cibinong', query: 'Cibinong' },
                  { label: 'Dramaga', query: 'Dramaga' },
                  { label: 'Ciawi', query: 'Ciawi' },
                  { label: 'Parung', query: 'Parung' },
                  { label: 'Tanah Sareal', query: 'Tanah Sareal' },
                  { label: 'Sentul', query: 'Babakan Madang' },
                  { label: 'Bogor Tengah', query: 'Bogor Tengah' }
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className="area-chip-btn"
                    onClick={() => {
                      setAreaSearchTerm(item.query);
                      setAreaTypeFilter('all');
                      const found = BOGOR_AREA_DETAILS.find((a) => a.name.toLowerCase() === item.query.toLowerCase());
                      if (found) setSelectedAreaItem(found);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* SEARCH META & COUNTER */}
            <div className="area-search-meta">
              <div className="area-meta-count">
                <i className="fas fa-map-marker-alt"></i>
                <span>
                  Menampilkan <strong>{filteredBogorAreas.length}</strong> dari <strong>{BOGOR_AREA_DETAILS.length}</strong> kecamatan di Bogor
                  {areaSearchTerm.trim() && (
                    <span className="area-search-keyword">
                      {' '}untuk pencarian "<strong>{areaSearchTerm}</strong>"
                    </span>
                  )}
                </span>
              </div>
              {(areaSearchTerm || areaTypeFilter !== 'all') && (
                <button
                  type="button"
                  className="area-reset-btn"
                  onClick={() => {
                    setAreaSearchTerm('');
                    setAreaTypeFilter('all');
                    setSelectedAreaItem(null);
                  }}
                >
                  <i className="fas fa-redo-alt"></i> Reset Pencarian
                </button>
              )}
            </div>
          </div>

          <div className="area-content">
            <div className="area-illustration fade-in">
              <i className="fas fa-map-marked-alt icon-big"></i>
              <h3>Kota &amp; Kabupaten Bogor</h3>
              <p>Cakupan area layanan kami meliputi seluruh 46 kecamatan di Bogor dengan waktu tempuh tercepat.</p>

              {/* CARD PREVIEW APABILA KECAMATAN DIKLIK */}
              {selectedAreaItem ? (
                <div className="area-selected-card">
                  <div className="area-selected-badge">
                    <i className="fas fa-check-circle"></i> TERCOVER PRIORITAS
                  </div>
                  <h4 className="area-selected-title">Kecamatan {selectedAreaItem.name}</h4>
                  <p className="area-selected-subtitle">{selectedAreaItem.type} • Siaga 24 Jam</p>

                  <div className="area-selected-specs">
                    <div className="area-spec-box">
                      <span className="area-spec-label">Pos Siaga:</span>
                      <span className="area-spec-val">
                        <i className="fas fa-warehouse"></i> {selectedAreaItem.hub}
                      </span>
                    </div>
                    <div className="area-spec-box">
                      <span className="area-spec-label">Estimasi Tiba:</span>
                      <span className="area-spec-val">
                        <i className="fas fa-stopwatch"></i> {selectedAreaItem.estTime}
                      </span>
                    </div>
                  </div>

                  <a
                    href={getAreaWaUrl(selectedAreaItem.name, selectedAreaItem.type, selectedAreaItem.hub)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="area-selected-wa-btn"
                    title={`Pesan Layanan untuk ${selectedAreaItem.name} via WhatsApp`}
                  >
                    <i className="fab fa-whatsapp"></i> Chat CS untuk {selectedAreaItem.name}
                  </a>
                </div>
              ) : (
                <div className="area-illustration-stats">
                  <div className="area-stat-item">
                    <strong>46</strong>
                    <span>Kecamatan Tercover Penuh</span>
                  </div>
                  <div className="area-stat-item">
                    <strong>5 Pos</strong>
                    <span>Armada Truk Tangki Siaga</span>
                  </div>
                  <div className="area-stat-item">
                    <strong>15–30 Mnt</strong>
                    <span>Rata-Rata Waktu Tempuh</span>
                  </div>
                  <p className="area-stat-hint">
                    <i className="fas fa-info-circle"></i> Klik salah satu kecamatan di samping untuk cek pos &amp; hubungi CS langsung!
                  </p>
                </div>
              )}
            </div>

            <div className="area-list fade-in fade-in-delay-1">
              {filteredBogorAreas.length > 0 ? (
                <>
                  {filteredBogorAreas.map((area, idx) => {
                    const isSelected = selectedAreaItem?.name === area.name;
                    return (
                      <div
                        key={idx}
                        className={`area-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedAreaItem(isSelected ? null : area)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedAreaItem(isSelected ? null : area);
                          }
                        }}
                        title={`Klik untuk info armada di ${area.name}`}
                      >
                        <div className="area-item-info">
                          <div className="area-item-icon">
                            <i className={isSelected ? 'fas fa-check' : 'fas fa-map-marker-alt'}></i>
                          </div>
                          <span className="area-item-name">
                            {highlightAreaMatch(area.name, areaSearchTerm)}
                          </span>
                        </div>
                        <div className="area-item-badges">
                          <span className={`area-tag-type ${area.type === 'Kota Bogor' ? 'kota' : ''}`}>
                            {area.type === 'Kota Bogor' ? 'Kota' : 'Kab'}
                          </span>
                          <span className="area-tag-hub">
                            {area.hubBadge}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  <div className="area-more">
                    <i className="fas fa-location-arrow"></i> Dan seluruh perumahan, gang sempit, desa &amp; perbatasan sekitarnya
                  </div>
                </>
              ) : (
                <div className="area-empty-state">
                  <div className="area-empty-icon">
                    <i className="fas fa-search-location"></i>
                  </div>
                  <h4 className="area-empty-title">
                    Kecamatan "{areaSearchTerm}" Tidak Ditemukan
                  </h4>
                  <p className="area-empty-desc">
                    Wilayah atau komplek Anda belum tercantum di daftar 46 kecamatan Bogor? Jangan khawatir, armada Mitra Bersih tetap melayani seluruh penjuru Bogor dan perbatasan.
                  </p>
                  <div className="area-empty-actions">
                    <a
                      href={`https://wa.me/6285715654183?text=${encodeURIComponent(
                        `Halo CS Mitra Bersih,\nSaya mencari layanan sedot WC / saluran mampet untuk wilayah: *"${areaSearchTerm}"* di Bogor.\nApakah armada bisa menjangkau lokasi saya? Terima kasih!`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="area-empty-wa-btn"
                    >
                      <i className="fab fa-whatsapp"></i> Tanya Jangkauan via WhatsApp
                    </a>
                    <button
                      type="button"
                      className="area-empty-reset-btn"
                      onClick={() => {
                        setAreaSearchTerm('');
                        setAreaTypeFilter('all');
                      }}
                    >
                      <i className="fas fa-redo-alt"></i> Tampilkan Semua
                    </button>
                  </div>
                </div>
              )}
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
                  <a href="#arsip-artikel" onClick={(e) => scrollToSection(e, 'arsip-artikel')}>
                    <i className="fas fa-chevron-right"></i> Arsip Artikel
                  </a>
                </li>
                <li>
                  <a href="#ulasan" onClick={(e) => scrollToSection(e, 'ulasan')}>
                    <i className="fas fa-chevron-right"></i> Ulasan Pelanggan
                  </a>
                </li>
                <li>
                  <a href="#lokasi" onClick={(e) => scrollToSection(e, 'lokasi')}>
                    <i className="fas fa-chevron-right"></i> Lokasi &amp; Pos Siaga
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

      {/* FLOATING FAQ ACTION BUTTON (BOTTOM-RIGHT CORNER) */}
      <button
        type="button"
        id="faq-fab"
        className="faq-fab"
        onClick={handleOpenFaqModal}
        aria-label="Buka Pusat Bantuan & FAQ Modal"
        title="Buka Pusat Bantuan & Tanya Jawab FAQ (24 Jam)"
      >
        <span className="faq-fab-pulse-ring"></span>
        <div className="faq-fab-icon-wrap">
          <i className="fas fa-question"></i>
        </div>
        <div className="faq-fab-text">
          <span className="faq-fab-badge">24 JAM</span>
          <span className="faq-fab-title">Bantuan FAQ</span>
        </div>
      </button>

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
                referrerPolicy="no-referrer"
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

      {/* FAQ WHATSAPP PREPARATION & VALIDATION MODAL */}
      {faqModalItem && (
        <div
          className="faq-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setFaqModalItem(null);
          }}
        >
          <div className="faq-modal-card fade-in">
            <div className="faq-modal-header">
              <div className="faq-modal-header-info">
                <span className="faq-modal-tag">KONSULTASI WHATSAPP ADMIN</span>
                <h3>Tanya Langsung Terkait FAQ</h3>
              </div>
              <button
                type="button"
                className="faq-modal-close"
                onClick={() => setFaqModalItem(null)}
                aria-label="Tutup Modal"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="faq-modal-topic-banner">
              <i className="fas fa-question-circle"></i>
              <div>
                <strong>Pertanyaan FAQ Terpilih:</strong>
                <p>&ldquo;{faqModalItem.question}&rdquo;</p>
              </div>
            </div>

            <form onSubmit={handleFaqModalSubmit} className="faq-modal-form">
              <div className="faq-modal-grid">
                <div className="form-group">
                  <label htmlFor="faq-cust-name">
                    Nama Lengkap Anda <span className="required">*</span>
                  </label>
                  <input
                    id="faq-cust-name"
                    type="text"
                    className={`form-input ${faqModalError && (!faqModalName.trim() || faqModalName.trim().length < 2) ? 'input-error' : ''}`}
                    placeholder="Contoh: Pak Anton / Ibu Lina"
                    value={faqModalName}
                    onChange={(e) => {
                      setFaqModalName(e.target.value);
                      if (faqModalError) setFaqModalError(null);
                    }}
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="faq-cust-loc">
                    Wilayah / Kecamatan di Bogor <span className="required">*</span>
                  </label>
                  <select
                    id="faq-cust-loc"
                    className={`form-select ${faqModalError && !faqModalLocation.trim() ? 'input-error' : ''}`}
                    value={faqModalLocation}
                    onChange={(e) => {
                      setFaqModalLocation(e.target.value);
                      if (faqModalError) setFaqModalError(null);
                    }}
                  >
                    <option value="">-- Pilih Kecamatan di Bogor --</option>
                    {BOGOR_AREAS.map((area, idx) => (
                      <option key={idx} value={area}>
                        {area}
                      </option>
                    ))}
                    <option value="Kota Bogor Lainnya">Kota Bogor Lainnya</option>
                    <option value="Kabupaten Bogor Lainnya">Kabupaten Bogor Lainnya</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label htmlFor="faq-cust-notes">
                  Catatan / Keluhan Tambahan (Opsional)
                </label>
                <textarea
                  id="faq-cust-notes"
                  className="form-textarea"
                  style={{ minHeight: '80px' }}
                  placeholder="Ceritakan kendala spesifik, posisi gang sempit, atau perkiraan waktu kunjungan..."
                  value={faqModalNotes}
                  onChange={(e) => setFaqModalNotes(e.target.value)}
                ></textarea>
              </div>

              {faqModalError && (
                <div className="wa-validation-alert" style={{ marginBottom: '16px' }} role="alert">
                  <i className="fas fa-exclamation-triangle"></i>
                  <span>{faqModalError}</span>
                </div>
              )}

              <div className="faq-modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setFaqModalItem(null)}
                >
                  Batal
                </button>
                <button type="submit" className="faq-modal-submit-btn">
                  <i className="fab fa-whatsapp"></i>
                  <span>Kirim Pesan ke Admin WhatsApp</span>
                </button>
              </div>

              <div style={{ textAlign: 'center', marginTop: '14px', paddingTop: '10px', borderTop: '1px dashed #E2E8F0' }}>
                <a
                  href={`https://wa.me/6285715654183?text=${encodeURIComponent(
                    `Halo Admin CS Mitra Bersih,\n\nSaya membaca pertanyaan FAQ:\n❓ *Pertanyaan:* "${faqModalItem.question}"\n📂 *Kategori:* ${faqModalItem.category}\n\nSaya ingin berkonsultasi mengenai penanganan kendala ini untuk lokasi saya di Bogor. Terima kasih!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setFaqModalItem(null)}
                  style={{
                    fontSize: '12.5px',
                    color: '#15803D',
                    textDecoration: 'underline',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <i className="fab fa-whatsapp"></i>
                  Langsung chat via WhatsApp tanpa mengisi formulir &rarr;
                </a>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FAQ SHARE MODAL */}
      {shareFaqItem && (
        <div
          className="faq-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShareFaqItem(null);
          }}
        >
          <div className="faq-modal-card faq-share-modal-card fade-in">
            <div className="faq-modal-header">
              <div className="faq-modal-header-info">
                <span className="faq-modal-tag faq-share-modal-tag">
                  <i className="fas fa-share-nodes"></i> BAGIKAN TIPS &amp; SOLUSI
                </span>
                <h3>Bagikan Jawaban FAQ</h3>
              </div>
              <button
                type="button"
                className="faq-modal-close"
                onClick={() => setShareFaqItem(null)}
                aria-label="Tutup Modal Bagikan"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="faq-share-preview-box">
              <div className="faq-share-preview-meta">
                <span className="faq-share-badge">#{shareFaqItem.id}</span>
                <span className="faq-share-category-tag">{shareFaqItem.category}</span>
                <span className="faq-share-source-tag">Mitra Bersih Bogor 24 Jam</span>
              </div>
              <h4 className="faq-share-preview-q">{shareFaqItem.question}</h4>
              <p className="faq-share-preview-a">
                &ldquo;{shareFaqItem.answerText.length > 175 ? shareFaqItem.answerText.substring(0, 175) + '...' : shareFaqItem.answerText}&rdquo;
              </p>
            </div>

            <div className="faq-share-section-heading">
              <span>PILIH MEDIA SOSIAL / PESAN INSTAN</span>
            </div>

            <div className="faq-share-channels-grid">
              <a
                href={getFaqShareWaUrl(shareFaqItem)}
                target="_blank"
                rel="noopener noreferrer"
                className="faq-share-channel-btn faq-channel-wa"
                title="Kirim ke WhatsApp"
              >
                <div className="faq-channel-icon-wrap">
                  <i className="fab fa-whatsapp"></i>
                </div>
                <div className="faq-channel-text">
                  <strong>WhatsApp</strong>
                  <span>Kirim ke kontak pribadi atau grup chat</span>
                </div>
                <i className="fas fa-arrow-up-right-from-square faq-channel-arrow"></i>
              </a>

              <a
                href={getFaqShareTelegramUrl(shareFaqItem)}
                target="_blank"
                rel="noopener noreferrer"
                className="faq-share-channel-btn faq-channel-telegram"
                title="Kirim ke Telegram"
              >
                <div className="faq-channel-icon-wrap">
                  <i className="fab fa-telegram"></i>
                </div>
                <div className="faq-channel-text">
                  <strong>Telegram</strong>
                  <span>Bagikan di grup atau channel Telegram</span>
                </div>
                <i className="fas fa-arrow-up-right-from-square faq-channel-arrow"></i>
              </a>

              <a
                href={getFaqShareFacebookUrl(shareFaqItem)}
                target="_blank"
                rel="noopener noreferrer"
                className="faq-share-channel-btn faq-channel-fb"
                title="Bagikan ke Facebook"
              >
                <div className="faq-channel-icon-wrap">
                  <i className="fab fa-facebook-f"></i>
                </div>
                <div className="faq-channel-text">
                  <strong>Facebook</strong>
                  <span>Posting ke linimasa atau grup Facebook</span>
                </div>
                <i className="fas fa-arrow-up-right-from-square faq-channel-arrow"></i>
              </a>

              <a
                href={getFaqShareTwitterUrl(shareFaqItem)}
                target="_blank"
                rel="noopener noreferrer"
                className="faq-share-channel-btn faq-channel-x"
                title="Bagikan ke X (Twitter)"
              >
                <div className="faq-channel-icon-wrap">
                  <i className="fab fa-x-twitter"></i>
                </div>
                <div className="faq-channel-text">
                  <strong>X / Twitter</strong>
                  <span>Bagikan ringkasan tips di feed X</span>
                </div>
                <i className="fas fa-arrow-up-right-from-square faq-channel-arrow"></i>
              </a>
            </div>

            <div className="faq-share-section-heading">
              <span>SALIN KONTEN ATAU TAUTAN</span>
            </div>

            <div className="faq-share-copy-actions">
              {/* Tombol Salin Teks Lengkap */}
              <button
                type="button"
                onClick={() => handleCopyFaqFullText(shareFaqItem)}
                className={`faq-share-copy-full-btn ${shareCopiedText ? 'copied' : ''}`}
              >
                <i className={`fas ${shareCopiedText ? 'fa-check-circle' : 'fa-copy'}`}></i>
                <span>
                  {shareCopiedText ? 'Teks Jawaban Lengkap Berhasil Disalin!' : 'Salin Teks Jawaban Lengkap (Format Pesan)'}
                </span>
              </button>

              {/* Input & Tombol Salin Tautan Langsung */}
              <div className="faq-share-link-row">
                <input
                  type="text"
                  readOnly
                  value={getFaqDirectUrl(shareFaqItem)}
                  className="faq-share-link-input"
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                  aria-label="Tautan FAQ Langsung"
                />
                <button
                  type="button"
                  onClick={() => handleCopyFaqLink(shareFaqItem)}
                  className={`faq-share-link-copy-btn ${shareCopiedLink ? 'copied' : ''}`}
                >
                  <i className={`fas ${shareCopiedLink ? 'fa-check' : 'fa-link'}`}></i>
                  <span>{shareCopiedLink ? 'Tersalin!' : 'Salin Link'}</span>
                </button>
              </div>

              {/* Tombol Native Share jika didukung browser */}
              {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
                <button
                  type="button"
                  onClick={() => handleNativeDeviceShare(shareFaqItem)}
                  className="faq-share-native-btn"
                >
                  <i className="fas fa-arrow-up-from-bracket"></i>
                  <span>Bagikan via Menu Aplikasi Perangkat (HP / Laptop)</span>
                </button>
              )}
            </div>

            <div className="faq-share-footer-note">
              <i className="fas fa-shield-heart"></i>
              <span>
                Tips dan panduan sanitasi ini diverifikasi oleh tim teknisi resmi <strong>Mitra Bersih 24 Jam Bogor</strong>.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING SHARE TOAST NOTIFICATION */}
      {shareToast && (
        <div className="faq-floating-toast fade-in" role="alert">
          <div className="faq-toast-content">
            <i className="fas fa-check-circle faq-toast-icon"></i>
            <span>{shareToast}</span>
          </div>
          <button
            type="button"
            className="faq-toast-close"
            onClick={() => setShareToast(null)}
            aria-label="Tutup notifikasi"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}

      {/* FAQ SECTION MODAL OVERLAY */}
      {isFaqModalOpen && (
        <div
          id="faq-modal-overlay"
          className={`faq-section-modal-overlay ${isFaqModalClosing ? 'closing is-closing fade-out' : 'opening is-opening fade-in'}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="faq-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseFaqModal();
          }}
        >
          <div className={`faq-section-modal-card ${isFaqModalClosing ? 'closing is-closing scale-out' : 'opening is-opening scale-in'}`}>
            {/* Modal Header */}
            <div className="faq-section-modal-header">
              <div className="faq-section-modal-title-group">
                <span className="faq-modal-section-badge">
                  <i className="fas fa-circle-question"></i> PUSAT BANTUAN CEPAT 24 JAM
                </span>
                <h3 id="faq-modal-title" className="faq-section-modal-title">
                  Tanya Jawab &amp; Solusi Layanan (FAQ)
                </h3>
                <p className="faq-section-modal-subtitle">
                  Akses instan informasi tarif sedot WC, kesiapan armada di Bogor, garansi resmi, dan penanganan tanpa bongkar dari halaman mana pun.
                </p>
              </div>
              <button
                type="button"
                className="faq-modal-close"
                onClick={handleCloseFaqModal}
                aria-label="Tutup Modal Bantuan FAQ"
                title="Tutup (Esc)"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Modal Search Bar & Filter Pills */}
            <div className="faq-modal-search-wrapper">
              <div className={`faq-modal-search-box ${isModalFaqTyping ? 'is-typing search-active' : ''}`}>
                <i className="fas fa-search faq-modal-search-icon"></i>
                <input
                  type="text"
                  id="faq-modal-search-input"
                  className={`faq-modal-search-input ${
                    isModalFaqTyping ? 'search-active is-typing soft-yellow-glow typing-pulse' : ''
                  }`}
                  placeholder="Cari pertanyaan... (contoh: tarif, garansi, gang sempit, 24 jam)"
                  value={modalFaqSearch}
                  onChange={(e) => handleModalFaqSearchChange(e.target.value)}
                  aria-label="Cari pertanyaan FAQ di modal"
                  aria-busy={isModalFaqTyping}
                  autoFocus
                />
                {modalFaqSearch && (
                  <button
                    type="button"
                    className="faq-search-clear"
                    onClick={handleModalFaqSearchClear}
                    title="Hapus kata kunci pencarian modal"
                    aria-label="Hapus kata kunci pencarian modal"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>

              <div className="faq-modal-filter-bar">
                <div className="faq-modal-filter-pills">
                  {FAQ_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`faq-modal-filter-pill ${modalFaqCategory === cat ? 'active' : ''}`}
                      onClick={() => {
                        setModalFaqCategory(cat);
                        if (modalFaqSearch.trim()) {
                          markModalSearchFilterRunning();
                        }
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="faq-modal-count-badge">
                  {isModalSearchActive && modalFaqSearch.trim() ? (
                    <span className="faq-count-searching">
                      <i className="fas fa-spinner fa-spin" style={{ marginRight: '6px', color: '#D97706' }}></i>
                      Menyaring...
                    </span>
                  ) : (
                    <span>
                      Ditemukan <strong>{modalFilteredFaqs.length}</strong> pertanyaan
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Accordion Questions List */}
            <div className="faq-modal-body">
              {isModalSearchActive && modalFaqSearch.trim() ? (
                <div
                  key="faq-modal-skeleton"
                  className="faq-loading-skeleton-container faq-modal-skeleton-container faq-scale-in"
                  role="status"
                  aria-live="polite"
                  aria-label="Menyaring pertanyaan FAQ modal dengan AI"
                >
                  <div className="faq-filtering-progress-box">
                    <div className="faq-filtering-progress-track">
                      <div className="faq-filtering-progress-bar"></div>
                    </div>
                    <div className="faq-filtering-status-info">
                      <div className="faq-filtering-status-left">
                        <span className="faq-ai-filter-sparkle">
                          <i className="fas fa-wand-magic-sparkles"></i>
                        </span>
                        <span className="faq-ai-filter-text">
                          <strong>AI Smart Filter:</strong> Menyaring pertanyaan untuk &ldquo;{modalFaqSearch}&rdquo;...
                        </span>
                      </div>
                      <span className="faq-filtering-loading-tag">
                        <i className="fas fa-circle-notch fa-spin"></i> Menyaring Jawaban
                      </span>
                    </div>
                  </div>

                  <div className="faq-modal-list faq-skeleton-list">
                    {[1, 2, 3].map((idx) => (
                      <div
                        key={`faq-modal-skeleton-${idx}`}
                        className={`faq-skeleton-card faq-modal-skeleton-card ${idx === 1 ? 'is-expanded-preview' : ''}`}
                        style={{ animationDelay: `${(idx - 1) * 0.08}s` }}
                      >
                        <div className="faq-skeleton-bar">
                          <div className="faq-skeleton-badge skeleton-shimmer"></div>
                          <div className="faq-skeleton-content">
                            <div
                              className="faq-skeleton-line skeleton-title skeleton-shimmer"
                              style={{ width: idx === 1 ? '74%' : idx === 2 ? '58%' : '82%' }}
                            ></div>
                            <div className="faq-skeleton-meta-row">
                              <div
                                className="faq-skeleton-tag skeleton-shimmer"
                                style={{ width: idx === 1 ? '80px' : idx === 2 ? '65px' : '90px' }}
                              ></div>
                              <div
                                className="faq-skeleton-line skeleton-subtitle skeleton-shimmer"
                                style={{ width: idx === 1 ? '34%' : idx === 2 ? '26%' : '38%' }}
                              ></div>
                            </div>
                          </div>
                          <div className="faq-skeleton-action skeleton-shimmer"></div>
                        </div>

                        {idx === 1 && (
                          <div className="faq-skeleton-answer">
                            <div className="faq-skeleton-line skeleton-body skeleton-shimmer" style={{ width: '92%' }}></div>
                            <div className="faq-skeleton-line skeleton-body skeleton-shimmer" style={{ width: '80%' }}></div>
                            <div className="faq-skeleton-btn-row">
                              <div className="faq-skeleton-btn skeleton-shimmer" style={{ width: '160px' }}></div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : modalFilteredFaqs.length === 0 ? (
                <div className="faq-empty-state" style={{ padding: '36px 16px', background: '#F8FAFC', borderRadius: '16px' }}>
                  <i className="fas fa-search" style={{ fontSize: '32px', color: '#94A3B8', marginBottom: '10px' }}></i>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 6px' }}>Tidak Ada Pertanyaan Ditemukan</h4>
                  <p style={{ fontSize: '13.5px', color: '#64748B', margin: '0 0 16px' }}>
                    Tidak ada tanya jawab yang cocok dengan kata kunci &ldquo;{modalFaqSearch}&rdquo;.
                  </p>
                  <button
                    type="button"
                    className="faq-empty-reset-btn"
                    onClick={() => {
                      setModalFaqSearch('');
                      setModalFaqCategory('Topik Populer');
                    }}
                  >
                    <i className="fas fa-redo-alt" style={{ marginRight: '6px' }}></i>
                    Tampilkan Semua Pertanyaan
                  </button>
                </div>
              ) : (
                <div className="faq-modal-list">
                  {modalFilteredFaqs.map((item) => {
                    const isOpen = openModalFaq === item.id;
                    const directWaUrl = `https://wa.me/6285715654183?text=${encodeURIComponent(
                      `Halo Admin CS Mitra Bersih,\n\nSaya membaca FAQ website:\n❓ *Pertanyaan:* "${item.question}"\n📂 *Kategori:* ${item.category}\n\nMohon info estimasi tarif dan ketersediaan armada di lokasi saya di Bogor. Terima kasih!`
                    )}`;

                    return (
                      <div
                        key={item.id}
                        className={`faq-item faq-modal-item ${isOpen ? 'active' : ''}`}
                      >
                        <div className="faq-question-bar">
                          <button
                            type="button"
                            className="faq-question"
                            onClick={() => setOpenModalFaq(isOpen ? null : item.id)}
                            aria-expanded={isOpen}
                            aria-controls={`faq-modal-ans-${item.id}`}
                          >
                            <div className="faq-question-text">
                              <span className="faq-q-badge">{item.id}</span>
                              <span style={{ fontWeight: 700, color: '#0F172A' }}>
                                {highlightMatch(item.question, modalFaqSearch)}
                              </span>
                            </div>
                          </button>
                          <div className="faq-question-actions">
                            <button
                              type="button"
                              className="faq-share-trigger-btn"
                              onClick={() => {
                                handleCloseFaqModal();
                                openFaqShare(item);
                              }}
                              title="Bagikan jawaban pertanyaan ini"
                              aria-label={`Bagikan jawaban untuk: ${item.question}`}
                            >
                              <i className="fas fa-share-alt"></i>
                              <span className="faq-share-trigger-label">Bagikan</span>
                            </button>
                            <button
                              type="button"
                              className="faq-toggle-btn"
                              onClick={() => setOpenModalFaq(isOpen ? null : item.id)}
                              aria-expanded={isOpen}
                              aria-label={isOpen ? `Tutup jawaban FAQ nomor ${item.id}` : `Buka jawaban FAQ nomor ${item.id}`}
                            >
                              <div className="faq-toggle-icon">
                                <i className={`fas ${isOpen ? 'fa-minus' : 'fa-plus'}`}></i>
                              </div>
                            </button>
                          </div>
                        </div>

                        <div
                          id={`faq-modal-ans-${item.id}`}
                          className={`faq-answer-collapse ${isOpen ? 'open' : ''}`}
                        >
                          <div className="faq-answer">
                            <div className="faq-answer-cat-tag">
                              <i className="fas fa-folder-open"></i> Kategori: <strong>{item.category}</strong>
                            </div>
                            <div className="faq-answer-content">
                              {item.answer}
                            </div>
                            <div className="faq-actions-bar">
                              <button
                                type="button"
                                className="faq-action-chat-btn"
                                onClick={() => {
                                  handleCloseFaqModal();
                                  openFaqChatModal(item);
                                }}
                                title="Konsultasikan pertanyaan ini via WhatsApp"
                              >
                                <i className="fab fa-whatsapp"></i>
                                <span>Tanya Admin via Form WA</span>
                              </button>
                              <a
                                href={directWaUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="faq-action-direct-wa"
                                title="Chat langsung tanpa isi formulir"
                              >
                                <i className="fab fa-whatsapp"></i>
                                <span>Chat Langsung</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer Quick Actions */}
            <div className="faq-section-modal-footer">
              <div className="faq-modal-footer-info">
                <div className="faq-footer-icon">
                  <i className="fas fa-headset"></i>
                </div>
                <div>
                  <strong>Belum menemukan jawaban yang dicari?</strong>
                  <span>Konsultasi gratis 24 jam dengan tim teknis armada kami di Bogor.</span>
                </div>
              </div>
              <div className="faq-modal-footer-btns">
                <button
                  type="button"
                  className="faq-modal-scroll-btn"
                  onClick={handleViewOnPageFaq}
                  title="Lihat bagian FAQ lengkap di halaman"
                >
                  <i className="fas fa-external-link-alt"></i>
                  <span>Buka di Halaman</span>
                </button>
                <a
                  href="https://wa.me/6285715654183?text=Halo%20Mitra%20Bersih,%20saya%20ingin%20tanya%20layanan%20sedot%20WC%20Bogor%20melalui%20Pusat%20Bantuan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="faq-modal-wa-btn"
                >
                  <i className="fab fa-whatsapp"></i>
                  <span>Chat CS 24 Jam</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
