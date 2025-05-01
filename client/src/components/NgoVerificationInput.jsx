import { TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useValidateNgoVerificationIdMutation } from "../features/ngoSlice/NgoSlice";

const NgoVerificationInput = ({ value, onChange, error }) => {
  const [validateNgoVerificationId, { data, error: apiError }] =
    useValidateNgoVerificationIdMutation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value.length === 5) {
        validateNgoVerificationId(value);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [value]);

  const validationMessage = data?.ngoName
    ? `✅ Verified: ${data.ngoName}`
    : apiError
    ? "❌ Invalid or unapproved verification ID"
    : "";

  return (
    <>
      <TextField
        label="NGO Verification ID"
        variant="outlined"
        value={value}
        onChange={onChange}
        error={!!error}
        helperText={error?.message || validationMessage}
        fullWidth
      />
    </>
  );
};

export default NgoVerificationInput;
