"use client";
import { useEffect } from "react";
import getProducts from "./data/getProducts";

export default function Home() {

  useEffect(() => {
    async function loadProducts() {
      try {
        const storedProducts = localStorage.getItem("products");
        if (!storedProducts) {
          const allProducts = await getProducts();
          const validCategories = ["men's clothing", "jewelery", "electronics", "women's clothing"];
          const filteredProducts = allProducts.filter(product =>
            validCategories.includes(product.category)
          );
          localStorage.setItem("products", JSON.stringify(filteredProducts));
        }
      } catch (err) {
        console.error("Error loading products to local storage:", err);
      }
    }

    loadProducts();
  }, []);
    return (
        <>
            <h1>Hello world!</h1>
        </>
    )
}