import { Link } from 'react-router-dom'
import { BsCart3 } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'

import { useSelector } from 'react-redux'

const Header = () => {
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart)

  return (
    <header className=" bg-neutral py-2 text-neutral-content ">
      <div className="align-element flex justify-center sm:justify-start ">
        {/* CART LINK*/}
        <NavLink
          to="/dashboard/cart"
          className="btn btn-ghost btn-circle btn-sm ml-4"
        >
          <div className="indicator">
            <BsCart3 className="h-5 w-5" />
            <span className="badge badge-sm badge-primary indicator-item">
              8
            </span>
          </div>
        </NavLink>
      </div>
      <div className="align-element flex justify-center sm:justify-end ">
        {/* USER */}
        {/* LINKS */}
        <div className="flex gap-x-6 justify-center items-center">
          <Link to="/login" className="link link-hover text-xs sm:text-sm">
            Sign in / Guest
          </Link>
          <Link to="/register" className="link link-hover text-xs sm:text-sm">
            Create an Account
          </Link>
        </div>
      </div>
    </header>
  )
}
export default Header
