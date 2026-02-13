import styles from './styles.module.scss'
import { Header } from '../features/ui/header'
import { Footer } from '../features/ui/footer'
import { Slider } from '../features/ui/slider'

function App() {

  return (
    <div className={styles.app}>
      <Header/>
      <Slider/>
      <Footer/>
    </div>
  )
}

export default App
