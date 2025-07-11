import { Dispatch, SetStateAction } from "react";
import { FaFilter } from "react-icons/fa";
import Select from "react-select";
import { reactSelectCustomStyles } from "@/shared";
import { Tag } from "@/features/taskBoard";

export function TagsFilter({
  tags,
  selectedFiltersTags,
  setSelectedFiltersTags,
}: {
  tags: Tag[];
  selectedFiltersTags: string[];
  setSelectedFiltersTags: Dispatch<SetStateAction<string[]>>;
}) {
  return (
    <div className="flex flex-wrap gap-2 mr-4">
      <Select
        placeholder={
          <span className="flex items-center gap-2">
            <FaFilter />
            Filtrer
          </span>
        }
        options={tags.map((tag) => ({
          value: tag.id,
          label: tag.name,
          color: tag.color,
        }))}
        styles={{
          ...reactSelectCustomStyles,
          control: (baseStyles) => ({
            ...baseStyles,
            borderColor: "#787486",
            borderRadius: "0.5rem",
          }),
        }}
        value={tags
          .filter((tag) => selectedFiltersTags.includes(tag.id))
          .map((tag) => ({
            value: tag.id,
            label: tag.name,
            color: tag.color,
          }))}
        onChange={(selectedOptions) => {
          if (selectedOptions) {
            setSelectedFiltersTags(
              selectedOptions.map((option) => option.value)
            );
          } else {
            setSelectedFiltersTags([]);
          }
        }}
        isClearable
        isMulti
      />
    </div>
  );
}
