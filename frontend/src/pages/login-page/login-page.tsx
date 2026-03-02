import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginSchema } from '../../common/schemas';
import { apiPath, appPath } from '../../common/enums';
import { toast, ToastContainer } from 'react-toastify';
import { api } from '../../api/axios';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const initialValues = { email: '', password: '' }

    const handleSubmit = async (values: typeof initialValues, { setErrors }: any) => {
        try {
            const response = await api.post(apiPath.LOGIN, values);
            localStorage.setItem("token", response.data.access_token);
            toast.success("Account created successfully!");
            navigate(appPath.ROOT);
        } catch (error: any) {
            const backendError = error.response?.data;

            if (backendError && backendError.message) {
                if (Array.isArray(backendError.message)) {
                   toast.error(backendError.message[0]);
                } 
                else if (backendError.message.includes('email')) {
                    setErrors({ email: backendError.message });
                } else {
                    toast.error(backendError.message);
                }
            } else {
                // Fallback for network issues
                toast.error("Something went wrong. Please try again.");
            }
        }
    }

  return (
    <div className="bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-8 rounded-2xl border border-slate-200 shadow-sm">
          
          <ToastContainer/>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 mt-2">Enter your details to access your events</p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-5">
                {/* Email Field */}
                <div>
                  <label htmlFor="login-email" className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Field 
                      id="login-email" name="email" type="email" placeholder="name@company.com"
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-indigo-500/20 outline-none
                        ${errors.email && touched.email ? 'border-red-500' : 'border-slate-200 focus:border-indigo-500'}`}
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  </div>
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="login-password" className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                  <div className="relative">
                    <Field 
                      id="login-password" name="password" type="password" placeholder="••••••••"
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-indigo-500/20 outline-none
                        ${errors.password && touched.password ? 'border-red-500' : 'border-slate-200 focus:border-indigo-500'}`}
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-2 cursor-pointer"
                >
                  Sign In <ArrowRight size={18} />
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-center text-sm text-slate-500 mt-8">
            Don't have an account? {' '}
            <Link to={appPath.REGISTER} className="text-indigo-600 font-bold hover:text-indigo-700 underline-offset-4 hover:underline">
              Create one for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export { LoginPage };