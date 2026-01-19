import Layout from '@/components/Layout/Layout.component';
import ResetPasswordForm from '@/components/User/ResetPasswordForm.component';
import type { NextPage } from 'next';

const ResetPasswordPage: NextPage = () => {
    return (
        <Layout title="Reset Password" fullWidth>
            <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <ResetPasswordForm />
            </div>
        </Layout>
    );
};

export default ResetPasswordPage;
