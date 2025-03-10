import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { Check, Cancel } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
// @mui
import { Card, Stack, Container, Typography } from "@mui/material";

import Scrollbar from "../components/scrollbar";
// sections
import CustomDataTable from "../components/custom/CustomDataTable";
import {
  useApproveUserMutation,
  useGetUsersQuery,
  useRejectUserMutation,
} from "../redux/services/user.service";

// ----------------------------------------------------------------------

export default function UserPage() {
  const { data, isLoading, isFetching } = useGetUsersQuery();

  const [approveUser, { isLoading: isApproving }] = useApproveUserMutation();

  const [rejectUser, { isLoading: isRejecting }] = useRejectUserMutation();

  const { enqueueSnackbar } = useSnackbar();

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data) {
      setRows(data?.data);
    }
  }, [data]);

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
          icon={<Check />}
          onClick={(e) => {
            handleApproveUser(e, params.row);
          }}
        />,
        <GridActionsCellItem
          icon={<Cancel />}
          onClick={(e) => {
            handleRejectUser(e, params.row);
          }}
          color="error"
        />,
      ],
    },
  ];

  const handleApproveUser = async (e, row) => {
    try {
      const resultAction = await approveUser({
        id: row.id,
      });
      if (resultAction?.data?.success) {
        enqueueSnackbar("User approved successfully.", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Failed to Approve user", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Failed to Approve User", { variant: "error" });
    }
  };

  const handleRejectUser = async (e, row) => {
    try {
      const resultAction = await rejectUser({
        id: row.id,
      });
      if (resultAction?.data?.success) {
        enqueueSnackbar("User rejected successfully.", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Failed to reject user", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Failed to reject User", { variant: "error" });
    }
  };

  return (
    <div>
      <Helmet>
        <title> Assigned Orders </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Assigned Orders
          </Typography>
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
