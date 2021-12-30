import axios from "axios";

const item_base_url = "http://localhost:8082/api/v1/items";

const item_base_delete_url = "http://localhost:8082/api/v1/items?id="

class ItemService
 {
  getAllItems()
  {
    return axios.get(item_base_url);
  }

  deleteItemById(id)
   {
    // http://localhost:8082/api/v1/items?id=12

    // return axios.delete(item_base_url + id);
    
return axios.delete(`${item_base_url}?${id}`);

return axios.delete(item_base_delete_url + id)
     


   //  alert(item_base_delete_url + id)
//alert("HIHI"+`http://localhost:8082/api/v1/items${id}`)

    // return axios.delete(item_base_delete_url + id);

    return axios.delete(`http://localhost:8082/api/v1/items${id}`);

  }

  saveItemdata(bodyParam)
  {
    return axios.post(item_base_url,bodyParam)
  }
}


export default new ItemService();
