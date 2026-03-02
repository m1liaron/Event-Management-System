import { ErrorMessage, Field, Form, Formik } from "formik";
import { RegisterSchema } from "../../common/schemas";
import { Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { apiPath, appPath } from "../../common/enums";
import { api } from "../../api/axios";

const RegisterPage = () => {
    const navigate = useNavigate();
    const initialValues = { name: '', email: '', password: '', confirmPassword: '' };

    const handleSubmit = async (values: typeof initialValues, { setErrors }: any) => {
        try {
            const response = await api.post(apiPath.REGISTER, values);
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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-8 rounded-2xl border border-slate-200 shadow-sm">
          
          <ToastContainer/>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Create Account</h2>
            <p className="text-slate-500 mt-2">Join us to start managing your events</p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-5">
                {/* Name Field */}
                <div>
                  <label htmlFor="login-name" className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                  <div className="relative">
                    <Field 
                      id="login-name" name="name" type="text" placeholder="John Doe"
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-indigo-500/20 outline-none
                        ${errors.name && touched.name ? 'border-red-500' : 'border-slate-200 focus:border-indigo-500'}`}
                    />
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  </div>
                  <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                </div>

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

                {/* Password Confirm Field (Specific to Register) */}
                <div>
                  <label htmlFor="reg-confirm" className="block text-sm font-semibold text-slate-700 mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <Field
                      id="reg-confirm" name="confirmPassword" type="password" placeholder="••••••••"
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-indigo-500/20 outline-none
                        ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-slate-200 focus:border-indigo-500'}`}
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                  </div>
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] mt-2 cursor-pointer"
                >
                  Create My Account
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-center text-sm text-slate-500 mt-8">
            Already have an account? {' '}
            <Link to="/login" className="text-indigo-600 font-bold hover:text-indigo-700 underline-offset-4 hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export { RegisterPage };