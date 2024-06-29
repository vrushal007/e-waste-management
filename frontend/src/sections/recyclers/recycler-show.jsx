import { useState } from "react";
import { useParams } from "react-router-dom";

import {
  Stack,
  Button,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";

import RecyclerOrderForm from "./recycler-order-form";
import { useGetRecyclersQuery } from "../../redux/services/recyclers.service";

const RecyclerShow = () => {
  const { id } = useParams();

  const {
    data: recycler,
    isLoading,
    isFetching,
    error,
  } = useGetRecyclersQuery({ id });

  const [openForm, setOpenForm] = useState(false);

  if (error) return <Container>Something Went Wrong</Container>;

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {isLoading || isFetching ? <CircularProgress /> : null}
      {!isLoading && !isFetching && !error && (
        <Container
          sx={{
            flex: 3,
          }}
        >
          <img src={recycler?.data?.avatarUrl} alt={recycler?.data?.title} />

          <Stack mb={2}>
            <Typography variant="h4">{recycler?.data?.name}</Typography>
          </Stack>
          <Stack mb={2}>
            <Typography variant="h6">Description :</Typography>
            <Typography>{recycler?.data?.description}</Typography>
          </Stack>
        </Container>
      )}

      <Button variant="contained" onClick={handleOpenForm}>
        Create Order
      </Button>

      <RecyclerOrderForm
        open={openForm}
        onClose={handleCloseForm}
        recyclerId={recycler?.data?.id}
      />
    </Container>
  );
};

export default RecyclerShow;