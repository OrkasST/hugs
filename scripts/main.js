import { count_hugs } from "./countHugs.js"

let day = document.getElementById("day").children
let night = document.getElementById("night").children
let morning = document.getElementById("morning").children
let evening = document.getElementById("evening").children

const fromDate = document.getElementById("from_date")
const fromTime = document.getElementById("from_time")
const toDate = document.getElementById("to_date")
const toTime = document.getElementById("to_time")

const sumBtn = document.getElementById("count")
const resultScreen = document.getElementById("resultScreen")

let checkboxes = [day, night, morning, evening]

checkboxes.forEach(box => {
  console.log(box[0].id)
  console.log(box[1].text)
  box[0].addEventListener("change", (e) => {
    box[1].disabled = !box[0].checked
    if (!box[1].disabled) box[1].value = day[1].value
  })
})

// let date_from = "01.12.2024.10.07"
// let date_to = "01.01.2025.10.07"
// let hugs_per_day = 8

let isFromDateset = false, isFromTimeSet = false
let isToDateset = false, isToTimeSet = false

fromDate.addEventListener("input", () => {
  console.log('fromDate: ', fromDate.value);
  isFromDateset = true
})
fromTime.addEventListener("input", () => {
  console.log('fromTime: ', fromTime.value);
  isFromTimeSet = true
})
toDate.addEventListener("input", () => {
  isToDateset = true
})
toTime.addEventListener("input", () => {
  isToTimeSet = true
})


sumBtn.addEventListener("click", () => {
  if (isFromDateset && isFromTimeSet &&
    isToDateset && isToTimeSet && !checkboxes.every(input => input[1].isDisabled)) {
    let date_from = fromDate.value
      .split("-")
      .map((el, i, arr) => arr[arr.length-i-1])
      .join(".")
      + "."+fromTime.value.split(":").join(".")

    let date_to = toDate.value
      .split("-")
      .map((el, i, arr) => arr[arr.length-i-1])
      .join(".")
      + "."+toTime.value.split(":").join(".")

    let hugs_per_day = parseInt(day[1].value)
    + parseInt(night[1].value)
    + parseInt(morning[1].value)
    + parseInt(evening[1].value);

    let [hours, mins] = count_hugs([date_from, date_to], hugs_per_day)
    resultScreen.innerHTML = hours > 0 && mins > 0 ? `<b>${hours}ч ${mins}мин</b> обнимашек :)` : "Нет обнимашек :("
  } else {
    resultScreen.innerText = "Проверьте данные"
  }
})