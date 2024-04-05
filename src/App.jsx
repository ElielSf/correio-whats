import './css/App.css';
import Header from './components/Header.jsx'
import Form from './components/Form.jsx'

export default function App() {
  return (
    <div className='App'>
      <header><Header /></header>
      <main><Form /></main>
    </div>
  )
}