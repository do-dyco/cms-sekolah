import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp, router } from '@inertiajs/react';
import '../css/site.css';

const pages = import.meta.glob('./Site/Pages/*.tsx', { eager: true }) as Record<string, { default: React.ComponentType<any> }>;

router.on('invalid', (event) => {
  event.preventDefault();
  window.location.reload();
});

router.on('exception', () => window.location.reload());

createInertiaApp({
  title: (t) => `${t} | MTS Tadibbul Ummah`,
  resolve: (name) => pages[`./Site/Pages/${name.replace(/^Site\//, '')}.tsx`],
  setup({ el, App, props }) {
    if (el) createRoot(el).render(<App {...props} />);
  },
});
