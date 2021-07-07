import { useAppDispatch, useAppSelector } from "../../hooks";
import { createFund, getFunds, isCreateFundSliderOpen } from "./fundsSlice";
import { useForm } from "react-hook-form";
import { ICreateFundCommand } from "../../api/web-api-client";
import Slider from "../../components/Slider";

export function CreateFundSlider() {
  const { createFundSlider: slider, page } = useAppSelector(
    (state) => state.funds
  );
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateFundCommand>();

  function onSubmit(data: ICreateFundCommand) {
    dispatch(isCreateFundSliderOpen(false));
    dispatch(createFund(data)).then((onfulfilled) => {
      dispatch(getFunds(page, 10));
    });
  }

  return (
    <Slider
      title="Create Fund"
      formName="createFund"
      handleClose={() => dispatch(isCreateFundSliderOpen(false))}
      isOpen={slider.isOpen}
    >
      <form id="createFund" className="p-3" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <div className="mt-1">
            <input
              id="name"
              type="text"
              {...register("name", { required: true })}
              className="shadow-sm focus:ring-cyan-500 focus:border-cyan-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
            {errors.name && <span>This field is required</span>}
          </div>
        </div>
      </form>
    </Slider>
  );
}
