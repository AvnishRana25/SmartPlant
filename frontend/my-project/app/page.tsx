import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between py-12">
        <div className="md:w-2/3 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold text-green-700 mb-4">
            Be a Smart Farmer
          </h1>
          <p className="text-xl text-gray-600">
            Use our AI-powered tools to maximize your crop yield and protect
            your farm.
          </p>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/images/hero2.png"
            alt="Smart Farming"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          <FeatureCard
            title="Crop Recommendation"
            description="Get AI-powered suggestions for the best crops to plant based on your soil and climate conditions."
            icon="🌱"
          />
          <FeatureCard
            title="Disease Recognition"
            description="Quickly identify plant diseases with our advanced image recognition technology."
            icon="🔬"
          />
          <FeatureCard
            title="Disaster Alert"
            description="Stay informed about potential natural disasters that could affect your crops."
            icon="🚨"
          />
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

function FeatureCard({
  title,
  description,
  icon,
}: FeatureCardProps): React.ReactElement {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:bg-green-200 hover:cursor-pointer  transform hover:scale-105 transition duration-300">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
