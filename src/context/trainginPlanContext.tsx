import { createContext, useState, ReactNode, useContext } from 'react';
import { TrainingPlan } from '../interfaces/trainginPlan';
import { updateTrainingPlan } from '../services/firebaseTrainingPlan';

type TrainingPlanContextType = {
    trainingPlan: TrainingPlan | null;
    setTrainingPlanContext: (plan: TrainingPlan) => void;
    clearTrainingPlanContext: () => void;
    updateTrainingPlanContext: (plan: TrainingPlan) => Promise<void>;
};

const TrainingPlanContext = createContext<TrainingPlanContextType | null>(null);

export const TrainingPlanProvider = ({ children }: { children: ReactNode }) => {
    const [trainingPlan, setTrainingPlan] = useState<TrainingPlan | null>(null);

    const setTrainingPlanContext = (plan: TrainingPlan) => {
        setTrainingPlan(plan);
    };

    const clearTrainingPlanContext = () => {
        setTrainingPlan(null);
    };

    const updateTrainingPlanContext = async (plan: TrainingPlan) => {
        await updateTrainingPlan(plan);
        setTrainingPlan((prev) => (prev ? { ...prev, ...plan } : plan));
    };

    return (
        <TrainingPlanContext.Provider value={{ 
            trainingPlan, 
            setTrainingPlanContext, 
            clearTrainingPlanContext,
            updateTrainingPlanContext
        }}>
            {children}
        </TrainingPlanContext.Provider>
    );
};

export const useTrainingPlan = () => {
    const context = useContext(TrainingPlanContext);
    if (!context) {
        throw new Error('useTrainingPlan must be used within a TrainingPlanProvider');
    }
    return context;
};
