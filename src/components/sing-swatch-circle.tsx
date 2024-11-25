import { BagData } from "../types"


const SingleSwatchCirlce = ({activeId,handleClick,item}:{item:BagData,handleClick:(item: BagData) => void,activeId:number}) => {
  return (
    <div onClick={()=>{
      handleClick(item)
    }} className={`cursor-pointer w-9 h-9 p-1 rounded-full drop-shadow-xl bg-white transition ease-in hover:scale-110 duration-200   ${item.id === activeId ? "scale-125 hover:scale-125" : ""} `}>
      <div className="h-full w-full rounded-full" style={{backgroundColor:item.swatchColor }}></div>
    </div>
  )
}

export default SingleSwatchCirlce