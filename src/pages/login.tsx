import Layout from '@/components/Layout/Layout.component';
import UserLogin from '@/components/User/UserLogin.component';

import type { NextPage } from 'next';

const LoginPage: NextPage = () => {
  return (
    <Layout title="Login" fullWidth>
      <UserLogin />
    </Layout>
  );
};

export default LoginPage;
