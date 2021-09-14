var usuarios = [
  {
    nombre: 'toni',
    online: true
  },
  {
    nombre: 'emi',
    online: true
  },
  {
    nombre: 'agus',
    online: false
  }
]


const onlineUser = usuarios.filter(u => u.online == true)
console.log(onlineUser)