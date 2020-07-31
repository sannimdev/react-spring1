import React, { useReducer, useEffect } from "react";
import axios from "axios";

const ACTION_LOADING = "LOADING";
const ACTION_SUCCESS = "SUCCESS";
const ACTION_ERROR = "ERROR";

function reducer(state, action) {
  switch (action.type) {
    case ACTION_LOADING:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case ACTION_SUCCESS:
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case ACTION_ERROR:
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled Action Error: ${action.type}`);
  }
}

const initialState = {
  loading: false,
  data: null,
  error: null,
};

function useAsync({ callback, depths = [], skip = false }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchData = async () => {
    dispatch({ type: ACTION_LOADING });
    try {
      const data = callback(); //요청 메서드를 수행
      dispatch({ type: ACTION_SUCCESS, data });
    } catch (error) {
      dispatch({ type: ACTION_ERROR, error });
    }
  };
  useEffect(() => {
    if (skip) {
      return;
    }
    fetchData();
  }, depths);

  return [state, fetchData];
}

export default useAsync;
