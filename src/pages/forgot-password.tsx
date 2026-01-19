import Layout from '@/components/Layout/Layout.component';
import PasswordResetRequest from '@/components/User/PasswordResetRequest.component';
import type { NextPage } from 'next';

const ForgotPasswordPage: NextPage = () => {
    return (
        <Layout title="Forgot Password" fullWidth>
            <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <PasswordResetRequest />
            </div>
        </Layout>
    );
};

export default ForgotPasswordPage;
