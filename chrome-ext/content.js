console.log("HI I EXIST LEL")

let currentel = null
let remover = null

const elementAttributes = (elem) =>
  elem.getAttributeNames().reduce((attrMap, name) => {
    attrMap[name] = elem.getAttribute(name);
    return attrMap;
  }, {});

const getOffset = el => {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

const createDiv = (top, left, info, element) => {
  console.log(elementAttributes(element))
  let divy = document.createElement("div")
  divy.style.top = `${top + 20}px`
  divy.style.left = `${left}px`
  divy.style.position = "absolute"
  divy.style.width = "370px"
  divy.style.height = '154px'
  divy.style.background = "#C4C4C4"
  divy.style["border-radius"] = "30px"
  divy.id = `div${top}${left}`
  if (info !== []) {
    info.forEach(item => {
      let node = document.createElement("span")
      node.innerHTML = item
      divy.appendChild(node)
    });
  }
  else {
    let node = document.createElement("span")
    node.innerHTML = "No attributes found."
    divy.appendChild(node)
  }
  document.body.appendChild(divy)
  return divy
}

const func = () => {
  let elements = Object.values(document.getElementsByTagName("*")).reverse()
  for (let i = 0; i < elements.length; i++){
    let element = elements[i]
    if (element.matches(":hover")) {
      if (element !== currentel && element !== remover) {
        console.log(element)
        if(remover !== null){
          remover.parentNode.removeChild(remover)
        }
        let pos = getOffset(element)
        remover = createDiv(pos.top, pos.left, Object.values(elementAttributes(element)), element)
        currentel = element
      }
      break
    }
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendresp){
  console.log(request)
  if (request.data.running === true) {
    document.addEventListener("mousemove", func, false)
  }
  else if (request.data.running === false) {
    document.removeEventListener("mousemove", func, false)
    if (remover !== null) {
      remover.parentNode.removeChild(remover)
    }
  }
})
