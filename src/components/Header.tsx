import { BsFillBagPlusFill } from "react-icons/bs"

const Header = (): JSX.Element => {
    return (
        <div className="flex justify-between items-center p-4">
            <div className=" font-bold text-yellow-400 text-lg">FEMISTORE</div>
            <div className="relative">
                <div className="absolute -top-1 -right-2 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">0</span>
                </div>
                <div className="mt-4">
                    <BsFillBagPlusFill size={25} />
                </div>
            </div>

        </div>
    )
}

export default Header