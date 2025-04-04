import { ProfileProgramCardProps } from "@/types";
import { Calendar, FileText, Link2 } from "lucide-react";

export const ProfileProgramCard = ({
    image,
    title,
    eventType,
    brochure,
    link,
    date,
  }: ProfileProgramCardProps) => {
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };
  
    return (
      <div className="w-full max-w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <img src={image} alt={title} className="w-full h-56 object-cover" />
          <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 rounded-bl-lg">
            {eventType}
          </div>
        </div>
  
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold mb-3 text-gray-800">{title}</h2>
  
          <div className="space-y-3 mb-3">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{formatDate(date)}</span>
            </div>
  
            {brochure && (
              <div className="flex items-center text-blue-600 hover:text-blue-800">
                <FileText className="w-5 h-5 mr-2" />
                <a href={brochure} target="_blank" rel="noopener noreferrer">
                  Download Brochure
                </a>
              </div>
            )}
  
            {link && (
              <div className="flex items-center text-blue-600 hover:text-blue-800">
                <Link2 className="w-5 h-5 mr-2" />
                <a href={link} target="_blank" rel="noopener noreferrer">
                  Event Website
                </a>
              </div>
            )}
          </div>
  
          {new Date(date) < new Date() ? (
            <>
              <button className="w-full bg-black hover:bg-black/90 text-white font-bold py-3 px-4 rounded-lg transition duration-200">
                Closed
              </button>
            </>
          ) : (
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200">
              Register Now
            </button>
          )}
        </div>
      </div>
    );
  };