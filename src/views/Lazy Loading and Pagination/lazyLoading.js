import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LazyLoading() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Biến trạng thái cho trang hiện tại

  // Hàm để tải dữ liệu
  const loadData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
      setData((prevData) => [...prevData, ...response.data]);// Thêm dữ liệu mới vào danh sách
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(); // Tải dữ liệu khi trang đầu tiên được load
  }, [page]); // Mỗi khi trang thay đổi, sẽ tải dữ liệu

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading) {
      setPage((prevPage) => prevPage + 1); // Khi người dùng cuộn đến cuối, tăng trang
    }
  };

  return (
    <div onScroll={handleScroll} style={{ height: '400px', overflowY: 'auto' }}>
      <h1>Lazy Loading Data</h1>
      {data.map((item,index) => (
        <div key={index} style={{ height:'auto', width:'600px' }}>
          <h2>{item.title}</h2>
          <p>{item.body}</p>
        </div>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default LazyLoading;
