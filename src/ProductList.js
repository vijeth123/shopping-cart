import React, { useState } from 'react';

function ProductList() {
  const [products, setProducts] = useState([
    {
      id: 1,
      description: 'Carrot',
      expires: true,
      expiryDate: '2024-04-30',
      category: 'Vegetables',
      price: 1.99,
      onSpecial: false
    },
    {
      id: 2,
      description: 'Banana',
      expires: true,
      expiryDate: '2024-05-01',
      category: 'Fruits',
      price: 3.50,
      onSpecial: true
    }
  ]);

  const [newProduct, setNewProduct] = useState({
    description: '',
    expires: false,
    expiryDate: '',
    category: '',
    price: '',
    onSpecial: false
  });

  const [categoryFilter, setCategoryFilter] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setNewProduct({ ...newProduct, [name]: newValue });
  };

  const handleAddProduct = () => {
    if (!newProduct.description || !newProduct.category || !newProduct.price) {
      alert('Please fill in all required fields.');
      return;
    }
    setProducts([...products, { id: Date.now(), ...newProduct }]);
    setNewProduct({
      description: '',
      expires: false,
      expiryDate: '',
      category: '',
      price: '',
      onSpecial: false
    });
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleEditProduct = (id, updatedProduct) => {
    setProducts(products.map(product => (product.id === id ? updatedProduct : product)));
  };

  const filteredProducts = categoryFilter ? products.filter(product => product.category === categoryFilter) : products;

  return (
    <div>
      <h1>Product List</h1>
      <div>
        <label>Filter by Category:</label>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Vegetables">Vegetables</option>
          {/* Add more category options as needed */}
        </select>
      </div>
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id} style={{ backgroundColor: product.onSpecial ? 'yellow' : 'transparent' }}>
            <div>{product.description}</div>
            <div>{product.category}</div>
            <div>{product.price}</div>
            {product.expires && <div>Expires: {product.expiryDate}</div>}
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            <button onClick={() => handleEditProduct(product.id, { ...product, onSpecial: !product.onSpecial })}>Toggle Special</button>
          </li>
        ))}
      </ul>
      <h2>Add New Product</h2>
      <div>
        <label>Description:</label>
        <input type="text" name="description" value={newProduct.description} onChange={handleInputChange} />
      </div>
      <div>
        <label>Expires:</label>
        <input type="checkbox" name="expires" checked={newProduct.expires} onChange={handleInputChange} />
      </div>
      {newProduct.expires && (
        <div>
          <label>Expiry Date:</label>
          <input type="date" name="expiryDate" value={newProduct.expiryDate} onChange={handleInputChange} />
        </div>
      )}
      <div>
        <label>Category:</label>
        <input type="text" name="category" value={newProduct.category} onChange={handleInputChange} />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} />
      </div>
      <div>
        <label>On Special:</label>
        <input type="checkbox" name="onSpecial" checked={newProduct.onSpecial} onChange={handleInputChange} />
      </div>
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
}

export default ProductList;