import React from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

interface Props {
  checked: boolean;
  onChange: () => void;
}

const AdminCheckbox: React.FC<Props> = ({ checked, onChange }) => (
  <FormGroup sx={{ marginBottom: 2 }}>
    <FormControlLabel
      control={<Checkbox checked={checked} onChange={onChange} />}
      label="Sono un amministratore"
    />
  </FormGroup>
);

export default AdminCheckbox;
