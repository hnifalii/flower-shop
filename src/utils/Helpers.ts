import { useEffect, useState } from "react";
import { Product } from "./types";

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
    navigator
      .share({
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

export async function handleShare(product: Product) {
  if (navigator.canShare && navigator.canShare({ files: [] })) {
    // Device support file sharing
    try {
      const response = await fetch(product.imageUrl);
      const blob = await response.blob();
      const file = new File([blob], `${product.name}.jpg`, { type: blob.type });

      await navigator.share({
        files: [file],
        title: product.name,
        text: "Check out this product!",
      });

      alert("Image shared successfully!");
    } catch (error) {
      console.error("Error sharing image:", error);
      alert("Failed to share image.");
    }
  } else if (navigator.share) {
    // Device only supports link/text sharing
    try {
      await navigator.share({
        title: product.name,
        text: "Check out this product!",
        url: window.location.href, // Or product image URL if you want
      });

      alert("Link shared successfully!");
    } catch (error) {
      console.error("Error sharing link:", error);
      alert("Failed to share link.");
    }
  } else {
    // Fallback for unsupported devices
    alert("Sharing is not supported on this device.");
  }
}

export function useShare() {
  const [isSharing, setIsSharing] = useState(false);

  async function shareProduct(product: Product) {
    setIsSharing(true);
    console.log("Checking share support...");

    try {
      const response = await fetch(product.imageUrl);
      const blob = await response.blob();
      const file = new File([blob], `${product.name}.jpg`, { type: blob.type });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        console.log("Sharing image...");
        await navigator.share({
          files: [file],
          title: product.name,
          text: "Check out this product!",
        });
        alert("Image shared successfully!");
      } else if (navigator.share) {
        console.log("Sharing link...");
        await navigator.share({
          title: product.name,
          text: "Check out this product!",
          url: window.location.href,
        });
        alert("Link shared successfully!");
      } else {
        console.log("Sharing not supported.");
        alert("Sharing is not supported on this device.");
      }
    } catch (error) {
      console.error("Sharing failed:", error);
      alert("Sharing failed.");
    } finally {
      setIsSharing(false);
    }
  }

  return { shareProduct, isSharing };
}
