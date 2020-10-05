function render(vdom, parentDOM){
  let dom = createDOM(vdom)
  parentDOM.appendChild(dom)
}

function createDOM(vdom){
  if( typeof vdom === 'string' || typeof vdom === 'number' ) {
    return document.createTextNode(vdom)
  }
  let { type, props } = vdom
  let dom = document.createElement(type)
  updateProps(dom, props)
  reconcileChildren(props.children, dom)
  return dom
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