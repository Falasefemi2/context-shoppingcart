import { useState } from "react";
import { BsFillBagPlusFill } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import ExpandCartItem from "./ExpandCartItem";
import { useCart } from "../context/ProductContext";

const Header = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const { cartState } = useCart();
  const { cartItems } = cartState;

  const handleClick = () => {
    setToggle((prev) => !prev);
  };

  const getTotalQuantity = () => {
    let totalQuantity = 0;
    cartItems.forEach((item) => {
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  };

  return (
    <div className="flex items-center justify-between p-4">
      <div className="text-2xl font-extrabold text-yellow-300 items-start">
        FEMI'STORE
      </div>
      <div onClick={handleClick}>
        {toggle ? (
          <div className="relative z-[99] cursor-pointer top-[-10px] left-[150px]">
            <GrClose size={30} />
          </div>
        ) : (
          <div className="relative cursor-pointer">
            <BsFillBagPlusFill size={35} />
            {getTotalQuantity() > 0 && (
              <div className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm">
                {getTotalQuantity()}
              </div>
            )}
          </div>
        )}
        {toggle && <ExpandCartItem />}
      </div>
    </div>
  );
};

export default Header;

