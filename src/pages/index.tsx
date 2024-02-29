import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const initalValue = { name: "", gender: "" };
  const [data, setData] = useState(initalValue);
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    await axios.post("/api/example", formObject);
  };

  const fetchData = async () => {
    const res = await axios.get("/api/example");
    console.log("GET data: ", res.data);
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => fetchData(), 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <form onSubmit={onSubmit}>
        <div>
          <input type="text" placeholder="Your name...." name="name" />
        </div>
        <div>
          <input type="radio" name="gender" value="male" />
          Male
          <input type="radio" name="gender" value="female" />
          Female
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
        <div className="flex gap-2">
          {data.name}
          <span>{data.gender}</span>
        </div>
      </form>
    </main>
  );
}
