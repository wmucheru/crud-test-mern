document.querySelectorAll('.btn-update').forEach((b)=>{

    b.addEventListener('click', (e)=>{

        fetch('/users', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: e.target.dataset.id,
                name: 'Jane',
                email: 'jane@doe.com'
            })
        })
            .then(res => {
                if(res.ok){
                    window.location.reload()
                    // return res.json()
                }
            })
            .then(res => {
                console.log(res)
            })
    })
})