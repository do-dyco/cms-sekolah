import type { PageProps } from '@inertiajs/core';
export type AuthUser={id:number;name:string;email:string;roles:string[];permissions:string[]};
export interface AppPageProps extends PageProps{title?:string;auth:{user:AuthUser|null};flash?:{success?:string};errors?:Record<string,string>}
export type UserRow={id:number;name:string;email:string;roles:string[];permissions?:string[];created_at:string|null};
export type Pagination<T>={data:T[];current_page:number;last_page:number;from:number|null;to:number|null;total:number;links:{url:string|null;label:string;active:boolean}[]};
