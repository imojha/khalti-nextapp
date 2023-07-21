"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/shared/card";
export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    const fetchStoreProducts = async () => {
      const res = await axios.get("https://fakestoreapi.com/products");
      setAllProducts(res?.data);
    };
    fetchStoreProducts();
  }, []);

  const handleClick = async (product: any) => {
    console.log("Button is clicked....", process.env.RETURN_URL);
    const payload = {
      return_url: process.env.NEXT_PUBLIC_RETURN_URL,
      website_url: process.env.NEXT_PUBLIC_WEBSITE_URL,
      amount: parseInt(product?.price) * 100,
      purchase_order_id: product?.id,
      purchase_order_name: product?.title,
      customer_info: {
        name: "Ashim Upadhaya",
        email: "example@gmail.com",
        phone: "9811496763",
      },
    };

    console.log(payload);

    const res: any = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      payload,
      {
        headers: {
          Authorization: `Key ${process.env.NEXT_PUBLIC_KHALTI_SECRET_KEY}`,
        },
      }
    );

    if (res && res?.data?.payment_url) {
      window.location.href = `${res?.data?.payment_url}`;
      // window.open(`${res?.data?.payment_url}`, "_blank");
    }
    console.log(res);
  };
  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-4">
      <h2 className="text-2xl">Khalti Integration into React/Next.js App Tutorial</h2>
      <hr className="bg-white w-full" />
      <div className="flex flex-wrap">
        {allProducts?.map((product: any) => (
          <div
            className="card-wrap w-1/3 p-4 flex flex-col justify-center"
            key={product.title}
          >
            <Card product={product} handleBuy={handleClick} />
          </div>
        ))}
      </div>
    </main>
  );
}
