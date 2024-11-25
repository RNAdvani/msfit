import SingleSwatchCirlce from "../components/sing-swatch-circle"
import { BagData } from "../types"

const SwatchWrapper = ({activeData,handleSwatchClick,swatchData}:{activeData:BagData,handleSwatchClick:(item: BagData) => void,swatchData: BagData[]}) => {

  const handleSwatchClicked = (item:BagData) =>{
    handleSwatchClick(item)
  }

  return (
    <div className="h-fit absolute z-20 w-full bottom-0 flex justify-center gap-8 mb-2 lg:w-fit lg:inset-y-[40%] lg:right-20 lg:flex-col">
        {
          swatchData.map((item:BagData) => (
            <SingleSwatchCirlce key={item.id} item={item} handleClick={handleSwatchClicked} activeId={activeData.id} />
          ))
        }
    </div>
  )
}

export default SwatchWrapper