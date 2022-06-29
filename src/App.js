import "./styles.css";
import DraggableList from "./DraggableList";
import DroppableList from "./DroppableList";

function App() {
  return (
    <div className="App">
      <DraggableList />
      <hr />
      <h4>Drop Items here</h4>
      <DroppableList />
    </div>
  );
}

export default App;
