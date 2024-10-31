import reactLogo from '/react.svg'
import viteLogo from '/vite.svg'
import { useSSState, useLSState, useIDbState } from '.'
import './App.css'

function App() {
	const [count, setCount] = useLSState('app.count', 0)
	const [sessionCount, setSessionCount] = useSSState('app.count', 0);
	const [dbCount, setDbCount] = useIDbState('app.count', 0);

	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<div style={{ display: 'flex', gap: '1rem' }}>
					<button onClick={() => setCount((count) => count + 1)}>
						localStorage.count is {count}
					</button>

					<button onClick={() => setSessionCount((sessionCount) => sessionCount + 1)}>
						sessionStorage.count is {sessionCount}
					</button>

					<button onClick={() => setDbCount((dbCount) => dbCount + 1)}>
						indexedDB.count is {dbCount}
					</button>
				</div>
				<p>
					Edit <code>src/App.jsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	)
}

export default App
