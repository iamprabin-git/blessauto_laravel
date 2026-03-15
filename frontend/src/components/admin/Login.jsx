import React, { useState, useContext } from 'react';
import Layout from '../common/Layout';
import { useForm } from 'react-hook-form';
import { apiUrl } from '../common/http'; // Double check your path
import { useNavigate } from 'react-router-dom';
import { AdminAuthContext } from '../context/AdminAuth';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AdminAuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            console.log("API Response:", result);

            if (res.status === 200) {
                // Defensive check: handle both result.user or result directly
                const userData = result.user || result;

                const adminData = {
                    token: result.token,
                    id: userData?.id,
                    name: userData?.name,
                    email: userData?.email
                };

                login(adminData);
                navigate('/admin/dashboard');
            } else {
                alert(result.message || "Invalid Credentials");
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className='container d-flex justify-content-center py-5'>
                <div className='card shadow border-0 login' style={{ width: '400px' }}>
                    <div className='card-body p-4'>
                        <h3 className="mb-4 fw-bold text-center">Admin Login</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='mb-3'>
                                <label className='form-label small fw-bold'>Email Address</label>
                                <input 
                                    {...register('email', { 
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                    type="email" 
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                                    placeholder='admin@example.com'
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                            </div>

                            <div className='mb-3'>
                                <label className='form-label small fw-bold'>Password</label>
                                <input 
                                    {...register('password', { required: "Password is required" })}
                                    type="password" 
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                                    placeholder='••••••••'
                                />
                                {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                            </div>

                            <div className='mb-3 d-grid'>
                                <button type="submit" className='btn btn-primary fw-bold' disabled={loading}>
                                    {loading ? <span className="spinner-border spinner-border-sm"></span> : 'Login'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Login;