import React, { Suspense, useEffect } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props<T> {
  results?: T[];
  renderItem(item: T): JSX.Element;
  onChange?: React.ChangeEventHandler;
  onSelect?: (item: T) => void;
  onSubmit?: () => void;
  value?: string;
  placeholder?: string;
}
const LiveSearch = <T extends object>({
  results = [],
  renderItem,
  onChange,
  onSelect,
  onSubmit,
  value,
  placeholder,
}: Props<T>): JSX.Element => {
  const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);
  const [showResults, setShowResults] = React.useState<boolean>(false);
  const [defaultValue, setDefaultValue] = React.useState<string>("");

  const handleSelection = (selectedIndex: number) => {
    const selectedItem = results[selectedIndex];
    if (!selectedItem) return resetSearchComplete();
    onSelect && onSelect(selectedItem);
    resetSearchComplete();
  };

  const resetSearchComplete = React.useCallback(() => {
    setFocusedIndex(-1);
    setShowResults(false);
  }, []);
  const resultContainer = React.useRef<HTMLDivElement>(null);
  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const { key } = e;
    let nextIndexCount = 0;

    //move down
    if (key === "ArrowDown")
      nextIndexCount = (focusedIndex + 1) % results.length;

    //move up
    if (key === "ArrowUp")
      nextIndexCount = (focusedIndex + results.length - 1) % results.length;

    //hide results
    if (key === "Escape") {
      resetSearchComplete();
    }

    //select current item
    if (key === "Enter") {
      e.preventDefault();
      handleSelection(focusedIndex);
    }
    setFocusedIndex(nextIndexCount);
  };

  type changehandler = React.ChangeEventHandler<HTMLInputElement>;
  const handleChange: changehandler = (e) => {
    setDefaultValue(e.target.value);
    onChange && onChange(e);
  };

  useEffect(() => {
    if (!resultContainer.current) return;
    resultContainer.current.scrollIntoView({ block: "center" });
  }, [focusedIndex]);

  useEffect(() => {
    if (results.length > 0 && !showResults) setShowResults(true);
    if (results.length <= 0) setShowResults(false);
  }, [results]);

  useEffect(() => {
    if (value) {
      setDefaultValue(value);
    }
  }, [value]);

  return (
    <Suspense>
      <div className=" flex items-center justify-center    w-[70%] lg:w-auto">
        <div
          tabIndex={1}
          onBlur={resetSearchComplete}
          onKeyDown={handleKeyDown}
          className="relative  w-full lg:w-auto"
        >
          <div className=" flex items-center justify-between w-full bg-background lg:w-[300px] px-5 py-3 text-xs lg:text-sm rounded-[10px] text-black placeholder:text-[#D1D1D1] shadow-[0px 4px 4px rgba(0, 0, 0, 0.1)] focus:border-[#D1D1D1] transition">
            <button onClick={onSubmit} className="text-[#667085]">
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <input
              type="text"
              value={defaultValue}
              onChange={handleChange}
              className=" p-0 outline-none transition w-[90%]  focus:border-none focus:outline-none bg-background focus:border-background  border-background border-transparent focus:border-transparent focus:ring-0 "
              placeholder={placeholder}
            />
          </div>

          {/* search results container */}
          {showResults && (
            <div className="absolute mt-1 w-full p-2 z-[5] bg-white text-black shadow-lg rounded-bl rounded-br max-h-56 overflow-y-auto">
              {results.map((item, i: number) => (
                <div
                  className="cursor-pointer hover:bg-black hover:bg-opacity-10 p-2"
                  onMouseDown={() => handleSelection(focusedIndex)}
                  key={i}
                  ref={i === focusedIndex ? resultContainer : null}
                  style={{
                    background: i === focusedIndex ? "rgba(0,0,0,0.1)" : "",
                  }}
                >
                  {renderItem(item)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default LiveSearch;
