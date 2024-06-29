import * as yup from "yup";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import { LoadingButton } from "@mui/lab";
// @mui
import {
  Box,
  Stack,
  Drawer,
  Select,
  Divider,
  MenuItem,
  Typography,
  IconButton,
  InputLabel,
  FormControl,
} from "@mui/material";

import Iconify from "../../components/iconify";
import Scrollbar from "../../components/scrollbar";
import { useResponsive } from "../../hooks/use-responsive";
import { useEditOrderMutation } from "../../redux/services/order.service";
import { useGetCollectorsQuery } from "../../redux/services/collectors.service";

UserOrderForm.propTypes = {
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  edit: PropTypes.bool,
  openRow: PropTypes.object,
  recyclerId: PropTypes.string,
};

export default function UserOrderForm({
  open,
  onClose,
  edit,
  openRow,
  recyclerId,
}) {
  const { enqueueSnackbar } = useSnackbar();

  const isMedium = useResponsive("down", "md");

  const RecyclerFormSchema = yup.object().shape({
    status: yup.string().required("Status is required"),
    collectorId: yup.string().required("Collector is required"),
  });

  const { data, isLoading } = useGetCollectorsQuery();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(RecyclerFormSchema),
  });

  const [editRecyclerOrder, { isLoading: isEditLoading }] =
    useEditOrderMutation();

  useEffect(() => {
    if (edit && openRow) {
      setValue("status", openRow?.status);
      setValue("collectorId", openRow?.collectorId);
    } else {
      reset();
    }
  }, [open, reset, openRow, edit, setValue]);

  const handleClick = async (values) => {
    try {
      const resultAction = await editRecyclerOrder({
        ...values,
        recyclerId: openRow?.recyclerId,
        id: openRow?.id,
      });

      if (resultAction?.data?.success) {
        enqueueSnackbar(resultAction?.data?.message, { variant: "success" });
        reset();
        onClose();
      }
    } catch (err) {
      enqueueSnackbar(err?.error, { variant: "error" });
      console.error("Failed to create devices: ", err);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: isMedium ? "100%" : "80%",
          border: "none",
          overflow: "hidden",
          maxWidth: 500,
        },
      }}
    >
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3 }}>
          <div>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 0.5,
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                {edit ? "Edit" : "Create"} Order
              </Typography>
              <IconButton onClick={onClose}>
                <Iconify icon="eva:close-fill" />
              </IconButton>
            </Box>
            <Divider />
          </div>
          <form onSubmit={handleSubmit(handleClick)}>
            <Stack spacing={3}>
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  {...register("status")}
                  error={Boolean(errors.status)}
                  fullWidth
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="collector-label">Collector</InputLabel>
                <Select
                  labelId="collector-label"
                  id="collector"
                  {...register("collectorId")}
                  error={Boolean(errors.collectorId)}
                  fullWidth
                >
                  {isLoading && <MenuItem>Loading...</MenuItem>}
                  {!isLoading &&
                    data?.data?.map((collector) => (
                      <MenuItem key={collector.id} value={collector.id}>
                        {collector.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <LoadingButton
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  width: isMedium ? "100%" : 240,
                }}
                loading={isEditLoading}
              >
                Submit
              </LoadingButton>
            </Stack>
          </form>
        </Stack>
      </Scrollbar>
    </Drawer>
  );
}
