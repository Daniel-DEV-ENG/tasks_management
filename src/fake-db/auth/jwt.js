import mock from '../mockup'
import {  comparePassword } from '../../utiltis/passwordUtils';

const data = {
  users: [
    {
      id: 1,
      fullName: 'John Doe',
      username: 'johndoe',
      password: 'admin',
    
      email: 'admin@demo.com',
      role: 'admin',
      ability: [
        {
          action: 'manage',
          subject: 'all'  
        }
      ],
      extras: {
        eCommerceCartItemsCount: 5
      }
    },
    {
      id: 2,
      fullName: 'Jane Doe',
      username: 'janedoe',
      password: 'client',
      
      email: 'client@demo.com',
      role: 'client',
      ability: [
        {
          action: 'read',
          subject: 'ACL'
        },
        {
          action: 'read',
          subject: 'Auth'
        }
      ],
      extras: {
        eCommerceCartItemsCount: 5
      }
    },
    {
      id: 3,
      fullName: 'remoan',
      username: 'tomany',
      password: '123',
  
      email: 'remoan@demo.com',
      role: 'admin',
      ability: [
        {
          action: 'update',
          subject: 'all'
        }
  
      ],
      extras: {
        eCommerceCartItemsCount: 5
      }
    }
  ]
}

// ! These two secrets shall be in .env file and not in any other file
const jwtConfig = {
  secret: 'dd5f3089-40c3-403d-af14-d0c228b05cb4',
  refreshTokenSecret: '7c4c1c50-3230-45bf-9eae-c9b2e401c767',
  expireTime: '10m',
  refreshTokenExpireTime: '10m'
}

mock.onPost('/jwt/login').reply(request => {
  const { email, password } = JSON.parse(request.data)

  let error = {
    email: ['Something went wrong']
  }

  const user = data.users.find(u => u.email === email && u.password === password)
  console.log("🚀 ~ mock.onPost ~ user:", user)

  if (user) {
    try {
      
      const userData = { ...user }


      const response = {
        userData,
        accessToken:jwtConfig.secret,
        refreshToken:jwtConfig.refreshTokenSecret
      }

      return [200, response]
    } catch (e) {
      error = e
    }
  } else {
    error = {
      email: ['Email or Password is Invalid']
    }
  }

  return [400, { error }]
})

// mock.onPost('/jwt/register').reply(request => {
//   if (request.data.length > 0) {
//     const { email, password, username } = JSON.parse(request.data)
//     const isEmailAlreadyInUse = data.users.find(user => user.email === email)
//     const isUsernameAlreadyInUse = data.users.find(user => user.username === username)
//     const error = {
//       email: isEmailAlreadyInUse ? 'shiiiiit' : null,
//       username: isUsernameAlreadyInUse ? 'shit' : null
//     }

//     if (!error.username && !error.email) {
//       const userData = {
//         email,
//         password,
//         username,
//         fullName: '',
//         avatar: null
        
//       }

//       // Add user id
//       const length = data.users.length
//       let lastIndex = 0
//       if (length) {
//         lastIndex = data.users[length - 1].id
//       }
//       userData.id = lastIndex + 1

//       data.users.push(userData)

//  //     const accessToken = JWT.sign({ id: userData.id }, JWK.asKey(jwtConfig.secret), { expiresIn: jwtConfig.expireTime })

//       const user = Object.assign({}, userData)
//       delete user['password']
//       const response = { user, accessToken }

//       return [200, response]
//     } else {
//       return [200, { error }]
//     }
//   }
// })

// mock.onPost('/jwt/refresh-token').reply(request => {
//   const { refreshToken } = JSON.parse(request.data)

//   try {
//     const { id } = JWT.verify(refreshToken, JWK.asKey(jwtConfig.refreshTokenSecret))

//     const userData = { ...data.users.find(user => user.id === id) }

//     const newAccessToken = JWT.sign({ id: userData.id }, JWK.asKey(jwtConfig.secret), { expiresIn: jwtConfig.expiresIn })
//     const newRefreshToken = JWT.sign({ id: userData.id }, JWK.asKey(jwtConfig.refreshTokenSecret), {
//       expiresIn: jwtConfig.refreshTokenExpireTime
//     })

//     delete userData.password
//     const response = {
//       userData,
//       accessToken: newAccessToken,
     
//     }
//   }
//   catch(e){

//   }}
// )


mock.onGet('/auth/me').reply(config => {
  // Get token from header
  const token = config.headers.Authorization;

  // If token is not provided or null, return 400 response
  if (!token) {
    return [400, { error: 'Token not provided' }];
  }

  // If token is provided, return 200 response with empty object
  return [200, {}];


  // // ** Checks if the token is valid or expired
  // jwt.verify(token, jwtConfig.secret, (err, decoded) => {
  //   // ** If token is expired
  //   if (err) {
  //     // ** If onTokenExpiration === 'logout' then send 401 error
  //     if (defaultAuthConfig.onTokenExpiration === 'logout') {
  //       // ** 401 response will logout user from AuthContext file
  //       response = [401, { error: { error: 'Invalid User' } }]
  //     } else {
  //       // ** If onTokenExpiration === 'refreshToken' then generate the new token
  //       const oldTokenDecoded = jwt.decode(token, { complete: true })

  //       // ** Get user id from old token
  //       // @ts-ignore
  //       const { id: userId } = oldTokenDecoded.payload

  //       // ** Get user that matches id in token
  //       const user = users.find(u => u.id === userId)

  //       // ** Sign a new token
  //       const accessToken = jwt.sign({ id: userId }, jwtConfig.secret, {
  //         expiresIn: jwtConfig.expirationTime
  //       })

  //       // ** Set new token in localStorage
  //       window.localStorage.setItem(defaultAuthConfig.storageTokenKeyName, accessToken)
  //       const obj = { userData: { ...user, password: undefined } }

  //       // ** return 200 with user data
  //       response = [200, obj]
  //     }
  //   } else {
  //     // ** If token is valid do nothing
  //     // @ts-ignore
  //     const userId = decoded.id

  //     // ** Get user that matches id in token
  //     const userData = JSON.parse(JSON.stringify(users.find(u => u.id === userId)))
  //     delete userData.password

  //     // ** return 200 with user data
  //     response = [200, { userData }]
  //   }
  // })

})
