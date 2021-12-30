import * as React from "react";
import { useState,useRef } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "../components/ItemStyle.css";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useHistory, useParams } from "react-router-dom";

export default function AddItems() {
   const [itemId, setItemId] = useState();
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  
 

  const history = useHistory();
  const id = useParams();




  const item_base_url = "http://localhost:8082/api/v1/items";

  const item_base_url_post = `http://localhost:8082/api/v1/items?id=${itemId}`;

  // const saveData = () => {
  //   var itemData = {
  //     itemname :"book",
  //     price : 2000
  //   };
  //   axios
  //     .post(item_base_url, itemData)
  //     .then((response) => {
  //       setItems({
  //         itemname: response.data.itemData.data,
  //         price: response.data.price.data,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const saveData = () => {
if(itemId){
  var itemData = {
    itemname: itemName,
    price: price,
  };
  axios
  .put(item_base_url_post,itemData )
  .then((response) => {
    alert(response.data.message )
    if(response.data.message == "Invalid Id"){
      alert("Inavlid Id")
    }
    else{
      var itemData = {
        itemname: itemName,
        price: price,
      };
      axios.post(item_base_url, itemData)
      .then((response) => {
        console.log(response.data.data);
        history.push("/add-items");
      })
      .catch((error) => {
        console.log(error);
      });
    setItemName("");
    setPrice("");
    }
    console.log(response.data.data );
    console.log("Successfully updated");
    history.push("/add-items");
  })
  .catch((error) => {
    console.log(error);
  });
}
  };



  return (
    <React.Fragment>
      <CssBaseline />

      <Container fixed>
        <Box
          sx={{
            bgcolor: "#cfe8fc",
            height: "80vh",
            position: "relative",
            top: "10vh",
          }}
        />
        <Typography
          component="div"
          variant="body1"
          style={{
            height: 100,
            width: "100%",
          }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              color: "text.primary",
              p: 20,
              position: "fixed",
              top: "20vh",
              left: "36%",
              zIndex: "modal",
            }}
          >
            <TextField
              sx={{ alignItems: "center" }}
              id="outlined-name"
              label="Id"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
            />
            <br />
            <br />
            <TextField
              sx={{ alignItems: "center" }}
              id="outlined-name"
              label="Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <br />
            <br />
            <TextField
              sx={{ alignItems: "center" }}
              id="outlined-name"
              type="number"
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <br />

            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                sx={{ margin: 3 }}
                onClick={() => saveData()}
              >
                Send
              </Button>
            </Stack>
          </Box>
        </Typography>
      </Container>
    </React.Fragment>
  );
}
