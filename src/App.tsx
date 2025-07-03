import React from "react";
import { Link } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Welcome</h2>
      <Link to="/hello" className="text-blue-600 underline">
        Go to Hello World
      </Link>
    </div>
  );
};

export default App;
