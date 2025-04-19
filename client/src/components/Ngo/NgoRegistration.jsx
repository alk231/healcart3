import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  useTheme,
} from "@mui/material";
import { useRegisterNgoMutation } from "../../features/ngoSlice/NgoSlice";

import { useForm, Controller } from "react-hook-form";
import { IconEdit, IconSend } from "@tabler/icons-react";
import ImageDropZone from "../imageDropZone/ImageDropZone";
import { useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

const NgoRegistration = ({ isUpdateCase, setIsUpdateCase }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [resetKey, setResetKey] = useState(Date.now());
  const [registerNgo, { isLoading }] = useRegisterNgoMutation();

  const defaultData = {
    ngoName: state?.ngoName || "",
    registrationId: state?.darpanId || "",
    contactName: state?.contactName || "",
    contactNumber: state?.contactNumber || "",
    email: state?.email || "",
    description: state?.description || "",
    medicine: state?.medicine || "",
    address: state?.address || "",
  };

  const schema = yup.object({
    ngoName: yup.string().required("NGO name is required"),
    registrationId: yup.string().required("Registration number is required"),
    contactName: yup.string().required("Contact person name is required"),
    contactNumber: yup
      .string()
      .matches(/^[0-9]{10,11}$/, "Contact number must be 10-11 digits")
      .required("Contact number is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    address: yup.string().required("Address is required"),
    medicine: yup.string().required("Medicine is required"),
    description: yup
      .string()
      .min(25, "Description must be at least 25 characters")
      .max(500, "Description must be at most 500 characters")
      .required("Description is required"),
    registrationDoc: yup.mixed().required("Supporting document is required"),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultData,
  });

  useEffect(() => {
    Object.keys(defaultData).forEach((key) => {
      setValue(key, defaultData[key]);
    });
  }, [defaultData, setValue]);

  useEffect(() => {
    if (Boolean(state)) {
      setIsUpdateCase(true);
    }
  }, [state, setIsUpdateCase]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (data[key]) {
          formData.append(key, data[key]);
        }
      }

      const response = await registerNgo(formData).unwrap();

      if (response?.msg === "ngo_registered") {
        toast.success("NGO registration submitted for admin verification");
        reset(); // Clear the form
        setResetKey(Date.now()); // Reset image upload if needed // Optional redirect
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Failed to submit NGO registration");
    }
  };

  // Define onFileSelect function
  const onFileSelect = (file) => {
    setValue("registrationDoc", file);
  };

  return (
    <Box component="form" p="20px" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} mb={1.5}>
        <Grid item xs={12} sm={6}>
          <FormControl
            error={Boolean(errors.ngoName)}
            fullWidth
            sx={{ ...theme.customInput }}
          >
            <InputLabel>NGO Name</InputLabel>
            <OutlinedInput {...register("ngoName")} />
            {errors.ngoName && (
              <FormHelperText>{errors.ngoName?.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl
            error={Boolean(errors.registrationId)}
            fullWidth
            sx={{ ...theme.customInput }}
          >
            <InputLabel>Darpan ID / Registration Number</InputLabel>
            <OutlinedInput {...register("registrationId")} />
            {errors.registrationId && (
              <FormHelperText>{errors.registrationId?.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl
            error={Boolean(errors.contactName)}
            fullWidth
            sx={{ ...theme.customInput }}
          >
            <InputLabel>Contact Person Full Name</InputLabel>
            <OutlinedInput {...register("contactName")} />
            {errors.contactName && (
              <FormHelperText>{errors.contactName?.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl
            error={Boolean(errors.contactNumber)}
            fullWidth
            sx={{ ...theme.customInput }}
          >
            <InputLabel>Contact Number</InputLabel>
            <OutlinedInput {...register("contactNumber")} />
            {errors.contactNumber && (
              <FormHelperText>{errors.contactNumber?.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl
            error={Boolean(errors.email)}
            fullWidth
            sx={{ ...theme.customInput }}
          >
            <InputLabel>Email</InputLabel>
            <OutlinedInput {...register("email")} />
            {errors.email && (
              <FormHelperText>{errors.email?.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl
            error={Boolean(errors.medicine)}
            fullWidth
            sx={{ ...theme.customInput }}
          >
            <InputLabel shrink>Medicine</InputLabel>
            <OutlinedInput multiline rows={1} {...register("description")} />
            {errors.medicine && (
              <FormHelperText>{errors.medicine?.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl
            error={Boolean(errors.address)}
            fullWidth
            sx={{ ...theme.customInput }}
          >
            <InputLabel shrink>address</InputLabel>
            <OutlinedInput multiline rows={4} {...register("description")} />
            {errors.address && (
              <FormHelperText>{errors.address?.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl
            error={Boolean(errors.description)}
            fullWidth
            sx={{ ...theme.customInput }}
          >
            <InputLabel shrink>Brief Description About Ngo</InputLabel>
            <OutlinedInput multiline rows={5} {...register("description")} />
            {errors.description && (
              <FormHelperText>{errors.description?.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="registrationDoc"
            control={control}
            render={({ field }) => (
              <ImageDropZone
                {...field}
                image={state?.registrationDoc}
                onFileSelect={onFileSelect}
                key={resetKey}
              />
            )}
          />
          {errors.registrationDoc && (
            <FormHelperText error>
              {errors.registrationDoc?.message}
            </FormHelperText>
          )}
        </Grid>
      </Grid>

      <Button
        startIcon={
          isUpdateCase ? <IconEdit size={20} /> : <IconSend size={20} />
        }
        type="submit"
        size="large"
        variant="contained"
        sx={{ color: "white", borderRadius: "10px" }}
      >
        {isUpdateCase ? "Update NGO Info" : "Register NGO"}
      </Button>
    </Box>
  );
};

export default NgoRegistration;
