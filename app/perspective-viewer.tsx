import { ClientOnly } from "remix-utils";
import { PerspectiveViewer as Viewer } from "./perspective.client";
import { type TableData } from "@finos/perspective";

export function PerspectiveViewer(props: { data: TableData | string }) {
  return <ClientOnly>{() => <Viewer {...props} />}</ClientOnly>;
}
