import React, { useEffect, useState } from "react";
import { hierarchy, tree } from "d3";
import { Stage, Layer, Circle, Path } from "react-konva";

const Tree = ({ data }) => {
  const [nodes, setNode] = useState([]);
  const [link, setLink] = useState([]);

  useEffect(() => {
    getTree();
    // eslint-disable-next-line
  }, []);

  const getTree = () => {
    const margin = { top: 20, right: 90, bottom: 200, left: 90 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
    const treeLayout = tree().size([width, height]);
    const treeMap = hierarchy(data, (d) => d.children);
    const root = treeLayout(treeMap);
    let nodes = root.descendants();
    setNode(nodes);
    let links = root.links().map((link) => link.target);
    setLink(links);
    // for (let key in links) {
    //   console.log('LINKS', links[key])
    //   const link = diagonalLine(links[key]);
    //   setLink(link)
    // };
  };
  const diagonalLine = (d) => {
    return (
      "M" +
      d.x +
      "," +
      d.y +
      "C" +
      d.x +
      "," +
      (d.y + d.parent.y) / 2 +
      " " +
      d.parent.x +
      "," +
      (d.y + d.parent.y) / 2 +
      " " +
      d.parent.x +
      "," +
      d.parent.y
    );
  };
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {nodes.map((node, i) => (
          <Circle key={i} fill="black" radius={5} x={node.x} y={node.y} />
        ))}

        {link.map((link, i) => (
          <Path key={i} data={diagonalLine(link)} stroke={1} strokeWidth={1} />
        ))}
      </Layer>
    </Stage>
  );
};

export default Tree;
