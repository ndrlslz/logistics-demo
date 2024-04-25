let treeData = null

export const initStore = (data) => {
  treeData = data
}

export const getSelectedKeys = (selectedId, nodes = treeData) => {
  for (const node of nodes) {
    if (node.id === selectedId) {
      return [node.id]
    }
    if (node.children) {
      const keys = getSelectedKeys(selectedId, node.children)
      if (keys) {
        keys.unshift(node.id)
        return keys
      }
    }
  }
}
