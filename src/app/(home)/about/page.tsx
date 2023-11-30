import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/buttons/Button";

const page = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="dui-card lg:dui-card-side bg-neutral-700 shadow-xl">
        <figure>
          <Image
            src="/images/saeed-frontview.png"
            alt="Saeed Khosravi the author of site"
            className="p-2 blur-sm hover:blur-none hover:scale-105 transition-all"
            priority
            width={300}
            height={200}
          />
        </figure>
        <div className="dui-card-body text-neutral-content">
          <h2 className="dui-card-title">FrontEnd Web Developer</h2>
          <p>UI/UX Designer & ReactJS developer</p>
          <div className="dui-card-actions justify-end">
            <Link
              href="https://github.com/sharpWit"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="secondary" size="lg">
                Works
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
