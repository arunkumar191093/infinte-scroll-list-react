export const getAllProducts = async (pageNum) => {
  let url = `http://localhost:3001/getList?pageNum=${pageNum}`
  let response = await fetch(url, {
    method: 'GET'
  });
  let responseJSON = response.json();
  return responseJSON;
}