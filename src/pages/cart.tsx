
import Layout from '@/components/Layout/Layout.component';
import CartContents from '@/components/Cart/CartContents.component';

export default function CartPage() {
  return (
    <Layout title="Shopping Cart" fullWidth={true}>
      <CartContents />
    </Layout>
  );
}
