let day = document.getElementById("day").children
let night = document.getElementById("night").children
let morning = document.getElementById("morning").children
let evening = document.getElementById("evening").children

let checkboxes = [day, night, morning, evening]

checkboxes.forEach(box => {
    console.log(box[0].id)
    console.log(box[1].text)
    box[0].addEventListener("change", (e) => {
      box[1].disabled = !box[0].checked
    })
    box[1].addEventListener("input", (e) => {
        console.log(box[1].value)
        checkboxes.forEach(group => {
          if(group[1].disabled) group[1].value = box[1].value
        })
    })
})