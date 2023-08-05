import type { V2_MetaFunction } from "@remix-run/node";
import { PerspectiveViewer } from "~/perspective-viewer";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>Welcome to Remix with Perspective</h1>
      <PerspectiveViewer data={data} />
    </div>
  );
}

const data = `
name,age,city
John,20,Paris
Paul,30,London
Jane,40,New York
`;
