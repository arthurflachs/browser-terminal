import createElement from 'virtual-dom/create-element'
import patch from 'virtual-dom/patch'
import diff from 'virtual-dom/diff'

import { App } from './Components'

const root = document.body

let tree = App()
let rootNode = createElement(tree)
root.appendChild(rootNode)

function makeKeydownListener(history) {
  return function keydownListener(e) {
    return processLine('ls')
      .then(function(result) {
        return history.concat({
          line: 'ls',
          result,
        })
      })
  }
}

function updateTree(tree, newTree, history = []) {
  const patches = diff(tree, newTree)
  rootNode = patch(rootNode, patches)

  const keydownListener = makeKeydownListener(history)

  function onKeydown(e) {
    if (e.which === 13) {
      e.preventDefault()

      keydownListener(e)
        .then(newHistory => updateTree(newTree, App(newHistory), newHistory))
        .then(function() {
          document.removeEventListener('keydown', onKeydown)
        })
    }
  }

  document.addEventListener('keydown', onKeydown)
}

updateTree(tree, App())

function processLine(line) {
  return Promise.resolve('Hello world')
}

function keyboardInput(history, e) {
  switch (e.which) {
    case 13:
  }
}
