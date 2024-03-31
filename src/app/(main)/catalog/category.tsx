"use client";
import { categories } from "@/utils/instrumentCategories";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, ChangeEventHandler, useCallback } from "react";

interface IProps {
  gender?: "men" | "women";
}

export default function Category({ gender }: IProps) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(pathName + "?" + createQueryString("category", e.target.value));
  };

  const newCategories =
    gender === "women" ? categories.slice(0, 14) : categories.slice(14);

  return (
    <div className="flex flex-col gap-2">
      {newCategories.map((category, index) => (
        <div key={index} className="flex gap-2 truncate">
          <input
            defaultChecked={searchParams.get("category") === category.value}
            onChange={handleChange}
            id={category.value}
            value={category.value}
            type="radio"
            name="category"
          />
          <label htmlFor={category.value}>{category.label}</label>
        </div>
      ))}
    </div>
  );
}
