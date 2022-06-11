import Feed from './Components/Feed';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div style={{
      minHeight: "150vh",
      color: 'white',
      fontFamily: "Arial, Helvetica, sans-serif"
    }}>
      <Feed />
    </div>
  );
}

export default App;
