import Photo from "./assets/Photo.png";
import "./App.css";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <Profile
        greeting="Hello"
        name="John Doe"
        // avatar="https://via.placeholder.com/150"
        avatar={Photo}
      />
    </>
  );
}

export default App;
