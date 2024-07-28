import React, { useState } from "react";
import ItemListOneMore from "./ItemListOneMore";

const ItemListMore = ({ data }) => {
  // const [showItems, setShowItems ] = useState(false);
  // console.log("itemListMore", data);
  // const handleClick = () => {
  //   setShowItems(!showItems);
  //    };
  return (
    <div>
      {data.map((res) => (
        <div key={res.card.info.id}>
          <ItemListOneMore data={res.card.info} />
        </div>
      ))}
    </div>
  );
};

export default ItemListMore;
