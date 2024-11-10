import { CircularProgress } from "@mui/material";

export default function ProgressBar({ progress, size, dark, light, thicknessDark, thicknessLight }) {
  return (
    <CircularProgress
      variant="determinate"
      value={progress}
      thickness={thicknessDark}
      size={size}
      sx={{
        borderRadius: "100%",
        boxShadow: `inset 0 0 0px ${thicknessLight}px ${light}`,
        color: `${dark} !important`,
      }}
    />
  );
}
