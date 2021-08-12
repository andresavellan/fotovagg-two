import { useContext } from 'react'
import Search from './Search';
import Wall from './Wall'
import './../assets/css/main.scss';
import { FotovaggContext } from './../context/FotovaggContext';

function App() {
  const { render } = useContext(FotovaggContext);

  return (
    <div className={"app " + render}>
      <Search />
      <Wall />
    </div>
  );
}

export default App;
