import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

interface HeaderProps {
  handleOpenModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleOpenModal }) => (
  <Grid container alignItems="center" justifyContent="space-between">
    <Grid item xs>
      <Typography variant="h4" component="h1" gutterBottom>
        To-Do List
      </Typography>
    </Grid>
    <Grid item>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpenModal}
        style={{ backgroundColor: "#831ea3" }}
      >
        <AddIcon />
      </Fab>
    </Grid>
  </Grid>
);

export default Header;
