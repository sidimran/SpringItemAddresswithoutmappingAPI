import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import ItemService from "../../src/services";
import { tableCellClasses } from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    borderRadius: 15,
    maxWidth: 950,
    position: "fixed",
    top: 100,
    left: "250px",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },

  name: {
    fontWeight: "bold",
    color: theme.palette.secondary.dark,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    top: 20,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ListItems = () => {
  const classes = useStyles();
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAllItems();
  }, []);

  
  const getAllItems = () => {
    ItemService.getAllItems()
      .then((response) => {
        setItems(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let url = "http://localhost:8082/api/v1/items?id=";

  const item_base_url = "http://localhost:8082/api/v1/items";

  const bodyParam = {
    itemname: "box",
    price: "1222",
  };

  const deleteItemsById = (id) => {
    ItemService.deleteItemById(id)
      .then((response) => {
        console.log(response.data.data);
        setItems(items.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const updateById = (id) => {
  //   console.log("passing id ------------------", id);
  //   console.log("-------------------------------", url, bodyParam);
  //   axios.put(url + id, bodyParam).then(() => console.log("Update successful"));
  // };

  // const saveItemData = () => {
  //   var data = {
  //     itemname: "Laptop",
  //     price: 12345,
  //   };

  //   axios
  //     .post(item_base_url, data)
  //     .then((response) => {
  //       setItems({
  //         itemname: response.data.itemname.data,
  //         price: response.data.price.data,
  //       });
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  return (

    <>
    <Link to="/add-items" className="btn btn-primary mb-2">
    <Stack spacing={2} direction="row">
      
      <Button variant="contained">Add New</Button>
      
    </Stack>
      </Link>
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Item Id</TableCell>
            <TableCell className={classes.tableHeaderCell}>Item Name</TableCell>
            <TableCell className={classes.tableHeaderCell}>Price</TableCell>
            <TableCell className={classes.tableHeaderCell}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.itemname}
              </StyledTableCell>
              <StyledTableCell component={"th"} scope="row">
                {row.price}
              </StyledTableCell>
              <StyledTableCell component={"th"} scope="row">
                <DeleteIcon onClick={() => deleteItemsById(row.id)} />
                {/* <EditIcon onClick={() => updateById(row.id)} />
                <SaveIcon onClick={() => saveItemData()}></SaveIcon> */}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default ListItems;
