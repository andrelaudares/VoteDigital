
import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon
}) => {
  return (
    <div className="p-6 border rounded-lg hover:shadow-md transition-all">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-vote-primary/10 text-vote-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
