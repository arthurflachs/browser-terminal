import patch from 'virtual-dom/patch'
import diff from 'virtual-dom/diff'
import { App } from './Components'

function processLine(line) {
  return Promise.resolve('Hello world')
}

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

export function updateTree(vdom, newTree, history = []) {
  const patches = diff(vdom.tree, newTree)
  const newDom = {
    node: patch(vdom.node, patches),
    tree: newTree,
  }

  const keydownListener = makeKeydownListener(history)

  function onKeydown(e) {
    if (e.which === 13) {
      e.preventDefault()

      keydownListener(e)
        .then(newHistory => updateTree(newDom, App(newHistory), newHistory))
        .then(function() {
          document.removeEventListener('keydown', onKeydown)
        })
    }
  }

  document.addEventListener('keydown', onKeydown)
}
