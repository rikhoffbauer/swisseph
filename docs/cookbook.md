# Cookbook

This section collects small examples for typical astronomical calculations using the browser build of the Swiss Ephemeris.

## Julian Day from Date

```javascript
import { swe_julday } from 'swisseph';

const jd = await swe_julday(2024, 4, 13, 12.5, 1);
```

## Converting Julian Day back to Calendar Date

```javascript
import { swe_revjul } from 'swisseph';

const date = await swe_revjul(2460400.5, 1);
```

Further recipes will be added as more functions are exposed through the WASM interface.
