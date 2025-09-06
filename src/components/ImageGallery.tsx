import React, { useState } from 'react';
import { ImageViewer } from './ImageViewer';

interface ImageGalleryProps {
  images: string[];
  title: string;
  className?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title, className = "" }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showViewer, setShowViewer] = useState(false);

  if (!images || images.length === 0) return null;

  const mainImage = images[selectedImageIndex] || images[0];

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleMainImageClick = () => {
    setShowViewer(true);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Image */}
      <div className="relative rounded-2xl overflow-hidden shadow-soft group cursor-pointer">
        <img 
          src={mainImage} 
          alt={`${title} main`}
          className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
          onClick={handleMainImageClick}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${title} ${index + 1}`}
              className={`w-20 h-20 object-cover rounded-lg flex-shrink-0 cursor-pointer transition-all duration-200 ${
                index === selectedImageIndex 
                  ? 'border-2 border-accent ring-2 ring-accent/20' 
                  : 'border-2 border-transparent hover:border-accent/50'
              }`}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>
      )}

      {/* Image Viewer */}
      {showViewer && (
        <ImageViewer
          images={images}
          initialIndex={selectedImageIndex}
          title={title}
          onClose={() => setShowViewer(false)}
        />
      )}
    </div>
  );
};

export default ImageGallery;