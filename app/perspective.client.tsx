import perspective, { type Table, type TableData } from "@finos/perspective";
import { type HTMLPerspectiveViewerElement } from "@finos/perspective-viewer";
import { useEffect, useRef } from "react";

export function PerspectiveViewer({ data }: { data: TableData }) {
  const tableRef = useRef<null | Table>(null);
  const elRef = useRef<HTMLPerspectiveViewerElement | null>(null);

  useEffect(() => {
    if (tableRef.current === null) {
      init();
    } else {
      tableRef.current.update(data);
    }

    async function init() {
      await Promise.all([
        // point to the ESM build get wasm loaded externally instead of inlined
        // so it runs on its own thread
        import("@finos/perspective-viewer/dist/esm/perspective-viewer.js"),
        import("@finos/perspective-viewer-datagrid"),
      ]);

      const el = elRef.current;
      if (!el) throw new Error("no element!");

      const worker = perspective.worker();

      // Create a table in this worker
      const table = await worker.table(data);

      el.load(table);
      tableRef.current = table;
    }
  }, [data]);

  return <perspective-viewer ref={elRef} style={{ width: 500, height: 500 }} />;
}
