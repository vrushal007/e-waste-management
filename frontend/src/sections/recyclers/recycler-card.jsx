import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Label from "../../components/label";
import { useRouter } from "../../routes/hooks";
import { fCurrency } from "../../utils/format-number";

// ----------------------------------------------------------------------

export default function RecyclerCard({ recycler }) {
  const renderStatus = (
    <Label
      variant="filled"
      color={(recycler?.status === "sale" && "error") || "info"}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: "absolute",
        textTransform: "uppercase",
      }}
    >
      {recycler?.status}
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={recycler.name}
      src={recycler.thumbnail}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: "cover",
        position: "absolute",
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      {/* <Typography
        component="span"
        variant="body1"
        sx={{
          color: "text.disabled",
          textDecoration: "line-through",
        }}
      > */}
      {/* {recycler.price && fCurrency(recycler.price)} */}
      {/* </Typography> */}
      {/* &nbsp; */}
      {fCurrency(recycler.price)}
    </Typography>
  );

  const router = useRouter();

  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>
        {recycler.status && renderStatus}

        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
            {recycler.title}
          </Link>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            {/* <ColorPreview colors={recycler.colors} /> */}
            {renderPrice}
          </Stack>
        </Stack>
        <Typography
          variant="subtitle2"
          sx={{
            color: "text.secondary",
          }}
        >
          {recycler?.instructorName}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          {recycler?.category?.map((tag) => (
            <Label key={tag}>{tag}</Label>
          ))}
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            router.push(`/recycler/${recycler.id}`);
          }}
        >
          Order
        </Button>
      </Stack>
    </Card>
  );
}

RecyclerCard.propTypes = {
  recycler: PropTypes.object,
};
