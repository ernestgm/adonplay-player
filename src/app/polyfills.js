// src/polyfills.js

// 1. Polyfill para Shadow DOM y Web Components
if (typeof window !== 'undefined' && !('attachShadow' in Element.prototype)) {
    import('@webcomponents/webcomponentsjs/webcomponents-bundle.js');
}

import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';

if (typeof globalThis === 'undefined') {
    (function() {
        if (typeof self !== 'undefined') self.globalThis = self;
        else if (typeof window !== 'undefined') window.globalThis = window;
        else if (typeof global !== 'undefined') global.globalThis = global;
    })();
}
import 'core-js/stable';
import 'regenerator-runtime/runtime';