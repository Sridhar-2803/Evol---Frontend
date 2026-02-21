/**
 * Client-side rate limiter to prevent excessive API calls.
 * Tracks requests in a sliding window and rejects calls that exceed the limit.
 */
export class RateLimiter {
    private timestamps: number[] = [];
    private readonly maxRequests: number;
    private readonly windowMs: number;

    constructor(maxRequests: number, windowMs: number) {
        this.maxRequests = maxRequests;
        this.windowMs = windowMs;
    }

    canProceed(): boolean {
        const now = Date.now();
        this.timestamps = this.timestamps.filter(t => now - t < this.windowMs);

        if (this.timestamps.length >= this.maxRequests) {
            return false;
        }

        this.timestamps.push(now);
        return true;
    }

    getRetryAfterMs(): number {
        if (this.timestamps.length === 0) return 0;
        const oldest = this.timestamps[0];
        return Math.max(0, this.windowMs - (Date.now() - oldest));
    }
}

// Allow 20 requests per 10-second window
export const apiRateLimiter = new RateLimiter(20, 10_000);
