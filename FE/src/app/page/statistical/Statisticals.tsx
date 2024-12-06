import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { display } from "html2canvas/dist/types/css/property-descriptors/display";
import React from "react";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
export default function Statisticals() {
  return (
    <>
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Stack spacing={2} direction="row">
                <Card sx={{ minWidth: 49 + "%", height: 150 }}>
                  <div className="bg-blue-900 h-full">
                    <CardContent>
                      <div>
                        <CreditCardIcon />
                      </div>
                      <Typography gutterBottom variant="h5" component="div">
                        $500
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        className="text-neutral-300"
                      >
                        Total Earnings
                      </Typography>
                    </CardContent>
                  </div>
                </Card>
                <Card sx={{ minWidth: 49 + "%", height: 150 }}>
                  <div className="bg-yellow-500 h-full">
                    <CardContent>
                      <div>
                        <ShoppingBagIcon />
                      </div>
                      <Typography gutterBottom variant="h5" component="div">
                        $900
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        className="text-neutral-300"
                      >
                        Total Orders
                      </Typography>
                    </CardContent>
                  </div>
                </Card>
              </Stack>
            </Grid>
            <Grid size={4}>
              <Stack spacing={2}>
                <Card sx={{ maxWidth: 345 }} >
                  <Stack spacing={2} direction="row" className="bg-yellow-500 m-auto">
                      <div className="mt-2">
                        <StorefrontIcon />
                      </div>
                      <div className="p-2">
                        <span className="text-xl">$230</span> <br />
                        <span className="text-sm">Total Income</span>
                      </div>
                  </Stack>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                  <Stack spacing={2} direction="row" className="">
                    <div className="mt-2">
                      <StorefrontIcon />
                    </div>
                    <div className="p-2">
                      <span className="text-xl ">$230</span> <br />
                      <span className="text-sm">Total Income</span>
                    </div>
                  </Stack>
                </Card>
              </Stack>
            </Grid>
          </Grid>
          <Box height={20} />
          <Grid container spacing={2}>
            <Grid size={8}>
              <Card sx={{ height: 60 + "vh" }}>
                <CardContent></CardContent>
              </Card>
            </Grid>
            <Grid size={4}>
              <Card sx={{ height: 60 + "vh" }}>
                <CardContent></CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
