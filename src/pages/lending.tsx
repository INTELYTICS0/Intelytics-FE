import React from "react";
import Image from "next/image";

const Lending = () => {
  return (
    <div className=" flex flex-col items-center justify-center pt-20">
      <div className=" font-extrabold text-5xl ">Cooking Right Now</div>
      <Image src={"/nodata.png"} alt="" height={300} width={300} />
    </div>
  );
};

export default Lending;
