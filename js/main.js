const inputs = document.querySelectorAll('.input')
const tipAmountDisplay = document.getElementById('tip-amount-display')
const totalDisplay = document.getElementById('total-display')
const btnReset = document.querySelector('.btn-reset')

let appObject

initAppObject()

function initAppObject() {
  appObject = {
    bill: 0,
    tip: 0,
    people: 0,
  }
}

btnReset.addEventListener('click', () => {
  initAppObject()
  resetDisplay()
  inputs.forEach((input) => {
    input.value = ''
  })
})

inputs.forEach((input) => {
  input.addEventListener('input', (e) => {
    appObject[e.target.name] = +e.target.value

    if (!appObjectIsFilled()) {
      return resetDisplay()
    }

    const [tipAmount, total] = calculateResult()
    tipAmountDisplay.innerHTML = tipAmount.toString()
    totalDisplay.innerHTML = total.toString()
  })
})

function calculateResult() {
  const { bill, tip, people } = appObject
  const tipAmount = roundTwoDigits((bill * (tip / 100)) / people)
  const total = roundTwoDigits((tipAmount * people + bill) / people)
  return [tipAmount, total]
}

function roundTwoDigits(num) {
  return Math.round(num * 100) / 100
}

function appObjectIsFilled() {
  return Object.values(appObject).every((value) => value)
}

function resetDisplay() {
  tipAmountDisplay.innerHTML = '0.00'
  totalDisplay.innerHTML = '0.00'
}
