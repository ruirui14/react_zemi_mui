import React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

const SimpleDialog = ({ open, onClose, children }) => (
  <Dialog onClose={onClose} open={open}>
    <DialogTitle>新規登録</DialogTitle>
    {children}
  </Dialog>
);

SimpleDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default SimpleDialog;
