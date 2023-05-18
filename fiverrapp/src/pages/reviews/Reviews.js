import Review from "../review/Review";
import { useQuery } from "@tanstack/react-query";
import request from "../../utils/newRequest";

function Reviews({ gigId }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => request.get(`/review/${gigId}`).then((res) => res.data),
  });

  return (
    <div>
      {isLoading
        ? "Loading reviews"
        : error
        ? "Something went wrong!"
        : data.map((review) => {
            return <Review key={review._id} review={review} />;
          })}
    </div>
  );
}

export default Reviews;
