import Header from "../components/Header/Header";

function NoFooter({ children }) {
    return ( 
        <main>
            <Header />
            {children}
        </main>
    );
}

export default NoFooter;