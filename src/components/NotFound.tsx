import { Link } from "./Router";
import Icon from "./Icon";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-background-50 px-4 py-16 text-center font-sans">
      <div className="max-w-md space-y-6">
        
        {/* Visual Badge */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-50 text-red-500 mb-4 animate-bounce">
          <Icon name="ri-error-warning-line" className="w-12 h-12" />
        </div>

        {/* Big Code */}
        <h1 className="text-8xl font-black font-heading text-foreground-950 tracking-tighter">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground-900 tracking-tight">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-foreground-500 font-body leading-relaxed max-w-sm mx-auto text-sm sm:text-base">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Button */}
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300 hover:scale-[1.03]"
          >
            <Icon name="ri-home-5-line" className="w-5 h-5" />
            Go Back Home
          </Link>
        </div>

      </div>
    </div>
  );
}
