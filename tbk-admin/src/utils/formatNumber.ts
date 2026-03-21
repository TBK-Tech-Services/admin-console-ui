/**
 * Format a number as Indian currency with commas and 2 decimal places.
 * e.g. 100000.5 → "1,00,000.50"
 */
export const formatAmount = (value: number | null | undefined): string => {
    if (value == null) return "0.00";
    return value.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

/**
 * Format a plain number with Indian comma grouping (no decimals).
 * e.g. 100000 → "1,00,000"
 */
export const formatNumber = (value: number | null | undefined): string => {
    if (value == null) return "0";
    return value.toLocaleString("en-IN");
};
