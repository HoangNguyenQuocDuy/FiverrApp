import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer"

function DefaultLayout({ children }) {
    return ( 
        <>
            <Header />
            {children}
            <Footer />
        </>
     );
}

export default DefaultLayout;