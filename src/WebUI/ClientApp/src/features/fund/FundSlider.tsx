import {useAppDispatch, useAppSelector} from "../../hooks";
import {createFund, getFunds, isFundSliderOpen, setEditForm} from "./fundsSlice";
import {useForm} from "react-hook-form";
import {ICreateFundCommand} from "../../api/web-api-client";
import Slider from "../../components/Slider";

interface IProps {
    type: "Create" | "Edit";
}

export function FundSlider() {
    const {fundSlider: slider, page} = useAppSelector(
        (state) => state.funds
    );
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<ICreateFundCommand>();

    function onSubmit(data: ICreateFundCommand) {
        dispatch(isFundSliderOpen({isOpen: false}));
        if (slider.type === "Create") {
            dispatch(createFund(data)).then((onfulfilled) => {
                dispatch(getFunds(page, 10));
            });
        } else if (slider.type === "Edit")
        {
            dispatch(setEditForm(data))
            dispatch(getFunds(page, 10));
        }

    }

    return (
        <Slider
            title={slider.type + " Fund"}
            formName={slider.type + "Fund"}
            handleClose={() => dispatch(isFundSliderOpen({isOpen: false}))}
            isOpen={slider.isOpen}
        >
            <form id={slider.type + "Fund"} className="p-3" onSubmit={handleSubmit(onSubmit)}>
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
                            {...register("name", {required: true})}
                            defaultValue={slider.form.name}
                            className="shadow-sm focus:ring-cyan-500 focus:border-cyan-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors.name && <span>This field is required</span>}
                    </div>
                </div>
            </form>
        </Slider>
    );
}
