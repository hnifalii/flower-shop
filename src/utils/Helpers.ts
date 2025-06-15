import { useEffect, useState } from "react";
import { Product } from "./Types";

export function handleDownload(product: Product) {
  const link = document.createElement("a");
  link.href = product.imageUrl;
  link.download = product.name.toLowerCase()?.replace(/\s+/g, "-");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function getFileExtension(url: string) {
  return url.split(".").pop()?.split(/\#|\?/)[0];
}

export function getFileName(url: string) {
  return url.split("/").pop()?.split("?")[0];
}

export function useFileSize(url: string) {
  const [size, setSize] = useState<number | null>(null);

  useEffect(() => {
    fetch(url, { method: "HEAD" }).then((res) => {
      const size = res.headers.get("Content-Length");
      if (size) {
        setSize(Number(size));
      }
    });
  }, [url]);

  return size;
}

export function useImageDimensions(url: string) {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height });
    };
  }, [url]);

  return dimensions;
}

export function handleWebShare(product: Product) {
  if (navigator.share) {
    navigator.share({
      title: product.name,
      text: "Check this out!",
      url: product.imageUrl,
    })
      .then(() => console.log("Shared successfully"))
      .catch((error) => console.error("Error sharing:", error));
  } else {
    alert("Sharing is not supported on this device.");
  }
}
