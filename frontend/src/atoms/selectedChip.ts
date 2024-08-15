import { atom } from "recoil";

export const selectedChipState = atom(({
  key: 'selectedChipState',
  default: 'All'
}))
