import API from "./axios";
import { ITodoForm } from "../interfaces/todo";

const API_URL = "/api/todo";

// Service class for handling Todo-related API calls
class TodoService {
  // Method to get all Todo items
  get() {
    return API.get(API_URL)
      .then((response) => {
        return response; // Return the response
      })
      .catch((error) => {
        return error.response; // Return error response in case of failure
      });
  }

  // Method to add a new Todo item
  add(title: string) {
    return API.post(API_URL, { title })
      .then((response) => {
        return response; // Return the response
      })
      .catch((error) => {
        return error.response; // Return error response in case of failure
      });
  }

  // Method to update an existing Todo item
  update(id: number, values: ITodoForm) {
    return API.put(`${API_URL}/${id}`, values)
      .then((response) => {
        return response; // Return the response
      })
      .catch((error) => {
        return error.response; // Return error response in case of failure
      });
  }

  // Method to delete a Todo item
  delete(id: number) {
    return API.delete(`${API_URL}/${id}`)
      .then((response) => {
        return response; // Return the response
      })
      .catch((error) => {
        return error.response; // Return error response in case of failure
      });
  }
}

export default new TodoService();
