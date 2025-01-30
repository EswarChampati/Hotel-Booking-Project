import Footer from "../components/footer";
import Header from "../components/Header";
interface Props {
  children: React.ReactNode;
}

const UserLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen ">
      <Header />
      <div className="py-10 text-common bg-common">{children}</div>

      <Footer />
    </div>
  );
};

export default UserLayout;
