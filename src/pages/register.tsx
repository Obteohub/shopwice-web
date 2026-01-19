import Layout from '@/components/Layout/Layout.component';
import UserRegistration from '@/components/User/UserRegistration.component';
import type { NextPage } from 'next';

const RegisterPage: NextPage = () => {
    return (
        <Layout title="Register" fullWidth>
            <UserRegistration />
        </Layout>
    );
};

export default RegisterPage;
