import Footer from '@/components/general/Footer';
import Navbar from '@/components/general/Navbar';
import Products from '@/components/general/Products';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Products />
      <Footer />
    </div>
  );
}
