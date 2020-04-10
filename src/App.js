import React from 'react'
import Tree from './component/Tree'

const App = () => {
   const treeData = {
    name: "Top Level",
    children: [
      {
        name: "Level 2: A",
        children: [{ name: "Son of A" }, { name: "Daughter of A" }],
      },
      { name: "Level 2: B" },
    ],
  };
  return (
    <div>
      <Tree data={treeData}/>
    </div>
  )
}

export default App
