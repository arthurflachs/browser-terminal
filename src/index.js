import createElement from 'virtual-dom/create-element'
import patch from 'virtual-dom/patch'
import diff from 'virtual-dom/diff'

import { App } from './Components'

const root = document.body

let tree = App()
let rootNode = createElement(tree)
root.appendChild(rootNode)

function addLine(history = []) {
  const newTree = App(history)
  const patches = diff(tree, newTree)

  rootNode = patch(rootNode, patches)
  tree = newTree

  var handleKeyDown = e => {
    if (e.which === 13) {
      e.preventDefault()
      document.removeEventListener('keydown', handleKeyDown)
      return processLine('ls')
        .then(result => addLine(history.concat({
          line: 'ls',
          result,
        })))
    }
  }

  document.addEventListener('keydown', handleKeyDown)
}

addLine();

function processLine(line) {
  return Promise.resolve('Hello world')
}

function keyboardInput(history, e) {
  switch (e.which) {
    case 13:
  }
}
