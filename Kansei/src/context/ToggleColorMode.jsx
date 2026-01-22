import React, { useEffect, useState, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline, responsiveFontSizes } from "@mui/material";
import ColorModeContext from "./ColorModeContext";

export default function ToggleColorMode({ children }) {
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setMode(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", mode);
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#6C2BD9" : "#8A2DE2",
        contrastText: "#ffffff",
      },
      secondary: {
        main: mode === "light" ? "#4A1EA6" : "#5B21B6",
      },
      background: {
        default: mode === "light" ? "#f6f7fb" : "#0b0b0c",
        paper: mode === "light" ? "#ffffff" : "#0f0f10",
      },
      text: {
        primary: mode === "light" ? "#0b1220" : "#E6EEF8",
        secondary: mode === "light" ? "#5b6770" : "#9aa3b2",
      },
      divider: mode === "light" ? "rgba(11,18,32,0.06)" : "rgba(255,255,255,0.06)",
    },
    typography: {
      fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      h1: { fontFamily: '"Merriweather", Georgia, serif', fontWeight: 700 },
      h2: { fontFamily: '"Merriweather", Georgia, serif', fontWeight: 700 },
      button: { textTransform: "none", fontWeight: 700 },
    },
    shape: { borderRadius: 10 },
    shadows: Array.from({ length: 25 }).map((_, i) =>
      i === 0 ? "none" : i <= 2 ? `0 ${2 + i}px ${8 + i * 2}px rgba(2,6,23,${0.06 + i * 0.02})` : `0 ${4 + i}px ${12 + i * 2}px rgba(2,6,23,${0.05})`
    ),
  });

  const theme = useMemo(() => {
    let t = createTheme(getDesignTokens(mode));
    t = responsiveFontSizes(t);

    t.components = {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: t.palette.background.default,
            color: t.palette.text.primary,
            transition: "background-color 220ms ease, color 220ms ease",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 10,
            textTransform: "none",
            padding: "8px 14px",
          },
          containedPrimary: {
            background: `linear-gradient(180deg, ${t.palette.primary.main}, ${t.palette.secondary.main})`,
            color: t.palette.primary.contrastText,
            boxShadow: "0 8px 20px rgba(138,44,226,0.16)",
            "&:hover": {
              transform: "translateY(-1px)",
            },
          },
          outlined: {
            borderColor: t.palette.divider,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: t.palette.text.primary,
            transition: "color 160ms ease, transform 120ms ease",
            "&:hover": { transform: "scale(1.03)" },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: "transparent",
            boxShadow: "none",
            backdropFilter: "blur(6px)",
            borderBottom: `1px solid ${t.palette.divider}`,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundClip: "padding-box",
            border: `1px solid ${t.palette.divider}`,
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: t.palette.background.paper,
            color: t.palette.text.primary,
            boxShadow: t.shadows[2],
            fontSize: "0.85rem",
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 12,
            background: t.palette.background.paper,
          },
        },
      },
    };

    return t;
  }, [mode]);

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
