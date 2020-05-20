db.createUser({
  user: 'xjh',
  pwd: '123456',
  roles: [
    {
      role: 'readWrite',
      db: 'user'
    }
  ]
})
