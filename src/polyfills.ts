// Minimal polyfills for Angular 20 targeting evergreen browsers

// Zone JS is required by Angular unless you opt-in to zoneless change detection
import 'zone.js';

// Some libraries expect a Node-like global
(window as any).global = window;

// Safety shim for older SVG contains in some environments
if (typeof (SVGElement as any).prototype.contains === 'undefined') {
  (SVGElement as any).prototype.contains = (HTMLDivElement as any).prototype.contains;
}
