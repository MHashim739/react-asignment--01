
import API_URL from "./api";
// GET ALL PRODUCTS
export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/api/products`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Products API Error:", error);
    throw error;
  }
};

// GET SINGLE PRODUCT
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`);

    if (!response.ok) {
      throw new Error("Product not found");
    }

    const data = await response.json();
    return data.product;
  } catch (error) {
    console.error("Product Detail API Error:", error);
    throw error;
  }
};

// ADD PRODUCT
export const addProduct = async (product) => {
  const response = await fetch(`${API_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(product),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to add product");
  }

  return data.product;
};

// UPDATE PRODUCT
export const updateProduct = async (id, product) => {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(product),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to update product");
  }

  return data.product;
};

// DELETE PRODUCT
export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to delete product");
  }

  return data;
};
