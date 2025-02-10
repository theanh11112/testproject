import { BrowserRouter as Router, Routes, Route, useParams, Link ,useNavigate} from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const [state, setState] = useState(null); 
  let { username } = useParams(); // Lấy tham số từ URL
  const usenavigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await axios.get(`https://reqres.in/api/users/${username}`);
        setState(res.data.data); // Cập nhật state với dữ liệu từ API
      } catch (error) {
        console.error("Lỗi khi gọi API", error);
      }
    };
    
    fetchData();
  }, [username]);
  const Home = () => {
    usenavigate('/User')
  }
  return (
    <div>
      {state ? (
        <div>
          <p><strong>Họ tên:</strong> {state.first_name} {state.last_name}</p>
          <p><strong>Email:</strong> {state.email}</p>
          <img src={state.avatar} alt="Avatar" />
          <p><button onClick={Home}>List User</button></p>
        </div>
      ) : (
        <p>Đang tải dữ liệu...</p>
      )}
    </div>
  );
};

const App1 = () => {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:username" element={<UserProfile />} />
        <Route path="/post/:id/:category" element={<PostDetail />} />
      </Routes>
   
  );
};

const PostDetail = () => {
  let { category, id } = useParams();
  return <h2>Bài viết {id} thuộc danh mục {category}</h2>;
};

const Home = () => (
  <div>
    <h1>Trang chủ</h1>
    <Link to="/user/2">Xem hồ sơ người dùng 2</Link> {/* API có user từ 1-12 */}
  </div>
);

export default UserProfile;

