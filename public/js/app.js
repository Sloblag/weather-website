const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')
const msgThree = document.querySelector('#msg-3')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value // extracts whatever input value is submited

    msgOne.textContent = 'fetching...'
    msgTwo.textContent = ''
    msgThree.textContent = ''
    

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error
            } else {
                msgOne.textContent = data.location
                
                msgTwo.textContent = data.forecast.forecast
                msgThree.textContent = 'Temperature: ' + data.forecast.temperature + ' degrees'
                
            }
        })
    })
})