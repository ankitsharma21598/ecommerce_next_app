// components/Header.js

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Ecommerce Site</h1>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="hover:text-gray-300">Home</a>
          </li>
          <li>
            <a href="/pages/cart" className="hover:text-gray-300">Cart</a>
          </li>
          <li>
            <a href="/pages/orders" className="hover:text-gray-300">Orders</a>
          </li>
          <li>
            <a href="/login" className="hover:text-gray-300">Login</a>
          </li>
          <li>
            <a href="/register" className="hover:text-gray-300">Register</a>
          </li>
          <li>
            <a href="/logout" className="hover:text-gray-300">Logout</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
