
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface SolutionCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  link?: string;
  imageUrl?: string;
}

const SolutionCard: React.FC<SolutionCardProps> = ({
  title,
  description,
  icon,
  link = "/planos",
  imageUrl
}) => {
  return (
    <div className="vote-card group border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all hover:border-vote-primary/50">
      {icon && (
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-vote-primary/10 text-vote-primary mb-4 group-hover:bg-vote-primary/20 transition-colors">
          {icon}
        </div>
      )}
      {imageUrl && (
        <div className="mb-4 overflow-hidden rounded-md">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-40 object-cover transition-transform group-hover:scale-105" 
          />
        </div>
      )}
      <h3 className="text-xl font-semibold mb-3 group-hover:text-vote-primary transition-colors">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="mt-auto">
        <Link to={link}>
          <Button variant="outline" className="border-vote-primary text-vote-primary hover:bg-vote-primary hover:text-white group-hover:border-vote-primary/80">
            Saiba mais
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SolutionCard;
