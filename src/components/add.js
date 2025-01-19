import React, { useState } from 'react';
import axios from 'axios';

const AddSaleForm = () => {
  const [product, setProduct] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantitySold, setQuantitySold] = useState('');
  const [saleDate, setSaleDate] = useState('');
  const [seller, setSeller] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const saleData = {
      product,
      category,
      price,
      quantitySold,
      saleDate,
      seller
    };

    try {
      const response = await axios.post('http://localhost:5000/api/sales', saleData);
      alert(response.data.message);  // Alert the success message
    } catch (error) {
      console.error('Error adding sale:', error);
      alert('Failed to add sale');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Ajouter une Vente</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Produit</label>
          <input
            type="text"
            className="form-control"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Catégorie</label>
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Prix</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantité vendue</label>
          <input
            type="number"
            className="form-control"
            value={quantitySold}
            onChange={(e) => setQuantitySold(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Date de vente</label>
          <input
            type="datetime-local"
            className="form-control"
            value={saleDate}
            onChange={(e) => setSaleDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Vendeur</label>
          <input
            type="text"
            className="form-control"
            value={seller}
            onChange={(e) => setSeller(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Ajouter la vente</button>
      </form>
    </div>
  );
};

export default AddSaleForm;
