import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { v4 as uuidv4 } from 'uuid';

export interface Job {
  id: string;
  title: string;
  status: string;
  categories: string[];
}

interface AppContextType {
  selectedCategories?: string[];
  setSelectedCategories?: React.Dispatch<React.SetStateAction<string[]>>;
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  jobTitle?: string;
  setJobTitle?: React.Dispatch<React.SetStateAction<string>>;
  jobStatus?: string;
  setJobStatus?: React.Dispatch<React.SetStateAction<string>>;
  openCreateModal: boolean;
  setOpenCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSaveJob: (data: { jobTitle: string; jobStatus: string; selectedCategories: string[] }) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface MyContextProviderProps {
  children: ReactNode;
}

export const MyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs") ?? "[]");
    setJobs(storedJobs);
  }, []);

  const handleSaveJob = (data: { jobTitle: string; jobStatus: string; selectedCategories: string[] }) => {
    const newJob: Job = {
      id: uuidv4(),
      title: data.jobTitle,
      status: data.jobStatus,
      categories: data.selectedCategories,
    };

    setJobs([newJob, ...jobs]);
    localStorage.setItem("jobs", JSON.stringify([newJob, ...jobs]));
    setOpenCreateModal(false);
  };

  return (
    <AppContext.Provider
      value={{
        jobs,
        setJobs,
        handleSaveJob,
        openCreateModal,
        setOpenCreateModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a MyContextProvider");
  }
  return context;
};
