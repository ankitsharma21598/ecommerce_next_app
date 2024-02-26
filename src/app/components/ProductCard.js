// components/ProductCard.js

const ProductCard = ({ product }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p className="text-gray-600">${product.price}</p>
        <p className="text-sm">{product.description}</p>
        <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md">Add to Cart</button>
      </div>
    );
  };
  
  export default ProductCard;
  