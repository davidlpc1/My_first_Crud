const allDeleteButtons = document.querySelectorAll('.delete-button')
allDeleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click',() => {
        const id = deleteButton.parentNode.dataset.id
        fetch(`${location.href}delete/${id}`,{method:'DELETE'})
        location.reload()
    })
})