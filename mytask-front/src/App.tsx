import { useEffect, useState } from "react";
import "./App.css";
import { TaskAPI } from "./api/task.api";
import { TaskDTO } from "./api/dto/task.dto";
import { AppBar, Button, Grid, Toolbar, Typography } from "@material-ui/core";
import Task from "./components/Task";
import { CreateTask } from "./components/CreateTask";
import { EditTask } from "./components/EditTask";

function App() {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [createTaskModal, setCreateTaskModal] = useState(false);
  const [updateTaskModal, setUpdateTaskModal] = useState(false);
  const [taskBeingEdited, setTaskBeingEdited] = useState<undefined | TaskDTO>(
    undefined
  );

  useEffect(() => {
    async function fetchAll() {
      const resp = await TaskAPI.getAll();
      setTasks(resp);
    }
    fetchAll();
  }, []);

  const updateTask = (task: TaskDTO) => {
    setTasks(
      tasks.map((item) => {
        if (item.id === task.id) return task;
        return item;
      })
    );
  };

  const addTask = (task: TaskDTO) => {
    setTasks([...tasks, task]);
  };

  const removeTask = (taskId: number) => {
    setTasks(tasks.filter((x) => x.id !== taskId));
  };

  return (
    <div className="App">
      <CreateTask
        open={createTaskModal}
        handleClose={() => setCreateTaskModal(false)}
        onTaskCreated={addTask}
      />
      <EditTask
        data={taskBeingEdited}
        open={updateTaskModal}
        handleClose={() => setUpdateTaskModal(false)}
        onTaskUpdated={updateTask}
      />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Task Management
          </Typography>
          <Button
            variant="contained"
            color="default"
            onClick={() => setCreateTaskModal(true)}
          >
            Create Task
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={1} style={{ padding: 10 }}>
        {tasks.map((task) => {
          return (
            <Grid item xs={3} key={task.id}>
              <Task
                data={task}
                onTaskDelete={removeTask}
                onTaskUpdate={(task: TaskDTO) => {
                  setTaskBeingEdited(task);
                  setUpdateTaskModal(true);
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default App;
