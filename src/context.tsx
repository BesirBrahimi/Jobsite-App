import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { v4 as uuidv4 } from 'uuid';

export interface Job {
  id: string;
  title: string;
  status: string;
  categories: string[];
}

interface AppContextType {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  jobTitle: string;
  setJobTitle: React.Dispatch<React.SetStateAction<string>>;
  jobStatus: string;
  setJobStatus: React.Dispatch<React.SetStateAction<string>>;
  openCreateModal: boolean;
  setOpenCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSaveJob: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface MyContextProviderProps {
  children: ReactNode;
}

export const MyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobTitle, setJobTitle] = useState<string>('');
  const [jobStatus, setJobStatus] = useState<string>('');
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs") ?? "[]");
    if (storedJobs) {
        setJobs(storedJobs);
      }
  }, [setJobs]);

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories") ?? "[]");
    if (storedCategories) {
        setSelectedCategories(storedCategories);
      }
  }, [setSelectedCategories]);

  const handleSaveJob = () => {
    if (jobTitle.trim() !== "") {
      const newJob: Job = {
        id: uuidv4(),
        title: jobTitle,
        status: jobStatus,
        categories: selectedCategories,
      };

      setJobs([newJob, ...jobs]);
      localStorage.setItem("jobs", JSON.stringify([newJob, ...jobs]));
      localStorage.setItem("categories", JSON.stringify(selectedCategories));

      setOpenCreateModal(false);
      setJobTitle('');
      setJobStatus('');
      setSelectedCategories([]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        selectedCategories,
        setSelectedCategories,
        setJobs,
        jobs,
        handleSaveJob,
        jobTitle,
        setJobTitle,
        openCreateModal,
        setOpenCreateModal,
        setJobStatus,
        jobStatus,
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
