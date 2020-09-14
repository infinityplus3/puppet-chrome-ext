console.log("HI I EXIST LEL")
let currentel = null
let remover = null
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
    let divy = document.createElement("div")
    divy.style.top = `${top + 20}px`
    divy.style.left = `${left}px`
    divy.style.position = "absolute"
    divy.style.width = "370px"
    divy.style.height = '154px'
    divy.style.background = "#C4C4C4"
    divy.style["border-radius"] = "30px"
    divy.id = `div${top}${left}`
    document.body.appendChild(divy)
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
        createDiv(pos.top, pos.left, ["HAHAHHAHAHAHA"], element)
        currentel = element
        remover = document.getElementById(`div${pos.top}${pos.left}`)
      }
      break
    }
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendresp){
  console.log(request)
  if (request.running === true) {
    document.addEventListener("mousemove", func, false)
  }
  else if (request.running === false) {
    document.removeEventListener("mousemove", func, false)
  }
})
