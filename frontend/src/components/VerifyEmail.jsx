import  { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { api } from '../components/api';
const VerifyEmail = () => {
 const [code, setCode] = useState('');
 const [loading, setLoading] = useState(false);
let navigate=useNavigate()
const handleSubmit = async (e) => {
 e.preventDefault();
 setLoading(true);
 try {
const response = await api.post('/user/verifyemail', { code });
 if (response.data.success) {
 toast.success(response.data.message || "Email verified Successfully", {
 autoClose: 3000,
}
 
 );
 setTimeout(()=>{
  navigate("/signin")
 },3200)
 }
 } catch (err) {
  const errorMsg = err.response && err.response.data 
   ? err.response.data.message 
   : 'Server error! Please try again later.';
  
  toast.error(errorMsg);
 } finally {
 setLoading(false);
 }
 };
 return (
 <div>
<div>
 <h2>Verify Your Email</h2>
 <p>Enter the verification code sent to your email.</p>
<form onSubmit={handleSubmit}>
 <input
 type="text"
 placeholder="Enter 6-digit Code"
 value={code}
 onChange={(e) => setCode(e.target.value)}
 maxLength={6}
 required
/>
 <button type="submit" disabled={loading}>
{loading ? 'Verifying...' : 'Verify Email'}
 </button>
 </form>
</div>
</div>
 );
};

export default VerifyEmail;