import CustomBarChart from "@/components/ui/barChart";

const Leaderboard = () => {
  return (
    <div>
      <div className="flex gap-4 items-baseline">
        <p className="text-2xl font-bold">Leaderboard</p>
        <div>
          <div className="flex gap-2 items-baseline">
            <p className="rounded-full bg-[#e76e50] w-4 h-4 flex"></p>{" "}
            <p>All Time Edits</p>
          </div>
        </div>
      </div>
      <div className="flex w-full gap-2 my-4">
        <CustomBarChart />
        <CustomBarChart />
      </div>
    </div>
  );
};

export default Leaderboard;
