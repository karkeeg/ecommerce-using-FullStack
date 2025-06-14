import React from "react";

const BlogPage = () => {
  const blogs = [
    {
      title: "Top 5 Tech Gadgets of 2025",
      snippet: "Discover the must-have electronics changing the way we live.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=500",
      author: "Bibek Karki",
      date: "May 10, 2025",
      tags: ["#Tech", "#Gadgets"],
    },
    {
      title: "Style Trends for Modern Shoppers",
      snippet: "How to blend fashion with function in your daily life.",
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=500",
      author: "Aayusha Rana",
      date: "May 15, 2025",
      tags: ["#Fashion", "#Lifestyle"],
    },
    {
      title: "Inside BibekDev Store: Our Development Journey",
      snippet: "Learn how a frontend idea became a scalable eCommerce brand.",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=500",
      author: "Bibek Karki",
      date: "May 18, 2025",
      tags: ["#eCommerce", "#Development"],
    },
  ];

  return (
    <section className="py-12 px-6 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-10">
          Latest Blogs
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-lg transition-shadow p-5 flex flex-col"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-44 object-cover rounded-xl mb-4"
              />
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span>{blog.author}</span>
                <span>{blog.date}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                {blog.snippet}
              </p>
              <div className="flex gap-2 flex-wrap text-xs mb-4">
                {blog.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-indigo-100 dark:bg-indigo-700 text-indigo-600 dark:text-white px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button className="mt-auto bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition-all">
                Read More
              </button>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button className="bg-slate-800 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600 px-6 py-2 rounded-full hover:bg-slate-900 transition">
            View All Blogs
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
