import React, { useState } from 'react';
import { Sparkles, Calendar, MapPin, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { api } from '../../services/mockApi';
import { motion } from 'framer-motion';

export const AIPlannerWidget = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({
    destination: '',
    days: 3,
    interests: [] as string[]
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const itinerary = await api.ai.generatePlan({
        destination: formData.destination,
        dates: { from: '2024-01-01', to: '2024-01-03' },
        budget: 'moderate',
        interests: formData.interests,
        travelers: 1
      });
      setResult(itinerary.itinerary);
      setStep(3);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-900/5">
      <div className="mb-6 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">AI Trip Planner</h3>
          <p className="text-xs text-gray-500">Personalized itineraries in seconds</p>
        </div>
      </div>

      {step === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Where to?</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="e.g., Tokyo, Paris"
                className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-4 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Duration (Days)</label>
            <input
              type="number"
              min="1"
              max="7"
              className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              value={formData.days}
              onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) })}
            />
          </div>
          <Button className="w-full" onClick={() => setStep(2)} disabled={!formData.destination}>
            Next: Select Interests
          </Button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">What do you like?</label>
          <div className="flex flex-wrap gap-2">
            {['Food', 'History', 'Art', 'Nature', 'Nightlife', 'Shopping'].map(interest => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  formData.interests.includes(interest)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
            <Button className="flex-1" onClick={handleGenerate} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Generate Plan'}
            </Button>
          </div>
        </motion.div>
      )}

      {step === 3 && result && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="max-h-[300px] overflow-y-auto pr-2 space-y-6">
            {result.map((day: any) => (
              <div key={day.day} className="relative border-l-2 border-indigo-100 pl-4">
                <h4 className="mb-2 text-sm font-bold text-indigo-600">Day {day.day}</h4>
                <div className="space-y-3">
                  {day.activities.map((activity: any, idx: number) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[21px] mt-1.5 h-2.5 w-2.5 rounded-full bg-indigo-400" />
                      <p className="text-xs font-semibold text-gray-900">{activity.time}</p>
                      <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full" variant="outline" onClick={() => setStep(1)}>Start Over</Button>
        </motion.div>
      )}
    </div>
  );
};
