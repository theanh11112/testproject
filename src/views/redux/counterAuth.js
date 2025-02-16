import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from './counterSlice';
import { login, logout } from './authSlice';
const CounterAuth = () => {
    const count = useSelector((state) => {
        return state.counter?.value ?? 0;  // Trả về 0 nếu state bị lỗi
      });

    const isAuthenticated = useSelector((state) => {
      console.log(state.auth?.isAuthenticated )
      return state.auth?.isAuthenticated ?? false; 
    })

    const dispatch = useDispatch();

  return (
    <div>
      <h2>Authentication Status: {isAuthenticated ? 'Login' : 'Logout'}</h2>
      {isAuthenticated ? 
      <>
      <h2>Counter: {count}</h2>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
      <button onClick = {() => dispatch(logout())}>Logout</button>
      </>
      :
      <>
      <button onClick = {() => dispatch(login())} > Login </button> 
      </>
      }
    </div>
  );
};

export default CounterAuth;
