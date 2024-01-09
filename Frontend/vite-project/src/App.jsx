import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs, createBlog, updateblog, deleteBlog } from "./slices/blogSlice";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleCreateBlog = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      return;
    }
    const newBlog = {
      title: title,
      description: description,
    };
    dispatch(createBlog(newBlog));
    setTitle("");
    setDescription("");
  };
  const handleDeleteBlog = (id) => {
    console.log(id);
    dispatch(deleteBlog(id));
  };

  return (
    <div className="p-3 text-white bg-gray-800 font-mono">
      <h1 className="text-3xl">Blogs</h1>
      <div className="flex flex-col m-5 text-2xl w-[500px] gap-2">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-slate-700 p-2 focus:border-none rounded-lg"
        />
        <textarea
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-slate-700 p-2 rounded-lg h-[400px]"
        />
        <button
          onClick={(e) => {
            handleCreateBlog(e);
          }}
          className="w-fit text-left bg-green-600 text-white p-2 rounded-lg font-mono">
          Create Blog
        </button>
      </div>
      {blogs?.map((blog) => {
        return (
          <li className="list-none flex flex-col w-fit gap-2 mb-10 " key={blog._id}>
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p>{blog.description}</p>
            <button className="text-start bg-black w-fit p-2 rounded-lg">Edit</button>
            <button
              className="text-start bg-black w-fit p-2 rounded-lg"
              onClick={() => {
                handleDeleteBlog(blog._id);
              }}>
              Delete
            </button>
          </li>
        );
      })}
    </div>
  );
}

export default App;
