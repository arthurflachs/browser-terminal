import patch from 'virtual-dom/patch'
import diff from 'virtual-dom/diff'
import { App } from './Components'

var url = 'http://localhost:8081'

function processLine(line) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      command: line.split("\n")
    })
  }).then(res => res.json())
  .then(json => json.result)
}

function makeKeydownListener(history) {
  return function keydownListener(e, command) {
    return processLine(command)
      .then(function(result) {
        return history.concat({
          line: command,
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

      // Retrieve value of the input
      // TODO: needs refactoring
      const inputs = document.getElementsByClassName('input')
      const command = inputs[inputs.length - 1].innerHTML

      keydownListener(e, command)
        .then(newHistory => updateTree(newDom, App(newHistory), newHistory))
        .then(function() {
          document.removeEventListener('keydown', onKeydown)
        })
    }
  }

  document.addEventListener('keydown', onKeydown)
}
