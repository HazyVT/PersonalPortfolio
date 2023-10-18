import { Box, Button } from '@mui/material'
import Home from './Home'
import './App.scss'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import { useEffect, useState } from 'react'
import { supabase } from './SupaClient'
import Account from './Account'

function App() {

	const [ session, setSession ] = useState(null);

	useEffect(() => {
		supabase.auth.getSession().then(({data: {session}}) => {
			setSession(session);
		}).catch(() => {console.log('Rejected')})
	})
  
  return (
		<>
			<Box>
				<Router>
					<Navbar session={session} />
					<Routes>
						<Route path='/' element={<Home session={session} />}/>
						<Route path='/account' element={<Account session={session} />} />
					</Routes>
				</Router>
			</Box>
		</>
	)
}

export default App
