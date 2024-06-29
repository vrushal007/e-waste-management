import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { yupResolver } from "@hookform/resolvers/yup";

import { LoadingButton } from "@mui/lab";
// @mui
import {
  Stack,
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";

// components
import { useVerifyUserMutation } from "../redux/services/auth.service";

export default function VerifyUserPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [verifyUser, { isLoading }] = useVerifyUserMutation();
  const [userId, setUserId] = useState("");
  const [showGeneratedPassword, setShowGeneratedPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("user"))?.id;
    setUserId(id);
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(),
  });

  const handleClick = async (values) => {
    try {
      const resultAction = await verifyUser({
        ...values,
        userId,
      });
      unwrapResult(resultAction);
      if (resultAction?.data?.success) {
        enqueueSnackbar(resultAction?.data?.message, { variant: "success" });
        navigate("/login", { replace: true });
      }
    } catch (err) {
      enqueueSnackbar(err?.data?.message ?? err.error, { variant: "error" });
      console.error("Failed to verify User: ", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleClick)}>
      <Stack spacing={3}>
        <TextField
          name="password"
          label="Generated Password"
          {...register("password", { required: true })}
          type={showGeneratedPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setShowGeneratedPassword(!showGeneratedPassword)
                  }
                  edge="end"
                  data-testid="togglePasswordVisibilityButton"
                >
                  <Iconify
                    icon={
                      showGeneratedPassword
                        ? "eva:eye-fill"
                        : "eva:eye-off-fill"
                    }
                    data-testid="togglePasswordVisibilityButton"
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          inputProps={{
            "data-testid": "password",
          }}
          autoComplete="off"
        />

        <TextField
          name="newPassword"
          label="New Password"
          {...register("newPassword", { required: true })}
          type={showNewPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  edge="end"
                  data-testid="toggleNewPasswordVisibilityButton"
                >
                  <Iconify
                    icon={showNewPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={Boolean(errors.newPassword)}
          helperText={errors.newPassword?.message}
          inputProps={{
            "data-testid": "newPassword",
          }}
          autoComplete="off"
        />

        <TextField
          name="confirmPassword"
          label="Confirm Password"
          {...register("confirmPassword", { required: true })}
          type={showConfirmPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                  data-testid="toggleConfirmPasswordVisibilityButton"
                >
                  <Iconify
                    icon={
                      showConfirmPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword?.message}
          inputProps={{
            "data-testid": "confirmPassword",
          }}
          autoComplete="off"
        />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 1 }}
        >
          <Button
            variant="text"
            size="small"
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </Button>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
        >
          Verify
        </LoadingButton>
      </Stack>
    </form>
  );
}
