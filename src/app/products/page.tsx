"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./Card";
import MacbookAir from "./MaccbookAir";
import Iwatch from "./Iwatch";
import { Product } from "../../../types";
import { BASE_URL } from "@/constant";
import Footer from "@/components/Footer";

type ResponseType<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

const fetchAllProducts = async (
  page: number,
  search: string = ""
): Promise<Product[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/products?page=${page}&search=${search}`,
      {
        cache: "no-store",
      }
    );

    const allProducts: ResponseType<Product[]> = await response.json();

    console.log(allProducts, "Fetched products");

    if (!response.ok) {
      throw new Error();
    }

    const { data } = allProducts;
    return data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export default function HomeProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchAllProducts(page, search);
        if (page === 1) {
          setProducts(data);
        } else {
          setProducts((prevProducts) => [...prevProducts, ...data]);
        }
        if (data.length === 0 || products.length + data.length >= 27) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    loadProducts();
  }, [page, search]);

  const fetchMoreData = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
    setHasMore(true);
  };

  return (
    <>
      <div
        style={{
          paddingTop: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative", // Required for z-index to work
          zIndex: 10, // Ensure the container is on top
        }}
      >
        <div style={{ width: "100%", maxWidth: "500px", position: "relative" }}>
          {/* Center container with relative positioning */}
          <input
            type="text"
            placeholder="Search by product name..."
            value={search}
            onChange={handleSearchChange}
            style={{
              width: "100%", // Make the input take up full width of the container
              padding: "12px 15px",
              fontSize: "16px",
              borderRadius: "25px",
              border: "1px solid #ddd",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              outline: "none",
              transition: "border-color 0.3s",
              position: "relative", // Required for z-index to work
              zIndex: 10, // Ensure the input is on top
            }}
            onFocus={(e) => (e.target.style.borderColor = "#0070f3")}
            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={products.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>All products loaded</p>}
      >
        <Card data={products} />
      </InfiniteScroll>
      <MacbookAir />
      <Iwatch />
      <Footer />
    </>
  );
}
