
import React from 'react';
import { Card, CardContent } from './ui/Card';

const FeatureCard = ({ icon, title, text }) => {
  return (
    <Card className="text-center">
      <CardContent>
        {icon}
        <h3 className="text-xl font-semibold mt-4">{title}</h3>
        <p className="text-gray-600 mt-2">{text}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
