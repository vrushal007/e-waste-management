import { useRef, useState } from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { Box, TextField, CircularProgress } from "@mui/material";

import RecyclerCard from "./recycler-card";
import { useGetRecyclersQuery } from "../../redux/services/recyclers.service";

// ----------------------------------------------------------------------

export default function RecyclersView() {
  const [search, setSearch] = useState("");

  const searchRef = useRef();

  const { data, isLoading, isFetching } = useGetRecyclersQuery({
    search,
  });

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Recyclers</Typography>
      </Stack>

      <Box
        width={400}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 5,
          gap: 2,
        }}
      >
        <TextField
          sx={{
            width: "100%",
          }}
          label="Search"
          inputRef={searchRef}
          InputLabelProps={{
            shrink: true,
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearch(searchRef.current.value);
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setSearch(searchRef.current.value)}
          onChange={(e) => {
            if (e.target.value === "") setSearch("");
          }}
          sx={{
            height: 40,
          }}
        >
          Search
        </Button>
      </Box>

      {(isLoading || isFetching) && <CircularProgress />}
      {data?.data?.length === 0 && (
        <Typography variant="h5">No recycler found</Typography>
      )}
      <Grid container spacing={3}>
        {data?.data?.map((recycler, index) => (
          <Grid key={recycler.id} xs={12} sm={6} md={3}>
            <RecyclerCard key={recycler.id} recycler={recycler} index={index} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
