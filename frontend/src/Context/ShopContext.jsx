import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "€";
  const delivery_fee = 4.99;
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {};
  });
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userId, setUserId] = useState(() => {
    const storedId = localStorage.getItem("userId");
    return storedId ? Number(storedId) : null;
  });
  const navigate = useNavigate();

  const handleTokenChange = (newToken, newUserId = null) => {
    if (newToken === token && newUserId === userId) return;

    setToken(newToken || "");
    setUserId(newUserId ? Number(newUserId) : null);
    localStorage.setItem("token", newToken || "");

    if (newUserId) {
      localStorage.setItem("userId", newUserId);
    } else {
      localStorage.removeItem("userId");
    }

    if (newToken) {
      localStorage.removeItem("cart");
      getUserCart();
    } else {
      localStorage.setItem("cart", JSON.stringify(cartItems));
      setCartItems({});
    }
  };

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers["token"] = token;
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);

  useEffect(() => {
    if (!token && Object.keys(cartItems).length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, token]);

  const addToCart = async (itemId, manufacturer) => {
    if (!manufacturer) {
      toast.error("Select Product Manufacturer");
      return;
    }

    const newCartItems = { ...cartItems };

    if (newCartItems[itemId]) {
      newCartItems[itemId][manufacturer] =
        (newCartItems[itemId][manufacturer] || 0) + 1;
    } else {
      newCartItems[itemId] = { [manufacturer]: 1 };
    }

    setCartItems(newCartItems);

    if (token) {
      try {
        const response = await axios.post(`${backendUrl}/api/cart/add`, {
          itemId,
          manufacturer,
        });

        if (!response.data.success) {
          throw new Error(response.data.message || "Failed to add to cart");
        }
      } catch (error) {
        setCartItems((prev) => {
          const reverted = { ...prev };
          if (reverted[itemId]?.[manufacturer]) {
            reverted[itemId][manufacturer] -= 1;
            if (reverted[itemId][manufacturer] <= 0) {
              delete reverted[itemId][manufacturer];
              if (Object.keys(reverted[itemId]).length === 0) {
                delete reverted[itemId];
              }
            }
          }
          return reverted;
        });
        toast.error(error.response?.data?.message || "Failed to add to cart");

        if (error.response?.status === 401) {
          handleTokenChange("");
        }
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(newCartItems));
    }
  };

  const updateQuantity = async (itemId, manufacturer, quantity) => {
    const newCartItems = { ...cartItems };

    if (!newCartItems[itemId]) {
      newCartItems[itemId] = {};
    }

    newCartItems[itemId][manufacturer] = quantity;

    if (quantity <= 0) {
      delete newCartItems[itemId][manufacturer];
      if (Object.keys(newCartItems[itemId]).length === 0) {
        delete newCartItems[itemId];
      }
    }

    setCartItems(newCartItems);

    if (token) {
      try {
        const response = await axios.post(`${backendUrl}/api/cart/update`, {
          itemId,
          manufacturer,
          quantity,
        });

        if (!response.data.success) {
          throw new Error(response.data.message || "Failed to update quantity");
        }
      } catch (error) {
        if (token) getUserCart();
        toast.error(
          error.response?.data?.message || "Failed to update quantity"
        );

        if (error.response?.status === 401) {
          handleTokenChange("");
        }
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(newCartItems));
    }
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, items) => {
      return total + Object.values(items).reduce((sum, qty) => sum + qty, 0);
    }, 0);
  };

  const getCartAmount = () => {
    return Object.entries(cartItems).reduce(
      (total, [itemId, manufacturers]) => {
        const product = products.find((p) => p._id === itemId);
        if (!product) return total;
        return (
          total +
          Object.values(manufacturers).reduce((sum, qty) => {
            return sum + product.price * qty;
          }, 0)
        );
      },
      0
    );
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(
          response.data.products.map((p) => ({
            ...p,
            _id: String(p._id),
          }))
        );
      }
    } catch (error) {
      toast.error("Failed to load products");
    }
  };

  const getUserCart = async () => {
    if (!token) {
      const localCart = localStorage.getItem("cart");
      if (localCart) {
        setCartItems(JSON.parse(localCart));
      }
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        {
          headers: {
            token: token,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
        localStorage.removeItem("cart");
      } else {
        throw new Error(response.data.message || "Failed to fetch cart");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        handleTokenChange("");
        toast.error("Session expired, please login again");
      }
      const localCart = localStorage.getItem("cart");
      if (localCart) {
        setCartItems(JSON.parse(localCart));
      }
    }
  };

  useEffect(() => {
    getProductsData();
    if (token) {
      getUserCart();
    } else {
      const localCart = localStorage.getItem("cart");
      if (localCart) {
        setCartItems(JSON.parse(localCart));
      }
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    navigate,
    backendUrl,
    setToken: handleTokenChange,
    token,
    userId,
    setCartItems,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
