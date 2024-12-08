import React from 'react';
import { useState } from 'react';
import "../../css/Products.css";
import { getProducts, deleteProduct } from '../../api/BooksApi';
import { useEffect } from 'react';
import StatusMessageModal from '../modals/StatusMessageModal';

const Products = () => {
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [products, setProducts] = useState([
       /* { 
        id: 1,
        coverImage: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1672676191i/75513900.jpg',
        title: 'Powerless', 
        author: "Lauren Roberts",
        numberOfPages: 500,
        description: "The powers these Elites have possessed for decades were graciously gifted to them by the Plague, though not all were fortunate enough to both survive the sickness and reap the reward. Those born Ordinary are just that—ordinary. And when the king decreed that all Ordinaries be banished in order to preserve his Elite society, lacking an ability suddenly became a crime—making Paedyn Gray a felon by fate and a thief by necessity. The powers these Elites have possessed for decades were graciously gifted to them by the Plague, though not all were fortunate enough to both survive the sickness and reap the reward. Those born Ordinary are just that—ordinary. And when the king decreed that all Ordinaries be banished in order to preserve his Elite society, lacking an ability suddenly became a crime—making Paedyn Gray a felon by fate and a thief by necessity. The powers these Elites have possessed for decades were graciously gifted to them by the Plague, though not all were fortunate enough to both survive the sickness and reap the reward. Those born Ordinary are just that—ordinary. And when the king decreed that all Ordinaries be banished in order to preserve his Elite society, lacking an ability suddenly became a crime—making Paedyn Gray a felon by fate and a thief by necessity."
    },
    { 
        id: 1,
        coverImage: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1672676191i/75513900.jpg',
        title: 'Powerless', 
        author: "Lauren Roberts",
        numberOfPages: 500,
        description: "The powers these Elites have possessed for decades were graciously gifted to them by the Plague, though not all were fortunate enough to both survive the sickness and reap the reward. Those born Ordinary are just that—ordinary. And when the king decreed that all Ordinaries be banished in order to preserve his Elite society, lacking an ability suddenly became a crime—making Paedyn Gray a felon by fate and a thief by necessity. The powers these Elites have possessed for decades were graciously gifted to them by the Plague, though not all were fortunate enough to both survive the sickness and reap the reward. Those born Ordinary are just that—ordinary. And when the king decreed that all Ordinaries be banished in order to preserve his Elite society, lacking an ability suddenly became a crime—making Paedyn Gray a felon by fate and a thief by necessity. The powers these Elites have possessed for decades were graciously gifted to them by the Plague, though not all were fortunate enough to both survive the sickness and reap the reward. Those born Ordinary are just that—ordinary. And when the king decreed that all Ordinaries be banished in order to preserve his Elite society, lacking an ability suddenly became a crime—making Paedyn Gray a felon by fate and a thief by necessity."
    }*/ 
    ]);

   const fetchProducts = async () => {
        try {
          const data = await getProducts();
          setProducts(data);
        } catch (error) {
          console.error("Error fetching products:", error);
         setProducts([]);
        }
      };
    
      useEffect(() => {
        fetchProducts();
      }, []); 

    const removeProduct = async (productId) => {
        try {
            await deleteProduct(productId);
            setStatusMessage("Product has been deleted successfully.");
            setIsStatusModalOpen(true);
            await fetchProducts();
        } catch (error) {
            setStatusMessage("Product could not be deleted.");
            setIsStatusModalOpen(true);
        }
    }

    const handleCloseStatusModal = async () => {
        setIsStatusModalOpen(false);
        setStatusMessage("")
    }

    return (
        <div className='page-div' id="admin-dash">
            <div className='admin-products-container'>
                {
                    products.map((product) => {
                        return (
                            <div className='item-container'>
                                 <div className='item-trash-container'>
                                    <img src="/images/trash.png" onClick={() => {
                                        removeProduct(product.id)
                                    }}></img>
                                 </div>
                                 <div className='admin-product-container'>
                                    <div className='admin-product-image-container'>
                                        <img src={product.coverImage} alt={product.title} />
                                    </div>
                                    <div className='admin-product-info-container'>
                                        <div className='admin-detail-div'>
                                            <p className='admin-detail-title'>TITLE: </p>
                                            <p className='admin-value-p'>{product.title}</p>
                                        </div>
                                        <div className='admin-detail-div'>
                                            <p className='admin-detail-title'>AUTHOR: </p>
                                            <p className='admin-value-p'>{product.author}</p>
                                        </div>
                                        <div className='admin-detail-div'>
                                            <p className='admin-detail-title'>GENRE: </p>
                                            <p className='admin-value-p'>{product.genre}</p>
                                        </div>
                                        <div className='admin-detail-div'>
                                            <p className='admin-detail-title'>NUMBER OF PAGES: </p>
                                            <p className='admin-value-p'>{product.numberOfPages}</p>
                                        </div>
                                        <div className='admin-detail-div'>
                                            <p className='admin-detail-title'>DESCRIPTION: </p>
                                        </div>
                                        <div className='admin-description-container'>
                                            <p>{product.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {isStatusModalOpen && (
                <StatusMessageModal
                isOpen={isStatusModalOpen}
                onClose={handleCloseStatusModal}
                message={statusMessage}
                />
             )}
        </div>
    );
};

export default Products;
