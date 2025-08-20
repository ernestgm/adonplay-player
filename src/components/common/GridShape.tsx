import Image from "next/image";
import React from "react";

export default function GridShape() {
  return (
    <>
      <div className="position-absolute right-0 top-0">
        <Image
          width={540}
          height={254}
          src="/images/shape/grid-01.svg"
          alt="grid"
        />
      </div>
      <div className="position-absolute bottom-0 left-0">
        <Image
          width={540}
          height={254}
          src="/images/shape/grid-01.svg"
          alt="grid"
        />
      </div>
    </>
  );
}
