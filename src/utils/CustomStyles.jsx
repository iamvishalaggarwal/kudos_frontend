export const textFieldStyles = {
  "& label.Mui-focused": {
    color: "#6C63FF",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#FFB400",
  },
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#F8F9FF",
    "& fieldset": {
      borderColor: "#E8ECEF",
      transition: "border-color 0.3s ease",
    },
    "&:hover fieldset": {
      borderColor: "#A3A0FF",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6C63FF",
    },
  },
  "& .MuiInputBase-input": {
    fontSize: { xs: "14px", md: "15px" },
    color: "#2D2D2D",
    backgroundColor: "#F8F9FF",
    borderRadius: "6px",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
  "& .MuiInputLabel-root": {
    color: "#555",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#777",
  },

  "&& .MuiInputBase-input.Mui-disabled": {
    cursor: "not-allowed",
    color: "#777",
    backgroundColor: "#E0E0E0",
    userSelect: "none",
    opacity: 0.6,
  },
  "&& .MuiOutlinedInput-root.Mui-disabled": {
    "& fieldset": {
      borderColor: "#B0B0B0",
    },
  },
  "&& .MuiOutlinedInput-root.Mui-disabled:hover": {
    borderColor: "#B0B0B0",
  },
  "&& .MuiInputBase-input.Mui-disabled::selection": {
    backgroundColor: "#D3D3D3",
    color: "#777",
  },
  transition: "all 0.3s ease",
};

export const buttonStyles = {
  fontSize: {
    xs: "10px",
    sm: "11px",
    md: "12px",
  },
  padding: {
    xs: "4px 10px",
    sm: "6px 12px",
    md: "7px 16px",
  },
  backgroundColor: "#6C63FF",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#5A54CC",
  },
  "&:active": {
    backgroundColor: "#8E7AFE",
  },
  "&:disabled": {
    backgroundColor: "#D3D3D3",
    color: "#666666",
    cursor: "not-allowed",
    boxShadow: "none",
    pointerEvents: "auto",
  },
  userSelect: "none",
};
