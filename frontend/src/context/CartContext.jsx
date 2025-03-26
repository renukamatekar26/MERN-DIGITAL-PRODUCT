/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, {createContext, useContext, useState, useEffect, useCallback } from 'react';

// create context
const CartContext = createContext();

// provide /use
export const useCart = () => useContext(CartContext);



export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() =>{
        const localData = localStorage.getItem('cartItems');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) =>{
        setCartItems((previousItem) =>{
            // check if the product is alrwady added in the cart using id and find method
            const itemsInCart = previousItem.find((i) => i._id === item._id);
            // if item is already there , increase the quantity of the same item with the same id by 1 else make its quantity to i
            if(itemsInCart){
                return previousItem.map((i) =>
                i._id === item._id ? {...i, quantity: i.quantity + 1 } : i )
            }
            else{
                return [...previousItem, {...item, quantity: 1}]
            }
        })
    }

    const removeFromCart = (id) => {
        setCartItems((prevItems) =>{
            return prevItems.map((item) => {
                if(item._id === id){
                    return {...item , quantity: item.quantity - 1 };
                }
                return item;
            })
            .filter((item) => item.quantity > 0)
        })
    }

    const decreaseCartItemQuantity = (id) => {
        setCartItems((prevItems) =>{
            return prevItems.map((item) => {
                if(item._id === id && item.quantity >= 1 ){
                    return {...item , quantity: item.quantity - 1 };
                }
                return item;
            })
            .filter((item) => item.quantity > 0)
        })
    }

    const clearCart = useCallback(() => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    }, [])
  return (
    <CartContext.Provider value={{
        cartItems, 
        addToCart, 
        removeFromCart,
        decreaseCartItemQuantity,
        clearCart
        }}>
        {children}
    </CartContext.Provider>
  )
}


