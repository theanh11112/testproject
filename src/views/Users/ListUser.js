import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ListUser.scss';
import { useNavigate } from "react-router-dom";

const ListUser = () => {
    const [listUser, setListUser] = useState([]);
    const navigate = useNavigate(); // Hook để chuyển hướng

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                let res = await axios.get('https://reqres.in/api/users?page=1');
                setListUser(res.data.data);
            } catch (error) {
                console.error("Lỗi khi fetch users", error);
            }
        };
        fetchUsers();
    }, []);

    const handleViewDetailUser = (item) => {
        navigate(`/user/${item.id}`); // Chuyển hướng đến trang chi tiết user
    };

    return (
        <div className='list-user-container'>
            <div className='title' style={{ marginBottom: '10px' }}>Fetch all list user</div>
            <div className='list-user-content'>
                {listUser.map((item, index) => (
                    <div className='child' key={item.id} onClick={() => handleViewDetailUser(item)}>
                        {index + 1} - {item.first_name} {item.last_name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListUser;
