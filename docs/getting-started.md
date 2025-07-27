# Getting Started

This project provides the Swiss Ephemeris compiled to WebAssembly so it can be used directly in modern browsers. The package exposes an ES module API that loads the `swisseph.wasm` file on demand.

## Installation

```bash
npm install swisseph
```

## Building from source

If you are working on the library itself you can rebuild the WebAssembly bundle and TypeScript sources using:

```bash
npm run build
```

This requires `emcc` from the Emscripten SDK to be available in your `PATH`.

## Usage

```javascript
import { swe_julday } from 'swisseph';

const jd = await swe_julday(2024, 1, 1, 0, 1);
console.log(jd);
```
