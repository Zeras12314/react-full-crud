import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import AddJobPage from "./pages/AddJobPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import EditJobPage from "./pages/EditJobPage";

const App = () => {
  // Add new job
  const addJob = async (newJob) => {
    const rest = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(newJob)
    });
    return;
  };

  // delete job 
  const deleteJob = async (id) => {
    const rest = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',     
    });
    return;
  }

  // update job
  const updateJob = async (job) => {
    const rest = await fetch(`/api/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(job)
    });
    return;

  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout></MainLayout>}>
        <Route index element={<HomePage />}></Route>
        <Route path="/jobs" element={<JobsPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
        <Route
          path="/add-job"
          element={<AddJobPage addJobSubmit={addJob} />}
        ></Route>
        <Route
          path="/edit-job/:id"
          element={<EditJobPage updateJobSubmit={updateJob}/>}
          loader={jobLoader}
        ></Route>
          <Route
          path="/jobs/:id"
          element={<JobPage deleteJob = {deleteJob}/>}
          loader={jobLoader}
        ></Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
