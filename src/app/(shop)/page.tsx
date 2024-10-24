import { titleFont } from "@/config/fonts";

export default function Home() {
  return (
    <div>
      <h1>hello</h1>
      <h1 className={`${titleFont.className} font-bold`}>hello</h1>
    </div>
  );
}
