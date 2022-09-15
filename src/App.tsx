import './App.css';
import Editor from './components/editor/editor';
import Frames from './components/result/frames';

function App() {
  return (
    <div className="App">
      ✅ running
      <Editor />
      <Frames />
    </div>
  );
}

export default App;
