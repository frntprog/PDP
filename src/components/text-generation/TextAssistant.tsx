"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RequestValidator } from "@/lib/validators/reques";
import * as z from "zod";
import axios from "axios";
import { useState } from "react";

type FormData = z.infer<typeof RequestValidator>;

const TextAssistant = () => {
  const [res, setRes] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(RequestValidator),
  });

  const formSubmit = async (data: any) => {
    console.log(data);
    await sendMessage(data.request);
  };

  const sendMessage = async (prompt: any) => {
    console.log(prompt, process.env.RAPID_API_HOST);

    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    };

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    setRes(data.choices[0].message.content);
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(formSubmit)}>
        <input
          {...register("request")}
          placeholder="Put down your request"
          className="text-sm mt-5 text-gray-500 outline-none"
        ></input>
        {/* <input className="btn" type="submit" /> */}
        <p className="mt-5">{res}</p>
      </form>
    </>
  );
};

export default TextAssistant;
