import React, { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { BASE_URL } from "../utils/projects";
import { debounce } from "lodash";

const BlogAdmin = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    console.log("Component re-rendered");
  }, [image, content, title, category, tags, author]);

  const handleImageUpload = debounce(async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(BASE_URL + "api/blogs/upload_image.php/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status === 1) {
        setImage(data.url);
        setIsImageUploaded(true);
      } else {
        setMessage(data.message);
        setIsImageUploaded(false);
      }
    } catch (error) {
      setMessage("An error occurred during image upload.");
      setIsImageUploaded(false);
    }
  }, 300);

  const handleAddBlog = async () => {
    if (!isImageUploaded) {
      setMessage("Please upload an image.");
      return;
    }

    try {
      const response = await fetch(BASE_URL + "api/blogs/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          category,
          tags,
          author,
          image_url: image,
        }),
      });

      const data = await response.json();

      if (data.status === 1) {
        setMessage("Blog added successfully!");
        setTitle("");
        setContent("");
        setCategory("");
        setTags("");
        setAuthor("");
        setImage("");
        setIsImageUploaded(false);
      } else {
        setMessage("Failed to add blog. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="py-12 text-[var(--text-color)]">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4 text-[var(--background-color)]">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex justify-between gap-4 mt-4">
            <div className="mb-4 w-full text-[var(--background-color)]">
              <input
                type="text"
                placeholder="Category"
                className="w-full px-4 py-2 border rounded-md text-[var(--background-color)]"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="mb-4 w-full text-[var(--background-color)]">
              <input
                type="text"
                placeholder="Tags"
                className="w-full px-4 py-2 border rounded-md text-[var(--background-color)]"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <div className="mb-4 w-full text-[var(--background-color)]">
              <input
                type="text"
                placeholder="Author"
                className="w-full px-4 py-2 border rounded-md text-[var(--background-color)]"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mb-4 text-[var(--background-color)]">
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="file-input"
          />
          {image && <img src={image} alt="Uploaded" className="mt-4" />}
        </div>
        <button
          className="px-6 py-3 bg-[var(--primary-color)] text-lg rounded-md hover:bg-[#ef231a]"
          onClick={handleAddBlog}
        >
          Add Blog
        </button>
        {message && <p className="text-white">{message}</p>}
      </div>
    </div>
  );
};

export default BlogAdmin;
