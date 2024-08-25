import API from "./axios";
import { ITodoForm } from "../interfaces/todo";

const API_URL = "/api/todo";

class TodoService {
  get() {
    return API.get(API_URL)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  add(title: string) {
    return API.post(API_URL, { title })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  update(id: number, values: ITodoForm) {
    return API.put(`${API_URL}/${id}`, values)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  delete(id: number) {
    return API.delete(`${API_URL}/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
}

export default new TodoService();
