import { atom } from "recoil";

export const allUsersState = atom(({
  key: 'allUsersState',
  default: [{
    id: '',
    createdAt: '',
    username: '',
    email: '',
    avatar: '',
    password: ''
  }]
})) 
