import React, { useState, useMemo, useEffect } from 'react';
import {
  MapHub,
  MAP_HUBS,
  BOGOR_AREA_DETAILS,
  BogorAreaDetail,
  REALTIME_FLEET_TRUCKS
} from '../App';

export interface BookingSubmission {
  id: string;
  bookingCode: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  notes: string;
  serviceType: string;
  servicePrice: string;
  selectedDate: string; // ISO YYYY-MM-DD
  selectedDateLabel: string;
  timeSlotId: string;
  timeSlotLabel: string;
  areaName: string;
  areaType: string;
  hubId: string;
  hubName: string;
  assignedTruck: string;
  driverName: string;
  eta: string;
  status: 'confirmed' | 'dispatched' | 'pending';
  createdAt: string;
}

export interface ServiceOption {
  id: string;
  name: string;
  description: string;
  estimatedPrice: string;
  duration: string;
  icon: string;
}

export const BOOKING_SERVICES: ServiceOption[] = [
  {
    id: 'sedot-wc-rumah',
    name: 'Sedot WC & Kuras Septic Tank Rumah Tangga',
    description: 'Penyedotan tuntas sampai dasar tangki, pembersihan endapan lumpur, garansi 30 hari.',
    estimatedPrice: 'Mulai Rp 350.000 / Tangki',
    duration: '45 – 60 Menit',
    icon: 'fa-toilet'
  },
  {
    id: 'saluran-mampet',
    name: 'Pelancaran Pipa / Saluran Kloset Mampet',
    description: 'Metode spiral baja fleksibel & water pressure modern tanpa bongkar keramik lantai.',
    estimatedPrice: 'Mulai Rp 250.000 / Titik',
    duration: '30 – 45 Menit',
    icon: 'fa-water'
  },
  {
    id: 'sedot-komersial',
    name: 'Sedot Septic Tank & STP Komersial (Ruko/Kantor)',
    description: 'Layanan terencana untuk gedung usaha, ruko bisnis, sekolah, klinik, dan perkantoran.',
    estimatedPrice: 'Mulai Rp 600.000 / Tangki',
    duration: '60 – 90 Menit',
    icon: 'fa-building'
  },
  {
    id: 'grease-trap',
    name: 'Pembersihan & Kuras Grease Trap (Resto/Hotel)',
    description: 'Pengambilan lemak beku pada perangkap pipa dapur resto & food court standar sanitasi.',
    estimatedPrice: 'Mulai Rp 450.000 / Bak',
    duration: '45 – 75 Menit',
    icon: 'fa-utensils'
  },
  {
    id: 'limbah-industri',
    name: 'Sedot Limbah Cair & IPAL Pabrik (Manifes IPLT)',
    description: 'Pengangkutan air limbah industri non-B3 resmi KBLI 37001 dengan faktur pajak & manifes.',
    estimatedPrice: 'Harga Kontrak / m³',
    duration: 'Sesuai Volume Truk',
    icon: 'fa-industry'
  }
];

export interface TimeSlot {
  id: string;
  label: string;
  timeRange: string;
  period: 'pagi' | 'siang' | 'sore' | 'malam' | 'urgent';
  icon: string;
  description: string;
  urgencyBadge?: string;
}

export const TIME_SLOTS: TimeSlot[] = [
  {
    id: 'urgent-now',
    label: 'Darurat / Langsung Sekarang',
    timeRange: 'Standby 24 Jam (Meluncur ~15-25 Menit)',
    period: 'urgent',
    icon: 'fa-bolt',
    description: 'Prioritas tertinggi untuk kloset meluap atau septic tank penuh mendesak.',
    urgencyBadge: 'Respon Kilat'
  },
  {
    id: 'slot-pagi',
    label: 'Sesi Pagi',
    timeRange: '07.30 – 10.30 WIB',
    period: 'pagi',
    icon: 'fa-sun',
    description: 'Paling diminati untuk perumahan sebelum jam aktivitas harian dimulai.'
  },
  {
    id: 'slot-siang',
    label: 'Sesi Siang',
    timeRange: '10.30 – 14.00 WIB',
    period: 'siang',
    icon: 'fa-cloud-sun',
    description: 'Cocok untuk ruko, kantor, dan rumah yang ada penghuni di siang hari.'
  },
  {
    id: 'slot-sore',
    label: 'Sesi Sore',
    timeRange: '14.00 – 18.00 WIB',
    period: 'sore',
    icon: 'fa-cloud-sun-rain',
    description: 'Ideal setelah pulang kerja atau saat waktu senggang sore.'
  },
  {
    id: 'slot-malam',
    label: 'Sesi Malam',
    timeRange: '18.30 – 22.30 WIB',
    period: 'malam',
    icon: 'fa-moon',
    description: 'Layanan malam hening untuk restoran setelah tutup atau komplek perumahan.'
  }
];

export interface ServiceBookingCalendarProps {
  initialArea?: string;
  className?: string;
  onBookingSuccess?: (booking: BookingSubmission) => void;
}

export const ServiceBookingCalendar: React.FC<ServiceBookingCalendarProps> = ({
  initialArea = 'Bogor Barat',
  className = '',
  onBookingSuccess
}) => {
  // Calendar Month & Year State
  const [currentYear, setCurrentYear] = useState<number>(() => new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(() => new Date().getMonth()); // 0-11

  // Selected Booking Form States
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const today = new Date();
    // Default to today or tomorrow
    return today;
  });

  const [selectedAreaName, setSelectedAreaName] = useState<string>(initialArea);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('sedot-wc-rumah');
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<string>('slot-pagi');

  // Customer Contact Fields
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [customerNotes, setCustomerNotes] = useState<string>('');

  // UI Interactive States
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeSuccessModal, setActiveSuccessModal] = useState<BookingSubmission | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<boolean>(false);
  const [showHistoryDrawer, setShowHistoryDrawer] = useState<boolean>(false);

  // Saved Booking History in LocalStorage
  const [bookingHistory, setBookingHistory] = useState<BookingSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('mitra_booking_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  // Keep initialArea in sync if prop changes
  useEffect(() => {
    if (initialArea) {
      setSelectedAreaName(initialArea);
    }
  }, [initialArea]);

  // Find area details and matching hub
  const selectedAreaDetail = useMemo<BogorAreaDetail>(() => {
    const q = selectedAreaName.trim().toLowerCase();
    const exact = BOGOR_AREA_DETAILS.find((a) => a.name.toLowerCase() === q);
    if (exact) return exact;
    const partial = BOGOR_AREA_DETAILS.find(
      (a) => a.name.toLowerCase().includes(q) || q.includes(a.name.toLowerCase())
    );
    if (partial) return partial;
    return BOGOR_AREA_DETAILS[0];
  }, [selectedAreaName]);

  const matchedHub = useMemo<MapHub>(() => {
    const hubName = selectedAreaDetail.hub.toLowerCase();
    if (hubName.includes('timur') || hubName.includes('cibinong')) {
      return MAP_HUBS.find((h) => h.id === 'cibinong') || MAP_HUBS[1];
    }
    if (hubName.includes('barat') || hubName.includes('dramaga')) {
      return MAP_HUBS.find((h) => h.id === 'dramaga') || MAP_HUBS[2];
    }
    if (hubName.includes('selatan') || hubName.includes('ciawi')) {
      return MAP_HUBS.find((h) => h.id === 'ciawi') || MAP_HUBS[3];
    }
    if (hubName.includes('utara') || hubName.includes('parung')) {
      return MAP_HUBS.find((h) => h.id === 'parung') || MAP_HUBS[4];
    }
    return MAP_HUBS[0]; // kota-bogor
  }, [selectedAreaDetail]);

  // Selected Service
  const selectedService = useMemo<ServiceOption>(() => {
    return BOOKING_SERVICES.find((s) => s.id === selectedServiceId) || BOOKING_SERVICES[0];
  }, [selectedServiceId]);

  // Selected Time Slot
  const selectedTimeSlot = useMemo<TimeSlot>(() => {
    return TIME_SLOTS.find((t) => t.id === selectedTimeSlotId) || TIME_SLOTS[0];
  }, [selectedTimeSlotId]);

  // Dynamic Fleet Availability Calculation based on Date, Area, and Time Slot
  const fleetAvailability = useMemo(() => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    const dayOfWeek = selectedDate.getDay(); // 0 is Sunday, 6 is Saturday
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Filter trucks at this hub
    const hubTrucks = REALTIME_FLEET_TRUCKS.filter(
      (t) => t.hubId === matchedHub.id || t.hubName.toLowerCase().includes(matchedHub.shortLabel.toLowerCase())
    );

    // Deterministic seed simulation based on date string and slot
    const charSum = (dateStr + selectedTimeSlotId + selectedAreaName)
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const baseAvailable = Math.max(2, (charSum % 4) + 1);
    const totalTrucksInHub = Math.max(3, hubTrucks.length > 0 ? hubTrucks.length : 3);
    const availableTrucks = Math.min(baseAvailable, totalTrucksInHub);

    let statusLevel: 'high' | 'medium' | 'limited' = 'high';
    let statusLabel = 'Armada Siaga Penuh (Sangat Tersedia)';
    let statusClass = 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/40 border-green-200 dark:border-green-800';

    if (availableTrucks <= 1 || (isWeekend && selectedTimeSlotId === 'slot-pagi')) {
      statusLevel = 'limited';
      statusLabel = 'Slot Terbatas (Tersisa 1 Unit Siaga)';
      statusClass = 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800';
    } else if (availableTrucks === 2) {
      statusLevel = 'medium';
      statusLabel = 'Armada Siap Meluncur (2 Unit Siaga)';
      statusClass = 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800';
    }

    const assignedTruckObj = hubTrucks[charSum % Math.max(1, hubTrucks.length)] || {
      unitCode: 'Truk Tangki MB-01',
      plate: 'F 8392 BA',
      driver: 'Pak Hendra Mulyana',
      capacity: '4.000 Liter',
      hoseLength: '100 Meter'
    };

    return {
      availableTrucks,
      totalTrucks: totalTrucksInHub,
      statusLevel,
      statusLabel,
      statusClass,
      assignedUnit: `${assignedTruckObj.unitCode} (${assignedTruckObj.plate})`,
      driver: assignedTruckObj.driver,
      capacity: assignedTruckObj.capacity,
      hoseLength: assignedTruckObj.hoseLength,
      eta: selectedAreaDetail.estTime || matchedHub.estTime
    };
  }, [selectedDate, selectedTimeSlotId, selectedAreaName, matchedHub, selectedAreaDetail]);

  // Calendar Engine: Generate Days of the Current Month
  const calendarGrid = useMemo(() => {
    const year = currentYear;
    const month = currentMonth;

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Monday as day 0 in Indonesian standard (0 = Sen, 6 = Min)
    let startDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6;

    const daysInMonth = lastDayOfMonth.getDate();

    const days: Array<{
      date: Date;
      dayNumber: number;
      isCurrentMonth: boolean;
      isPast: boolean;
      isToday: boolean;
      isSelected: boolean;
      availabilityDot: 'green' | 'amber' | 'blue';
    }> = [];

    // Today baseline comparison at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Fill preceding days from previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, prevMonthLastDay - i);
      days.push({
        date: d,
        dayNumber: d.getDate(),
        isCurrentMonth: false,
        isPast: true,
        isToday: false,
        isSelected: false,
        availabilityDot: 'amber'
      });
    }

    // Fill current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(year, month, i);
      const isPast = d.getTime() < today.getTime();
      const isToday = d.getTime() === today.getTime();
      const isSelected =
        selectedDate.getFullYear() === d.getFullYear() &&
        selectedDate.getMonth() === d.getMonth() &&
        selectedDate.getDate() === d.getDate();

      // Availability dot calculation
      const dayNum = d.getDay();
      const availabilityDot: 'green' | 'amber' | 'blue' =
        dayNum === 0 || dayNum === 6 ? 'amber' : (i % 3 === 0 ? 'blue' : 'green');

      days.push({
        date: d,
        dayNumber: i,
        isCurrentMonth: true,
        isPast,
        isToday,
        isSelected,
        availabilityDot
      });
    }

    // Fill remaining days for complete 35 or 42 slots
    const totalSlots = days.length <= 35 ? 35 : 42;
    const remaining = totalSlots - days.length;
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(year, month + 1, i);
      days.push({
        date: d,
        dayNumber: i,
        isCurrentMonth: false,
        isPast: false,
        isToday: false,
        isSelected: false,
        availabilityDot: 'green'
      });
    }

    return days;
  }, [currentYear, currentMonth, selectedDate]);

  // Month navigation
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const handlePrevMonth = () => {
    const today = new Date();
    // Prevent navigating to past months
    if (currentYear === today.getFullYear() && currentMonth <= today.getMonth()) {
      return;
    }
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Quick Date Shortcut Handlers
  const handleSelectQuickDate = (type: 'today' | 'tomorrow' | 'dayAfter' | 'weekend') => {
    const now = new Date();
    const target = new Date();
    if (type === 'today') {
      // today
    } else if (type === 'tomorrow') {
      target.setDate(now.getDate() + 1);
    } else if (type === 'dayAfter') {
      target.setDate(now.getDate() + 2);
    } else if (type === 'weekend') {
      const day = now.getDay();
      const daysUntilSaturday = (6 - day + 7) % 7 || 7;
      target.setDate(now.getDate() + daysUntilSaturday);
    }
    setSelectedDate(target);
    setCurrentMonth(target.getMonth());
    setCurrentYear(target.getFullYear());
  };

  // Format date in Indonesian
  const formattedSelectedDate = useMemo(() => {
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(selectedDate);
  }, [selectedDate]);

  // Generate unique booking code
  const generateBookingCode = () => {
    const d = selectedDate;
    const yearStr = d.getFullYear().toString();
    const monthStr = String(d.getMonth() + 1).padStart(2, '0');
    const dayStr = String(d.getDate()).padStart(2, '0');
    const randomHex = Math.floor(1000 + Math.random() * 9000).toString();
    return `MB-${yearStr}${monthStr}${dayStr}-${randomHex}`;
  };

  // Handle Form Submission
  const handleConfirmBooking = (sendWa: boolean) => {
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      alert('Mohon lengkapi Nama Pemesan, Nomor WhatsApp, dan Alamat Lokasi untuk memproses reservasi armada.');
      return;
    }

    setIsSubmitting(true);
    const code = generateBookingCode();

    const newBooking: BookingSubmission = {
      id: `book-${Date.now()}`,
      bookingCode: code,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerAddress: customerAddress.trim(),
      notes: customerNotes.trim(),
      serviceType: selectedService.name,
      servicePrice: selectedService.estimatedPrice,
      selectedDate: selectedDate.toISOString().split('T')[0],
      selectedDateLabel: formattedSelectedDate,
      timeSlotId: selectedTimeSlot.id,
      timeSlotLabel: `${selectedTimeSlot.label} (${selectedTimeSlot.timeRange})`,
      areaName: selectedAreaDetail.name,
      areaType: selectedAreaDetail.type,
      hubId: matchedHub.id,
      hubName: matchedHub.name,
      assignedTruck: fleetAvailability.assignedUnit,
      driverName: fleetAvailability.driver,
      eta: fleetAvailability.eta,
      status: 'confirmed',
      createdAt: new Date().toLocaleString('id-ID')
    };

    // Save to state and localStorage
    const updatedHistory = [newBooking, ...bookingHistory];
    setBookingHistory(updatedHistory);
    try {
      localStorage.setItem('mitra_booking_history', JSON.stringify(updatedHistory));
    } catch {
      // storage quota
    }

    if (onBookingSuccess) {
      onBookingSuccess(newBooking);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setActiveSuccessModal(newBooking);

      if (sendWa) {
        // Construct professional WhatsApp Dispatch format
        const waText =
          `*RESERVASI TANGGAL & DISPATCH ARMADA MITRA BERSIH 24 JAM*\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
          `📌 *Kode Booking:* ${newBooking.bookingCode}\n` +
          `📅 *Tanggal Pelaksanaan:* ${newBooking.selectedDateLabel}\n` +
          `⏰ *Sesi Waktu:* ${newBooking.timeSlotLabel}\n` +
          `🛠️ *Layanan:* ${newBooking.serviceType}\n` +
          `📍 *Wilayah / Kecamatan:* ${newBooking.areaName} (${newBooking.areaType})\n` +
          `🏢 *Pos Siaga Terdekat:* ${newBooking.hubName}\n` +
          `⏱️ *Estimasi Kedatangan (ETA):* ${newBooking.eta}\n` +
          `🚛 *Armada Siaga:* ${newBooking.assignedTruck} (Driver: ${newBooking.driverName})\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
          `👤 *Nama Pemesan:* ${newBooking.customerName}\n` +
          `📞 *Nomor HP / WA:* ${newBooking.customerPhone}\n` +
          `🏠 *Alamat & Patokan:* ${newBooking.customerAddress}\n` +
          (newBooking.notes ? `📝 *Catatan Khusus:* ${newBooking.notes}\n` : '') +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
          `Mohon konfirmasi ketersediaan armada truk tangki vakum untuk meluncur ke lokasi sesuai jadwal di atas. Terima kasih PT MITRA BERSIH 24 JAM!`;

        const waUrl = `https://wa.me/6285715654183?text=${encodeURIComponent(waText)}`;
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }
    }, 400);
  };

  // Copy booking summary to clipboard
  const handleCopyBookingDetails = (b: BookingSubmission) => {
    const text =
      `KODE BOOKING: ${b.bookingCode}\n` +
      `Tanggal: ${b.selectedDateLabel}\n` +
      `Sesi: ${b.timeSlotLabel}\n` +
      `Layanan: ${b.serviceType}\n` +
      `Lokasi: ${b.areaName} - Pos: ${b.hubName}\n` +
      `Armada: ${b.assignedTruck} (ETA: ${b.eta})\n` +
      `Pemesan: ${b.customerName} (${b.customerPhone})\n` +
      `Alamat: ${b.customerAddress}`;

    navigator.clipboard.writeText(text);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  return (
    <div className={`service-booking-calendar-wrapper ${className}`} id="booking-kalender">
      {/* HEADER SECTION */}
      <div className="booking-calendar-header">
        <div className="booking-header-tag">
          <i className="fas fa-calendar-check" aria-hidden="true"></i>
          <span>SISTEM RESERVASI TANGGAL &amp; DISPATCH ARMADA SIAGA</span>
        </div>
        <h2 className="booking-main-title">
          Pilih Tanggal &amp; Cek Ketersediaan Armada di Wilayah Anda
        </h2>
        <p className="booking-main-desc">
          Terintegrasi langsung dengan 5 Pos Siaga dan 11 unit truk tangki vakum se-Bogor Raya. Pilih tanggal, jam, dan lokasi Anda untuk melihat kesiapan armada secara instan.
        </p>
      </div>

      {/* QUICK STATS STRIP */}
      <div className="booking-stats-strip" role="region" aria-label="Ringkasan Kesiapan Armada">
        <div className="booking-stat-chip">
          <span className="booking-stat-dot green" aria-hidden="true"></span>
          <span>11 Unit Truk Tangki Siaga 24 Jam</span>
        </div>
        <div className="booking-stat-chip">
          <i className="fas fa-map-marker-alt text-amber-500" aria-hidden="true"></i>
          <span>5 Simpul Pos Strategis Kota &amp; Kab. Bogor</span>
        </div>
        <div className="booking-stat-chip">
          <i className="fas fa-clock text-blue-500" aria-hidden="true"></i>
          <span>Respons Kilat ~15 – 30 Menit Tiba</span>
        </div>
        <div className="booking-stat-chip">
          <i className="fas fa-shield-alt text-emerald-500" aria-hidden="true"></i>
          <span>Legalitas Resmi KBLI 37001 &amp; Garansi 30 Hari</span>
        </div>
      </div>

      {/* MAIN TWO-COLUMN BOOKING CONTAINER */}
      <div className="booking-calendar-grid">
        {/* LEFT COLUMN: INTERACTIVE CALENDAR & AVAILABILITY RADAR */}
        <div className="booking-left-column">
          {/* STEP 1: PILIH WILAYAH & AREA */}
          <div className="booking-card">
            <div className="booking-card-step-header">
              <span className="step-num">1</span>
              <div>
                <h3 className="step-title">Pilih Area / Kecamatan Anda</h3>
                <p className="step-subtitle">Armada terdekat akan otomatis dialokasikan dari Pos Siaga terdekat</p>
              </div>
            </div>

            <div className="booking-area-selector-row">
              <div className="booking-area-select-wrap">
                <label htmlFor="booking-area-select" className="booking-input-label">
                  <i className="fas fa-map-pin text-amber-500 mr-2" aria-hidden="true"></i>
                  Kecamatan / Wilayah Layanan:
                </label>
                <select
                  id="booking-area-select"
                  value={selectedAreaName}
                  onChange={(e) => setSelectedAreaName(e.target.value)}
                  className="booking-select-field"
                  aria-label="Pilih kecamatan di Kota atau Kabupaten Bogor"
                >
                  <optgroup label="Kota Bogor (6 Kecamatan)">
                    {BOGOR_AREA_DETAILS.filter((a) => a.type === 'Kota Bogor').map((a) => (
                      <option key={a.name} value={a.name}>
                        {a.name} ({a.hubBadge})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Kabupaten Bogor (Kawasan Industri & Pemukiman)">
                    {BOGOR_AREA_DETAILS.filter((a) => a.type === 'Kabupaten Bogor').map((a) => (
                      <option key={a.name} value={a.name}>
                        {a.name} ({a.hubBadge})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>

            {/* LIVE FLEET RADAR BADGE */}
            <div className="fleet-radar-panel">
              <div className="fleet-radar-top">
                <div className="fleet-hub-info">
                  <div className="fleet-hub-icon">
                    <i className="fas fa-satellite text-amber-500" aria-hidden="true"></i>
                  </div>
                  <div>
                    <span className="fleet-hub-label">Pos Siaga Utama yang Merespon:</span>
                    <strong className="fleet-hub-name">{matchedHub.name}</strong>
                    <div className="fleet-hub-sub">
                      <span>Jangkauan: {matchedHub.coverage}</span>
                    </div>
                  </div>
                </div>

                <div className="fleet-eta-box">
                  <span className="fleet-eta-label">Estimasi Tiba di {selectedAreaName}:</span>
                  <span className="fleet-eta-val">{fleetAvailability.eta}</span>
                </div>
              </div>

              {/* LIVE AVAILABILITY STATUS PILL */}
              <div className={`fleet-status-banner ${fleetAvailability.statusClass}`}>
                <div className="fleet-status-left">
                  <span className="fleet-pulse-dot" aria-hidden="true"></span>
                  <strong>{fleetAvailability.statusLabel}</strong>
                </div>
                <div className="fleet-status-units">
                  <span>{fleetAvailability.availableTrucks} dari {fleetAvailability.totalTrucks} Unit Siaga</span>
                </div>
              </div>

              {/* ASSIGNED FLEET UNIT PREVIEW */}
              <div className="fleet-unit-preview">
                <div className="fleet-unit-item">
                  <i className="fas fa-truck text-amber-500" aria-hidden="true"></i>
                  <span>Armada: <strong>{fleetAvailability.assignedUnit}</strong></span>
                </div>
                <div className="fleet-unit-item">
                  <i className="fas fa-user-check text-blue-500" aria-hidden="true"></i>
                  <span>Teknisi Piket: <strong>{fleetAvailability.driver}</strong></span>
                </div>
                <div className="fleet-unit-item">
                  <i className="fas fa-arrows-alt-h text-emerald-500" aria-hidden="true"></i>
                  <span>Selang Tangki: <strong>{fleetAvailability.hoseLength}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: INTERACTIVE CALENDAR FOR DATE SELECTION */}
          <div className="booking-card">
            <div className="booking-card-step-header">
              <span className="step-num">2</span>
              <div>
                <h3 className="step-title">Pilih Tanggal Layanan</h3>
                <p className="step-subtitle">Bisa dijadwalkan untuk hari ini langsung atau reservasi hari mendatang</p>
              </div>
            </div>

            {/* QUICK DATE SHORTCUTS */}
            <div className="quick-date-row" role="group" aria-label="Tombol cepat pilih tanggal">
              <button
                type="button"
                onClick={() => handleSelectQuickDate('today')}
                className="quick-date-btn"
                aria-label="Pilih tanggal hari ini"
              >
                <i className="fas fa-bolt text-amber-500" aria-hidden="true"></i>
                <span>Hari Ini (Langsung)</span>
              </button>
              <button
                type="button"
                onClick={() => handleSelectQuickDate('tomorrow')}
                className="quick-date-btn"
                aria-label="Pilih tanggal besok"
              >
                <i className="fas fa-calendar-day text-blue-500" aria-hidden="true"></i>
                <span>Besok</span>
              </button>
              <button
                type="button"
                onClick={() => handleSelectQuickDate('dayAfter')}
                className="quick-date-btn"
                aria-label="Pilih tanggal lusa"
              >
                <span>Lusa</span>
              </button>
              <button
                type="button"
                onClick={() => handleSelectQuickDate('weekend')}
                className="quick-date-btn"
                aria-label="Pilih akhir pekan Sabtu atau Minggu"
              >
                <i className="fas fa-couch text-purple-500" aria-hidden="true"></i>
                <span>Akhir Pekan</span>
              </button>
            </div>

            {/* MONTH NAVIGATION BAR */}
            <div className="calendar-nav-bar">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="calendar-nav-btn"
                aria-label="Bulan sebelumnya"
                title="Bulan sebelumnya"
              >
                <i className="fas fa-chevron-left" aria-hidden="true"></i>
              </button>

              <div className="calendar-month-indicator" aria-live="polite">
                <strong>{monthNames[currentMonth]} {currentYear}</strong>
              </div>

              <button
                type="button"
                onClick={handleNextMonth}
                className="calendar-nav-btn"
                aria-label="Bulan berikutnya"
                title="Bulan berikutnya"
              >
                <i className="fas fa-chevron-right" aria-hidden="true"></i>
              </button>
            </div>

            {/* CALENDAR DAYS TABLE */}
            <div className="calendar-table-wrap">
              <div className="calendar-weekdays-header">
                <span className="cal-weekday">Sen</span>
                <span className="cal-weekday">Sel</span>
                <span className="cal-weekday">Rab</span>
                <span className="cal-weekday">Kam</span>
                <span className="cal-weekday">Jum</span>
                <span className="cal-weekday weekend">Sab</span>
                <span className="cal-weekday weekend">Min</span>
              </div>

              <div className="calendar-days-grid" role="grid" aria-label="Kalender Reservasi Bulan Ini">
                {calendarGrid.map((item, index) => {
                  const isDisabled = item.isPast || !item.isCurrentMonth;
                  return (
                    <button
                      key={index}
                      type="button"
                      disabled={isDisabled}
                      onClick={() => setSelectedDate(item.date)}
                      className={`cal-day-cell ${item.isSelected ? 'selected' : ''} ${item.isToday ? 'today' : ''} ${isDisabled ? 'disabled' : ''} ${!item.isCurrentMonth ? 'other-month' : ''}`}
                      aria-label={`${item.dayNumber} ${monthNames[item.date.getMonth()]} ${item.date.getFullYear()}${item.isToday ? ' (Hari ini)' : ''}${item.isSelected ? ' (Dipilih)' : ''}`}
                      aria-pressed={item.isSelected}
                    >
                      <span className="cal-day-number">{item.dayNumber}</span>
                      {!isDisabled && (
                        <span
                          className={`cal-avail-dot ${item.availabilityDot}`}
                          title={item.availabilityDot === 'green' ? 'Ketersediaan armada penuh' : 'Slot terbatas'}
                          aria-hidden="true"
                        ></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CALENDAR LEGEND */}
            <div className="calendar-legend-bar">
              <div className="legend-item">
                <span className="legend-dot green" aria-hidden="true"></span>
                <span>Armada Penuh Siaga</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot blue" aria-hidden="true"></span>
                <span>Jadwal Normal</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot amber" aria-hidden="true"></span>
                <span>Slot Terbatas</span>
              </div>
            </div>

            {/* CURRENT SELECTED DATE CALLOUT */}
            <div className="selected-date-callout">
              <div className="selected-date-icon">
                <i className="fas fa-calendar-check text-amber-500" aria-hidden="true"></i>
              </div>
              <div className="selected-date-content">
                <span className="selected-date-label">Tanggal Terpilih:</span>
                <strong className="selected-date-string">{formattedSelectedDate}</strong>
              </div>
              <span className="selected-date-badge">Tersedia</span>
            </div>
          </div>

          {/* STEP 3: TIME SLOT SELECTION */}
          <div className="booking-card">
            <div className="booking-card-step-header">
              <span className="step-num">3</span>
              <div>
                <h3 className="step-title">Pilih Sesi Jam Layanan</h3>
                <p className="step-subtitle">Layanan fleksibel 24 jam – tersedia slot pagi, siang, sore, malam &amp; darurat</p>
              </div>
            </div>

            <div className="time-slots-grid" role="radiogroup" aria-label="Pilihan Sesi Jam">
              {TIME_SLOTS.map((slot) => {
                const isSelected = selectedTimeSlotId === slot.id;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setSelectedTimeSlotId(slot.id)}
                    className={`time-slot-btn ${isSelected ? 'active' : ''} ${slot.period === 'urgent' ? 'urgent-slot' : ''}`}
                  >
                    <div className="time-slot-header">
                      <div className="time-slot-icon">
                        <i className={`fas ${slot.icon}`} aria-hidden="true"></i>
                      </div>
                      <div className="time-slot-title-wrap">
                        <strong className="time-slot-title">{slot.label}</strong>
                        <span className="time-slot-range">{slot.timeRange}</span>
                      </div>
                    </div>
                    {slot.urgencyBadge && (
                      <span className="time-slot-badge">{slot.urgencyBadge}</span>
                    )}
                    <p className="time-slot-desc">{slot.description}</p>
                    <div className="time-slot-status">
                      <span className="slot-check-indicator" aria-hidden="true">
                        {isSelected ? <i className="fas fa-check-circle"></i> : <i className="far fa-circle"></i>}
                      </span>
                      <span className="slot-avail-text">
                        {slot.id === 'urgent-now' ? 'Unit Standby Langsung' : 'Slot Tersedia'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SERVICE SELECTION, CUSTOMER FORM, & SUMMARY */}
        <div className="booking-right-column">
          {/* STEP 4: SERVICE TYPE SELECTION */}
          <div className="booking-card">
            <div className="booking-card-step-header">
              <span className="step-num">4</span>
              <div>
                <h3 className="step-title">Pilih Jenis Layanan Sanitasi</h3>
                <p className="step-subtitle">Harga transparan, alat modern tanpa bongkar &amp; garansi tuntas</p>
              </div>
            </div>

            <div className="services-selector-list" role="radiogroup" aria-label="Pilihan Layanan">
              {BOOKING_SERVICES.map((srv) => {
                const isSelected = selectedServiceId === srv.id;
                return (
                  <div
                    key={srv.id}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onClick={() => setSelectedServiceId(srv.id)}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        setSelectedServiceId(srv.id);
                      }
                    }}
                    className={`service-select-item ${isSelected ? 'active' : ''}`}
                  >
                    <div className="service-radio-col">
                      <span className={`service-radio-custom ${isSelected ? 'checked' : ''}`} aria-hidden="true"></span>
                    </div>
                    <div className="service-icon-col">
                      <i className={`fas ${srv.icon} text-amber-500`} aria-hidden="true"></i>
                    </div>
                    <div className="service-text-col">
                      <strong className="service-item-name">{srv.name}</strong>
                      <p className="service-item-desc">{srv.description}</p>
                      <div className="service-meta-row">
                        <span className="service-price-tag">{srv.estimatedPrice}</span>
                        <span className="service-meta-divider" aria-hidden="true">·</span>
                        <span className="service-duration">Durasi ~{srv.duration}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 5: CUSTOMER CONTACT FORM */}
          <div className="booking-card">
            <div className="booking-card-step-header">
              <span className="step-num">5</span>
              <div>
                <h3 className="step-title">Data Pemesan &amp; Lokasi Alamat</h3>
                <p className="step-subtitle">Petugas armada akan menghubungi nomor WA Anda untuk konfirmasi posisi</p>
              </div>
            </div>

            <div className="booking-form-fields">
              <div className="form-group-booking">
                <label htmlFor="customer-name" className="booking-input-label">
                  Nama Lengkap Pemesan <span className="text-red-500">*</span>:
                </label>
                <div className="input-with-icon">
                  <i className="fas fa-user input-icon" aria-hidden="true"></i>
                  <input
                    id="customer-name"
                    type="text"
                    required
                    placeholder="Contoh: Bapak Hendra / Ibu Maya"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="booking-text-input"
                  />
                </div>
              </div>

              <div className="form-group-booking">
                <label htmlFor="customer-phone" className="booking-input-label">
                  Nomor WhatsApp / Telepon Aktif <span className="text-red-500">*</span>:
                </label>
                <div className="input-with-icon">
                  <i className="fab fa-whatsapp input-icon" aria-hidden="true"></i>
                  <input
                    id="customer-phone"
                    type="tel"
                    required
                    placeholder="Contoh: 0812-XXXX-XXXX atau 0857-XXXX-XXXX"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="booking-text-input"
                  />
                </div>
              </div>

              <div className="form-group-booking">
                <label htmlFor="customer-address" className="booking-input-label">
                  Alamat Lengkap &amp; Patokan Lokasi <span className="text-red-500">*</span>:
                </label>
                <textarea
                  id="customer-address"
                  rows={3}
                  required
                  placeholder="Contoh: Jl. Sholeh Iskandar No. 45, Perumahan Yasmin Sektor 3 Blok D No. 12 (Masuk dari portal masjid Al-Ikhlas, rumah pagar hitam)"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="booking-textarea-input"
                ></textarea>
              </div>

              <div className="form-group-booking">
                <label htmlFor="customer-notes" className="booking-input-label">
                  Catatan Tambahan / Gejala Masalah (Opsional):
                </label>
                <input
                  id="customer-notes"
                  type="text"
                  placeholder="Contoh: Jarak septic tank ke jalan sekitar 35 meter, butuh selang panjang"
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  className="booking-text-input"
                />
              </div>
            </div>
          </div>

          {/* STEP 6: BOOKING SUMMARY & DISPATCH ACTIONS */}
          <div className="booking-summary-card">
            <div className="summary-header">
              <div className="summary-title-wrap">
                <i className="fas fa-clipboard-check text-amber-500 text-xl" aria-hidden="true"></i>
                <h3 className="summary-title">Ringkasan Reservasi &amp; Penugasan Armada</h3>
              </div>
              <span className="summary-badge-live">Siap Dispatch</span>
            </div>

            <div className="summary-body">
              <div className="summary-row">
                <span className="summary-label">Layanan:</span>
                <strong className="summary-value text-right">{selectedService.name}</strong>
              </div>
              <div className="summary-row">
                <span className="summary-label">Jadwal Tanggal:</span>
                <strong className="summary-value text-amber-500 text-right">{formattedSelectedDate}</strong>
              </div>
              <div className="summary-row">
                <span className="summary-label">Sesi Waktu:</span>
                <strong className="summary-value text-right">{selectedTimeSlot.label} ({selectedTimeSlot.timeRange})</strong>
              </div>
              <div className="summary-row">
                <span className="summary-label">Wilayah &amp; Pos Siaga:</span>
                <div className="text-right">
                  <strong className="summary-value block">{selectedAreaDetail.name} ({selectedAreaDetail.type})</strong>
                  <span className="text-xs text-slate-500">{matchedHub.name}</span>
                </div>
              </div>
              <div className="summary-row">
                <span className="summary-label">Unit Ditugaskan:</span>
                <strong className="summary-value text-right">{fleetAvailability.assignedUnit}</strong>
              </div>
              <div className="summary-row">
                <span className="summary-label">Estimasi Waktu Tiba (ETA):</span>
                <strong className="summary-value text-emerald-600 dark:text-emerald-400 text-right">
                  ~{fleetAvailability.eta}
                </strong>
              </div>
              <div className="summary-row border-t border-slate-200 dark:border-slate-800 pt-3">
                <span className="summary-label font-bold text-slate-900 dark:text-white">Estimasi Biaya:</span>
                <strong className="summary-value text-amber-600 dark:text-amber-400 text-lg font-black text-right">
                  {selectedService.estimatedPrice}
                </strong>
              </div>
              <p className="text-xs text-slate-500 italic mt-1 text-right">
                *Tarif flat tanpa biaya transport tambahan radius Bogor. Pembayaran aman setelah tuntas dikerjakan.
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="summary-actions">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleConfirmBooking(true)}
                className="booking-submit-btn-wa"
                aria-label="Kirim reservasi langsung via WhatsApp CS 24 Jam"
              >
                <i className="fab fa-whatsapp text-xl mr-2" aria-hidden="true"></i>
                <span>
                  {isSubmitting ? 'Memproses Reservasi...' : 'Kirim Reservasi via WhatsApp (Respon Cepat)'}
                </span>
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleConfirmBooking(false)}
                className="booking-submit-btn-save"
                aria-label="Simpan jadwal booking di sistem dan simpan bukti reservasi"
              >
                <i className="fas fa-save mr-2" aria-hidden="true"></i>
                <span>Simpan Tiket Jadwal Booking</span>
              </button>
            </div>

            {/* GUARANTEE STRIP */}
            <div className="summary-guarantee-strip">
              <div className="guarantee-item">
                <i className="fas fa-check-circle text-green-500" aria-hidden="true"></i>
                <span>Garansi Tuntas 30 Hari</span>
              </div>
              <div className="guarantee-item">
                <i className="fas fa-check-circle text-green-500" aria-hidden="true"></i>
                <span>Tanpa Bongkar Keramik</span>
              </div>
              <div className="guarantee-item">
                <i className="fas fa-check-circle text-green-500" aria-hidden="true"></i>
                <span>Faktur Pajak &amp; Manifes IPLT</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT BOOKINGS DRAWER / TOGGLE BAR */}
      {bookingHistory.length > 0 && (
        <div className="booking-history-bar">
          <div className="booking-history-bar-left">
            <i className="fas fa-history text-amber-500 text-lg" aria-hidden="true"></i>
            <div>
              <strong>Riwayat Reservasi Anda di Perangkat Ini</strong>
              <p className="text-xs text-slate-500">Tersimpan {bookingHistory.length} pemesanan aktif</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowHistoryDrawer(!showHistoryDrawer)}
            className="booking-history-toggle-btn"
            aria-expanded={showHistoryDrawer}
          >
            <span>{showHistoryDrawer ? 'Tutup Riwayat' : 'Lihat Tiket Booking'}</span>
            <i className={`fas fa-chevron-${showHistoryDrawer ? 'up' : 'down'} ml-2`} aria-hidden="true"></i>
          </button>
        </div>
      )}

      {/* HISTORY CARDS LIST */}
      {showHistoryDrawer && bookingHistory.length > 0 && (
        <div className="booking-history-list fade-in">
          {bookingHistory.map((item) => (
            <div key={item.id} className="history-card">
              <div className="history-card-header">
                <div>
                  <span className="history-code">{item.bookingCode}</span>
                  <strong className="history-service-name block">{item.serviceType}</strong>
                </div>
                <span className="history-status-badge">Terkonfirmasi</span>
              </div>
              <div className="history-details-grid">
                <div>
                  <span className="history-sub-label">Tanggal &amp; Sesi:</span>
                  <p className="history-sub-val">{item.selectedDateLabel} · {item.timeSlotLabel}</p>
                </div>
                <div>
                  <span className="history-sub-label">Area &amp; Pos Siaga:</span>
                  <p className="history-sub-val">{item.areaName} ({item.hubName})</p>
                </div>
                <div>
                  <span className="history-sub-label">Armada Ditugaskan:</span>
                  <p className="history-sub-val">{item.assignedTruck} (ETA: {item.eta})</p>
                </div>
                <div>
                  <span className="history-sub-label">Pemesan &amp; Alamat:</span>
                  <p className="history-sub-val">{item.customerName} · {item.customerAddress}</p>
                </div>
              </div>
              <div className="history-card-actions">
                <button
                  type="button"
                  onClick={() => handleCopyBookingDetails(item)}
                  className="history-action-btn"
                  title="Salin rincian booking ini"
                >
                  <i className="fas fa-copy mr-1"></i>
                  <span>Salin Detail</span>
                </button>
                <a
                  href={`https://wa.me/6285715654183?text=Halo%20Admin%20Mitra%20Bersih,%20saya%20ingin%20cek%20status%20kode%20booking%20*${item.bookingCode}*%20atas%20nama%20${encodeURIComponent(item.customerName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="history-action-wa"
                >
                  <i className="fab fa-whatsapp mr-1"></i>
                  <span>Hubungi CS Mengenai Tiket Ini</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* BOOKING SUCCESS MODAL */}
      {activeSuccessModal && (
        <div
          className="booking-modal-backdrop fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-booking-title"
        >
          <div className="booking-modal-card scale-in">
            <div className="modal-success-badge">
              <i className="fas fa-check-circle" aria-hidden="true"></i>
            </div>
            <h3 id="modal-booking-title" className="modal-success-title">
              Reservasi Layanan Berhasil Dibuat!
            </h3>
            <p className="modal-success-desc">
              Armada dari Pos Siaga terdekat telah disiapkan untuk meluncur ke lokasi Anda.
            </p>

            <div className="modal-ticket-box">
              <div className="ticket-row-header">
                <span className="ticket-code-label">KODE BOOKING</span>
                <strong className="ticket-code-val">{activeSuccessModal.bookingCode}</strong>
              </div>
              <div className="ticket-divider"></div>
              <div className="ticket-grid">
                <div>
                  <span className="ticket-meta-label">Tanggal Pelaksanaan:</span>
                  <strong className="ticket-meta-val">{activeSuccessModal.selectedDateLabel}</strong>
                </div>
                <div>
                  <span className="ticket-meta-label">Sesi Waktu:</span>
                  <strong className="ticket-meta-val">{activeSuccessModal.timeSlotLabel}</strong>
                </div>
                <div>
                  <span className="ticket-meta-label">Kecamatan &amp; Pos:</span>
                  <strong className="ticket-meta-val">{activeSuccessModal.areaName} ({activeSuccessModal.hubName})</strong>
                </div>
                <div>
                  <span className="ticket-meta-label">Armada Disiapkan:</span>
                  <strong className="ticket-meta-val">{activeSuccessModal.assignedTruck}</strong>
                </div>
                <div>
                  <span className="ticket-meta-label">Estimasi Waktu Tiba (ETA):</span>
                  <strong className="ticket-meta-val text-emerald-600 dark:text-emerald-400">~{activeSuccessModal.eta}</strong>
                </div>
                <div>
                  <span className="ticket-meta-label">Nama Pemesan:</span>
                  <strong className="ticket-meta-val">{activeSuccessModal.customerName} ({activeSuccessModal.customerPhone})</strong>
                </div>
              </div>
            </div>

            <div className="modal-actions-row">
              <button
                type="button"
                onClick={() => handleCopyBookingDetails(activeSuccessModal)}
                className="modal-copy-btn"
              >
                <i className={`fas ${copyFeedback ? 'fa-check text-green-500' : 'fa-copy'}`}></i>
                <span>{copyFeedback ? 'Tersalin!' : 'Salin Kode & Detail'}</span>
              </button>

              <a
                href={`https://wa.me/6285715654183?text=Halo%20Mitra%20Bersih,%20saya%20sudah%20melakukan%20booking%20dengan%20kode%20*${activeSuccessModal.bookingCode}*%20untuk%20tanggal%20${encodeURIComponent(activeSuccessModal.selectedDateLabel)}.%20Mohon%20konfirmasi%20unitnya.%20Terima%20kasih!`}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-wa-btn"
              >
                <i className="fab fa-whatsapp text-lg"></i>
                <span>Chat Admin CS Sekarang</span>
              </a>
            </div>

            <button
              type="button"
              onClick={() => setActiveSuccessModal(null)}
              className="modal-close-bottom-btn"
            >
              Tutup &amp; Kembali ke Halaman Utama
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
