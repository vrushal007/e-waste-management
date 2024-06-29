import PropTypes from "prop-types";
import { useState, useEffect } from "react";

// @mui
import { DataGrid } from "@mui/x-data-grid";
import { Container, LinearProgress } from "@mui/material";
// components

import CustomNoRowsOverlay from "./CustomNoRowsOverlay";

CustomDataTable.propTypes = {
  title: PropTypes.string,
  createButton: PropTypes.element,
  selected: PropTypes.array,
  handleFilterByName: PropTypes.func,
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  form: PropTypes.func,
  searchLabel: PropTypes.string,
  canSelect: PropTypes.bool,
  setSelected: PropTypes.func,
  isLoading: PropTypes.bool,
  isFetching: PropTypes.bool,
  filterName: PropTypes.string,
  openFilterForm: PropTypes.bool,
  setOpenFilterForm: PropTypes.func,
  tableName: PropTypes.string,
  restrictDownloadCols: PropTypes.array,
  searchCols: PropTypes.array,
  headerToolbar: PropTypes.element,
};

export default function CustomDataTable({
  rows,
  columns,
  canSelect = false,
  searchLabel = "Search devices...",
  isLoading,
  isFetching,
  tableName,
  restrictDownloadCols = [],
  searchCols = [columns?.[0]?.field],
  headerToolbar,
  ...props
}) {
  const [filteredRows, setFilteredRows] = useState(rows);

  useEffect(() => {
    setFilteredRows(rows);
  }, [rows]);

  return (
    <Container
      sx={{
        display: "flex",
        // justifyContent: 'space-between',
        // alignItems: 'center',
        flexDirection: "column",
        padding: "0px!important",
      }}
    >
      <DataGrid
        columns={columns}
        rows={filteredRows}
        loading={isLoading || isFetching}
        pagination
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 25, 50, 100]}
        checkboxSelection={canSelect}
        getRowId={(row) => row?.id}
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-overlayWrapper": {
            height: isLoading ? null : "300px!important",
            "& .MuiDataGrid-overlayWrapperInner": {
              height: isLoading ? null : "300px!important",
            },
          },
          borderRadius: 0,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#F4F6F8",
            color: "#637381",
            borderRadius: 0,
          },
        }}
        filterMode="client"
        scrollbarSize={1}
        slots={{
          loadingOverlay: LinearProgress,
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        slotProps={{
          columnsPanel: {
            disableHideAllButton: true,
          },
        }}
        {...props}
      />
    </Container>
  );
}
