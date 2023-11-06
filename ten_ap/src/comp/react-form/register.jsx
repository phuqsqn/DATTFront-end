import React from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    setError,
    setValue,
    resetField,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  const onSubmit = (data) => {
    console.log(data);
    if (data.username === "abc") {
      setFocus("username");
      setValue("username", "demo user");
      setError("username");
    }

    // resetField("username");
    // resetField("password");
  };

  const watchUsername = watch("username");

  return (
    <>
      <h1>Demo watch username = {watchUsername}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          defaultValue="abc"
          {...register("username")}
          style={{ border: "1px solid gray" }}
        />
        {errors.username && <span>username không dược để là abc</span>}

        <br />
        <input
          type="text"
          {...register("password", {
            required: true,
            minLength: 8,
            // pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          })}
          style={{ border: "1px solid gray" }}
        />
        {errors.password && <span>Password không đúng định dạng</span>}

        <br />
        <input type="submit" />
      </form>
    </>
  );
};

export default Register;