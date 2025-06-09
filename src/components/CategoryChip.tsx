import Link from "next/link";

type CategoryChipProps = {
  name: string;
  redirect: string;
};

export default function CategoryChip({ name, redirect }: CategoryChipProps) {
  return (
    <Link href={redirect} className="px-2 py-1 bg-transparent hover:bg-accent1 border-1 border-accent2 rounded-md cursor-pointer">
      <p className="text-accent2 text-sm whitespace-nowrap">{name}</p>
    </Link>
  );
}
