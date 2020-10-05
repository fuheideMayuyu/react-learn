function render(vdom, parentDOM){
  let dom = createDOM(vdom)
  parentDOM.appendChild(dom)
}

function createDOM(virtualDOM){
  if( typeof virtualDOM === 'string' || typeof virtualDOM === 'number' ) {
    return document.createTextNode(virtualDOM)
  }
  let { type, props } = virtualDOM
  let dom 
  if(typeof type === 'function'){
    return type.prototype.isReactComponent ? updateClassComponent(virtualDOM) : updateFunctionComponent(virtualDOM)
  } else {
    dom = document.createElement(type)
  }

  updateProps(dom, props)
 
  if(typeof props.children === 'string' || typeof props.children === 'number') {
    dom.textContent = props.children
  } else if (typeof props.children == 'object' && !Array.isArray(props.children)){
    render(props.children, dom)
  } else if(Array.isArray(props.children)) {
    reconcileChildren(props.children, dom)
  } else {
    dom.textContent = props.children.toString()
  }

  return dom
}

function updateFunctionComponent(virtualDOM){
  let {type, props} = virtualDOM
  let renderVirtualDOM = type(props)
  return createDOM(renderVirtualDOM)
}

function updateClassComponent(virtualDOM){
  let {type:ClassComponent, props} = virtualDOM
  let classInstance = new ClassComponent(props)
  let renderVirtualDOM = classInstance.render()
  return createDOM(renderVirtualDOM)
}

function reconcileChildren(children,parentDOM){
  for(let i=0;i<children.length;i++){
    render(children[i],parentDOM)
  }
}

function updateProps(dom, props){
  for(let key in props){
    if(key === 'children'){continue}
    if(key === 'style'){
      let style = props[key]
      for(let attr in style){
        dom.style[attr] = style[attr]
      }
    } else {
      dom[key] = props[key]
    }
  }
}

export default {
  render
}