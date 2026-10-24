import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  MapHub,
  MAP_HUBS,
  BOGOR_AREA_DETAILS,
  BogorAreaDetail,
  POS_ARMADA_MARKERS,
  PosArmadaMarker,
  REALTIME_FLEET_TRUCKS
} from '../App';

export interface InteractiveHubMapProps {
  hubs?: MapHub[];
  selectedHubId?: string;
  onSelectHub?: (hub: MapHub) => void;
  className?: string;
}

// Hub SVG coordinates on a 1000 x 650 viewBox
export const HUB_CANVAS_COORDINATES: Record<string, { x: number; y: number; r: number; color: string }> = {
  'kota-bogor': { x: 500, y: 340, r: 110, color: '#FFD60A' },
  'cibinong': { x: 690, y: 195, r: 125, color: '#38BDF8' },
  'dramaga': { x: 310, y: 385, r: 120, color: '#34D399' },
  'ciawi': { x: 675, y: 495, r: 130, color: '#F97316' },
  'parung': { x: 350, y: 145, r: 115, color: '#A78BFA' }
};

export const InteractiveHubMap: React.FC<InteractiveHubMapProps> = ({
  hubs = MAP_HUBS,
  selectedHubId: externalSelectedHubId,
  onSelectHub,
  className = ''
}) => {
  const [internalSelectedHubId, setInternalSelectedHubId] = useState<string>('kota-bogor');
  const [searchInput, setSearchInput] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'radar' | 'google'>('radar');
  const [isRefreshingGps, setIsRefreshingGps] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Satelit Aktif • 11 Unit Siaga');
  const [hoveredHubId, setHoveredHubId] = useState<string | null>(null);
  const [srAnnouncement, setSrAnnouncement] = useState<string>('Peta interaktif pos siaga Bogor siap dinavigasi.');

  const chipsListRef = useRef<HTMLDivElement>(null);
  const viewModeRef = useRef<HTMLDivElement>(null);

  const activeHubId = externalSelectedHubId !== undefined ? externalSelectedHubId : internalSelectedHubId;

  // Find the selected hub object
  const activeHub = useMemo(() => {
    return hubs.find((h) => h.id === activeHubId) || hubs[0];
  }, [hubs, activeHubId]);

  // List of chip items for roving tabindex keyboard navigation (Semua Pos + 5 Hubs)
  const allChipItems = useMemo<Array<{ id: string; label: string; shortLabel: string; isAll: boolean; hub?: MapHub }>>(() => {
    return [
      { id: 'all', label: 'Semua Pos (5 Hubs)', shortLabel: 'Semua Pos', isAll: true, hub: undefined },
      ...hubs.map((h) => ({ id: h.id, label: h.name, shortLabel: h.shortLabel, isAll: false, hub: h }))
    ];
  }, [hubs]);

  const activeChipIndex = useMemo(() => {
    const idx = hubs.findIndex((h) => h.id === activeHubId);
    return idx >= 0 ? idx + 1 : 0;
  }, [hubs, activeHubId]);

  // Map subdistricts to their hubs
  const districtsForActiveHub = useMemo(() => {
    if (!activeHub) return [];
    return BOGOR_AREA_DETAILS.filter((area) => {
      const hubName = area.hub.toLowerCase();
      if (activeHub.id === 'kota-bogor' && hubName.includes('kota')) return true;
      if (activeHub.id === 'cibinong' && (hubName.includes('cibinong') || hubName.includes('sentul'))) return true;
      if (activeHub.id === 'dramaga' && (hubName.includes('dramaga') || hubName.includes('barat'))) return true;
      if (activeHub.id === 'ciawi' && (hubName.includes('ciawi') || hubName.includes('puncak'))) return true;
      if (activeHub.id === 'parung' && (hubName.includes('parung') || hubName.includes('utara'))) return true;
      return false;
    });
  }, [activeHub]);

  // Search filter result
  const searchMatch = useMemo(() => {
    const q = searchInput.trim().toLowerCase();
    if (!q) return null;

    // First check kecamatan
    const foundArea = BOGOR_AREA_DETAILS.find(
      (a) => a.name.toLowerCase().includes(q) || (a.keywords && a.keywords.some((k) => k.toLowerCase().includes(q)))
    );

    if (foundArea) {
      const hubName = foundArea.hub.toLowerCase();
      let matchedHub = hubs[0];
      if (hubName.includes('cibinong') || hubName.includes('sentul')) {
        matchedHub = hubs.find((h) => h.id === 'cibinong') || hubs[0];
      } else if (hubName.includes('dramaga') || hubName.includes('barat')) {
        matchedHub = hubs.find((h) => h.id === 'dramaga') || hubs[0];
      } else if (hubName.includes('ciawi') || hubName.includes('puncak')) {
        matchedHub = hubs.find((h) => h.id === 'ciawi') || hubs[0];
      } else if (hubName.includes('parung') || hubName.includes('utara')) {
        matchedHub = hubs.find((h) => h.id === 'parung') || hubs[0];
      } else if (hubName.includes('kota')) {
        matchedHub = hubs.find((h) => h.id === 'kota-bogor') || hubs[0];
      }
      return {
        type: 'area',
        area: foundArea,
        hub: matchedHub
      };
    }

    // Then check hub name directly
    const foundHub = hubs.find(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.shortLabel.toLowerCase().includes(q) ||
        h.coverage.toLowerCase().includes(q) ||
        h.badge.toLowerCase().includes(q)
    );

    if (foundHub) {
      return {
        type: 'hub',
        hub: foundHub
      };
    }

    return null;
  }, [searchInput, hubs]);

  // Auto-switch active hub when search matches
  useEffect(() => {
    if (searchMatch) {
      const targetId = searchMatch.hub.id;
      if (targetId !== activeHubId) {
        setInternalSelectedHubId(targetId);
        onSelectHub?.(searchMatch.hub);
      }
      const desc =
        searchMatch.type === 'area' && searchMatch.area
          ? `Kecamatan ${searchMatch.area.name} ditemukan, dicover oleh Pos Siaga ${searchMatch.hub.name}. Respon kedatangan ${searchMatch.hub.estTime}.`
          : `Pos Siaga ${searchMatch.hub.name} ditemukan. Respon kedatangan ${searchMatch.hub.estTime}.`;
      setSrAnnouncement(desc);
    }
  }, [searchMatch, activeHubId, onSelectHub]);

  const handleSelectHub = (hub: MapHub) => {
    setInternalSelectedHubId(hub.id);
    onSelectHub?.(hub);
    setSrAnnouncement(
      `Pos Siaga ${hub.name} terpilih. Rata-rata respon kedatangan ${hub.estTime}. Kesiapan armada: ${hub.trucks}.`
    );
  };

  const handleRefreshGps = () => {
    setIsRefreshingGps(true);
    setTimeout(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const msg = `GPS Satelit terupdate pukul ${timeStr} WIB. Seluruh 11 unit armada siaga terhubung.`;
      setLastSyncTime(`GPS Terupdate Pukul ${timeStr} WIB`);
      setIsRefreshingGps(false);
      setSrAnnouncement(msg);
    }, 600);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => {
      const next = Math.min(prev + 0.25, 2);
      setSrAnnouncement(`Perbesaran peta ${Math.round(next * 100)}%`);
      return next;
    });
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(prev - 0.25, 0.75);
      setSrAnnouncement(`Perbesaran peta ${Math.round(next * 100)}%`);
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setSrAnnouncement('Ukuran peta dikembalikan ke 100%');
  };

  // Keyboard navigation for hub selection chips (ArrowLeft, ArrowRight, Home, End)
  const handleChipKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % allChipItems.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + allChipItems.length) % allChipItems.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = allChipItems.length - 1;
    }

    if (nextIndex >= 0) {
      const target = allChipItems[nextIndex];
      if (target.isAll) {
        setSearchInput('');
        setInternalSelectedHubId('kota-bogor');
        setSrAnnouncement('Semua Pos Siaga terpilih. Menampilkan 5 simpul pos armada di Bogor.');
      } else if (target.hub) {
        setSearchInput('');
        handleSelectHub(target.hub);
      }
      const buttons = chipsListRef.current?.querySelectorAll<HTMLButtonElement>('.hub-filter-chip');
      buttons?.[nextIndex]?.focus();
      buttons?.[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  // Keyboard navigation for View Mode toggle (Radar vs Google Maps)
  const handleViewModeKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentMode: 'radar' | 'google') => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const newMode = currentMode === 'radar' ? 'google' : 'radar';
      setViewMode(newMode);
      setSrAnnouncement(`Beralih ke tampilan ${newMode === 'radar' ? 'Radar Digital Vektor' : 'Google Maps Satelit'}.`);
      const buttons = viewModeRef.current?.querySelectorAll<HTMLButtonElement>('.hub-mode-btn');
      const targetBtn = newMode === 'radar' ? buttons?.[0] : buttons?.[1];
      targetBtn?.focus();
    }
  };

  // Keyboard navigation for primary hub markers on the SVG map
  const handleSvgMarkerKeyDown = (e: React.KeyboardEvent<SVGGElement>, hub: MapHub, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelectHub(hub);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % hubs.length;
      handleSelectHub(hubs[nextIndex]);
      const nextElem = document.getElementById(`svg-hub-marker-${hubs[nextIndex].id}`);
      nextElem?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + hubs.length) % hubs.length;
      handleSelectHub(hubs[prevIndex]);
      const prevElem = document.getElementById(`svg-hub-marker-${hubs[prevIndex].id}`);
      prevElem?.focus();
    }
  };

  return (
    <div
      className={`interactive-hub-map-component ${className}`}
      id="interactive-service-hub-map"
      role="region"
      aria-label="Peta Interaktif Pos Siaga & Armada Mitra Bersih Bogor"
    >
      {/* Screen Reader Announcement Live Region */}
      <div
        className="sr-only"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0
        }}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {srAnnouncement}
      </div>

      {/* Top Search & Filter Control Bar */}
      <div className="hub-map-controls-card">
        <div className="hub-map-search-row" role="search" aria-label="Pencarian Pos Siaga & Area Bogor">
          <div className="hub-map-search-wrapper">
            <i className="fas fa-search hub-map-search-icon" aria-hidden="true"></i>
            <input
              type="text"
              id="hub-map-search-input"
              role="searchbox"
              className="hub-map-search-input"
              placeholder="Cari kecamatan, pos siaga, atau area di Bogor... (contoh: Cibinong, Pajajaran, Dramaga, Ciawi, Puncak, Parung)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              aria-label="Cari pos siaga atau kecamatan di Bogor"
              aria-controls="hub-search-feedback"
              aria-describedby="hub-search-hint"
            />
            <span id="hub-search-hint" style={{ display: 'none' }}>
              Ketik nama kecamatan atau pos siaga untuk langsung menyorot pos armada terdekat
            </span>
            {searchInput && (
              <button
                type="button"
                className="hub-map-search-clear"
                onClick={() => {
                  setSearchInput('');
                  setSrAnnouncement('Pencarian dihapus. Menampilkan seluruh pos siaga.');
                }}
                title="Hapus pencarian pos siaga"
                aria-label="Hapus kata kunci pencarian pos siaga"
              >
                <i className="fas fa-times" aria-hidden="true"></i>
              </button>
            )}
          </div>

          <div className="hub-map-gps-indicator">
            <button
              type="button"
              className="hub-gps-btn"
              onClick={handleRefreshGps}
              title="Perbarui sinyal satelit armada"
              aria-label={`Segarkan sinyal satelit armada. Status saat ini: ${lastSyncTime}`}
              aria-busy={isRefreshingGps}
            >
              <span className="hub-gps-pulse-dot" aria-hidden="true"></span>
              <i className={`fas fa-satellite ${isRefreshingGps ? 'fa-spin' : ''}`} aria-hidden="true"></i>
              <span className="hub-gps-text">{lastSyncTime}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Search Feedback Toast / Banner */}
        {searchInput.trim() && (
          <div className="hub-map-search-feedback fade-in" id="hub-search-feedback" role="status" aria-live="polite">
            {searchMatch ? (
              <div className="hub-match-banner success">
                <i className="fas fa-check-circle text-green-500" aria-hidden="true"></i>
                <div>
                  <strong>
                    {searchMatch.type === 'area' && searchMatch.area
                      ? `Kecamatan ${searchMatch.area.name}`
                      : searchMatch.hub.name}
                  </strong>{' '}
                  tercover prioritas oleh <strong>{searchMatch.hub.name}</strong>. Estimasi kedatangan armada:{' '}
                  <span className="hub-badge-eta">{searchMatch.hub.estTime}</span>
                </div>
              </div>
            ) : (
              <div className="hub-match-banner warning">
                <i className="fas fa-info-circle text-amber-500" aria-hidden="true"></i>
                <span>
                  Tidak menemukan kecocokan spesifik untuk &ldquo;{searchInput}&rdquo;. Menampilkan seluruh 5 simpul
                  pos armada siaga di Bogor.
                </span>
              </div>
            )}
          </div>
        )}

        {/* Dynamic Hub Selection Chips with Roving TabIndex & Keyboard Arrow Navigation */}
        <div
          ref={chipsListRef}
          className="hub-chips-scroll"
          role="tablist"
          aria-label="Pilih Pos Siaga Armada Bogor (Gunakan tombol Panah Kiri dan Kanan untuk berpindah)"
        >
          {/* All Hubs Chip */}
          <button
            type="button"
            id="hub-tab-all"
            role="tab"
            aria-selected={activeChipIndex === 0}
            tabIndex={activeChipIndex === 0 ? 0 : -1}
            aria-controls="hub-details-panel"
            className={`hub-filter-chip ${activeChipIndex === 0 ? 'active' : ''}`}
            onClick={() => {
              setSearchInput('');
              setInternalSelectedHubId('kota-bogor');
              setSrAnnouncement('Semua Pos Siaga terpilih. Menampilkan 5 hub siaga di Bogor.');
            }}
            onKeyDown={(e) => handleChipKeyDown(e, 0)}
            aria-label="Semua 5 Pos Siaga Armada Bogor, total 11 unit armada"
            title="Tampilkan semua pos siaga di Bogor"
          >
            <i className="fas fa-layer-group" aria-hidden="true"></i>
            <span>Semua Pos (5 Hubs)</span>
            <span className="hub-chip-count" aria-hidden="true">11 Unit</span>
          </button>

          {/* Individual Hub Chips */}
          {hubs.map((hub, index) => {
            const isSelected = activeHub.id === hub.id;
            const coord = HUB_CANVAS_COORDINATES[hub.id];
            const chipIndex = index + 1;
            const isCurrentFocusable = activeChipIndex === chipIndex;

            return (
              <button
                key={hub.id}
                id={`hub-tab-${hub.id}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                tabIndex={isCurrentFocusable ? 0 : -1}
                aria-controls="hub-details-panel"
                data-hub-id={hub.id}
                className={`hub-filter-chip ${isSelected ? 'active' : ''}`}
                onClick={() => {
                  setSearchInput('');
                  handleSelectHub(hub);
                }}
                onKeyDown={(e) => handleChipKeyDown(e, chipIndex)}
                aria-label={`Pos Siaga ${hub.name}, respon kedatangan ${hub.estTime}, kesiapan armada ${hub.trucks}`}
                title={`Pilih ${hub.name} (Respon: ${hub.estTime})`}
              >
                <span className="hub-chip-dot" style={{ backgroundColor: coord?.color || '#FFD60A' }} aria-hidden="true"></span>
                <span className="hub-chip-label">{hub.shortLabel}</span>
                <span className="hub-chip-badge" aria-hidden="true">{hub.badge.replace(/^Pos Siaga\s*/, '')}</span>
                {isSelected && <span className="hub-chip-active-glow" aria-hidden="true"></span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Map & Details Split Layout */}
      <div className="hub-map-grid">
        {/* Map Viewport Area */}
        <div className="hub-map-canvas-wrapper" role="region" aria-label="Kanvas Peta Visual Pos Siaga Bogor">
          <div className="hub-map-top-bar">
            <div className="hub-map-title-wrap">
              <span className="hub-radar-live-icon" aria-hidden="true">
                <span className="hub-radar-sweep-anim"></span>
                <i className="fas fa-radar"></i>
              </span>
              <div>
                <h4 className="hub-map-canvas-title">Radar Visual Armada &amp; Pos Siaga Bogor</h4>
                <p className="hub-map-canvas-sub">
                  Gunakan tombol Tab atau klik titik pos untuk menyorot zona jangkauan 24 jam.
                </p>
              </div>
            </div>

            <div className="hub-map-actions">
              {/* View Mode Toggle with Tablist and Arrow Navigation */}
              <div
                ref={viewModeRef}
                className="hub-view-mode-toggle"
                role="tablist"
                aria-label="Pilihan Mode Tampilan Peta"
              >
                <button
                  type="button"
                  id="hub-tab-view-radar"
                  role="tab"
                  aria-selected={viewMode === 'radar'}
                  tabIndex={viewMode === 'radar' ? 0 : -1}
                  aria-controls="hub-viewport-radar"
                  className={`hub-mode-btn ${viewMode === 'radar' ? 'active' : ''}`}
                  onClick={() => {
                    setViewMode('radar');
                    setSrAnnouncement('Beralih ke tampilan radar digital visual.');
                  }}
                  onKeyDown={(e) => handleViewModeKeyDown(e, 'radar')}
                  title="Peta Vektor Radar Digital"
                  aria-label="Tampilan Radar Digital Vektor"
                >
                  <i className="fas fa-compass" aria-hidden="true"></i> Radar Digital
                </button>
                <button
                  type="button"
                  id="hub-tab-view-google"
                  role="tab"
                  aria-selected={viewMode === 'google'}
                  tabIndex={viewMode === 'google' ? 0 : -1}
                  aria-controls="hub-viewport-google"
                  className={`hub-mode-btn ${viewMode === 'google' ? 'active' : ''}`}
                  onClick={() => {
                    setViewMode('google');
                    setSrAnnouncement('Beralih ke tampilan Google Maps satelit.');
                  }}
                  onKeyDown={(e) => handleViewModeKeyDown(e, 'google')}
                  title="Peta Google Maps Satelit"
                  aria-label="Tampilan Google Maps Satelit"
                >
                  <i className="fas fa-map-location-dot" aria-hidden="true"></i> Google Maps
                </button>
              </div>

              {/* Zoom Controls with Clear ARIA Labels */}
              {viewMode === 'radar' && (
                <div className="hub-zoom-controls" role="toolbar" aria-label="Kontrol perbesaran peta radar">
                  <button
                    type="button"
                    onClick={handleZoomIn}
                    title="Perbesar Peta (Zoom in)"
                    aria-label="Perbesar peta radar"
                  >
                    <i className="fas fa-plus" aria-hidden="true"></i>
                  </button>
                  <button
                    type="button"
                    onClick={handleZoomOut}
                    title="Perkecil Peta (Zoom out)"
                    aria-label="Perkecil peta radar"
                  >
                    <i className="fas fa-minus" aria-hidden="true"></i>
                  </button>
                  <button
                    type="button"
                    onClick={handleResetZoom}
                    title="Reset Ukuran Peta (100%)"
                    aria-label="Reset ukuran peta radar ke 100%"
                  >
                    <i className="fas fa-compress" aria-hidden="true"></i>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Interactive SVG Radar Map or Google Maps Iframe */}
          <div className="hub-viewport-container">
            {viewMode === 'radar' ? (
              <div
                id="hub-viewport-radar"
                role="tabpanel"
                aria-labelledby="hub-tab-view-radar"
                className="hub-svg-container"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: `${HUB_CANVAS_COORDINATES[activeHub.id]?.x || 500}px ${HUB_CANVAS_COORDINATES[activeHub.id]?.y || 340}px`,
                  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <svg
                  className="hub-svg-canvas"
                  viewBox="0 0 1000 650"
                  preserveAspectRatio="xMidYMid meet"
                  role="region"
                  aria-label="Peta Interaktif Pos Siaga dan Cakupan Wilayah Bogor"
                  aria-describedby="hub-svg-guide"
                  tabIndex={0}
                >
                  <desc id="hub-svg-guide">
                    Peta interaktif menampilkan 5 pos siaga utama di Bogor (Kota Bogor, Cibinong, Dramaga, Ciawi, Parung).
                    Gunakan tombol Tab atau panah untuk menelusuri tiap titik pos, tekan Enter atau Spasi untuk memilih pos.
                  </desc>
                  <defs>
                    <pattern id="hub-grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 214, 10, 0.07)" strokeWidth="0.8" />
                    </pattern>
                    <linearGradient id="hub-artery-road" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#FFD60A" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="hub-river-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#0284C7" stopOpacity="0.3" />
                    </linearGradient>

                    {/* Radial Gradients for Service Hub Coverage Highlights */}
                    {Object.entries(HUB_CANVAS_COORDINATES).map(([id, info]) => (
                      <radialGradient key={`grad-${id}`} id={`hub-coverage-${id}`} cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor={info.color} stopOpacity="0.45" />
                        <stop offset="60%" stopColor={info.color} stopOpacity="0.18" />
                        <stop offset="100%" stopColor={info.color} stopOpacity="0" />
                      </radialGradient>
                    ))}

                    <filter id="hub-glow" x="-40%" y="-40%" width="180%" height="180%">
                      <feGaussianBlur stdDeviation="8" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Dark Map Base */}
                  <rect width="1000" height="650" fill="#09101F" />
                  <rect width="1000" height="650" fill="url(#hub-grid-pattern)" />

                  {/* Greater Bogor Terrain / Mountain Shapes (Gunung Salak & Pangrango to South) */}
                  <path
                    d="M 120 650 Q 250 520 400 580 T 650 560 Q 820 500 950 650 Z"
                    fill="rgba(15, 23, 42, 0.7)"
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 220 650 Q 340 560 480 610 T 780 650 Z"
                    fill="rgba(30, 41, 59, 0.5)"
                    stroke="rgba(255, 214, 10, 0.08)"
                    strokeWidth="1"
                  />
                  {/* Mountain Peak Icons */}
                  <g opacity="0.35" aria-hidden="true">
                    <path d="M 320 570 L 335 540 L 350 570 Z" fill="#64748B" />
                    <text x="335" y="585" fill="#94A3B8" fontSize="10" textAnchor="middle">
                      Gn. Salak
                    </text>
                    <path d="M 750 540 L 765 510 L 780 540 Z" fill="#64748B" />
                    <text x="765" y="555" fill="#94A3B8" fontSize="10" textAnchor="middle">
                      Gn. Pangrango
                    </text>
                  </g>

                  {/* River Flow: Sungai Ciliwung */}
                  <path
                    d="M 520 0 Q 510 180 500 270 T 520 380 T 490 510 T 680 650"
                    fill="none"
                    stroke="url(#hub-river-grad)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    aria-hidden="true"
                  />
                  {/* River Flow: Sungai Cisadane */}
                  <path
                    d="M 330 0 Q 320 150 310 280 T 340 420 T 260 560"
                    fill="none"
                    stroke="url(#hub-river-grad)"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                  />

                  {/* Main Highways & Transit Arteries */}
                  <path
                    d="M 690 0 L 685 160 L 720 250 L 590 360 L 675 480 L 850 650"
                    fill="none"
                    stroke="url(#hub-artery-road)"
                    strokeWidth="4"
                    strokeDasharray="9 4"
                    aria-hidden="true"
                  />
                  <path
                    d="M 720 250 L 560 290 L 460 315 L 340 370"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.4)"
                    strokeWidth="3.5"
                    strokeDasharray="6 3"
                    aria-hidden="true"
                  />
                  <path
                    d="M 330 0 L 345 140 L 430 250 L 485 330"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.35)"
                    strokeWidth="3"
                    aria-hidden="true"
                  />
                  <path
                    d="M 675 480 Q 750 510 830 550 T 920 620"
                    fill="none"
                    stroke="rgba(255, 214, 10, 0.55)"
                    strokeWidth="3"
                    strokeDasharray="5 3"
                    aria-hidden="true"
                  />

                  {/* DYNAMIC SERVICE HUB COVERAGE RADIUS */}
                  {hubs.map((hub) => {
                    const coord = HUB_CANVAS_COORDINATES[hub.id];
                    if (!coord) return null;
                    const isSelected = activeHub.id === hub.id;

                    return (
                      <g key={`coverage-${hub.id}`} className="hub-coverage-group" aria-hidden="true">
                        {/* Coverage circle zone */}
                        <circle
                          cx={coord.x}
                          cy={coord.y}
                          r={isSelected ? coord.r * 1.15 : coord.r}
                          fill={`url(#hub-coverage-${hub.id})`}
                          stroke={coord.color}
                          strokeWidth={isSelected ? 2.5 : 1}
                          strokeDasharray={isSelected ? '6 4' : '3 3'}
                          opacity={isSelected ? 1 : 0.3}
                          style={{
                            transition: 'all 0.5s ease',
                            cursor: 'pointer'
                          }}
                          onClick={() => handleSelectHub(hub)}
                        />

                        {/* Animated Radar Pulse Waves around the active hub */}
                        {isSelected && (
                          <>
                            <circle
                              cx={coord.x}
                              cy={coord.y}
                              r={coord.r * 0.7}
                              fill="none"
                              stroke={coord.color}
                              strokeWidth="2"
                              opacity="0.8"
                              className="hub-radar-pulse-ring-1"
                            />
                            <circle
                              cx={coord.x}
                              cy={coord.y}
                              r={coord.r * 1.1}
                              fill="none"
                              stroke={coord.color}
                              strokeWidth="1.5"
                              opacity="0.5"
                              className="hub-radar-pulse-ring-2"
                            />
                          </>
                        )}
                      </g>
                    );
                  })}

                  {/* Connected Arterial Routes from Hub to Key Towns when Active */}
                  {activeHub && (() => {
                    const c = HUB_CANVAS_COORDINATES[activeHub.id];
                    if (!c) return null;
                    return (
                      <g className="hub-connecting-corridors" aria-hidden="true">
                        {districtsForActiveHub.slice(0, 5).map((d, i) => {
                          const angle = (i / 5) * 2 * Math.PI;
                          const targetX = c.x + Math.cos(angle) * (c.r * 0.85);
                          const targetY = c.y + Math.sin(angle) * (c.r * 0.85);
                          return (
                            <line
                              key={`line-${d.name}`}
                              x1={c.x}
                              y1={c.y}
                              x2={targetX}
                              y2={targetY}
                              stroke="#FFD60A"
                              strokeWidth="1.5"
                              strokeDasharray="4 4"
                              className="hub-connecting-dash-anim"
                              opacity="0.65"
                            />
                          );
                        })}
                      </g>
                    );
                  })()}

                  {/* Kecamatan Boundary Anchor Markers for the Active Hub */}
                  {districtsForActiveHub.map((d, i) => {
                    const c = HUB_CANVAS_COORDINATES[activeHub.id];
                    if (!c) return null;
                    const angle = (i / Math.max(districtsForActiveHub.length, 1)) * 2 * Math.PI;
                    const px = c.x + Math.cos(angle) * (c.r * 0.78);
                    const py = c.y + Math.sin(angle) * (c.r * 0.78);

                    return (
                      <g key={`area-node-${d.name}`} className="hub-district-node fade-in" aria-hidden="true">
                        <circle cx={px} cy={py} r="4.5" fill="#FFD60A" stroke="#09101F" strokeWidth="1.5" />
                        <text
                          x={px}
                          y={py - 8}
                          fill="#F1F5F9"
                          fontSize="9.5"
                          fontWeight="700"
                          textAnchor="middle"
                          className="hub-district-label"
                        >
                          {d.name}
                        </text>
                      </g>
                    );
                  })}

                  {/* POS ARMADA INTERACTIVE PINS (17 sub-hubs from data with keyboard navigation) */}
                  {POS_ARMADA_MARKERS.map((pos) => {
                    const posX = (pos.x / 100) * 1000;
                    const posY = (pos.y / 100) * 650;
                    const isParentHubActive = activeHub.id === pos.hubId;
                    const parentHub = hubs.find((h) => h.id === pos.hubId);

                    return (
                      <g
                        key={pos.id}
                        role="button"
                        tabIndex={0}
                        aria-label={`Sub-pos armada ${pos.name}, simpul ${parentHub?.shortLabel || ''}. Tekan Spasi atau Enter untuk memilih pos ini.`}
                        className={`hub-pos-marker ${isParentHubActive ? 'is-active-zone' : 'dimmed'}`}
                        opacity={isParentHubActive ? 1 : 0.35}
                        style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                        onClick={() => {
                          if (parentHub) handleSelectHub(parentHub);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            if (parentHub) handleSelectHub(parentHub);
                          }
                        }}
                      >
                        <circle
                          cx={posX}
                          cy={posY}
                          r={isParentHubActive ? 6 : 4}
                          fill={isParentHubActive ? '#38BDF8' : '#64748B'}
                          stroke="#09101F"
                          strokeWidth="2"
                        />
                      </g>
                    );
                  })}

                  {/* MAIN SERVICE HUBS MARKERS (The 5 Key Nodes with ARIA attributes and Keyboard navigation) */}
                  {hubs.map((hub, index) => {
                    const coord = HUB_CANVAS_COORDINATES[hub.id];
                    if (!coord) return null;
                    const isSelected = activeHub.id === hub.id;

                    return (
                      <g
                        key={`hub-marker-${hub.id}`}
                        id={`svg-hub-marker-${hub.id}`}
                        role="button"
                        tabIndex={0}
                        aria-pressed={isSelected}
                        aria-label={`Titik Pos Siaga ${hub.name}. Respon kedatangan: ${hub.estTime}. Armada standby: ${hub.trucks}. Alamat: ${hub.address}. Tekan Spasi atau Enter untuk menyorot pos ini.`}
                        className={`hub-primary-marker ${isSelected ? 'active' : ''}`}
                        transform={`translate(${coord.x}, ${coord.y})`}
                        onClick={() => handleSelectHub(hub)}
                        onKeyDown={(e) => handleSvgMarkerKeyDown(e, hub, index)}
                        onMouseEnter={() => setHoveredHubId(hub.id)}
                        onMouseLeave={() => setHoveredHubId(null)}
                        onFocus={() => setHoveredHubId(hub.id)}
                        onBlur={() => setHoveredHubId(null)}
                        style={{ cursor: 'pointer' }}
                      >
                        {/* Glowing beacon ring */}
                        <circle
                          r={isSelected ? 26 : 18}
                          fill={coord.color}
                          opacity={isSelected ? 0.35 : 0.15}
                          filter={isSelected ? 'url(#hub-glow)' : undefined}
                          className={isSelected ? 'hub-marker-ping-anim' : ''}
                          aria-hidden="true"
                        />

                        {/* Outer Pin Circle */}
                        <circle
                          r={isSelected ? 18 : 14}
                          fill="#0F172A"
                          stroke={coord.color}
                          strokeWidth={isSelected ? 3.5 : 2}
                          className="hub-marker-core-circle"
                          aria-hidden="true"
                        />

                        {/* Warehouse / Hub Icon */}
                        <circle r={isSelected ? 8 : 6} fill={coord.color} aria-hidden="true" />

                        {/* Interactive Tooltip & Label */}
                        <g transform={`translate(0, ${isSelected ? -28 : -22})`} aria-hidden="true">
                          <rect
                            x="-65"
                            y="-14"
                            width="130"
                            height="24"
                            rx="12"
                            fill="#0F172A"
                            stroke={isSelected ? coord.color : 'rgba(255, 255, 255, 0.25)'}
                            strokeWidth={isSelected ? 2 : 1}
                            className="hub-label-card-rect"
                          />
                          <text
                            x="0"
                            y="2"
                            fill={isSelected ? '#FFD60A' : '#FFFFFF'}
                            fontSize={isSelected ? '11' : '10'}
                            fontWeight="800"
                            textAnchor="middle"
                            className="hub-label-card-text"
                          >
                            {hub.shortLabel}
                          </text>
                        </g>

                        {/* Fleet Count Badge */}
                        <g transform={`translate(${isSelected ? 16 : 12}, ${isSelected ? -16 : -12})`} aria-hidden="true">
                          <circle r="8.5" fill="#22C55E" stroke="#09101F" strokeWidth="1.5" />
                          <text x="0" y="3" fill="#FFFFFF" fontSize="8.5" fontWeight="900" textAnchor="middle">
                            {hub.id === 'kota-bogor' ? '3' : '2'}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </svg>

                {/* Map Bottom Legend Strip */}
                <div className="hub-canvas-legend-strip" role="list" aria-label="Legenda Simpul Pos Siaga">
                  <div className="hub-legend-item" role="listitem">
                    <span className="hub-legend-dot pos-hq" aria-hidden="true"></span>
                    <span>Pusat Workshop (Kota Bogor)</span>
                  </div>
                  <div className="hub-legend-item" role="listitem">
                    <span className="hub-legend-dot pos-east" aria-hidden="true"></span>
                    <span>Pos Timur (Cibinong)</span>
                  </div>
                  <div className="hub-legend-item" role="listitem">
                    <span className="hub-legend-dot pos-west" aria-hidden="true"></span>
                    <span>Pos Barat (Dramaga)</span>
                  </div>
                  <div className="hub-legend-item" role="listitem">
                    <span className="hub-legend-dot pos-south" aria-hidden="true"></span>
                    <span>Pos Selatan (Ciawi)</span>
                  </div>
                  <div className="hub-legend-item" role="listitem">
                    <span className="hub-legend-dot pos-north" aria-hidden="true"></span>
                    <span>Pos Utara (Parung)</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Google Maps Iframe Mode */
              <div
                id="hub-viewport-google"
                role="tabpanel"
                aria-labelledby="hub-tab-view-google"
                className="hub-gmaps-iframe-view"
              >
                <iframe
                  title={`Google Maps Pos ${activeHub.name}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(activeHub.mapQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>

          {/* Coordinates footer */}
          <div className="hub-map-footer-bar">
            <div className="hub-coords-info" aria-label={`Koordinat GPS ${activeHub.name}`}>
              <i className="fas fa-location-crosshairs text-yellow-500" aria-hidden="true"></i>
              <span>
                Simpul Terpilih: <strong>{activeHub.name}</strong> • Lat: {activeHub.coordinates.lat}, Lng:{' '}
                {activeHub.coordinates.lng}
              </span>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeHub.mapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hub-nav-external-btn"
              title={`Buka rute navigasi ${activeHub.name} di Google Maps`}
              aria-label={`Buka rute navigasi pos ${activeHub.name} di Google Maps (terbuka di tab baru)`}
            >
              <i className="fas fa-arrow-up-right-from-square" aria-hidden="true"></i> Buka di Google Maps
            </a>
          </div>
        </div>

        {/* Selected Hub Live Status & Dispatch Card */}
        <div
          id="hub-details-panel"
          className="hub-details-panel"
          role="region"
          aria-labelledby={`hub-tab-${activeHub.id}`}
          aria-label={`Detail status dan spesifikasi armada ${activeHub.name}`}
        >
          <div className="hub-panel-header">
            <div className="hub-panel-tag-row">
              <span className="hub-panel-badge">{activeHub.badge}</span>
              <span className="hub-online-status" aria-label="Status operasional siaga 24 jam nonstop">
                <span className="hub-online-dot" aria-hidden="true"></span> SIAGA 24 JAM
              </span>
            </div>

            <h3 className="hub-panel-title">{activeHub.name}</h3>

            <div className="hub-panel-eta-card" role="group" aria-label="Informasi estimasi waktu respon">
              <div className="hub-eta-left">
                <i className="fas fa-stopwatch" aria-hidden="true"></i>
                <div>
                  <span className="hub-eta-label">Rata-Rata Respon Kedatangan:</span>
                  <strong className="hub-eta-time">{activeHub.estTime}</strong>
                </div>
              </div>
              <div className="hub-eta-badge" aria-hidden="true">Tiba Kilat</div>
            </div>
          </div>

          <div className="hub-panel-body">
            {/* Address */}
            <div className="hub-spec-item">
              <div className="hub-spec-icon" aria-hidden="true">
                <i className="fas fa-warehouse"></i>
              </div>
              <div className="hub-spec-content">
                <label id="hub-address-label">Alamat Pangkalan / Pool Armada:</label>
                <p aria-labelledby="hub-address-label">{activeHub.address}</p>
              </div>
            </div>

            {/* Standby Fleet */}
            <div className="hub-spec-item">
              <div className="hub-spec-icon" aria-hidden="true">
                <i className="fas fa-truck-fast"></i>
              </div>
              <div className="hub-spec-content">
                <label id="hub-trucks-label">Kesiapan Armada Truk Standby:</label>
                <p aria-labelledby="hub-trucks-label">{activeHub.trucks}</p>
              </div>
            </div>

            {/* Coverage Summary & Interactive Keyboard Accessible District Chips */}
            <div className="hub-spec-item">
              <div className="hub-spec-icon" aria-hidden="true">
                <i className="fas fa-map-location"></i>
              </div>
              <div className="hub-spec-content">
                <label id="hub-coverage-label">
                  Cakupan Kecamatan Tercover ({districtsForActiveHub.length} Kecamatan):
                </label>
                <div
                  className="hub-district-chips-wrap"
                  role="group"
                  aria-labelledby="hub-coverage-label"
                >
                  {districtsForActiveHub.map((d) => (
                    <button
                      type="button"
                      key={d.name}
                      className={`hub-district-chip ${
                        searchInput.trim() && d.name.toLowerCase().includes(searchInput.trim().toLowerCase())
                          ? 'matched'
                          : ''
                      }`}
                      onClick={() => {
                        setSearchInput(d.name);
                        setSrAnnouncement(`Memfilter jangkauan ke kecamatan ${d.name}.`);
                      }}
                      title={`Klik untuk fokuskan jangkauan ke ${d.name}`}
                      aria-label={`Fokuskan pencarian ke kecamatan ${d.name}`}
                    >
                      <i className="fas fa-check-circle" aria-hidden="true"></i> {d.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="hub-panel-actions" role="group" aria-label="Aksi panggilan cepat armada">
            <a
              href={`https://wa.me/6285715654183?text=${encodeURIComponent(
                `Halo Mitra Bersih 24 Jam,\nSaya ingin order armada sedot WC dari *${activeHub.name}* (${activeHub.shortLabel}).\nMohon info kedatangan dan cek ketersediaan armada terdekat ke wilayah saya di Bogor. Terima kasih!`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hub-dispatch-btn"
              title={`Panggil Armada dari ${activeHub.shortLabel} via WhatsApp`}
              aria-label={`Panggil armada sedot WC dari ${activeHub.name} via WhatsApp (membuka chat WhatsApp)`}
            >
              <i className="fab fa-whatsapp" aria-hidden="true"></i>
              <span>Panggil Armada Pos Ini via WA</span>
            </a>

            <a
              href="tel:+6285715654183"
              className="hub-call-hotline-btn"
              title="Hubungi Panggilan Telepon Darurat"
              aria-label="Telepon hotline darurat 24 jam ke nomor +62 857-1565-4183"
            >
              <i className="fas fa-phone-alt" aria-hidden="true"></i>
              <span>Hotline 24 Jam</span>
            </a>

            <a
              href="#jadwal-booking"
              className="hub-booking-btn"
              title="Pesan Tanggal Layanan di Kalender Pemesanan"
              aria-label="Pesan tanggal layanan di kalender pemesanan terintegrasi armada"
            >
              <i className="fas fa-calendar-alt" aria-hidden="true"></i>
              <span>Pesan Tanggal di Kalender</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ServiceHubMap = InteractiveHubMap;
export default InteractiveHubMap;
