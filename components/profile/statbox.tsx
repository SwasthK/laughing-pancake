export const StatBox = ({
    value,
    label,
  }: {
    value: number | string;
    label: string;
  }) => {
    return (
      <>
        <div className="bg-[#F5F5F5] flex items-center justify-center flex-col w-24 p-4 rounded-xl cursor-pointer hover:bg-[#54ea54] transition-colors duration-200 ease-in">
          <p className="font-bold">{value.toString()}</p>
          <p className="font-mono text-sm">{label}</p>
        </div>
      </>
    );
  };