import h from 'virtual-dom/h'

export function App(history = []) {
  return h('div', {
    class: 'terminal',
  }, history.reduce((x, { line, result }) => {
    return x.concat([
      Line({ line: line }),
      Result(result),
    ]);
  }, []).concat(Line({ editable: true })))
}

export function Result(result = "") {
  return h('div', {}, [ result ])
}

export function Line({ prefix , line, editable } = {}) {
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
