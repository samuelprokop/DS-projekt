import React, { useState } from "react";
import { assets } from "../assets/assets";
import "./Add.css";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cta, setCta] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!category) {
        toast.error("Please select a category");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("cta", cta);
      formData.append("price", price);
      formData.append("manufacturers", JSON.stringify(selectedManufacturers));
      formData.append("bestseller", bestseller);
      formData.append("category", category);
      formData.append("branches", JSON.stringify(selectedBranches));
      formData.append("subCategories", JSON.stringify(selectedBranches));
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Product added successfully!");
        setName("");
        setDescription("");
        setCta("");
        setPrice("");
        setCategory("");
        setBestseller(false);
        setSelectedBranches([]);
        setSelectedManufacturers([]);
        setImage(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const branches = [
    "Bánska Bystrica",
    "Bratislava",
    "Handlová",
    "Košice",
    "Liptovský Mikuláš",
    "Nitra",
    "Nové Zámky",
    "Poprad",
    "Prešov",
    "Prievidza",
    "Rožňava",
    "Senec",
    "Trenčín",
    "Zvolen",
    "Online",
  ];

  const manufacturers = [
    "Audi",
    "BMW",
    "Ford",
    "Honda",
    "Mercedes",
    "Seat",
    "Škoda",
    "Toyota",
    "Universal",
    "Volkswagen",
    "Volvo",
  ];

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleBranchChange = (branch) => {
    setSelectedBranches((prev) =>
      prev.includes(branch)
        ? prev.filter((b) => b !== branch)
        : [...prev, branch]
    );
  };

  const handleManufacturerChange = (manufacturer) => {
    setSelectedManufacturers((prev) =>
      prev.includes(manufacturer)
        ? prev.filter((m) => m !== manufacturer)
        : [...prev, manufacturer]
    );
  };

  const toggleAllBranches = () => {
    setSelectedBranches((prev) =>
      prev.length === branches.length ? [] : [...branches]
    );
  };

  const toggleAllManufacturers = () => {
    setSelectedManufacturers((prev) =>
      prev.length === manufacturers.length ? [] : [...manufacturers]
    );
  };

  const splitIntoColumns = (array) => {
    const half = Math.ceil(array.length / 2);
    return [array.slice(0, half), array.slice(half)];
  };

  const [manufacturerCol1, manufacturerCol2] = splitIntoColumns(manufacturers);
  const [branchCol1, branchCol2] = splitIntoColumns(branches);

  return (
    <form onSubmit={onSubmitHandler} className="add-form">
      <div className="form-section">
        <p className="section-label">Upload Image</p>
        <label htmlFor="img" className="upload-label">
          {image ? (
            <img
              className="upload-preview"
              src={URL.createObjectURL(image)}
              alt="Preview"
            />
          ) : (
            <>
              <img
                className="upload-icon"
                src={assets.upload_area}
                alt="Upload"
              />
              <p className="upload-text">Click to upload image</p>
            </>
          )}
          <input
            onChange={handleImageChange}
            type="file"
            id="img"
            className="file-input"
            accept="image/*"
            hidden
          />
        </label>
        {image && (
          <button
            type="button"
            onClick={() => setImage(null)}
            className="remove-image-btn"
          >
            Remove Image
          </button>
        )}
      </div>

      <div className="form-section">
        <div>
          <p className="section-label">Product Name</p>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="text-input"
            type="text"
            placeholder="Type here"
            required
          />
        </div>

        <div>
          <p className="section-label">Product description</p>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="text-area"
            placeholder="Write content here"
            required
          />
        </div>

        <div>
          <p className="section-label">Call to action</p>
          <textarea
            value={cta}
            onChange={(event) => setCta(event.target.value)}
            className="text-input"
            placeholder="Submit call to action"
            required
          />
        </div>
      </div>

      <div className="form-section">
        <p className="section-label">Product category</p>
        <div className="button-group">
          <button
            type="button"
            onClick={() => setCategory("nahradne_diely")}
            className={`category-btn ${
              category === "nahradne_diely" ? "active" : ""
            }`}
          >
            Náhradné diely
          </button>
          <button
            type="button"
            onClick={() => setCategory("prislusenstvo")}
            className={`category-btn ${
              category === "prislusenstvo" ? "active" : ""
            }`}
          >
            Príslušenstvo
          </button>
        </div>
        <p className="selection-hint">
          {category
            ? `Selected: ${
                category === "nahradne_diely"
                  ? "Náhradné diely"
                  : "Príslušenstvo"
              }`
            : "No category selected"}
        </p>
      </div>

      <div className="form-section">
        <p className="section-label">Warehouse</p>
        <div className="checkbox-grid">
          <div className="checkbox-column">
            <div className="checkbox-item select-all">
              <input
                type="checkbox"
                checked={selectedBranches.length === branches.length}
                onChange={toggleAllBranches}
                className="styled-checkbox"
              />
              <label className="checkbox-label">Select All</label>
            </div>
            {branchCol1.map((branch) => (
              <div key={branch} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={selectedBranches.includes(branch)}
                  onChange={() => handleBranchChange(branch)}
                  className="styled-checkbox"
                />
                <label className="checkbox-label">{branch}</label>
              </div>
            ))}
          </div>
          <div className="checkbox-column">
            <div className="checkbox-spacer"></div>
            {branchCol2.map((branch) => (
              <div key={branch} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={selectedBranches.includes(branch)}
                  onChange={() => handleBranchChange(branch)}
                  className="styled-checkbox"
                />
                <label className="checkbox-label">{branch}</label>
              </div>
            ))}
          </div>
        </div>
        {selectedBranches.length > 0 && (
          <p className="selection-hint">
            Selected: {selectedBranches.join(", ")}
          </p>
        )}
      </div>

      <div className="form-section">
        <p className="section-label">Product Price</p>
        <div className="price-input-wrapper">
          <span className="currency">€</span>
          <input
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="price-input"
            placeholder="25"
            type="number"
          />
        </div>
      </div>

      <div className="form-section">
        <p className="section-label">Manufacturers</p>
        <div className="checkbox-grid">
          <div className="checkbox-column">
            <div className="checkbox-item select-all">
              <input
                type="checkbox"
                checked={selectedManufacturers.length === manufacturers.length}
                onChange={toggleAllManufacturers}
                className="styled-checkbox"
              />
              <label className="checkbox-label">Select All</label>
            </div>
            {manufacturerCol1.map((manufacturer) => (
              <div key={manufacturer} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={selectedManufacturers.includes(manufacturer)}
                  onChange={() => handleManufacturerChange(manufacturer)}
                  className="styled-checkbox"
                />
                <label className="checkbox-label">{manufacturer}</label>
              </div>
            ))}
          </div>
          <div className="checkbox-column">
            <div className="checkbox-spacer"></div>
            {manufacturerCol2.map((manufacturer) => (
              <div key={manufacturer} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={selectedManufacturers.includes(manufacturer)}
                  onChange={() => handleManufacturerChange(manufacturer)}
                  className="styled-checkbox"
                />
                <label className="checkbox-label">{manufacturer}</label>
              </div>
            ))}
          </div>
        </div>
        {selectedManufacturers.length > 0 && (
          <p className="selection-hint">
            Selected: {selectedManufacturers.join(", ")}
          </p>
        )}
      </div>

      <div className="form-section">
        <div className="checkbox-item">
          <input
            checked={bestseller}
            onChange={(event) => setBestseller(event.target.checked)}
            id="bestseller"
            type="checkbox"
            className="styled-checkbox"
          />
          <label htmlFor="bestseller" className="checkbox-label">
            Add to bestseller
          </label>
        </div>
      </div>

      <button type="submit" className="submit-btn">
        ADD
      </button>
    </form>
  );
};

export default Add;
