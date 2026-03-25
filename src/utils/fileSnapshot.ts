export type StoredFileSnapshot = {
  name: string;
  type: string;
  size: number;
  lastModified: number;
  /** Base64 payload without data-url prefix */
  dataBase64: string;
};

export function isStoredFileSnapshot(value: unknown): value is StoredFileSnapshot {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.name === "string" &&
    typeof v.type === "string" &&
    typeof v.size === "number" &&
    typeof v.lastModified === "number" &&
    typeof v.dataBase64 === "string"
  );
}

export function snapshotFileName(value: unknown): string {
  return isStoredFileSnapshot(value) ? value.name : "";
}

export function snapshotToFile(snapshot: StoredFileSnapshot): File {
  const binary = atob(snapshot.dataBase64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new File([bytes], snapshot.name, {
    type: snapshot.type || "application/octet-stream",
    lastModified: snapshot.lastModified || Date.now(),
  });
}

export function fileToSnapshot(file: File): Promise<StoredFileSnapshot> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Could not read file as data URL"));
        return;
      }
      const commaIndex = result.indexOf(",");
      const dataBase64 = commaIndex >= 0 ? result.slice(commaIndex + 1) : result;
      resolve({
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
        dataBase64,
      });
    };
    reader.onerror = () => {
      reject(reader.error ?? new Error("Failed to read file"));
    };
    reader.readAsDataURL(file);
  });
}
