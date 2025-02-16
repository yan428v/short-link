export interface LinkAnalytics {
    clickCount: number;
    clicks: { ipAddress: string; clickedAt: Date }[];
}
