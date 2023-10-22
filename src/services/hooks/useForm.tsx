import React from "react";
import { TInputValue } from "../../types/types";

export function useForm(inputValues: TInputValue) {
  const [values, setValues] = React.useState<TInputValue & {}>(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
