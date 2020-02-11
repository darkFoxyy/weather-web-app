
document.addEventListener('submit', (event) => {
    event.preventDefault()
    const data = document.querySelector('form input').value
    
    fetch(`http://localhost:3000/data?location=${data}`, { method: 'GET' }).then(async (res) => {
        const data = await res.json()      
        document.getElementById('1').innerHTML = data.data
    })
})