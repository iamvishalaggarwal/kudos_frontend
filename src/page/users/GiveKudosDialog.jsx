import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setNotification } from "../../features/notification/notificationSlice";
import { useCreateGiveKudoMutation } from "../../features/kudos/kudosApiSlice";
import { ClearOutlined } from "@mui/icons-material";
import { buttonStyles, textFieldStyles } from "../../utils/CustomStyles";

const GiveKudosDialog = ({ open, onClose, receiver }) => {
  const [message, setMessage] = useState("");
  const [giveKudos, { isLoading }] = useCreateGiveKudoMutation();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      await giveKudos({ recipient_id: receiver.id, message }).unwrap();
      dispatch(
        setNotification({
          isOpen: true,
          message: `Kudos sent to ${receiver.username}!`,
          severity: "success",
        })
      );
      onClose();
      setMessage("");
    } catch {
      dispatch(
        setNotification({
          isOpen: true,
          message: "Failed to send kudos. Try again later.",
          severity: "error",
        })
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle
        sx={{
          color: "#6C63FF",
          fontWeight: 700,
          fontSize: { xs: "1.3rem", md: "1.5rem" },
          textAlign: "center",
          borderBottom: "1px solid #E8ECEF",
        }}
      >
        Send Kudos to {receiver.username}
      </DialogTitle>

      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "#555",
        }}
      >
        <ClearOutlined />
      </IconButton>

      <DialogContent sx={{ p: { xs: 1, md: 2 }, textAlign: "center" }}>
        <Typography
          variant="body1"
          sx={{
            mb: 2,
            color: "#555",
            fontSize: { xs: "1rem", md: "1.1rem" },
            lineHeight: 1.5,
          }}
        >
          Share some appreciation with a personalized message for{" "}
          <strong style={{ color: "#FFB400" }}>{receiver.username}</strong>.
        </Typography>
        <TextField
          autoFocus
          label="Write your message"
          type="text"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          value={message}
          placeholder="E.g., Great job leading the sprint demo! Your effort really made a difference 👏"
          onChange={(e) => setMessage(e.target.value)}
          sx={textFieldStyles}
        />
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "flex-end",
          p: { xs: 1, md: 2 },
          borderTop: "1px solid #E8ECEF",
          pt: 2,
        }}
      >
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!message.trim() || isLoading}
          sx={buttonStyles}
        >
          Send Kudos
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GiveKudosDialog;
