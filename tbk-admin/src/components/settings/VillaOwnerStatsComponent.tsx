export function VillaOwnerStatsComponent({ stats }) {
    return (
        <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-border/40">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-3 sm:p-4">
                <div className="text-xl sm:text-2xl font-bold text-primary">
                    {stats.totalOwners}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Total Owners</div>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-lg p-3 sm:p-4">
                <div className="text-xl sm:text-2xl font-bold text-accent">
                    {stats.totalAssignedVillas}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Assigned Villas</div>
            </div>

            <div className="bg-gradient-to-br from-warning/5 to-warning/10 rounded-lg p-3 sm:p-4">
                <div className="text-xl sm:text-2xl font-bold text-warning">
                    {stats.totalUnassignedVillas}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Unassigned Villas</div>
            </div>
        </div>
    );
}