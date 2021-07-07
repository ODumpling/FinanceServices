import Slider from "../../components/Slider";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {isCreateFundSliderOpen} from "./fundsSlice";

export function CreateFundSlider() {
      const slider = useAppSelector(state => state.funds.createFundSlider);
      const dispatch = useAppDispatch();
      
    
        return(
            <Slider title="Create Fund" formName="CreateFund" handleClose={() => dispatch(isCreateFundSliderOpen(false))} isOpen={slider.isOpen}>
                 <h1>Test</h1>
            </Slider>
        )
}