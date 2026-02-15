# ✨ ThreeJS Test Project

Un visualizzatore 3D fluido e performante, ottimizzato per il web moderno. Questo progetto utilizza **Three.js** con un
layout responsive adattivo e gestione avanzata delle risorse.

## 📋 Caratteristiche

- **Responsive Grid**: Layout dinamico che passa da una visualizzazione a colonne su Desktop a una a righe su Mobile.
- **Performance First**: Rendering ottimizzato con `ResizeObserver` e limitatore di FPS per risparmiare batteria.
- **Zero Flickering**: Sincronizzazione del buffer grafico durante il ridimensionamento della finestra.
- **Smooth Controls**: Controllo della distanza della camera integrato tramite interfaccia UI.

## 🛠️ Tech Stack

- [Three.js](https://threejs.org) - Motore 3D.
- [Vite](https://vitejs.dev) - Next Generation Frontend Tooling.
- [pnpm](https://pnpm.io) - Fast, disk space efficient package manager.

## 🚀 Run

Assicurati di avere [pnpm](https://pnpm.io/installation) installato sul tuo sistema.

   ```bash
   git clone https://github.com/ricbuz94/test-threejs.git && \\
   cd test-threejs && \\
   pnpm dev
