import Image from 'next/legacy/image';

interface Props {
  name: string;
  destinationImg: string;
  onClick: () => void;
}

export const Station = ({ name, destinationImg, onClick }: Props) => {
  return (
    <div
      className="flex flex-col shrink-0 center gap-1 border-2 border-black rounded-lg bg-white cursor-pointer"
      onClick={onClick}
    >
      <div className="p-2 w-300">
        <div className="flex w-full h-52 max-h-52">
          <Image
            src={destinationImg}
            alt={name}
            width={300}
            height={200}
            objectFit="cover"
            objectPosition="center"
            priority
            className="rounded-lg"
          />
        </div>
        <span className="text-lg">destination: {name}</span>
      </div>
    </div>
  );
};
