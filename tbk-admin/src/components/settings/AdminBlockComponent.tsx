import { Input } from "../ui/input";

export function AdminBlockComponent({ title, color, prefix, formData, handleChange }: any) {
    return (
        <div className={`bg-${color}-50 border border-${color}-200 rounded-lg p-4 space-y-4`}>
            <span className={`font-medium text-${color}-700`}>{title}</span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                    value={formData[`${prefix}Name`]}
                    onChange={(e) => handleChange(`${prefix}Name`, e.target.value)}
                    placeholder="Name"
                />
                <Input
                    value={formData[`${prefix}Email`]}
                    onChange={(e) => handleChange(`${prefix}Email`, e.target.value)}
                    placeholder="Email"
                />
                <Input
                    value={formData[`${prefix}Phone`]}
                    onChange={(e) => handleChange(`${prefix}Phone`, e.target.value)}
                    placeholder="Phone"
                />
            </div>
        </div>
    );
};