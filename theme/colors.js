// Centralized color + gradient tokens for the app (ESM; repo is `"type": "module"`).

export const palette = {
  base: "#053046",
  tint90: "#CDD6DA",
  slate: "#37596B",
  mist: "#9BACB5",
  white: "#FFFFFF",
  transparent: "rgba(255,255,255,0)",
};

// Home screen background:
// background: linear-gradient(0deg, #CDD6DA, #CDD6DA),
//             linear-gradient(180deg, #37596B 0.58%, #9BACB5 33.99%, rgba(255, 255, 255, 0) 88.8%);
export const homeBackground = {
  baseColor: palette.tint90,
  overlay: {
    colors: [palette.slate, palette.mist, palette.transparent],
    locations: [0.0058, 0.3399, 0.888],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
};
