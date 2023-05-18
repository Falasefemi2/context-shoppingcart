import { useState } from "react"
import { BsChevronContract, BsFillBagPlusFill } from "react-icons/bs"
import ExpandCartItem from "./ExpandCartItem";

const Header = () => {
    const [toggle, setToggle] = useState<boolean>(false);

    const handleClick = () => {
        setToggle(prev => !prev)
    }

    return (
        <div className="flex items-center justify-between p-4">
            <div className=" text-2xl font-extrabold text-yellow-300 items-start">
                FEMI'STORE
            </div>
            <div onClick={handleClick}>
                {toggle ? <BsChevronContract size={30} /> : <BsFillBagPlusFill size={30} /> }
                {toggle && <ExpandCartItem />}
            </div>
        </div>
    )
}

export default Header