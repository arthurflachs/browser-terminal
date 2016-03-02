import h from 'virtual-dom/h'
import createElement from 'virtual-dom/create-element'
import patch from 'virtual-dom/patch'
import diff from 'virtual-dom/diff'

const root = document.body

function render(history = []) {
  return h('div', {
    class: 'terminal',
  }, history.reduce((x, { line, result }) => {
    return x.concat([
      makeLine(line),
      makeResult(result),
    ]);
  }, []).concat(makeLine({ editable: true })))
}

function makeResult(result = "") {
  return h('div', {}, [ result ])
}

function makeLine({ prefix , line, editable } = {}) {
  prefix = prefix || "arthur@localhost ~$ "

  return h('div', {}, [

    h('span', {
      className: 'prefix',
    }, [prefix]),

    h('span', {
      className: 'input',
      contentEditable: !!editable,
    }, [line]),

  ])
}

let tree = render()
let rootNode = createElement(tree)
root.appendChild(rootNode)

function addLine(history = []) {
  const newTree = render(history)
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
