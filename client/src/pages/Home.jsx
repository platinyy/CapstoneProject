import { randEmoji } from '@ngneat/falso'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  let navigate = useNavigate()

  return (
    <div className="home-container col">
      
      <h1>Welcome to Dion's Coffee Shop ☕</h1>
      <section className="welcome-signin">
        <button onClick={() => navigate('/signin')}>
          Click here to place your order !
        </button>
      </section>
    </div>
  )
}

export default Home

