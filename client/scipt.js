let form = document.forms.register
let table = document.querySelector('.table')




let url ='http://localhost:3001/users'





function getUsers(){
    axios.get(url)
        .then(res =>{
            if(res.status ===200 || res.status ===201){
                reload(res.data)

            }
        })
}
getUsers()

form.onsubmit = (event) => {
    event.preventDefault()


    let users = {
        id: Math.random()
    }

    let frm = new FormData(form)

    frm.forEach((value, key) => {
        users[key] = value
    })


    users.year = new Date().getFullYear() - users.year
    axios.post(url , users)
    .then(res =>{
    if(res.status ===200 || res.status ===201){
        getUsers()
    }
})
}


function reload(arr) {
    table.innerHTML = ``
    table.innerHTML += `
    <tr>
    <th>No</th>
    <th>Имя студента</th>
    <th>Год рождения</th>
    <th>Действия</th>
</tr>
`
    for (let item of arr) {
        let tr = document.createElement('tr')
        let td = document.createElement('td')
        let tdName = document.createElement('td')
        let tdYear = document.createElement('td')
        let bt = document.createElement('button')
        let tdButton = document.createElement('button')

        bt.classList.add('bt')

        td.innerHTML = arr.indexOf(item) + 1
        tdName.innerHTML = item.name
        tdYear.innerHTML = item.year
        bt.innerHTML = 'Удалить'

        table.append(tr)
        tr.append(td , tdName , tdYear , tdButton)
        tdButton.append(bt)
        

        bt.onclick = ()=>{
              let id = item.id
            let del =  arr.indexOf(item)
            arr.splice(del , 1)
            console.log(arr);

            axios.delete(`${url}/${id}`)
            .then(res =>{
                console.log(res.data);
            })

            reload(arr)
        }

    }
    
}