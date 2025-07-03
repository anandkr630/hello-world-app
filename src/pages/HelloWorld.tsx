import React from "react";

const HelloWorld: React.FC = () => {
  return (
    <main className="flex justify-center items-start pt-10 min-h-screen bg-white text-gray-900">
      <h1 className="text-3xl font-bold" role="heading" aria-level={1}>
        Hello World
      </h1>
    </main>
  );
};

export default HelloWorld;
