import Feed from './Components/Feed';
import InactiveFeed from './Components/InactiveFeed';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



function App() {
  return (
    <div style={{
      minHeight: "150vh",
      color: 'white',
      fontFamily: "Arial, Helvetica, sans-serif"
    }}>
      <Router>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/inactive" element={<InactiveFeed />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
