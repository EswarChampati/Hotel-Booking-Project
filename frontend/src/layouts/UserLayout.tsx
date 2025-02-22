import Footer from "../components/footer";
import Header from "../components/Header";
interface Props {
  children: React.ReactNode;
}

const UserLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <div className="flex-grow py-10 px-4 sm:px-6 md:px-10 lg:px-16 text-common bg-common">
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default UserLayout;
