import React, { useState } from "react";
import { ImageMetadata } from "@/app/types/imageTypes";
import { TrashIcon } from "@heroicons/react/24/outline";
import styles from "./CapturedImagesList.module.css";

interface CapturedImagesListProps {
  images: ImageMetadata[];
  onDelete: (filename: string) => void; // Callback for deleting an image
  onImageSelect: (image: ImageMetadata) => void; // Callback for selecting an image
  selectedImage: ImageMetadata | null; // Currently selected image
}

export default function CapturedImagesList({
  images,
  onDelete,
  onImageSelect,
  selectedImage,
}: CapturedImagesListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(images.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedImages = images
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .toReversed()
    .slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Captured Images</h2>

      {/* Captured Images Grid */}
      <div className={styles["captured-images-grid"]}>
        {paginatedImages.map((image) => (
          <div key={image.filename} className={styles["captured-image-card"]}>
            {/* Image Thumbnail */}
            <img
              src={`/surgical-session/${image.sessionId}/images/${image.filename}`}
              alt={image.description}
              onClick={() => onImageSelect(image)}
            />

            {/* Delete Icon */}
            <button
              className={styles["delete-icon"]}
              onClick={() => onDelete(image.filename)}
            >
              <TrashIcon className="w-4 h-4" />
            </button>

            {/* Image Information */}
            <div className={styles["captured-image-info"]}>
              <p>{image.capturedBy}</p>
              <p>
                {new Date(
                  Date.UTC(
                    parseInt(image.timestamp.slice(0, 4)), // year
                    parseInt(image.timestamp.slice(4, 6)) - 1, // month (0-based)
                    parseInt(image.timestamp.slice(6, 8)), // day
                    parseInt(image.timestamp.slice(9, 11)), // hour
                    parseInt(image.timestamp.slice(11, 13)), // minute
                    parseInt(image.timestamp.slice(13, 15)), // second
                    parseInt(image.timestamp.slice(15, 18)) // millisecond
                  )
                ).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className={styles["pagination-controls"]}>
        <button
          className={styles["pagination-button"]}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`${styles["pagination-button"]} ${
              currentPage === index + 1 ? "bg-blue-500" : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={styles["pagination-button"]}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
