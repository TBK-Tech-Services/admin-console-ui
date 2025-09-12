import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PasswordInputFieldComponentProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export default function PasswordInputFieldComponent({ 
    id, 
    label, 
    value, 
    onChange, 
    placeholder = '********' 
}: PasswordInputFieldComponentProps) {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id}>{label}</Label>
            <Input
                id={id}
                type="password"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}