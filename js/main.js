const inputs = document.querySelectorAll('.input')
const tipAmountDisplay = document.getElementById('tip-amount-display')
const totalDisplay = document.getElementById('total-display')
const btnReset = document.querySelector('.btn-reset')
const selectTipItems = document.querySelectorAll('#select-tip-list .item:not(.custom)')
const customTipInput = document.getElementById('custom-tip')

const appObject = {
  bill: 0,
  tip: 0,
  people: 0,
}

inputs.forEach((input) => {
  input.addEventListener('input', (e) => {
    appObject[e.target.name] = +e.target.value
    if (e.target.value === '0') {
      return e.target.parentNode.classList.add('error')
    }
    e.target.parentNode.classList.remove('error')
    if (e.target.name === 'tip') {
      resetSelectedTip()
    }
    displayResult()
  })
})

btnReset.addEventListener('click', () => {
  resetAppObject()
  resetDisplay()
  resetSelectedTip()
  resetInputsClass()
  inputs.forEach((input) => {
    input.value = ''
  })
})

selectTipItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    resetSelectedTip()
    customTipInput.value = ''
    e.target.classList.add('selected')
    appObject.tip = e.target.value
    displayResult()
  })
})

function resetInputsClass() {
  inputs.forEach((input) => input.parentNode.classList.remove('error'))
}

function displayResult() {
  if (!appObjectIsFilled()) {
    return resetDisplay()
  }

  const [tipAmount, total] = calculateResult()
  tipAmountDisplay.innerHTML = tipAmount.toString()
  totalDisplay.innerHTML = total.toString()
}

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

function resetAppObject() {
  Object.keys(appObject).forEach((property) => {
    appObject[property] = 0
  })
}

function resetDisplay() {
  tipAmountDisplay.innerHTML = '0.00'
  totalDisplay.innerHTML = '0.00'
}

function resetSelectedTip() {
  selectTipItems.forEach((item) => {
    item.classList.remove('selected')
  })
}
