import { UserForm } from './Index';
export default function Create({ availableRoles }: { availableRoles: string[] }) { return <UserForm mode="create" availableRoles={availableRoles}/>; }
