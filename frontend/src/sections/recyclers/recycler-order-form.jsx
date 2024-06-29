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
  Divider,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";

import Iconify from "../../components/iconify";
import Scrollbar from "../../components/scrollbar";
import { useResponsive } from "../../hooks/use-responsive";
import {
  useEditOrderMutation,
  useCreateOrderMutation,
} from "../../redux/services/order.service";

RecyclerOrderForm.propTypes = {
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  edit: PropTypes.bool,
  openRow: PropTypes.object,
  recyclerId: PropTypes.string,
};

export default function RecyclerOrderForm({
  open,
  onClose,
  edit,
  openRow,
  recyclerId,
}) {
  const { enqueueSnackbar } = useSnackbar();

  const isMedium = useResponsive("down", "md");

  const RecyclerFormSchema = yup.object().shape({
    itemName: yup.string().required("Item Name is required"),
    description: yup.string().required("Description is required"),
    deliveryLocation: yup.string().required("Delivery Location is required"),
    expectedPrice: yup.string().required("Expected Price is required"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(RecyclerFormSchema),
  });

  const [createRecyclerOrder, { isLoading }] = useCreateOrderMutation();

  const [editRecyclerOrder, { isLoading: isEditLoading }] =
    useEditOrderMutation();

  useEffect(() => {
    if (edit && openRow) {
      setValue("itemName", openRow?.itemName);
      setValue("description", openRow?.description);
      setValue("deliveryLocation", openRow?.deliveryLocation);
      setValue("expectedPrice", openRow?.expectedPrice);
    } else {
      reset();
    }
  }, [open, reset, openRow, edit, setValue]);

  const handleClick = async (values) => {
    try {
      let resultAction;
      if (edit) {
        resultAction = await editRecyclerOrder({
          ...values,
          recyclerId: openRow?.recyclerId,
          id: openRow?.id,
        });
      } else {
        resultAction = await createRecyclerOrder({
          ...values,
          recyclerId,
        });
      }
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
              <TextField
                name="itemName"
                label="Item Name"
                {...register("itemName", { required: true })}
                error={Boolean(errors.itemName)}
                helperText={errors.itemName && errors.itemName.message}
              />

              <TextField
                name="description"
                label="Description"
                multiline
                rows={4}
                {...register("description", { required: true })}
                error={Boolean(errors.description)}
                helperText={errors.description && errors.description.message}
              />

              <TextField
                name="deliveryLocation"
                label="Delivery Location"
                {...register("deliveryLocation", { required: true })}
                error={Boolean(errors.deliveryLocation)}
                helperText={
                  errors.deliveryLocation && errors.deliveryLocation.message
                }
              />

              <TextField
                name="expectedPrice"
                label="Expected Price"
                {...register("expectedPrice", { required: true })}
                error={Boolean(errors.expectedPrice)}
                helperText={
                  errors.expectedPrice && errors.expectedPrice.message
                }
              />

              <LoadingButton
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  width: isMedium ? "100%" : 240,
                }}
                loading={isLoading || isEditLoading}
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
