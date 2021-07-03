const controlsHeight = document.getElementById("controlPanel").offsetHeight 

var animSpeed = 4
const easing = 0.05 * animSpeed


var clickMode = "none"
var inp, inpButton, inpValue, inpTarget
var tempTransition
var stringValue = ""
var keyPress
var editingMode = false


//COLORS
const YELLOW = [255, 242, 0]
const WHITE = [255,255,255]
const BASE_DARKBLUE = [28,42,53]

const VISITED_COLOR = [32,98,149]
const TRAVERSAL_OUTLINE = [255,157,0]

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve,ms));
}

class Graph {
  // defining vertex array and
  // adjacent list
  constructor(noOfVertices)
  {
    this.noOfVertices = noOfVertices
    this.AdjList = new Map()
  }

  addVertex(v)
  {
    // this.AdjList.set(v, []);
    this.AdjList.set(v, new Set());
  }

  addEdge(v, w)
  {
    //SELF LOOP
    if(v == w){
      this.AdjList.get(v).add(w)
      return
    }

    this.AdjList.get(v).add(w)
  
    this.AdjList.get(w).add(v)
  }

  removeEdge(v, w){
    //SELF LOOP
    if(v == w){
      this.AdjList.get(v).delete(w)
    }

    this.AdjList.get(v).delete(w)
    this.AdjList.get(w).delete(v)

  }

  removeNode(v){
    
    for (const [key, value] of this.AdjList.entries()) {
      if(value.has(v)){
        value.delete(v)
      }
    }

    this.AdjList.delete(v);
  }

  async bfs(startingNode) {
    // create a visited object
    var visited = {};
  
    // Create an object for queue
    var q = []
  
    // add the starting node to the queue
    visited[startingNode.value] = true;
    q.push(startingNode);
    await startingNode.changeFill(32,98,149)
    //startingNode.outlineColor = [255,157,0]
    await startingNode.changeOutline(255,157,0)

    statusText = "Running: BFS(" + startingNode.value + ")"
  
    // loop until queue is element
    while (q.length != 0) {
      // get the element from the queue
     
      var getQueueElement = q.shift();

      // passing the current vertex to callback funtion
      console.log(getQueueElement.value);
      await getQueueElement.changeFill(32,98,149)

      // get the adjacent list for current vertex
      var get_List = this.AdjList.get(getQueueElement);

      // loop through the list and add the element to the
      // queue if it is not processed yet
      for (var i of get_List) {
        
        //console.log(i)
        console.log(visited)
        
        var neigh = i;

        //FOR VISUALIZER
        if(edges.has(getQueueElement.value + "," + neigh.value)){
          //edges.get(getQueueElement.value + "," + neigh.value).color = [255,157,0]
          await edges.get(getQueueElement.value + "," + neigh.value).changeFill(255,157,0)
        }
        else {
          //edges.get(neigh.value + "," + getQueueElement.value).color = [255,157,0]
          await edges.get(neigh.value + "," + getQueueElement.value).changeFill(255,157,0)
        }
        //await sleep(200)

        if (!visited[neigh.value]) {
          visited[neigh.value] = true;
          
          //neigh.outlineColor = [255,157,0]
          await neigh.changeOutline(255,157,0)
          //await sleep(200)
          
          q.push(neigh);
        }
        //console.log(q.length)
      }

      console.log(q)
    }
    statusText = "BFS: Click on starting node to start"
  }

  async dfs(startingNode) {
    // create a visited object
    var visited = {};
  
    // Create an object for queue
    var q = []
  
    // add the starting node to the queue
    visited[startingNode.value] = true;
    q.push(startingNode);
    await startingNode.changeFill(32,98,149)
    //startingNode.outlineColor = [255,157,0]
    await startingNode.changeOutline(255,157,0)

    //console.log(visited)
    //console.log(q)
    statusText = "Running: DFS(" + startingNode.value + ")"
  
    // loop until queue is element
    while (q.length != 0) {
      // get the element from the queue
      //console.log(q)
     
      var getQueueElement = q.pop();

      // passing the current vertex to callback funtion
      console.log(getQueueElement.value);
      await getQueueElement.changeFill(32,98,149)

      // get the adjacent list for current vertex
      var get_List = this.AdjList.get(getQueueElement);

      // loop through the list and add the element to the
      // queue if it is not processed yet
      for (var i of get_List) {
        
        //console.log(i)
        console.log(visited)
        
        var neigh = i;

        //FOR VISUALIZER
        if(edges.has(getQueueElement.value + "," + neigh.value)){
          //edges.get(getQueueElement.value + "," + neigh.value).color = [255,157,0]
          await edges.get(getQueueElement.value + "," + neigh.value).changeFill(255,157,0)
        }
        else {
          //edges.get(neigh.value + "," + getQueueElement.value).color = [255,157,0]
          await edges.get(neigh.value + "," + getQueueElement.value).changeFill(255,157,0)
        }
        //await sleep(200)

        if (!visited[neigh.value]) {
          visited[neigh.value] = true;
          
          //neigh.outlineColor = [255,157,0]
          await neigh.changeOutline(255,157,0)
          //await sleep(200)
          q.push(neigh);
        }
        //console.log(q.length)
      }

      console.log(q)
    }
    statusText = "DFS: Click on starting node to start"
  }

  async primMST(startingNode) {
    //let key = new Map()
    let key = {}
    let MST = []
    let mstSet = new Set()

    MST.push(startingNode.value)
    key[startingNode.value] = 0

    let min
    let min_node = startingNode

    //FOR VISUALIZER
    let connected_node
    let minAdj = {}

    for(let i of nodes){
      min = Number.POSITIVE_INFINITY
      //let min_node
      console.log("=============")
      //console.log(key)
      //console.log(mstSet)
      for(let v of mstSet){
        
        for(let adj of this.AdjList.get(v)){

          if(mstSet.has(adj) == false && (key[adj.value] == undefined || key[adj.value] < min)){
            // console.log("HERE")
            // console.log(mstSet)
            // console.log(adj.value)
            min = key[adj.value]
            min_node = adj
            connected_node = v

            console.log(key)
            console.log(connected_node)
          }
        }
        
      }
      console.log(min_node)
      
      mstSet.add(min_node)

      if(min_node != startingNode){
        await min_node.changeFill(32,98,149)
      }
      else {
        await min_node.changeFill(103, 41, 126)
      }
      await min_node.changeOutline(255,157,0)


      if(min_node != startingNode) await minAdj[min_node.value].changeFill(126, 198, 247)

      for(let adj of this.AdjList.get(min_node)){
        if(getEdge(adj, min_node).value != 0 && mstSet.has(adj) == false && 
        (key[adj.value] == undefined || getEdge(adj, min_node).value < key[adj.value])){
          console.log("HERE")
          MST.push(min_node.value)

          await getEdge(adj, min_node).changeFill(255,157,0)
          await adj.changeOutline(255,157,0)

          key[adj.value] = getEdge(adj, min_node).value
          minAdj[adj.value] = getEdge(adj, min_node)
        }
      }

    }
    //DIM OUT NODES THAT ARE NOT PART OF THE MST
    for (const [nodes, edge] of edges.entries()) {
      console.log(edge.color)
      if(edge.color[0] == 255 && edge.color[1] == 255 && edge.color[2] == 255){
        
        await edge.changeFill(27, 69, 94)
      }
      if(edge.color[0] == 255 && edge.color[1] == 157 && edge.color[2] == 0){
        
        await edge.changeFill(27, 69, 94)
      }
      
    }
    
  }

  draw() {

    // for (const [key, value] of this.AdjList.entries()) {
    //   key.draw()
    // }
  }
}

function getEdge(u,v) {
  if(edges.has(v.value + "," + u.value)){
    return(edges.get(v.value + "," + u.value))
  }
  return(edges.get(u.value + "," + v.value))
}



class GraphNode {
  constructor(x, y){
    this.value = ""
    this.x = x
    this.y = y
    this.size = 50
    this.outlineColor = [255,255,255]
    this.fillColor = [28,42,53]
    
  }
  draw(){
    fill(this.fillColor[0], this.fillColor[1], this.fillColor[2]);
    stroke(this.outlineColor[0], this.outlineColor[1], this.outlineColor[2])

    // if(this.color[0] < 255){
    //   this.color[0] += 3
    // }
    // if(this.color[1] < 255){
    //   this.color[1] += 3
    // }
    // if(this.color[2] < 255){
    //   this.color[2] += 3
    // }


    ellipse(this.x, this.y, this.size, this.size)

    if(this.isFinal){
      ellipse(this.x, this.y, this.size - 10, this.size - 10)
    }
    fill(255,255,255);
    if(this.isInitial){
      triangle(this.x - 50, this.y + 25, this.x - 50, this.y - 25, this.x - 25, this.y)
    }

    if(this.value != ""){
      noStroke()
      fill(255, 255, 255);
      textSize(12)
      text(this.value, this.x, this.y)
    }
  }
  clicked(){
    if(!editingMode){
      if(mouseX > this.x - this.size/2 && mouseX < this.x + this.size/2 && mouseY > this.y - this.size/2 && mouseY < this.y + this.size/2){
        console.log("clicked")
        return this
      }
    }
  }
  async changeFill(r, g, b) {
    // console.log("OLD X: " + this.x + ",Y: " + this.y)
    // console.log("X: " + newX + ",Y: " + newY)
    for(let i = 0; i <= (150 / animSpeed); i++){
      this.fillColor[0] = this.fillColor[0] + (r - this.fillColor[0]) * easing
      this.fillColor[1] = this.fillColor[1] + (g - this.fillColor[1]) * easing
      this.fillColor[2] = this.fillColor[2] + (b - this.fillColor[2]) * easing
      await sleep(2)
    }
    
    this.fillColor[0] = r
    this.fillColor[1] = g
    this.fillColor[2] = b
  }
  async changeOutline(r, g, b) {
    // console.log("OLD X: " + this.x + ",Y: " + this.y)
    // console.log("X: " + newX + ",Y: " + newY)
    for(let i = 0; i <= (150 / animSpeed); i++){
      this.outlineColor[0] = this.outlineColor[0] + (r - this.outlineColor[0]) * easing
      this.outlineColor[1] = this.outlineColor[1] + (g - this.outlineColor[1]) * easing
      this.outlineColor[2] = this.outlineColor[2] + (b - this.outlineColor[2]) * easing
      await sleep(2)
    }
    
    this.outlineColor[0] = r
    this.outlineColor[1] = g
    this.outlineColor[2] = b
  }
}

class Edge {
  constructor(start, end, edgeType){
    this.start = start
    this.end = end
    this.value = ""
    this.edgeType = edgeType
    this.color = [255,255,255]
  }
  draw(){
    var center = 25

    var midX = (this.start.x + this.end.x)/2
    var midY = (this.start.y + this.end.y)/2

    let curveDistance = 25
    let distance = sqrt(pow(this.start.y - this.end.y,2) + pow(this.end.x - this.start.x,2))
    distance = curveDistance/distance
    
    //Control line shape
    stroke(this.color[0], this.color[1], this.color[2])

    // if(this.color[0] < 255){
    //   this.color[0] += 3
    // }
    // if(this.color[1] < 255){
    //   this.color[1] += 3
    // }
    // if(this.color[2] < 255){
    //   this.color[2] += 3
    // }

    if(this.edgeType == "straight"){
      line(this.start.x, this.start.y, this.end.x, this.end.y)
    }
    else if(this.edgeType == "curve"){
      
      noFill()
      beginShape()
      curveVertex(this.start.x,this.start.y)
      curveVertex(this.start.x,this.start.y)
      curveVertex(midX + distance * (this.start.y-this.end.y), midY + distance * (this.end.x-this.start.x))
      curveVertex(this.end.x,this.end.y)
      curveVertex(this.end.x,this.end.y)
      endShape()
      
    }
    else if(this.edgeType == "loop"){

      let loopOffset = 20
      curveDistance = 60

      let distance = sqrt(pow(this.start.y - this.end.y,2) + pow((this.end.x - loopOffset) - (this.start.x + loopOffset),2))
      distance = curveDistance/distance

      noFill()
      beginShape()
      curveVertex(this.start.x + loopOffset,this.start.y)
      curveVertex(this.start.x + loopOffset,this.start.y)
      curveVertex(midX + distance * (this.start.y-this.end.y), midY + distance * ((this.end.x - loopOffset) - (this.start.x + loopOffset)))
      curveVertex(this.end.x - loopOffset,this.end.y)
      curveVertex(this.end.x - loopOffset,this.end.y)
      endShape()
    }

    fill(this.color[0], this.color[1], this.color[2])
    noStroke()
    
    //NOTE: COMMENTED OUT FOR UNDIRECTED GRAPHS

    // //Control arrow point
    // var offset = 8
    // push() //start new drawing state
    // var angle = atan2(this.start.y - this.end.y, this.start.x - this.end.x); //gets the angle of the line

    // if(this.edgeType == "straight"){
    //   translate(midX, midY); //translates to the destination vertex
    // }
    // else if(this.edgeType == "curve"){
    //   translate(midX + distance * (this.start.y-this.end.y), midY + distance * (this.end.x-this.start.x))
    // }
    // else if(this.edgeType == "loop"){
    //   angle = -90
    //   translate(this.start.x + 14, this.start.y - 25)
    // }

    // rotate(angle-HALF_PI); //rotates the arrow point
    // triangle(-offset*0.5, offset, offset*0.5, offset, 0, -offset/2); //draws the arrow point as a triangle
    // pop();

    textSize(12)

    //control transition labels
    
    if(this.edgeType == "straight"){
      text(this.value, (this.start.x + this.end.x)/2, (this.start.y + this.end.y)/2 - 20)
    }
    else if(this.edgeType == "curve"){
      text(this.value, midX + distance * (this.start.y-this.end.y), midY + distance * (this.end.x-this.start.x)- 20)
    }
    else if(this.edgeType == "loop"){
      text(this.value, this.start.x, this.start.y - curveDistance - 10)
    }
    
  }

  clicked(){
    let clickArea = 15

    var midX = (this.start.x + this.end.x)/2
    var midY = (this.start.y + this.end.y)/2

    let curveDistance = 25
    let distance = sqrt(pow(this.start.y - this.end.y,2) + pow(this.end.x - this.start.x,2))
    distance = curveDistance/distance

    if(this.edgeType == "straight" && dist((this.start.x + this.end.x)/2, (this.start.y + this.end.y)/2, mouseX, mouseY) < clickArea){
      console.log("EDGE CLICK")
      return this
    }
    
    else if(this.edgeType == "curve" && dist(midX + distance * (this.start.y-this.end.y), midY + distance * (this.end.x-this.start.x), mouseX, mouseY) < clickArea){
      console.log("EDGE CLICK")
      return this
    }
    if(this.edgeType == "loop" && dist(this.start.x, this.start.y - 60, mouseX, mouseY) < clickArea){
      console.log("EDGE CLICK")
      return this
    }
  }
  async changeFill(r, g, b) {
    // console.log("OLD X: " + this.x + ",Y: " + this.y)
    // console.log("X: " + newX + ",Y: " + newY)
    for(let i = 0; i <= (150 / animSpeed); i++){
      this.color[0] = this.color[0] + (r - this.color[0]) * easing
      this.color[1] = this.color[1] + (g - this.color[1]) * easing
      this.color[2] = this.color[2] + (b - this.color[2]) * easing
      await sleep(2)
    }
    
    this.color[0] = r
    this.color[1] = g
    this.color[2] = b
  }

}

function keyPressed() {
  if (keyCode === ENTER) {
    console.log("Enter")
    keyPress = "Enter"
  }
}

function keyReleased() {
  keyPress = null
}

function handleAddNode() {
  clickMode = "addNode"
  statusText = "Add Node"
}


function handleRemoveNode() {
  clickMode = "removeNode"
  statusText = "Remove Node"
}

function handleRemoveEdge() {
  clickMode = "removeEdge"
  statusText = "Remove Edge"
}

function handleAddEdge() {
  clickMode = "addEdge"
  statusText = "Add Edge"
}

function handleMouse() {
  clickMode = "none"
  statusText = "Mouse"
}

function handleBFS() {
  clickMode = "bfs"
  statusText = "BFS: Click on starting node to start"
  resetColors()
}

function handleDFS() {
  clickMode = "dfs"
  statusText = "DFS: Click on starting node to start"
  resetColors()
}


function handlePrimMST() {
  clickMode = "primMST"
  statusText = "Minimum Spanning Tree (Prim): Click on starting node to start"
  resetColors()
}

function moveInputField(x, y) {
  inp.position(x ,y)
  inpButton.position(x + 80,y)
}

function nodeValueSet() {
  console.log(inpValue)

  //WE CANNOT USE HAS BECAUSE WE NEED TO READ THE VALUE OF THE NODE
  for(node of nodes){
    if(node.value == inpValue){
      alert("Duplicate value")
      return
    }

  }

  editingMode = false;
  handleMouse()
  inpTarget.value = inpValue
  moveInputField(-500,-500)
}

function edgeValueSet() {
  console.log(inpValue)



  editingMode = false;
  handleMouse()
  inpTarget.value = parseInt(inpValue)
  moveInputField(-500,-500)
}

function resetColors() {
  for (const [nodes, edge] of edges.entries()) {
    edge.color = [255,255,255]
  }

  for(node of nodes){
    node.fillColor = [28,42,53]
    node.outlineColor = [255,255,255]
  }
}


let nodes = new Set()
let edges = new Map()


let selectedNode
let startx = 0, starty = 0, endx = 0, endy = 0
let startnode = undefined, endnode = undefined

var graph = new Graph()

var statusText = "Standby"

function setup() {
  //createCanvas(400, 400);
  let cnv = createCanvas(windowWidth, windowHeight - controlsHeight);
  cnv.parent("sketchHolder");
  console.log(cnv)

  inp = createInput("")
  inp.parent("sketchHolder")
  inp.size(70)
  inp.position(-500,-500)
  inp.input(function myInputEvent() {
    inpValue = this.value()
  })

  inpButton = createButton("Set")
  inpButton.parent("sketchHolder")
  inpButton.position(-500,-500)
  inpButton.mousePressed(nodeValueSet);

  let newNode1 = new GraphNode(100, 100)
  nodes.add(newNode1)
  newNode1.value = 1
  graph.addVertex(newNode1)

  let newNode2 = new GraphNode(200, 100)
  nodes.add(newNode2)
  newNode2.value = 2
  graph.addVertex(newNode2)

  let newNode3 = new GraphNode(100, 200)
  nodes.add(newNode3)
  newNode3.value = 3
  graph.addVertex(newNode3)

  let newNode4 = new GraphNode(200, 200)
  nodes.add(newNode4)
  newNode4.value = 4
  graph.addVertex(newNode4)

  let newNode5 = new GraphNode(300, 200)
  nodes.add(newNode5)
  newNode5.value = 5
  graph.addVertex(newNode5)

  var newEdge = new Edge(newNode1, newNode2, "straight")
  edges.set(newNode1.value + "," + newNode2.value, newEdge)
  graph.addEdge(newNode1, newNode2)

  newEdge.value = 2

  newEdge = new Edge(newNode1, newNode3, "straight")
  edges.set(newNode1.value + "," + newNode3.value, newEdge)
  graph.addEdge(newNode1, newNode3)

  newEdge.value = 4

  newEdge = new Edge(newNode1, newNode4, "straight")
  edges.set(newNode1.value + "," + newNode4.value, newEdge)
  graph.addEdge(newNode1, newNode4)

  newEdge.value = 8

  newEdge = new Edge(newNode2, newNode5, "straight")
  edges.set(newNode2.value + "," + newNode5.value, newEdge)
  graph.addEdge(newNode2, newNode5)

  newEdge.value = 9

  newEdge = new Edge(newNode4, newNode5, "straight")
  edges.set(newNode4.value + "," + newNode5.value, newEdge)
  graph.addEdge(newNode4, newNode5)

  newEdge.value = 3

  graph.primMST(newNode1)

  //moveInputField(100,100)

  rectMode(CENTER)
  textAlign(CENTER, CENTER)
}

function draw() {
  background(28, 42, 53);

  rectMode(CENTER)
  textAlign(CENTER, CENTER)

  for (const [nodes, edge] of edges.entries()) {
    edge.draw()
  }

  for(node of nodes){
    node.draw()
  }

  graph.draw()

  fill(WHITE)
  noStroke()
  textAlign(LEFT, TOP)
  text(statusText, 10, 10)

  //tempLine
  stroke(255)
  line(startx, starty, endx, endy)
}

function mousePressed() {
  if(mouseButton == LEFT && mouseY > 0){
    if(clickMode == "addNode" && editingMode == false){
      inpButton.mousePressed(nodeValueSet);
      moveInputField(mouseX,mouseY)
      var newNode = new GraphNode(mouseX, mouseY)
      nodes.add(newNode)
      editingMode = true
      graph.addVertex(newNode)
      inpTarget = newNode
    }

    else if(clickMode == "addEdge" && editingMode == false){
      inpButton.mousePressed(edgeValueSet);
      startx = mouseX
      starty = mouseY
      endx = mouseX
      endy = mouseY
      for(let node of nodes){
        startnode = node.clicked()
        if(startnode != undefined){
          break
        }
      }
    }
    else if(clickMode == "removeNode" && editingMode == false){
      let removeNode
      for (node of nodes) {
        removeNode = node.clicked()
        if(removeNode != undefined){

          for (const [nodes, edge] of edges.entries()) {
            if(edge.end == removeNode || edge.start == removeNode){
              edges.delete(edge.start.value + "," + edge.end.value)
              edges.delete(edge.end.value + "," + edge.start.value)
            }
          }
          graph.removeNode(removeNode)

          nodes.delete(removeNode)

          break
        }
      }
    }

    else if(clickMode == "removeEdge" && editingMode == false){
      let removeEdge
      for (const [nodes, edge] of edges.entries()) {
        removeEdge = edge.clicked()
        if(removeEdge != undefined){
          graph.removeEdge(edge.start, edge.end)

          edges.delete(edge.start.value + "," + edge.end.value)
          console.log("YES")
          break
        }
      }
    }

    else if(clickMode == "bfs" && editingMode == false){
      for(node of nodes){
        selectedNode = node.clicked()
        if(selectedNode != undefined){
          console.log("HERE")
          statustext = "BFS: Running"
          graph.bfs(selectedNode)
          break
        }
      }
    }

    else if(clickMode == "dfs" && editingMode == false){
      for(node of nodes){
        selectedNode = node.clicked()
        if(selectedNode != undefined){
          console.log("HERE")
          statustext = "DFS: Running"
          graph.dfs(selectedNode)
          break
        }
      }
    }

    else if(clickMode == "primMST" && editingMode == false){
      for(node of nodes){
        selectedNode = node.clicked()
        if(selectedNode != undefined){
          console.log("HERE")
          statustext = "Prim's Algo: Running"
          graph.primMST(selectedNode)
          break
        }
      }
    }

    else if(clickMode == "none" && editingMode == false){
      for(node of nodes){
        selectedNode = node.clicked()
        if(selectedNode != undefined){
          selectedNode.x = mouseX
          selectedNode.y = mouseY
          break
        }
      }
    }
  }
  else if(mouseButton == RIGHT && editingMode == false){
    console.log(graph.AdjList)
    console.log(edges)
  }
}

function mouseDragged(){
  if(mouseButton == LEFT && mouseY > 0 && editingMode == false){
    if(clickMode == "addEdge"){
      endx = mouseX
      endy = mouseY
    }
    else if (clickMode == "none" && editingMode == false){
      if(selectedNode != undefined){
        selectedNode.x = mouseX
        selectedNode.y = mouseY
      }
      
    }
  }
}

function mouseReleased(){
  //console.log(startnode)
  startx = 0, starty = 0, endx = 0, endy = 0

  if(mouseButton == LEFT && mouseY > 0){
    if(selectedNode != undefined){
      selectedNode.color = [255, 255, 255];
    }

    if(clickMode == "addEdge" && editingMode == false){

      for(let node of nodes){
        endnode = node.clicked()
        if(endnode != undefined){
          break
        }
      }
      if(startnode != undefined && endnode != undefined){
        if(edges.has(startnode.value + "," + endnode.value) || 
        edges.has(endnode.value + "," + startnode.value)){
          return
        }

        let lineType = "straight"

        if(startnode == endnode){
          lineType = "loop"
        }

        //DISABLED FOR UNDIRECTED

        // if(graph.AdjList.get(endnode).has(startnode)){
        //   console.log("CURVED")
        //   edges.get(endnode.value + "," + startnode.value).edgeType = "curve"
        //   lineType = "curve"
        // }

        //GET EDGE WEIGHT
        var midX = (startnode.x + endnode.x)/2
        var midY = (startnode.y + endnode.y)/2

        var curveDistance = 25
        var distance = sqrt(pow(startnode.y - endnode.y,2) + pow(endnode.x - startnode.x,2))
        distance = curveDistance/distance

        //MOVE POSITION
        if(lineType == "straight"){
          moveInputField((startnode.x + endnode.x)/2, (startnode.y + endnode.y)/2 - 20)
        }
        else if(lineType == "curve"){
          moveInputField(midX + distance * (startnode.y-endnode.y), midY + distance * (endnode.x-startnode.x)- 20)
        }
        else if(lineType == "loop"){
          moveInputField(startnode.x, startnode.y - curveDistance - 10)
        }

        editingMode = true
        
        var newEdge = new Edge(startnode, endnode, lineType)
        inpTarget = newEdge
        edges.set(startnode.value + "," + endnode.value, newEdge)
        graph.addEdge(startnode, endnode)
      }
      
    }
  }
}