"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const Success = () => {
  const searchParams = useSearchParams();
  console.log(searchParams.get("pidx"));

  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    const checkPaymentSuccess = async () => {
      const res = await axios.post(
        "https://a.khalti.com/api/v2/epayment/lookup/",
        {
          pidx: searchParams.get("pidx"),
        },
        {
          headers: {
            Authorization: "Key 6553308be8f54147930bb0b64858c5e4",
          },
        }
      );
      console.log(res?.data?.status);
      setIsSuccess(res?.data?.status === "Completed");
    };
    checkPaymentSuccess();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center p-24 space-y-4">
      {isSuccess ? (
        <h3>Thank You! Payment has been received.</h3>
      ) : (
        <h3>Oops! Some Problem Occured. Please Try again.</h3>
      )}
    </div>
  );
};

export default Success;
