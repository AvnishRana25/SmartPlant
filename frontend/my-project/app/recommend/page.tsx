'use client';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useState } from 'react';

interface FormData {
  N: string;
  P: string;
  K: string;
  temperature: string;
  humidity: string;
  ph: string;
  rainfall: string;
}

export default function Recommend() {
  const [formData, setFormData] = useState<FormData>({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: '',
  });
  const [prediction, setPrediction] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prediction');
      }

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error making prediction:', error);
      setError('Error making prediction. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg w-full max-w-4xl p-8">
        <div className="flex flex-col lg:flex-row items-center mb-8">
          <div className="lg:w-1/3 mb-8 lg:mb-0 lg:mr-8">
            <Image
              src="/images/image.png"
              alt="Recommendation Image"
              width={500}
              height={500}
              className="object-cover rounded-full"
            />
          </div>
          <div className="lg:w-2/3">
            <h2 className="text-2xl font-bold mb-4">Crop Recommendation</h2>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(formData).map(key => (
                  <div key={key}>
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor={key}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <input
                      type="number"
                      id={key}
                      name={key}
                      value={formData[key as keyof FormData]}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder={`Enter ${key} value`}
                      required
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-end mt-6">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Display the prediction or error */}
        {prediction && (
          <div className="mt-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            <p className="font-bold">Predicted Crop: {prediction}</p>
          </div>
        )}
        {error && (
          <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
