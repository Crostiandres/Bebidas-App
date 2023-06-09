import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../../Navbar/Navbar';
import SearchBar from '../../SearchBar/SearchBar';
import './Tienda.css';
import Toolbar from '../../ToolBar/ToolBar';
import SearchResults from '../../SearchResults/SearchResults';
import Footer from '../../Footer/Footer'

function Tienda() {
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://servidor-vinos.onrender.com/product/all', {
          params: {
            paginas: currentPage
          }
        });

        // Verificar si la respuesta fue exitosa y actualizar los resultados de búsqueda
        if (response.status === 200) {
          setSearchResults(response.data);
        } else {
          console.error('Error al buscar productos:', response.data.error);
        }
      } catch (error) {
        console.error('Error al buscar productos:', error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <NavBar />
      <Toolbar />
      <div className="product-list">
        <SearchResults searchResults={searchResults} />
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Anterior</button>
        <button onClick={handleNextPage}>Siguiente</button>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Tienda;
