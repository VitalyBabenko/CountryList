import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { ICountry } from "../../types/ICountry";

const appAxios = axios.create({
  baseURL: `https://restcountries.com/v3.1/`,
  method: "GET",
});

const countriesFields = "name,flags,population,region,capital";
const countryFields = `${countriesFields},subregion,area,languages,borders`;

export const fetchCountries = createAsyncThunk(
  "countries/fetchAll",

  async (region: string | undefined = "all", thunkAPI) => {
    try {
      const { data } = await appAxios<ICountry[]>({
        url: region === "all" ? "all" : `subregion/${region}`,
        data: {
          fields: countriesFields,
        },
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue("error");
    }
  }
);

export const fetchCountry = createAsyncThunk(
  "country/fetch",

  async (name: string | undefined, thunkAPI) => {
    try {
      const { data } = await appAxios<ICountry[]>({
        url: `name/${name}`,
        data: {
          fields: countryFields,
        },
      });
      return data[0];
    } catch (e) {
      return thunkAPI.rejectWithValue("error");
    }
  }
);

export const fetchNeighbors = createAsyncThunk(
  "neighbors/fetch",

  async (codes: [string], thunkAPI) => {
    try {
      const { data } = await appAxios<ICountry[]>({
        url: `alpha?codes=${codes.join(",")}`,
        data: {
          fields: "name",
        },
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue("error");
    }
  }
);
