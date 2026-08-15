import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Works from './components/Works'
import Experiments from './components/Experiments'
import Projects from './components/Projects'
import Contact from './components/Contact'

function App() {

  return (
    <>
    <Navbar />
  
    <main>
      <Hero />

      <Works />

      <Projects />

      <Experiments />

      <Contact />
    </main>
    </>


  )
}

export default App
