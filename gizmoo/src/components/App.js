import Header from "./Header";
import Hero from "./Hero";
import Footer from "./Footer";
import Articles from "./Articles";

function App (props) {
    return <>
        <Header />
        <main className='wrapper'>
        <Hero />
        <Articles />
        </main>
        <Footer />

    </>
}


export default App;