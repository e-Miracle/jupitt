import { BounceLoader, PacmanLoader } from "react-spinners";
import { useMediaQuery } from "react-responsive";
type Props = {
  toggle?: boolean;
};

const Index: React.FC<Props> = ({ toggle }) => {
  const isMobile: boolean = useMediaQuery({ query: `(max-width: 768px)` });
  return (
    <div
      className={
        toggle
          ? "flex justify-center items-center w-screen h-screen"
          : "flex justify-center items-center my-[.5rem]"
      }
    >
      {toggle ? (
        <PacmanLoader
          data-testid="full-loader"
          color="#716767"
          loading={true}
          size={isMobile ? 15 : 30}
        />
      ) : (
        <BounceLoader
          data-testid="free-loader"
          color="#716767"
          loading={true}
          size={isMobile ? 15 : 30}
        />
      )}
    </div>
  );
};

Index.defaultProps = {
  toggle: true,
};

export default Index;
