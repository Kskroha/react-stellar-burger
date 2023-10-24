import React from "react";
import { TInputValue } from "../../types/types";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState } from "../reducers";
import type { AppDispatch } from "../store";

export function useForm(inputValues: TInputValue) {
  const [values, setValues] = React.useState<TInputValue & {}>(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
