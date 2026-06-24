// Mapa estilizado de Belo Horizonte — baseado nas principais vias e bairros
// Coordenadas aproximadas da região central de BH
// Centro: Praça 7, Savassi, Funcionários, Lourdes, Centro, Santa Efigênia, etc.

function MapaBH() {
  return (
    <svg
      viewBox="0 0 1400 780"
      xmlns="http://www.w3.org/2000/svg"
      className="mapa-bh-svg"
      aria-hidden="true"
    >
      {/* ── Fundo (terreno) ── */}
      <rect width="1400" height="780" fill="#e8f0e4" />

      {/* ── Áreas verdes (parques) ── */}
      {/* Parque Municipal */}
      <ellipse cx="610" cy="310" rx="60" ry="38" fill="#c7ddb8" opacity="0.9" />
      {/* Mangabeiras */}
      <ellipse cx="720" cy="560" rx="90" ry="55" fill="#b8d4a8" opacity="0.85" />
      {/* Parque Estadual */}
      <ellipse cx="210" cy="480" rx="70" ry="50" fill="#c0d9aa" opacity="0.8" />
      {/* Pampulha Lake (simplified) */}
      <ellipse cx="500" cy="90" rx="130" ry="50" fill="#a8c8e8" opacity="0.7" />
      <text x="500" y="95" textAnchor="middle" fill="#5a8fb0" fontSize="11" fontWeight="600" fontFamily="Inter,sans-serif">Lagoa da Pampulha</text>

      {/* ── Água (Ribeirão Arrudas) ── */}
      <path d="M 0 430 Q 200 415 400 425 Q 600 435 800 420 Q 1000 410 1200 415 L 1400 418 L 1400 435 Q 1200 430 1000 425 Q 800 435 600 450 Q 400 440 200 432 Q 100 428 0 445 Z"
        fill="#b8d4ea" opacity="0.6" />

      {/* ── Vias principais (Avenidas) ── */}

      {/* Av. Afonso Pena (horizontal central) */}
      <path d="M 80 340 L 1320 338" stroke="#f4a460" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M 80 340 L 1320 338" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeDasharray="20,18" fill="none" opacity="0.5" />

      {/* Av. do Contorno (anel oval) */}
      <ellipse cx="700" cy="370" rx="340" ry="200" fill="none" stroke="#e8934a" strokeWidth="9" opacity="0.85" />
      <ellipse cx="700" cy="370" rx="340" ry="200" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="16,14" opacity="0.4" />

      {/* Av. Amazonas (diagonal NW-SE) */}
      <path d="M 120 200 Q 400 310 600 400 Q 750 470 900 560" stroke="#f4a460" strokeWidth="6" strokeLinecap="round" fill="none" />

      {/* Av. Cristóvão Colombo */}
      <path d="M 820 100 Q 810 200 790 320 Q 775 420 760 520" stroke="#f0984a" strokeWidth="5" strokeLinecap="round" fill="none" />

      {/* Av. Brasil */}
      <path d="M 300 120 Q 360 230 410 350 Q 450 440 480 560" stroke="#f0984a" strokeWidth="5" strokeLinecap="round" fill="none" />

      {/* Av. Raja Gabaglia */}
      <path d="M 200 480 Q 380 500 560 490 Q 680 485 800 510 Q 920 530 1050 560" stroke="#e8934a" strokeWidth="5" strokeLinecap="round" fill="none" />

      {/* Av. Nossa Sra. do Carmo */}
      <path d="M 650 550 Q 720 590 820 620 Q 940 650 1100 660" stroke="#dda070" strokeWidth="4" fill="none" />

      {/* Av. Bernardo Monteiro */}
      <path d="M 400 260 L 900 255" stroke="#e8a070" strokeWidth="4.5" fill="none" />

      {/* Av. Barbacena */}
      <path d="M 580 560 Q 620 610 660 670 Q 700 720 720 760" stroke="#dda070" strokeWidth="4" fill="none" />

      {/* Vias secundárias */}
      <path d="M 360 200 L 360 580" stroke="#d4c8a8" strokeWidth="2.5" fill="none" opacity="0.7" />
      <path d="M 480 180 L 480 560" stroke="#d4c8a8" strokeWidth="2.5" fill="none" opacity="0.7" />
      <path d="M 600 160 L 600 540" stroke="#d4c8a8" strokeWidth="2.5" fill="none" opacity="0.7" />
      <path d="M 720 140 L 720 520" stroke="#d4c8a8" strokeWidth="2.5" fill="none" opacity="0.7" />
      <path d="M 850 180 L 850 560" stroke="#d4c8a8" strokeWidth="2.5" fill="none" opacity="0.7" />
      <path d="M 980 200 L 980 540" stroke="#d4c8a8" strokeWidth="2.5" fill="none" opacity="0.7" />
      <path d="M 1100 220 L 1100 520" stroke="#d4c8a8" strokeWidth="2.5" fill="none" opacity="0.7" />

      <path d="M 200 200 L 1200 200" stroke="#d4c8a8" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M 150 280 L 1250 278" stroke="#d4c8a8" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M 150 460 L 1250 458" stroke="#d4c8a8" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M 150 540 L 1250 538" stroke="#d4c8a8" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M 200 620 L 1200 618" stroke="#d4c8a8" strokeWidth="2" fill="none" opacity="0.5" />

      {/* Linhas do Metrô */}
      <path d="M 200 395 Q 500 390 700 388 Q 900 386 1200 392" stroke="#0a6abf" strokeWidth="4.5" strokeLinecap="round" fill="none" opacity="0.8" strokeDasharray="none" />
      {/* Estações metrô */}
      {[300, 460, 570, 680, 790, 900, 1040].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={392} r="5" fill="#0a6abf" />
          <circle cx={x} cy={392} r="3" fill="white" />
        </g>
      ))}

      {/* ── Labels de bairros ── */}
      {[
        { x: 680, y: 248, label: "Centro" },
        { x: 810, y: 420, label: "Savassi" },
        { x: 820, y: 310, label: "Funcionários" },
        { x: 600, y: 440, label: "Lourdes" },
        { x: 550, y: 230, label: "Santa Efigênia" },
        { x: 950, y: 480, label: "Sion" },
        { x: 450, y: 460, label: "Barroca" },
        { x: 980, y: 310, label: "Serra" },
        { x: 1080, y: 400, label: "Mangabeiras" },
        { x: 320, y: 340, label: "Lagoinha" },
        { x: 400, y: 510, label: "Calafate" },
        { x: 680, y: 600, label: "Anchieta" },
        { x: 1160, y: 480, label: "Belvedere" },
        { x: 260, y: 220, label: "Pampulha" },
        { x: 1050, y: 200, label: "Buritis" },
        { x: 750, y: 160, label: "Padre Eustáquio" },
        { x: 1200, y: 320, label: "Gutierrez" },
        { x: 180, y: 380, label: "Carlos Prates" },
      ].map((b, i) => (
        <text
          key={i}
          x={b.x}
          y={b.y}
          textAnchor="middle"
          fill="#5a6a4a"
          fontSize="11"
          fontWeight="600"
          fontFamily="Inter, system-ui, sans-serif"
          opacity="0.85"
        >
          {b.label}
        </text>
      ))}

      {/* ── Label vias principais ── */}
      <text x="700" y="330" textAnchor="middle" fill="#c07030" fontSize="10" fontWeight="700" fontFamily="Inter,sans-serif" opacity="0.9">Av. do Contorno</text>
      <text x="700" y="353" textAnchor="middle" fill="#c07030" fontSize="10.5" fontWeight="700" fontFamily="Inter,sans-serif" opacity="0.9">Av. Afonso Pena</text>

      {/* ── Praça 7 (centro) ── */}
      <rect x="672" y="360" width="18" height="18" rx="3" fill="#d4a870" opacity="0.9" />
      <text x="681" y="394" textAnchor="middle" fill="#8a6030" fontSize="9.5" fontWeight="700" fontFamily="Inter,sans-serif">Praça 7</text>

      {/* ── Quadras (blocos urbanos) — simulados como retângulos pequenos ── */}
      {[
        [360,290,90,50],[460,290,90,50],[560,290,90,50],[660,290,90,50],[760,290,90,50],[860,290,90,50],[960,290,90,50],
        [360,350,90,50],[460,350,90,50],[560,350,90,50],[760,350,90,50],[860,350,90,50],[960,350,90,50],
        [360,220,90,50],[460,220,90,50],[560,220,90,50],[660,220,90,50],[760,220,90,50],[860,220,90,50],
        [460,460,90,50],[560,460,90,50],[660,460,90,50],[760,460,90,50],[860,460,90,50],[960,460,90,50],
        [460,520,90,50],[560,520,90,50],[660,520,90,50],[760,520,90,50],[860,520,90,50],
        [1060,290,90,50],[1160,290,90,50],[1060,350,90,50],[1160,350,90,50],
        [1060,460,90,50],[1160,460,90,50],[1060,400,90,50],
        [260,290,80,50],[260,350,80,50],[260,460,80,50],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="3" fill="#d8e4cc" stroke="#c4d4b4" strokeWidth="0.8" opacity="0.6" />
      ))}

      {/* ── Pin central (Praça 7 / BH) ── */}
      <g transform="translate(681, 340)">
        <circle cx="0" cy="0" r="14" fill="#1d8f5e" opacity="0.25" />
        <circle cx="0" cy="0" r="8" fill="#1d8f5e" />
        <circle cx="0" cy="0" r="3" fill="white" />
      </g>
    </svg>
  );
}

export default MapaBH;
