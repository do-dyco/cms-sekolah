import { UserForm } from './Index';import type{UserRow}from'../../types';
export default function Edit({user,availableRoles}:{user:UserRow;availableRoles:string[]}){return <UserForm mode="edit" user={user} availableRoles={availableRoles}/>}
