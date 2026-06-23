/**
 * adConfig.ts — Single source of truth for all ad credentials.
 *
 * Edit ONLY this file when you need to change any ad unit path, div ID, or size.
 * AdSlot, AnchorAd, and RewardedAd all import from here.
 */

// ─── Display Ads ─────────────────────────────────────────────────────────────

export const DISPLAY_ADS = {
  ad1: {
    adUnit: '/23324356353/hr1',
    divId: 'div-gpt-ad-1749819118863-0',
    sizes: [[300, 250], [336, 280], [300, 600], [320, 480], [250, 250]],
  },
  ad2: {
    adUnit: '/23324356353/hr2',
    divId: 'div-gpt-ad-1749819118864-0',
    sizes: [[300, 250], [336, 280], [300, 600], [320, 480], [250, 250]],
  },
} as const;

export type DisplayAdSlot = keyof typeof DISPLAY_ADS;

// ─── Anchor Ad ───────────────────────────────────────────────────────────────

export const ANCHOR_AD = {
  // Replace with your anchor-enabled ad unit from Google Ad Manager.
  // GAM → Inventory → Ad units → New ad unit → format: Out-of-page → save
  adUnit: '/23324356353/anchor',
  /** Viewport ≤ this width (px) → TOP anchor; above → BOTTOM anchor */
  mobileBreakpoint: 500,
};

// ─── Rewarded Ad ─────────────────────────────────────────────────────────────

export const REWARDED_AD = {
  adUnit: '/22639388115/rewarded_web_example',
};
