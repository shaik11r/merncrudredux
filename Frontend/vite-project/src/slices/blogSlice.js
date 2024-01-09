import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const URLapi = "http://localhost:3005/api/blog";

const intialState = {
  blogs: [],
  status: "idle",
  error: null,
};

export const fetchBlogs = createAsyncThunk("api/blogs", async () => {
  const response = await fetch(`${URLapi}`);
  const data = await response.json();
  return data.data;
});

export const createBlog = createAsyncThunk("api/createBlog", async (blogData) => {
  const response = await fetch(`${URLapi}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogData),
  });
  const data = await response.json();
  return data.data;
});

export const updateblog = createAsyncThunk("api/updateBlog", async ({ id, blogData }) => {
  console.log(blogData);
  const response = await fetch(`${URLapi}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogData),
  });
  const data = await response.json();
  return data.data;
});

export const deleteBlog = createAsyncThunk("api/deleteBlog", async (id) => {
  console.log(id);
  const response = await fetch(`${URLapi}/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    return id;
  } else {
    throw new Error("Failed to delete blog");
  }
});

const blogSlice = createSlice({
  name: "blog",
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.error.message);
      });

    builder
      .addCase(createBlog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs.push(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(updateblog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateblog.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = state.blogs.map((blog) => {
          return blog.id === action.payload.id ? action.payload : blog;
        });
      })
      .addCase(updateblog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(deleteBlog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "succeeded";
        state.blogs = state.blogs.filter((blog) => {
          console.log(blog);
          return blog._id !== action.payload;
        });
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const blogReducer = blogSlice.reducer;
