import React, { useEffect, useState } from "react";
import filterIcon from "../assets/icon1.svg";
import gridIcon from "../assets/icon2.svg";
import listIcon from "../assets/icon3.svg";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { BACKEND_URL } from "../../utils/utils";

const Cards = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(16);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    originalPrice: "",
    isNewProduct: false,
  });

  const [filters, setFilters] = useState({
    brand: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const params = { page, limit, sortBy, order };
      if (filters.brand) params.brand = filters.brand;
      if (filters.category) params.category = filters.category;
      if (filters.minPrice !== "") params.minPrice = filters.minPrice;
      if (filters.maxPrice !== "") params.maxPrice = filters.maxPrice;

      const response = await axios.get(
        `${BACKEND_URL}/product/get`,
        { params, withCredentials: true }
      );

      setProducts(response.data.products);
      setTotal(response.data.total);
    } catch (error) {
      toast.error("Error fetching products");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, sortBy, order, filters]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleCreate = async () => {
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      };

      await axios.post(`${BACKEND_URL}/product/create`, payload, {
        withCredentials: true,
      });
      toast.success("Product created successfully!");
      setShowCreatePopup(false);
      setFormData({
        name: "",
        description: "",
        brand: "",
        category: "",
        price: "",
        originalPrice: "",
        isNewProduct: false,
      });
      setPage(1);
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating product");
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      };

      await axios.put(
        `${BACKEND_URL}/product/update/${currentProduct._id}`,
        payload,
        { withCredentials: true }
      );
      toast.success("Product updated successfully!");
      setShowUpdatePopup(false);
      setCurrentProduct(null);
      setFormData({
        name: "",
        description: "",
        brand: "",
        category: "",
        price: "",
        originalPrice: "",
        isNewProduct: false,
      });
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating product");
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/product/delete/${id}`, {
        withCredentials: true,
      });
      toast.success("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting product");
      console.log(error);
    }
  };

  const totalPages = Math.ceil(total / limit);
  const startItem = total === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  const clearFilters = () => {
    setFilters({ brand: "", category: "", minPrice: "", maxPrice: "" });
    setPage(1);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-12">
      <Toaster position="top-center" />

      {/* Filter / Sort Section */}
      <div className="w-full bg-[#f1e7cf] py-4 px-4 sm:px-6 rounded mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
        {/* Left Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <div className="relative">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setFilterOpen(!filterOpen)}>
              <img src={filterIcon} alt="Filter" className="w-6 h-6" />
              <h1 className="font-medium">Filter</h1>
            </div>
            {filterOpen && (
              <div className="absolute left-0 top-full mt-2 bg-white p-3 shadow rounded z-40 flex flex-col sm:flex-row gap-2 sm:gap-3">
                <select
                  className="h-10 px-2 bg-white shadow rounded cursor-pointer"
                  value={filters.brand}
                  onChange={(e) => setFilters((prev) => ({ ...prev, brand: e.target.value }))}
                >
                  <option value="">All Brands</option>
                  <option value="Durian">Durian</option>
                  <option value="IKEA">IKEA</option>
                  <option value="Godrej Interio">Godrej Interio</option>
                  <option value="Urban Ladder">Urban Ladder</option>
                  <option value="Home Centre">Home Centre</option>
                  <option value="Pepperfry">Pepperfry</option>
                </select>

                <select
                  className="h-10 px-2 bg-white shadow rounded cursor-pointer"
                  value={filters.category}
                  onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
                >
                  <option value="">All Categories</option>
                  <option value="chair">Chair</option>
                  <option value="Table&Stools">Table & Stools</option>
                  <option value="Sofa">Sofa</option>
                </select>

                <input
                  type="number"
                  placeholder="Min"
                  className="h-10 w-24 px-2 border rounded"
                  value={filters.minPrice}
                  onChange={(e) => setFilters((prev) => ({ ...prev, minPrice: e.target.value }))}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="h-10 w-24 px-2 border rounded"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))}
                />

                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <button className="px-3 py-2 bg-[#c78437] text-white rounded" onClick={() => { setPage(1); setFilterOpen(false); }}>
                    Apply
                  </button>
                  <button className="px-3 py-2 bg-gray-200 rounded" onClick={() => { clearFilters(); setFilterOpen(false); }}>
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <img src={gridIcon} alt="Grid View" className="w-6 h-6 cursor-pointer" />
            <img src={listIcon} alt="List View" className="w-6 h-6 cursor-pointer" />
          </div>

          <div>
            <h1 className="text-gray-700 font-medium">
              Showing {startItem}–{endItem} of {total} results
            </h1>
          </div>
        </div>

        {/* Center Section */}
        <div>
          <button
            className="px-5 py-2 bg-white text-[#c78437] font-bold shadow cursor-pointer"
            onClick={() => setShowCreatePopup(true)}
          >
            Add Product
          </button>
        </div>

        {/* Right Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
          <div className="flex items-center gap-3">
            <h1 className="font-medium">Show</h1>
            <select
              className="h-10 w-20 bg-white text-gray-400 shadow px-2 cursor-pointer"
              value={limit}
              onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
            >
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={16}>16</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="font-medium">Sort by</h1>
            <select
              className="h-10 w-36 bg-white text-gray-400 shadow px-2 cursor-pointer"
              value={`${sortBy}-${order}`}
              onChange={(e) => {
                const [field, sortOrder] = e.target.value.split("-");
                setSortBy(field);
                setOrder(sortOrder);
              }}
            >
              <option value="brand-asc">Brand Asc</option>
              <option value="brand-desc">Brand Desc</option>
              <option value="price-asc">Price Low to High</option>
              <option value="price-desc">Price High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div key={index} className="relative bg-gray-100 overflow-hidden shadow-lg group cursor-pointer rounded-lg">
            
            {/* Hover Buttons */}
            <div className="absolute inset-0 bg-opacity-0 group-hover:backdrop-brightness-50 flex items-center justify-center gap-3 transition duration-300 z-20 pointer-events-none">
              <button
                className="px-4 py-2 bg-[#f1e7cf] text-[#c78437] font-bold opacity-0 group-hover:opacity-100 transition pointer-events-auto cursor-pointer"
                onClick={() => {
                  setCurrentProduct(product);
                  setFormData({ ...product });
                  setShowUpdatePopup(true);
                }}
              >
                Update
              </button>
              <button
                className="px-4 py-2 bg-[#f1e7cf] text-[#c78437] font-bold opacity-0 group-hover:opacity-100 transition pointer-events-auto cursor-pointer"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </div>

            {/* Badge */}
            <div className="absolute top-4 right-4 h-10 w-10 rounded-full flex items-center justify-center text-white font-bold z-30">
              {product.isNewProduct ? (
                <div className="bg-green-500 w-full h-full flex items-center justify-center rounded-full">New</div>
              ) : product.discountPercent ? (
                <div className="bg-red-400 w-full h-full flex items-center justify-center rounded-full">-{product.discountPercent}%</div>
              ) : (
                <div className="bg-red-400 w-full h-full flex items-center justify-center rounded-full">-30%</div>
              )}
            </div>

            {/* Image */}
            <div className="w-full aspect-[4/3] overflow-hidden">
              <img
                src={`https://furniro-ga3w.onrender.com${product.imageUrl}`}
                alt={product.name}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Info */}
            <div className="p-4 bg-white relative z-10">
              <h1 className="font-bold text-lg sm:text-xl">{product.name}</h1>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">{product.description}</p>
              <h1 className="mt-1 text-sm sm:text-base">{product.brand}</h1>
              <div className="flex justify-between mt-2 items-center">
                <h1 className="font-bold text-red-600 text-lg sm:text-xl">Rp {product.price}.000</h1>
                <h1 className="line-through text-gray-400 text-sm sm:text-base">Rp {product.originalPrice}.000</h1>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-2 my-6">
          {page > 1 && (
            <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} className="px-4 py-2 bg-[#f1e7cf] rounded">
              Prev
            </button>
          )}

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded ${page === i + 1 ? "bg-[#c78437] text-black" : "bg-[#f1e7cf]"}`}
            >
              {i + 1}
            </button>
          ))}

          {page < totalPages && (
            <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} className="px-4 py-2 bg-[#f1e7cf] rounded">
              Next
            </button>
          )}
        </div>
      )}

      {/* Create Product Popup */}
            {showCreatePopup && (
                <div className="fixed inset-0 backdrop-brightness-25 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 w-96 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Add Product</h2>
                        {["name", "description", "brand", "category", "price", "originalPrice"].map((field) => (
                            <input
                                key={field}
                                type={field.includes("Price") ? "number" : "text"}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                placeholder={field}
                                className="w-full mb-2 p-2 border rounded"
                            />
                        ))}
                        <div className="flex items-center gap-2 mb-2">
                            <input
                                type="checkbox"
                                name="isNewProduct"
                                checked={formData.isNewProduct}
                                onChange={handleChange}
                            />
                            <label>Is New Product</label>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded cursor-pointer" onClick={() => setShowCreatePopup(false)}>Cancel</button>
                            <button className="px-4 py-2 bg-[#e88411]  hover:bg-[#f79c33] text-white rounded cursor-pointer" onClick={handleCreate}>Add</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Product Popup */}
            {showUpdatePopup && (
                <div className="fixed inset-0 backdrop-brightness-25 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 w-96 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Update Product</h2>
                        {["name", "description", "brand", "category", "price", "originalPrice"].map((field) => (
                            <input
                                key={field}
                                type={field.includes("Price") ? "number" : "text"}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                placeholder={field}
                                className="w-full mb-2 p-2 border rounded"
                            />
                        ))}
                        <div className="flex items-center gap-2 mb-2">
                            <input
                                type="checkbox"
                                name="isNewProduct"
                                checked={formData.isNewProduct}
                                onChange={handleChange}
                            />
                            <label>Is New Product</label>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded cursor-pointer" onClick={() => setShowUpdatePopup(false)}>Cancel</button>
                            <button className="px-4 py-2 bg-[#e88411] hover:bg-[#f79c33] text-white rounded cursor-pointer" onClick={handleUpdate}>Update</button>
                        </div>
                    </div>
                </div>
            )}
    </div>
  );
};

export default Cards;
