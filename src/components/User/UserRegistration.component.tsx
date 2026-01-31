import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useForm, FormProvider } from 'react-hook-form';
import { CREATE_USER } from '../../utils/gql/GQL_MUTATIONS';
import { InputField } from '../Input/InputField.component';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.component';
import Button from '../UI/Button.component';
import Link from 'next/link';
import Image from 'next/image';
import { googleLogin, facebookLogin } from '@/utils/auth';
import { useGoogleLogin } from '@react-oauth/google';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const FacebookLogin = dynamic(() => import('react-facebook-login/dist/facebook-login-render-props').then(mod => mod.default || mod), {
  ssr: false,
  loading: () => <div className="h-10 w-full animate-pulse bg-gray-100 rounded-md"></div>
});

const FacebookLoginAny = FacebookLogin as any;

interface IRegistrationData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword?: string;
}

const UserRegistration = () => {
  const methods = useForm<IRegistrationData>();
  // const [registerUser, { loading, error }] = useMutation(CREATE_USER);
  const [registrationCompleted, setRegistrationCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setError(null);
      try {
        const result = await googleLogin(tokenResponse.access_token);
        if (result.success) {
          router.push('/my-account');
        }
      } catch (err: any) {
        setError(err.message || 'Google login failed');
        console.error('Google login error:', err);
      } finally {
        setLoading(false);
      }
    },
    onError: (error) => {
      setError('Google Login Failed');
      console.error('Google Login Error:', error);
    },
  });

  const onFacebookResponse = async (response: any) => {
    if (response.accessToken) {
      setLoading(true);
      setError(null);
      try {
        const result = await facebookLogin(response.accessToken);
        if (result.success) {
          router.push('/my-account');
        }
      } catch (err: any) {
        setError(err.message || 'Facebook login failed');
        console.error('Facebook login error:', err);
      } finally {
        setLoading(false);
      }
    } else {
      console.log('Facebook login failed or cancelled', response);
    }
  };

  const onSubmit = async (data: IRegistrationData) => {
    try {
      // Remove confirmPassword from the variables sent to the server
      const { confirmPassword, ...mutationData } = data;

      // Use raw fetch to use the middleware's REST API for registration
      const response = await fetch(`${process.env.NEXT_PUBLIC_REST_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mutationData),
      });

      const result = await response.json();

      if (result.success || result.data?.customer) {
        setRegistrationCompleted(true);
      } else {
        throw new Error(result.message || 'Failed to register customer');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      // Manually set form error since we aren't using Apollo's error state anymore
      methods.setError('root' as any, {
        type: 'manual',
        message: error.message || 'An error occurred during registration'
      });
    }
  };

  if (registrationCompleted) {
    return (
      <div className="flex min-h-[calc(100vh-140px)] bg-white items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Account Created!</h2>
          <p className="text-gray-600 mb-8">You have successfully registered. Please log in to start shopping.</p>
          <Link href="/login">
            <a className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
              Log In Now
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-140px)] bg-white">
      {/* Left Side (Desktop) - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create Account</h1>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Log in
              </Link>
            </p>
          </div>

          {/* Social Registrations */}
          {isMounted && (
            <div className="grid grid-cols-2 gap-3" style={{ opacity: loading ? 0.6 : 1, pointerEvents: loading ? 'none' : 'auto' }}>
              <button
                onClick={() => handleGoogleLogin()}
                type="button"
                className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <span className="sr-only">Sign up with Google</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" /></svg>
                <span className="ml-2">Google</span>
              </button>

              <FacebookLoginAny
                appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || ''}
                callback={onFacebookResponse}
                autoLoad={false}
                fields="name,email,picture"
                render={(renderProps: any) => (
                  <button
                    onClick={renderProps.onClick}
                    type="button"
                    className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <span className="sr-only">Sign up with Facebook</span>
                    <svg className="h-5 w-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" /></svg>
                    <span className="ml-2">Facebook</span>
                  </button>
                )}
              />
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  inputName="firstName"
                  inputLabel="First Name"
                  type="text"
                  customValidation={{ required: true }}
                />
                <InputField
                  inputName="lastName"
                  inputLabel="Last Name"
                  type="text"
                  customValidation={{ required: true }}
                />
              </div>

              <InputField
                inputName="username"
                inputLabel="Username"
                type="text"
                customValidation={{ required: true }}
              />
              <InputField
                inputName="email"
                inputLabel="Email"
                type="email"
                customValidation={{ required: true }}
              />
              <InputField
                inputName="password"
                inputLabel="Password"
                type="password"
                customValidation={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                }}
              />
              <InputField
                inputName="confirmPassword"
                inputLabel="Confirm Password"
                type="password"
                customValidation={{
                  required: "Confirm Password is required",
                  validate: (val: string) => {
                    if (methods.watch('password') != val) {
                      return "Your passwords do not match";
                    }
                  }
                }}
              />

              {methods.formState.errors.root && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {methods.formState.errors.root.message}
                </div>
              )}

              <div className="pt-2">
                <Button variant="primary" buttonDisabled={methods.formState.isSubmitting} className="w-full py-3 text-base flex justify-center">
                  {methods.formState.isSubmitting ? <LoadingSpinner /> : 'Create Account'}
                </Button>
              </div>
            </form>
          </FormProvider>
          <p className="text-xs text-gray-500 text-center mt-4">By registering, you agree to our Terms of Service and Privacy Policy.</p>
        </div>
      </div>

      {/* Right Side - Lifestyle Image (Hidden on Mobile) */}
      <div className="hidden lg:block lg:w-1/2 relative bg-gray-900">
        <Image
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          layout="fill"
          objectFit="cover"
          alt="Fashion"
          className="opacity-70"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white max-w-lg text-right">
            <h2 className="text-4xl font-bold mb-6">Join the Community</h2>
            <p className="text-lg text-gray-200">Get exclusive access to new arrivals, sales, and special offers. Join thousands of happy customers.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
