import React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

interface EditButtonProps {
  onClick: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} aria-label="edit">
      <EditIcon />
    </IconButton>
  );
};

export default EditButton;
