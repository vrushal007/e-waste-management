// components
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";

import { Edit } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
// @mui
import { Card, Stack, Container, Typography } from "@mui/material";

import Scrollbar from "../components/scrollbar";
// sections
import CustomDataTable from "../components/custom/CustomDataTable";
import RecyclerOrderForm from "../sections/recyclers/recycler-order-form";
import { useGetCollectorsQuery } from "../redux/services/collectors.service";

// ----------------------------------------------------------------------

export default function CollectorPage() {
  const { data, isLoading, isFetching } = useGetCollectorsQuery();

  const [openFilter, setOpenFilter] = useState(false);

  const [openRow, setOpenRow] = useState(null);

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

  // name, email, phone, status
  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
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
      ],
    },
  ];

  return (
    <div>
      <Helmet>
        <title> Country </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            My Requests
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
              tableName="Country"
              searchLabel="Search Country..."
              searchCols={["countryCode", "countryName"]}
            />
          </Scrollbar>
        </Card>
      </Container>
    </div>
  );
}
