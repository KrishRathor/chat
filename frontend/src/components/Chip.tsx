import React from "react";

interface IChip {
  text: string,
  isSelected: boolean
}

export const Chip: React.FC<IChip> = (props) => {

  const { text, isSelected } = props;

  return (
    <div className={`rounded-xl ${isSelected && 'bg-[#EF6144]'} py-2 px-3 w-fit`} >
      {text}
    </div>
  )
}
