import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './routes/router';
// import { useDragger } from './hooks/useDragger';

function App() {
  // useDragger('blue-box');

  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
      {/* <div
        id="blue-box"
        className="absolute w-[517px] h-[830px] rounded-[40px] bg-static-white shadow-xl cursor-pointer">
      </div> */}
    </>
  );
}

export default App;
