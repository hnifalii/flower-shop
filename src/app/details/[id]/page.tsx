"use client";

import { products } from "@/lib/Products";
import { categories } from "@/lib/Categories";
import { use } from "react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  RiExpandDiagonalLine,
  RiCollapseDiagonalLine,
  RiShareForwardLine,
} from "react-icons/ri";
import { MdOutlineFileDownload } from "react-icons/md";
import CategoryChip from "@/components/CategoryChip";
import {
  getFileExtension,
  getFileName,
  handleDownload,
  useShare,
} from "@/utils/helpers";

export default function DetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const product = products.find((product) => product.id === Number(id));

  const tags = categories
    .filter((tag) => product?.categoryId.includes(tag.id))
    .map((tag) => tag);

  const [imgExpanded, setImgExpanded] = useState(false);

  function toggleImg() {
    setImgExpanded(!imgExpanded);
  }

  // const [sendModal, setSendModal] = useState(false);

  // function toggleSendModal() {
  //   setSendModal(!sendModal);
  // }

  const { shareProduct, isSharing } = useShare();

  const [confirmDownload, setConfirmDownload] = useState(false);

  function toggleConfirmDownload() {
    setConfirmDownload(!confirmDownload);
  }

  const [tagsExpanded, setTagsExpanded] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const tagsContainerRef = useRef<HTMLDivElement>(null);

  function toggleTags() {
    setTagsExpanded(!tagsExpanded);
  }

  useEffect(() => {
    // element
    const el = tagsContainerRef.current;
    if (el) {
      setIsOverflow(el.scrollHeight > el.clientHeight);
    }
  }, [tags]);

  return (
    <div className="flex w-full select-text px-8 md:px-14 py-10 bg-gradient-to-b from-violet-100 via-indigo-100 to-transparent from-0% via-30% to-100%">
      {product ? (
        <>
          {/* Expand image */}
          {imgExpanded && (
            <div
              className="fixed inset-0 bg-[#000000d7] flex justify-center items-center z-50 cursor-zoom-out"
              onClick={toggleImg}
            >
              <button
                onClick={toggleImg}
                className="absolute z-50 top-5 right-5 p-2 bg-white hover:bg-accent1 rounded-full"
              >
                <RiCollapseDiagonalLine size={24} />
              </button>
              <div className="relative w-2/3 h-2/3">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </div>
          )}

          {confirmDownload && (
            <div className="fixed inset-0 bg-[#000000d7] flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-2">
                <h2 className="text-lg font-semibold">Download Confirmation</h2>
                <p>Do you want to download this image?</p>
                <p>{product.name}</p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={toggleConfirmDownload}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDownload(product)}
                    className="px-4 py-2 bg-gradient-to-l from-violet-100 hover:from-sky-50 via-indigo-100 to-sky-50 hover:to-violet-100 border border-accent rounded-lg transition duration-200"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* {sendModal && (
            <div className={`${sendModal ? "opacity-100" : "opacity-0"} fixed inset-0 bg-[#000000cc] flex justify-center items-center z-50 transition duration-300`}>
              <div className="bg-white p-8 rounded-lg flex flex-col gap-4 w-72">
                <h2 className="text-lg font-semibold text-center">Send As</h2>
                <button
                  onClick={() => {
                    // send as sticker function
                    toggleSendModal();
                  }}
                  className="flex justify-center items-center gap-2 p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                >
                  <span>WhatsApp Sticker</span>
                  <RiWhatsappFill size={18} />
                </button>
                <button
                  onClick={() => {
                    // Implementasi kirim ke Telegram di sini
                    toggleSendModal();
                  }}
                  className="flex justify-center items-center gap-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                >
                  <span>Telegram Sticker</span>
                  <RiTelegramFill size={18} />
                </button>
                <button
                  onClick={toggleSendModal}
                  className="flex justify-center items-center gap-2 p-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          )} */}

          <div className="flex flex-col md:flex-row w-full justify-between px-4 md:px-6 py-4 gap-4 border-1 border-accent2 rounded-lg">
            {/* Image */}
            <div className="relative w-full md:max-w-1/3 aspect-square rounded-lg shadow-sm overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
              />
              <button
                onClick={toggleImg}
                className="absolute bottom-2 right-2 z-10 p-2 md:p-3 bg-accent1 rounded-full opacity-50 hover:opacity-100 transition duration-200"
              >
                <RiExpandDiagonalLine />
              </button>
            </div>

            {/* Details */}
            <div className="flex flex-col w-full md:h-full justify-between md:px-6 md:py-4 gap-4">
              <div className="flex flex-col w-full gap-2 md:gap-3">
                <h1 className="text-xl md:text-2xl">{product.name}</h1>
                {/* Tags */}
                <div
                  className={`flex flex-wrap w-full gap-2 transition-all duration-500 ease-in-out ${
                    tagsExpanded
                      ? "max-h-[1000px]"
                      : "max-h-[30px] overflow-hidden"
                  }`}
                >
                  {tags.map((tag) => (
                    <CategoryChip
                      key={tag.id}
                      name={tag.name}
                      redirect={`/tags/${
                        tag?.name?.toLowerCase()?.replace(/\s+/g, "-") || ""
                      }`}
                    />
                  ))}
                </div>

                <div className="flex flex-col gap-1">
                  <h6 className="text-accent2 text-sm">
                    File name: {getFileName(product.imageUrl)}
                  </h6>
                  <h6 className="text-accent2 text-sm">
                    File extension: {getFileExtension(product.imageUrl)}
                  </h6>
                </div>

                {/* Show More Button */}
                {isOverflow && (
                  <button
                    onClick={toggleTags}
                    className="text-blue-500 underline mt-2 w-fit"
                  >
                    {tagsExpanded ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>

              {/* Action button groups */}
              <div className="flex flex-col w-full gap-2">
                {/* Share */}
                <div className="flex w-full justify-between gap-2">
                  <button
                    onClick={() => shareProduct(product)}
                    disabled={isSharing}
                    className=" flex w-full justify-center items-center p-2 gap-1 active:scale-[0.98] bg-gradient-to-l from-violet-100 hover:from-sky-50 via-indigo-100 to-sky-50 hover:to-violet-100 border border-accent2 rounded-lg transition duration-200"
                  >
                    <span>{isSharing ? "Sharing..." : "Share"}</span>
                    <RiShareForwardLine size={18} />
                  </button>
                  {/* <button
                    onClick={toggleSendModal}
                    className=" flex w-full justify-center items-center p-2 gap-1 active:scale-[0.98] bg-gradient-to-l from-violet-100 hover:from-sky-50 via-indigo-100 to-sky-50 hover:to-violet-100 border border-accent2 rounded-lg transition duration-200"
                  >
                    <span>Send As</span>
                    <RiEmojiStickerLine size={18} />
                  </button> */}
                </div>

                {/* Download */}
                <button
                  onClick={toggleConfirmDownload}
                  className=" flex justify-center items-center p-2 gap-1 active:scale-[0.98] bg-gradient-to-l from-violet-100 hover:from-sky-50 via-indigo-100 to-sky-50 hover:to-violet-100 border border-accent2 rounded-lg transition duration-200"
                >
                  <span>Download</span>
                  <MdOutlineFileDownload size={18} />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1 className="text-2xl mb-4 text-red-500">Product not found</h1>
      )}
    </div>
  );
}
