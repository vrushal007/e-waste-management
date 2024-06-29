// components
import { useSnackbar } from "notistack";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";

import { Edit, Cancel } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
// @mui
import { Card, Stack, Container, Typography } from "@mui/material";

import Scrollbar from "../components/scrollbar";
// sections
import CustomDataTable from "../components/custom/CustomDataTable";
import RecyclerOrderForm from "../sections/recyclers/recycler-order-form";
import {
  useGetOrdersQuery,
  useCancelOrderMutation,
} from "../redux/services/order.service";
// ----------------------------------------------------------------------

export default function UserOrderPage() {
  const { data, isLoading, isFetching } = useGetOrdersQuery();

  const [cancelRecyclerOrder, { isLoading: isCancelling }] =
    useCancelOrderMutation();

  const [openFilter, setOpenFilter] = useState(false);

  const [openRow, setOpenRow] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data) {
      setRows(data?.data);
    }
  }, [data]);

  const handleCloseFilter = () => {
    setOpenFilter(false);
    // setEdit(false);
  };

  const columns = [
    { field: "itemName", headerName: "Item Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "expectedPrice", headerName: "Expected Price", flex: 1 },
    { field: "pickupAddress", headerName: "Pickup Address", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "expectedPickupDate",
      headerName: "Expected Pickup Date",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Edit />}
          onClick={(e) => {
            setOpenRow(params.row);
            setOpenFilter(true);
          }}
        />,
        <GridActionsCellItem
          icon={<Cancel />}
          onClick={(e) => {
            cancelOrder(params.row.id);
          }}
          color="error"
        />,
      ],
    },
  ];

  const cancelOrder = async () => {
    try {
      const resultAction = await cancelRecyclerOrder({
        id: openRow?.id,
      });
      if (resultAction?.data?.success) {
        enqueueSnackbar("Order cancelled successfully", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Failed to cancel order", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Failed to cancel order", { variant: "error" });
    }
  };

  return (
    <div>
      <Helmet>
        <title> User Orders </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            User Orders
          </Typography>

          <RecyclerOrderForm
            open={openFilter}
            onClose={handleCloseFilter}
            openRow={openRow}
            edit
          />
        </Stack>

        <Card>
          <Scrollbar>
            <CustomDataTable
              columns={columns}
              rows={rows ?? []}
              canSelect
              isLoading={isLoading}
              isFetching={isFetching}
              tableName="User Orders"
            />
          </Scrollbar>
        </Card>
      </Container>
    </div>
  );
}
