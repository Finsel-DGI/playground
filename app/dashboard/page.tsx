import { FaceIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { Montserrat_Alternates } from "next/font/google";

const montserrat = Montserrat_Alternates({
  weight: "400",
  subsets: ['latin']
});

export default function Home() {
  return (
      <div className='pt-24 px-10 flex flex-col items-center h-screen w-full'>
        <FaceIcon
          className="size-12 mb-8 text-orange-500"
        />
        <div className="rounded-lg shadow-lg h-[60%] w-[70%] bg-grey-100 p-10 flex flex-col justify-center items-center">
          <h1 className={clsx(montserrat, 'text-xl')}>Playground dashboard achieved</h1>
        </div>
      </div>
  );
}
