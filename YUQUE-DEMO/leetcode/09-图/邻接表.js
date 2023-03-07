class Node {
  constructor(value) {
    this.value = value;
    this.adjacents = []; // adjacency list
  }

  addAdjacent(node) {
    this.adjacents.push(node);
  }

  removeAdjacent(node) {
    const index = this.adjacents.indexOf(node);
    if (index > -1) {
      this.adjacents.splice(index, 1);
      return node;
    }
  }

  getAdjacents() {
    return this.adjacents;
  }

  isAdjacent(node) {
    return this.adjacents.indexOf(node) > -1;
  }
}

class Graph {
  constructor(edgeDirection = Graph.DIRECTED) {
    this.nodes = new Map();
    this.edgeDirection = edgeDirection;
  }

  // 添加一条新的边，需要知道两个顶点：边的起点与边的终点。
  addEdge(source, destination) {
    const sourceNode = this.addVertex(source);
    const destinationNode = this.addVertex(destination);
    sourceNode.addAdjacent(destinationNode);
    if (this.edgeDirection === Graph.UNDIRECTED) {
      destinationNode.addAdjacent(sourceNode);
    }
    return [sourceNode, destinationNode];
  }

  // 创建顶点
  addVertex(value) {
    if (this.nodes.has(value)) {
      return this.nodes.get(value);
    } else {
      const vertex = new Node(value);
      this.nodes.set(value, vertex);
      return vertex;
    }
  }

  // 删除顶点
  removeVertex(value) {
    const current = this.nodes.get(value);
    if (current) {
      for (const node of this.nodes.values()) {
        node.removeAdjacent(current);
      }
    }
    return this.nodes.delete(value);
  }

  // 删除边
  removeEdge(source, destination) {
    const sourceNode = this.nodes.get(source);
    const destinationNode = this.nodes.get(destination);
    if (sourceNode && destinationNode) {
      sourceNode.removeAdjacent(destinationNode);
      if (this.edgeDirection === Graph.UNDIRECTED) {
        destinationNode.removeAdjacent(sourceNode);
      }
    }
    return [sourceNode, destinationNode];
  }
}
Graph.UNDIRECTED = Symbol("directed graph"); // one-way edges
Graph.DIRECTED = Symbol("undirected graph"); // two-ways edges
