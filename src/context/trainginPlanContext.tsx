import { createContext, useState, ReactNode, useContext } from 'react';
import { TrainingPlan } from '../interfaces/trainginPlan'; // metti il path giusto dove hai salvato l'interfaccia

type TrainingPlanContextType = {
    trainingPlan: TrainingPlan | null;
    setTrainingPlanContext: (plan: TrainingPlan) => void;
    clearTrainingPlanContext: () => void;
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

    return (
        <TrainingPlanContext.Provider value={{ trainingPlan, setTrainingPlanContext, clearTrainingPlanContext }}>
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
