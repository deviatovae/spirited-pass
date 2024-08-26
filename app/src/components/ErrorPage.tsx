import Image from 'next/image';

type Props = {
  error: string;
  children?: JSX.Element | JSX.Element[];
};

export default function ErrorPage({ error, children }: Props) {
  return (
    <div>
      <h2 className="text-center text-xl mb-1">{error}</h2>
      <Image src="/hamster.gif" alt="error" width={480} height={274}></Image>
      {children}
    </div>
  );
}
