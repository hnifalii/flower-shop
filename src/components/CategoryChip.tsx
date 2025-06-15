import Link from "next/link";

type CategoryChipProps = {
  name: string;
  redirect: string;
};

export default function CategoryChip({ name, redirect }: CategoryChipProps) {
  return (
    <Link href={redirect} className="px-2 py-1 bg-gradient-to-r hover:from-violet-200 hover:via-indigo-100 hover:to-sky-100 border-1 border-accent2 rounded-md cursor-pointer transition duration-300">
      <p className="text-accent2 text-sm whitespace-nowrap">{name}</p>
    </Link>
  );
}
