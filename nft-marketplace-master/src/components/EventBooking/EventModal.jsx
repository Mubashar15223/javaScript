import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../shared/Button";

export function EventModal({
  closeModal,
  action = "add",
  event,
  onDelete,
  reFresh,
}) {
  const [formData, setFormData] = useState({
    name: "",
    dateTime: "",
    targetAudience: "",
    description: "",
    img: "",
  });

  useEffect(() => {
    if (action === "edit" && event) {
      setFormData({
        name: event.name || "",
        dateTime: event.dateTime || "",
        targetAudience: event.targetAudience || "",
        description: event.description || "",
        img: event.img || "",
      });
    }
  }, [action, event]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFormData((prevState) => ({
        ...prevState,
        img: fileUrl,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (
      !formData.dateTime ||
      !/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})$/.test(formData.dateTime)
    ) {
      newErrors.dateTime =
        "Date and Time must be in ISO 8601 format (e.g., 2024-08-14T18:00)";
    }
    if (!formData.targetAudience)
      newErrors.targetAudience = "Target Audience is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.img) newErrors.img = "Image file is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    const formDataSubmit = new FormData();
    e.preventDefault();
    if (action === "del") {
      if (onDelete) onDelete();
      reFresh("del");
    } else if (validateForm()) {
      try {
        formDataSubmit.append("name", formData.name);
        formDataSubmit.append("dateTime", formData.dateTime);
        formDataSubmit.append("targetAudience", formData.targetAudience);
        formDataSubmit.append("description", formData.description);
        formDataSubmit.append("img", formData.img);
        if (action === "add") {
          reFresh("add");
          await axios.post("http://localhost:4000/events", formDataSubmit, {
            headers: {
              "Content-Type": "application/json",
            },
          });
        } else if (action === "edit" && event) {
          reFresh("edit");
          await axios.put(
            `http://localhost:4000/events/${event.id}`,
            formDataSubmit,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }
        closeModal();
      } catch (error) {
        console.error("Error saving item:", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div
        className="bg-gray-900 p-6 rounded-lg shadow-lg"
        style={{ width: "500px", maxHeight: "80vh", overflowY: "auto" }}
      >
        <h2 className="text-xl font-bold mb-4 text-white">
          {action === "add"
            ? "Add New Item"
            : action === "edit"
            ? "Edit Item"
            : "Confirm Deletion"}
        </h2>
        <form onSubmit={handleSubmit}>
          {action === "del" ? (
            <div className="mb-4 text-white">
              <p>Are you sure you want to delete this item?</p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2 text-white"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-600 rounded-lg w-full p-2 bg-gray-800 text-gray-200"
                />
                {errors.name && (
                  <div className="text-red-500 text-sm">{errors.name}</div>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2 text-white"
                  htmlFor="dateTime"
                >
                  DateTime
                </label>
                <input
                  id="dateTime"
                  name="dateTime"
                  type="datetime-local"
                  value={formData.dateTime}
                  onChange={handleChange}
                  className="border border-gray-600 rounded-lg w-full p-2 bg-gray-800 text-gray-200"
                />
                {errors.dateTime && (
                  <div className="text-red-500 text-sm">{errors.dateTime}</div>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2 text-white"
                  htmlFor="targetAudience"
                >
                  Target Audience
                </label>
                <input
                  id="targetAudience"
                  name="targetAudience"
                  type="text"
                  value={formData.targetAudience}
                  onChange={handleChange}
                  className="border border-gray-600 rounded-lg w-full p-2 bg-gray-800 text-gray-200"
                />
                {errors.targetAudience && (
                  <div className="text-red-500 text-sm">
                    {errors.targetAudience}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2 text-white"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="border border-gray-600 rounded-lg w-full p-2 bg-gray-800 text-gray-200"
                />
                {errors.description && (
                  <div className="text-red-500 text-sm">
                    {errors.description}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2 text-white"
                  htmlFor="img"
                >
                  Image URL
                </label>
                <input
                  id="img"
                  name="img"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="border border-gray-600 rounded-lg w-full p-2 bg-gray-800 text-gray-200"
                />
                {formData.img && (
                  <img
                    src={formData.img}
                    alt="Preview"
                    className="mt-2 max-w-full h-auto"
                  />
                )}
                {errors.img && (
                  <div className="text-red-500 text-sm">{errors.img}</div>
                )}
              </div>
            </>
          )}
          <div className="flex justify-between">
            <Button
              type="submit"
              className={`bg-${
                action === "del" ? "red" : "blue"
              }-500 text-white`}
            >
              {action === "add"
                ? "Add"
                : action === "edit"
                ? "Update"
                : "Delete"}
            </Button>
            <Button
              type="button"
              onClick={() => closeModal()}
              className="bg-gray-500 text-white"
            >
              Close
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
