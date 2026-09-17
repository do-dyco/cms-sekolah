import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import '../css/site.css';

const pages = import.meta.glob('./Site/Pages/*.tsx', { eager: true }) as Record<string, { default: React.ComponentType<any> }>;

createInertiaApp({
  title: (t) => `${t} | Sekolah Example`,
  resolve: (name) => pages[`./Site/Pages/${name.replace(/^Site\//, '')}.tsx`],
  setup({ el, App, props }) {
    if (el) createRoot(el).render(<App {...props} />);
  },
});
