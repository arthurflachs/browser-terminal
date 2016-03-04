import createElement from 'virtual-dom/create-element'
import { App } from './Components'
import { updateTree } from './tree'

const root = document.body

const tree = App()
const vdom = {
  tree,
  node: createElement(tree),
}
root.appendChild(vdom.node)

updateTree(vdom, tree)
