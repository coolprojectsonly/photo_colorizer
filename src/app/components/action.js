import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getImage = createAsyncThunk(
  "/post/getdata",
  async ({ fileName }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/data?fileName=${fileName}`,
        {
          responseType: "arraybuffer",
        }
      );

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      const imageUrl = URL.createObjectURL(blob);

      return imageUrl;
    } catch (e) {
      console.log(e);
    }
  }
);
