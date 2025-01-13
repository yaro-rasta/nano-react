import reactLogo from '/react.svg'
import viteLogo from '/vite.svg'
import nanoLogo from './assets/nano.svg'
import { useSSState, useLSState, useIDbState, useRemoteState } from '.'
import './App.css'

function App() {
	const [count, setCount] = useLSState('app.count', 0)
	// const [count, setCount] = useState(0)
	const [sessionCount, setSessionCount] = useSSState('app.count', 0)
	const [dbCount, setDbCount] = useIDbState('app.count', 0)
	const [remote] = useRemoteState('/remoteState.json', [])

	return (
		<>
			<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
				<a href="https://gitlab.com/nan.web/" target="_blank">
					<img src={nanoLogo} className="logo" alt="Nano logo" />
				</a>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>nan•web + Vite + React</h1>
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
				<p style={{ marginTop: '1rem' }}>
					Edit <code>src/App.jsx</code> and save to test HMR
				</p>
				<p>
					Remote state loaded from
					<code>/remoteState.json</code>
				</p>
				<ul>
					{remote.map((li, i) => (
						<li key={i}>{li}</li>
					))}
				</ul>
			</div>
			<div className=''>
				{/* @todo render a playground with the components, but better already a documentation with the examples */}
				{/* components: Editable, EditableAmount, EditableNumber, EditableSelect, EditableString, EditableText, EditableTime, EditableDate, EditableDateTime, EditableFile, EditableImage */}
				<a href=''></a>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	)
}

export default App
