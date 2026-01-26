import { Input } from "../ui/input";

const colorClasses = {
    orange: {
        bg: "bg-orange-50",
        border: "border-orange-200",
        text: "text-orange-700"
    },
    blue: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-700"
    }
};

export function AdminBlockComponent({ title, color, prefix, formData, handleChange }: any) {
    const classes = colorClasses[color] || colorClasses.orange;

    return (
        <div className={`${classes.bg} ${classes.border} border rounded-lg p-3 sm:p-4 space-y-3 sm:space-y-4`}>
            <span className={`font-medium text-sm sm:text-base ${classes.text}`}>{title}</span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                <Input
                    value={formData[`${prefix}Name`]}
                    onChange={(e) => handleChange(`${prefix}Name`, e.target.value)}
                    placeholder="Name"
                    className="h-9 sm:h-10 text-sm"
                />
                <Input
                    value={formData[`${prefix}Email`]}
                    onChange={(e) => handleChange(`${prefix}Email`, e.target.value)}
                    placeholder="Email"
                    className="h-9 sm:h-10 text-sm"
                />
                <Input
                    value={formData[`${prefix}Phone`]}
                    onChange={(e) => handleChange(`${prefix}Phone`, e.target.value)}
                    placeholder="Phone"
                    className="h-9 sm:h-10 text-sm"
                />
            </div>
        </div>
    );
};