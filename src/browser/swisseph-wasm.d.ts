declare module 'swisseph-wasm' {
  const factory: () => Promise<import('./types').EmscriptenModule>;
  export default factory;
}
