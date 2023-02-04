import { useState } from "react"



const Home = () => {
  const [prompt, setPrompt] = useState('')
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState('')

  
  const getImage = async (e) => {
    e.preventDefault()
    setLoading(true)
    setImage('')
    setError('')
    const response = await fetch('http://localhost:4000/api/user/getImageUrl', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ prompt })
    })
    const json = await response.json()

    if (response.ok) {
      setImage(json.response)
      setLoading(null)
    }
    if(!response.ok) {
      setLoading(null)
      setError(json.errorMsg)
    }

  }


  return(
    <div className="home">
      <div className="workouts">
        <h1>Home page</h1>
        <form onSubmit={getImage}>
          <label>Generate image:</label>
          <input 
          type='text'
          placeholder="Your key words"
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          />
          <button disabled={loading}>Send</button>
          {error && <div className="error">{error}</div>}
        </form>
        {loading ? ( <div style={{padding: '8px', paddingLeft: '-2px'}}>Loading...</div>) : 
        ( image && <img src={image} className='img-css' alt="Your Image"/>)}    
      </div>
    </div>
  )
}

export default Home