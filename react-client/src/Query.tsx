import { useQuery } from "@tanstack/react-query";

const Query = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryFn: () =>
      fetch("http://localhost:3000/database/users").then((res) => res.json()),
    queryKey: ["users"],
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.log(error)
    return <div>Error: error fetching</div>;
  }
  console.log(users)
  
  return (
    <div>
    </div>
  );
};

export default Query;
