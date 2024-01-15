import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

interface Diaries {
  id: number,
  date: string,
  weather: string,
  visibility: string,
  comment: string
}

interface ValidationError {
  message: string;
  errors: Record<string, string[]>
}

const App = () => {
  const [diaries, setDiaries] = useState<Diaries[]>([]);
  const [newDate, setNewDate] = useState('')
  const [newWeather, setNewWeather] = useState('')
  const [newVisibility, setNewVisibility] = useState('')
  const [newComment, setNewComment] = useState('')
  const [newError, setNewError] = useState('')

  useEffect(() => {
    axios.get<Diaries[]>('http://localhost:3000/api/diaries').then(response => {
      setDiaries(response.data as Diaries[])
    })
  },[])

  const diariesCreating = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    try {
      const response = await axios.post<Diaries>('http://localhost:3000/api/diaries', 
      { date: newDate, weather: newWeather, visibility: newVisibility, comment: newComment, id: diaries.length + 1})
      setDiaries(diaries.concat(response.data))
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        setNewError(`Error: ${error.response?.data ?? 'Unknown error'}`)
      }
    }
    
    setNewDate('')
    setNewWeather('')
    setNewVisibility('')
    setNewComment('')
  }

  return (
    <div>
      {newError}
      <div>
        Add new diary
        <form onSubmit={diariesCreating}>
          Date: <input type='date' value={newDate} onChange={(event) => setNewDate(event.target.value)} />
          <br />
            <div>
              Visibility: 
              <input type='radio' name='visibility' id='great' value='great' onChange={(event) => setNewVisibility(event.target.value)} />
              <label htmlFor='great'>Great</label>
              <input type='radio' name='visibility' id='good' value='good' onChange={(event) => setNewVisibility(event.target.value)} />
              <label htmlFor='good'>Good</label>
              <input type='radio' name='visibility' id='ok' value='ok' onChange={(event) => setNewVisibility(event.target.value)} />
              <label htmlFor='ok'>OK</label>
              <input type='radio' name='visibility' id='poor' value='poor' onChange={(event) => setNewVisibility(event.target.value)} />
              <label htmlFor='poor'>Poor</label>
            </div>
          <div>
            Weather:
            <input type='radio' name='weather' id='sunny' value='sunny' onChange={(event) => setNewWeather(event.target.value)} />
            <label htmlFor='sunny'>Sunny</label>
            <input type='radio' name='weather' id='rainy' value='rainy' onChange={(event) => setNewWeather(event.target.value)} />
            <label htmlFor='rainy'>Rainy</label>
            <input type='radio' name='weather' id='cloudy' value='cloudy' onChange={(event) => setNewWeather(event.target.value)} />
            <label htmlFor='cloudy'>Cloudy</label>
            <input type='radio' name='weather' id='stormy' value='stormy' onChange={(event) => setNewWeather(event.target.value)} />
            <label htmlFor='stormy'>Stormy</label>
            <input type='radio' name='weather' id='windy' value='windy' onChange={(event) => setNewWeather(event.target.value)} />
            <label htmlFor='windy'>Windy</label>
          </div>
          <br />
          Comment: <input value={newComment} onChange={(event) => setNewComment(event.target.value)} />
          <br />
          <button type='submit'>add</button>
        </form>
      </div>
      
      <br />
      <div>
        <b>Diary entries</b>
      </div>
      <div>
        {diaries.map((diary, index) => (
          <div key={index}>
            <br />
            <b>{diary.date}</b> <br />
            weather: {diary.weather} <br />
            visibility: {diary.visibility} 
          </div>
        ))}
        
      </div>
    </div>
  )
}

export default App
