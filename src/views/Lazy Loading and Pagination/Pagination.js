import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Pagination() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Hàm tải dữ liệu cho mỗi trang
  const loadData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
      setData(response.data);
      setTotalPages(Math.ceil(100 / 10)); // Giả sử có 100 mục trong tổng dữ liệu
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div>
      <h1>Pagination Example</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id} style={{ height:'auto', width:'600px' }}>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>

      {loading && <p>Loading...</p>}

      <div>
        {page !==1 &&
        <button onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}>
          Previous
        </button> }
        <span> Page {page} </span>
        {page !==10 && <button onClick={() => setPage((prevPage) => Math.min(prevPage + 1, totalPages))} disabled={page === totalPages}>
          Next
        </button>}
        
      </div>
    </div>
  );
}

export default Pagination;
