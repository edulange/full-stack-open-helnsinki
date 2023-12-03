/* eslint-disable */

import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-center items-center space-x-4 bg-gray-800 p-4">
      <Link to='/' className="text-white hover:text-gray-300">Blogs</Link>
      <Link to='/users' className="text-white hover:text-gray-300">Users</Link>
    </header>
  );
}

export default Header;
