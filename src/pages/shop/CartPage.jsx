import React, { useContext, useState ,useEffect} from "react";
import useCart from "../../hooks/useCart";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from "axios";

const CartPage = () => {
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const [cartItems, setCartItems] = useState([]);
  

  // Calculate the total price for each item in the cart
  const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };

  // Handle quantity increase
  const handleIncrease = async (item) => {
    try {
      const response = await fetch(`https://onext-server1.onrender.com/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: item.quantity + 1 }),
      });

      if (response.ok) {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        await refetch();
        setCartItems(updatedCart);
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Handle quantity decrease
  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      try {
        const response = await fetch(
          `https://onext-server1.onrender.com/carts/${item._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: item.quantity - 1 }),
          }
        );

        if (response.ok) {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          });
          await refetch();
          setCartItems(updatedCart);
        } else {
          console.error("Failed to update quantity");
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  // Calculate the cart subtotal
  const cartSubtotal = cart.reduce((total, item) => {
    return total + calculateTotalPrice(item);
  }, 0);

  // Calculate the order total
  const orderTotal = cartSubtotal;

  // Delete an item
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://onext-server1.onrender.com/carts/${item._id}`).then(response => {
          if (response) {
            refetch();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        })
        .catch(error => {
          console.error(error);
        });
      }
    });
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-20 px-4">
      <div className='section-container bg-yellow-400 mb-8'>
        <div className='py-48 flex flex-col justify-center items-center gap-8'>
          <div className='text-center space-y-7 px-4'>
            <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
              Items Added to The
              <span className='text-pink'> Cart</span>
            </h2>
            <p className='text-xl text-[#4a4a4a] md:w-4/5 mx-auto'>
              Come with family and experience the joy of our stunning fashion pieces, from classic essentials to rich statement items, refreshing trends, and more all at an affordable price.
            </p>
            <button className='btn bg-pink px-8 py-3 font-semibold text-white rounded-full'>Back to Menu</button>
          </div>
        </div>
      </div>
      {/* Cart table */}
      {
        (cart.length > 0) ? (
          <div>
            <div className="">
              <div className="overflow-x-auto">
                <table className="table">
                  {/* Head */}
                  <thead className="bg-pink text-white rounded-sm">
                    <tr>
                      <th>#</th>
                      <th>Item</th>
                      <th>Item Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={item.image} alt="item image" />
                            </div>
                          </div>
                        </td>
                        <td className="font-medium">{item.name}</td>
                        <td>
                          <button className="btn btn-xs" onClick={() => handleDecrease(item)}>-</button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={() => console.log(item.quantity)}
                            className="w-10 mx-2 text-center overflow-hidden appearance-none"
                          />
                          <button className="btn btn-xs" onClick={() => handleIncrease(item)}>+</button>
                        </td>
                        <td>Rs.{calculateTotalPrice(item).toFixed(2)}</td>
                        <td>
                          <button className="btn btn-sm border-none text-red bg-transparent" onClick={() => handleDelete(item)}>
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <hr />
            <div className="flex flex-col md:flex-row justify-between items-start my-12 gap-8">
              <div className="md:w-1/2 space-y-3">
                <h3 className="text-lg font-semibold">Customer Details</h3>
                <p>Name: {user?.displayName || "None"}</p>
                <p>Address: {user?.displayAddress || "None"}</p>
                <p>Email: {user?.email}</p>
                
              </div>
              <div className="md:w-1/2 space-y-3">
                <h3 className="text-lg font-semibold">Shopping Details</h3>
                <p>Total Items: {cart.length}</p>
                <p>Total Price: <span id="total-price">Rs.{orderTotal.toFixed(2)}</span></p>
                <Link to='/process-checkout'>
                  <button className="btn btn-md bg-pink text-white px-8 py-1 mt-3">Proceed to Checkout</button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center mt-20">
            <p>Cart is empty. Please add products.</p>
            <Link to="/menu">
              <button className="btn bg-pink text-white mt-3">Back to Home</button>
            </Link>
          </div>
        )
      }
    </div>
  );
};

export default CartPage;
