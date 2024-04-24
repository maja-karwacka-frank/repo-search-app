import { LoginForm } from './components/LoginForm';
import { SearchForm } from './components/SearchForm';
import { useToken } from './store/use-token';

function App() {
	const { token } = useToken();
	return (
		<div className='h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
			{token ? <SearchForm /> : <LoginForm />}
		</div>
	);
}

export default App;
