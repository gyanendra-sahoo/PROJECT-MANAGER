import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuFileSpreadsheet } from "react-icons/lu";
import TaskStatusTabs from "../../components/TaskStatusTabs";
import TaskCard from "../../components/Cards/TaskCard";

const ManageTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState([
    { label: "All", count: 0 },
    { label: "Pending", count: 0 },
    { label: "In Progress", count: 0 },
    { label: "Completed", count: 0 },
  ]);
  const [filterStatus, setFilterStatus] = useState("All");

  const navigate = useNavigate();

  const statusMap = {
  All: "",
  Pending: "pending",
  "In Progress": "in-progress",
  Completed: "completed",
};

  const getAllTasks = async (status) => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: {
          status: statusMap[status] || "",
        },
      });

      const tasks = response.data?.tasks?.length > 0 ? response.data.tasks : [];
      setAllTasks(tasks);

      const statusSummary = response.data?.statusSummary || {};

      setTabs((prevTabs) =>
        prevTabs.map((tab) => {
          switch (tab.label) {
            case "All":
              return { ...tab, count: statusSummary.all || 0 };
            case "Pending":
              return { ...tab, count: statusSummary.pendingTasks || 0 };
            case "In Progress":
              return { ...tab, count: statusSummary.inProgressTasks || 0 };
            case "Completed":
              return { ...tab, count: statusSummary.completedTasks || 0 };
            default:
              return tab;
          }
        })
      );
    } catch (error) {
      console.error("Error fetching tasks: ", error.message);
    }
  };

  const handleClick = (taskData) => {
    navigate(`/admin/create-task`, { state: { taskId: taskData._id } });
  };

  const handleDownloadReport = async () => {
    // Implement download logic
  };

  useEffect(() => {
    getAllTasks(filterStatus);
  }, [filterStatus]);

  return (
    <DashboardLayout activeMenu="Manage Tasks">
      <div className="my-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center justify-between gap-3 w-full md:w-auto">
            <h2 className="text-xl font-medium">My Tasks</h2>
            <button
              onClick={handleDownloadReport}
              className="flex md:hidden download-btn"
            >
              <LuFileSpreadsheet className="text-lg" />
              Download Report
            </button>
          </div>

          <div className="flex items-center gap-3 mt-3 md:mt-0">
            <TaskStatusTabs
              tabs={tabs}
              activeTab={filterStatus}
              setActiveTab={setFilterStatus}
            />

            <button
              className="hidden md:flex download-btn"
              onClick={handleDownloadReport}
            >
              <LuFileSpreadsheet className="text-lg" />
              Download Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {allTasks?.map((item, index) => (
            <TaskCard
              key={item._id}
              title={item.title}
              description={item.description}
              priority={item.priority}
              status={item.status}
              progress={item.progress}
              createdAt={item.createdAt}
              dueDate={item.dueDate}
              assignedTo={item.assignedTo?.map((item) => item.profileImageUrl)}
              attachmentCount={item.attachments?.length || 0}
              completedTodoCount={item.completedTodoCount || 0}
              todoChecklist={item.todoChecklist || []}
              onClick={() => {
                handleClick(item);
              }}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageTasks;
