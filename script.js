const Grid = document.getElementById("Grid")
const ColorInput = document.getElementById("ColorInput")
const Eraser = document.getElementById("Eraser")
Eraser.addEventListener("click",Erase)
const RandomColorButton = document.getElementById("RandomColor")
RandomColorButton.addEventListener("click",ChooseRandomColor)
const SaveColor = document.getElementById("SaveColor")
SaveColor.addEventListener("click",SaveColors)
const Ulist = document.querySelector("#ColorPalette ul")
const SavedHeader = document.querySelector("#ColorPalette h2")
const HexForm = document.getElementById("HexForm")
const BoxForm = document.getElementById("BoxForm")
const InputHex = document.getElementById("InputHex")
const ClearColors = document.getElementById("ClearColors")
const BoxArrange = document.getElementById("BoxArrange")
ClearColors.addEventListener("click",ClearSavedColors)
let isPressed = false
let OnorOff = false
let x = undefined
let y = undefined
let x2
let y2
let SavedColor = []
let Width = 640
let BoxWidth


    const ColorsFromLocalStorage = JSON.parse(localStorage.getItem("SavedColor"))

    if (ColorsFromLocalStorage) {

    SavedColor = ColorsFromLocalStorage
    AddColors(SavedColor)

    }



function CreateDivs() {

    for (let i = 0; i < 225; i += 1) {
    
        const Div = document.createElement("div")
        Div.style.width = `40px`
        Div.style.height = "40px"
        Grid.appendChild(Div)  
    }


}




function ChangeDivSize() {
            
            if (BoxArrange.value) {
                

                BoxWidth = Width / Number(BoxArrange.value)
                Grid.innerHTML = ``
                BoxWidth = BoxWidth.toString()
                for (let i = 0; i < Number(BoxArrange.value) * Number(BoxArrange.value); i += 1) {
                    
                    const ChangeDiv = document.createElement("div")
                    ChangeDiv.setAttribute("id","ChangeDiv")
                    ChangeDiv.style.width = `${BoxWidth}px`
                    ChangeDiv.style.height = `${BoxWidth}px`
                    Grid.appendChild(ChangeDiv)
                }

    
            } else {
                CreateDivs()
            }
            PaintDivs()
    }

    ChangeDivSize()

  

function PaintDivs() {
   
    Grid.addEventListener("mousedown",(e) => {

        isPressed = true

    })

    Grid.addEventListener("mouseup", (e) => {

        isPressed = false

    })

    const GridDiv = document.querySelectorAll("#Grid div")

    GridDiv.forEach(Div => {

        Div.addEventListener("mousemove",(e) => {

            if (isPressed) {

                Div.style.backgroundColor = `${ColorInput.value}`

            }

          

        })

    })
    
}

function Clear() {

    location.reload()

}

function Erase() {

   if (OnorOff === false) {

    OnorOff = true
    Eraser.style.backgroundColor = `black`
    Eraser.style.color = `white`
    Eraser.innerHTML = `Eraser is on`

   } else {

    OnorOff = false
    Eraser.style.backgroundColor = `White`
    Eraser.style.color = `black`
    Eraser.innerHTML = `Eraser is off`

   }

    GridDivs.forEach(GridDiv => {

        GridDiv.addEventListener("mousedown",() => {

            isPressed = true

        })

        GridDiv.addEventListener("mouseup",() => {

            isPressed = false

        })

        GridDiv.addEventListener("mousemove",() => {


            if(isPressed && OnorOff) {

                GridDiv.style.backgroundColor = `White`

            }

        })

    })

}



function ChooseRandomColor() {

    const RandomColor = Math.floor(Math.random()*16777215).toString(16)

    ColorInput.value = `#${RandomColor}`
    RandomColorButton.style.backgroundColor = `#${RandomColor}`
    RandomColorButton.innerHTML = ``

}

function SaveColors() {

    SavedColor.push(ColorInput.value)
    localStorage.setItem("SavedColor",JSON.stringify(SavedColor))
    JSON.stringify(SavedColor)

    location.reload()
}

function AddColors(Colors) {
 
    for (let i = 0; i < Colors.length; i+= 1) {

        if (Colors.length <= 8) {

            Ulist.innerHTML += `<button>${Colors[i]}</button>`

        } else {

            SavedHeader.innerHTML = `You can only save 9 colors`
            Ulist.innerHTML += `<button>${Colors[i]}</button>`
            SaveColor.disabled = true

        } 
    }
}

function StyleUlistButtons() {

    const UlistButton = Ulist.querySelectorAll("button")

    UlistButton.forEach((Button) => {

    Button.style.backgroundColor = `${Button.innerHTML}`

    Button.addEventListener("click", () => {

        navigator.clipboard.writeText(Button.innerHTML)
        alert("Copied")

    })






 
    })
}

StyleUlistButtons()


HexForm.addEventListener("submit", (e) => {

    e.preventDefault()

    console.log(InputHex.value)
    ColorInput.value = InputHex.value
    RandomColorButton.style.backgroundColor = InputHex.value
    RandomColorButton.innerHTML = ``
    InputHex.value = ``
    
    

    

})

function ClearSavedColors() {

    localStorage.clear()
    location.reload()

}