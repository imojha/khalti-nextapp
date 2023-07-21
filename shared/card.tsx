import React from "react";
import Image from "next/image";
type Props = {
  product: any;
  handleBuy: (product: any) => void;
};
const Card = ({ product, handleBuy }: Props) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-20 flex flex-col space-y-4">
      <Image src={`${product.image}`} width={200} height={200} alt="Product Image" />
      <div className="px-6 py-4 space-y-4">
        <div className="font-bold text-xl mb-2">{product.title}</div>
        <p>Price: {parseInt(product.price)}</p>
        <button
          style={{ backgroundColor: "#592C8C" }}
          className="p-4"
          onClick={() => handleBuy(product)}
        >
          BUY NOW
        </button>
      </div>
    </div>
  );
};

export default Card;
