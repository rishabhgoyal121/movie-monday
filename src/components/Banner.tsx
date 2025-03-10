import React from "react";
import { Input } from "./ui/Input";

interface BannerProps {
  bannerImageUrl?: string;
  title: string;
  subtitle: string;
}

const Banner: React.FC<BannerProps> = ({ bannerImageUrl, title, subtitle }) => {
  return (
    <div
      className="w-full bg-cover bg-center h-64 md:h-96"
      style={{
        backgroundImage: bannerImageUrl ? `url(${bannerImageUrl})` : "none",
      }}
    >
      <div className="flex items-center justify-center h-full w-full bg-opacity-50">
        <div className="text-center">
          <h1 className="text-white text-2xl md:text-4xl font-bold">{title}</h1>
          <p className="text-white text-sm md:text-lg mt-2">{subtitle}</p>
          <div className="mt-12">
            <Input />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
