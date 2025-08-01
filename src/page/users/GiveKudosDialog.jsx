import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setNotification } from "../../features/notification/notificationSlice";
import { useCreateGiveKudoMutation } from "../../features/kudos/kudosApiSlice";

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
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "#444444", 
          color: "#FFFFFF",
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle sx={{ color: "#ff914d", fontWeight: "bold" }}>
        Send Kudos
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ mb: 1, color: "#ffffff" }}>
          To: <strong style={{ color: "#ff914d" }}>{receiver.username}</strong>
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Your message"
          type="text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          InputProps={{
            sx: {
              color: "#fff",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#777",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#aaa",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ff914d",
              },
            },
          }}
          InputLabelProps={{
            sx: {
              color: "#aaa",
              "&.Mui-focused": {
                color: "#ff914d",
              },
            },
          }}
        />
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ color: "#ccc" }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!message || isLoading}
          sx={{
            backgroundColor: "#ff914d",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#FF8C00",
            },
          }}
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GiveKudosDialog;
