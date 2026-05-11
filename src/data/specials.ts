export type Special = {
  title: string;
  description: string;
  validUntil?: string; // "2026-05-31" — auto-hides after this date
  badge?: string;      // "2 days only!" or "May Special"
};

// ✏️ EDIT THIS to add/remove specials. Leave empty [] for nothing to show.
export const currentSpecials: Special[] = [
//   {
//     title: "Lash Lift + Tint",
//     description: "Book this week and get R290. Perfect pre-winter treat.",
//     validUntil: "2026-05-20",
//     badge: "This week only",
//   },
];