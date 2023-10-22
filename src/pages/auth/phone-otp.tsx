import { Suspense, useState, useEffect, useMemo, lazy } from "react";
import toast from "react-hot-toast";
const Spinner = lazy(() => import("../../components/spinner/Spinner"));
export default function PhoneOtp() {
  const regex = new RegExp(/^\d+$/);
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const handleChange = (value: string) => setOtp(value);
  useEffect(() => {
    if (otp && otp.trim().length === 6) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [otp, disabled]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otp && otp.length === 6) {
      toast.success(`This is your Otp ${otp}`);
      setLoading(!loading);
    } 
  };

  const valueItems = useMemo(() => {
    const valueArray = otp.split("");
    const items: Array<string> = [];
    const regex = new RegExp(/^\d+$/);

    for (let i = 0; i < 6; i++) {
      const char = valueArray[i];
      if (regex.test(char)) {
        items.push(char);
      } else {
        items.push("");
      }
    }

    return items;
  }, [otp]);

  const focusToNextInput = (target: HTMLElement) => {
    const nextElementSibling =
      target.nextElementSibling as HTMLInputElement | null;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };
  const focusToPrevInput = (target: HTMLElement) => {
    const previousElementSibling =
      target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  const inputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let { value } = e.target;
    value = value.trim();
    const isTargetValueDigit = regex.test(value);

    if (!isTargetValueDigit && value !== "") return;

    value = isTargetValueDigit ? value : " ";

    const targetValueLength = value.length;
    if (targetValueLength === 1) {
      const newValue =
        otp.substring(0, index) + value + otp.substring(index + 1);
      handleChange(newValue);

      if (!isTargetValueDigit) return;

      focusToNextInput(e.target);
    } else if (targetValueLength === 6) {
      handleChange(value);
      e.target.blur();
    }
  };

  const inputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;
    const targetValue = target.value;

    if (key === "ArrowRight" || key === "ArrowDown") {
      e.preventDefault();
      return focusToNextInput(target);
    }

    if (key === "ArrowLeft" || key === "ArrowUp") {
      e.preventDefault();
      return focusToPrevInput(target);
    }

    //keep the  selction range position
    target.setSelectionRange(0, targetValue.length);

    if (e.key !== "Backspace" || target.value !== "") return;

    const previousElementSibling =
      target.previousElementSibling as HTMLInputElement | null;
    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e;
    target.setSelectionRange(0, target.value.length);
  };

  return (
    <Suspense>
      <div className="font-poppins bg-form rounded-lg my-5 lg:mt-0 p-5 lg:p-10">
        <h1 className=" font-bold  text-xl lg:text-2xl ">Confirm MFA</h1>

        <p className="text-sm  lg:text-base mt-3">
          To Login, enter the OTP generated from your MFA app
        </p>

        <form onSubmit={handleSubmit} className="mt-5">
          <label className="text-sm lg:text-base " htmlFor="code">
            MFA Code
          </label>
          <div className={"flex justify-center flex-wrap items-center mt-5 "}>
            {valueItems.map((item, index: number) => (
              <input
                id="code"
                type="text"
                key={index}
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="\d{1}"
                maxLength={6}
                className={
                  " w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] text-center outline-none text-base lg:text-xl  rounded-lg border border-otp mr-2 bg-formBg focus:border-secondary"
                }
                value={item}
                onChange={(e) => inputOnChange(e, index)}
                onKeyDown={inputKeyDown}
                onFocus={inputOnFocus}
              />
            ))}
          </div>

          <div className={""}>
            {loading ? (
              <div className="mt-4">
                <Spinner toggle={false} />
              </div>
            ) : (
              <button
                disabled={disabled}
                type="submit"
                className="w-full bg-secondary text-white text-sm lg:text-base  p-3 mt-10 rounded-lg cursor-pointer hover:bg-transparent hover:text-textForm   hover:bg-formBg"
              >
                Continue
              </button>
            )}
          </div>
        </form>
      </div>
    </Suspense>
  );
}
