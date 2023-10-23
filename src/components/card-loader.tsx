
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const CardLoader = () => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>
            <Skeleton width={"100%"} height={20} />
          </h2>
        </div>
        <div className="modal-body">
          <Skeleton height={200} />
        </div>
        <div className="modal-footer">
          <button>
            <Skeleton width={"100%"} height={30} />
          </button>
          <button>
            <Skeleton width={"100%"} height={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardLoader;
