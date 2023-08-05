import perspective, { type Table, type TableData } from "@finos/perspective";
import "@finos/perspective-viewer";
import { type HTMLPerspectiveViewerElement } from "@finos/perspective-viewer";
import { useEffect, useId, useRef } from "react";

export function PerspectiveViewer({ data }: { data: TableData }) {
  const id = useId();
  const ref = useRef<null | Table>(null);

  useEffect(() => {
    if (ref.current === null) {
      init();
    } else {
      ref.current.update(data);
    }

    async function init() {
      const el = document.querySelector(
        "perspective-viewer",
      ) as HTMLPerspectiveViewerElement;

      const worker = perspective.worker();

      // Create a table in this worker
      const table = await worker.table(data);

      el.load(table);
      ref.current = table;
    }
  }, [data]);

  // return <perspective-viewer id={id} suppressHydrationWarning />;
  return (
    <perspective-viewer
      id={id}
      style={{ width: 500, height: 500 }}
      theme="Pro"
    />
  );
}
