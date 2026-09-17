import React from 'react';import{createRoot}from'react-dom/client';import{createInertiaApp}from'@inertiajs/react';import'../css/app.css';
const pages=import.meta.glob('./Pages/**/*.tsx',{eager:true}) as Record<string,{default:React.ComponentType<any>}>;
createInertiaApp({title:t=>`${t} | efoxpro`,resolve:name=>pages[`./Pages/${name}.tsx`],setup({el,App,props}){if(el)createRoot(el).render(<App {...props}/>)}});
