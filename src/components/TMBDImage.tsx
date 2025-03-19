import Image from "next/image";

interface TMBDImageProps {
  src: string | null | undefined;
  alt: string;
}

export default function TMBDImage({ src, alt = "" }: TMBDImageProps) {
  if (src) {
    return (
      <>
        <Image
          src={`https://image.tmdb.org/t/p/original/${src}`}
          alt={alt}
          height={160}
          width={90}
          layout="responsive"
          className="rounded-xl"
        />
      </>
    );
  }
  return <p className="font-semibold text-center h-full flex items-center">{alt}</p>;
}
