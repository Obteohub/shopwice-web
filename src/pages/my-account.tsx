import Layout from '@/components/Layout/Layout.component';
import CustomerAccount from '@/components/User/CustomerAccount.component';
import withAuth from '@/components/User/withAuth.component';

import type { NextPage } from 'next';

const CustomerAccountPage: NextPage = () => {
  return (
    <Layout title="My Account" fullWidth={true}>
      <div className="px-2 md:px-4 pt-4 pb-1">
        <CustomerAccount />
      </div>
    </Layout>
  );
};

export default withAuth(CustomerAccountPage);
