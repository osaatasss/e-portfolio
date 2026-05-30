import useScrollReveal from './hooks/useScrollReveal';
import Topbar from './components/Topbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Stack from './components/Stack';
import Events from './components/Events';
import Experience from './components/Experience';
import Resume from './components/Resume';
import Footer from './components/Footer';

const App = () => {
  useScrollReveal();

  return (
    <>
      <Topbar />
      <Hero />
      <About />
      <Projects />
      <Stack />
      <Events />
      <Experience />
      <Resume />
      <Footer />
    </>
  );
};

export default App;
