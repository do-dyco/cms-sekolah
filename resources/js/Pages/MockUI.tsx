import type { ReactNode } from 'react';

export const card = 'rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-800';
export const input = 'w-full rounded-lg border border-gray-200 bg-transparent px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900';

export function PageHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: ReactNode }) {
  return <div className="mb-6 flex flex-wrap items-end justify-between gap-3"><div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1><p className="mt-1 text-sm text-gray-500">{subtitle}</p></div>{action}</div>;
}

export function LineSvg({ values, color = '#465fff', secondary }: { values: number[]; color?: string; secondary?: number[] }) {
  const points = (v:number[]) => v.map((n,i)=>`${(i/(v.length-1))*100},${100-n}`).join(' ');
  return <svg viewBox="0 0 100 105" preserveAspectRatio="none" className="h-64 w-full overflow-visible" aria-label="Line chart">
    {[20,40,60,80,100].map(y=><line key={y} x1="0" y1={y} x2="100" y2={y} stroke="currentColor" className="text-gray-100 dark:text-gray-700" strokeWidth=".4" />)}
    <defs><linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={color} stopOpacity=".25"/><stop offset="1" stopColor={color} stopOpacity="0"/></linearGradient></defs>
    <polygon points={`0,100 ${points(values)} 100,100`} fill="url(#lineFill)"/>
    {secondary&&<polyline points={points(secondary)} fill="none" stroke="#9ca3af" strokeWidth="1.4" vectorEffect="non-scaling-stroke" strokeDasharray="4 3"/>}
    <polyline points={points(values)} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round"/>
    {values.map((n,i)=><circle key={i} cx={(i/(values.length-1))*100} cy={100-n} r="1" fill={color}/>)}</svg>;
}

export function Bars({ values, compare }: { values:number[]; compare?:number[] }) {
 return <div className="flex h-64 items-end gap-3 border-b border-gray-200 px-2 pt-5 dark:border-gray-700">{values.map((v,i)=><div key={i} className="flex h-full flex-1 items-end justify-center gap-1"><div title={`${v}%`} className="w-full max-w-7 rounded-t bg-brand-500 transition hover:bg-brand-600" style={{height:`${v}%`}}/>{compare&&<div title={`${compare[i]}%`} className="w-full max-w-7 rounded-t bg-brand-200 dark:bg-brand-500/30" style={{height:`${compare[i]}%`}}/>}</div>)}</div>;
}
