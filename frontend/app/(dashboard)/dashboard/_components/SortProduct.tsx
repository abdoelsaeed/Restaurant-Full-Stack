import { FilterSelect } from "./FilterSelect";

export default function SortProduct() {
  return (
    <div className="flex justify-center items-center gap-2">
      <label >SortBy:</label>
      <FilterSelect />
    </div>
  );
}
